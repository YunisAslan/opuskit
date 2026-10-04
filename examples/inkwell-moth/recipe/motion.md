## Motion System — Dynamic

Scroll-linked parallax, line-by-line type reveals, media transitions between sections.

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

### Parallax drift
- **Purpose:** Add depth so media feels like a space rather than a flat picture.
- **Trigger:** Scroll progress while element is in view
- **Behavior:** Media translates at 0.2–0.35× scroll speed within an overflow-hidden frame.
- **Duration:** Scroll-linked
- **Easing:** linear (scrub)
- **Implementation:** CSS scroll-driven animations (animation-timeline: view()) with a Motion useScroll + useTransform fallback for browsers without it.
- **Performance:** Only transform; set will-change on the moving layer only while in view.
- **Reduced motion:** Disable parallax — static image.

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

### A playful way in — Home — Hero — Illustrated hero
- **What visitors experience:** Before the site opens, visitors do one small playful thing — drag a slider, hold a button, pick a colour — and the site opens because of it. It takes three seconds and sets the tone.
- **How:** An overlay on the first visit of a session (sessionStorage) with one control (shadcn Slider, or a press-and-hold button that fills over 1.2s). Completing it plays the opening (the overlay splits or wipes away, 600ms). A visible “Skip” link, focusable first; Esc skips. The page content is in the DOM underneath from the start.
- **Mobile:** The same gate, thumb-sized (≥ 56px controls).
- **Reduced motion:** The gate shows a single “Enter” button; the site appears without the wipe.

### Each item brings its own colours — Home — Featured Work
- **What visitors experience:** As a product, flavour or project comes into view, the whole section’s ground and text change to its own colours — one colour story per item.
- **How:** Each item carries two colours (ground, ink) from its own photo or the colour chapters (--color-chapter-1..3); an IntersectionObserver on the items sets them as CSS variables on the section, which transitions background-color and color over 500ms. Text stays AA on every ground.
- **Mobile:** Same, per item as it scrolls in.
- **Reduced motion:** Colours change instantly, without the transition.

## Your Kit — ready pieces

The owner picked these components. Their code is already in the project at `src/components/pieces/` — import and use it; do not rebuild or replace them, and do not add other animation libraries for the same job. They read colours and fonts from the recipe tokens (`--color-*`, `--font-*`) and already handle reduced motion. Adjust sizes, spacing and copy to the recipe — never their core behaviour.

### Prints on a desk — Home → Gallery
Photos scattered like prints; visitors pick one up and move it.
- **Code:** `src/components/pieces/DragPhotos.tsx` → `import { DragPhotos } from '@/components/pieces/DragPhotos'`
- **Use:** `<DragPhotos photos={[{ src: "/media/a.jpg", alt: "…", x: "10%", y: "20%", w: "22%", rotate: -4 }]} className="h-[80svh]" />`
- 6–10 photos, small rotations (±6°).
- A plain grid of the same photos stays in the page for keyboard users.

### Tilted scroll grid — Books → Gallery
A dense photo grid that stands up flat as you scroll into it.
- **Code:** `src/components/pieces/TiltedGrid.tsx` → `import { TiltedGrid } from '@/components/pieces/TiltedGrid'`
- **Use:** `<TiltedGrid photos={photos} columns={5} />`
- 10+ photos, same ratio.
- 3 columns on mobile.

### Hand-drawn underline — Every page — menu, footer and text links
A squiggle draws itself under a link on hover; the current page keeps it.
- **Code:** `src/components/pieces/ScribbleLink.tsx` → `import { ScribbleLink } from '@/components/pieces/ScribbleLink'`
- **Use:** `<ScribbleLink link={Link} href="/work" current={path === "/work"}>Work</ScribbleLink>`
- Navigation links; pass `current` for the page you are on.

Licences: adapted from MIT-licensed libraries — see `THIRD-PARTY-NOTICES.md`.
