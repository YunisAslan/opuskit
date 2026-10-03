---
name: media-experience
description: "Handles video media for Saint Ashe — Gothic Modern Fashion House: asset config layer, posters, crops, loading and temporary-asset replacement. Use when rendering any image, video or 3D asset, or when the user supplies new media."
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

## Hero — Ambient video hero
- Full-viewport muted loop (8–15s) behind a short headline; a poster frame shows instantly while video loads.
- autoplay, muted, loop, playsInline. Pauses when out of view (IntersectionObserver) and when the tab is hidden. Visible pause control.
- Mobile: Mobile: 9:16 or 4:5 encode ≤ 3MB, or the poster image only on Save-Data / slow connections.
- Fallback: Poster image as a static hero, or a temporary curated clip until the real one exists.

## Formats
MP4 (H.264) + WebM (VP9/AV1); hero ≤ 6MB desktop, ≤ 3MB mobile; poster as AVIF/WebP
