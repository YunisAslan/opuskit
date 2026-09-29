## Motion System — Immersive

Pinned, scroll-driven sequences where media and type are choreographed together.

**Rule:** animation for demonstration, not decoration.

**Libraries:** CSS (transitions, scroll-driven animations), Motion, Lenis, GSAP + ScrollTrigger

### State feedback
- **Purpose:** Confirm interaction (hover, focus, press) so controls feel responsive.
- **Trigger:** Pointer hover, keyboard focus, active press
- **Behavior:** Color/underline/opacity change; no layout shift.
- **Duration:** 120–180ms
- **Easing:** ease-out
- **Implementation:** CSS transitions on color, opacity, transform.
- **Performance:** Transition only color, opacity, transform.
- **Reduced motion:** Keep — these are not motion-heavy; remove transform component.

### Fade & rise reveal
- **Purpose:** Give sections a calm entrance so content arrives in reading order.
- **Trigger:** Element enters viewport (IntersectionObserver, threshold 0.2), once
- **Behavior:** opacity 0→1, translateY 16px→0, children staggered 60ms.
- **Duration:** 500–700ms
- **Easing:** cubic-bezier(0.22, 1, 0.36, 1)
- **Implementation:** Motion `whileInView` with `viewport={{ once: true }}`, or CSS + IntersectionObserver class toggle.
- **Performance:** Animate transform/opacity only; don't observe hundreds of nodes — observe section wrappers.
- **Reduced motion:** Opacity only, 200ms, no translate.

### Image clip reveal
- **Purpose:** Create a visual transition into the next section; the image "opens" like a curtain.
- **Trigger:** Viewport entry
- **Behavior:** clip-path: inset(100% 0 0 0) → inset(0); inner image scales 1.15 → 1.
- **Duration:** 900–1200ms
- **Easing:** cubic-bezier(0.65, 0, 0.35, 1)
- **Implementation:** CSS clip-path transition triggered by IntersectionObserver, or GSAP for scroll-linked scrub.
- **Performance:** clip-path and transform are compositor-friendly in modern browsers; avoid animating width/height.
- **Reduced motion:** Simple 200ms fade.

### Line-by-line headline reveal
- **Purpose:** Direct attention to headlines and set reading pace.
- **Trigger:** Viewport entry, once
- **Behavior:** Each line masked (overflow hidden) and translated from 100% to 0, 80ms stagger.
- **Duration:** 700ms per line
- **Easing:** cubic-bezier(0.22, 1, 0.36, 1)
- **Implementation:** Split lines manually in markup (preferred for control) or with GSAP SplitText; animate with Motion or CSS.
- **Performance:** Only transform; split into lines, not characters, for body-length text.
- **Reduced motion:** Show lines immediately.

### Smooth scroll
- **Purpose:** Make scroll-linked sequences feel continuous and cinematic.
- **Trigger:** Always on (desktop pointer devices)
- **Behavior:** Inertial scroll with lerp ~0.1; native scroll position preserved.
- **Duration:** Continuous
- **Easing:** lerp
- **Implementation:** Lenis, synced to GSAP ticker (lenis.on("scroll", ScrollTrigger.update)).
- **Performance:** Disable on touch devices (native momentum is better); never break anchor links or keyboard scrolling.
- **Reduced motion:** Disable Lenis entirely.

### Pinned story sequence
- **Purpose:** Tell one story in steps while the visual stays in place.
- **Trigger:** Section reaches top of viewport; pinned for 200–400vh
- **Behavior:** Visual stays fixed while text chapters advance; media crossfades or transforms per chapter.
- **Duration:** Scroll-linked (scrub 0.5)
- **Easing:** linear scrub with eased keyframes
- **Implementation:** GSAP ScrollTrigger with pin: true and a timeline per chapter.
- **Performance:** Limit to one or two pinned sections per page; use pinSpacing and test on mobile Safari.
- **Reduced motion:** Unpin: render chapters as a normal vertical list with static media.

### Scroll-scrubbed video
- **Purpose:** Let the visitor control time — scroll moves the camera through the scene.
- **Trigger:** Pinned hero section scroll progress
- **Behavior:** video.currentTime = progress × duration, smoothed (scrub 0.5).
- **Duration:** Scroll-linked over ~300vh
- **Easing:** linear scrub
- **Implementation:** GSAP ScrollTrigger onUpdate → currentTime; encode with scripts/prepare-video.sh (CRF 20, keyframe every 6 frames) from the original file — re-compressing a web copy is what makes scrubbed video look soft.
- **Performance:** Preload metadata + first chunk; use requestVideoFrameCallback where supported; mobile encode ≤ 3MB.
- **Reduced motion:** Show poster image; play video only on user request.

### Hover media preview
- **Purpose:** Let an index/list reveal the project image on hover, keeping lists compact.
- **Trigger:** Pointer enters list item (pointer devices only)
- **Behavior:** Image appears near cursor or in a fixed slot, crossfades between items.
- **Duration:** 250ms fade, 0.15 lerp follow
- **Easing:** ease-out
- **Implementation:** Motion (useSpring for cursor follow) — pointer:fine only.
- **Performance:** Preload preview images at small size; disable on touch.
- **Reduced motion:** Show image in fixed slot without follow motion.

### Page transition
- **Purpose:** Connect pages so navigation feels continuous (e.g. project thumbnail expands into the case study hero).
- **Trigger:** Route change
- **Behavior:** Shared element morphs between pages; others crossfade.
- **Duration:** 400–600ms
- **Easing:** cubic-bezier(0.65, 0, 0.35, 1)
- **Implementation:** View Transitions API (document.startViewTransition / Next.js experimental viewTransition) with CSS; Motion layout animations as fallback.
- **Performance:** Keep transitions short; never block navigation on animation.
- **Reduced motion:** Instant navigation.

## Signature Moments

The small interactions people remember. Build each one exactly where it is placed — they are part of the design, not optional polish.

### A line that draws through your story — About — About
- **What visitors experience:** Milestones sit along a vertical line that fills in as you scroll, so history or process reads as one journey.
- **How:** A 1–2px track with a filled bar whose scaleY follows section scroll progress; each milestone’s dot lights up as the bar passes it.
- **Mobile:** Line on the left edge, milestones stacked to its right.
- **Reduced motion:** Full line shown.
- **Start from:** [Aceternity — Timeline](https://ui.aceternity.com/components/timeline) — restyle to this recipe’s tokens; never ship the demo look.

### Photos revealed like a curtain — Gallery — Gallery
- **What visitors experience:** Images open from a thin line to full size as they come into view, with the photo inside settling from a slight zoom — like a curtain opening.
- **How:** clip-path: inset(100% 0 0 0) → inset(0) over 1s, with the inner image scaling 1.15 → 1; triggered once by IntersectionObserver.
- **Mobile:** Same, shorter (700ms).
- **Reduced motion:** Images simply appear.
