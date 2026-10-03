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

### Ambient video loop
- **Purpose:** Bring atmosphere to the hero without requiring interaction.
- **Trigger:** Autoplay when in view
- **Behavior:** Muted loop; paused when off-screen or tab hidden; visible pause button.
- **Duration:** 8–15s loop
- **Easing:** n/a
- **Implementation:** Native <video autoplay muted loop playsinline poster> + IntersectionObserver.
- **Performance:** preload="metadata"; serve smaller mobile encode via <source media>.
- **Reduced motion:** Do not autoplay; show poster with a play button.

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

### Chapters that open with a giant word — Home — Journal
- **What visitors experience:** Each main chapter opens on one word set huge — wider than the screen, cropped at the edges — before its content starts, so the page reads like a printed magazine with loud covers.
- **How:** A full-width divider before the section: one word (the chapter’s subject, not a slogan) in the display face at 18–26vw, line-height 0.8, tight tracking, allowed to overflow and clip (overflow: hidden on the band). On enter it slides 8% sideways over the band’s scroll range (Motion useScroll + useTransform on x). The same word is the section’s h2 for screen readers (visually the band, aria-hidden duplicate).
- **Mobile:** Same word at 28–32vw, still cropped; no sideways drift.
- **Reduced motion:** The word stands still.

### Photos revealed like a curtain — Collections — Lookbook
- **What visitors experience:** Images open from a thin line to full size as they come into view, with the photo inside settling from a slight zoom — like a curtain opening.
- **How:** clip-path: inset(100% 0 0 0) → inset(0) over 1s, with the inner image scaling 1.15 → 1; triggered once by IntersectionObserver.
- **Mobile:** Same, shorter (700ms).
- **Reduced motion:** Images simply appear.

## Your Kit — ready pieces

The owner picked these components. Their code is already in the project at `src/components/pieces/` — import and use it; do not rebuild or replace them, and do not add other animation libraries for the same job. They read colours and fonts from the recipe tokens (`--color-*`, `--font-*`) and already handle reduced motion. Adjust sizes, spacing and copy to the recipe — never their core behaviour.

### Rolling links — Every page — menu, footer and text links
On hover, each letter of a link rolls over to a fresh copy.
- **Code:** `src/components/pieces/TextRoll.tsx` → `import { TextRoll } from '@/components/pieces/TextRoll'`
- **Use:** `<a href="/work"><TextRoll>Work</TextRoll></a>`
- Navigation and footer links only.
- The link keeps its normal focus outline.

### Hopping arrow button — Every page — the main action
On hover the arrow hops to the other side and the button tilts a little.
- **Code:** `src/components/pieces/SwapButton.tsx` → `import { SwapButton } from '@/components/pieces/SwapButton'`
- **Use:** `<SwapButton href="/contact" label="Tell us your story" />`
- The one primary action of a section.

Licences: adapted from MIT-licensed libraries — see `THIRD-PARTY-NOTICES.md`.
