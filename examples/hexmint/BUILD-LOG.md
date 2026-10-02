# Build log — Hexmint

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).
Example #3 of docs/plan-for-fit.md §5: futuristic / digital-futurism, 3D first screen, immersive, SaaS.

## 1. Recipe (2026-10-01)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `setBehaviour`, `toggleSitePiece`), the same calls the
kit UI makes. Approved by the user.
- Kind of site: SaaS · name "Hexmint" · about "Invoices, expenses and quarterly books for small studios — set up in five minutes, closed in one click." · goal: sign up
- Look: Digital Futurism, colours Night Ink (the look's own), lettering Funnel (the row's fresh pick, §5) · first screen: 3D / WebGL scene · movement: Immersive
- Big idea: A live console (the kit's recommendation) → Labels that decode (Home — Features), A live status line (Navigation)
- Menu: Floating pill · footer: Signature columns · shape: Round
- Behaviour: headlines — Words that arrive; links — Scrambled labels; main button — Magnetic button; between pages — Curtain between pages; whole site — Smooth scroll
- Pages (the SaaS defaults): Home (hero → clients → feature rows → feature grid → integrations → testimonials → closing CTA),
  Features, Pricing, FAQ
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app` project (TypeScript, Tailwind, App Router, src/). `next.config.ts` got the `turbopack.root`
pin before the first install; `.gitignore` keeps the recipe's `build/` folder. Then `npm install` and, as the package
README says, `npm i motion lenis`.

## 3. Media

None (docs/plan-for-fit.md §7): the first screen is a 3D scene built in code, its poster is rendered from it, and the logo
is made during the build.

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-01)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context), as for Brasshand. It was given
only: "work inside `examples/hexmint/` as the project root; read its CLAUDE.md and AGENTS.md first; ports 3000, 3002 and
3004 are taken, use port 3007 for its dev server" — then the prompt below, word for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

I have no photos or 3D files. Build the 3D first screen in code — a simple scene made from shapes, no model file — and render its poster from the scene itself.

I don't have a logo yet — make a simple one for Hexmint.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

The subagent stopped mid-build on an API session limit (while writing the 3D scene). On the user's "continue" (2026-10-02)
the same subagent was resumed with the message below, word for word.

```
You were stopped by an API limit in the middle of the build. Continue from where you left off and finish the whole site as asked.
```

Result: the whole site built — four pages and a 404, a 3D field of hexagonal tiles built from shapes (one lemon tile as
the signal), its poster and four stills rendered from the scene (`npm run stills`), a live status line counting down to
the quarter's close, decoding // labels, a pinned "one-click close" on Features. `next build` with `output: 'export'`
passes. It flagged rule conflicts in the package (a third font named for numbers; an em-dash label example) and generic
tells in the ready sections ("→", middle dots, 01/02 markers) — all fixed in OpusKit's own sources afterwards.

Reviewed by Claude on the static export at 1440 px and 390 px (Playwright, WebGL via SwiftShader): the canvas renders,
no horizontal overflow, no console errors, no failed requests. No fix round needed. Registered with a live export at
`/live/hexmint/index.html` (menu → Pricing click-through checked on desktop and phone).

### Prompt 2 (2026-10-02) — fix round 1

Reported by the user from their own screen (the 3D tiles looked doubled). Run by a fresh Claude Code subagent started
from the OpusKit session (no OpusKit context), given only "work inside `examples/hexmint/` as the project root; read its
CLAUDE.md and AGENTS.md first" — then the prompt below, word for word.

```
On the home page the 3D hexagons look doubled — two copies slightly out of line, most visible on the yellow tile. The
still poster stays visible behind the live 3D scene, and the live scene is framed a little differently (screen size,
pointer, scroll), so the two never line up. Once the live scene has faded in, the poster should be gone; keep the poster
only while the scene is loading, and as the fallback when WebGL isn't available or fails. Check it at a few window sizes,
then run the production build again.
```

Result: the poster is removed once the live scene has faded in, and comes back if the WebGL context is lost; it stays
when there is no WebGL 2, with reduced motion and on weak devices; a scene error falls back to the poster instead of
breaking the page (`Hero3D.tsx` only). `next build` (export) passes. Live export regenerated; checked by Claude at
1440 px and 390 px in Chrome with WebGL: one set of tiles, no poster after the fade, menu → Pricing works, no failed
requests or page errors.
