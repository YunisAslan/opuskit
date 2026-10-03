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

Photos alternate with short text, like a magazine feature. Suits 3–8 photos. Chosen because: a practice — photos alongside the words.
- **Composition:** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row.
- **Behavior:** Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax).
- **Responsive:** Stacks to photo-then-text; every photo full width; keep the original order.
- **Where:** every gallery, lookbook, featured-work or story section; supporting images elsewhere come from the same set.

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 3 families | required | All text | Bellefair, Red Hat Text, Red Hat Display (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ⌕ Find it | Photography set | 6–10 images | required | Hero, section media, gallery | Min 2400px long edge, consistent grade, mix of wide (3:2) and portrait (4:5) |
| ⌕ Find it | Mobile hero crop | 1 image | recommended | Hero on small screens | 4:5 or 9:16 crop with focal point centred |
| ○ Optional | Texture | 1–2 | optional | Subtle paper/grain overlay at ≤ 4% opacity | Seamless tile, 1024px, WebP |

### Asset Creation Paths

#### Find or shoot a consistent photo set
1. Collect 15–20 candidates with the same light direction and color temperature.
2. Select 6–10; apply one shared grade (same warmth, contrast, grain).
3. Export 2400px long edge; let next/image generate responsive sizes.
4. Crop mobile versions with the focal point centred.

Tools: Unsplash, Pexels, Squoosh
