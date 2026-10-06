## Media Direction — Typography-led

Type is the image. Media is optional and used sparingly as punctuation.

### Treatment
- Set headlines manually — control every line break
- Limit to one display family
- Use scale contrast (at least 4:1 display/body)
- Images, if any, small and captioned

**Formats:** WOFF2 via next/font with display: swap; subset to used characters for display faces

### Hero — Typographic statement
- **Composition:** A single sentence at display scale (8–14vw) set on the grid, with a small metadata row beneath. No image required.
- **Behavior:** Lines reveal once with a short stagger (80ms per line). Nothing else moves.
- **Responsive:** Mobile: re-break lines manually (don't rely on auto-wrapping) and scale to ~15vw.
- **Requires:** Final headline copy (short, 3–8 words)
- **Fallback:** None needed — typography is always available.

### Photos — Full-bleed moments

Each photo gets a whole section to itself, edge to edge. 1 photos supplied (mostly portrait), in /media — keep their order. Chosen because: one photo — each deserves a section of its own.
- **Composition:** Full-bleed or near-full-bleed frame at 3:2 (landscape) or 4:5 (portrait), one short caption in the utility face; never grouped with other images.
- **Behavior:** Slow reveal (clip or fade) once, on entering the viewport; no carousel, no lightbox.
- **Responsive:** Keeps its own crop on mobile: set a focal point so the subject stays in frame at 4:5.
- **Where:** every gallery, lookbook, featured-work or story section; supporting images elsewhere come from the same set.

## WebGL checklist

This site draws on the GPU (the Dithered pattern piece). Every canvas follows these rules.

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
| ⌕ Find it | Typefaces | 2 families | required | All text | Hubot Sans, IBM Plex Sans (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ✓ Have it | Your photos — you provided: meee.JPG.jpeg | 1 photos | recommended | Full-bleed moments — each photo gets a whole section to itself, edge to edge. | Min 2400px long edge, one consistent grade; keep each photo’s original shape unless the layout says otherwise |
| ✎ Create it | Final headline copy | 5–8 statements | required | Hero and section statements | Short: 3–8 words each; written before layout |
| ○ Optional | Punctuation images | 2–4 images | optional | Between type sections | High contrast, simple subjects |
