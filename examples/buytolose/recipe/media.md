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
- **Behavior:** GSAP ScrollTrigger pins the section and scrubs video.currentTime (scrub: 0.5). Encode with a keyframe every frame (or short GOP) so seeking is smooth.
- **Responsive:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- **Requires:** 1 hero video (5–8s, single continuous camera move, all-intra or GOP ≤ 5); 1 poster image; Mobile 9:16 encode (recommended)
- **Fallback:** Image sequence scrub from a still (subtle zoom + crossfade), or switch to the image-led variant.

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 2 families | required | All text | Unbounded, Onest (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ✓ Have it | Hero video — you provided: hf_20260908_203743_e36b99a1-6078-4b70-9226-fc463561f871.mp4 | 1 clip | required | Hero (loop or scroll-controlled) | 1920×1080 min, 5–15s, slow continuous motion, no text burned in |
| ⌕ Find it | Poster image | 1 image | required | Shown before video loads and on reduced motion | First frame of the video, same crop |
| ✓ Have it | Mobile video encode (marked as available — no file attached yet) | 1 clip | recommended | Hero on small screens | 1080×1920 (9:16) or 1080×1350 (4:5), ≤ 3MB |
| ⌕ Find it | Supporting images | 4–6 images | required | Sections between video moments | Graded to match the video |
| ✓ Have it | Secondary video (marked as available — no file attached yet) | 1–2 clips | optional | Chapter transitions | Same grade as the hero |
| ✓ Have it | Scrub-ready encode (marked as available — no file attached yet) | 1 file | required | Scroll-controlled hero | ffmpeg -i hero.mp4 -g 1 -crf 23 -an hero-scrub.mp4 (all-intra for smooth seeking) |

### Asset Creation Paths

#### Find or shoot a consistent photo set
1. Collect 15–20 candidates with the same light direction and color temperature.
2. Select 6–10; apply one shared grade (same warmth, contrast, grain).
3. Export 2400px long edge; let next/image generate responsive sizes.
4. Crop mobile versions with the focal point centred.

Tools: Unsplash, Pexels, Squoosh
