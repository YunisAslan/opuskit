# OpusKit

Next.js 16 (App Router) + TypeScript + Tailwind v4. Version-matched Next.js docs live in `node_modules/next/dist/docs/` — read them instead of relying on memory.

**Start here: `docs/HANDOFF.md`** — where the work stands, what's next, and the user's working agreements.

Current: `docs/plan-library.md` — OpusKit Library, the new front door (Discover → Collect → Brand → Compose → Recipe → Build). Examples: `docs/plan-examples.md` — how each is made and what is open; read it before touching examples and keep its Progress table current. Research: `docs/research/`.

- Domain types: `src/types/domain.ts`. Knowledge base (curated ingredients): `src/data/`.
- Recipe engine (deterministic composition): `src/features/recipes/engine.ts`.
- Build Package adapters: `src/features/build-packages/`.
- OpusKit's own controls (select, checkbox, dialog, popover, accordion, inputs, toasts) are shadcn/ui in `src/components/ui/`, themed to OpusKit's palette in `globals.css`. Add new ones with `npx shadcn@latest add <name>`, then rewrite `bg-muted` → `bg-secondary` in the new file (`--color-muted` is OpusKit's muted *text* colour). Never use a native `<select>`, `<dialog>` or `<details>` in app UI.
- The Library flow is the way to make a site (`docs/plan-library.md`): `/library` (Discover) → `/studio/pages` → `/studio/style` →
  recipe; every step opens with one sticky steps bar (`FlowBar`: steps, the Collection sheet, Next) in
  `src/app/library/parts.tsx`. Logic `src/features/library/collection.ts`, storage `src/lib/collection.ts`; plans made there
  carry `via: 'studio'`. The kit below still opens examples and saved recipes until it is retired.
- The kit (`/kit`) is the only way to make or change a recipe (the questionnaire was retired 2026-09-30; `/create`
  redirects here). A builder in three steps, always visible in its
  step bar: 1 Design (same on every page: "About your site" first in the list — name, what it is, kind of site, what visitors
  should do, each saying what it shapes — though the step opens on Look, so people see sites before a form; then biggest first —
  look, movement, big idea (`concepts` in patterns.ts: the one idea the site is built around — recommended until picked, or
  'off'; its first two signature moments land on the recipe's sections, its words go into the Build Package with the award
  checklist), colours (+ optional colour chapters), lettering, shape, menu & footer (`navStyles`, `footerStyles` —
  each footer style is a `variant` of the ready `src/sections/Footer.tsx`), behaviour),
  2 Pages (pages and their sections, plus Your files: logo, video, photos, photo note), 3 Recipe — the result page itself (Next on Pages saves the recipe,
  or updates the one the plan came from, and opens it; the same `StepBar` shows there). Every page's brief (`purpose`) is
  editable (the page title's ⋯ menu → "What this page does", a dialog) — it's how forms & legal pages (no sections) are customised. Every page arrives filled with what that kind of page usually
  has (`start`, `resetPage`). Pages speaks plain words, not component names, one idea per column: left the pages; middle
  the page itself — menu at the top and footer at the bottom (the same on every page; a page can leave either out —
  `toggleChrome`, `PageSpec.hide`, written into the recipe and QA), its parts in between, each titled by its job
  (`sectionGroups[].job`, `jobOf`) with its look (`src/data/section-guide.ts`) and chips for its effects; drag, up/down or
  remove on the row itself;
  right one job at a time, named by a switch at its top ("Add a part" | "Edit …") — Add: every part, grouped by job;
  clicking a card adds it (after the picked part, else before the closing parts) or drag it to a spot, and the panel stays
  on Add; Edit (a row clicked, or its "+ Effect" chip): the part as it is, then tabs — Effects (moments) first, Other
  designs (same job, `swapOptions`, `replaceSection`; for the first screen, the first screens — `setHero`, which moves
  Movement into a level it supports and says so), Photos (photo sections); the menu/footer row shows "Show on this page"
  and its site-wide look. Every change scrolls the page to that part and makes it glow (`land`). Options show a real
  site and the same thing drawn in your style, side by side (`DualShot`); menus are drawn (`MenuDemo`) and link
  behaviours play on a drawn footer (`LinkDemo`), since both are too small in a recording. The film/image part (`hero`) is free like any
  part: dragged anywhere, mid-page, onto any page, or removed; the engine then writes it as a full-width band at that spot
  (`midPageHero`, QA checks it stays there), and only `setHero` on a site with none adds one (top of the first page). Each film/image part
  shows its own pick (`setPartHero`, `heroOf`; the recipe's `heroBands`): the site's first one is its first screen (`plan.hero`,
  sets media and movement), and changing one never changes another. Structure and effects never share a list. Pages
  never links back to Design. Pieces come in two kinds (`behaviours` in pieces.ts): behaviours — how
  headlines arrive, what links and the main button do, whole-site extras — are site-wide, one per kind, set in Design
  (`setBehaviour`); moments are picked on one part in Pages (`piecesFor`, `togglePiece`) and stay on it — a swap keeps
  them when the new look can carry them, else turns them off; they never wander. Photo layout is per photo section
  (`PHOTO_SECTIONS`, `setSectionPhotos`); a section without a pick gets `recommendSectionPhotos`. Logic: `src/features/kit/plan.ts` (pure, tested in check.ts); storage: `src/lib/kit.ts`.
- The kit is the one editor. Every recipe opens in it — `/kit?from=seed:{slug}|gen:{id}|example:{slug}` (`specToPlan`;
  an example's recipe is rebuilt from its recorded `choices` by `specFromChoices`). What the kit doesn't edit rides along in
  `plan.from`; a plan opened from a saved recipe updates that recipe. Result/recipe "Change" links point into the kit.
- Ready sections: every content section (all but navbar, hero, footer) is a component in `src/sections/`, listed in
  `src/data/blocks.ts`, shipped to `src/components/sections/` for the sections a recipe uses. OpusKit-written, tokens only
  (`--color-*`, `--radius-*`, `type-display|heading|body|utility` from `src/lib/type-tokens.ts`), content through props,
  no import beyond `react`. The kit renders them for real with sample content (`SectionPreview`), dressed as one of six
  worlds (studio, food, shop, product, software, event — `worldFor(purpose)`) so a café sees cups and a shop sees products.
  Many come in several designs (a `variant` prop; `src/data/section-variants.ts` — the engine picks one per look family,
  the owner can pick another in Pages → Other designs; check.ts asserts each design exists in the code). Two section ids
  may share one component (Steps, NameWall, Statement) with different default designs.
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
`media-src/recording/` holds the user's full screen recordings of the live site, kept on purpose: the kit's clips
(`clip`, `sectionClips`, `pieceClips`, `signatureClips`) are cut from them with ffmpeg, and can be re-cut later.

Before the very first `npm install`/build ever runs inside a freshly dropped-in example, check its
`next.config.ts` already has the `turbopack.root` pin from the next section — a fresh Claude-Code-built
project won't have it yet, and building it even once without the pin risks OpusKit's own `node_modules`.

### Showing one on the site

After adding or changing an example, run `npm run examples`. It writes:
- `src/data/example-specs.generated.json` — the exact recipe each example was built from, which "Customise in kit" opens.
  Read from the example's `opuskit.json` (every Build Package ships one — keep it, it's committed with the example), or,
  for older examples without it, rebuilt from its `choices` plus its own `recipe/layout.md` (pages, sections, first
  screen, layout, shape, menu). `npm run check` composes each spec and asserts it matches that layout.md.
- `public/downloads/{slug}.zip` ("Copy the code") — the real code with same-size placeholder photos, videos left out and
  listed in `MEDIA.md`, no env files.
Record `choices` with the exact option names.

Each example is registered in `src/data/examples.ts` (title/summary — copy from its own real
`<title>`/meta description, not the abstract recipe doc, since a build often renames the brand).
Its clips: `clip` (10–15 s, first screen + scroll) and `sectionClips` (3–5 s per section, the section standing still and framed
on it — never the page scrolling past; `examples/{slug}/public/media/clips/{sectionId}.mp4`)
feed the kit's "a site like this" (`src/features/kit/closest.ts`); an old example carries `legacy: true` and is never offered there.
Its card on `/examples` shows `public/examples/{slug}.jpg` — a 1440×900 JPEG screenshot of its live homepage, taken
once the hero video has real frames (a black first frame makes a blank card). After replacing one, clear
`.next/dev/cache/images` or the dev server keeps serving the old one.

Its media has exactly one copy on disk: `public/examples/{slug}` is a **symlink** to
`examples/{slug}/public` (`ln -s ../../examples/{slug}/public public/examples/{slug}`), never a copy.
`/examples/{slug}` embeds the real hero straight from that path — a `hero` in `src/data/examples.ts`
is either `{ kind: 'video', src, poster }` or, for a recipe whose lead isn't video (3D, product, etc.),
`{ kind: 'image', src }` pointing at whatever real still the site itself uses as its fallback/poster.

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
