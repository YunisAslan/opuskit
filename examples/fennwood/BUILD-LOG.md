# Build log — Fennwood

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).
Example #7 of docs/plan-for-fit.md §5: organic / organic-modern, parallax-photo first screen, lively movement, restaurant.

## 1. Recipe (2026-10-03)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `setBehaviour`), the same calls the kit UI makes.
Approved by the user.
- Kind of site: Restaurant · name "Fennwood" · about "A wood-fire kitchen with forty seats: vegetables from two farms,
  bread baked in the same oven, a menu that changes with the week." · goal: Book or reserve
- Look: Organic Modern · colours Apricot Hall · lettering Gallery Hours (both the row's fresh picks, §5) · shape Soft ·
  layout Balanced · first screen: Full-bleed photo with depth · movement: Dynamic (the first screen needs it)
- Big idea: One thing guides the scroll (the kit's recommendation) → a shape that travels from the first screen, a footer
  worth reaching
- Menu: Centered logo · footer: Signature columns · behaviour: headlines — Cut-out headline; links — Hand-drawn
  underline; main button, between pages and whole site — none
- Pages (the restaurant defaults): Home (hero → intro → menu → reservation → location), Menu (menu → gallery →
  reservation), Reservations (reservation → location → FAQ)
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install`).
`next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps the recipe's `build/` folder.
Then `npm install` and, as the package README says, `npm i motion`.

## 3. Media

8 photos from Unsplash, picked by Claude with the Unsplash connector (sources and what was rejected in
`media-src/SOURCES.md`). Originals in `media-src/`; resized to at most 2400 px wide (JPEG q82) into `public/media/`, the
tall hero kept at 2400×3600 for its parallax. Cropped before resizing: `room-1` (top and left 15% — a fire-exit pictogram,
a laptop and a person at the edge), `farm` (tighter on the vegetables, hiding the crate's teal mesh), `location` (bottom
20%, plus a slight warm shift to match the set). The create-next-app placeholder SVGs in `public/` were removed.

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-03)

Run at the user's go-ahead ("go") by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context).
It was given only: "work inside `examples/fennwood/` as the project root; read its CLAUDE.md and AGENTS.md first; port
3000 is taken, use port 3011 for its dev server" — then the prompt below, word for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are already in public/media/ (where each one comes from is in media-src/SOURCES.md):
- hero.jpg — our wood oven with the fire going and bread inside, the cooks in shadow. This is the first screen; it is tall on purpose so it can move.
- dish-1.jpg — charred vegetables from the oven, for the menu.
- dish-2.jpg — our bread on linen, for the menu.
- dish-3.jpg — whole grilled fish with lemon, for the menu.
- room-1.jpg — the dining room, for the gallery.
- room-2.jpg — chopping herbs in the kitchen, for the gallery.
- farm.jpg — a crate of vegetables from one of our two farms, for the intro and the gallery.
- location.jpg — our window from the street at dusk, for Location.

I don't have a logo yet — make a simple one for Fennwood.

Booking has no backend yet: the booking form can open the visitor's mail app with the details filled in.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

Result: the whole site built — Home, Menu, Reservations and a 404, from the ready sections and kit pieces. Its own
additions: an oven-arch logo with a flame (`icon.svg`), the travelling mark (leaves the first screen, rests beside each
section title, lands bigger at the menu, ends beside "Fennwood" in the footer), a menu with Dinner / Weekend lunch tabs,
dish photos that follow the cursor over the menu, a gallery slideshow, a booking form that opens the visitor's mail app
(open days only, lunch times only at weekends), a phone "Book a table" bar, `scripts/media.sh` (WebP sizes + a 9:16 phone
crop of the hero). It invented the address (27 Larder Street, Bristol), a fiction-reserved phone number,
`tables@fennwood.example`, the farms (Larkrise, Stonepit), hours, dishes and prices. It noted a contradiction in the
recipe: the cut-out headline piece says "the main title plus at most two section titles", the checklist says every
section title — it followed the checklist. `next build` with `output: 'export'` passes, every route static.

Reviewed by Claude on the static export at 1440 px and 390 px (Playwright, scrolled through Home): no overflow, no
console errors, no failed requests. Seen: on desktop the travelling mark stops on top of the intro headline's last line
("by Wednesday") while it moves; on phones the fixed "Book a table" bar sits on the dark footer at the end, where the dark
button disappears into the footer.

### Prompt 2 — fix round 1 (2026-10-03)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context), given only: "work inside
`examples/fennwood/` as the project root; read its CLAUDE.md and AGENTS.md first; port 3000 is taken, use port 3011 for
its dev server" — then the prompt below, word for word.

```
Two fixes, please:

1. On desktop, the little oven mark that travels down the page stops on top of text: on Home it sits over the start of the intro headline ("by Wednesday"). It should never cover any text — keep it in the margin beside the titles, and while it moves between sections keep it clear of headlines, text and photos.

2. On phones, at the bottom of the page the fixed "Book a table" bar sits over the dark footer, and the dark button disappears into it. Hide the bar once the footer comes into view (and keep it hidden while the booking form itself is on screen).

Keep everything else as it is. When you're done, run the static build again and make sure it still passes.
```

Result: the mark now travels only through the left margin and comes in sideways beside each title (on screens ≥ 1340 px
it rests in the margin; narrower, just before the title, covering no text); the phone bar hides while the footer or the
booking form is on screen. `next build` passes, every route static.

Reviewed by Claude on the static export at 1440 px and 390 px: no overflow, no console errors, no failed requests; the mark
sits in the margin beside "Two farms, one oven", clear of the headline.
