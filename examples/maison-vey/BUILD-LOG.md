# Build log — Maison Vey

How this site was made, step by step (see docs/plan-examples.md §3). Example #18: a small perfume house, five scents —
e-commerce · Luxury Editorial · subtle. Made the Library + Build way.

## 1. Recipe (2026-10-07)

Made through the Library flow in the user's own browser, with OpusKit's own screens:
- Library → **Or start blank** → E-commerce.
- Brand — name "Maison Vey"; one sentence "A small perfume house making five scents by hand, each one a single place at
  a single hour."; Look: **Luxury Editorial**; Colours: **Oxblood Room** (compared with Bottle Green, the look's own,
  and Pink Plaster, already used by an example); Lettering: **Gala Night** (Bodoni Moda with Jost).
- Pages — Home: first screen changed to **Product in the spotlight**, Categories removed (five scents need no
  categories): Product in the spotlight → Product Grid → Collection → Editorial Story → Testimonials → Trust Strip →
  Newsletter. Shop, Product, Cart, Checkout as the kind of site gives them. **About** added (About → Process).
- Next: Recipe → saved (`/result/04a186d2`). The user asked for it to be built ("indi ... çalışdıra bilərsən").
- The exact spec: `opuskit.json`

## 2. Build Package

`scripts/build-package.ts` into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router,
src/, `--skip-install`, `--disable-git`), outside the OpusKit repository. `next.config.ts` got the `turbopack.root` pin
before the first install; `.gitignore` keeps `build/`; the placeholder SVGs were removed. Then `npm install`.

## 3. Media

Built with temporary pictures (Prompt 1). Then (2026-10-07) 33 photos found and picked by Claude through the Unsplash
connector, by the shot list, saved over the temporary files of the same names (no code changed): every bottle, pipette
and bench picture from one photographer's series in one perfume workshop, so the products share glass, ground and
light; each scent's place, the harbour and a portrait from others. One light shared grade, cropped to each asset
key's exact size; sources in `media-src/SOURCES.md`. The assets are still marked `temporary` in the code, so the dev
server keeps its small "Temporary" tag on them.

## 4. Prompts to Claude Code

### Prompt 1 (2026-10-07)

Fully isolated, at the user's request: not a subagent of the OpusKit session but a separate Claude Code session
(`claude -p`, Claude Opus 5.5) started inside the project folder, outside the OpusKit repository, with only the
project's own settings (`--setting-sources project,local`: none of the user's plugins), so it saw nothing of OpusKit
but the package itself. The user built the same package with another model in parallel, to compare. The prompt, word
for word:

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are not ready yet. Until they are, every picture is a temporary one: make a plain placeholder image for each asset key in src/config/assets.ts (and for each photo the shot list in recipe/media.md asks for), in the exact ratio and size the shot list gives, a calm tone from the palette with the key written small in a corner, saved in public/media/ under the name the asset layer expects. Mark them all as temporary in assets/manifest.json. When my photos arrive I will only replace those files.

Rules for this session: work only inside this folder, never read or edit anything outside it. Ports 3000, 3001 and 3017 are taken: use port 3018 for the dev server. Never remove or change the turbopack.root line in next.config.ts.
```

The session ended (with the OpusKit session that started it) in its last checks: every page written, screenshots at
both widths, lint. The same isolated session was resumed (`claude -p --resume`, same flags) with:

```
continue where you left off
```

Resumed run finished: Home, Shop, a page per scent and the discovery set, Cart, Checkout, About, Privacy & terms and
a 404; working bag and checkout form (no real payment); copy in `src/content/copy.ts` and `src/content/products.ts`
(invented facts marked `PLACEHOLDER`); 33 temporary pictures by the shot list, marked `temporary` in
`assets/manifest.json`. Its own checks: production build, lint and TypeScript clean; every page at 1440 and 390,
normal and reduced motion. It added Playwright (browser in `.cache/`, screenshots in `qa/`, both git-ignored).
Cost reported by Claude Code for the resumed run: $7.29 (the first run, cut off, reported none).
