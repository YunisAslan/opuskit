## Motion System — Immersive

Pinned, scroll-driven sequences where media and type are choreographed together.

**Rule:** animation for demonstration, not decoration.

**Libraries:** CSS (transitions, scroll-driven animations), Motion, Lenis

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
- **Implementation:** CSS clip-path transition triggered by IntersectionObserver, or Motion useScroll + useTransform for a scroll-linked version.
- **Performance:** clip-path and transform are compositor-friendly in modern browsers; avoid animating width/height.
- **Reduced motion:** Simple 200ms fade.

### Line-by-line headline reveal
- **Purpose:** Direct attention to headlines and set reading pace.
- **Trigger:** Viewport entry, once
- **Behavior:** Each line masked (overflow hidden) and translated from 100% to 0, 80ms stagger.
- **Duration:** 700ms per line
- **Easing:** cubic-bezier(0.22, 1, 0.36, 1)
- **Implementation:** Split lines manually in markup (preferred for control) (one span per line or word); animate with Motion or CSS.
- **Performance:** Only transform; split into lines, not characters, for body-length text.
- **Reduced motion:** Show lines immediately.

### Smooth scroll
- **Purpose:** Make scroll-linked sequences feel continuous and cinematic.
- **Trigger:** Always on (desktop pointer devices)
- **Behavior:** Inertial scroll with lerp ~0.1; native scroll position preserved.
- **Duration:** Continuous
- **Easing:** lerp
- **Implementation:** Lenis (or the SmoothScroll kit piece); Motion useScroll reads the native scroll position Lenis keeps, so no extra syncing is needed.
- **Performance:** Disable on touch devices (native momentum is better); never break anchor links or keyboard scrolling.
- **Reduced motion:** Disable Lenis entirely.

### Pinned story sequence
- **Purpose:** Tell one story in steps while the visual stays in place.
- **Trigger:** Section reaches top of viewport; pinned for 200–400vh
- **Behavior:** Visual stays fixed while text chapters advance; media crossfades or transforms per chapter.
- **Duration:** Scroll-linked (scrub 0.5)
- **Easing:** linear scrub with eased keyframes
- **Implementation:** CSS position: sticky for the pin (a tall outer block, a 100svh sticky frame); Motion useScroll on the outer block → useTransform per chapter.
- **Performance:** Limit to one or two pinned sections per page; the outer block height is the pin length; test on mobile Safari.
- **Reduced motion:** Unpin: render chapters as a normal vertical list with static media.

### Scroll-scrubbed video
- **Purpose:** Let the visitor control time — scroll moves the camera through the scene.
- **Trigger:** Pinned hero section scroll progress
- **Behavior:** video.currentTime = progress × duration, smoothed (scrub 0.5).
- **Duration:** Scroll-linked over ~300vh
- **Easing:** linear scrub
- **Implementation:** Motion useScroll → useSpring → useMotionValueEvent sets currentTime; encode with scripts/prepare-video.sh (CRF 20, keyframe every 6 frames) from the original file — re-compressing a web copy is what makes scrubbed video look soft.
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

### A walk through named stops — Venue & travel — Gallery
- **What visitors experience:** Scrolling moves the visitor from stop to stop — “The terrace”, “Room 4”, “The kitchen” — each a full-screen view with a small card that names it and says one useful thing, with a row of stop names showing where they are.
- **How:** Each stop is a full-viewport panel (sticky media, CSS scroll-snap-type: y proximity on the section only). A small info card (surface token, utility label + 1–2 lines + one link) enters per stop. A fixed stop index (names, current one marked) sits at the side while the section is in view; clicking a name scrolls to its stop.
- **Mobile:** Stops stack as tall panels; the index becomes a horizontal row of names at the top of the section.
- **Reduced motion:** No snapping; cards shown in place.

### A live status line — Navigation
- **What visitors experience:** A small line tells what is true right now — “Open now · closes 23:00”, “Baku 18:42”, “Next session in 3 days” — so the site feels alive, not printed.
- **How:** A client component in the utility face that computes its text from real data in the recipe (opening hours, time zone, next event date) with Intl.DateTimeFormat, re-rendered every 30–60 s; a 6px status dot (accent when open, muted when closed). The server renders a neutral fallback (“Open daily 12:00–23:00”) so nothing jumps.
- **Mobile:** Same line, one row; wraps under the logo if needed.
- **Reduced motion:** Unchanged (the dot does not pulse).

## Your Kit — ready pieces

The owner picked these components. Their code is already in the project at `src/components/pieces/` — import and use it; do not rebuild or replace them, and do not add other animation libraries for the same job. They read colours and fonts from the recipe tokens (`--color-*`, `--font-*`) and already handle reduced motion. Adjust sizes, spacing and copy to the recipe — never their core behaviour.

### Words that arrive — Every page — the h1, plus at most two section headings per page (not every heading)
Headlines reveal word by word as they come into view.
- **Code:** `src/components/pieces/TextEffect.tsx` → `import { TextEffect } from '@/components/pieces/TextEffect'`
- **Use:** `<TextEffect as="h1" preset="slide" className="font-(family-name:--font-display)">Your headline here</TextEffect>`
- Use on the h1 and at most two section headlines — not every heading.
- Choose one preset for the whole site: slide (default), blur or fade.

### Curtain between pages — Whole site — every internal link; mount once in app/layout.tsx
A plain panel rises over the page carrying the next page’s name, then lifts away.
- **Code:** `src/components/pieces/PageCurtain.tsx` → `import { PageCurtain } from '@/components/pieces/PageCurtain'`
- **Use:** `// app/layout.tsx, inside <body>:
<PageCurtain />`
- Mount once in the root layout; it handles every internal link.
- Under 700 ms in total — the name is a beat, not a wait.

Licences: adapted from MIT-licensed libraries — see `THIRD-PARTY-NOTICES.md`.
