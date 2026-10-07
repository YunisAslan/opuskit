"""Temporary media for Maison Vey.

Writes one plain placeholder per asset key, in the exact ratio and size the shot list (recipe/media.md) gives,
a calm tone from the Oxblood Room palette with the key written small in a corner. Also writes
src/config/assets.ts and marks every key as temporary in assets/manifest.json.

When the real photos arrive, replace the files in public/media/ with the same names; nothing else changes.
Run again only to regenerate placeholders:  python3 scripts/make-placeholders.py
"""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "media"
OUT.mkdir(parents=True, exist_ok=True)

# Palette tones (recipe/color.md)
SURFACE = (0x5A, 0x1A, 0x23)    # seamless product ground
SECONDARY = (0x6B, 0x25, 0x30)  # hero stage
BORDER = (0x6E, 0x2A, 0x34)     # editorial / place
MUTED = (0xD7, 0xB5, 0xB0)      # label ink

# "min Npx" from the shot list is read as the long edge.
SIZES = {
    "16:9@2800": (2800, 1575),
    "4:5@2800": (2240, 2800),
    "4:5@2000": (1600, 2000),
    "4:5@2400": (1920, 2400),
    "1:1@2400": (2400, 2400),
    "3:2@2400": (2400, 1600),
}

SCENTS = [
    ("salt-quay", "Salt Quay"),
    ("orangery", "Orangery"),
    ("fig-courtyard", "Fig Courtyard"),
    ("reading-room", "Reading Room"),
    ("night-ferry", "Night Ferry"),
    ("discovery-set", "The Five Hours discovery set"),
]

# key: (size, tone, alt, usage, shot-list row)
assets: dict[str, tuple] = {
    # Original keys from the recipe's asset checklist — kept, each with its own placeholder.
    "productPhotography": ("4:5@2000", SURFACE, "A Maison Vey bottle alone on an oxblood ground", "Empty bag state", "Asset checklist: Product photography"),
    "lifestyleImages": ("3:2@2400", BORDER, "The workshop bench in Sète in late light", "404 page", "Asset checklist: Lifestyle images"),
    "turntableSequence": ("1:1@2400", SURFACE, "", "Optional scroll-rotating product (not used yet; one frame of 24–48)", "Asset checklist: Turntable sequence"),
    # Home · First screen — Product stage
    "hero": ("16:9@2800", SECONDARY, "A Salt Quay bottle standing on a stone ledge in early harbour light", "Home hero, desktop", "Home · First screen — Product stage (16:9)"),
    "hero-mobile": ("4:5@2800", SECONDARY, "A Salt Quay bottle standing on a stone ledge in early harbour light", "Home hero, phones", "Home · First screen — Product stage (4:5 crop)"),
    # Home · Editorial Story
    "editorial-place": ("3:2@2400", BORDER, "The harbour at Sète before six, boats still moored", "Home editorial story, opening image", "Home · Editorial Story (3:2)"),
    "editorial-hands": ("4:5@2400", BORDER, "Hands pouring a batch through a glass funnel at the bench", "Home editorial story, second image", "Home · Editorial Story (4:5)"),
    # Shop · Product Highlight
    "highlight-salt-quay": ("4:5@2400", SURFACE, "Salt Quay held in a hand, the glass stopper catching the light", "Shop product highlight", "Shop · Product Highlight"),
    # About · About
    "about-portrait": ("4:5@2400", BORDER, "Hélène and Tomas Vey at the workshop bench in Sète", "About portrait", "About · About"),
}
for slug, name in SCENTS:
    assets[f"product-{slug}"] = ("4:5@2000", SURFACE, f"{name} alone on an oxblood ground", "Product grids, buy box (front)", "Product Grid (Home, Shop, Product, Cart)")
    assets[f"product-{slug}-angle"] = ("4:5@2000", SURFACE, f"{name} turned three-quarters to the light", "Grid hover image, buy box (3/4)", "Product Grid — second angle")
    assets[f"product-{slug}-detail"] = ("1:1@2400", SURFACE, f"Close view of the {name} label and stopper", "Buy box (detail), Product page highlight", "Product · Product Highlight")
    assets[f"collection-{slug}"] = ("4:5@2400", BORDER, f"{name} styled in its place, lit like the rest of the range", "Collection strips (Home, Shop)", "Home · Collection / Shop · Collection")

try:
    font = ImageFont.load_default(size=36)
except TypeError:
    font = ImageFont.load_default()

for key, (size, tone, *_rest) in assets.items():
    w, h = SIZES[size]
    img = Image.new("RGB", (w, h), tone)
    d = ImageDraw.Draw(img)
    pad = max(40, w // 40)
    d.text((w - pad, h - pad), f"{key}   {size.split('@')[0]}   {w}x{h}", fill=MUTED, font=font, anchor="rs")
    img.save(OUT / f"{key}.jpg", "JPEG", quality=82, optimize=True, progressive=True)

# src/config/assets.ts
lines = [
    "// Asset reference layer. Components never hardcode media paths — they ask for a key.",
    "// Every file below is a TEMPORARY placeholder (scripts/make-placeholders.py): a plain tone with its key in a corner,",
    "// at the exact ratio and size of the shot list in recipe/media.md. Replacing one = dropping the real photo into",
    "// public/media/ under the same name (or editing one line here). Nothing else changes.",
    "export type AssetStatus = 'have' | 'temporary' | 'create' | 'find' | 'optional'",
    "export type Asset = { src: string; alt: string; width: number; height: number; status: AssetStatus; usage: string }",
    "",
    "export const assets = {",
]
for key, (size, _tone, alt, usage, _row) in assets.items():
    w, h = SIZES[size]
    k = key if key.isidentifier() else json.dumps(key)
    lines.append(f"  {k}: {{ src: '/media/{key}.jpg', alt: {json.dumps(alt, ensure_ascii=False)}, width: {w}, height: {h}, status: 'temporary', usage: {json.dumps(usage, ensure_ascii=False)} }},")
lines += [
    "} satisfies Record<string, Asset>",
    "",
    "export type AssetKey = keyof typeof assets",
    "export const asset = (key: AssetKey): Asset => assets[key]",
    "",
]
(ROOT / "src" / "config" / "assets.ts").write_text("\n".join(lines))

# assets/manifest.json — keep the checklist entries, mark photo groups temporary, list every file.
mp = ROOT / "assets" / "manifest.json"
manifest = json.loads(mp.read_text())
for group in ("productPhotography", "lifestyleImages", "turntableSequence"):
    manifest["assets"][group]["status"] = "temporary"
    manifest["assets"][group]["note"] = "Placeholder files in public/media/ until the owner's photos arrive."
manifest["temporary"] = {
    key: {
        "status": "temporary",
        "file": f"public/media/{key}.jpg",
        "ratio": size.split("@")[0],
        "size": f"{SIZES[size][0]}x{SIZES[size][1]}",
        "shot": row,
        "usage": usage,
        "replaceWith": "user-owned-photo, same file name",
    }
    for key, (size, _t, _a, usage, row) in assets.items()
}
mp.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
print(f"{len(assets)} placeholders written to {OUT}")
