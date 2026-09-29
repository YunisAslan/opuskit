# Assets

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 2 families | required | All text | Special Gothic Expanded One, Special Gothic (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ⌕ Find it | Your photos | 6+ photos | recommended | Even grid — same-size tiles in tidy rows — easy to compare side by side. | Min 2400px long edge, one consistent grade; keep each photo’s original shape unless the layout says otherwise |
| ✓ Have it | Hero video — you provided: From Klickpin.com- Blue seaside quotes for people who love practical beauty on a budget that feel calm and airy-pin-id-650981321191837516.mp4 | 1 clip | required | Hero (loop or scroll-controlled) | 1920×1080 min, 5–15s, slow continuous motion, no text burned in |
| ⌕ Find it | Poster image | 1 image | required | Shown before video loads and on reduced motion | First frame of the video, same crop |
| ✓ Have it | Mobile video encode (marked as available — no file attached yet) | 1 clip | recommended | Hero on small screens | 1080×1920 (9:16) or 1080×1350 (4:5), ≤ 3MB |
| ⌕ Find it | Supporting images | 4–6 images | required | Sections between video moments | Graded to match the video |
| ○ Optional | Secondary video | 1–2 clips | optional | Chapter transitions | Same grade as the hero |
| ✓ Have it | Scrub-ready encode (marked as available — no file attached yet) | 1 file | required | Scroll-controlled hero | Made by scripts/prepare-video.sh from the ORIGINAL file: CRF 20, keyframe every 6 frames, ≤ 1920 px |
| ✎ Create it | Widescreen version | 1 file | recommended | Desktop and tablet hero — fills 16:9 screens | 16:9, 1920×1080 or larger, made from your 720×540 video. Best: an AI “expand” to 16:9, which keeps every pixel of your video sharp. Otherwise prepare-video.sh crops and upscales it. Phones keep your original. |

### Asset Creation Paths

#### Make a widescreen version of your video
1. Your video is 720×540. Desktop screens are 16:9, so the site shows a widescreen version there and your original on phones.
2. Best quality: open your ORIGINAL file in an AI video tool with “Expand” / “Reframe” / “Outpaint”, choose 16:9 and 1920×1080 or larger. It paints the missing sides, so nothing is cut and your subject stays sharp.
3. Then run: bash scripts/prepare-video.sh original.mp4 --wide widescreen.mp4 — desktop files come from the widescreen version, phone files from your original.
4. No AI tool? Run bash scripts/prepare-video.sh original.mp4 --upscale footage (or cgi). It crops a 16:9 window and sharpens it back to full size. Move the window with FOCUS_Y=0 (top) … 1 (bottom).
5. Never let the browser stretch a small crop — that is what makes a hero look soft.

- Source: Your 720×540 original
- Target: 16:9, 1920×1080 or larger
- Phones: Your original, unchanged

Tools: Runway, Luma, Real-ESRGAN, FFmpeg

#### Sharpen your video for free
1. Your video is 720×540. A full-screen hero is stretched ~2.7× on a laptop and more on large screens, which is what makes it look soft.
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
