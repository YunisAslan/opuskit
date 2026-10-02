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

### One shape travels down the page — Home — Hero — Product stage
- **What visitors experience:** One element from the first screen — the product, the logo mark, a drawn line — leaves the hero as the visitor scrolls and travels with them, turning up again at each chapter, so the whole page feels guided by one thing.
- **How:** One fixed-position layer (pointer-events: none, aria-hidden) holding the motif (SVG or transparent image). Motion useScroll on the page drives x, y, rotate and scale through 3–5 keyframes, one per chapter, read from the chapter sections’ offsets on resize. It sits beside content, never over text; at the footer it settles into its final place.
- **Mobile:** The motif appears once per chapter as a static image at the chapter start.
- **Reduced motion:** The motif sits still in the hero only.

### A footer worth reaching — Footer
- **What visitors experience:** The end of every page is a small event: the brand name assembles letter by letter across the full width as the footer arrives, or the motif comes to rest in it — the last thing visitors see is the thing they remember.
- **How:** The footer keeps its chosen style and adds one closing moment: the brand name in the display face sized to the full container width (one line); its letters rise 40px and fade in with a 40ms stagger as the footer enters (Motion whileInView, once). If the site has a travelling motif, it lands here instead.
- **Mobile:** Same wordmark across the width; letters rise together.
- **Reduced motion:** The wordmark shown in place.

## Your Kit — ready pieces

The owner picked these components. Their code is already in the project at `src/components/pieces/` — import and use it; do not rebuild or replace them, and do not add other animation libraries for the same job. They read colours and fonts from the recipe tokens (`--color-*`, `--font-*`) and already handle reduced motion. Adjust sizes, spacing and copy to the recipe — never their core behaviour.

### Words that arrive — Every page — the h1 and each section heading
Headlines reveal word by word as they come into view.
- **Code:** `src/components/pieces/TextEffect.tsx` → `import { TextEffect } from '@/components/pieces/TextEffect'`
- **Use:** `<TextEffect as="h1" preset="slide" className="font-(family-name:--font-display)">Your headline here</TextEffect>`
- Use on the h1 and at most two section headlines — not every heading.
- Choose one preset for the whole site: slide (default), blur or fade.

### Filling underline — Every page — menu, footer and text links
A link’s underline grows into a full block on hover, flipping its colour.
- **Code:** `src/components/pieces/UnderlineFill.tsx` → `import { UnderlineFill } from '@/components/pieces/UnderlineFill'`
- **Use:** `<UnderlineFill href="/contact">Start a conversation</UnderlineFill>`
- Text links only — never on buttons.

### Magnetic button — Every page — the main action
The main button leans toward the cursor when it comes near.
- **Code:** `src/components/pieces/Magnetic.tsx` → `import { Magnetic } from '@/components/pieces/Magnetic'`
- **Use:** `<Magnetic><a href="/contact" className="btn">Start a project</a></Magnetic>`
- One or two primary actions per page — never every button.

### Smooth scroll — Whole site — mount once in app/layout.tsx
Scrolling glides instead of stepping, so every scroll effect moves as one.
- **Code:** `src/components/pieces/SmoothScroll.tsx` → `import { SmoothScroll } from '@/components/pieces/SmoothScroll'`
- **Use:** `// app/layout.tsx, inside <body>:
<SmoothScroll />`
- Mouse and trackpad only — touch keeps the phone’s own scroll.
- Never hijack the scroll: the page moves exactly as far as the visitor scrolls.

Licences: adapted from MIT-licensed libraries — see `THIRD-PARTY-NOTICES.md`.
