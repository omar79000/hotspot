# MikroTik Hotspot archive analysis

> Static inspection only. No page was executed and no router configuration was changed.

## AL-TAJ.NET

- Source archive: AL-TAJ.NET.rar.zip
- Source size: 91581 bytes
- Source SHA-256: ad685522b6940f25d9728da7eb732d12f1edae93c51b9a79cf42d49105459ab5
- Extracted file count: 32

### File inventory

- AL-TAJ.NET.rar — 92056 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/adimg/22.jpg — 11439 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/adimg/3.jpg — 22528 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/alogin.html — 620 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/config/config.js — 3277 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/css/brand.css — 22413 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/css/fontello.min.css — 582 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/css/style.min.css — 28288 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/fonts/Almarai.css — 387 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/fonts/Almarai.woff2 — 16436 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/fonts/fontello.woff2 — 2748 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/es.svg — 1946 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/favicon.ico — 196 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/gs.svg — 2178 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/h.svg — 1102 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/logo.png — 96 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/ss.svg — 1135 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/index.html — 19308 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/domainGuard.js — 9595 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotBlocker.min.js — 2807 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotCookie.min.js — 3816 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotInImprover.min.js — 2065 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotOptions.min.js — 3199 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/init.min.js — 5395 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/main.min.js — 16932 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/mus.min.js — 5335 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/speedGate.js — 5715 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/templates.min.js — 1094 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/login.html — 606 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/logout.html — 687 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/redirect.html — 171 bytes
- AL-TAJ.NET_extracted/AL-TAJ.NET/status.html — 505 bytes

### Static code indicators

**MikroTik template variables:**
- AL-TAJ.NET_extracted/AL-TAJ.NET/alogin.html: $(if var == ""), $(else), $(logged-in), $(mac-esc), $(link-login-only), $(domain), $(ip), $(bytes-in), $(bytes-out), $(remain-bytes-total), $(session-time-left), $(uptime), $(session-time-left-secs), $(uptime-secs), $(trial), $(login-by), $(endif)
- AL-TAJ.NET_extracted/AL-TAJ.NET/login.html: $(if var == ""), $(else), $(if error == ""), $(logged-in), $(link-login-only), $(link-logout), $(link-status), $(identity), $(ip), $(mac-esc), $(trial), $(username2), $(error-orig), $(error), $(endif)
- AL-TAJ.NET_extracted/AL-TAJ.NET/logout.html: $(if var == ""), $(else), $(logged-in), $(link-login-only), $(link-logout), $(domain), $(mac-esc), $(ip), $(bytes-in), $(bytes-in-nice), $(bytes-out), $(bytes-out-nice), $(remain-bytes-in), $(remain-bytes-out), $(packets-out), $(packets-in), $(session-time-left), $(uptime), $(trial), $(endif)
- AL-TAJ.NET_extracted/AL-TAJ.NET/status.html: $(if var == ""), $(else), $(logged-in), $(mac-esc), $(domain), $(ip), $(bytes-in), $(bytes-out), $(remain-bytes-total), $(session-time-left), $(uptime), $(username), $(trial), $(endif)

**login/authentication endpoints:**
- AL-TAJ.NET_extracted/AL-TAJ.NET/alogin.html: username, link-login
- AL-TAJ.NET_extracted/AL-TAJ.NET/config/config.js: cookie
- AL-TAJ.NET_extracted/AL-TAJ.NET/css/brand.css: radius
- AL-TAJ.NET_extracted/AL-TAJ.NET/css/style.min.css: radius, password
- AL-TAJ.NET_extracted/AL-TAJ.NET/index.html: username, password, cookie, radius, Cookie
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/domainGuard.js: Cookie, cookie, Username, username, Password, password
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotBlocker.min.js: Cookie, cookie
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotCookie.min.js: Cookie, cookie, username, password
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotInImprover.min.js: cookie
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/init.min.js: username, password
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/main.min.js: password, username, cookie, Cookie
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/speedGate.js: username, Username
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/templates.min.js: password, username
- AL-TAJ.NET_extracted/AL-TAJ.NET/login.html: link-login, username
- AL-TAJ.NET_extracted/AL-TAJ.NET/logout.html: link-login, username
- AL-TAJ.NET_extracted/AL-TAJ.NET/status.html: username

**session/status/logout:**
- AL-TAJ.NET_extracted/AL-TAJ.NET/alogin.html: bytes-in, bytes-out, session, uptime
- AL-TAJ.NET_extracted/AL-TAJ.NET/index.html: status.html, uptime, session
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/main.min.js: session, uptime
- AL-TAJ.NET_extracted/AL-TAJ.NET/login.html: link-logout, link-status
- AL-TAJ.NET_extracted/AL-TAJ.NET/logout.html: link-logout, bytes-in, bytes-out, session, uptime
- AL-TAJ.NET_extracted/AL-TAJ.NET/status.html: bytes-in, bytes-out, session, uptime

**router/API references:**
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/main.min.js: XMLHttpRequest

**external dependencies:**
- AL-TAJ.NET_extracted/AL-TAJ.NET/config/config.js: http://
- AL-TAJ.NET_extracted/AL-TAJ.NET/index.html: http://

### Initial interpretation

Indicators are strings found in files, not proof that a feature is active. Trace source files to confirm login flow, CHAP handling, redirects, status polling, and logout behavior before proposing changes.

## Tecsmart

- Source archive: Tecsmart.zip
- Source size: 444430 bytes
- Source SHA-256: 6254c6e852c6de566a0a9e7e55cb74a74213481ad2fe3ad492432fcbb9835dc4
- Extracted file count: 37

### File inventory

- Tecsmart/adimg/1.jpg — 328646 bytes
- Tecsmart/adimg/2.jpg — 9071 bytes
- Tecsmart/adimg/3.jpg — 3362 bytes
- Tecsmart/adimg/4.jpg — 9071 bytes
- Tecsmart/adimg/5.jpg — 9071 bytes
- Tecsmart/alogin.html — 620 bytes
- Tecsmart/config/config.js — 3576 bytes
- Tecsmart/css/fontello.min.css — 582 bytes
- Tecsmart/css/style.min.css — 27705 bytes
- Tecsmart/css/style.min1.css — 27885 bytes
- Tecsmart/css/style.purple_blue.css — 27730 bytes
- Tecsmart/css/style.purple_dark_mauve.css — 27728 bytes
- Tecsmart/css/style.purple_neon.css — 27703 bytes
- Tecsmart/css/style.purple_pink.css — 27734 bytes
- Tecsmart/fonts/Almarai.css — 387 bytes
- Tecsmart/fonts/Almarai.woff2 — 16436 bytes
- Tecsmart/fonts/fontello.woff2 — 2748 bytes
- Tecsmart/img/es.svg — 1946 bytes
- Tecsmart/img/favicon.ico — 196 bytes
- Tecsmart/img/gs.svg — 2178 bytes
- Tecsmart/img/h.svg — 1102 bytes
- Tecsmart/img/logo.png — 96 bytes
- Tecsmart/img/ss.svg — 1135 bytes
- Tecsmart/index.html — 19160 bytes
- Tecsmart/js/hotBlocker.min.js — 2807 bytes
- Tecsmart/js/hotCookie.min.js — 3809 bytes
- Tecsmart/js/hotInImprover.min.js — 2065 bytes
- Tecsmart/js/hotOptions.min.js — 3199 bytes
- Tecsmart/js/init.min.js — 5395 bytes
- Tecsmart/js/main.min.js — 16932 bytes
- Tecsmart/js/mus.min.js — 5335 bytes
- Tecsmart/js/speedGate.js — 5543 bytes
- Tecsmart/js/templates.min.js — 1094 bytes
- Tecsmart/login.html — 606 bytes
- Tecsmart/logout.html — 687 bytes
- Tecsmart/redirect.html — 171 bytes
- Tecsmart/status.html — 505 bytes

### Static code indicators

**MikroTik template variables:**
- Tecsmart/alogin.html: $(if var == ""), $(else), $(logged-in), $(mac-esc), $(link-login-only), $(domain), $(ip), $(bytes-in), $(bytes-out), $(remain-bytes-total), $(session-time-left), $(uptime), $(session-time-left-secs), $(uptime-secs), $(trial), $(login-by), $(endif)
- Tecsmart/login.html: $(if var == ""), $(else), $(if error == ""), $(logged-in), $(link-login-only), $(link-logout), $(link-status), $(identity), $(ip), $(mac-esc), $(trial), $(username2), $(error-orig), $(error), $(endif)
- Tecsmart/logout.html: $(if var == ""), $(else), $(logged-in), $(link-login-only), $(link-logout), $(domain), $(mac-esc), $(ip), $(bytes-in), $(bytes-in-nice), $(bytes-out), $(bytes-out-nice), $(remain-bytes-in), $(remain-bytes-out), $(packets-out), $(packets-in), $(session-time-left), $(uptime), $(trial), $(endif)
- Tecsmart/status.html: $(if var == ""), $(else), $(logged-in), $(mac-esc), $(domain), $(ip), $(bytes-in), $(bytes-out), $(remain-bytes-total), $(session-time-left), $(uptime), $(username), $(trial), $(endif)

**login/authentication endpoints:**
- Tecsmart/alogin.html: username, link-login
- Tecsmart/config/config.js: cookie
- Tecsmart/css/style.min.css: radius, password
- Tecsmart/css/style.min1.css: radius, password
- Tecsmart/css/style.purple_blue.css: radius, password
- Tecsmart/css/style.purple_dark_mauve.css: radius, password
- Tecsmart/css/style.purple_neon.css: radius, password
- Tecsmart/css/style.purple_pink.css: radius, password
- Tecsmart/index.html: username, password, cookie, radius, Cookie
- Tecsmart/js/hotBlocker.min.js: Cookie, cookie
- Tecsmart/js/hotCookie.min.js: Cookie, cookie, username, password
- Tecsmart/js/hotInImprover.min.js: cookie
- Tecsmart/js/init.min.js: username, password
- Tecsmart/js/main.min.js: password, username, cookie, Cookie
- Tecsmart/js/speedGate.js: username, Username
- Tecsmart/js/templates.min.js: password, username
- Tecsmart/login.html: link-login, username
- Tecsmart/logout.html: link-login, username
- Tecsmart/status.html: username

**session/status/logout:**
- Tecsmart/alogin.html: bytes-in, bytes-out, session, uptime
- Tecsmart/index.html: status.html, uptime, session
- Tecsmart/js/main.min.js: session, uptime
- Tecsmart/login.html: link-logout, link-status
- Tecsmart/logout.html: link-logout, bytes-in, bytes-out, session, uptime
- Tecsmart/status.html: bytes-in, bytes-out, session, uptime

**router/API references:**
- Tecsmart/js/main.min.js: XMLHttpRequest

**external dependencies:**
- Tecsmart/config/config.js: http://

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

- Same relative path: 0
- Byte-identical files: 0
- Same path but different content: 0
- Unique to AL-TAJ.NET: 32
- Unique to Tecsmart: 37

**Byte-identical:**
- None

**Different content:**
- None

**Only AL-TAJ.NET:**
- AL-TAJ.NET.rar
- AL-TAJ.NET_extracted/AL-TAJ.NET/adimg/22.jpg
- AL-TAJ.NET_extracted/AL-TAJ.NET/adimg/3.jpg
- AL-TAJ.NET_extracted/AL-TAJ.NET/alogin.html
- AL-TAJ.NET_extracted/AL-TAJ.NET/config/config.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/css/brand.css
- AL-TAJ.NET_extracted/AL-TAJ.NET/css/fontello.min.css
- AL-TAJ.NET_extracted/AL-TAJ.NET/css/style.min.css
- AL-TAJ.NET_extracted/AL-TAJ.NET/fonts/Almarai.css
- AL-TAJ.NET_extracted/AL-TAJ.NET/fonts/Almarai.woff2
- AL-TAJ.NET_extracted/AL-TAJ.NET/fonts/fontello.woff2
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/es.svg
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/favicon.ico
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/gs.svg
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/h.svg
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/logo.png
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/ss.svg
- AL-TAJ.NET_extracted/AL-TAJ.NET/index.html
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/domainGuard.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotBlocker.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotCookie.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotInImprover.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotOptions.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/init.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/main.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/mus.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/speedGate.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/templates.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/login.html
- AL-TAJ.NET_extracted/AL-TAJ.NET/logout.html
- AL-TAJ.NET_extracted/AL-TAJ.NET/redirect.html
- AL-TAJ.NET_extracted/AL-TAJ.NET/status.html

**Only Tecsmart:**
- Tecsmart/adimg/1.jpg
- Tecsmart/adimg/2.jpg
- Tecsmart/adimg/3.jpg
- Tecsmart/adimg/4.jpg
- Tecsmart/adimg/5.jpg
- Tecsmart/alogin.html
- Tecsmart/config/config.js
- Tecsmart/css/fontello.min.css
- Tecsmart/css/style.min.css
- Tecsmart/css/style.min1.css
- Tecsmart/css/style.purple_blue.css
- Tecsmart/css/style.purple_dark_mauve.css
- Tecsmart/css/style.purple_neon.css
- Tecsmart/css/style.purple_pink.css
- Tecsmart/fonts/Almarai.css
- Tecsmart/fonts/Almarai.woff2
- Tecsmart/fonts/fontello.woff2
- Tecsmart/img/es.svg
- Tecsmart/img/favicon.ico
- Tecsmart/img/gs.svg
- Tecsmart/img/h.svg
- Tecsmart/img/logo.png
- Tecsmart/img/ss.svg
- Tecsmart/index.html
- Tecsmart/js/hotBlocker.min.js
- Tecsmart/js/hotCookie.min.js
- Tecsmart/js/hotInImprover.min.js
- Tecsmart/js/hotOptions.min.js
- Tecsmart/js/init.min.js
- Tecsmart/js/main.min.js
- Tecsmart/js/mus.min.js
- Tecsmart/js/speedGate.js
- Tecsmart/js/templates.min.js
- Tecsmart/login.html
- Tecsmart/logout.html
- Tecsmart/redirect.html
- Tecsmart/status.html

### AL-TAJ.NET vs Rasheed

- Same relative path: 0
- Byte-identical files: 0
- Same path but different content: 0
- Unique to AL-TAJ.NET: 32
- Unique to Rasheed: 22

**Byte-identical:**
- None

**Different content:**
- None

**Only AL-TAJ.NET:**
- AL-TAJ.NET.rar
- AL-TAJ.NET_extracted/AL-TAJ.NET/adimg/22.jpg
- AL-TAJ.NET_extracted/AL-TAJ.NET/adimg/3.jpg
- AL-TAJ.NET_extracted/AL-TAJ.NET/alogin.html
- AL-TAJ.NET_extracted/AL-TAJ.NET/config/config.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/css/brand.css
- AL-TAJ.NET_extracted/AL-TAJ.NET/css/fontello.min.css
- AL-TAJ.NET_extracted/AL-TAJ.NET/css/style.min.css
- AL-TAJ.NET_extracted/AL-TAJ.NET/fonts/Almarai.css
- AL-TAJ.NET_extracted/AL-TAJ.NET/fonts/Almarai.woff2
- AL-TAJ.NET_extracted/AL-TAJ.NET/fonts/fontello.woff2
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/es.svg
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/favicon.ico
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/gs.svg
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/h.svg
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/logo.png
- AL-TAJ.NET_extracted/AL-TAJ.NET/img/ss.svg
- AL-TAJ.NET_extracted/AL-TAJ.NET/index.html
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/domainGuard.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotBlocker.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotCookie.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotInImprover.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/hotOptions.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/init.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/main.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/mus.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/speedGate.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/js/templates.min.js
- AL-TAJ.NET_extracted/AL-TAJ.NET/login.html
- AL-TAJ.NET_extracted/AL-TAJ.NET/logout.html
- AL-TAJ.NET_extracted/AL-TAJ.NET/redirect.html
- AL-TAJ.NET_extracted/AL-TAJ.NET/status.html

**Only Rasheed:**
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

### Tecsmart vs Rasheed

- Same relative path: 0
- Byte-identical files: 0
- Same path but different content: 0
- Unique to Tecsmart: 37
- Unique to Rasheed: 22

**Byte-identical:**
- None

**Different content:**
- None

**Only Tecsmart:**
- Tecsmart/adimg/1.jpg
- Tecsmart/adimg/2.jpg
- Tecsmart/adimg/3.jpg
- Tecsmart/adimg/4.jpg
- Tecsmart/adimg/5.jpg
- Tecsmart/alogin.html
- Tecsmart/config/config.js
- Tecsmart/css/fontello.min.css
- Tecsmart/css/style.min.css
- Tecsmart/css/style.min1.css
- Tecsmart/css/style.purple_blue.css
- Tecsmart/css/style.purple_dark_mauve.css
- Tecsmart/css/style.purple_neon.css
- Tecsmart/css/style.purple_pink.css
- Tecsmart/fonts/Almarai.css
- Tecsmart/fonts/Almarai.woff2
- Tecsmart/fonts/fontello.woff2
- Tecsmart/img/es.svg
- Tecsmart/img/favicon.ico
- Tecsmart/img/gs.svg
- Tecsmart/img/h.svg
- Tecsmart/img/logo.png
- Tecsmart/img/ss.svg
- Tecsmart/index.html
- Tecsmart/js/hotBlocker.min.js
- Tecsmart/js/hotCookie.min.js
- Tecsmart/js/hotInImprover.min.js
- Tecsmart/js/hotOptions.min.js
- Tecsmart/js/init.min.js
- Tecsmart/js/main.min.js
- Tecsmart/js/mus.min.js
- Tecsmart/js/speedGate.js
- Tecsmart/js/templates.min.js
- Tecsmart/login.html
- Tecsmart/logout.html
- Tecsmart/redirect.html
- Tecsmart/status.html

**Only Rasheed:**
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
