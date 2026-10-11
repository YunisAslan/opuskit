# Assets

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

## Replacing temporary assets
Drop the real file into `public/media/` with the same key name, or edit `src/config/assets.ts`. Nothing else changes.
