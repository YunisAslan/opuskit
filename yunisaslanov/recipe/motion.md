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

### Hard cut
- **Purpose:** Unpolished on purpose — things land like paper on a table.
- **Trigger:** Element enters viewport (IntersectionObserver, threshold 0.2), once
- **Behavior:** elements appear without easing (steps(2)), slightly offset then square; children 50ms apart.
- **Duration:** 200ms
- **Easing:** steps(2)
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

## Signature Moments

The small interactions people remember. Build each one exactly where it is placed — they are part of the design, not optional polish.

### Photos revealed like a curtain — Projects — Gallery
- **What visitors experience:** Images open from a thin line to full size as they come into view, with the photo inside settling from a slight zoom — like a curtain opening.
- **How:** clip-path: inset(100% 0 0 0) → inset(0) over 1s, with the inner image scaling 1.15 → 1; triggered once by IntersectionObserver.
- **Mobile:** Same, shorter (700ms).
- **Reduced motion:** Images simply appear.

## Your Kit — ready pieces

The owner picked these components. Their code is already in the project at `src/components/pieces/` — import and use it; do not rebuild or replace them, and do not add other animation libraries for the same job. They read colours and fonts from the recipe tokens (`--color-*`, `--font-*`) and already handle reduced motion. Adjust sizes, spacing and copy to the recipe — never their core behaviour.

### Dithered pattern — Home → Hero
A two-colour dithered pattern, like a risograph or an old screen.
- **Code:** `src/components/pieces/ShaderDither.tsx` → `import { ShaderDither } from '@/components/pieces/ShaderDither'`
- **Use:** `<section className="relative"><ShaderDither shape="warp" size={3} /><div className="relative">…</div></section>`
- Brutal, technical and futuristic directions.
- One section; keep text on a solid block over it.

### Hand-drawn underline — Every page — menu, footer and text links
A squiggle draws itself under a link on hover; the current page keeps it.
- **Code:** `src/components/pieces/DrawnLink.tsx` → `import { DrawnLink } from '@/components/pieces/DrawnLink'`
- **Use:** `<DrawnLink link={Link} stroke="scribble" href="/work" current={path === "/work"}>Work</DrawnLink>`
- Navigation links; pass `current` for the page you are on.

Licences: adapted from MIT-licensed libraries — see `THIRD-PARTY-NOTICES.md`.
