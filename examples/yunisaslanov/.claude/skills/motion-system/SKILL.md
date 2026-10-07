---
name: motion-system
description: "Implements the subtle motion system for yunisaslanov — Warm Scrapbook Portfolio: hard cut, line-by-line headline reveal. Use when adding animation, scroll effects, transitions or reduced-motion support."
---

# Motion system — Subtle

**Animation for demonstration, not decoration.** If an animation doesn't clarify content, hierarchy or story, don't add it.

Content eases in once as it enters the viewport; media drifts slightly. Nothing loops.

Libraries: CSS (transitions, scroll-driven animations), Motion. Use CSS for simple transitions and Motion for everything else — reveals, scroll-linked and pinned sequences (useScroll + useTransform, position: sticky for pins). No GSAP: its licence excludes tools that compete with Webflow.

## Patterns (implement in this order)
### State feedback
- Purpose: Confirm interaction (hover, focus, press) so controls feel responsive.
- Trigger: Pointer hover, keyboard focus, active press
- Behavior: Color/underline/opacity change; no layout shift.
- Duration / easing: 120–180ms · ease-out
- How: CSS transitions on color, opacity, transform.
- Performance: Transition only color, opacity, transform.
- Reduced motion: Keep — these are not motion-heavy; remove transform component.

### Hard cut
- Purpose: Unpolished on purpose — things land like paper on a table.
- Trigger: Element enters viewport (IntersectionObserver, threshold 0.2), once
- Behavior: elements appear without easing (steps(2)), slightly offset then square; children 50ms apart.
- Duration / easing: 200ms · steps(2)
- How: Motion `whileInView` with `viewport={{ once: true }}`, or CSS + IntersectionObserver class toggle.
- Performance: Animate transform/opacity only; don't observe hundreds of nodes — observe section wrappers.
- Reduced motion: Opacity only, 200ms, no translate.

### Line-by-line headline reveal
- Purpose: Direct attention to headlines and set reading pace.
- Trigger: Viewport entry, once
- Behavior: Each line masked (overflow hidden) and translated from 100% to 0, 80ms stagger.
- Duration / easing: 700ms per line · cubic-bezier(0.22, 1, 0.36, 1)
- How: Split lines manually in markup (preferred for control) (one span per line or word); animate with Motion or CSS.
- Performance: Only transform; split into lines, not characters, for body-length text.
- Reduced motion: Show lines immediately.

## Signature moments (build each one where it is placed)
- **Photos revealed like a curtain** on Projects — Gallery: Images open from a thin line to full size as they come into view, with the photo inside settling from a slight zoom — like a curtain opening. How: clip-path: inset(100% 0 0 0) → inset(0) over 1s, with the inner image scaling 1.15 → 1; triggered once by IntersectionObserver. Mobile: Same, shorter (700ms).

## Rules
- Animate transform and opacity only.
- Wrap every effect in a reduced-motion check (`useReducedMotion()` or `matchMedia('(prefers-reduced-motion: reduce)')`).
- Clean up observers and listeners on unmount.
