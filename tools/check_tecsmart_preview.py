#!/usr/bin/env python3
"""Static compatibility and package checks for the Tecsmart visual preview."""
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import sys

SITE = Path("analysis/extracted/Tecsmart/Tecsmart")
INDEX = SITE / "index.html"
PROTECTED = [
    "alogin.html", "login.html", "logout.html", "redirect.html", "status.html",
    "config", "js",
]

class ContractParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.names = []
        self.scripts = []
        self.stylesheets = []
        self.controls = []
        self.anchors = []

    def handle_starttag(self, tag, attrs):
        attrs = list(attrs)
        data = dict(attrs)
        if "id" in data:
            self.ids.append(data["id"])
        if "name" in data:
            self.names.append(data["name"])
        if tag == "script" and data.get("src"):
            self.scripts.append(data["src"])
        if tag == "link" and data.get("rel") == "stylesheet":
            self.stylesheets.append(data.get("href", ""))
        if tag in {"form", "input", "select", "button"}:
            self.controls.append((tag, tuple(attrs)))
        if tag == "a":
            self.anchors.append(tuple(attrs))

def fail(message):
    print(f"FAIL: {message}", file=sys.stderr)
    raise SystemExit(1)

def git_show(path):
    return subprocess.check_output(
        ["git", "show", f"origin/main:{path}"], text=True, encoding="utf-8"
    )

def parse(markup):
    parser = ContractParser()
    parser.feed(markup)
    return parser

if not SITE.is_dir():
    fail(f"Missing site directory: {SITE}")

required = [
    "index.html", "login.html", "alogin.html", "logout.html", "redirect.html",
    "status.html", "config/config.js", "css/fontello.min.css",
    "css/style.min.css", "css/tecsmart-modern.css", "js/init.min.js",
    "js/main.min.js", "js/speedGate.js", "js/hotCookie.min.js",
    "fonts/Almarai.woff2", "img/favicon.ico",
]
for rel in required:
    if not (SITE / rel).is_file():
        fail(f"Missing required file: {rel}")

base_index = git_show(str(INDEX))
current_index = INDEX.read_text(encoding="utf-8")
base = parse(base_index)
current = parse(current_index)

for label in ("ids", "names", "scripts", "controls", "anchors"):
    if getattr(base, label) != getattr(current, label):
        fail(f"Protected index contract changed: {label}")

for rel in PROTECTED:
    path = f"{SITE.as_posix()}/{rel}"
    result = subprocess.run(
        ["git", "diff", "--quiet", f"origin/main...HEAD", "--", path]
    )
    if result.returncode != 0:
        fail(f"Protected RouterOS/JavaScript/config path changed: {path}")

# Every local HTML asset/navigation reference must resolve inside the package.
for rel in current.scripts + current.stylesheets:
    if not rel or rel.startswith(("#", "data:")) or "://" in rel:
        continue
    if not (SITE / rel.split("?", 1)[0].split("#", 1)[0]).is_file():
        fail(f"Broken local HTML asset reference: {rel}")

for html_ref in re.findall(r'''(?:src|href)=["']([^"']+)["']''', current_index):
    if not html_ref or html_ref.startswith(("#", "data:")) or "://" in html_ref:
        continue
    if not (SITE / html_ref.split("?", 1)[0].split("#", 1)[0]).is_file():
        fail(f"Broken local HTML reference: {html_ref}")

for css_path in (SITE / "css").glob("*.css"):
    css = css_path.read_text(encoding="utf-8", errors="replace")
    if css.count("{") != css.count("}"):
        fail(f"Unbalanced CSS braces: {css_path}")
    for raw in re.findall(r"url\(\s*['\"]?([^'\")]+)", css, flags=re.I):
        ref = raw.strip().split("?", 1)[0].split("#", 1)[0]
        if not ref or ref.startswith(("data:", "#")) or "://" in ref:
            continue
        target = (css_path.parent / ref).resolve()
        if not target.is_file():
            fail(f"Broken CSS asset reference in {css_path}: {ref}")

modern_css = (SITE / "css/tecsmart-modern.css").read_text(encoding="utf-8")
if any(token in modern_css.lower() for token in ("http://", "https://")):
    fail("The new stylesheet must not depend on remote assets")
for token in ("#080d1b", "#4778ff", "#8657f5", "#25d5e8"):
    if token not in modern_css.lower():
        fail(f"Expected dark-theme palette token is missing: {token}")
if "tecsmart-modern.css" not in current_index:
    fail("index.html does not load the new local stylesheet")
if '<meta name="theme-color" content="#080d1b">' not in current_index:
    fail("Browser theme color is not set to the dark navy palette")

print("PASS: required Tecsmart files and local asset references exist")
print("PASS: index IDs, names, form controls, anchors, and script sources match main")
print("PASS: RouterOS templates, JavaScript, and config are unchanged from main")
print("PASS: CSS braces and local CSS asset references are valid")
print("PASS: dark palette and local stylesheet are wired into index.html")
