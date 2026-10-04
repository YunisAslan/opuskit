---
name: motion-system
description: "Implements the immersive motion system for Sela Mor — Monochrome Minimal Personal Site: fade & rise reveal, line-by-line headline reveal, smooth scroll, pinned story sequence, scroll-driven type, page transition. Use when adding animation, scroll effects, transitions or reduced-motion support."
---

# Motion system — Immersive

**Animation for demonstration, not decoration.** If an animation doesn't clarify content, hierarchy or story, don't add it.

Pinned, scroll-driven sequences where media and type are choreographed together.

Libraries: CSS (transitions, scroll-driven animations), Motion, Lenis. Use CSS for simple transitions and Motion for everything else — reveals, scroll-linked and pinned sequences (useScroll + useTransform, position: sticky for pins). No GSAP: its licence excludes tools that compete with Webflow.

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

### Scroll-driven type
- Purpose: Make words themselves the moving image.
- Trigger: Scroll progress
- Behavior: Headlines drift horizontally (translateX ±20vw) or shift weight via font-variation-settings.
- Duration / easing: Scroll-linked · linear scrub
- How: Motion useScroll + useTransform, or CSS scroll-driven animations where supported.
- Performance: Variable-font axis animation triggers text re-layout — limit to one headline at a time.
- Reduced motion: Static type at final position.

### Page transition
- Purpose: Connect pages so navigation feels continuous (e.g. project thumbnail expands into the case study hero).
- Trigger: Route change
- Behavior: Shared element morphs between pages; others crossfade.
- Duration / easing: 400–600ms · cubic-bezier(0.65, 0, 0.35, 1)
- How: View Transitions API (document.startViewTransition / Next.js experimental viewTransition) with CSS; Motion layout animations as fallback.
- Performance: Keep transitions short; never block navigation on animation.
- Reduced motion: Instant navigation.

## Signature moments (build each one where it is placed)
- **Chapters that open with a giant word** on Listen — Intro: Each main chapter opens on one word set huge — wider than the screen, cropped at the edges — before its content starts, so the page reads like a printed magazine with loud covers. How: A full-width divider before the section: one word (the chapter’s subject, not a slogan) in the display face at 18–26vw, line-height 0.8, tight tracking, allowed to overflow and clip (overflow: hidden on the band). On enter it slides 8% sideways over the band’s scroll range (Motion useScroll + useTransform on x). The same word is the section’s h2 for screen readers (visually the band, aria-hidden duplicate). Mobile: Same word at 28–32vw, still cropped; no sideways drift.
- **Proof, one at a time** on Home — Featured Work: The section holds still while the visitor scrolls, and its 4–6 proofs (projects, figures, quotes) replace each other one at a time, with a small counter — each one gets the whole screen for a moment. How: An outer block of (items × 70vh) with a sticky inner frame (top: 0, height: 100svh). Motion useScroll on the outer block gives progress; the active index = floor(progress × items). Items crossfade with a short vertical travel (≤ 24px); the counter (03 / 05) in the utility face. Each item is a real element in the DOM, in order, for screen readers. Mobile: No pinning: the items stack, each at least one screen tall, with the counter beside each.

## Rules
- Animate transform and opacity only.
- Wrap every effect in a reduced-motion check (`useReducedMotion()` or `matchMedia('(prefers-reduced-motion: reduce)')`).
- Clean up observers and listeners on unmount.
