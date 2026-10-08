"""Temporary placeholder photographs for Pale Hour.

One plain image per asset key in src/config/assets.ts, at the exact size and ratio the shot list (recipe/media.md)
gives, with its key written in a corner. Each is a darker grey than the page ground (#DAD8DB), so it stays visible.
When the real photographs arrive, replace the files in public/media/ with the same names. Nothing else changes.

    python3 scripts/make-placeholders.py           # only fills slots that have no file yet
    python3 scripts/make-placeholders.py --force   # overwrites everything, real photographs included
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "public" / "media"
OUT.mkdir(parents=True, exist_ok=True)

# Tints and shades of the Gallery Grey palette: muted #4A484D and text #0D0D0F, stepped so neighbours differ.
TONES = ["#3F3D42", "#4A484D", "#55535A", "#5F5D63", "#36353A", "#6A686E", "#454348", "#5A585E"]
INK = (233, 232, 234)  # surface #E9E8EA, for the label

# key, size, label position ("tl" top-left or "tr" top-right, kept clear of the hero headline), subject
SHOTS = [
    ("hero", (2800, 1575), "tr", "Home, first screen. The place at its best light, calm space bottom-left for the headline."),
    ("mobileHeroCrop", (1600, 2000), "tr", "Home, first screen on phones. 4:5 crop of the hero, focal point centred."),
    *[(f"featuredWork-{i}", (1800, 2400), "tl", "One work from the exhibition, never a mock-up.") for i in range(1, 5)],
    *[(f"journal-{i}", (2000, 1333), "tl", "The picture that opens the journal post.") for i in range(1, 4)],
    *[(f"gallery-{i}", (2400, 1600), "tl", "The print works and its rooms: wide views, details, people at work.") for i in range(1, 9)],
    ("location", (1800, 2400), "tl", "The way in: the yard gate on Foundry Lane."),
    ("about", (1800, 2400), "tl", "Portrait of the founders in the press hall."),
    *[(f"team-{i}", (1500, 2000), "tl", "Portrait, same light and framing for everyone.") for i in range(1, 5)],
]


FONT = Path(__file__).resolve().parent.parent / "src" / "fonts" / "PublicSans-VariableFont_wght.ttf"


def font(size: int) -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(str(FONT), size)
    f.set_variation_by_axes([500])  # Public Sans Medium, the utility weight
    return f


def hex_rgb(h: str) -> tuple[int, int, int]:
    return tuple(int(h[i : i + 2], 16) for i in (1, 3, 5))  # type: ignore[return-value]


def ratio(w: int, h: int) -> str:
    known = {(16, 9): "16:9", (4, 5): "4:5", (3, 4): "3:4", (3, 2): "3:2"}
    for (a, b), name in known.items():
        if abs(w / h - a / b) < 0.01:
            return name
    return f"{w}:{h}"


def make(index: int, key: str, size: tuple[int, int], corner: str, subject: str) -> None:
    if (OUT / f"{key}.jpg").exists() and "--force" not in sys.argv:
        print(f"{key}.jpg  kept (a file is already there)")
        return
    w, h = size
    base = hex_rgb(TONES[index % len(TONES)])
    img = Image.new("RGB", size, base)
    draw = ImageDraw.Draw(img)
    # A soft vertical fall-off, like light from a high window: lighter at the top.
    for y in range(h):
        k = 1 + 0.10 * (1 - y / h)
        draw.line([(0, y), (w, y)], fill=tuple(min(255, int(c * k)) for c in base))

    short = min(w, h)
    pad = int(short * 0.06)
    top = int(h * 0.14) if corner == "tr" else pad  # keep clear of the menu on the first screen
    big, small = font(int(short * 0.07)), font(int(short * 0.026))
    lines = [(key, big), (f"{ratio(w, h)}   {w} × {h}", small), ("Temporary picture", small)]
    y = top
    for text, f in lines:
        tw = draw.textlength(text, font=f)
        x = w - pad - tw if corner == "tr" else pad
        draw.text((x, y), text, font=f, fill=INK)
        y += int(f.size * 1.35)
    # The subject, small, along the bottom edge on the label's side.
    sub = font(int(short * 0.02))
    sx = w - pad - draw.textlength(subject, font=sub) if corner == "tr" else pad
    if sx < pad:
        sx = pad
    draw.text((sx, h - pad - sub.size), subject, font=sub, fill=INK)

    # Printer's crop marks in the four corners — a nod to the print works.
    m, l, s = int(short * 0.025), int(short * 0.05), max(2, short // 600)
    for cx, cy, dx, dy in ((m, m, 1, 1), (w - m, m, -1, 1), (m, h - m, 1, -1), (w - m, h - m, -1, -1)):
        draw.line([(cx, cy), (cx + dx * l, cy)], fill=INK, width=s)
        draw.line([(cx, cy), (cx, cy + dy * l)], fill=INK, width=s)

    img.save(OUT / f"{key}.jpg", "JPEG", quality=82, optimize=True, progressive=True)
    print(f"{key}.jpg  {w}×{h}")


for i, shot in enumerate(SHOTS):
    make(i, *shot)
