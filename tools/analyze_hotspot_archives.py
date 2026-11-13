#!/usr/bin/env python3
"""Safely extract and statically inspect the MikroTik Hotspot archives."""
from pathlib import Path
import hashlib, json, re, subprocess, zipfile

ROOT = Path(".")
OUT = Path("analysis-output")
OUT.mkdir(exist_ok=True)
SOURCES = {"AL-TAJ.NET": ROOT / "AL-TAJ.NET.rar.zip", "Tecsmart": ROOT / "Tecsmart.zip", "Rasheed": ROOT / "صفحة رشيد اعتقد بدون اي تعديل.zip"}
TEXT_EXT = {".html", ".htm", ".css", ".js", ".json", ".xml", ".txt", ".php", ".asp", ".md", ".conf", ".lua"}
PATTERNS = {
    "MikroTik template variables": r"\$\([^)]+\)",
    "login/authentication endpoints": r"(?i)(link-login|login\.html|chap-id|chap-challenge|md5\.js|username|password|radius|cookie)",
    "session/status/logout": r"(?i)(status\.html|logout\.html|link-logout|link-status|uptime|bytes-in|bytes-out|session)",
    "router/API references": r"(?i)(routeros|mikrotik|api\.php|xmlhttprequest|websocket|fetch\s*\()",
    "external dependencies": r"(?i)(https?://|cdnjs|googleapis|bootstrap|jquery)",
}
def safe_extract_zip(path, dest):
    with zipfile.ZipFile(path) as z:
        for info in z.infolist():
            target = (dest / info.filename).resolve()
            if dest.resolve() not in target.parents and target != dest.resolve():
                raise RuntimeError("Unsafe archive path: " + info.filename)
        z.extractall(dest)

def extract_archive(archive, dest):
    dest.mkdir(parents=True, exist_ok=True)
    if not archive.exists():
        raise FileNotFoundError(archive)
    if zipfile.is_zipfile(archive):
        safe_extract_zip(archive, dest)
    else:
        subprocess.run(["7z", "x", "-y", "-o" + str(dest), str(archive)], check=True)
    for nested in list(dest.rglob("*")):
        if not nested.is_file():
            continue
        if zipfile.is_zipfile(nested):
            sub = nested.parent / (nested.stem + "_extracted")
            if not sub.exists():
                safe_extract_zip(nested, sub)
        elif nested.suffix.lower() == ".rar":
            sub = nested.parent / (nested.stem + "_extracted")
            if not sub.exists():
                subprocess.run(["7z", "x", "-y", "-o" + str(sub), str(nested)], check=True)
    return dest

def sha(path):
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

report = ["# MikroTik Hotspot archive analysis", "",
          "> Static inspection only. No page was executed and no router configuration was changed.", ""]
inventory = {}
for name, archive in SOURCES.items():
    dest = OUT / "extracted" / name
    extract_archive(archive, dest)
    files = sorted(p for p in dest.rglob("*") if p.is_file())
    inventory[name] = [{"path": p.relative_to(dest).as_posix(), "size": p.stat().st_size, "sha256": sha(p)} for p in files]
    report += ["## " + name, "", "- Source archive: " + archive.name,
               "- Source size: " + str(archive.stat().st_size) + " bytes",
               "- Source SHA-256: " + sha(archive),
               "- Extracted file count: " + str(len(files)), "", "### File inventory", ""]
    if not files:
        report.append("- No files extracted.")
    for p in files:
        report.append("- " + p.relative_to(dest).as_posix() + " — " + str(p.stat().st_size) + " bytes")
    report += ["", "### Static code indicators", ""]
    found = {k: [] for k in PATTERNS}
    for p in files:
        if p.suffix.lower() not in TEXT_EXT or p.stat().st_size > 2_000_000:
            continue
        try:
            content = p.read_text(encoding="utf-8-sig")
        except (UnicodeDecodeError, OSError):
            continue
        for label, pattern in PATTERNS.items():
            matches = list(dict.fromkeys(re.findall(pattern, content)))
            if matches:
                found[label].append((p.relative_to(dest).as_posix(), matches[:30]))
    for label, entries in found.items():
        report.append("**" + label + ":**")
        if not entries:
            report.append("- No matching indicators found.")
        for rel, matches in entries:
            report.append("- " + rel + ": " + ", ".join(str(m) for m in matches))
        report.append("")
    report += ["### Initial interpretation", "",
               "Indicators are strings found in files, not proof that a feature is active. Trace source files to confirm login flow, CHAP handling, redirects, status polling, and logout behavior before proposing changes.", ""]
# Cross-archive comparison by relative path and content hash.
report += ["## Cross-archive comparison", "",
           "The comparison below uses relative paths and SHA-256 hashes. A matching filename alone does not mean the files are identical.", ""]
names = list(inventory)
for i, left in enumerate(names):
    for right in names[i + 1:]:
        lmap = {x["path"]: x for x in inventory[left]}
        rmap = {x["path"]: x for x in inventory[right]}
        common = sorted(set(lmap) & set(rmap))
        identical = [p for p in common if lmap[p]["sha256"] == rmap[p]["sha256"]]
        different = [p for p in common if lmap[p]["sha256"] != rmap[p]["sha256"]]
        only_left = sorted(set(lmap) - set(rmap))
        only_right = sorted(set(rmap) - set(lmap))
        report += [f"### {left} vs {right}", "",
                   f"- Same relative path: {len(common)}",
                   f"- Byte-identical files: {len(identical)}",
                   f"- Same path but different content: {len(different)}",
                   f"- Unique to {left}: {len(only_left)}",
                   f"- Unique to {right}: {len(only_right)}", ""]
        for label, paths in [("Byte-identical", identical), ("Different content", different),
                             (f"Only {left}", only_left), (f"Only {right}", only_right)]:
            report.append(f"**{label}:**")
            report.extend(["- " + p for p in paths] if paths else ["- None"])
            report.append("")
(OUT / "HOTSPOT_ANALYSIS.md").write_text("\n".join(report), encoding="utf-8")
(OUT / "inventory.json").write_text(json.dumps(inventory, indent=2), encoding="utf-8")
print("Analysis complete: " + str(sum(len(v) for v in inventory.values())) + " files")
