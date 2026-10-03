# Assets

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 2 families | required | All text | Grenze Gotisch, Work Sans (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ⚠ Temporary placeholder | Hero video | 1 clip | required | Hero (loop or scroll-controlled) | 1920×1080 min, 5–15s, slow continuous motion, no text burned in |
| ⚠ Temporary placeholder | Poster image | 1 image | required | Shown before video loads and on reduced motion | First frame of the video, same crop |
| ⌕ Find it | Mobile video encode | 1 clip | recommended | Hero on small screens | 1080×1920 (9:16) or 1080×1350 (4:5), ≤ 3MB |
| ⚠ Temporary placeholder | Supporting images | 4–6 images | required | Sections between video moments | Graded to match the video |
| ○ Optional | Secondary video | 1–2 clips | optional | Chapter transitions | Same grade as the hero |

### Asset Creation Paths

#### Turn an image into your hero video
1. Pick one strong still with depth (foreground + background) and a clear focal point.
2. Generate 3–4 takes with the prompt below in an image-to-video tool.
3. Choose the steadiest take; trim to 5–8s; export 1920×1080 H.264.
4. Encode a WebM and a 9:16 mobile version; export the first frame as the poster.
5. Drop files into /public/media and update the asset config — no code changes needed.

**Prompt:**

> Slow, continuous cinematic camera movement (gentle forward dolly) through the scene in the reference image. Mood: dramatic, dark, rebellious. Lighting and color stay faithful to the image; deep shadows, soft highlights. No cuts, no text, no people entering the frame, no sudden motion. Subtle atmospheric movement only (light, air, fabric, water). Duration 5–8 seconds, 16:9, 24fps, stable horizon, end frame close to start frame so it can loop.

- Source: Your image
- Creation: Image → Video
- Suggested motion: Slow cinematic forward camera movement
- Suggested duration: 5–8 seconds
- Aspect ratio: 16:9 (plus 9:16 for mobile)
- Usage: Ambient video hero

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
