## Motion System — Dynamic

Scroll-linked parallax, line-by-line type reveals, media transitions between sections.

**Rule:** animation for demonstration, not decoration.

**Libraries:** CSS (transitions, scroll-driven animations), Motion

### State feedback
- **Purpose:** Confirm interaction (hover, focus, press) so controls feel responsive.
- **Trigger:** Pointer hover, keyboard focus, active press
- **Behavior:** Color/underline/opacity change on hover — only where a pointer can hover; every pressable scales to 0.97 while pressed; no layout shift.
- **Duration:** press 140ms (--duration-press), hover 150ms
- **Easing:** var(--ease-out) for the press, ease for colour
- **Implementation:** CSS transitions that name each property they move (never all); `:active { transform: scale(0.97) }` on every button, link card and tile; hover styles under `@media (hover: hover) and (pointer: fine)` — Tailwind v4's hover: already is.
- **Performance:** Transition only color, opacity, transform.
- **Reduced motion:** Keep — these are not motion-heavy; remove transform component.

### Hard cut
- **Purpose:** Fast and confident — content is simply there, like a poster being slapped up.
- **Trigger:** Element enters viewport (IntersectionObserver, threshold 0.2), once
- **Behavior:** elements snap in: opacity 0→1 in 120ms with a 24px slide over 250ms; children 40ms apart; no blur, no bounce.
- **Duration:** 250ms
- **Easing:** cubic-bezier(0.2, 0, 0, 1)
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
- **Behavior:** The picture travels 6–10% of its frame’s height across its pass through the screen, scaled 1.1 inside an overflow-hidden frame so no edge shows; up to two bands a page — a spice, not the dish.
- **Duration:** Scroll-linked
- **Easing:** linear (scrub)
- **Implementation:** CSS scroll-driven animations (animation-timeline: view()) with a Motion useScroll + useTransform fallback for browsers without it.
- **Performance:** Only transform; set will-change on the moving layer only while in view; never background-attachment: fixed (it breaks on phones). Phones: half the travel.
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

None were picked: the first screen (Product stage) and the effects the owner picked (Your Kit) carry Home. Every other page gets one moment you design yourself — see Room to invent: one per page, never more.

## Seasoning — smooth loaders, micro-interactions, parallax

Salt, not sauce. These three are on every page, in a small dose: nobody should be able to name them, and everyone would feel them missing. They never take the place of the page's remembered moment, and they never sit on words being read, on a form being filled or on anything the visitor compares. The curves and times are in tokens.css; how each one is built is in Interaction craft.

### Smooth loaders
- **Pictures** — the space is held by the asset’s own ratio, filled with --color-surface; each picture fades in over 300–400ms (opacity, var(--ease-out)) once it has loaded (next/image `onLoad`, or `placeholder="blur"` for imported files). Never pops in, never a spinner over a photo, nothing jumps.
- **Pages** — `app/loading.tsx` in the site's own tones: a quiet skeleton in the shapes of what is coming (a heading bar, picture blocks), its shimmer slow (linear 1.6s) and still under reduced motion. Moving between pages cross-fades in 150–200ms; nothing slides.
- **Waiting on an action** — see Sending a form: the control that was used shows the wait, in place; the page around it never blocks.
- **Fonts** — through next/font (it sizes the fallback to the real face), so nothing reflows when the face arrives.
- **The first visit** — no full-screen loader: the first screen is complete and readable before anything animates.

### Micro-interactions — this site's whole set
Use these few, the same way on every page; nothing else gets its own trick.
- **Press and hover** — every button, link card and tile: hard and instant — a pressed button drops into its own shadow (2px, no easing); colours swap at once. A press always answers — scale 0.97 at --duration-press, or this look’s own press where one is named here; hover waits for a pointer that can hover.
- **Sending a form** — the button keeps its width and label, shows a small spinner inside it only after 300ms (and keeps it at least 500ms, so it never flickers), then ends in place: a tick that draws in (200ms) and one line saying what happens next. Errors appear under their field, in --color-error.
- **Adding to the cart** — the cart’s count bumps once (scale 1 → 1.15 → 1, 200ms, var(--ease-out)) and the button reads “Added” for 1.5s; nothing flies across the page.
- **The phone menu** — its icon turns into a close (two lines rotate, 200ms, var(--ease-in-out)); the menu itself slides as a sheet (--duration-sheet, var(--ease-drawer)) and leaves the way it came.
- **Numbers that change** (prices, counts, times) — they change in place, never re-layout: tabular figures where the face’s own look like it, else its normal figures in a box of fixed width.

### Parallax — the dose
- Up to two picture bands per page drift, 6–10% of their frame’s height (a first screen with depth counts as Home’s first).
- Only a picture moves, never text, a form or a list: it sits in an overflow-hidden frame, scaled 1.1 so no edge ever shows, and travels linearly with the scroll — CSS scroll-driven animation (`animation-timeline: view()`) with Motion `useScroll` + `useTransform` on `transform` as the fallback.
- Never `background-attachment: fixed` (it breaks on phones), never scroll-jacking, never two layers fighting in one view.
- Phones: half the travel, or none where the crop is tight. Reduced motion: none — the picture stands still.


## Your Kit — ready pieces

The owner picked these components. Their code is already in the project at `src/components/pieces/` — it does the hard part (the animation, shader or interaction, and its reduced-motion version), so build on it rather than from scratch, and do not add other animation libraries for the same job. It reads colours and fonts from the recipe tokens (`--color-*`, `--font-*`). It is a reference, not a sealed part: keep what the owner picked it for — its behaviour — and fit everything else to the site (size, place, spacing, the type around it), editing its code wherever its defaults disagree.

### Prints on a desk — Workshops → Gallery
Photos scattered like prints; visitors pick one up and move it.
- **Code:** `src/components/pieces/DragPhotos.tsx` → `import { DragPhotos } from '@/components/pieces/DragPhotos'`
- **Use:** `<DragPhotos photos={[{ src: "/media/a.jpg", alt: "…", x: "10%", y: "20%", w: "22%", rotate: -4 }]} className="h-[80svh]" />`
- 6–10 photos, small rotations (±6°).
- A plain grid of the same photos stays in the page for keyboard users.

### Wavy underline — Every page — menu, footer and text links
A link’s underline draws in as a wave on hover.
- **Code:** `src/components/pieces/DrawnLink.tsx` → `import { DrawnLink } from '@/components/pieces/DrawnLink'`
- **Use:** `<DrawnLink link={Link} stroke="wave" href="/faq">FAQ</DrawnLink>`
- Footer and inline links; the wave uses the second chapter colour (or the accent).

Licences: adapted from MIT-licensed libraries — see `THIRD-PARTY-NOTICES.md`.
