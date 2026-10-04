# Assets

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 2 families | required | All text | Science Gothic, Atkinson Hyperlegible Next (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ⚠ Temporary placeholder | 3D model or scene | 1 | required | Hero scene | GLB < 3MB, < 100k triangles, or a Spline scene |
| ⚠ Temporary placeholder | Pre-rendered poster | 1 | required | Loading state, mobile & reduced motion fallback | Rendered from the hero camera angle |
| ⌕ Find it | Supporting renders | 3–5 | recommended | Feature sections | Same lighting setup |

### Asset Creation Paths

#### Find or shoot a consistent photo set
1. Collect 15–20 candidates with the same light direction and color temperature.
2. Select 6–10; apply one shared grade (same warmth, contrast, grain).
3. Export 2400px long edge; let next/image generate responsive sizes.
4. Crop mobile versions with the focal point centred.

Tools: Unsplash, Pexels, Squoosh

#### Create the 3D hero
1. Block out the object in Spline or Blender; keep it under 100k triangles.
2. Light with one key and one rim light; use 2–3 materials maximum.
3. Export GLB with Draco compression (< 3MB) and render a poster image from the hero camera.
4. Until ready, use a pre-rendered still as the hero.

Tools: Spline, Poly Haven, Three.js

## Replacing temporary assets
Drop the real file into `public/media/` with the same key name, or edit `src/config/assets.ts`. Nothing else changes.
