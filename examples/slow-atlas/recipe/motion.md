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

### Line-by-line headline reveal
- **Purpose:** Direct attention to headlines and set reading pace.
- **Trigger:** Viewport entry, once
- **Behavior:** Each line masked (overflow hidden) and translated from 100% to 0, 80ms stagger.
- **Duration:** 700ms per line
- **Easing:** cubic-bezier(0.22, 1, 0.36, 1)
- **Implementation:** Split lines manually in markup (preferred for control) or with GSAP SplitText; animate with Motion or CSS.
- **Performance:** Only transform; split into lines, not characters, for body-length text.
- **Reduced motion:** Show lines immediately.

## Signature Moments

The small interactions people remember. Build each one exactly where it is placed — they are part of the design, not optional polish.

### Chapters that open with a giant word — Home — Journal
- **What visitors experience:** Each main chapter opens on one word set huge — wider than the screen, cropped at the edges — before its content starts, so the page reads like a printed magazine with loud covers.
- **How:** A full-width divider before the section: one word (the chapter’s subject, not a slogan) in the display face at 18–26vw, line-height 0.8, tight tracking, allowed to overflow and clip (overflow: hidden on the band). On enter it slides 8% sideways over the band’s scroll range (Motion useScroll + useTransform on x). The same word is the section’s h2 for screen readers (visually the band, aria-hidden duplicate).
- **Mobile:** Same word at 28–32vw, still cropped; no sideways drift.
- **Reduced motion:** The word stands still.

### Photos revealed like a curtain — Home — Editorial Story
- **What visitors experience:** Images open from a thin line to full size as they come into view, with the photo inside settling from a slight zoom — like a curtain opening.
- **How:** clip-path: inset(100% 0 0 0) → inset(0) over 1s, with the inner image scaling 1.15 → 1; triggered once by IntersectionObserver.
- **Mobile:** Same, shorter (700ms).
- **Reduced motion:** Images simply appear.

## Your Kit — ready pieces

The owner picked these components. Their code is already in the project at `src/components/pieces/` — import and use it; do not rebuild or replace them, and do not add other animation libraries for the same job. They read colours and fonts from the recipe tokens (`--color-*`, `--font-*`) and already handle reduced motion. Adjust sizes, spacing and copy to the recipe — never their core behaviour.

### Cut-out headline — Every page — the h1 and each section heading
Words slide up out of a hard mask — sharper than a fade.
- **Code:** `src/components/pieces/CutReveal.tsx` → `import { CutReveal } from '@/components/pieces/CutReveal'`
- **Use:** `<CutReveal as="h1" className="font-(family-name:--font-display) text-8xl">Polo in Sheki</CutReveal>`
- Best with heavy, condensed or wide display faces.
- h1 plus at most two section headlines.

### Curtain between pages — Whole site — every internal link; mount once in app/layout.tsx
A plain panel rises over the page carrying the next page’s name, then lifts away.
- **Code:** `src/components/pieces/PageCurtain.tsx` → `import { PageCurtain } from '@/components/pieces/PageCurtain'`
- **Use:** `// app/layout.tsx, inside <body>:
<PageCurtain />`
- Mount once in the root layout; it handles every internal link.
- Under 700 ms in total — the name is a beat, not a wait.

### Designed preloader — Whole site — mount once in app/layout.tsx
The first visit opens on your name counting in while the page loads, then it lifts away.
- **Code:** `src/components/pieces/Preloader.tsx` → `import { Preloader } from '@/components/pieces/Preloader'`
- **Use:** `// app/layout.tsx, inside <body>:
<Preloader brand="Your name" />`
- Once per visit (session), never on every page.
- It follows real loading (fonts and the first-screen media) and never holds people past 2.5 s.

### Smooth scroll — Whole site — mount once in app/layout.tsx
Scrolling glides instead of stepping, so every scroll effect moves as one.
- **Code:** `src/components/pieces/SmoothScroll.tsx` → `import { SmoothScroll } from '@/components/pieces/SmoothScroll'`
- **Use:** `// app/layout.tsx, inside <body>:
<SmoothScroll />`
- Mouse and trackpad only — touch keeps the phone’s own scroll.
- Never hijack the scroll: the page moves exactly as far as the visitor scrolls.

Licences: adapted from MIT-licensed libraries — see `THIRD-PARTY-NOTICES.md`.
