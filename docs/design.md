# OpusKit's own design

How OpusKit itself looks and behaves (not the sites it makes — those are recipes). Read this before touching the
landing page, the site chrome or any app screen's look. Agreed with the user 2026-10-07. Tokens and classes live in
`src/app/globals.css`; this file says why and how to use them.

## The direction in one paragraph

A studio instrument: a cool stone ground, near-black ink, hairline structure you can see, and one signal orange used
sparingly. It takes after [getartcraft.com](https://getartcraft.com/) and [mux.com](https://www.mux.com/). The user
likes those sites: keep close to them, but never copy them. The page has to say **what happens here, at once**: a
visitor should understand "pick sites you like → get your own, built by AI" in seconds. Keep the interface simple —
no theme on top of the product, no clever metaphors.

## What the user decided (keep to it)

| Tried | Verdict |
|---|---|
| First redesign: stone + orange, Archivo, mono-caps labels and buttons, ruled frame, centred wide-caps "OPUSKIT" with orbiting site cards | Liked it, but too close to artcraft (same hero, same black nav blocks) |
| "The score" theme: Bodoni Moda, ultramarine, staves, WebGL strings, musical words (Op. 1, movements, tempo) | **Rejected**: disliked the font and the approach; too complex, not premium. Never bring it back |
| No rails, left-aligned hero over a single showcase stage, sentence-case buttons | "Relatively good". The user wanted the lines back and a clearer message |
| **Current**: first redesign's look + lines + a centred plain promise over a four-station flow; first version's nav, buttons and hovers; the first hero's wordmark moved to the footer | **Approved** ("Əla") |

What the user values, in their words: premium, simple and not confusing, structure lines like mux and artcraft, a
message that reaches the visitor directly and fast. Old OpusKit "looked like a food site" (cream and clay). Don't drift
back to warm cream.

## Tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| `paper` | `#EFEFEB` | `#111113` | page ground |
| `paper-2` | `#E5E5E0` | `#1B1B1E` | quiet surfaces, hover fills, segmented controls |
| `white` | `#FAFAF8` | `#18181B` | cards, fields (in dark it is a surface, not white) |
| `ink` | `#0E0E10` | `#ECECE6` | text, primary buttons, the current page's block |
| `ink-2` | `#2B2B30` | `#C3C3BD` | body text, secondary text |
| `muted` | `#66666C` | `#8F8F96` | labels, meta (OpusKit's muted **text** colour — shadcn's surfaces use `bg-secondary`) |
| `line` | `#D4D4CE` | `#2B2B30` | every hairline |
| `pencil` | `#E0480F` | `#FF5C21` | the one signal: live dot, a picked mark, a progress fill |
| `pencil-soft` | `#FBE3D8` | `#3A1B0E` | the glow behind a just-changed part |

The shadcn variables (`--background`, `--card`, `--border`, …) read these tokens, so shadcn controls follow the theme.

- **Only tokens in app UI.** Never a raw light hex (it breaks dark mode).
- `text-[#fff]` only on media. On the orange use `text-paper`.
- A block that is dark in both modes (the Build Package band, the recipe file card) gets `.keep-light`. It pins the
  light palette, so `bg-ink text-paper` there stays dark-on-light-text in both modes.

## Type

- **Archivo** (`--font-display`, loaded with the `wdth` axis):
  - `.display`: 600, `font-stretch: 108%`, −0.04em, line-height .96, sentence case. Every heading.
  - `.display-xl`: the same, tighter. Big closing lines.
  - `.wordmark`: 700, 125%, uppercase — the first landing's "OPUSKIT". Only the footer's name.
- **Geist** (`--font-sans`): all reading text.
- **Geist Mono** (`--font-mono`):
  - `.label`: .6875rem, 500, .12em tracking, caps. Section names ("01 / How it works"), counts, meta, nav links.
  - buttons.
- Not Bodoni, not any serif for OpusKit's own UI. The fonts *inside* previews are the recipe's, set by `TokenScope`.

## Structure — the lines

- `.frame`: the 1440px column between two hairline rails (`border-inline`). Landing sections and the header and
  footer sit in it.
- Sections are split by `border-t border-line`. Where a split meets the rails, `.xm` draws a small cross (its
  `::before`/`::after`). A parent with `.xm` near the page edge needs `overflow-x-clip` on an ancestor: the footer has
  it, the landing root has it.
- Cells inside a section are ruled too. Use `gap-px bg-line` grids or `border-l`/`border-t` per cell.
- Each cell's head is a thin bar: label left, number or meta right.
- `.grid-paper`: a faint 32px drafting grid, masked. Only behind the hero.

## Controls

- `.btn` + `.btn-ink` (primary) / `.btn-line` (secondary): mono caps, square (2px), min-height 46px. `.btn-sm` is
  34px. `.btn-line` inverts on hover. `.btn-signal` (orange) exists; use it rarely.
- **Nav** (`SiteChrome.tsx`):
  - `.label` links; hover fills `paper-2`.
  - The current page sits on an ink block (`aria-current`).
  - When the Collection is empty, a full-height ink "Start a site" block sits at the right. Once it has items, the
    Collection button and Build my site take its place.
  - Header cells are ruled: logo | nav | tools.
- **Steps bar** (`FlowBar` / `Steps` in `library/parts.tsx`, under the header, sticky at `top-14`): each step a ruled
  cell like the header's (mono number + name); the current one on a `white` surface, the way walked underlined 2px in
  `pencil`, done steps ticked. Hover fills `paper-2`. Every step opens at any time except one there is nothing for yet
  (Direction without a name and kind, Recipe without a recipe) — shown faded with a reason on hover. Sticky things under
  it sit at `top-[112px]`, or `top-[111px]` when they have a top border (the bar sticks at 56 and ends at 112; one hairline, never a gap or a double line). On Direction only the right column (Your brand) is sticky; the picker's
  tabs scroll with the lists.
- **Recipe page tabs** (`RecipeDocument.tsx`; three — Your site, Your files, Build, decision 47): the same ruled cells as the steps bar, but names only — tabs are not steps, so no
  numbers (the user, 2026-10-08); the open tab on `white` with a 2px `pencil` underline, hover `paper-2`). Section heads are `.display` titles over a hairline;
  grids of cards are ruled per cell (`border-l border-t` on the grid, `border-r border-b` on each cell — never a
  `gap-px bg-line` fill, which shows grey where a row is short). A pick taken from a site is marked `from Fennwood`
  in a pencil `.label`.
- Library and studio controls are shadcn/ui (see AGENTS.md). Corners are 2–4px everywhere; no pills. Round only for
  dots, toggles, avatars and step numbers.

## The brand poster (`components/BrandCard.tsx`)

The owner's brand is drawn as a poster, the same everywhere (2026-10-08; a first "brand sheet" with crop marks, ruled
cells and hex labels was "a bit odd"; the user: simple, creative, and no buttons that ask to be clicked):
- **Full** (`BrandCard` — Direction's right column, the recipe page's Your brand): the accent as one short rule; the
  name in the display face; the sentence in the body face; a big "Aa" with the faces named; down the right edge the palette as a printer's colour bar (each band names its
  role and hex on hover).
- **Mini** (`BrandSheetMini` — Saved's cards, the landing's 02 station): the same, small.
- **OpusKit's maker's label** (`MakerLabel`): the OpusKit logo on an ink plate, at the poster's foot, on the type
  specimen's line (right of the "Aa"). It is OpusKit's own — its face, ink and paper, following
  OpusKit's light/dark — and never changes with the owner's palette or lettering.
- No buttons or links inside it: a picture of a button asks to be pressed. Everything is in the owner's palette and
  faces; a new palette re-inks it with a 300ms colour cross-fade.

## Hover language (`globals.css`)

- **Text links:** `.ulink` draws a 1px line from the left; `.group:hover .ulink` works for card titles.
- **Arrows:** lucide arrows lean the way they point — `→` right, `↗` up-right, `←` left. This works globally; there
  is no class to add.
- **Cards:** pictures scale a little (`group-hover:scale-[1.03–1.05]`). Library cards lift 4px and their border turns
  ink.
- **Logo:** its cell fills `paper-2` and the symbol turns −12°.
- **Ticker:** pauses on hover.
- **Rule:** anything clickable must visibly change on hover. `text-ink-2 → text-ink` alone is invisible; add a fill,
  a line or movement.

## Dark mode

- `.dark` on `<html>` redefines the tokens.
- `THEME_SCRIPT` (in `ThemeToggle.tsx`, run in `<head>` by `layout.tsx`) sets it before paint: the stored choice,
  else the system.
- The header's `ThemeToggle` flips it:
  - The new mode grows from the button as a circle (View Transitions; a plain swap if unsupported or with reduced
    motion).
  - The choice is stored only when it differs from the system, so picking the system's mode again makes the page
    follow the system again.
- With nothing stored, the page follows live system changes.
- Check every new screen in both modes.

## The landing page (`src/app/page.tsx`)

The page tells the product, top to bottom:

1. **Hero:**
   - Centred: the live dot and "19 sites built this way · live", the promise **"Pick sites you like. Get your
     own."**, one sentence, two buttons.
   - Then **`HeroFlow`**: four ruled stations on one line, over the drafting grid:
     - 01 Sites you like: three fanned real screenshots, one ticked.
     - 02 Make it yours: Halden's real palette, display font and pages.
     - 03 The recipe: the zip and its files.
     - 04 Your site: built sites taking turns, the four tool icons.
   - An orange signal travels the line (`.travel`). Stacked on phones.
2. **Ticker:** every built site and its look (`.ticker`).
3. **01 / How it works:** four ruled cells — Library, You, Direction, Recipe — each with a small picture (`StepPicture`).
4. **02 / The Build Package:**
   - A dark band (`.keep-light`, `#package`) with the ShaderDither piece as a quiet WebGL texture at its top.
   - Real numbers and files from Halden's package; the "room to invent" sparks and the shot list.
5. **03 / Made with OpusKit:** eight example cards.
6. **04 / Build with:** the four tools.
7. **Close:** "Start with a site you like."
8. **Footer:**
   - Ruled columns (Make / See / Yours).
   - The `.wordmark` "OPUSKIT" across the page.
   - A last ruled row: © and "Study the principle · build something original".

Every number and picture on the landing is real (`examples.ts`, the engine). Keep it that way: no invented stats.

## Motion

- Small and purposeful. Allowed:
  - the travelling signal;
  - turns of pictures;
  - hover moves;
  - the theme circle;
  - one shader band;
  - the click spark (`components/ClickSpark.tsx`, mounted once in the root layout): eight short pencil strokes burst
    from every click and fade in ~0.4 s. OpusKit's own code (the user asked for React Bits' Click Spark, not its
    code); none under reduced motion.
- Every animation has a `prefers-reduced-motion` version (globals.css switches the ticker, travel and take-turns
  off).
- WebGL only where it is quiet and cheap. Use the existing pieces in `src/pieces/` (Paper Shaders, Apache-2.0) before
  writing a new one.

## Don'ts

- Don't use artcraft's hero: a centred wide-caps wordmark with orbiting cards.
- Don't bring back the rejected "score" theme: Bodoni, staves, musical words.
- No warm cream ground or clay accent.
- No pills, no gradients on UI, no glassmorphism.
- No raw hex in app UI.
- No feature without a visible hover.

## Checking a change

1. `npx tsc --noEmit -p .` and `npm run check`.
2. Screenshots with Playwright, in a real browser:
   - 1440×900 and 390×844;
   - light, and `colorScheme: 'dark'`.
3. At 390 assert `document.documentElement.scrollWidth === 390`. A `.xm` cross or a ticker outside a clipped parent
   is the usual cause of overflow.
4. For the hero, wait for `load`, not `networkidle`: videos keep the network busy.

## Open

- The examples page, saved page and studio intros use the same `PageIntro` / `.display`, but they don't sit in
  `.frame` with rails yet. Bring them into the ruled frame if the user wants the lines everywhere.
- Phone: the hero's first station is tight. Check after any change to its pictures.
