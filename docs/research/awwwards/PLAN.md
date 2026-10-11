# Learning from Awwwards — the plan

**Why:** the sites Awwwards awards are the bar. Once OpusKit's generated sites reach that level, OpusKit has done its
job (the user, 2026-10-11). So we study what the winners do, part by part, and make the useful parts OpusKit's own.

**How:** one part at a time — collect, read, decide, then move what is worth it into OpusKit. Never everything at once.

- **Collect** facts and short descriptions only (names, tags, scores, palettes, pitches, what a site does), with the
  source URL. No code, images or text of the sites is copied into OpusKit.
- **Make it ours**: a technique becomes an OpusKit piece or section written from scratch (MIT/Apache sources, and GSAP —
  allowed by the user 2026-10-11; AGENTS.md), a rule in `build-packages/craft.ts`, knowledge in `src/data/look-knowledge.ts` (its source in
  `seen`), a palette or pairing that passes check.ts, or a catalog idea. Fonts: Google Fonts only — a commercial face a
  winner uses becomes a free one with the same job.
- **Write down** what each part found in `docs/research/awwwards/NN-name.md`: the data, what it says, what moved into
  OpusKit and what did not, and why.

## Parts

| # | Part | Source on Awwwards | What it can give OpusKit | State |
|---|---|---|---|---|
| 1 | **The winners as data** | Sites of the Day (recent ~90): tags, jury scores (design / usability / creativity / content), palettes, pitches | The base every other part asks: which tags, categories, palettes and stacks win; what scores well | done — `01-winners.md` |
| 2 | Typography | Typography Honors; fonts on winners; Best Fonts | Pairings and type moves (sizes, contrast, mono labels), free stand-ins for winning faces | done — `02-typography.md` |
| 3 | Transitions & scroll | Tags *Transitions*, *Scrolling*, *Parallax*, *Storytelling*; Elements *Transition*, *Scroll* | New moments (pieces), craft rules for page changes | done — `03-motion.md` |
| 4 | Colour | Palettes from part 1; colour filter; *Electric Colors*, *Pastel colors* | Palettes that pass check.ts; how many colours winners use | done — `04-colour.md` |
| 5 | Layout & navigation | *Layout*, *Inspiring UX Design*, *Unusual Navigation*, Menu, Header, Footer elements | Sections and menus worth a card; layout rules | done — `05-layout.md` |
| 6 | WebGL, 3D, texture | *WebGL*, *3D*, *Three.js* tags and collection | Which effects are worth a piece (and cheap enough) | done — `06-webgl.md` |
| 7 | Forms, microcopy, details | *Forms and Input*, *Microcopy and UX writing*, *404 pages*, Loading | Craft rules for forms and words | done — `07-details.md` (the 404) |

The order can change with what part 1 shows. Each finished part gets a line in `docs/HANDOFF.md`. New ingredients come in batches between parts (batch 1:
`side-scroll`, `scroll-story`, `proximity-type` — `01-winners.md`).

## Tools

- `scripts/research/awwwards-404.mjs <shots-dir>` — part 7's: each winner's missing page → `data/404.json`.
- `scripts/research/awwwards-layout.mjs <shots-dir> [top]` — part 5's: header, menu and footer of all 93 →
  `data/layout.json`.
- `scripts/research/awwwards-motion.mjs <sheets-dir> [top]` — part 3's: each scroll/transition winner opened in a
  headless browser and measured → `data/motion.json`; contact sheets go outside the repo.
- `scripts/research/awwwards-fonts.mjs` — part 2's collector: each winner's live page → its `@font-face` families →
  `data/fonts.json`.
- `scripts/research/awwwards-sotd.mjs [pages]` — part 1's collector: Sites of the Day list pages → each site's page →
  `docs/research/awwwards/data/sotd.json`. Polite (one request at a time, ~1.2 s apart); keeps what it already has.
