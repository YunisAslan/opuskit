---
name: motion-system
description: "Implements the subtle motion system for QUM — Warm Scandinavian Minimal Store: soft fade, image clip reveal. Use when adding animation, scroll effects, transitions or reduced-motion support."
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

## Signature moments (build each one where it is placed)
- **A walk through named stops** on The salt — Location: Scrolling moves the visitor from stop to stop — “The terrace”, “Room 4”, “The kitchen” — each a full-screen view with a small card that names it and says one useful thing, with a row of stop names showing where they are. How: Each stop is a full-viewport panel (sticky media, CSS scroll-snap-type: y proximity on the section only). A small info card (surface token, utility label + 1–2 lines + one link) enters per stop. A fixed stop index (names, current one marked) sits at the side while the section is in view; clicking a name scrolls to its stop. Mobile: Stops stack as tall panels; the index becomes a horizontal row of names at the top of the section.
- **A live status line** on Navigation: A small line tells what is true right now — “Open now · closes 23:00”, “Baku 18:42”, “Next session in 3 days” — so the site feels alive, not printed. How: A client component in the utility face that computes its text from real data in the recipe (opening hours, time zone, next event date) with Intl.DateTimeFormat, re-rendered every 30–60 s; a 6px status dot (accent when open, muted when closed). The server renders a neutral fallback (“Open daily 12:00–23:00”) so nothing jumps. Mobile: Same line, one row; wraps under the logo if needed.

## Rules
- Animate transform and opacity only.
- Wrap every effect in a reduced-motion check (`useReducedMotion()` or `matchMedia('(prefers-reduced-motion: reduce)')`).
- Clean up observers and listeners on unmount.
