# Additional implementation findings (markup-to-JavaScript cross-check)

This addendum records two concrete DOM/source mismatches found after comparing the JavaScript selectors against the actual `index.html` markup in both extracted folders.

## 1. Password-field selector does not match the markup

The login markup contains a hidden password input with:

- `name="password"`
- `class="login-input"`
- no `password-field` attribute

However, the common `main.min.js` and `hotCookie.min.js` query for `input[password-field]`. AL-TAJ's `domainGuard.js` also queries `input[password-field]`.

Therefore, in the supplied markup, those selectors do not find the hidden password input. The shared login engine consequently appears to submit an empty password value unless another script dynamically adds that attribute or sets a different field (no such addition was identified in the inspected source). This may be intentional for cards where username is also the password, but it must be verified against the live MikroTik account configuration before changing it.

## 2. AL-TAJ domain guard looks for an absent hidden field

AL-TAJ's `domainGuard.js` looks up an element with ID `domainFinal` and writes the computed speed/update domain into it when found. Neither supplied `index.html` contains an element with that ID.

This does not by itself stop the login request: the domain guard also constructs the query string directly and calls the existing `getRequest` function. It does mean that the hidden-field storage path is inactive in the current markup.

## 3. Practical consequence

Do not “fix” either mismatch by guessing the intended password policy or by inserting a new field blindly. Before any change, verify whether RouterOS cards are configured for username=password, username-only login, or a separate password. Then test normal login, remembered-card login, speed selection, and logout on a test Hotspot.

These are source-level findings, not proof of a live authentication defect.
