# Assets

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon. Until the owner’s own exists: the name set as a wordmark in the display face, and its first letter as the favicon — no invented symbol to throw away later. The favicon is a file (src/app/icon.svg, the letter as a path), never a generated icon route: one that fetches a font at build time breaks static hosting and builds without a network (Kelp Line) |
| ⌕ Find it | Typefaces | 2 families | required | All text | Bagel Fat One, Epilogue (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ✎ Create it | Product photography | 20 photos, plus a set per product | required | The parts in the shot list (recipe/media.md): First screen — Product stage, Categories, Product Grid, Collection, Product Highlight, Product buy box, Product Highlight | One file per shot-list slot, at the size and ratio it gives; one grade across all |
| ⌕ Find it | Lifestyle images | 8 photos | recommended | The parts in the shot list (recipe/media.md): Gallery | One file per shot-list slot, at the size and ratio it gives; one grade across all |
| ○ Optional | Turntable sequence | 24–48 frames | optional | Scroll-rotating product | Fixed camera, 7.5–15° per frame |

### Asset Creation Paths

#### Shoot products on a seamless background
1. Use a paper sweep in the recipe surface color (#FFEB8F).
2. One soft key light at 45°, one fill card; same lens and height for every product.
3. Shoot exactly what the shot list (recipe/media.md) asks for each product — the grid picture, then the product page’s views.
4. Export at the shot list’s sizes; next/image makes AVIF/WebP. Until the shoot, a stock photo of a similar object is only a temporary stand-in, marked as such.

Tools: Squoosh

## Replacing temporary assets
Drop the real file into `public/media/` with the same key name, or edit `src/config/assets.ts`. Nothing else changes.
