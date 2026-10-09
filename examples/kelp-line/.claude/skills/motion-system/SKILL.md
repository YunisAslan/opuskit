---
name: motion-system
description: "Implements the subtle motion system for Kelp Line — Warm Coastal Calm Foundation: soft fade, image clip reveal, line-by-line headline reveal. Use when adding animation, scroll effects, transitions or reduced-motion support."
---

# Motion system — Subtle

**Animation for demonstration, not decoration.** If an animation doesn't clarify content, hierarchy or story, don't add it.

Content eases in once as it enters the viewport; media drifts slightly. Nothing loops.

Libraries: CSS (transitions, scroll-driven animations), Motion. Use CSS for simple transitions and Motion for everything else — reveals, scroll-linked and pinned sequences (useScroll + useTransform, position: sticky for pins). No GSAP: its licence excludes tools that compete with Webflow.

## Patterns (implement in this order)
### State feedback
- Purpose: Confirm interaction (hover, focus, press) so controls feel responsive.
- Trigger: Pointer hover, keyboard focus, active press
- Behavior: Color/underline/opacity change on hover — only where a pointer can hover; every pressable scales to 0.97 while pressed; no layout shift.
- Duration / easing: press 140ms (--duration-press), hover 150ms · var(--ease-out) for the press, ease for colour
- How: CSS transitions that name each property they move (never all); `:active { transform: scale(0.97) }` on every button, link card and tile; hover styles under `@media (hover: hover) and (pointer: fine)` — Tailwind v4's hover: already is.
- Performance: Transition only color, opacity, transform.
- Reduced motion: Keep — these are not motion-heavy; remove transform component.

### Soft fade
- Purpose: Let sections settle in like light changing — nothing moves, it simply appears.
- Trigger: Element enters viewport (IntersectionObserver, threshold 0.2), once
- Behavior: opacity 0→1 only, no movement; children 90ms apart.
- Duration / easing: 800–1000ms · cubic-bezier(0.25, 0.1, 0.25, 1)
- How: Motion `whileInView` with `viewport={{ once: true }}`, or CSS + IntersectionObserver class toggle.
- Performance: Animate transform/opacity only; don't observe hundreds of nodes — observe section wrappers.
- Reduced motion: Opacity only, 200ms, no translate.

### Image clip reveal
- Purpose: Create a visual transition into the next section; the image "opens" like a curtain.
- Trigger: Viewport entry
- Behavior: clip-path: inset(100% 0 0 0) → inset(0); inner image scales 1.15 → 1.
- Duration / easing: 900–1200ms · cubic-bezier(0.65, 0, 0.35, 1)
- How: CSS clip-path transition triggered by IntersectionObserver, or Motion useScroll + useTransform for a scroll-linked version.
- Performance: clip-path and transform are compositor-friendly in modern browsers; avoid animating width/height.
- Reduced motion: Simple 200ms fade.

### Line-by-line headline reveal
- Purpose: Direct attention to headlines and set reading pace.
- Trigger: Viewport entry, once
- Behavior: Each line masked (overflow hidden) and translated from 100% to 0, 80ms stagger.
- Duration / easing: 700ms per line · cubic-bezier(0.22, 1, 0.36, 1)
- How: Split lines manually in markup (preferred for control) (one span per line or word); animate with Motion or CSS.
- Performance: Only transform; split into lines, not characters, for body-length text.
- Reduced motion: Show lines immediately.

## Rules
- Animate transform, opacity and clip-path only.
- Season every page as `recipe/motion.md` → Seasoning says — smooth loaders, this site's few micro-interactions, parallax only in its dose. Salt, not sauce.
- How each motion feels (curves, times, press, exits): the `interaction-craft` skill.
- Wrap every effect in a reduced-motion check (`useReducedMotion()` or `matchMedia('(prefers-reduced-motion: reduce)')`).
- Clean up observers and listeners on unmount.
