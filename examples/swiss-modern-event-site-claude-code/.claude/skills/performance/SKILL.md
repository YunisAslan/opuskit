---
name: performance
description: "Keeps RALPH&LAUREN — Swiss Modern Event Site fast: media budgets, lazy loading, animation cost and Core Web Vitals targets. Use when adding media, animation, 3D or third-party code, and before shipping."
---

# Performance

Performance is part of the design.

- Only the hero media uses priority loading; everything else lazy-loads.
- Animate transform and opacity only; avoid animating layout properties.
- Self-host fonts with next/font; Special Gothic Expanded One / Special Gothic — subset display faces.
- Video: preload="metadata", poster image, ≤ 6MB desktop / ≤ 3MB mobile, pause off-screen.
- Import only the GSAP plugins you use; kill ScrollTriggers on unmount.
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms on a mid-range phone.

## Check
- Run `next build` and inspect bundle sizes; lazy-load anything heavy below the fold (`next/dynamic`).
- Run Lighthouse (mobile). Fix LCP first (hero media), then CLS (reserve media aspect ratios).
