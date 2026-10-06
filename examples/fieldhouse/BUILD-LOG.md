# Build log — Fieldhouse

How this site was made, step by step, so "it came out of OpusKit" can be checked (see docs/plan-examples.md §3).
Example #17 of docs/plan-examples.md §5: an architecture studio that restores old barns — studio · Modern Heritage
(a look no example had yet) · dynamic. The first example made the **Library + Build** way, not in the kit.

## 1. Recipe (2026-10-06)

Made through the Library flow in a real browser, as a user would, with OpusKit's own screens:
- Library → **Or start blank** → Studio.
- Brand — name "Fieldhouse"; one sentence "An architecture studio that turns old barns into houses — keeping the
  timber, the stone and the light."; Look: **Modern Heritage**; Colours: **Warm Black** (four compared in Brand's
  sample: Espresso, Limestone, Warm Black, Bottle Green — the dark ground with an ochre accent reads as old oak and
  straw); Lettering: **Moonlit Italic** (Cormorant with Karla — the look's own first pick).
- Pages — Home: first screen changed to **Photo with depth** (Other first screens), Journal removed, Testimonials
  added, then ordered: first screen → Featured Work → Manifesto → Testimonials → Closing CTA. "Practice" renamed
  **Work** (Featured Work → Gallery). Project (Case Study → Gallery → Specs → Featured Work), About (About → Process →
  Team) and Contact (Closing CTA → Location) kept as the kind of site gives them.
- Menu Side index · footer Signature columns · shape Soft · layout Editorial — all the look's own. No effects picked.
- Next: Recipe → saved. Approved by the user ("aha başlaya").
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install`,
`--disable-git`). `next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps the recipe's
`build/` folder; the create-next-app placeholder SVGs in `public/` were removed. Then `npm install`.

## 3. Media

None yet. Photos could not be fetched this time (Pexels shows a "verify you are human" check to the automated browser;
the Unsplash connector needs re-authorising), so the user asked for the site to be built first with temporary
pictures, and for the list of photos each part needs (recipe/media.md → Shot list). The real photos replace the
temporary ones later, file for file, without touching code.

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-06)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context). So that it saw nothing of
OpusKit (the user asked), the project was moved outside the OpusKit repository for the build and moved back after; this
log was kept outside the project until then. It was given only: "work inside the project folder as its root, never
read or edit anything outside it; read its CLAUDE.md and AGENTS.md first; ports 3000 and 3001 are taken, use port 3017
for its dev server; never remove or change the `turbopack.root` line in next.config.ts" — then the prompt below, word
for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are not ready yet. Until they are, every picture is a temporary one: make a plain placeholder image for each asset key in src/config/assets.ts (and for each photo the shot list in recipe/media.md asks for), in the exact ratio and size the shot list gives, a calm tone from the palette with the key written small in a corner, saved in public/media/ under the name the asset layer expects. Mark them all as temporary in assets/manifest.json. When my photos arrive I will only replace those files.
```

Stopped on 2026-10-06 at the user's request (work continues the next day on another computer), early in step 1 of the
implementation plan: it had set up shadcn/ui (`components.json`, `src/components/ui/`, `src/lib/utils.ts`,
`src/app/globals.css`) and was reading the reference sections; no page was written yet. To go on: a fresh subagent,
built the same way (outside the repo, sees only the project), with the same prompt plus "Continue where the last
build stopped: shadcn/ui is set up, no pages yet." — logged here as Prompt 2.
