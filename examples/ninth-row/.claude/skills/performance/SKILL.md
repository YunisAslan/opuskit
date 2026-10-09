---
name: performance
description: "Keeps Ninth Row — Nocturne Film-inspired Event Site fast: media budgets, lazy loading, animation cost and Core Web Vitals targets. Use when adding media, animation, 3D or third-party code, and before shipping."
---

# Performance

Performance is part of the design.

- Only the hero media uses priority loading; everything else lazy-loads.
- Animate only transform, opacity and clip-path (all compositor-friendly); never layout properties such as width, height, top or margin.
- Self-host fonts with next/font; Sofia Sans Extra Condensed / Sofia Sans — subset display faces.
- Video: preload="metadata", poster image, ≤ 6MB desktop / ≤ 3MB mobile, pause off-screen.
- Target: LCP < 2.5s on a mid-range phone, measured on the poster still — the LCP element: it is a plain <img> with priority, painted before any script; the film, the scroll pin and the motion library load after it. CLS < 0.1, INP < 200ms.

## Check
- Run `next build` and inspect bundle sizes; lazy-load anything heavy below the fold (`next/dynamic`).
- Run Lighthouse (mobile). Fix LCP first (hero media), then CLS (reserve media aspect ratios).
