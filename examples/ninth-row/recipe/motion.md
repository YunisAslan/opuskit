## Motion System — Immersive

Pinned, scroll-driven sequences where media and type are choreographed together.

**Rule:** animation for demonstration, not decoration.

**Libraries:** CSS (transitions, scroll-driven animations), Motion, Lenis

### State feedback
- **Purpose:** Confirm interaction (hover, focus, press) so controls feel responsive.
- **Trigger:** Pointer hover, keyboard focus, active press
- **Behavior:** Color/underline/opacity change on hover — only where a pointer can hover; every pressable scales to 0.97 while pressed; no layout shift.
- **Duration:** press 140ms (--duration-press), hover 150ms
- **Easing:** var(--ease-out) for the press, ease for colour
- **Implementation:** CSS transitions that name each property they move (never all); `:active { transform: scale(0.97) }` on every button, link card and tile; hover styles under `@media (hover: hover) and (pointer: fine)` — Tailwind v4's hover: already is.
- **Performance:** Transition only color, opacity, transform.
- **Reduced motion:** Keep — these are not motion-heavy; remove transform component.

### Clip reveal
- **Purpose:** Every section enters like a cut in a film — image first, words second.
- **Trigger:** Element enters viewport (IntersectionObserver, threshold 0.2), once
- **Behavior:** media unmask from a thin line to full height; text fades in after the media lands.
- **Duration:** 900–1200ms
- **Easing:** cubic-bezier(0.65, 0, 0.35, 1)
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
- **Behavior:** Each line masked (overflow hidden) and translated from 100% to 0, 80ms stagger. The mask keeps room for the letters: about 0.2em above and 0.3em below inside it, cancelled by the same negative margin, so no descender or accent is cut.
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
- **Purpose:** Connect pages so navigation feels continuous (e.g. a card’s picture grows into the page it opens).
- **Trigger:** Route change
- **Behavior:** Shared element morphs between pages; others crossfade.
- **Duration:** 400–600ms
- **Easing:** cubic-bezier(0.65, 0, 0.35, 1)
- **Implementation:** View Transitions API (document.startViewTransition / Next.js experimental viewTransition) with CSS; Motion layout animations as fallback.
- **Performance:** Keep transitions short; never block navigation on animation.
- **Reduced motion:** Instant navigation.

## Signature Moments

None were picked: the first screen (Scroll-controlled video) and the effects the owner picked (Your Kit) carry Home. Every other page gets one moment you design yourself — see Room to invent: one per page, never more.

## Seasoning — smooth loaders, micro-interactions, parallax

Salt, not sauce. These three are on every page, in a small dose: nobody should be able to name them, and everyone would feel them missing. They never take the place of the page's remembered moment, and they never sit on words being read, on a form being filled or on anything the visitor compares. The curves and times are in tokens.css; how each one is built is in Interaction craft.

### Smooth loaders
- **Pictures** — the space is held by the asset’s own ratio, filled with --color-surface; each picture fades in over 300–400ms (opacity, var(--ease-out)) once it has loaded (next/image `onLoad`, or `placeholder="blur"` for imported files). Never pops in, never a spinner over a photo, nothing jumps.
- **Pages** — `app/loading.tsx` in the site's own tones: a quiet skeleton in the shapes of what is coming (a heading bar, picture blocks), its shimmer slow (linear 1.6s) and still under reduced motion. Moving between pages cross-fades in 150–200ms; nothing slides.
- **Waiting on an action** — see Sending a form: the control that was used shows the wait, in place; the page around it never blocks.
- **Film** — the poster paints first and is the first screen until the film can play; the film fades in over it (300ms) on `canplay`, never a black frame or a spinner.
- **Fonts** — through next/font (it sizes the fallback to the real face), so nothing reflows when the face arrives.
- **The first visit** — no full-screen loader: the first screen is complete and readable before anything animates.

### Micro-interactions — this site's whole set
Use these few, the same way on every page; nothing else gets its own trick.
- **Press and hover** — every button, link card and tile: soft and slow — hovering one item of a list dims the others to 60% instead of moving it (200ms). A press always answers — scale 0.97 at --duration-press, or this look’s own press where one is named here; hover waits for a pointer that can hover.
- **Sending a form** — the button keeps its width and label, shows a small spinner inside it only after 300ms (and keeps it at least 500ms, so it never flickers), then ends in place: a tick that draws in (200ms) and one line saying what happens next. Errors appear under their field, in --color-error.
- **The phone menu** — its icon turns into a close (two lines rotate, 200ms, var(--ease-in-out)); the menu itself slides as a sheet (--duration-sheet, var(--ease-drawer)) and leaves the way it came.
- **Numbers that change** (prices, counts, times) — they change in place, never re-layout: tabular figures where the face’s own look like it, else its normal figures in a box of fixed width.

### Parallax — the dose
- Where the recipe places depth (the patterns above, the signature moments); everywhere else the dynamic dose — up to two bands a page, 6–10%. Depth is still a spice here.
- Only a picture moves, never text, a form or a list: it sits in an overflow-hidden frame, scaled 1.1 so no edge ever shows, and travels linearly with the scroll — CSS scroll-driven animation (`animation-timeline: view()`) with Motion `useScroll` + `useTransform` on `transform` as the fallback.
- Never `background-attachment: fixed` (it breaks on phones), never scroll-jacking, never two layers fighting in one view.
- Phones: half the travel, or none where the crop is tight. Reduced motion: none — the picture stands still.


## Your Kit — ready pieces

The owner picked these components. Their code is already in the project at `src/components/pieces/` — it does the hard part (the animation, shader or interaction, and its reduced-motion version), so build on it rather than from scratch, and do not add other animation libraries for the same job. It reads colours and fonts from the recipe tokens (`--color-*`, `--font-*`). It is a reference, not a sealed part: keep what the owner picked it for — its behaviour — and fit everything else to the site (size, place, spacing, the type around it), editing its code wherever its defaults disagree.

### Smooth scroll — Whole site — mount once in app/layout.tsx
Scrolling glides instead of stepping, so every scroll effect moves as one.
- **Code:** `src/components/pieces/SmoothScroll.tsx` → `import { SmoothScroll } from '@/components/pieces/SmoothScroll'`
- **Use:** `// app/layout.tsx, inside <body>:
<SmoothScroll />`
- Mouse and trackpad only — touch keeps the phone’s own scroll.
- Never hijack the scroll: the page moves exactly as far as the visitor scrolls.

### Curtain between pages — Whole site — every internal link; mount once in app/layout.tsx
A plain panel rises over the page carrying the next page’s name, then lifts away.
- **Code:** `src/components/pieces/PageCurtain.tsx` → `import { PageCurtain } from '@/components/pieces/PageCurtain'`
- **Use:** `// app/layout.tsx, inside <body>:
<PageCurtain />`
- Mount once in the root layout; it handles every internal link.
- Under 700 ms in total — the name is a beat, not a wait.

Licences: adapted from MIT-licensed libraries — see `THIRD-PARTY-NOTICES.md`.
