---
name: performance
description: "Keeps Hexmint — Digital Futurism Software Site fast: media budgets, lazy loading, animation cost and Core Web Vitals targets. Use when adding media, animation, 3D or third-party code, and before shipping."
---

# Performance

Performance is part of the design.

- Only the hero media uses priority loading; everything else lazy-loads.
- Animate transform and opacity only; avoid animating layout properties.
- Self-host fonts with next/font; Funnel Display / Funnel Sans — subset display faces.
- 3D: lazy-load the canvas, Draco-compress models, cap DPR at 2, stop rendering off-screen.
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms on a mid-range phone.

## Check
- Run `next build` and inspect bundle sizes; lazy-load anything heavy below the fold (`next/dynamic`).
- Run Lighthouse (mobile). Fix LCP first (hero media), then CLS (reserve media aspect ratios).

## WebGL
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
