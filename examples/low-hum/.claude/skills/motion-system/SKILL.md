---
name: motion-system
description: "Implements the dynamic motion system for Low Hum — Cheeky Retro Seventies Restaurant Site: spring settle, image clip reveal, parallax drift, page transition. Use when adding animation, scroll effects, transitions or reduced-motion support."
---

# Motion system — Dynamic

**Animation for demonstration, not decoration.** If an animation doesn't clarify content, hierarchy or story, don't add it.

Scroll-linked parallax, line-by-line type reveals, media transitions between sections.

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

### Spring settle
- Purpose: Warm and unhurried — like something placed by hand.
- Trigger: Element enters viewport (IntersectionObserver, threshold 0.2), once
- Behavior: elements rise 20px with a soft spring (stiffness 120, damping 20); images fade in under them.
- Duration / easing: spring · spring
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

### Parallax drift
- Purpose: Add depth so media feels like a space rather than a flat picture.
- Trigger: Scroll progress while element is in view
- Behavior: Media translates at 0.2–0.35× scroll speed within an overflow-hidden frame.
- Duration / easing: Scroll-linked · linear (scrub)
- How: CSS scroll-driven animations (animation-timeline: view()) with a Motion useScroll + useTransform fallback for browsers without it.
- Performance: Only transform; set will-change on the moving layer only while in view.
- Reduced motion: Disable parallax — static image.

### Page transition
- Purpose: Connect pages so navigation feels continuous (e.g. a card’s picture grows into the page it opens).
- Trigger: Route change
- Behavior: Shared element morphs between pages; others crossfade.
- Duration / easing: 400–600ms · cubic-bezier(0.65, 0, 0.35, 1)
- How: View Transitions API (document.startViewTransition / Next.js experimental viewTransition) with CSS; Motion layout animations as fallback.
- Performance: Keep transitions short; never block navigation on animation.
- Reduced motion: Instant navigation.

## Rules
- Animate transform and opacity only.
- Wrap every effect in a reduced-motion check (`useReducedMotion()` or `matchMedia('(prefers-reduced-motion: reduce)')`).
- Clean up observers and listeners on unmount.
