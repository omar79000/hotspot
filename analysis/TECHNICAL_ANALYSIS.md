# Hotspot Pages — Technical Analysis

## Scope and evidence

This report is based on the two archives in the repository, extracted by GitHub Actions on 2026-11-13. The original ZIP/RAR files were not modified. Extracted copies are under `analysis/extracted/`; the complete file inventory and source SHA-256 values are in `HOTSPOT_ANALYSIS_INVENTORY.md`.

This is a static source review. No live MikroTik router was connected and no login/session behavior was tested on hardware. Router-side scripts, queues, profiles, firewall rules, and Hotspot configuration were not included in these archives.

## Archive contents

- **AL-TAJ.NET**: 32 extracted files, including an outer ZIP, an inner RAR, and the extracted page. Main files: `index.html`, `config/config.js`, `login.html`, `status.html`, `logout.html`, `alogin.html`, `redirect.html`; JavaScript modules; CSS; fonts; SVGs; and advertising images.
- **Tecsmart**: 37 files. It has the same basic Hotspot page structure, five advertising images, several alternative CSS themes, and the JavaScript modules.

## How both pages communicate with MikroTik

These are MikroTik Hotspot captive-portal pages. They do **not** call the RouterOS API, REST API, SSH, or an external backend in the reviewed code. They use same-origin HTTP requests to the Hotspot web server and RouterOS server-side template variables.

1. The browser requests `/login?username=...&password=...&var=callBack` and includes a `domain=...` parameter carrying the selected speed/update value.
2. The Hotspot serves `login.html` as a JSON-like callback response using RouterOS variables such as `$(logged-in)`, `$(link-login-only)`, `$(link-logout)`, `$(link-status)`, `$(identity)`, `$(ip)`, `$(mac-esc)`, `$(trial)`, `$(username2)`, `$(error-orig)`, and `$(error)`. The response's `action` field selects a browser function such as `onLoginStart` or `onLoginError`.
3. After successful login, `alogin.html` returns `onLoggedIn` and session values. The JavaScript then requests `/status?var=callBack` immediately and every second while marked logged in.
4. `status.html` supplies the live session fields through RouterOS variables: IP/MAC, bytes in/out, remaining bytes, session time left, uptime, trial state, and the `domain` value.
5. Logout uses `/logout?var=callBack` (or `/logout?erase-cookie=yes&var=callBack`). `logout.html` returns the logout/session fields.
6. `redirect.html` sends the browser back to `index.html`.

The shared JavaScript maps callback actions to handlers. It formats byte/time values, displays errors, maintains login state, and refreshes status. This means the RouterOS Hotspot template filenames and their macro names are part of the integration contract.

## Speed and update mechanism

The login form offers a speed option and an updates toggle. The common login code builds a value like `256K/2M_Uon` or `512K/4M_Uoff` and sends it as the `domain` query parameter. The status page reads `$(domain)`, and the JavaScript splits the returned string at the underscore to display the speed and update state.

Changing speed while logged in is not merely a visual change: the script extracts the username from the `bytesm` response field, requests `/logout`, logs the user in again with the new `domain` value, then reloads the page. The updates toggle follows a similar logout/relogin flow. These operations can interrupt the active session briefly.

The page code proves that it sends these values and uses the returned value. It does **not** prove which RouterOS-side script or profile consumes `domain`, nor what queue/rate/update policy is applied. That requires reviewing the matching MikroTik configuration/scripts.

## Important differences

### AL-TAJ.NET

- Includes `js/domainGuard.js`, which overrides the common `userLogin` and `cookieLogin` functions.
- Saves a speed/update value per card in browser `localStorage` under a card-specific key, also keeps a last-domain value, and uses a `speed` cookie as fallback.
- When a saved card is selected, it attempts to restore that card's previously saved speed/update choice.
- Its config has `enable-hot-cookie: 1`, `try-count: 20`, `speed-trychange: 1`, and `speed-trychange-timeout: 3`.
- Login speeds in its HTML: `128K/512K`, `256K/768K`, `256K/2M`, `512K/4M`.
- Includes `css/brand.css`.
- Its HTML references `adimg/1.jpg` and `adimg/2.jpg`, but those filenames are absent from the extracted AL-TAJ.NET archive. The config currently disables the ads section, which may hide the broken references; enabling ads without correcting the paths would expose missing images.
- The domain guard fallback is `512K/1M_Uon`, but `512K/1M` is not one of the visible speed options in this page. If a saved card has no stored choice, the fallback may be sent even though it cannot be selected in the speed dropdown.

### Tecsmart

- Does not include `domainGuard.js`; it uses the shared `main.min.js` and the common cookie/speed handling.
- Its config has `enable-hot-cookie: 0`, `try-count: 5`, `speed-trychange: 3`, and `speed-trychange-timeout: 3`.
- Login speeds in its HTML: `256K/512K`, `256K/1M`, `512K/3M`, `1M/6M`.
- Includes several alternate theme stylesheets: `style.min1.css`, `style.purple_blue.css`, `style.purple_dark_mauve.css`, `style.purple_neon.css`, and `style.purple_pink.css`.
- Has a populated `adimg` directory (including `1.jpg` and `2.jpg`).

### Shared implementation

The following important Hotspot response templates are byte-identical in both extracted copies: `login.html`, `status.html`, `logout.html`, and `alogin.html`. The main application script, `init.min.js`, `hotOptions.min.js`, and `hotBlocker.min.js` are also shared. The main visual and operational differences are in page configuration, HTML content, themes/assets, `speedGate.js`, `hotCookie.min.js`, and AL-TAJ.NET's additional `domainGuard.js`.

## Safety rules for future changes

1. Treat `login.html`, `status.html`, `logout.html`, and `alogin.html` as protocol/contract files. Do not rename them or casually change RouterOS macro names, callback action names, or response field names.
2. Do not replace the same-origin `/login`, `/status`, or `/logout` request flow with a different backend.
3. Preserve the `domain` parameter format and underscore separator unless the corresponding MikroTik-side consumer is inspected and changed in coordination.
4. Preserve the login callback actions `onLoginStart`, `onLoginError`, `onLoggedIn`, `onLoggedOut`, and `onStatusQuery`.
5. Preserve the one-second status polling and the logout/relogin semantics unless a deliberate session-behavior change is tested against the actual router.
6. Before changing speed choices, compare every option with the router-side rate/profile/script mapping. A label or dropdown value alone does not change RouterOS configuration.
7. Test login success/failure, saved-card login, status polling, speed change, update toggle, logout, trial login, and blocked-login behavior on a test Hotspot before deployment.

## Current conclusion

The two pages are closely related variants of the same MikroTik Hotspot captive-portal framework. Tecsmart is the more theme-configurable variant; AL-TAJ.NET adds per-card speed/update persistence through `domainGuard.js` and has a few asset/fallback inconsistencies worth addressing. The core MikroTik callback templates are identical, so the safest development path is to preserve those templates and first isolate visual/configuration changes from protocol changes.

A definitive explanation of how RouterOS applies each speed and update choice requires the matching MikroTik scripts/configuration. The page archives alone show the values transmitted, not the server-side action behind them.
