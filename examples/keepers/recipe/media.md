## Media Direction — Video-led

Moving image carries the atmosphere; motion in the footage is slow, continuous and intentional.

### Treatment
- Slow camera moves, no fast cuts in hero footage
- Always provide a poster frame
- Muted by default, captions if there is speech
- Pause off-screen to save battery

**Formats:** MP4 (H.264) + WebM (VP9/AV1); hero ≤ 6MB desktop, ≤ 3MB mobile; poster as AVIF/WebP

### Hero — Whole-page scroll video
- **Composition:** A fixed 100svh video layer behind the entire page; the playhead is mapped to total page scroll (0 → 100%). Every section scrolls over it on transparent or semi-opaque surfaces, so the film is always visible.
- **Behavior:** GSAP ScrollTrigger (trigger: document, start "top top", end "bottom bottom", scrub: 0.5) drives video.currentTime. Sections use the surface color at 70–90% opacity for text legibility; key moments in the film line up with section boundaries.
- **Responsive:** Mobile: 9:16 encode; if seeking is janky on low-end devices, freeze on the poster and crossfade between 3–5 stills per section.
- **Requires:** 1 long video (15–30s, one continuous camera move that can carry the whole page, all-intra or GOP ≤ 5); 1 poster image; Mobile 9:16 encode (recommended)
- **Fallback:** Fixed poster image with a crossfade between stills at each section, or switch to the opening-scene variant.

### Scroll storytelling

scroll → film moves → scene changes → its message arrives → it leaves → next scene. One coordinated timeline.

- Scroll controls time: map the whole page scroll to the full video timeline (0 → duration). Slow scroll moves the film slowly, fast scroll moves it fast, scrolling up plays it backward. Never autoplay the sequence.
- Keep it tightly connected: scrub ≈ 0.5 with smooth scroll, and an all-intra (or GOP ≤ 5) encode so seeking never stutters.
- Before coding, watch the video and write a scene map in src/config/scenes.ts: every meaningful moment (a new subject, a pause, a zoom, a change of light) with its start and end as a fraction of the timeline, and the message that belongs to it.
- One message per scene, about what is on screen right now. It arrives as its scene begins, holds while the scene plays, and leaves before the next scene’s message arrives — never two at once, never at arbitrary scroll points.
- This site sells: when the camera pauses or zooms on a product, that scene’s message names the product, adds one line about it and its price, with a quiet link to its product page.
- Video and type are one system: drive both from a single ScrollTrigger timeline, with each text tween placed at its scene’s fraction — not two separate animation setups.
- Text transitions, varied per scene: masked line-by-line reveals, short vertical travel (≤ 24px), clip-path wipes, a small tracking or scale change. No repeated plain fade-ins, nothing bouncy.
- Legibility over footage: a soft gradient scrim only behind the text, never a flat dark overlay across the whole film.
- Sections scroll over the film on semi-opaque surfaces; line up the film’s key moments with section boundaries so each section has its own scene.
- Mobile keeps the same story and scene map: shorter scroll distance, 9:16 encode, simpler reveals (opacity + small translate). If seeking stutters on a phone, step through poster stills per scene instead.
- Verify in a real browser at 1440px and 390px: scroll slowly, quickly and upward — each message must appear exactly on its scene.

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 2 families | required | All text | Big Shoulders, Hanken Grotesk (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ✓ Have it | Hero video — you provided: GATEKEEPER.mp4 | 1 clip | required | Hero (loop or scroll-controlled) | 1920×1080 min, 5–15s, slow continuous motion, no text burned in |
| ⌕ Find it | Poster image | 1 image | required | Shown before video loads and on reduced motion | First frame of the video, same crop |
| ✓ Have it | Mobile video encode (marked as available — no file attached yet) | 1 clip | recommended | Hero on small screens | 1080×1920 (9:16) or 1080×1350 (4:5), ≤ 3MB |
| ⌕ Find it | Supporting images | 4–6 images | required | Sections between video moments | Graded to match the video |
| ✓ Have it | Secondary video (marked as available — no file attached yet) | 1–2 clips | optional | Chapter transitions | Same grade as the hero |
| ✓ Have it | Scrub-ready encode (marked as available — no file attached yet) | 1 file | required | Scroll-controlled page background | ffmpeg -i hero.mp4 -g 1 -crf 23 -an hero-scrub.mp4 (all-intra for smooth seeking) |

### Asset Creation Paths

#### Find or shoot a consistent photo set
1. Collect 15–20 candidates with the same light direction and color temperature.
2. Select 6–10; apply one shared grade (same warmth, contrast, grain).
3. Export 2400px long edge; let next/image generate responsive sizes.
4. Crop mobile versions with the focal point centred.

Tools: Unsplash, Pexels, Squoosh
