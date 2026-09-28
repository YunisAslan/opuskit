---
name: media-experience
description: "Handles video media for BUYTOLOSE — Gothic Modern Store: asset config layer, posters, crops, loading and temporary-asset replacement. Use when rendering any image, video or 3D asset, or when the user supplies new media."
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
- GSAP ScrollTrigger pins the section and scrubs video.currentTime (scrub: 0.5). Encode with a keyframe every frame (or short GOP) so seeking is smooth.
- Mobile: Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- Fallback: Image sequence scrub from a still (subtle zoom + crossfade), or switch to the image-led variant.

## Formats
MP4 (H.264) + WebM (VP9/AV1); hero ≤ 6MB desktop, ≤ 3MB mobile; poster as AVIF/WebP
