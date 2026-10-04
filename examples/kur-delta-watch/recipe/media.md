## Media Direction — Typography-led

Type is the image. Media is optional and used sparingly as punctuation.

### Treatment
- Set headlines manually — control every line break
- Limit to one display family
- Use scale contrast (at least 4:1 display/body)
- Images, if any, small and captioned

**Formats:** WOFF2 via next/font with display: swap; subset to used characters for display faces

### Hero — Kinetic type hero
- **Composition:** Oversized words that move with scroll: horizontal drift, weight or width shifts on a variable font, line-by-line masking.
- **Behavior:** Scroll-linked transforms (translateX, font-variation-settings) via Motion useScroll + useTransform (or CSS animation-timeline: view()); one idea per screen.
- **Responsive:** Mobile: reduce to vertical line reveals; avoid horizontal scroll overflow.
- **Requires:** Variable display font (weight/width axis); Short headline copy
- **Fallback:** Static typographic statement.

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 2 families | required | All text | Big Shoulders, Hanken Grotesk (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ✎ Create it | Final headline copy | 5–8 statements | required | Hero and section statements | Short: 3–8 words each; written before layout |
| ○ Optional | Punctuation images | 2–4 images | optional | Between type sections | High contrast, simple subjects |
| ⌕ Find it | Film for the band | 1 clip | required | The ambient video hero band mid-page — its own film, not the first screen's media | 1920×1080 min, 8–15 s, one slow continuous shot, no text burned in; run it through scripts/prepare-video.sh |
| ⌕ Find it | Band poster | 1 image | required | Shown before the band’s film loads and on reduced motion | First frame of the film, same crop |

### Asset Creation Paths

#### Turn an image into your hero video
1. Pick one strong still with depth (foreground + background) and a clear focal point.
2. Generate 3–4 takes with the prompt below in an image-to-video tool.
3. Choose the steadiest take; trim to 5–8s; export 1920×1080 H.264.
4. Encode a WebM and a 9:16 mobile version; export the first frame as the poster.
5. Drop files into /public/media and update the asset config — no code changes needed.

**Prompt:**

> Slow, continuous cinematic camera movement (gentle forward dolly) through the scene in the reference image. Mood: loud, honest, energetic. Lighting and color stay faithful to the image; soft natural light, gentle contrast. No cuts, no text, no people entering the frame, no sudden motion. Subtle atmospheric movement only (light, air, fabric, water). Duration 5–8 seconds, 16:9, 24fps, stable horizon, end frame close to start frame so it can loop.

- Source: Your image
- Creation: Image → Video
- Suggested motion: Slow cinematic forward camera movement
- Suggested duration: 5–8 seconds
- Aspect ratio: 16:9 (plus 9:16 for mobile)
- Usage: Kinetic type hero

Tools: Runway, Kling AI, Luma, Google Flow, Higgsfield

#### Use a temporary video now, replace it later
1. Search free libraries for a slow, single-shot clip that matches the palette.
2. Download 1080p; mark it as temporary in the asset manifest.
3. Replace before launch — the asset layer makes this a one-line change.

Tools: Pexels Videos, Coverr, Mixkit

#### Find or shoot a consistent photo set
1. Collect 15–20 candidates with the same light direction and color temperature.
2. Select 6–10; apply one shared grade (same warmth, contrast, grain).
3. Export 2400px long edge; let next/image generate responsive sizes.
4. Crop mobile versions with the focal point centred.

Tools: Unsplash, Pexels, Squoosh
