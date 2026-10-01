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

## WebGL checklist

This site draws on the GPU (the 3D first screen). Every canvas follows these rules.

- Poster first: a still image (or the CSS gradient beneath a shader) is on screen before any WebGL loads, and stays if it fails.
- Load it late: next/dynamic with ssr: false, mounted when the browser is idle or the canvas nears the viewport — never in the critical path.
- Budgets: ≤ 250 KB gzipped of JS for all GL code, models ≤ 3 MB (Draco), ≤ 100 draw calls.
- Device pixel ratio capped at 2 (1.5 on small screens).
- Render on demand: stop the frame loop when nothing moves, and pause it whenever the canvas is off-screen (IntersectionObserver) or the tab is hidden.
- Reduced motion: freeze the scene on a good frame (speed 0) — no movement, same look.
- Coarse pointers turn pointer effects off; weak GPUs (low hardwareConcurrency / deviceMemory, or a failed context) get the poster.
- Handle context loss (webglcontextlost / restored) and dispose geometries, materials and textures on unmount.
- The canvas is decorative: aria-hidden; every word and link it shows also exists as real HTML.
- Damp all motion (lerp 0.05–0.1); never hijack the scroll — the page moves exactly as far as the visitor scrolls.
- Licences: only MIT / Apache-2.0 code (Paper Shaders, three.js, OpusKit pieces); no Spline or Unicorn runtimes, LYGIA or Theatre Studio.
- Verify: Lighthouse on mobile and a 4× CPU-throttled run — still smooth, LCP still < 2.5 s.

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 2 families | required | All text | Funnel Display, Funnel Sans (Google Fonts) |
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
