---
name: media-experience
description: "Handles photography media for Low Hum — Cheeky Retro Seventies Restaurant Site: asset config layer, posters, crops, loading and temporary-asset replacement. Use when rendering any image, video or 3D asset, or when the user supplies new media."
---

# Media experience — Photography-led

Photography sets the mood; every image should share light, color temperature and point of view.

## Asset layer
- All media is referenced by key through `src/config/assets.ts` and rendered by `<MediaAsset id="…" />`.
- Never hardcode a media path in a component.
- Assets with status `temporary` in `assets/manifest.json` must show a dev-only "Temporary" badge and are listed in the final report.

## Treatment
- One consistent grade across all images
- Large, uncluttered crops — show fewer, bigger images
- Captions in the utility face, small and precise
- Never place text over busy areas of an image

## Hero — Full-bleed photo with depth
- 100svh full-bleed photograph, headline anchored bottom-left, image slightly larger than viewport (scale 1.1) to allow drift.
- On scroll the image translates at ~0.3× scroll speed and the headline lines reveal upward; the next section overlaps the hero as it leaves.
- Mobile: Mobile: use a dedicated 4:5 or 9:16 crop; reduce parallax to a simple scale-down (1.1 → 1.0).
- Fallback: Temporary curated image; parallax works identically once replaced.

## Formats
AVIF/WebP via next/image, srcset sizes 640–2400w, lazy-load below the fold, priority on the hero image only
