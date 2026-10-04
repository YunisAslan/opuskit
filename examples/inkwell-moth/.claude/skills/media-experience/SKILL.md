---
name: media-experience
description: "Handles illustration media for Inkwell & Moth — Scrapbook Portfolio: asset config layer, posters, crops, loading and temporary-asset replacement. Use when rendering any image, video or 3D asset, or when the user supplies new media."
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

## Hero — Illustrated hero
- A commissioned illustration as the key visual, with type set in harmony with its line weight and palette.
- SVG layers can drift independently (parallax at 2–3 depths) or draw in once (stroke-dashoffset).
- Mobile: Mobile: a portrait version of the illustration or a cropped detail.
- Fallback: Typographic hero until illustrations exist.

## Formats
Optimised SVG (SVGO), or PNG/WebP for painterly styles
