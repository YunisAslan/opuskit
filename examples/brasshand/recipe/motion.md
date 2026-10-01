## Motion System — Dynamic

Scroll-linked parallax, line-by-line type reveals, media transitions between sections.

**Rule:** animation for demonstration, not decoration.

**Libraries:** CSS (transitions, scroll-driven animations), Motion, GSAP + ScrollTrigger

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

### Scroll-driven type
- **Purpose:** Make words themselves the moving image.
- **Trigger:** Scroll progress
- **Behavior:** Headlines drift horizontally (translateX ±20vw) or shift weight via font-variation-settings.
- **Duration:** Scroll-linked
- **Easing:** linear scrub
- **Implementation:** GSAP ScrollTrigger scrub, or CSS scroll-driven animations where supported.
- **Performance:** Variable-font axis animation triggers text re-layout — limit to one headline at a time.
- **Reduced motion:** Static type at final position.

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

### Chapters that open with a giant word — Home — Manifesto
- **What visitors experience:** Each main chapter opens on one word set huge — wider than the screen, cropped at the edges — before its content starts, so the page reads like a printed magazine with loud covers.
- **How:** A full-width divider before the section: one word (the chapter’s subject, not a slogan) in the display face at 18–26vw, line-height 0.8, tight tracking, allowed to overflow and clip (overflow: hidden on the band). On enter it slides 8% sideways over the band’s scroll range (Motion useScroll + useTransform on x). The same word is the section’s h2 for screen readers (visually the band, aria-hidden duplicate).
- **Mobile:** Same word at 28–32vw, still cropped; no sideways drift.
- **Reduced motion:** The word stands still.

### Proof, one at a time — Home — Featured Work
- **What visitors experience:** The section holds still while the visitor scrolls, and its 4–6 proofs (projects, figures, quotes) replace each other one at a time, with a small counter — each one gets the whole screen for a moment.
- **How:** An outer block of (items × 70vh) with a sticky inner frame (top: 0, height: 100svh). Motion useScroll on the outer block gives progress; the active index = floor(progress × items). Items crossfade with a short vertical travel (≤ 24px); the counter (03 / 05) in the utility face. Each item is a real element in the DOM, in order, for screen readers.
- **Mobile:** No pinning: the items stack, each at least one screen tall, with the counter beside each.
- **Reduced motion:** Plain stacked list.

## Your Kit — ready pieces

The owner picked these components. Their code is already in the project at `src/components/pieces/` — import and use it; do not rebuild or replace them, and do not add other animation libraries for the same job. They read colours and fonts from the recipe tokens (`--color-*`, `--font-*`) and already handle reduced motion. Adjust sizes, spacing and copy to the recipe — never their core behaviour.

### Cut-out headline — Every page — the h1 and each section heading
Words slide up out of a hard mask — sharper than a fade.
- **Code:** `src/components/pieces/CutReveal.tsx` → `import { CutReveal } from '@/components/pieces/CutReveal'`
- **Use:** `<CutReveal as="h1" className="font-(family-name:--font-display) text-8xl">Polo in Sheki</CutReveal>`
- Best with heavy, condensed or wide display faces.
- h1 plus at most two section headlines.

### Rolling links — Every page — menu, footer and text links
On hover, each letter of a link rolls over to a fresh copy.
- **Code:** `src/components/pieces/TextRoll.tsx` → `import { TextRoll } from '@/components/pieces/TextRoll'`
- **Use:** `<a href="/work"><TextRoll>Work</TextRoll></a>`
- Navigation and footer links only.
- The link keeps its normal focus outline.

### Magnetic button — Every page — the main action
The main button leans toward the cursor when it comes near.
- **Code:** `src/components/pieces/Magnetic.tsx` → `import { Magnetic } from '@/components/pieces/Magnetic'`
- **Use:** `<Magnetic><a href="/contact" className="btn">Start a project</a></Magnetic>`
- One or two primary actions per page — never every button.

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
