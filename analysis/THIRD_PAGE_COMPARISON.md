# MikroTik Hotspot archive analysis

> Static inspection only. No page was executed and no router configuration was changed.

## AL-TAJ.NET

- Source archive: AL-TAJ.NET.rar.zip
- Source size: 91581 bytes
- Source SHA-256: ad685522b6940f25d9728da7eb732d12f1edae93c51b9a79cf42d49105459ab5
- Extracted file count: 31

### File inventory

- adimg/22.jpg — 11439 bytes
- adimg/3.jpg — 22528 bytes
- alogin.html — 620 bytes
- config/config.js — 3277 bytes
- css/brand.css — 22413 bytes
- css/fontello.min.css — 582 bytes
- css/style.min.css — 28288 bytes
- fonts/Almarai.css — 387 bytes
- fonts/Almarai.woff2 — 16436 bytes
- fonts/fontello.woff2 — 2748 bytes
- img/es.svg — 1946 bytes
- img/favicon.ico — 196 bytes
- img/gs.svg — 2178 bytes
- img/h.svg — 1102 bytes
- img/logo.png — 96 bytes
- img/ss.svg — 1135 bytes
- index.html — 19308 bytes
- js/domainGuard.js — 9595 bytes
- js/hotBlocker.min.js — 2807 bytes
- js/hotCookie.min.js — 3816 bytes
- js/hotInImprover.min.js — 2065 bytes
- js/hotOptions.min.js — 3199 bytes
- js/init.min.js — 5395 bytes
- js/main.min.js — 16932 bytes
- js/mus.min.js — 5335 bytes
- js/speedGate.js — 5715 bytes
- js/templates.min.js — 1094 bytes
- login.html — 606 bytes
- logout.html — 687 bytes
- redirect.html — 171 bytes
- status.html — 505 bytes

### Static code indicators

**MikroTik template variables:**
- alogin.html: $(if var == ""), $(else), $(logged-in), $(mac-esc), $(link-login-only), $(domain), $(ip), $(bytes-in), $(bytes-out), $(remain-bytes-total), $(session-time-left), $(uptime), $(session-time-left-secs), $(uptime-secs), $(trial), $(login-by), $(endif)
- login.html: $(if var == ""), $(else), $(if error == ""), $(logged-in), $(link-login-only), $(link-logout), $(link-status), $(identity), $(ip), $(mac-esc), $(trial), $(username2), $(error-orig), $(error), $(endif)
- logout.html: $(if var == ""), $(else), $(logged-in), $(link-login-only), $(link-logout), $(domain), $(mac-esc), $(ip), $(bytes-in), $(bytes-in-nice), $(bytes-out), $(bytes-out-nice), $(remain-bytes-in), $(remain-bytes-out), $(packets-out), $(packets-in), $(session-time-left), $(uptime), $(trial), $(endif)
- status.html: $(if var == ""), $(else), $(logged-in), $(mac-esc), $(domain), $(ip), $(bytes-in), $(bytes-out), $(remain-bytes-total), $(session-time-left), $(uptime), $(username), $(trial), $(endif)

**login/authentication endpoints:**
- alogin.html: username, link-login
- config/config.js: cookie
- css/brand.css: radius
- css/style.min.css: radius, password
- index.html: username, password, cookie, radius, Cookie
- js/domainGuard.js: Cookie, cookie, Username, username, Password, password
- js/hotBlocker.min.js: Cookie, cookie
- js/hotCookie.min.js: Cookie, cookie, username, password
- js/hotInImprover.min.js: cookie
- js/init.min.js: username, password
- js/main.min.js: password, username, cookie, Cookie
- js/speedGate.js: username, Username
- js/templates.min.js: password, username
- login.html: link-login, username
- logout.html: link-login, username
- status.html: username

**session/status/logout:**
- alogin.html: bytes-in, bytes-out, session, uptime
- index.html: status.html, uptime, session
- js/main.min.js: session, uptime
- login.html: link-logout, link-status
- logout.html: link-logout, bytes-in, bytes-out, session, uptime
- status.html: bytes-in, bytes-out, session, uptime

**router/API references:**
- js/main.min.js: XMLHttpRequest

**external dependencies:**
- config/config.js: http://
- index.html: http://

### Initial interpretation

Indicators are strings found in files, not proof that a feature is active. Trace source files to confirm login flow, CHAP handling, redirects, status polling, and logout behavior before proposing changes.

## Tecsmart

- Source archive: Tecsmart.zip
- Source size: 444430 bytes
- Source SHA-256: 6254c6e852c6de566a0a9e7e55cb74a74213481ad2fe3ad492432fcbb9835dc4
- Extracted file count: 37

### File inventory

- adimg/1.jpg — 328646 bytes
- adimg/2.jpg — 9071 bytes
- adimg/3.jpg — 3362 bytes
- adimg/4.jpg — 9071 bytes
- adimg/5.jpg — 9071 bytes
- alogin.html — 620 bytes
- config/config.js — 3576 bytes
- css/fontello.min.css — 582 bytes
- css/style.min.css — 27705 bytes
- css/style.min1.css — 27885 bytes
- css/style.purple_blue.css — 27730 bytes
- css/style.purple_dark_mauve.css — 27728 bytes
- css/style.purple_neon.css — 27703 bytes
- css/style.purple_pink.css — 27734 bytes
- fonts/Almarai.css — 387 bytes
- fonts/Almarai.woff2 — 16436 bytes
- fonts/fontello.woff2 — 2748 bytes
- img/es.svg — 1946 bytes
- img/favicon.ico — 196 bytes
- img/gs.svg — 2178 bytes
- img/h.svg — 1102 bytes
- img/logo.png — 96 bytes
- img/ss.svg — 1135 bytes
- index.html — 19160 bytes
- js/hotBlocker.min.js — 2807 bytes
- js/hotCookie.min.js — 3809 bytes
- js/hotInImprover.min.js — 2065 bytes
- js/hotOptions.min.js — 3199 bytes
- js/init.min.js — 5395 bytes
- js/main.min.js — 16932 bytes
- js/mus.min.js — 5335 bytes
- js/speedGate.js — 5543 bytes
- js/templates.min.js — 1094 bytes
- login.html — 606 bytes
- logout.html — 687 bytes
- redirect.html — 171 bytes
- status.html — 505 bytes

### Static code indicators

**MikroTik template variables:**
- alogin.html: $(if var == ""), $(else), $(logged-in), $(mac-esc), $(link-login-only), $(domain), $(ip), $(bytes-in), $(bytes-out), $(remain-bytes-total), $(session-time-left), $(uptime), $(session-time-left-secs), $(uptime-secs), $(trial), $(login-by), $(endif)
- login.html: $(if var == ""), $(else), $(if error == ""), $(logged-in), $(link-login-only), $(link-logout), $(link-status), $(identity), $(ip), $(mac-esc), $(trial), $(username2), $(error-orig), $(error), $(endif)
- logout.html: $(if var == ""), $(else), $(logged-in), $(link-login-only), $(link-logout), $(domain), $(mac-esc), $(ip), $(bytes-in), $(bytes-in-nice), $(bytes-out), $(bytes-out-nice), $(remain-bytes-in), $(remain-bytes-out), $(packets-out), $(packets-in), $(session-time-left), $(uptime), $(trial), $(endif)
- status.html: $(if var == ""), $(else), $(logged-in), $(mac-esc), $(domain), $(ip), $(bytes-in), $(bytes-out), $(remain-bytes-total), $(session-time-left), $(uptime), $(username), $(trial), $(endif)

**login/authentication endpoints:**
- alogin.html: username, link-login
- config/config.js: cookie
- css/style.min.css: radius, password
- css/style.min1.css: radius, password
- css/style.purple_blue.css: radius, password
- css/style.purple_dark_mauve.css: radius, password
- css/style.purple_neon.css: radius, password
- css/style.purple_pink.css: radius, password
- index.html: username, password, cookie, radius, Cookie
- js/hotBlocker.min.js: Cookie, cookie
- js/hotCookie.min.js: Cookie, cookie, username, password
- js/hotInImprover.min.js: cookie
- js/init.min.js: username, password
- js/main.min.js: password, username, cookie, Cookie
- js/speedGate.js: username, Username
- js/templates.min.js: password, username
- login.html: link-login, username
- logout.html: link-login, username
- status.html: username

**session/status/logout:**
- alogin.html: bytes-in, bytes-out, session, uptime
- index.html: status.html, uptime, session
- js/main.min.js: session, uptime
- login.html: link-logout, link-status
- logout.html: link-logout, bytes-in, bytes-out, session, uptime
- status.html: bytes-in, bytes-out, session, uptime

**router/API references:**
- js/main.min.js: XMLHttpRequest

**external dependencies:**
- config/config.js: http://

### Initial interpretation

Indicators are strings found in files, not proof that a feature is active. Trace source files to confirm login flow, CHAP handling, redirects, status polling, and logout behavior before proposing changes.

## Rasheed

- Source archive: صفحه رشيد اعتقد بدون اي تعديل.zip
- Source size: 419993 bytes
- Source SHA-256: 2d7f17f5a8bca99182284b31c2dec9ecb5e12bf8e7bcd8b437870ea9c03cdefc
- Extracted file count: 22

### File inventory

- adimg/1.jpg — 328646 bytes
- adimg/2.jpg — 9071 bytes
- adimg/3.jpg — 3362 bytes
- adimg/4.jpg — 9071 bytes
- adimg/5.jpg — 9071 bytes
- config/config.js — 3576 bytes
- css/fontello.min.css — 582 bytes
- css/style.min.css — 27705 bytes
- css/style.min1.css — 27885 bytes
- css/style.purple_blue.css — 27730 bytes
- css/style.purple_dark_mauve.css — 27728 bytes
- css/style.purple_neon.css — 27703 bytes
- css/style.purple_pink.css — 27734 bytes
- fonts/Almarai.css — 387 bytes
- fonts/Almarai.woff2 — 16436 bytes
- fonts/fontello.woff2 — 2748 bytes
- img/es.svg — 1946 bytes
- img/favicon.ico — 196 bytes
- img/gs.svg — 2178 bytes
- img/h.svg — 1102 bytes
- img/logo.png — 96 bytes
- img/ss.svg — 1135 bytes

### Static code indicators

**MikroTik template variables:**
- No matching indicators found.

**login/authentication endpoints:**
- config/config.js: cookie
- css/style.min.css: radius, password
- css/style.min1.css: radius, password
- css/style.purple_blue.css: radius, password
- css/style.purple_dark_mauve.css: radius, password
- css/style.purple_neon.css: radius, password
- css/style.purple_pink.css: radius, password

**session/status/logout:**
- No matching indicators found.

**router/API references:**
- No matching indicators found.

**external dependencies:**
- config/config.js: http://

### Initial interpretation

Indicators are strings found in files, not proof that a feature is active. Trace source files to confirm login flow, CHAP handling, redirects, status polling, and logout behavior before proposing changes.

## Cross-archive comparison

The comparison below uses relative paths and SHA-256 hashes. A matching filename alone does not mean the files are identical.

### AL-TAJ.NET vs Tecsmart

- Same relative path: 28
- Byte-identical files: 22
- Same path but different content: 6
- Unique to AL-TAJ.NET: 3
- Unique to Tecsmart: 9

**Byte-identical:**
- alogin.html
- css/fontello.min.css
- fonts/Almarai.css
- fonts/Almarai.woff2
- fonts/fontello.woff2
- img/es.svg
- img/favicon.ico
- img/gs.svg
- img/h.svg
- img/logo.png
- img/ss.svg
- js/hotBlocker.min.js
- js/hotInImprover.min.js
- js/hotOptions.min.js
- js/init.min.js
- js/main.min.js
- js/mus.min.js
- js/templates.min.js
- login.html
- logout.html
- redirect.html
- status.html

**Different content:**
- adimg/3.jpg
- config/config.js
- css/style.min.css
- index.html
- js/hotCookie.min.js
- js/speedGate.js

**Only AL-TAJ.NET:**
- adimg/22.jpg
- css/brand.css
- js/domainGuard.js

**Only Tecsmart:**
- adimg/1.jpg
- adimg/2.jpg
- adimg/4.jpg
- adimg/5.jpg
- css/style.min1.css
- css/style.purple_blue.css
- css/style.purple_dark_mauve.css
- css/style.purple_neon.css
- css/style.purple_pink.css

### AL-TAJ.NET vs Rasheed

- Same relative path: 13
- Byte-identical files: 10
- Same path but different content: 3
- Unique to AL-TAJ.NET: 18
- Unique to Rasheed: 9

**Byte-identical:**
- css/fontello.min.css
- fonts/Almarai.css
- fonts/Almarai.woff2
- fonts/fontello.woff2
- img/es.svg
- img/favicon.ico
- img/gs.svg
- img/h.svg
- img/logo.png
- img/ss.svg

**Different content:**
- adimg/3.jpg
- config/config.js
- css/style.min.css

**Only AL-TAJ.NET:**
- adimg/22.jpg
- alogin.html
- css/brand.css
- index.html
- js/domainGuard.js
- js/hotBlocker.min.js
- js/hotCookie.min.js
- js/hotInImprover.min.js
- js/hotOptions.min.js
- js/init.min.js
- js/main.min.js
- js/mus.min.js
- js/speedGate.js
- js/templates.min.js
- login.html
- logout.html
- redirect.html
- status.html

**Only Rasheed:**
- adimg/1.jpg
- adimg/2.jpg
- adimg/4.jpg
- adimg/5.jpg
- css/style.min1.css
- css/style.purple_blue.css
- css/style.purple_dark_mauve.css
- css/style.purple_neon.css
- css/style.purple_pink.css

### Tecsmart vs Rasheed

- Same relative path: 22
- Byte-identical files: 22
- Same path but different content: 0
- Unique to Tecsmart: 15
- Unique to Rasheed: 0

**Byte-identical:**
- adimg/1.jpg
- adimg/2.jpg
- adimg/3.jpg
- adimg/4.jpg
- adimg/5.jpg
- config/config.js
- css/fontello.min.css
- css/style.min.css
- css/style.min1.css
- css/style.purple_blue.css
- css/style.purple_dark_mauve.css
- css/style.purple_neon.css
- css/style.purple_pink.css
- fonts/Almarai.css
- fonts/Almarai.woff2
- fonts/fontello.woff2
- img/es.svg
- img/favicon.ico
- img/gs.svg
- img/h.svg
- img/logo.png
- img/ss.svg

**Different content:**
- None

**Only Tecsmart:**
- alogin.html
- index.html
- js/hotBlocker.min.js
- js/hotCookie.min.js
- js/hotInImprover.min.js
- js/hotOptions.min.js
- js/init.min.js
- js/main.min.js
- js/mus.min.js
- js/speedGate.js
- js/templates.min.js
- login.html
- logout.html
- redirect.html
- status.html

**Only Rasheed:**
- None
