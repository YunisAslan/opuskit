---
name: media-experience
description: "Handles video media for ulooklonely — Film-inspired Portfolio: asset config layer, posters, crops, loading and temporary-asset replacement. Use when rendering any image, video or 3D asset, or when the user supplies new media."
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

## Hero — Scroll-controlled video
- A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points.
- GSAP ScrollTrigger pins the section and scrubs video.currentTime (scrub: 0.5). Encode with scripts/prepare-video.sh (CRF 20, keyframe every 6 frames) so seeking is instant and frames stay sharp.
- Mobile: Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- Fallback: Image sequence scrub from a still (subtle zoom + crossfade), or switch to the image-led variant.

## Your video’s shape
The owner’s video is 720×1280, vertical, but desktop and tablet screens are wide: always present it 16:9, edge to edge (object-fit: cover on a 16:9 or full-viewport frame) — never letterboxed, pillarboxed, stretched or shown as a narrow strip. Desktop plays the 16:9 files made by scripts/prepare-video.sh (heroVideo / scrubReadyEncode); phones play the original shape (mobileVideoEncode), which needs no crop. Pick <source media> by aspect-ratio or width so each screen downloads only its own file.

## Scroll storytelling (the hero film)
1. Scroll controls time: map the pinned hero scroll range to the full video timeline (0 → duration). Slow scroll moves the film slowly, fast scroll moves it fast, scrolling up plays it backward. Never autoplay the sequence.
2. Keep it tightly connected: scrub ≈ 0.5 with smooth scroll, and the scroll encode from scripts/prepare-video.sh (keyframe every 6 frames) so seeking never stutters.
3. Before coding, watch the video and write a scene map in src/config/scenes.ts: every meaningful moment (a new subject, a pause, a zoom, a change of light) with its start and end as a fraction of the timeline, and the message that belongs to it.
4. One message per scene, about what is on screen right now. It arrives as its scene begins, holds while the scene plays, and leaves before the next scene’s message arrives — never two at once, never at arbitrary scroll points.
5. Video and type are one system: drive both from a single ScrollTrigger timeline, with each text tween placed at its scene’s fraction — not two separate animation setups.
6. Text transitions, varied per scene: masked line-by-line reveals, short vertical travel (≤ 24px), clip-path wipes, a small tracking or scale change. No repeated plain fade-ins, nothing bouncy.
7. Legibility over footage: a soft gradient scrim only behind the text, never a flat dark overlay across the whole film.
8. When the film ends, release into the next section without a hard cut (overlap it, or ease the last frame into the page background); later sections keep the same type and spacing.
9. Mobile keeps the same story and scene map: shorter scroll distance, 9:16 encode, simpler reveals (opacity + small translate). If seeking stutters on a phone, step through poster stills per scene instead.
10. Verify in a real browser at 1440px and 390px: scroll slowly, quickly and upward — each message must appear exactly on its scene.

## Formats
MP4 (H.264) + WebM (VP9/AV1); hero ≤ 6MB desktop, ≤ 3MB mobile; poster as AVIF/WebP
