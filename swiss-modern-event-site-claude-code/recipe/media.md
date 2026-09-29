## Media Direction — Video-led

Moving image carries the atmosphere; motion in the footage is slow, continuous and intentional.

### Treatment
- Slow camera moves, no fast cuts in hero footage
- Always provide a poster frame
- Muted by default, captions if there is speech
- Pause off-screen to save battery

**Formats:** MP4 (H.264) + WebM (VP9/AV1); hero ≤ 6MB desktop, ≤ 3MB mobile; poster as AVIF/WebP

### Hero — Scroll-controlled video
- **Composition:** A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points.
- **Behavior:** GSAP ScrollTrigger pins the section and scrubs video.currentTime (scrub: 0.5). Encode with scripts/prepare-video.sh (CRF 20, keyframe every 6 frames) so seeking is instant and frames stay sharp.
- **Responsive:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- **Requires:** 1 hero video (5–8s, single continuous camera move, ≥ 1920 px wide, the original export — not a web copy); 1 poster image; Mobile 9:16 encode (recommended)
- **Fallback:** Image sequence scrub from a still (subtle zoom + crossfade), or switch to the image-led variant.

### Your video’s shape

The owner’s video is 720×540, but desktop and tablet screens are wide: always present it 16:9, edge to edge (object-fit: cover on a 16:9 or full-viewport frame) — never letterboxed, pillarboxed, stretched or shown as a narrow strip. Desktop plays the 16:9 files made by scripts/prepare-video.sh (heroVideo / scrubReadyEncode); phones play the original shape (mobileVideoEncode), which needs no crop. Pick <source media> by aspect-ratio or width so each screen downloads only its own file.

### Scroll storytelling

scroll → film moves → scene changes → its message arrives → it leaves → next scene. One coordinated timeline.

- Scroll controls time: map the pinned hero scroll range to the full video timeline (0 → duration). Slow scroll moves the film slowly, fast scroll moves it fast, scrolling up plays it backward. Never autoplay the sequence.
- Keep it tightly connected: scrub ≈ 0.5 with smooth scroll, and the scroll encode from scripts/prepare-video.sh (keyframe every 6 frames) so seeking never stutters.
- Before coding, watch the video and write a scene map in src/config/scenes.ts: every meaningful moment (a new subject, a pause, a zoom, a change of light) with its start and end as a fraction of the timeline, and the message that belongs to it.
- One message per scene, about what is on screen right now. It arrives as its scene begins, holds while the scene plays, and leaves before the next scene’s message arrives — never two at once, never at arbitrary scroll points.
- Video and type are one system: drive both from a single ScrollTrigger timeline, with each text tween placed at its scene’s fraction — not two separate animation setups.
- Text transitions, varied per scene: masked line-by-line reveals, short vertical travel (≤ 24px), clip-path wipes, a small tracking or scale change. No repeated plain fade-ins, nothing bouncy.
- Legibility over footage: a soft gradient scrim only behind the text, never a flat dark overlay across the whole film.
- When the film ends, release into the next section without a hard cut (overlap it, or ease the last frame into the page background); later sections keep the same type and spacing.
- Mobile keeps the same story and scene map: shorter scroll distance, 9:16 encode, simpler reveals (opacity + small translate). If seeking stutters on a phone, step through poster stills per scene instead.
- Verify in a real browser at 1440px and 390px: scroll slowly, quickly and upward — each message must appear exactly on its scene.

### Photos — Even grid

Same-size tiles in tidy rows — easy to compare side by side. Suits 6+ photos. Chosen by the owner.

**Owner’s request (follow it):** “put there unsplash hourse and related images”
- **Composition:** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile.
- **Behavior:** Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards).
- **Responsive:** 2 columns on mobile; never 1 unless the photos are the product itself.
- **Where:** every gallery, lookbook, featured-work or story section; supporting images elsewhere come from the same set.
- **Start from:** [Aceternity — Focus Cards](https://ui.aceternity.com/components/focus-cards) — restyle to this recipe’s tokens and type; never ship a component’s demo look.

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
