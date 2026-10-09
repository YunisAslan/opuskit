# Assets

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon. Until the owner’s own exists: the name set as a wordmark in the display face, and its first letter as the favicon — no invented symbol to throw away later. The favicon is a file (src/app/icon.svg, the letter as a path), never a generated icon route: one that fetches a font at build time breaks static hosting and builds without a network (Kelp Line) |
| ⌕ Find it | Typefaces | 3 families | required | All text | Sofia Sans Extra Condensed, Sofia Sans Condensed, Sofia Sans (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ⚠ Temporary placeholder | Hero video | 1 clip | required | Hero (loop or scroll-controlled) | 1920×1080 min, 10–20 s, one continuous move, not a loop, no text burned in |
| ⚠ Temporary placeholder | Poster image | 1 image | required | Shown before video loads and on reduced motion | First frame of the video, same crop |
| ⚠ Temporary placeholder | Mobile video encode | 1 clip | recommended | Hero on small screens — made from the hero video by scripts/prepare-video.sh | 1080×1920 (9:16), ≤ 3MB |
| ⚠ Temporary placeholder | Supporting images | 10 photos | required | The parts in the shot list (recipe/media.md): Featured Work, Location, About, Team | One file per shot-list slot, at the size and ratio it gives; one grade across all |
| ○ Optional | Secondary video | 1–2 clips | optional | Chapter transitions | Same grade as the hero |
| ⚠ Temporary placeholder | Scrub-ready encode | 1 file | required | Scroll-controlled hero | Made by scripts/prepare-video.sh from the ORIGINAL file: CRF 20, keyframe every 6 frames, ≤ 1920 px |
| ○ Optional | Texture | 1–2 | optional | Subtle paper/grain overlay at ≤ 4% opacity | Seamless tile, 1024px, WebP |

### Asset Creation Paths

#### Turn an image into your hero video
1. Pick one strong still with depth (foreground + background) and a clear focal point.
2. Generate 3–4 takes with the prompt below in an image-to-video tool.
3. Choose the steadiest take; keep 10–20 s; export the original at 1920×1080 or larger.
4. Run bash scripts/prepare-video.sh on that original — it writes the desktop, phone and scroll encodes and both posters into public/media under the names the asset layer expects.
5. No code changes needed.

**Prompt:**

> Slow, continuous cinematic camera movement (gentle forward dolly) through the scene in the reference image. Mood: nostalgic, warm, dramatic. Lighting and color stay faithful to the image; deep shadows, soft highlights. No cuts, no text, no people entering the frame, no sudden motion. Subtle atmospheric movement only (light, air, fabric, water). Duration 10–20 seconds, 16:9, 24fps, stable horizon, one move forward from start to end (visitors scroll through it — not a loop).

- Source: Your image
- Creation: Image → Video
- Suggested motion: Slow cinematic forward camera movement
- Suggested duration: 10–20 s
- Aspect ratio: 16:9 (plus 9:16 for mobile)
- Usage: Scroll-controlled video

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
