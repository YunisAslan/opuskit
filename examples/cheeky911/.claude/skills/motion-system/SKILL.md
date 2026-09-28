---
name: motion-system
description: "Implements the immersive motion system for CHEEKY — Film-inspired Fashion House: fade & rise reveal, image clip reveal, line-by-line headline reveal, smooth scroll, pinned story sequence, scroll-scrubbed video, hover media preview, page transition. Use when adding animation, scroll effects, transitions or reduced-motion support."
---

# Motion system — Immersive

**Animation for demonstration, not decoration.** If an animation doesn't clarify content, hierarchy or story, don't add it.

Pinned, scroll-driven sequences where media and type are choreographed together.

Libraries: CSS (transitions, scroll-driven animations), Motion, Lenis, GSAP + ScrollTrigger. Use CSS for simple transitions, Motion for React UI animation, GSAP only for scroll-driven/pinned sequences.

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

### Image clip reveal
- Purpose: Create a visual transition into the next section; the image "opens" like a curtain.
- Trigger: Viewport entry
- Behavior: clip-path: inset(100% 0 0 0) → inset(0); inner image scales 1.15 → 1.
- Duration / easing: 900–1200ms · cubic-bezier(0.65, 0, 0.35, 1)
- How: CSS clip-path transition triggered by IntersectionObserver, or GSAP for scroll-linked scrub.
- Performance: clip-path and transform are compositor-friendly in modern browsers; avoid animating width/height.
- Reduced motion: Simple 200ms fade.

### Line-by-line headline reveal
- Purpose: Direct attention to headlines and set reading pace.
- Trigger: Viewport entry, once
- Behavior: Each line masked (overflow hidden) and translated from 100% to 0, 80ms stagger.
- Duration / easing: 700ms per line · cubic-bezier(0.22, 1, 0.36, 1)
- How: Split lines manually in markup (preferred for control) or with GSAP SplitText; animate with Motion or CSS.
- Performance: Only transform; split into lines, not characters, for body-length text.
- Reduced motion: Show lines immediately.

### Smooth scroll
- Purpose: Make scroll-linked sequences feel continuous and cinematic.
- Trigger: Always on (desktop pointer devices)
- Behavior: Inertial scroll with lerp ~0.1; native scroll position preserved.
- Duration / easing: Continuous · lerp
- How: Lenis, synced to GSAP ticker (lenis.on("scroll", ScrollTrigger.update)).
- Performance: Disable on touch devices (native momentum is better); never break anchor links or keyboard scrolling.
- Reduced motion: Disable Lenis entirely.

### Pinned story sequence
- Purpose: Tell one story in steps while the visual stays in place.
- Trigger: Section reaches top of viewport; pinned for 200–400vh
- Behavior: Visual stays fixed while text chapters advance; media crossfades or transforms per chapter.
- Duration / easing: Scroll-linked (scrub 0.5) · linear scrub with eased keyframes
- How: GSAP ScrollTrigger with pin: true and a timeline per chapter.
- Performance: Limit to one or two pinned sections per page; use pinSpacing and test on mobile Safari.
- Reduced motion: Unpin: render chapters as a normal vertical list with static media.

### Scroll-scrubbed video
- Purpose: Let the visitor control time — scroll moves the camera through the scene.
- Trigger: Pinned hero section scroll progress
- Behavior: video.currentTime = progress × duration, smoothed (scrub 0.5).
- Duration / easing: Scroll-linked over ~300vh · linear scrub
- How: GSAP ScrollTrigger onUpdate → currentTime; encode with scripts/prepare-video.sh (CRF 20, keyframe every 6 frames) from the original file — re-compressing a web copy is what makes scrubbed video look soft.
- Performance: Preload metadata + first chunk; use requestVideoFrameCallback where supported; mobile encode ≤ 3MB.
- Reduced motion: Show poster image; play video only on user request.

### Hover media preview
- Purpose: Let an index/list reveal the project image on hover, keeping lists compact.
- Trigger: Pointer enters list item (pointer devices only)
- Behavior: Image appears near cursor or in a fixed slot, crossfades between items.
- Duration / easing: 250ms fade, 0.15 lerp follow · ease-out
- How: Motion (useSpring for cursor follow) — pointer:fine only.
- Performance: Preload preview images at small size; disable on touch.
- Reduced motion: Show image in fixed slot without follow motion.

### Page transition
- Purpose: Connect pages so navigation feels continuous (e.g. project thumbnail expands into the case study hero).
- Trigger: Route change
- Behavior: Shared element morphs between pages; others crossfade.
- Duration / easing: 400–600ms · cubic-bezier(0.65, 0, 0.35, 1)
- How: View Transitions API (document.startViewTransition / Next.js experimental viewTransition) with CSS; Motion layout animations as fallback.
- Performance: Keep transitions short; never block navigation on animation.
- Reduced motion: Instant navigation.

## Signature moments (build each one where it is placed)
- **Sideways scrolling gallery** on Collections — Lookbook: Scrolling down moves a row of large images sideways, like walking past a gallery wall, then the page carries on. How: Pin the section; GSAP ScrollTrigger maps vertical scroll to translateX of the track (scrub: 1, end = track width − viewport). Images lazy-load one ahead. Mobile: Native horizontal swipe with scroll-snap instead of pinning.
- **Photos revealed like a curtain** on About — Editorial Story: Images open from a thin line to full size as they come into view, with the photo inside settling from a slight zoom — like a curtain opening. How: clip-path: inset(100% 0 0 0) → inset(0) over 1s, with the inner image scaling 1.15 → 1; triggered once by IntersectionObserver. Mobile: Same, shorter (700ms).
- **Footer revealed from underneath** on Footer: At the end, the page lifts away like a sheet and reveals a big footer underneath with the brand name set huge — a satisfying ending. How: Footer is position: sticky; bottom: 0 with z-index below main; main gets a bottom margin equal to footer height and its own background; the brand wordmark spans the full width. Mobile: Normal footer, still with the big wordmark.
- **List with a floating preview** on Shop — Product Grid: Items are a clean typographic list (name, price or year). Hovering a row makes its photo appear beside the cursor and follow it smoothly; moving to the next row swaps the photo. How: One absolutely positioned preview (aspect 4:5, ~14rem) inside the list container; pointermove sets a target, a rAF lerp (0.15) moves it with transform only; crossfade the image on row change; hide when the pointer leaves the list. Mobile: No floating preview: show a small inline thumbnail at the start of each row instead.

## Rules
- Animate transform and opacity only.
- Wrap every effect in a reduced-motion check (`useReducedMotion()` or `matchMedia('(prefers-reduced-motion: reduce)')`).
- Clean up ScrollTriggers / observers on unmount.
