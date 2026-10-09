## Media Direction — Photography-led

Photography sets the mood; every image should share light, color temperature and point of view.

### Treatment
- One consistent grade across all images
- Large, uncluttered crops — show fewer, bigger images
- Captions in the utility face, small and precise
- Never place text over busy areas of an image

**Formats:** AVIF/WebP via next/image, srcset sizes 640–2400w, lazy-load below the fold, priority on the hero image only

### Hero — Editorial image hero
- **Composition:** One strong photograph (portrait 4:5 or wide 3:2) beside or beneath a restrained headline. Clear focal point, generous empty space.
- **Behavior:** Headline and image fade up once on load (≤ 600ms). No looping motion.
- **Responsive:** Mobile: headline first, image full-width beneath at 4:5. Keep the focal point inside the centre 60% for safe cropping.
- **Requires:** 1 hero image (min 2400px long edge)
- **Fallback:** Curated temporary image from the recipe's reference set, clearly marked for replacement.

### Photos — Photo story

Photos alternate with short text, like a magazine feature. Suits 3–8 photos. Chosen because: a foundation — photos alongside the words.
- **Composition:** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row.
- **Behavior:** Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax).
- **Responsive:** Stacks to photo-then-text; every photo full width; keep the original order.
- **Where:** the site’s default for photo sets; a part with its own **Photos** line in recipe/layout.md follows that line instead.

### Shot list — part by part

What each picture or film shows. Real media is what makes the site premium: find, shoot or make exactly these; until one exists, its part uses a temporary picture of the same subject and format.

| Where | | What it shows | Format |
|---|---|---|---|
| Home · First screen — Editorial image hero | photo | The opening picture of Kelp Line: the place, the thing it makes or the person, at its best light, with calm space where the headline sits | 1 photo · 4:5 · 1920×2400 |
| Home · Editorial Story; Our mission · Editorial Story; Stories · Editorial Story | photo | the picture that carries the story: a detail, the place or the people | 1 photo · 3:4 · 1800×2400 |
| Home · Journal | photo | one picture per post, the one that opens it | 3 photos (one per post) · 3:2 · 2000×1333 |
| Our mission · About | photo | a real portrait of the person or the team, in their own place | 1 photo · 3:4 · 1800×2400 |
| Our mission · Team | photo | one portrait per person, in the same light and framing, ideally where they work | 4 photos (one per person) · 3:4 · 1500×2000 |
| Stories · Gallery | photo | the place and what it makes, as a set: wide views, close details, people at work — one light, one grade | 8 photos (people and things may be 4:5) · 3:2 · 2400×1600 |
| Contact · Location | photo | the way in as visitors arrive — the door, the street, the path | 1 photo · 3:4 · 1800×2400 |

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon. Until the owner’s own exists: the name set as a wordmark in the display face, and its first letter as the favicon — no invented symbol to throw away later |
| ⌕ Find it | Typefaces | 2 families | required | All text | Hedvig Letters Serif, Hedvig Letters Sans (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ⌕ Find it | Photography set | 19 photos | required | The parts in the shot list (recipe/media.md): First screen — Editorial image hero, Editorial Story, Journal, About, Team, Gallery, Location | One file per shot-list slot, at the size and ratio it gives; one grade across all |
| ⌕ Find it | Mobile hero crop | 1 image | recommended | Hero on small screens | 4:5 or 9:16 crop with focal point centred |

### Asset Creation Paths

#### Find or shoot a consistent photo set
1. Collect 15–20 candidates with the same light direction and color temperature.
2. Select 6–10; apply one shared grade (same warmth, contrast, grain).
3. Export 2400px long edge; let next/image generate responsive sizes.
4. Crop mobile versions with the focal point centred.

Tools: Unsplash, Pexels, Squoosh
