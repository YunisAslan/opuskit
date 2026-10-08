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

### Spring settle
- **Purpose:** Warm and unhurried — like something placed by hand.
- **Trigger:** Element enters viewport (IntersectionObserver, threshold 0.2), once
- **Behavior:** elements rise 20px with a soft spring (stiffness 120, damping 20); images fade in under them.
- **Duration:** spring
- **Easing:** spring
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
- **Purpose:** Connect pages so navigation feels continuous (e.g. a card’s picture grows into the page it opens).
- **Trigger:** Route change
- **Behavior:** Shared element morphs between pages; others crossfade.
- **Duration:** 400–600ms
- **Easing:** cubic-bezier(0.65, 0, 0.35, 1)
- **Implementation:** View Transitions API (document.startViewTransition / Next.js experimental viewTransition) with CSS; Motion layout animations as fallback.
- **Performance:** Keep transitions short; never block navigation on animation.
- **Reduced motion:** Instant navigation.

## Signature Moments

None were picked: the first screen (Full-bleed photo with depth) and the effects the owner picked (Your Kit) carry Home. Every other page gets one moment you design yourself — see Room to invent: one per page, never more.

## Your Kit — ready pieces

The owner picked these components. Their code is already in the project at `src/components/pieces/` — it does the hard part (the animation, shader or interaction, and its reduced-motion version), so build on it rather than from scratch, and do not add other animation libraries for the same job. It reads colours and fonts from the recipe tokens (`--color-*`, `--font-*`). It is a reference, not a sealed part: keep what the owner picked it for — its behaviour — and fit everything else to the site (size, place, spacing, the type around it), editing its code wherever its defaults disagree.

### Prints on a desk — Menu → Gallery
Photos scattered like prints; visitors pick one up and move it.
- **Code:** `src/components/pieces/DragPhotos.tsx` → `import { DragPhotos } from '@/components/pieces/DragPhotos'`
- **Use:** `<DragPhotos photos={[{ src: "/media/a.jpg", alt: "…", x: "10%", y: "20%", w: "22%", rotate: -4 }]} className="h-[80svh]" />`
- 6–10 photos, small rotations (±6°).
- A plain grid of the same photos stays in the page for keyboard users.

### Words that arrive — Every page — the h1, plus at most two section headings per page (not every heading)
Headlines reveal word by word as they come into view.
- **Code:** `src/components/pieces/TextEffect.tsx` → `import { TextEffect } from '@/components/pieces/TextEffect'`
- **Use:** `<TextEffect as="h1" preset="slide" className="font-(family-name:--font-display)">Your headline here</TextEffect>`
- Use on the h1 and at most two section headlines — not every heading.
- Choose one preset for the whole site: slide (default), blur or fade.

Licences: adapted from MIT-licensed libraries — see `THIRD-PARTY-NOTICES.md`.
