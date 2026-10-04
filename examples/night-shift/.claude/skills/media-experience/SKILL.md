---
name: media-experience
description: "Handles 3d media for Night Shift — Technical Minimal Course Site: asset config layer, posters, crops, loading and temporary-asset replacement. Use when rendering any image, video or 3D asset, or when the user supplies new media."
---

# Media experience — 3D-led

Real-time 3D used as a centrepiece, lit and moved with restraint. Depth, not spectacle.

## Asset layer
- All media is referenced by key through `src/config/assets.ts` and rendered by `<MediaAsset id="…" />`.
- Never hardcode a media path in a component.
- Assets with status `temporary` in `assets/manifest.json` must show a dev-only "Temporary" badge and are listed in the final report.

## Treatment
- One hero 3D moment per page
- Studio lighting, limited materials
- HTML text over canvas, never text inside WebGL
- Always a static fallback

## Hero — 3D / WebGL scene
- A real-time 3D object or scene as the hero, lit with restraint; headline overlaid in HTML (never inside the canvas).
- Object reacts gently to pointer (≤ 8° rotation) and scroll (camera dolly). Render only while in view; cap DPR at 2.
- Mobile: Mobile: lower poly/texture budget, disable pointer effects, or show a pre-rendered video/image.
- Fallback: Pre-rendered still or short loop of the scene.

## Formats
glTF/GLB with Draco/Meshopt compression, KTX2 textures; total < 3MB
