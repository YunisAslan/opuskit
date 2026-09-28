# Assets

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 2 families | required | All text | Anybody, Spectral (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ✓ Have it | Your photos — you provided: p911-1.jpg, p911-2.jpg, p911-3.jpg, p911-4.jpg, p911-6.jpg, p911-7.jpg, p911-aess.jpg, p911-blue.png, p911-red.jpg, p911-yellow-2.jpg, p911-yellow.jpg | 11 photos | recommended | Endless rows — rows of photos drifting endlessly in opposite directions. | Min 2400px long edge, one consistent grade; keep each photo’s original shape unless the layout says otherwise |
| ✓ Have it | Hero video — you provided: CHEEKY.mp4 | 1 clip | required | Hero (loop or scroll-controlled) | 1920×1080 min, 5–15s, slow continuous motion, no text burned in |
| ⌕ Find it | Poster image | 1 image | required | Shown before video loads and on reduced motion | First frame of the video, same crop |
| ✓ Have it | Mobile video encode (marked as available — no file attached yet) | 1 clip | recommended | Hero on small screens | 1080×1920 (9:16) or 1080×1350 (4:5), ≤ 3MB |
| ⌕ Find it | Supporting images | 4–6 images | required | Sections between video moments | Graded to match the video |
| ✓ Have it | Secondary video (marked as available — no file attached yet) | 1–2 clips | optional | Chapter transitions | Same grade as the hero |
| ✓ Have it | Scrub-ready encode (marked as available — no file attached yet) | 1 file | required | Scroll-controlled hero | Made by scripts/prepare-video.sh from the ORIGINAL file: CRF 20, keyframe every 6 frames, ≤ 1920 px |
| ○ Optional | Texture | 1–2 | optional | Subtle paper/grain overlay at ≤ 4% opacity | Seamless tile, 1024px, WebP |

### Asset Creation Paths

#### Sharpen your video for free
1. Your video is 720×1280. A full-screen hero is stretched ~2.7× on a laptop and more on large screens, which is what makes it look soft.
2. Best: export the original again at 1920 px or wider (or 4K) from your camera or AI tool. Many tools offer this at no extra cost.
3. Otherwise upscale it free on your own computer: install ffmpeg, download Real-ESRGAN, then run bash scripts/prepare-video.sh original.mp4 --upscale footage (people, fabric, real scenes) or --upscale cgi (product, 3D, liquid, animation — much faster).
4. Always start from the original file, never from a copy already compressed for the web.

Tools: Real-ESRGAN, FFmpeg

#### Find or shoot a consistent photo set
1. Collect 15–20 candidates with the same light direction and color temperature.
2. Select 6–10; apply one shared grade (same warmth, contrast, grain).
3. Export 2400px long edge; let next/image generate responsive sizes.
4. Crop mobile versions with the focal point centred.

Tools: Unsplash, Pexels, Squoosh

## Replacing temporary assets
Drop the real file into `public/media/` with the same key name, or edit `src/config/assets.ts`. Nothing else changes.
