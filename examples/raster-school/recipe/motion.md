## Motion System — Still

No ambient motion. Only state feedback (hover, focus, press) using short CSS transitions.

**Rule:** animation for demonstration, not decoration.

**Libraries:** CSS (transitions, scroll-driven animations)

### State feedback
- **Purpose:** Confirm interaction (hover, focus, press) so controls feel responsive.
- **Trigger:** Pointer hover, keyboard focus, active press
- **Behavior:** Color/underline/opacity change on hover — only where a pointer can hover; every pressable scales to 0.97 while pressed; no layout shift.
- **Duration:** press 140ms (--duration-press), hover 150ms
- **Easing:** var(--ease-out) for the press, ease for colour
- **Implementation:** CSS transitions that name each property they move (never all); `:active { transform: scale(0.97) }` on every button, link card and tile; hover styles under `@media (hover: hover) and (pointer: fine)` — Tailwind v4's hover: already is.
- **Performance:** Transition only color, opacity, transform.
- **Reduced motion:** Keep — these are not motion-heavy; remove transform component.

## Signature Moments

None were picked: the first screen (Typographic statement) carry Home. Every other page gets one moment you design yourself — see Room to invent: one per page, never more.

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
- **The phone menu** — its icon turns into a close (two lines rotate, 200ms, var(--ease-in-out)); the menu itself slides as a sheet (--duration-sheet, var(--ease-drawer)) and leaves the way it came.
- **Copying an email or address** — a click copies it; the icon becomes a tick for 1.5s.
- **Numbers that change** (prices, counts, times) — tabular figures; they change in place, never re-layout.

### Parallax — none
- None — this site is still. Depth comes from layering and light in the pictures themselves.

