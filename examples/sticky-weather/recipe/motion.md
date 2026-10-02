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

### A playful way in — Home — Hero — Sticker orbit
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

### Words that arrive — Every page — the h1 and each section heading
Headlines reveal word by word as they come into view.
- **Code:** `src/components/pieces/TextEffect.tsx` → `import { TextEffect } from '@/components/pieces/TextEffect'`
- **Use:** `<TextEffect as="h1" preset="slide" className="font-(family-name:--font-display)">Your headline here</TextEffect>`
- Use on the h1 and at most two section headlines — not every heading.
- Choose one preset for the whole site: slide (default), blur or fade.

### Wavy underline — Every page — menu, footer and text links
A link’s underline draws in as a wave on hover.
- **Code:** `src/components/pieces/WavyLink.tsx` → `import { WavyLink } from '@/components/pieces/WavyLink'`
- **Use:** `<WavyLink link={Link} href="/faq">FAQ</WavyLink>`
- Footer and inline links; the wave uses the second chapter colour (or the accent).

### Magnetic button — Every page — the main action
The main button leans toward the cursor when it comes near.
- **Code:** `src/components/pieces/Magnetic.tsx` → `import { Magnetic } from '@/components/pieces/Magnetic'`
- **Use:** `<Magnetic><a href="/contact" className="btn">Start a project</a></Magnetic>`
- One or two primary actions per page — never every button.

### Blob page transition — Whole site — every internal link; mount once in app/layout.tsx
A blob of colour sweeps over the page between pages.
- **Code:** `src/components/pieces/BlobTransition.tsx` → `import { BlobTransition } from '@/components/pieces/BlobTransition'`
- **Use:** `// app/layout.tsx, inside <body>:
<BlobTransition />`
- Mount once in the root layout; it handles every internal link.
- Under 600 ms each way — never make people wait.

### Designed preloader — Whole site — mount once in app/layout.tsx
The first visit opens on your name counting in while the page loads, then it lifts away.
- **Code:** `src/components/pieces/Preloader.tsx` → `import { Preloader } from '@/components/pieces/Preloader'`
- **Use:** `// app/layout.tsx, inside <body>:
<Preloader brand="Your name" />`
- Once per visit (session), never on every page.
- It follows real loading (fonts and the first-screen media) and never holds people past 2.5 s.

### Brand cursor — Whole site — mount once in app/layout.tsx
A hand-drawn arrow (or your own) replaces the system cursor.
- **Code:** `src/components/pieces/BrandCursor.tsx` → `import { BrandCursor } from '@/components/pieces/BrandCursor'`
- **Use:** `// app/layout.tsx:
<BrandCursor />  {/* or <BrandCursor src="/media/cursor.svg" /> */}`
- Links and buttons keep the pointer cursor.

### Smooth scroll — Whole site — mount once in app/layout.tsx
Scrolling glides instead of stepping, so every scroll effect moves as one.
- **Code:** `src/components/pieces/SmoothScroll.tsx` → `import { SmoothScroll } from '@/components/pieces/SmoothScroll'`
- **Use:** `// app/layout.tsx, inside <body>:
<SmoothScroll />`
- Mouse and trackpad only — touch keeps the phone’s own scroll.
- Never hijack the scroll: the page moves exactly as far as the visitor scrolls.

Licences: adapted from MIT-licensed libraries — see `THIRD-PARTY-NOTICES.md`.
