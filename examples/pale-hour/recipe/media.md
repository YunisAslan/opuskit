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

### Photos — Gallery wall

A mixed-size grid that keeps every photo’s real shape; tap one to open it large. Suits 7+ photos, mixed shapes. Chosen because: a event site — the work is the point, so show it all, each photo in its real shape.
- **Composition:** Masonry columns (3 desktop, 2 tablet) using each photo’s native ratio — no forced crops; gutters from the spacing scale; one or two photos span two columns to break the grid.
- **Behavior:** Staggered reveal (40–60 ms per item); click opens an accessible lightbox with arrow keys, Esc and swipe.
- **Responsive:** Two columns on mobile down to 360 px, then one; the lightbox swipes.
- **Where:** the site’s default for photo sets; a part with its own **Photos** line in recipe/layout.md follows that line instead.
- **Start from:** [PhotoSwipe (lightbox)](https://photoswipe.com) — restyle to this recipe’s tokens and type; never ship a component’s demo look.

### Shot list — part by part

What each picture or film shows. Real media is what makes the site premium: find, shoot or make exactly these; until one exists, its part uses a temporary picture of the same subject and format.

| Where | | What it shows | Format |
|---|---|---|---|
| Home · First screen — Full-bleed photo with depth | photo | The opening picture of Pale Hour: the place, the thing it makes or the person, at its best light, with calm space where the headline sits | min 2800px · 16:9 for desktop, plus a 4:5 crop for phones (Mobile hero crop) |
| Home · Featured Work; Exhibitions · Featured Work | photo | one strong picture of each project — the real work itself, never a mock-up (the same photo leads its project page) | 4 photos (one per project) · 3:4 · 1800×2400 |
| Home · Journal | photo | one picture per post, the one that opens it | 3 photos (one per post) · 3:2 · 2000×1333 |
| Exhibitions · Gallery | photo | the place and what it makes, as a set: wide views, close details, people at work — one light, one grade | 8 photos (people and things may be 4:5) · 3:2 · 2400×1600 |
| Visit · Location | photo | the way in as visitors arrive — the door, the street, the path | 1 photo · 3:4 · 1800×2400 |
| About · About | photo | a real portrait of the person or the team, in their own place | 1 photo · 3:4 · 1800×2400 |
| About · Team | photo | one portrait per person, in the same light and framing, ideally where they work | 4 photos (one per person) · 3:4 · 1500×2000 |

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon. Until the owner’s own exists: the name set as a wordmark in the display face, and its first letter as the favicon — no invented symbol to throw away later |
| ⌕ Find it | Typefaces | 2 families | required | All text | Prata, Public Sans (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ⌕ Find it | Photography set | 22 photos | required | The parts in the shot list (recipe/media.md): First screen — Full-bleed photo with depth, Featured Work, Journal, Gallery, Location, About, Team | One file per shot-list slot, at the size and ratio it gives; one grade across all |
| ⌕ Find it | Mobile hero crop | 1 image | recommended | Hero on small screens | 4:5 or 9:16 crop with focal point centred |

### Asset Creation Paths

#### Find or shoot a consistent photo set
1. Collect 15–20 candidates with the same light direction and color temperature.
2. Select 6–10; apply one shared grade (same warmth, contrast, grain).
3. Export 2400px long edge; let next/image generate responsive sizes.
4. Crop mobile versions with the focal point centred.

Tools: Unsplash, Pexels, Squoosh
