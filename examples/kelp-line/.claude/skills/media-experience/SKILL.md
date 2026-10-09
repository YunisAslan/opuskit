---
name: media-experience
description: "Handles photography media for Kelp Line — Warm Coastal Calm Foundation: asset config layer, posters, crops, loading and temporary-asset replacement. Use when rendering any image, video or 3D asset, or when the user supplies new media."
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

## Hero — Editorial image hero
- One strong photograph (portrait 4:5 or wide 3:2) beside or beneath a restrained headline. Clear focal point, generous empty space.
- Headline and image fade up once on load (≤ 600ms). No looping motion.
- Mobile: Mobile: headline first, image full-width beneath at 4:5. Keep the focal point inside the centre 60% for safe cropping.
- Fallback: Curated temporary image from the recipe's reference set, clearly marked for replacement.

## Formats
AVIF/WebP via next/image, srcset sizes 640–2400w, lazy-load below the fold, priority on the hero image only
