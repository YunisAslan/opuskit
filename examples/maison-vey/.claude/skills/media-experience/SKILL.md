---
name: media-experience
description: "Handles product media for Maison Vey — Refined Luxury Editorial Store: asset config layer, posters, crops, loading and temporary-asset replacement. Use when rendering any image, video or 3D asset, or when the user supplies new media."
---

# Media experience — Product-led

The product is photographed like an object of desire: isolated, well-lit, from consistent angles.

## Asset layer
- All media is referenced by key through `src/config/assets.ts` and rendered by `<MediaAsset id="…" />`.
- Never hardcode a media path in a component.
- Assets with status `temporary` in `assets/manifest.json` must show a dev-only "Temporary" badge and are listed in the final report.

## Treatment
- Seamless backgrounds matching the palette surface color
- Same lighting and lens across all product shots
- Show scale and detail (close-ups)
- Use lifestyle images only in editorial sections

## Hero — Product stage
- The product isolated on a clean surface, large and centred or offset, with name, one-line promise and price/CTA.
- Subtle: product fades/scales in. Dynamic: product rotates or swaps angles on scroll using an image sequence (24–48 frames).
- Mobile: Mobile: product first, text beneath, CTA sticky at bottom.
- Fallback: Temporary curated product image; mark as placeholder.

## Formats
Transparent PNG/WebP cut-outs or AVIF on seamless background; 2400px min
