---
name: media-experience
description: "Handles video media for Ninth Row — Nocturne Film-inspired Event Site: asset config layer, posters, crops, loading and temporary-asset replacement. Use when rendering any image, video or 3D asset, or when the user supplies new media."
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
- A sticky 100svh stage inside a ~300vh block; Motion useScroll on the block gives progress, smoothed with useSpring (stiffness ~120, damping ~30), and useMotionValueEvent sets video.currentTime. Encode with scripts/prepare-video.sh (CRF 20, keyframe every 6 frames) so seeking is instant and frames stay sharp.
- Mobile: Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- Fallback: Image sequence scrub from a still (subtle zoom + crossfade), or switch to the image-led variant.

## Scroll storytelling (the hero film)
1. Scroll controls time: map the pinned hero scroll range to the full video timeline (0 → duration). Slow scroll moves the film slowly, fast scroll moves it fast, scrolling up plays it backward. Never autoplay the sequence.
2. Keep it tightly connected: smooth the progress with useSpring (no lag beyond ~0.3 s), and the scroll encode from scripts/prepare-video.sh (keyframe every 6 frames) so seeking never stutters.
3. The film is not here yet: write src/config/scenes.ts now with three messages for the opening, the middle and the end, spread evenly, and say plainly in it that the timings wait for the film. When the film arrives, watch it and move each start and end to what is on screen — the messages may change too; no other code changes.
4. One message per scene, about what is on screen right now. It arrives as its scene begins, holds while the scene plays, and leaves before the next scene’s message arrives — never two at once, never at arbitrary scroll points.
5. Video and type are one system: drive both from one Motion scroll progress (useScroll), with each text’s useTransform range placed at its scene’s fraction — not two separate animation setups.
6. Text transitions, varied per scene: masked line-by-line reveals, short vertical travel (≤ 24px), clip-path wipes, a small tracking or scale change. No repeated plain fade-ins, nothing bouncy.
7. Legibility over footage: a soft gradient scrim only behind the text, never a flat dark overlay across the whole film.
8. When the film ends, release into the next section without a hard cut (overlap it, or ease the last frame into the page background); later sections keep the same type and spacing.
9. Mobile keeps the same story and scene map: shorter scroll distance, 9:16 encode, simpler reveals (opacity + small translate). If seeking stutters on a phone, step through poster stills per scene instead.
10. Verify in a real browser at 1440px and 390px: scroll slowly, quickly and upward — each message must appear exactly on its scene.

## Formats
MP4 (H.264) and JPEG posters, all made by scripts/prepare-video.sh (next/image serves the posters as AVIF/WebP); hero ≤ 6MB desktop, ≤ 3MB mobile
