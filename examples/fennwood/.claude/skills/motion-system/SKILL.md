---
name: motion-system
description: "Implements the dynamic motion system for Fennwood — Organic Modern Restaurant Site: fade & rise reveal, image clip reveal, line-by-line headline reveal, parallax drift, hover media preview, page transition. Use when adding animation, scroll effects, transitions or reduced-motion support."
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
- Behavior: Media translates at 0.2–0.35× scroll speed within an overflow-hidden frame.
- Duration / easing: Scroll-linked · linear (scrub)
- How: CSS scroll-driven animations (animation-timeline: view()) with a Motion useScroll + useTransform fallback for browsers without it.
- Performance: Only transform; set will-change on the moving layer only while in view.
- Reduced motion: Disable parallax — static image.

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
- **One shape travels down the page** on Home — Hero — Full-bleed photo with depth: One element from the first screen — the product, the logo mark, a drawn line — leaves the hero as the visitor scrolls and travels with them, turning up again at each chapter, so the whole page feels guided by one thing. How: One fixed-position layer (pointer-events: none, aria-hidden) holding the motif (SVG or transparent image). Motion useScroll on the page drives x, y, rotate and scale through 3–5 keyframes, one per chapter, read from the chapter sections’ offsets on resize. It sits beside content, never over text; at the footer it settles into its final place. Mobile: The motif appears once per chapter as a static image at the chapter start.
- **A footer worth reaching** on Footer: The end of every page is a small event: the brand name assembles letter by letter across the full width as the footer arrives, or the motif comes to rest in it — the last thing visitors see is the thing they remember. How: The footer keeps its chosen style and adds one closing moment: the brand name in the display face sized to the full container width (one line); its letters rise 40px and fade in with a 40ms stagger as the footer enters (Motion whileInView, once). If the site has a travelling motif, it lands here instead. Mobile: Same wordmark across the width; letters rise together.

## Rules
- Animate transform and opacity only.
- Wrap every effect in a reduced-motion check (`useReducedMotion()` or `matchMedia('(prefers-reduced-motion: reduce)')`).
- Clean up observers and listeners on unmount.
