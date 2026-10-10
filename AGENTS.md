# OpusKit

Next.js 16 (App Router) + TypeScript + Tailwind v4. Version-matched Next.js docs live in `node_modules/next/dist/docs/` — read them instead of relying on memory.

**Start here: `docs/HANDOFF.md`** — where the work stands, what's next, and the user's working agreements. A scheduled, unattended session (the night run that builds the next example sites) follows `docs/NIGHT-RUN.md`.

Current: `docs/plan-library.md` — OpusKit Library, the new front door (Discover → Collect → Brand → Compose → Recipe → Build). Examples: `docs/plan-examples.md` — how each is made and what is open; read it before touching examples and keep its Progress table current. Research: `docs/research/`.

- Domain types: `src/types/domain.ts`. Knowledge base (curated ingredients): `src/data/`.
- Recipe engine (deterministic composition): `src/features/recipes/engine.ts`.
- Build Package adapters: `src/features/build-packages/`. Every recipe carries a copy deck (what each part says, from the
  owner's words), a shot list (what each media part shows) and rules fitted to the owner's picks (decision 26). The shot
  list is the asset layer: `src/config/assets.ts`, the manifest and the checklist's photo rows are written from it
  (`shotAssets`, `fitSets`), and every frame number in the recipe text is the token tokens.css ships (decision 30).
  Every package keeps the owner's picks (Room to invent → Locked) and asks the builder to design the rest and one
  remembered moment per page (decision 32); never write "do not invent / do not add" into a package. Each look's
  knowledge — what its best sites are known for — is `src/data/look-knowledge.ts` (moves, craft, sparks, traps, seen);
  add to it what a new build or study teaches, with its source in `seen`.
  How every control, state and movement feels — press, hover, open/close, curves and times, reduced motion, phones,
  worst-case content — is `build-packages/craft.ts` (adapted from Emil Kowalski's skills, MIT; decision 50): its tokens
  ship in tokens.css, its guide as the `interaction-craft` skill (a file for Lovable, v0, own code), its checks in verification. Claude Code and Cursor packages
  also run impeccable's detector (Apache-2.0, run as an outside tool, pinned) on every page, sparing the owner's picks
  (`DETECTOR_QA`, `detectorConfig` in `build-packages/shared.ts`; decision 56). Loaders,
  micro-interactions and parallax are seasoning — salt, not sauce — dosed per recipe (`seasoning`, decision 51).
- OpusKit's own controls (select, checkbox, dialog, popover, accordion, inputs, toasts) are shadcn/ui in `src/components/ui/`, themed to OpusKit's palette in `globals.css`. Add new ones with `npx shadcn@latest add <name>`, then rewrite `bg-muted` → `bg-secondary` in the new file (`--color-muted` is OpusKit's muted *text* colour). Never use a native `<select>`, `<dialog>` or `<details>` in app UI.
- The flow is the way to make a site (`docs/plan-library.md`, decisions 35–39): `/library`, browsing with no steps (the +
  on a site opens what it has to take in four groups — Style (whole look, colours, lettering), Sections, Moments,
  Touches. Each design shows once in the whole Library, on the site that shows it best, under a name that says which
  one it is: the catalog `src/data/takeables.ts`, decision 58; a new example's or a new site's design fails check.ts
  until it has its name, category and `bestOn`; the Library's tabs — Sites, Sections, Moments, Touches — show the
  catalog itself); Build my site starts three steps: `/studio/you` (name, sentence, kind — only the owner's) →
  `/studio/direction` → recipe. Direction (decision 39): Make it yours on top (every look, colour and lettering,
  `studio/LookPicker.tsx`, with Your brand beside it — name, sentence, button, palette, exact; decisions 40, 43), the start is the first mix of `directionsFor` in
  `features/library/inspire.ts` (what was taken by name is in it, none a copy; the packs are not shown — decision 42);
  pages are not shown. There is no Pages screen: pages come from the kind of
  site and the sentence (`pagesFromWords` — "to order" drops the cart, "workshops" adds a page); anything more is asked
  of the AI tool after the build. A recipe opened from an example or a saved one opens in Direction too, kept as it
  was built (decision 44; there is no Brand screen). The
  Collection is a cart in the site header (`CollectionSheet`, its Build my site starts building); the steps share one
  bar (`FlowBar`) — both in `src/app/library/parts.tsx`. Logic `src/features/library/collection.ts`, storage
  `src/lib/collection.ts`; plans made there carry `via: 'studio'` and get no big idea (decision 21).
- The kit was retired 2026-10-07 (with accounts, pricing/paywall, explore, resources and `/recipe/{slug}`). Every recipe
  opens in the studio: `/studio/open?from=seed:{slug}|gen:{id}|example:{slug}` → Direction (`openInStudio` in
  `src/lib/collection.ts`, `specToPlan`; an example's recipe is rebuilt from its `choices` by `specFromChoices`); `/kit`
  redirects there (`next.config.ts`). The plan model the studio edits is `StudioPlan` in `src/features/studio/plan.ts`
  (pure, tested in check.ts; storage `src/lib/plan.ts`); what the studio doesn't edit rides along in `plan.from`, and a plan
  opened from a saved recipe updates that recipe. The recipe page (`/result/[id]`) is always unlocked; it shows the owner's
  name, Your brand and What you took (`spec.taken`, decision 45).
- OpusKit's own look — read `docs/design.md` before changing the landing, the chrome or any screen's look: tokens
  (stone, ink, hairline, one orange; dark mode), Archivo / Geist / Geist Mono, the ruled frame and its crosses, nav and
  buttons, hover language, the landing's sections, what the user approved and rejected.
- Ready sections: every content section (all but navbar, hero, footer) is a component in `src/sections/`, listed in
  `src/data/blocks.ts`, shipped to `src/components/sections/` for the sections a recipe uses. OpusKit-written, tokens only
  (`--color-*`, `--radius-*`, `type-display|heading|body|utility` from `src/lib/type-tokens.ts`), content through props,
  no import beyond `react`. Direction and the recipe page render them for real with sample content (`SectionPreview`), dressed as one of six
  worlds (studio, food, shop, product, software, event — `worldFor(purpose)`) so a café sees cups and a shop sees products.
  Many come in several designs (a `variant` prop; `src/data/section-variants.ts` — the engine picks one per look family,
  or a design taken from a site in the Library; check.ts asserts each design exists in the code). Two section ids
  may share one component (Steps, NameWall, Statement) with different default designs.
  In a Build Package sections and pieces are references, not parts to paste: the builder keeps their design and
  behaviour and fits them into one site (`ONE_SYSTEM` in `build-packages/shared.ts`, decision 22).
  A new section also needs: its `SectionId`, a `sections` entry in patterns.ts, a `blocks.ts` entry, a sample per world,
  a plain look + best-when in `section-guide.ts`, a job group in `sectionGroups` — then `npm run pieces`.
- Ready pieces (backgrounds + components) ship as code in every Build Package's `src/components/pieces/`.
  Sources live in `src/pieces/` (type-checked with OpusKit), metadata in `src/data/pieces.ts`; run `npm run pieces` after editing a piece or a section (it bundles both).
  Adapt only from MIT libraries (Motion Primitives, Magic UI, Cult UI, Animata, Componentry, Fancy Components) or depend on
  Apache-2.0 ones (Paper Shaders) — never React Bits, Aceternity or Hover.dev (their terms forbid redistributing
  components), and nothing that needs GSAP (its free licence excludes Webflow-competing tools). Tokens only
  (`--color-*`, `--font-*`), a reduced-motion version, no import beyond `react`/`motion`/`@paper-design/shaders-react`
  (plus `lenis`, MIT, in a piece that lists it in `deps` — SmoothScroll).
- `npm run check` composes every seed recipe and every adapter and asserts completeness — and distinctiveness: two palettes ≥ 0.06 ΔE_OK apart in ground (or, if closer, clearly different accents), no greyed mid-tone ground, neutral ink, no cream-band or clay-accent clusters, no AI-default fonts, each family in ≤ 2 pairings, no two seeds sharing a palette or pairing. Add to the library only what passes.

## Example projects

`examples/{slug}/` holds finished, built websites generated from a Recipe's Build Package, to show
what a Recipe actually produces. Each is a complete, independently runnable Next.js project.

Committed: `src/`, `public/` (its real, optimised media), `package.json` + `package-lock.json`,
`next.config.ts`, `tsconfig.json`, config files, and whatever recipe documentation it shipped with —
either a single `start.md`/`RECIPE.md`, or (from a Claude Code Build Package that was then actually
built) the full `CLAUDE.md` + `.claude/skills/` + `recipe/` + `assets/` + `build/` + `OPUSKIT-README.md`
set. Keep whichever it has, as-is — it's real, small, and documents exactly what produced the site.
Not committed: `node_modules/`, `.next/`, `tsconfig.tsbuildinfo`, `.DS_Store` — regenerate the first
two with `npm install` / `npm run build` (the root `.gitignore`'s bare `node_modules`/`.next` patterns
already cover any depth, including here). Any `media-src/`-style pre-processing source (raw footage
before ffmpeg, etc.) is reference-only — keep it out unless it's small and its license is clear.
`media-src/recording/` holds the user's full screen recordings of the live site, kept on purpose: the clips
(`clip`, `sectionClips`, `pieceClips`, `signatureClips`) are cut from them with ffmpeg, and can be re-cut later.

Before the very first `npm install`/build ever runs inside a freshly dropped-in example, check its
`next.config.ts` already has the `turbopack.root` pin from the next section — a fresh Claude-Code-built
project won't have it yet, and building it even once without the pin risks OpusKit's own `node_modules`.

### Showing one on the site

After adding or changing an example, run `npm run examples`. It writes:
- `src/data/example-specs.generated.json` — the exact recipe each example was built from, which "Make it yours" opens in the studio.
  Read from the example's `opuskit.json` (every Build Package ships one — keep it, it's committed with the example), or,
  for older examples without it, rebuilt from its `choices` plus its own `recipe/layout.md` (pages, sections, first
  screen, layout, shape, menu). `npm run check` composes each spec and asserts it matches that layout.md.
- `src/data/example-media.generated.json` — its real photos and its film (`heroVideo.mp4`), offered as samples on the
  recipe page's Your files tab (`components/MediaSlots.tsx`; clips, posters and PNGs left out).
- `public/downloads/{slug}.zip` ("Copy the code") — the real code with same-size placeholder photos, videos left out and
  listed in `MEDIA.md`, no env files.
Record `choices` with the exact option names.

Each example is registered in `src/data/examples.ts` (title/summary — copy from its own real
`<title>`/meta description, not the abstract recipe doc, since a build often renames the brand).
Its clips: `clip` (10–15 s, first screen + scroll) and `sectionClips` (3–5 s per section, the section standing still and framed
on it — never the page scrolling past; `examples/{slug}/public/media/clips/{sectionId}.mp4`)
feed "a site like this" (`src/features/studio/closest.ts`); an old example carries `legacy: true` and is never offered there.
Its `fullClip` (the whole landing page, top to footer) plays on its page and in "see it larger"; its `sectionStills`
(`public/media/stills/{sectionId}.jpg`, the menu centred, the footer at the page's end) show a part where there is no
clip — so a Library card is the site itself, never sample content. Clips are recorded with Cap (60 fps, the Mac's own
cursor) in a laptop-shaped Chrome app window, never the whole screen; small things are zoomed onto and centred.
**Before recording anything, read `docs/capture.md`** — the tools and every lesson learned (browser zoom not CSS zoom,
the measured pointer, short loops, skipping welcomes, one dark ground).
A piece that only moves when used (hover, drag, click, the page's scroll) shows in the Library as a clip of it being
used: `node scripts/capture/demo-clips.mjs [id]` records it on `/library/demo/{id}` (standard theme) with Cap and a
hand-like Mac pointer (`scripts/capture/mouse.py`: aimed moves, arcs, overshoot, no even speed) into
`public/library/demos/`; `src/data/demo-clips.generated.json` keeps each piece's source hash and check.ts fails when a
piece changed after its clip — record it again. Pieces that move by themselves (a headline, a loop) stay live.
Sections are shown by what suits each (`shownPure` in `src/data/takeables.ts`): menus, footers, a programme, a food
menu, a sentence, a line of years are drawn pure in the same dark standard theme (`pureLook`); first screens, work,
products, photos and stories show their site — `scripts/capture/section-stills.mjs` (framed stills) and
`scripts/capture/site-clips.mjs` (Cap clips of parts that move with the scroll), registered in the example's
`sectionStills` / `sectionClips`.
Its card (the Library, the landing) shows `public/examples/{slug}.jpg` — a 1440×900 JPEG screenshot of its live homepage, taken
once the hero video has real frames (a black first frame makes a blank card). After replacing one, clear
`.next/dev/cache/images` or the dev server keeps serving the old one.

Its media has exactly one copy on disk: `public/examples/{slug}` is a **symlink** to
`examples/{slug}/public` (`ln -s ../../examples/{slug}/public public/examples/{slug}`), never a copy.
Its page is `/library/sites/example/{slug}` (the old `/examples` pages were retired 2026-10-08 and redirect there). A `hero`
in `src/data/examples.ts` is either `{ kind: 'video', src, poster }` or, for a recipe whose lead isn't video (3D, product,
etc.), `{ kind: 'image', src }` pointing at whatever real still the site itself uses as its fallback/poster.

For an actual "visit the site" link (`livePath`), `public/live/{slug}/` holds a real static export
of the site's **code only** — its own `media/` folder is excluded, and any hardcoded `"/media/...`
reference the export doesn't rewrite is patched to point at `/examples/{slug}/media/...` (the
symlinked path above) instead. So the export is small (code, ~1MB) and every media file still has
exactly one copy — the export just displays it from where it already lives.

To (re)generate `public/live/{slug}/` from `examples/{slug}/`:
1. Its `next.config.ts` **must** keep `turbopack: { root: new URL('.', import.meta.url).pathname }`.
   Without this, Turbopack walks up, finds OpusKit's own lockfile, and misidentifies OpusKit's root
   as the build root — this once wiped OpusKit's own `node_modules`/`.next`.
2. Temporarily add `output: 'export'`, `basePath: '/live/{slug}'`, `images: { unoptimized: true }`,
   `npm install && npx next build`, then restore the real config. If Turbopack fails on
   `next/font/google` ("queries have exactly one entry"), build with `npx next build --webpack`.
3. In `out/`, grep every `.html`/`.txt`/`.js`/`.css` for `"/media/`, `` `/media/ `` (template literals), `, /media/` (later `srcset` entries) and `url(/media/`,
   and point each at `/examples/{slug}/media/`. Copy everything **except** `out/media/` into `public/live/{slug}/`.
4. Inner links (`/live/{slug}/about`) resolve via the `fallback` rewrites in `next.config.ts` (→ `about.html`).
   The site's own home is `/live/{slug}` (no trailing slash; the same rewrite maps it to `index.html`) — that is the
   `livePath`. Never link `.../index.html`: the page then sees `/index.html` as its path instead of `/` and marks the
   wrong menu link as current (a hydration mismatch React never repairs). A trailing slash 404s (`public/` is exact-match).
5. Verify with a real browser (not just curl), via a click-through from the nav, not just a direct
   URL — assert no failed requests and that the clicked-to page actually renders.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
