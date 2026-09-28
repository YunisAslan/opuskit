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

### Scroll storytelling

scroll → film moves → scene changes → its message arrives → it leaves → next scene. One coordinated timeline.

- Scroll controls time: map the pinned hero scroll range to the full video timeline (0 → duration). Slow scroll moves the film slowly, fast scroll moves it fast, scrolling up plays it backward. Never autoplay the sequence.
- Keep it tightly connected: scrub ≈ 0.5 with smooth scroll, and the scroll encode from scripts/prepare-video.sh (keyframe every 6 frames) so seeking never stutters.
- Before coding, watch the video and write a scene map in src/config/scenes.ts: every meaningful moment (a new subject, a pause, a zoom, a change of light) with its start and end as a fraction of the timeline, and the message that belongs to it.
- One message per scene, about what is on screen right now. It arrives as its scene begins, holds while the scene plays, and leaves before the next scene’s message arrives — never two at once, never at arbitrary scroll points.
- This site sells: when the camera pauses or zooms on a product, that scene’s message names the product, adds one line about it and its price, with a quiet link to its product page.
- Video and type are one system: drive both from a single ScrollTrigger timeline, with each text tween placed at its scene’s fraction — not two separate animation setups.
- Text transitions, varied per scene: masked line-by-line reveals, short vertical travel (≤ 24px), clip-path wipes, a small tracking or scale change. No repeated plain fade-ins, nothing bouncy.
- Legibility over footage: a soft gradient scrim only behind the text, never a flat dark overlay across the whole film.
- When the film ends, release into the next section without a hard cut (overlap it, or ease the last frame into the page background); later sections keep the same type and spacing.
- Mobile keeps the same story and scene map: shorter scroll distance, 9:16 encode, simpler reveals (opacity + small translate). If seeking stutters on a phone, step through poster stills per scene instead.
- Verify in a real browser at 1440px and 390px: scroll slowly, quickly and upward — each message must appear exactly on its scene.

### Photos — Endless rows

Rows of photos drifting endlessly in opposite directions. 11 photos supplied (mostly portrait), in /media — keep their order. Chosen by the owner.
- **Composition:** 2–3 rows of same-height photos; alternate rows run opposite ways; rows may tilt slightly in 3D for depth.
- **Behavior:** Continuous CSS/transform loop (duplicated track), slows on hover, pauses when off-screen; reduced motion shows a static grid.
- **Responsive:** One or two rows on mobile, smaller photos, same speed in px/s.
- **Where:** every gallery, lookbook, featured-work or story section; supporting images elsewhere come from the same set.
- **Start from:** [Magic UI — Marquee](https://magicui.design/docs/components/marquee), [Aceternity — 3D Marquee](https://ui.aceternity.com/components/3d-marquee), [Motion Primitives — Infinite Slider](https://motion-primitives.com/docs/infinite-slider) — restyle to this recipe’s tokens and type; never ship a component’s demo look.

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
