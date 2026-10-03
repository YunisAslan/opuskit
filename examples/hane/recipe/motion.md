## Motion System — Subtle

Content eases in once as it enters the viewport; media drifts slightly. Nothing loops.

**Rule:** animation for demonstration, not decoration.

**Libraries:** CSS (transitions, scroll-driven animations), Motion

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

## Signature Moments

The small interactions people remember. Build each one exactly where it is placed — they are part of the design, not optional polish.

### A walk through named stops — Home — Location
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

### Filling underline — Every page — menu, footer and text links
A link’s underline grows into a full block on hover, flipping its colour.
- **Code:** `src/components/pieces/UnderlineFill.tsx` → `import { UnderlineFill } from '@/components/pieces/UnderlineFill'`
- **Use:** `<UnderlineFill href="/contact">Start a conversation</UnderlineFill>`
- Text links only — never on buttons.

Licences: adapted from MIT-licensed libraries — see `THIRD-PARTY-NOTICES.md`.
