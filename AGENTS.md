# OpusKit

Next.js 16 (App Router) + TypeScript + Tailwind v4. Version-matched Next.js docs live in `node_modules/next/dist/docs/` — read them instead of relying on memory.

- Domain types: `src/types/domain.ts`. Knowledge base (curated ingredients): `src/data/`.
- Recipe engine (deterministic composition): `src/features/recipes/engine.ts`.
- Build Package adapters: `src/features/build-packages/`.
- OpusKit's own controls (select, checkbox, dialog, popover, accordion, inputs, toasts) are shadcn/ui in `src/components/ui/`, themed to OpusKit's palette in `globals.css`. Add new ones with `npx shadcn@latest add <name>`, then rewrite `bg-muted` → `bg-secondary` in the new file (`--color-muted` is OpusKit's muted *text* colour). Never use a native `<select>`, `<dialog>` or `<details>` in app UI.
- `npm run check` composes every seed recipe and every adapter and asserts completeness — and distinctiveness: palette grounds ≥ 0.06 ΔE_OK apart, no cream-band or clay-accent clusters, no AI-default fonts, each family in ≤ 2 pairings, no two seeds sharing a palette or pairing. Add to the library only what passes.

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

Before the very first `npm install`/build ever runs inside a freshly dropped-in example, check its
`next.config.ts` already has the `turbopack.root` pin from the next section — a fresh Claude-Code-built
project won't have it yet, and building it even once without the pin risks OpusKit's own `node_modules`.

### Showing one on the site

Each example is registered in `src/data/examples.ts` (title/summary — copy from its own real
`<title>`/meta description, not the abstract recipe doc, since a build often renames the brand).

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
3. In `out/`, grep every `.html`/`.txt`/`.js` for `"/media/` and replace with
   `"/examples/{slug}/media/`. Copy everything **except** `out/media/` into `public/live/{slug}/`.
4. Inner links (`/live/{slug}/about`) resolve via the `fallback` rewrites in `next.config.ts` (→ `about.html`).
   Link to `.../index.html` explicitly, not a trailing slash — `public/` files are exact-match only,
   and the app's default trailing-slash redirect (`/live/{slug}/` → `/live/{slug}`) 404s otherwise.
5. Verify with a real browser (not just curl), via a click-through from the nav, not just a direct
   URL — assert no failed requests and that the clicked-to page actually renders.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
