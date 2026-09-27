## Media Direction — 3D-led

Real-time 3D used as a centrepiece, lit and moved with restraint. Depth, not spectacle.

### Treatment
- One hero 3D moment per page
- Studio lighting, limited materials
- HTML text over canvas, never text inside WebGL
- Always a static fallback

**Formats:** glTF/GLB with Draco/Meshopt compression, KTX2 textures; total < 3MB

### Hero — 3D / WebGL scene
- **Composition:** A real-time 3D object or scene as the hero, lit with restraint; headline overlaid in HTML (never inside the canvas).
- **Behavior:** Object reacts gently to pointer (≤ 8° rotation) and scroll (camera dolly). Render only while in view; cap DPR at 2.
- **Responsive:** Mobile: lower poly/texture budget, disable pointer effects, or show a pre-rendered video/image.
- **Requires:** 3D model (glTF/GLB, Draco-compressed, < 3MB) or Spline scene; Pre-rendered poster image
- **Fallback:** Pre-rendered still or short loop of the scene.

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 3 families | required | All text | Syne, DM Sans, DM Mono (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ✓ Have it | 3D model or scene — you provided: free_-_skybox_basic_sky.glb | 1 | required | Hero scene | GLB < 3MB, < 100k triangles, or a Spline scene |
| ⌕ Find it | Pre-rendered poster | 1 | required | Loading state, mobile & reduced motion fallback | Rendered from the hero camera angle |
| ⌕ Find it | Supporting renders | 3–5 | recommended | Feature sections | Same lighting setup |

### Asset Creation Paths

#### Find or shoot a consistent photo set
1. Collect 15–20 candidates with the same light direction and color temperature.
2. Select 6–10; apply one shared grade (same warmth, contrast, grain).
3. Export 2400px long edge; let next/image generate responsive sizes.
4. Crop mobile versions with the focal point centred.

Tools: Unsplash, Pexels, Squoosh
