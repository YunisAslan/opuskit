## Media Direction — Photography-led

Photography sets the mood; every image should share light, color temperature and point of view.

### Treatment
- One consistent grade across all images
- Large, uncluttered crops — show fewer, bigger images
- Captions in the utility face, small and precise
- Never place text over busy areas of an image

**Formats:** AVIF/WebP via next/image, srcset sizes 640–2400w, lazy-load below the fold, priority on the hero image only

### Hero — Full-bleed photo with depth
- **Composition:** 100svh full-bleed photograph, headline anchored bottom-left, image slightly larger than viewport (scale 1.1) to allow drift.
- **Behavior:** On scroll the image translates at ~0.3× scroll speed and the headline lines reveal upward; the next section overlaps the hero as it leaves.
- **Responsive:** Mobile: use a dedicated 4:5 or 9:16 crop; reduce parallax to a simple scale-down (1.1 → 1.0).
- **Requires:** 1 hero image (min 2800px, desktop crop 16:9); 1 mobile crop (4:5)
- **Fallback:** Temporary curated image; parallax works identically once replaced.

### Photos — Even grid

Same-size tiles in tidy rows — easy to compare side by side. Suits 6+ photos. Chosen because: a restaurant site — visitors compare items side by side.
- **Composition:** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile.
- **Behavior:** Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards).
- **Responsive:** 2 columns on mobile; never 1 unless the photos are the product itself.
- **Where:** the site’s default for photo sets; a part with its own **Photos** line in recipe/layout.md follows that line instead.

### Shot list — part by part

What each picture or film shows. Real media is what makes the site premium: find, shoot or make exactly these; until one exists, its part uses a temporary picture of the same subject and format.

| Where | | What it shows | Format |
|---|---|---|---|
| Home · First screen — Full-bleed photo with depth | photo | The opening picture of Low Hum: the place, the thing it makes or the person, at its best light, with calm space where the headline sits | min 2800px · 16:9 for desktop, plus a 4:5 crop for phones (Mobile hero crop) |
| Menu · Gallery | photo | the place and what it makes, as a set: wide views, close details, people at work — one light, one grade | 8 photos (people and things may be 4:5) · 3:2 · 2400×1600 |
| Reservations · Location | photo | the way in as visitors arrive — the door, the street, the path | 1 photo · 4:5 · 1920×2400 |

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon. Until the owner’s own exists: the name set as a wordmark in the display face, and its first letter as the favicon — no invented symbol to throw away later |
| ⌕ Find it | Typefaces | 2 families | required | All text | Gloock, Figtree (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ⌕ Find it | Photography set | 10 photos | required | The parts in the shot list (recipe/media.md): First screen — Full-bleed photo with depth, Gallery, Location | One file per shot-list slot, at the size and ratio it gives; one grade across all |
| ⌕ Find it | Mobile hero crop | 1 image | recommended | Hero on small screens | 4:5 or 9:16 crop with focal point centred |

### Asset Creation Paths

#### Find or shoot a consistent photo set
1. Collect 15–20 candidates with the same light direction and color temperature.
2. Select 6–10; apply one shared grade (same warmth, contrast, grain).
3. Export 2400px long edge; let next/image generate responsive sizes.
4. Crop mobile versions with the focal point centred.

Tools: Unsplash, Pexels, Squoosh
