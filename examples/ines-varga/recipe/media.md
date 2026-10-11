## Media Direction — Illustration-led

A single illustrative voice across the site — one illustrator, one line weight, one palette.

### Treatment
- Use the recipe palette inside the illustrations
- Prefer SVG for crispness and animation
- Match type weight to line weight
- Never mix illustration styles

**Formats:** Optimised SVG (SVGO), or PNG/WebP for painterly styles

### Hero — Illustrated hero
- **Composition:** A commissioned illustration as the key visual, with type set in harmony with its line weight and palette.
- **Behavior:** SVG layers can drift independently (parallax at 2–3 depths) or draw in once (stroke-dashoffset).
- **Responsive:** Mobile: a portrait version of the illustration or a cropped detail.
- **Requires:** Hero illustration (SVG preferred, layered); Spot illustrations (3–6)
- **Fallback:** Typographic hero until illustrations exist.

### Shot list — part by part

What each picture or film shows. Real media is what makes the site premium: find, shoot or make exactly these; until one exists, its part uses a temporary picture of the same subject and format.

| Where | | What it shows | Format |
|---|---|---|---|
| Home · Featured Work; Selected Work · Featured Work; Project · Featured Work | photo | one strong picture of each project — the real work itself, never a mock-up (the same photo leads its project page) | 4 photos (one per project) · 1:1 · 2400×2400 |
| Project · Case Study Preview | photo | the project at its best, wide — the picture that opens its page | 1 photo per project · 21:9 · 2400×1029 |
| Project · Gallery | photo | the place and what it makes, as a set: wide views, close details, people at work — one light, one grade | 8 photos per project (people and things may be 4:5) · 3:2 · 2400×1600 |
| About · About | photo | a real portrait of the person or the team, in their own place | 1 photo · 4:3 · 2400×1800 |

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon. Until the owner’s own exists: the name set as a wordmark in the display face, and its first letter as the favicon — no invented symbol to throw away later. The favicon is a file (src/app/icon.svg, the letter as a path), never a generated icon route: one that fetches a font at build time breaks static hosting and builds without a network (Kelp Line) |
| ⌕ Find it | Typefaces | 2 families | required | All text | Caveat Brush, Caveat, Winky Sans (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ⌕ Find it | Hero illustration | 1 | required | Hero key visual | Layered SVG (3 depth layers if animated) |
| ⌕ Find it | Spot illustrations | 3–6 | required | Section accents | Same style and palette |

### Asset Creation Paths

#### Commission or source illustrations
1. Brief one illustrator with the palette hex values and the mood words.
2. Ask for layered SVGs (background / midground / foreground) if motion is planned.
3. Use an open-licence set temporarily while the commission is in progress.

Tools: Blush, Open Peeps, unDraw
