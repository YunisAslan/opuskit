---
name: motion-system
description: "Implements the subtle motion system for Slow Atlas — News Grid Magazine: fade & rise reveal, line-by-line headline reveal. Use when adding animation, scroll effects, transitions or reduced-motion support."
---

# Motion system — Subtle

**Animation for demonstration, not decoration.** If an animation doesn't clarify content, hierarchy or story, don't add it.

Content eases in once as it enters the viewport; media drifts slightly. Nothing loops.

Libraries: CSS (transitions, scroll-driven animations), Motion. Use CSS for simple transitions, Motion for React UI animation, GSAP only for scroll-driven/pinned sequences.

## Patterns (implement in this order)
### State feedback
- Purpose: Confirm interaction (hover, focus, press) so controls feel responsive.
- Trigger: Pointer hover, keyboard focus, active press
- Behavior: Color/underline/opacity change; no layout shift.
- Duration / easing: 120–180ms · ease-out
- How: CSS transitions on color, opacity, transform.
- Performance: Transition only color, opacity, transform.
- Reduced motion: Keep — these are not motion-heavy; remove transform component.

### Fade & rise reveal
- Purpose: Give sections a calm entrance so content arrives in reading order.
- Trigger: Element enters viewport (IntersectionObserver, threshold 0.2), once
- Behavior: opacity 0→1, translateY 16px→0, children staggered 60ms.
- Duration / easing: 500–700ms · cubic-bezier(0.22, 1, 0.36, 1)
- How: Motion `whileInView` with `viewport={{ once: true }}`, or CSS + IntersectionObserver class toggle.
- Performance: Animate transform/opacity only; don't observe hundreds of nodes — observe section wrappers.
- Reduced motion: Opacity only, 200ms, no translate.

### Line-by-line headline reveal
- Purpose: Direct attention to headlines and set reading pace.
- Trigger: Viewport entry, once
- Behavior: Each line masked (overflow hidden) and translated from 100% to 0, 80ms stagger.
- Duration / easing: 700ms per line · cubic-bezier(0.22, 1, 0.36, 1)
- How: Split lines manually in markup (preferred for control) or with GSAP SplitText; animate with Motion or CSS.
- Performance: Only transform; split into lines, not characters, for body-length text.
- Reduced motion: Show lines immediately.

## Rules
- Animate transform and opacity only.
- Wrap every effect in a reduced-motion check (`useReducedMotion()` or `matchMedia('(prefers-reduced-motion: reduce)')`).
- Clean up ScrollTriggers / observers on unmount.
