---
name: media-experience
description: "Handles illustration media for Sticky Weather — Cheeky Sticker Studio Site: asset config layer, posters, crops, loading and temporary-asset replacement. Use when rendering any image, video or 3D asset, or when the user supplies new media."
---

# Media experience — Illustration-led

A single illustrative voice across the site — one illustrator, one line weight, one palette.

## Asset layer
- All media is referenced by key through `src/config/assets.ts` and rendered by `<MediaAsset id="…" />`.
- Never hardcode a media path in a component.
- Assets with status `temporary` in `assets/manifest.json` must show a dev-only "Temporary" badge and are listed in the final report.

## Treatment
- Use the recipe palette inside the illustrations
- Prefer SVG for crispness and animation
- Match type weight to line weight
- Never mix illustration styles

## Hero — Sticker orbit
- A centred two-voice headline with a sentence eyebrow above and one line below; 10–14 brand stickers and small photos sit on an ellipse around it, each at its own slight angle.
- Scrolling turns the ellipse (the stickers travel around the headline) while the whole ring drifts up and away; on load the stickers pop in one by one.
- Mobile: Mobile: a smaller ellipse with 6–8 stickers behind the headline; motion stays scroll-linked but half the distance.
- Fallback: Temporary shapes in the chapter colours with placeholder words, clearly marked for replacement.

## Formats
Optimised SVG (SVGO), or PNG/WebP for painterly styles
