# Deep source review: AL-TAJ.NET vs Tecsmart

Date: 2026-11-13  
Scope: static source review of the two archives in the repository. The archives were extracted by GitHub Actions run [43352002914](https://github.com/omar79000/hotspot/actions/runs/43352002914). No page was executed and no MikroTik router was contacted or modified.

## Executive conclusion

The two pages are not independent Hotspot implementations. They share the same core login/status/logout protocol files and the same main JavaScript engine. Their differences are primarily branding, configuration, visual assets/themes, and a few added front-end behaviors.

**The most important compatibility point:** preserve the existing RouterOS Hotspot endpoints and response templates. In particular, do not replace the AJAX requests to `/login`, `/status`, and `/logout`, and do not change the JSON action names emitted by the MikroTik templates unless the matching JavaScript handlers are changed and tested together.

## 1. Evidence and source inventory

The archive SHA-256 values recorded by the extraction report are:

- `AL-TAJ.NET.rar.zip`: `ad685522b6940f25d9728da7eb732d12f1edae93c51b9a79cf42d49105459ab5`
- `Tecsmart.zip`: `6254c6e852c6de566a0a9e7e55cb74a74213481ad2fe3ad492432fcbb9835dc4`

Extracted contents:

- AL-TAJ.NET: 32 files, including a nested `AL-TAJ.NET.rar` and its extracted Hotspot directory.
- Tecsmart: 37 files.

Both include `index.html`, `login.html`, `alogin.html`, `logout.html`, `status.html`, `redirect.html`, `config/config.js`, and the common JavaScript modules. The extraction inventory and first-pass indicators are in the workflow artifact `hotspot-source-analysis`.

## 2. Authentication and login flow

### What the source does

1. The login form is a JavaScript-managed form named `login`; it does not declare a normal HTML `action` or `method`.
2. The user enters a card/account value in the username field. The password input is hidden in the page markup.
3. The common `main.min.js` reads the username, hidden password value (if a matching password field exists), selected speed and update option.
4. It sends an asynchronous GET request to RouterOS:
   - `/login?username=...&password=...&var=callBack`
   - When a speed/domain value is present, it appends `&domain=...`.
5. RouterOS substitutes the MikroTik variables in `login.html`. That file returns JSON with an `action` property:
   - success/start: `onLoginStart`
   - error: `onLoginError`
6. The browser parses the JSON and dispatches it to the matching global JavaScript function.

This is a RouterOS Hotspot web-login interaction, not a separate RouterOS API connection. The JavaScript's `XMLHttpRequest` is used to call the Hotspot web endpoints.

### CHAP finding

Both configurations explicitly set `"login-chap": 0`. The inspected templates do not contain the usual CHAP form elements/flow such as `chap-id`, `chap-challenge`, or a visible `md5.js` CHAP calculation. The observed login path sends the username and password directly to the RouterOS `/login` endpoint.

**Conclusion:** CHAP is not evidenced as enabled in these supplied page configurations. Do not add CHAP or change this setting as part of a visual redesign. If the router itself has a separate Hotspot profile setting, it has not been inspected here.

## 3. RouterOS template contract (critical)

The following files are byte-for-byte identical between the two extracted page folders:

- `login.html`
- `alogin.html`
- `logout.html`
- `status.html`
- `redirect.html`
- `js/main.min.js`
- `js/init.min.js`

The templates return JSON, not ordinary page markup, when RouterOS processes them. They use MikroTik substitutions including:

- Login: `$(logged-in)`, `$(link-login-only)`, `$(link-logout)`, `$(link-status)`, `$(identity)`, `$(ip)`, `$(mac-esc)`, `$(trial)`, `$(username2)`, `$(error-orig)`, `$(error)`.
- Logged-in response: `$(bytes-in)`, `$(bytes-out)`, `$(remain-bytes-total)`, `$(session-time-left)`, `$(uptime)`, `$(session-time-left-secs)`, `$(uptime-secs)`, `$(login-by)`.
- Status response: `$(bytes-in)`, `$(bytes-out)`, `$(remain-bytes-total)`, `$(session-time-left)`, `$(uptime)`, `$(username)`.
- Logout response: `$(bytes-in-nice)`, `$(bytes-out-nice)`, `$(remain-bytes-in)`, `$(remain-bytes-out)`, `$(packets-in)`, `$(packets-out)`, `$(uptime)`, and session-time fields.

The templates dispatch these JavaScript actions:

- `onLoginStart`
- `onLoginError`
- `onLoggedIn`
- `onStatusQuery`
- `onLoggedOut`

A redesign that removes or renames any of these fields/actions can break login feedback, status rendering, or logout handling.

## 4. Session status and logout behavior

After a successful login, `onLoggedIn` marks the browser session as logged in, stores the remembered card data, displays the status view, and starts status polling.

The shared `startStatusQuery()` calls:

- `/status?var=callBack` immediately
- then repeats the same request every 1 second while the local `loggedIn` flag remains true.

The response is parsed as JSON and routed to `onStatusQuery`. That handler updates matching page elements with RouterOS values, formatting byte counters and time values for display.

Logout is requested through:

- `/logout?var=callBack`, or
- `/logout?erase-cookie=yes&var=callBack` when the erase-cookie option is requested.

The logout template returns the `onLoggedOut` action. This is the browser-side Hotspot logout request; it is not an API call to User Manager.

**Important:** do not replace status polling with guessed local counters, and do not assume that displayed values are independently calculated by the page. They are populated from RouterOS template variables.

## 5. Meaning of the `domain` parameter

Both pages use a selected speed string as a `domain` query value, and both common JavaScript engines append the selected value to the login URL. Their speed choices include values such as `128K/512K`, `256K/768K`, `256K/2M`, and `512K/4M`.

The configuration and source show the page treating this parameter as a speed/update selection passed through the Hotspot login request. The supplied files alone do not prove how the router-side Hotspot configuration interprets that parameter or which RouterOS scripts/profiles consume it. That must be checked on the target router before changing its format.

The status template also returns `$(domain)` in fields named `sspeed` and `update`; the browser splits the returned value around an underscore to render speed and update state. This is another compatibility-sensitive convention.

## 6. Confirmed differences

| Area | AL-TAJ.NET | Tecsmart |
|---|---|---|
| Core `main.min.js` | Identical | Identical |
| RouterOS login/status/logout templates | Identical | Identical |
| `login-chap` | 0 | 0 |
| `enable-hot-cookie` | 1 | 0 |
| `enable-hot-blocker` | 1 | 1 |
| `try-count` | 20 | 5 |
| `speed-trychange` | 1 | 3 |
| Remove whitespace from card input | 1 | 0 |
| Speed/domain helper | Adds `js/domainGuard.js` | No corresponding file |
| Speed gate | Calls `TecsmartDomainGuard.buildDomain()` before gating/submission | No domain-guard integration |
| Theme files | `style.min.css`, `brand.css` | Multiple purple theme variants |
| Branding/config | A L - T A J, service number and AL-TAJ offers | العميد, service numbers and Tecsmart offers |
| External destination links | Configured to `35.10.10.10` and `35.10.10.10:88` | Main page links are `#`; config includes `50.10.10.10` for one destination |

### AL-TAJ-only domain guard

AL-TAJ adds `js/domainGuard.js`. It:

- Stores speed/update selections per username in browser localStorage.
- Also stores a speed cookie.
- Builds a domain value in the form `speed_updateFlag`.
- Uses a fallback speed for a previously saved card.
- Overrides `window.userLogin` and `window.cookieLogin` to submit the selected domain.
- Calls the existing `getRequest` function for the actual RouterOS login request.

This is an additional front-end layer around the shared login engine. It is not part of the common RouterOS templates and should not be copied into Tecsmart or removed from AL-TAJ without understanding its saved-card behavior.

### Speed-gate difference

Both pages include a speed-choice modal that blocks submission when a username is entered without a speed selection, while allowing the saved-card path to skip the gate. AL-TAJ's version additionally calls the domain guard before opening/submitting the speed selection. Tecsmart's version does not.

### Configuration differences with operational impact

- AL-TAJ enables remembered-card behavior through `enable-hot-cookie: 1`; Tecsmart disables it with `0`.
- The failed-login blocker is enabled in both, but AL-TAJ allows 20 attempts in config while Tecsmart allows 5. Both use a 1-minute block-time setting.
- AL-TAJ removes whitespace from card input; Tecsmart does not.
- The speed-change attempt limits differ (1 vs 3).
- The advertised prices, data allowances, validity periods, service numbers, sales points, notices, and destination URLs differ. These are business/network-specific configuration, not authentication protocol differences.

## 7. Security and reliability observations

1. **GET query parameters:** the username/password are placed in a GET URL. URLs may be recorded in browser history, proxy logs, or diagnostics depending on the environment. This is an existing design characteristic; changing it requires compatibility testing with RouterOS Hotspot, not a cosmetic edit.
2. **No CHAP evidence:** both page configs disable CHAP. Do not describe this as CHAP-protected authentication.
3. **External HTTP links:** both configurations contain plain HTTP destinations. These are redirects/navigation destinations, not proof of the login endpoint being sent to an external server.
4. **Client-side blocker:** the attempt counter/block behavior is implemented in browser JavaScript/cookies. It must not be treated as a server-side security control or a replacement for RouterOS protections.
5. **One-second status polling:** this creates repeated requests while the status view is active. Changing its interval or lifecycle can affect displayed session freshness and router request load.
6. **Domain guard storage:** AL-TAJ keeps speed preferences in localStorage and cookies. Clearing browser storage may change the fallback speed for saved cards.
7. **No router-side verification:** this source review cannot confirm RouterOS profile scripts, RADIUS/User Manager policies, actual rate-limit assignment, or whether the configured domain values are accepted by the live router.

## 8. Safe development boundaries

Safe to consider first, subject to browser testing:

- Text, logo, colors, layout, responsive CSS and local image changes.
- Price table, sales-point and contact text changes in `config/config.js`.
- Static content improvements that do not rename required IDs or remove script dependencies.

Treat as protected until separately tested:

- `login.html`, `alogin.html`, `logout.html`, `status.html`, `redirect.html`.
- `js/main.min.js` and the `getRequest`, `userLogin`, `userLogout`, `startStatusQuery` paths.
- `domain` formatting and the AL-TAJ domain guard.
- Saved-card cookies, username/password handling, login action names, and status polling.
- RouterOS-side Hotspot settings and scripts.

## 9. What remains unverified

- Actual login success/failure on the target MikroTik.
- Whether CHAP is enabled or disabled in the router's live Hotspot server profile (the supplied web-page config says `login-chap: 0`).
- Which RouterOS script/profile consumes the `domain` parameter.
- Whether the HTTP destination IPs are reachable or still correct.
- The exact behavior of the optional saved-card selector on a live browser/router combination.
- Any behavior that depends on external RouterOS files not included in the archives.

## Final recommendation

Use the two archives as the baseline and treat the shared RouterOS templates and common login engine as a protected compatibility layer. For any new unified design, first decide which page's behavior is the intended baseline: AL-TAJ has remembered-card enabled and its extra speed/domain guard; Tecsmart has remembered-card disabled and a lower failed-attempt threshold. Do not merge their configuration values blindly.

This report is based on source inspection only. It is not a claim of live router testing.
