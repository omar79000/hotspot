# Three-source Hotspot functional assessment

Date: 2026-11-13

## Scope and evidence

This assessment uses the three ZIP archives committed to `main` and the successful GitHub Actions extraction artifact from run `43354661558`. It is a static source inspection only. No page was executed, no MikroTik router was contacted, and no live authentication or speed assignment was tested.

## Executive conclusion

The repository does **not** currently contain three complete, independently deployable Hotspot pages.

- **AL-TAJ.NET** is a complete page source (31 extracted files).
- **Tecsmart** is a complete page source (37 extracted files).
- **Rasheed** (`صفحه رشيد اعتقد بدون اي تعديل.zip`) is an asset/theme bundle (22 extracted files). It contains images, CSS, fonts, and configuration, but no `index.html`, `login.html`, `status.html`, `logout.html`, or JavaScript files. It cannot be treated as a third complete implementation based on the supplied archive.

The 22 extracted Rasheed files are byte-identical to the corresponding 22 files in Tecsmart. The archive therefore contributes a matching set of Tecsmart visual/configuration assets, not a separately evidenced login/session implementation.

## Source comparison

| Evidence | AL-TAJ.NET | Tecsmart | Rasheed |
|---|---:|---:|---:|
| Extracted files | 31 | 37 | 22 |
| `index.html` | Yes | Yes | No |
| `login.html` | Yes | Yes | No |
| `status.html` | Yes | Yes | No |
| `logout.html` | Yes | Yes | No |
| JavaScript files | Yes | Yes | No |
| RouterOS login/session protocol evidenced | Yes | Yes | No |

Pairwise file-hash comparison from the extraction report:

- AL-TAJ.NET vs Tecsmart: 22 identical files among 28 common paths; 6 common paths differ.
- Tecsmart vs Rasheed: all 22 common paths are byte-identical; the 15 remaining Tecsmart files are absent from Rasheed.
- AL-TAJ.NET vs Rasheed: 10 identical files among 13 common paths; 3 common paths differ.

The Rasheed comparison is therefore an asset-bundle comparison, not a functional page comparison.

## Protected RouterOS compatibility contract

The complete AL-TAJ.NET and Tecsmart sources share byte-identical protocol files:

- `login.html`
- `alogin.html`
- `logout.html`
- `status.html`
- `redirect.html`
- `js/main.min.js`
- `js/init.min.js`

Their current browser-to-RouterOS flow includes:

- Login request through `/login`, handled by the existing `getRequest` path.
- Status polling through `/status?var=callBack`.
- Logout through `/logout?var=callBack` (with the existing optional erase-cookie parameter).
- Template callback actions including `onLoginStart`, `onLoginError`, `onLoggedIn`, `onStatusQuery`, and `onLoggedOut`.

These files, callback names, query parameters, DOM IDs/selectors used by the scripts, and request timing are protected compatibility behavior. A visual redesign must not rewrite them.

## Speed and update-domain behavior

AL-TAJ.NET includes `js/domainGuard.js`; Tecsmart does not.

In AL-TAJ.NET, the guard builds the domain value by combining the selected speed and update flag with an underscore (conceptually `selectedSpeed + "_" + updateFlag`). It then passes that value as the `domain` query parameter on the existing `/login` request. It also stores/retrieves the selected value for remembered-card behavior.

The exact literal identifier `speed_updateFlag` does not appear in the inspected source. The behavior is implemented through the selected-speed value plus the update flag. Do not rename, reformat, omit, or independently reconstruct this domain value during a UI redesign.

AL-TAJ.NET also enables remembered-card behavior in its configuration, while Tecsmart disables it. This is a functional difference and must not be silently merged or changed.

## Additional source-level cautions

The existing cross-check found:

1. The markup's hidden password input has `name="password"` and class `login-input`, while JavaScript selectors look for `input[password-field]`. The actual credential policy is not proven from the archive alone; do not change it by assumption.
2. AL-TAJ.NET's domain guard looks for `#domainFinal`, but the supplied `index.html` does not contain that element. The guard also constructs and sends the domain directly in the request.
3. The supplied configuration and code do not prove the live router-side meaning of the `domain` parameter or the resulting rate-limit assignment.

These are source-level findings only, not confirmation of a live router fault.

## Safe UI-only development boundary

Potentially safe to redesign after selector/DOM cross-check:

- Visual layout and responsive CSS.
- Colors, typography, spacing, borders, cards, and decorative elements.
- Logo and local visual assets.
- Static wording and labels, provided required elements and selectors remain intact.

Treat as protected unless a separate compatibility test explicitly authorizes a change:

- RouterOS templates listed above.
- `js/main.min.js`, `getRequest`, `userLogin`, `cookieLogin`, `userLogout`, and `startStatusQuery`.
- `/login`, `/status`, `/logout`, callback action names, and query parameter structure.
- The `domain` value and AL-TAJ.NET's speed/update guard behavior.
- Remembered-card cookies/storage, username/password handling, and status polling lifecycle.

## Recommended baseline for the next UI phase

Use **AL-TAJ.NET as the functional compatibility baseline** if the required behavior includes its remembered-card and speed/update-domain guard. Use Tecsmart and the Rasheed asset bundle as visual references only. This recommendation is based on the presence of the additional guard in AL-TAJ.NET; it is not a live-router validation.

Before changing markup, build a selector/ID dependency map from all scripts and templates. Then make presentation-only changes and compare the protected files and request contracts before and after the redesign.
