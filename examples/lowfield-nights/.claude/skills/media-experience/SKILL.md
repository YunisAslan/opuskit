---
name: media-experience
description: "Handles video media for Lowfield Nights — Cinematic Editorial Event Site: asset config layer, posters, crops, loading and temporary-asset replacement. Use when rendering any image, video or 3D asset, or when the user supplies new media."
---

# Media experience — Video-led

Moving image carries the atmosphere; motion in the footage is slow, continuous and intentional.

## Asset layer
- All media is referenced by key through `src/config/assets.ts` and rendered by `<MediaAsset id="…" />`.
- Never hardcode a media path in a component.
- Assets with status `temporary` in `assets/manifest.json` must show a dev-only "Temporary" badge and are listed in the final report.

## Treatment
- Slow camera moves, no fast cuts in hero footage
- Always provide a poster frame
- Muted by default, captions if there is speech
- Pause off-screen to save battery

## Hero — Whole-page scroll video
- A fixed 100svh video layer behind the entire page; the playhead is mapped to total page scroll (0 → 100%). Every section scrolls over it on transparent or semi-opaque surfaces, so the film is always visible.
- Motion useScroll on the page (scrollYProgress 0 → 1), smoothed with useSpring, drives video.currentTime through useMotionValueEvent. Sections use the surface color at 70–90% opacity for text legibility; key moments in the film line up with section boundaries.
- Mobile: Mobile: 9:16 encode; if seeking is janky on low-end devices, freeze on the poster and crossfade between 3–5 stills per section.
- Fallback: Fixed poster image with a crossfade between stills at each section, or switch to the opening-scene variant.

## Scroll storytelling (the hero film)
1. Scroll controls time: map the whole page scroll to the full video timeline (0 → duration). Slow scroll moves the film slowly, fast scroll moves it fast, scrolling up plays it backward. Never autoplay the sequence.
2. Keep it tightly connected: smooth the progress with useSpring (no lag beyond ~0.3 s), and the scroll encode from scripts/prepare-video.sh (keyframe every 6 frames) so seeking never stutters.
3. Before coding, watch the video and write a scene map in src/config/scenes.ts: every meaningful moment (a new subject, a pause, a zoom, a change of light) with its start and end as a fraction of the timeline, and the message that belongs to it.
4. One message per scene, about what is on screen right now. It arrives as its scene begins, holds while the scene plays, and leaves before the next scene’s message arrives — never two at once, never at arbitrary scroll points.
5. Video and type are one system: drive both from one Motion scroll progress (useScroll), with each text’s useTransform range placed at its scene’s fraction — not two separate animation setups.
6. Text transitions, varied per scene: masked line-by-line reveals, short vertical travel (≤ 24px), clip-path wipes, a small tracking or scale change. No repeated plain fade-ins, nothing bouncy.
7. Legibility over footage: a soft gradient scrim only behind the text, never a flat dark overlay across the whole film.
8. Sections scroll over the film on semi-opaque surfaces; line up the film’s key moments with section boundaries so each section has its own scene.
9. Mobile keeps the same story and scene map: shorter scroll distance, 9:16 encode, simpler reveals (opacity + small translate). If seeking stutters on a phone, step through poster stills per scene instead.
10. Verify in a real browser at 1440px and 390px: scroll slowly, quickly and upward — each message must appear exactly on its scene.

## Formats
MP4 (H.264) + WebM (VP9/AV1); hero ≤ 6MB desktop, ≤ 3MB mobile; poster as AVIF/WebP
