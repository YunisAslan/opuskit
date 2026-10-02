# Build log — Halvik

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).
Example #5 of docs/plan-for-fit.md §5: minimal / bento-product, product-stage first screen, calm movement, product.

## 1. Recipe (2026-10-02)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `setBehaviour`, `toggleSitePiece`), the same calls the
kit UI makes. Approved by the user.
- Kind of site: Product · name "Halvik" · about "Halvik 65 — a compact mechanical keyboard in a powder-coated aluminium case, with hot-swap switches and a matching dial pad." · goal: buy
  (first drafted as headphones; changed to the keyboard with the user's OK when no brand-free headphone series was found)
- Look: Bento Product, with the row's fresh picks (§5): colours Console Lilac, lettering Wide Spec (Hubot Sans / IBM Plex Sans) · first screen: Product stage · movement: Subtle
- Big idea: One thing guides the scroll (picked over the kit's recommendation, A live console, which Hexmint already uses) →
  One shape travels down the page (Home — Product stage), A footer worth reaching (Footer)
- Menu: Floating pill · footer: Signature columns · shape: Round (all the look's own)
- Behaviour: headlines — Words that arrive; links — Filling underline; main button — Magnetic button; between pages — none; whole site — Smooth scroll
- Pages (the product defaults): Home (hero → product highlight → feature rows → press → testimonials → pricing → trust → closing CTA),
  Features (feature grid → how it works → product highlight → closing CTA), Contact (closing CTA → FAQ)
- Not used: "logo as material" (plan-vibe D1) does not exist yet.
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app` project (TypeScript, Tailwind, App Router, src/, `--skip-install`). `next.config.ts` got the
`turbopack.root` pin before the first install; `.gitignore` keeps the recipe's `build/` folder. Then `npm install` and, as
the package README says, `npm i motion lenis`.

## 3. Media

6 photos from Unsplash, picked by Claude with the Unsplash connector (sources, the brand check and the one retouch in
`media-src/SOURCES.md`). Originals in `media-src/`; resized to at most 2400 px on the long side (JPEG q82) into
`public/media/`. In four of them the small fox mark on the Esc keycap was removed before resizing.

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-02)

Run, at the user's go-ahead ("davam et"), by a fresh Claude Code subagent started from the OpusKit session (no OpusKit
context). It was given only: "work inside `examples/halvik/` as the project root; read its CLAUDE.md and AGENTS.md first;
port 3000 is taken, use port 3011 for its dev server" — then the prompt below, word for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are already in public/media/ (where each one comes from is in media-src/SOURCES.md):
- hero.jpg — the Halvik 65 from the side: cream keys over the green aluminium case, on its cork base. This is the first screen.
- product.jpg — the same keyboard from above at three-quarters, for the Product Highlight on Home.
- product-2.jpg — a corner of it tilted up close, for the Product Highlight on the Features page.
- row-1.jpg — the case's curved side, for the typing-angle feature.
- row-2.jpg — the Halvik Dial, our small pad with cream keys and three knobs, sold with the keyboard or on its own.
- row-3.jpg — one bare switch between the keycaps, for hot-swap switches.
The photos are shot on a desk, not on a seamless background — use them as they are, no cut-outs.

I don't have a logo yet — make a simple one for Halvik.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

The subagent stopped early (one of its file reads was interrupted, and it took that as a stop request) after setting up
shadcn. It was resumed (2026-10-02) under the user's same go-ahead, with the message below, word for word.

```
Nobody asked you to stop — one tool call was interrupted, that's all. Continue from where you left off and finish the whole site as asked.
```

The OpusKit session itself then ended before the resumed subagent wrote anything. On the user's "continue" (2026-10-02)
the same subagent was resumed again, with the message below, word for word.

```
The session was restarted, so your last run didn't finish. Continue from where you left off and finish the whole site as asked.
```

Result: the whole site built — Home, Features, Contact and a 404, from the ready sections and kit pieces. Its own
additions: a keycap logo (`Logo.tsx`, `icon.svg`), the travelling mark (`Motif.tsx`: it leaves the first screen, waits in
the right margin, lands beside each chapter title — biggest at "Fern green" — and comes to rest lilac beside "Halvik" in
the black footer; a still mark per chapter on phones, first chapter only with reduced motion), a buy panel (no real
checkout — the site is static), a Contact form that opens the visitor's mail app, .webp copies of each photo (800, 1600,
full). It invented prices ($219, $159 barebones, $69 Dial), specs, press outlets and quotes. `next build` with
`output: 'export'` passes, every route static. It reported: the "Words that arrive" headline effect holds back Contact's
first paint on slow phones (6.8 s on slow 4G) — kept, as the kit places it site-wide; the ready footer's hover underline
was black on the black band (it switched it to the text colour); live exports must also rewrite `, /media/` inside
`srcset`, not only `"/media/`.

Reviewed by Claude on the static export (served from `out/`) at 1440 px and 390 px (Playwright): no horizontal overflow,
no console errors, no failed requests (only aborted route prefetches); menu → Features click-through works; the mark
lands beside "Fern green"; every photo loads. Seen: the first-screen photo is soft (the source is shot wide open, so the
keys read out of focus at full width and in the phone crop); the phone's pinned buy bar also shows on Contact, over the form.
