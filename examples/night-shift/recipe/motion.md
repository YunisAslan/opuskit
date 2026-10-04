## Motion System — Immersive

Pinned, scroll-driven sequences where media and type are choreographed together.

**Rule:** animation for demonstration, not decoration.

**Libraries:** CSS (transitions, scroll-driven animations), Motion, Lenis, React Three Fiber + drei

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

### Line-by-line headline reveal
- **Purpose:** Direct attention to headlines and set reading pace.
- **Trigger:** Viewport entry, once
- **Behavior:** Each line masked (overflow hidden) and translated from 100% to 0, 80ms stagger.
- **Duration:** 700ms per line
- **Easing:** cubic-bezier(0.22, 1, 0.36, 1)
- **Implementation:** Split lines manually in markup (preferred for control) (one span per line or word); animate with Motion or CSS.
- **Performance:** Only transform; split into lines, not characters, for body-length text.
- **Reduced motion:** Show lines immediately.

### Parallax drift
- **Purpose:** Add depth so media feels like a space rather than a flat picture.
- **Trigger:** Scroll progress while element is in view
- **Behavior:** Media translates at 0.2–0.35× scroll speed within an overflow-hidden frame.
- **Duration:** Scroll-linked
- **Easing:** linear (scrub)
- **Implementation:** CSS scroll-driven animations (animation-timeline: view()) with a Motion useScroll + useTransform fallback for browsers without it.
- **Performance:** Only transform; set will-change on the moving layer only while in view.
- **Reduced motion:** Disable parallax — static image.

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

### 3D pointer & scroll response
- **Purpose:** Invite exploration of the 3D object without demanding interaction.
- **Trigger:** Pointer move; scroll progress
- **Behavior:** Object rotates ≤ 8° toward pointer; camera dollies on scroll.
- **Duration:** Damped (lerp 0.08)
- **Easing:** damped spring
- **Implementation:** React Three Fiber + drei; useFrame with damping; frameloop="demand" when idle.
- **Performance:** Cap DPR at 2, pause rendering off-screen, compress with Draco, lazy-load the canvas.
- **Reduced motion:** Static pre-rendered poster.

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

### Labels that decode — Curriculum — Features
- **What visitors experience:** Small labels (// Features, // 02 Sync) resolve out of random characters as they come into view, over a fine hairline grid — the section reads like a live console.
- **How:** Labels in the utility face, prefixed with “//”; each runs a character scramble once on first view (≈ 600ms, a fixed-width box so nothing shifts) — the TextScramble kit piece if it is in the kit, else a small rAF loop. The section gets a 1px hairline grid in the border colour behind it.
- **Mobile:** Same, labels only (no grid under 640px).
- **Reduced motion:** Labels shown as they are.

### A live status line — Navigation
- **What visitors experience:** A small line tells what is true right now — “Open now · closes 23:00”, “Baku 18:42”, “Next session in 3 days” — so the site feels alive, not printed.
- **How:** A client component in the utility face that computes its text from real data in the recipe (opening hours, time zone, next event date) with Intl.DateTimeFormat, re-rendered every 30–60 s; a 6px status dot (accent when open, muted when closed). The server renders a neutral fallback (“Open daily 12:00–23:00”) so nothing jumps.
- **Mobile:** Same line, one row; wraps under the logo if needed.
- **Reduced motion:** Unchanged (the dot does not pulse).

## Your Kit — ready pieces

The owner picked these components. Their code is already in the project at `src/components/pieces/` — import and use it; do not rebuild or replace them, and do not add other animation libraries for the same job. They read colours and fonts from the recipe tokens (`--color-*`, `--font-*`) and already handle reduced motion. Adjust sizes, spacing and copy to the recipe — never their core behaviour.

### Before / after — Home → Case Study Preview; Curriculum → Case Study Preview
Drag a divider to compare two photos of the same view.
- **Code:** `src/components/pieces/ImageComparison.tsx` → `import { ImageComparison } from '@/components/pieces/ImageComparison'`
- **Use:** `<ImageComparison before="/media/before.jpg" after="/media/after.jpg" beforeAlt="…" afterAlt="…" className="aspect-[3/2]" />`
- Only for a real before/after pair shot from the same position.
- Keyboard: the divider is a slider (arrow keys).

### Scrambled labels — Every page — menu, footer and text links
Short labels resolve out of random letters, and again on hover.
- **Code:** `src/components/pieces/TextScramble.tsx` → `import { TextScramble } from '@/components/pieces/TextScramble'`
- **Use:** `<TextScramble className="font-(family-name:--font-utility)">Selected work</TextScramble>`
- Labels of 1–3 words. Never on body copy or headlines.
- Suits technical, futuristic and editorial directions; skip it for warm, organic ones.

Licences: adapted from MIT-licensed libraries — see `THIRD-PARTY-NOTICES.md`.
