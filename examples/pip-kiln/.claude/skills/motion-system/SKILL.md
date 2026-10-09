---
name: motion-system
description: "Implements the dynamic motion system for Pip & Kiln — Cheeky Playful Pop Store: hard cut, image clip reveal, line-by-line headline reveal, parallax drift, page transition. Use when adding animation, scroll effects, transitions or reduced-motion support."
---

# Motion system — Dynamic

**Animation for demonstration, not decoration.** If an animation doesn't clarify content, hierarchy or story, don't add it.

Scroll-linked parallax, line-by-line type reveals, media transitions between sections.

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

### Hard cut
- Purpose: Fast and confident — content is simply there, like a poster being slapped up.
- Trigger: Element enters viewport (IntersectionObserver, threshold 0.2), once
- Behavior: elements snap in: opacity 0→1 in 120ms with a 24px slide over 250ms; children 40ms apart; no blur, no bounce.
- Duration / easing: 250ms · cubic-bezier(0.2, 0, 0, 1)
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

### Parallax drift
- Purpose: Add depth so media feels like a space rather than a flat picture.
- Trigger: Scroll progress while element is in view
- Behavior: The picture travels 6–10% of its frame’s height across its pass through the screen, scaled 1.1 inside an overflow-hidden frame so no edge shows; up to two bands a page — a spice, not the dish.
- Duration / easing: Scroll-linked · linear (scrub)
- How: CSS scroll-driven animations (animation-timeline: view()) with a Motion useScroll + useTransform fallback for browsers without it.
- Performance: Only transform; set will-change on the moving layer only while in view; never background-attachment: fixed (it breaks on phones). Phones: half the travel.
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
- Animate transform, opacity and clip-path only.
- Season every page as `recipe/motion.md` → Seasoning says — smooth loaders, this site's few micro-interactions, parallax only in its dose. Salt, not sauce.
- How each motion feels (curves, times, press, exits): the `interaction-craft` skill.
- Wrap every effect in a reduced-motion check (`useReducedMotion()` or `matchMedia('(prefers-reduced-motion: reduce)')`).
- Clean up observers and listeners on unmount.
