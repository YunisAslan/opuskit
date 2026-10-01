---
name: motion-system
description: "Implements the immersive motion system for Hexmint — Digital Futurism Software Site: fade & rise reveal, line-by-line headline reveal, parallax drift, smooth scroll, pinned story sequence, 3d pointer & scroll response, page transition. Use when adding animation, scroll effects, transitions or reduced-motion support."
---

# Motion system — Immersive

**Animation for demonstration, not decoration.** If an animation doesn't clarify content, hierarchy or story, don't add it.

Pinned, scroll-driven sequences where media and type are choreographed together.

Libraries: CSS (transitions, scroll-driven animations), Motion, Lenis, React Three Fiber + drei. Use CSS for simple transitions and Motion for everything else — reveals, scroll-linked and pinned sequences (useScroll + useTransform, position: sticky for pins). No GSAP: its licence excludes tools that compete with Webflow.

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
- How: Split lines manually in markup (preferred for control) (one span per line or word); animate with Motion or CSS.
- Performance: Only transform; split into lines, not characters, for body-length text.
- Reduced motion: Show lines immediately.

### Parallax drift
- Purpose: Add depth so media feels like a space rather than a flat picture.
- Trigger: Scroll progress while element is in view
- Behavior: Media translates at 0.2–0.35× scroll speed within an overflow-hidden frame.
- Duration / easing: Scroll-linked · linear (scrub)
- How: CSS scroll-driven animations (animation-timeline: view()) with a Motion useScroll + useTransform fallback for browsers without it.
- Performance: Only transform; set will-change on the moving layer only while in view.
- Reduced motion: Disable parallax — static image.

### Smooth scroll
- Purpose: Make scroll-linked sequences feel continuous and cinematic.
- Trigger: Always on (desktop pointer devices)
- Behavior: Inertial scroll with lerp ~0.1; native scroll position preserved.
- Duration / easing: Continuous · lerp
- How: Lenis (or the SmoothScroll kit piece); Motion useScroll reads the native scroll position Lenis keeps, so no extra syncing is needed.
- Performance: Disable on touch devices (native momentum is better); never break anchor links or keyboard scrolling.
- Reduced motion: Disable Lenis entirely.

### Pinned story sequence
- Purpose: Tell one story in steps while the visual stays in place.
- Trigger: Section reaches top of viewport; pinned for 200–400vh
- Behavior: Visual stays fixed while text chapters advance; media crossfades or transforms per chapter.
- Duration / easing: Scroll-linked (scrub 0.5) · linear scrub with eased keyframes
- How: CSS position: sticky for the pin (a tall outer block, a 100svh sticky frame); Motion useScroll on the outer block → useTransform per chapter.
- Performance: Limit to one or two pinned sections per page; the outer block height is the pin length; test on mobile Safari.
- Reduced motion: Unpin: render chapters as a normal vertical list with static media.

### 3D pointer & scroll response
- Purpose: Invite exploration of the 3D object without demanding interaction.
- Trigger: Pointer move; scroll progress
- Behavior: Object rotates ≤ 8° toward pointer; camera dollies on scroll.
- Duration / easing: Damped (lerp 0.08) · damped spring
- How: React Three Fiber + drei; useFrame with damping; frameloop="demand" when idle.
- Performance: Cap DPR at 2, pause rendering off-screen, compress with Draco, lazy-load the canvas.
- Reduced motion: Static pre-rendered poster.

### Page transition
- Purpose: Connect pages so navigation feels continuous (e.g. project thumbnail expands into the case study hero).
- Trigger: Route change
- Behavior: Shared element morphs between pages; others crossfade.
- Duration / easing: 400–600ms · cubic-bezier(0.65, 0, 0.35, 1)
- How: View Transitions API (document.startViewTransition / Next.js experimental viewTransition) with CSS; Motion layout animations as fallback.
- Performance: Keep transitions short; never block navigation on animation.
- Reduced motion: Instant navigation.

## Signature moments (build each one where it is placed)
- **Labels that decode** on Home — Features: Small labels (// FEATURES, 02 — SYNC) resolve out of random characters as they come into view, over a fine hairline grid — the section reads like a live console. How: Labels in the utility face, prefixed with “//”; each runs a character scramble once on first view (≈ 600ms, a fixed-width box so nothing shifts) — the TextScramble kit piece if it is in the kit, else a small rAF loop. The section gets a 1px hairline grid in the border colour behind it. Mobile: Same, labels only (no grid under 640px).
- **A live status line** on Navigation: A small line tells what is true right now — “Open now · closes 23:00”, “Baku 18:42”, “Next session in 3 days” — so the site feels alive, not printed. How: A client component in the utility face that computes its text from real data in the recipe (opening hours, time zone, next event date) with Intl.DateTimeFormat, re-rendered every 30–60 s; a 6px status dot (accent when open, muted when closed). The server renders a neutral fallback (“Open daily 12:00–23:00”) so nothing jumps. Mobile: Same line, one row; wraps under the logo if needed.

## Rules
- Animate transform and opacity only.
- Wrap every effect in a reduced-motion check (`useReducedMotion()` or `matchMedia('(prefers-reduced-motion: reduce)')`).
- Clean up observers and listeners on unmount.
