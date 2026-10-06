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

### Photos — Names that reveal photos

A clean list of titles; hovering one shows its photo beside the cursor. Suits 5–20 projects or items. Chosen because: a studio site — a list of names stays calm and each photo appears when it is wanted.
- **Composition:** Full-width list of titles in the display face with year/category in the utility face; the photo appears in a fixed-size frame (4:5) that follows the cursor or sits in a side column.
- **Behavior:** Photo fades and scales in (200–300 ms) on hover/focus, follows the pointer with light lag; keyboard focus shows it too.
- **Responsive:** Touch has no hover: show each photo as a small thumbnail at the start of its row.
- **Where:** every gallery, lookbook, featured-work or story section; supporting images elsewhere come from the same set.
- **Start from:** [Codrops — hover reveal demos](https://tympanus.net/codrops/?s=hover+reveal) — restyle to this recipe’s tokens and type; never ship a component’s demo look.

### Shot list — part by part

What each picture or film shows. Real media is what makes the site premium: find, shoot or make exactly these; until one exists, its part uses a temporary picture of the same subject and format.

| Where | | What it shows | Format |
|---|---|---|---|
| Home · First screen — Full-bleed photo with depth | photo | The opening picture of Fieldhouse: the place, the thing it makes or the person, at its best light, with calm space where the headline sits | min 2800px · 16:9 for desktop and a 4:5 crop for phones |
| Home · Featured Work | photo | one strong picture per project — the real work itself, never a mock-up | 3–6 photos · 3:2 or 4:5, all the same ratio · min 2400px |
| Work · Featured Work | photo | one strong picture per project — the real work itself, never a mock-up | 3–6 photos · 3:2 or 4:5, all the same ratio · min 2400px |
| Work · Gallery | photo | the place and what it makes, as a set: wide views, close details, people at work — one light, one grade | 6–12 photos · 3:2 for places, 4:5 for people and things · min 2400px |
| Project · Case Study Preview | photo | the project in use, then two or three moments of how it was made | 3–4 photos · 3:2 · min 2400px |
| Project · Gallery | photo | the place and what it makes, as a set: wide views, close details, people at work — one light, one grade | 6–12 photos · 3:2 for places, 4:5 for people and things · min 2400px |
| Project · Featured Work | photo | one strong picture per project — the real work itself, never a mock-up | 3–6 photos · 3:2 or 4:5, all the same ratio · min 2400px |
| About · About | photo | a real portrait of the person or the team, in their own place | 1–2 photos · 4:5 portrait · min 2400px |
| About · Team | photo | one portrait per person, in the same light and framing, ideally where they work | one per person · 4:5 · min 2000px |
| Contact · Location | photo | the way in as visitors arrive — the door, the street — and one view inside | 2 photos · 3:2 · min 2400px |

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 2 families | required | All text | Cormorant, Karla (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ⌕ Find it | Photography set | 6–10 images | required | Hero, section media, gallery | Min 2400px long edge, consistent grade, mix of wide (3:2) and portrait (4:5) |
| ⌕ Find it | Mobile hero crop | 1 image | recommended | Hero on small screens | 4:5 or 9:16 crop with focal point centred |

### Asset Creation Paths

#### Find or shoot a consistent photo set
1. Collect 15–20 candidates with the same light direction and color temperature.
2. Select 6–10; apply one shared grade (same warmth, contrast, grain).
3. Export 2400px long edge; let next/image generate responsive sizes.
4. Crop mobile versions with the focal point centred.

Tools: Unsplash, Pexels, Squoosh
