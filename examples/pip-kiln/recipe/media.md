## Media Direction — Product-led

The product is photographed like an object of desire: isolated, well-lit, from consistent angles.

### Treatment
- Seamless backgrounds matching the palette surface color
- Same lighting and lens across all product shots
- Show scale and detail (close-ups)
- Use lifestyle images only in editorial sections

**Formats:** Transparent PNG/WebP cut-outs or AVIF on seamless background; 2400px min

### Hero — Product stage
- **Composition:** The product isolated on a clean surface, large and centred or offset, with name, one-line promise and price/CTA.
- **Behavior:** Subtle: product fades/scales in. Dynamic: product rotates or swaps angles on scroll using an image sequence (24–48 frames).
- **Responsive:** Mobile: product first, text beneath, CTA sticky at bottom.
- **Requires:** Product photo on seamless background (min 2400px); Optional 24–48 frame turntable sequence
- **Fallback:** Temporary curated product image; mark as placeholder.

### Shot list — part by part

What each picture or film shows. Real media is what makes the site premium: find, shoot or make exactly these; until one exists, its part uses a temporary picture of the same subject and format.

| Where | | What it shows | Format |
|---|---|---|---|
| Home · First screen — Product stage | photo | Pip & Kiln’s product alone, large and clean on a calm ground, from its best angle — with space where its name and price sit | 1 photo · 4:5 · 1920×2400 |
| Home · Categories | photo | one picture per category: its best piece | 4 photos (one per category) · 2:3 · 1333×2000 |
| Home · Product Grid; Shop · Product Grid; Product · Product Grid; Cart · Product Grid | photo | each product alone on the same ground, from the same angle, in the same light | 6 photos (one per product) · 2:3 · 1333×2000 |
| Home · Collection; Shop · Collection | photo | one picture per range: its best piece, all styled and lit the same way | 4 photos (one per range) · 2:3 · 1600×2400 |
| Shop · Product Highlight | photo | the main product up close: in hand or in use, its material visible | 1 photo · 1:1 · 2400×2400 |
| Product · Product buy box | photo | the product from the front, at three-quarters and one close detail — the same ground and light as the grid | 3 photos per product · 2:3 · 1333×2000 |
| Product · Product Highlight | photo | the main product up close: in hand or in use, its material visible | 1 photo per product · 1:1 · 2400×2400 |
| Workshops · Gallery | photo | the place and what it makes, as a set: wide views, close details, people at work — one light, one grade | 8 photos (people and things may be 4:5) · 3:2 · 2400×1600 |

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
