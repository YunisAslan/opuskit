# Assets

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 2 families | required | All text | Mona Sans, Martian Mono (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ✎ Create it | Final headline copy | 5–8 statements | required | Hero and section statements | Short: 3–8 words each; written before layout |
| ○ Optional | Punctuation images | 2–4 images | optional | Between type sections | High contrast, simple subjects |
| ⌕ Find it | Film for the band | 1 clip | required | The scroll-controlled video band mid-page — its own film, not the first screen's media | 1920×1080 min, 15–30 s, one continuous shot with no cuts and a slow steady camera move (it plays as visitors scroll); scripts/prepare-video.sh makes the scrub-ready encode |
| ⌕ Find it | Band poster | 1 image | required | Shown before the band’s film loads and on reduced motion | First frame of the film, same crop |
| ⌕ Find it | Ambient sound | 1 loop | required | The sound switch (AmbientSound) — off until the visitor turns it on | One calm, seamless loop of 30–90 s; MP3 128 kbps, ≤ 1.5 MB; no voice or lyrics; quiet (about −18 LUFS) |

### Asset Creation Paths

#### Turn an image into your hero video
1. Pick one strong still with depth (foreground + background) and a clear focal point.
2. Generate 3–4 takes with the prompt below in an image-to-video tool.
3. Choose the steadiest take; trim to 5–8s; export 1920×1080 H.264.
4. Encode a WebM and a 9:16 mobile version; export the first frame as the poster.
5. Drop files into /public/media and update the asset config — no code changes needed.

**Prompt:**

> Slow, continuous cinematic camera movement (gentle forward dolly) through the scene in the reference image. Mood: clear, stark, confident. Lighting and color stay faithful to the image; deep shadows, soft highlights. No cuts, no text, no people entering the frame, no sudden motion. Subtle atmospheric movement only (light, air, fabric, water). Duration 5–8 seconds, 16:9, 24fps, stable horizon, end frame close to start frame so it can loop.

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

## Replacing temporary assets
Drop the real file into `public/media/` with the same key name, or edit `src/config/assets.ts`. Nothing else changes.
