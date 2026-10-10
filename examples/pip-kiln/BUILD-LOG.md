# Build log — Pip & Kiln

How this site was made, step by step (see docs/plan-examples.md §3 and §5b). Example #24: bright glazed mugs, plates
and vases from a two-person pottery, and Saturday workshops — E-commerce · Playful Pop · **dynamic** · product. Made
through the flow Library → You → Direction → Recipe by the night run of 2026-10-09 (`docs/NIGHT-RUN.md`), unattended.
Its engine test: a **whole shop** through the flow (product grid, product page, cart, checkout, the cart's
micro-interactions, out of stock, one product in a category), the sentence's "workshops" adding a page
(`pagesFromWords`), and product photos per item from the shot list.

**The recipe has not been approved yet** — there is no approval at night; the pull request is the approval. Open it in
the studio from the link in `media-src/flow/link.txt`.

## 1. Recipe (2026-10-09)

Made by Claude in a real browser (headless Chromium) with OpusKit's own screens, as a user would:
- **Library** — taken from three sites, signature parts and effects only: from **Maison Vey** its Product Grid,
  Collection and Product Highlight (how a shop shows its things); from **Sticky Weather** its Manifesto and its
  **Wavy underline**; from **Inkwell & Moth** its **Prints on a desk** (workshop photos to pick up and move). Then
  **Build my site**.
- **You** — name "Pip & Kiln"; one sentence "Bright glazed mugs, plates and vases from a two-person pottery, sold in
  our online shop. Saturday workshops at the wheel."; What are you making: **Things to buy** → E-commerce (read from
  the sentence). Main action: buy.
- **Direction (Make it yours)** — Look: **Playful Pop**. Colours: **Butter Yellow** (a sunny light ground, near-black
  type, a magenta signal — previewed on the brand poster against **Cobalt** (the glaze colour itself, but a dark
  saturated ground fights colourful products), **Electric Lime** and **Grape Soda**: a shop of bright glazes needs a
  ground the products stand out on). Lettering: **Bubble Pop** (Bagel Fat One + Epilogue — fat, round letters like
  thrown clay; previewed against **Diner Serif** and **Poster Warp**). Screens in `media-src/flow/`.
- Pages came from the kind of site and the sentence: Home (Product stage, Categories, Product Grid, Collection,
  Manifesto, Testimonials, Trust, Newsletter) · Shop · Product · Cart · Checkout · **Workshops** (Services, Schedule,
  Gallery with Prints on a desk, Pricing, Reservation, FAQ — see Engine lessons 1 and 2). Wavy underline on every page.
- **Next: Recipe** → saved. The exact spec, with what was taken (`taken`): `opuskit.json`.

## Engine lessons

1. **Fixed before the build:** the sentence's "Saturday workshops" added a Workshops page with only Services and
   Process — nobody could see a date, a price or book a seat. A workshops / classes / lessons page added from the
   sentence now has its own parts: Services, Schedule, Gallery, Pricing, Reservation, FAQ; the shop still sells first
   (the main action stays buy). check.ts.
2. **Fixed before the build:** a taken effect that no part could carry vanished without a word — Prints on a desk
   needs a gallery, a shop has none, and it was simply not in the recipe. A taken effect now brings the first part
   that can carry it, on the page where that part usually sits (here the Workshops gallery). check.ts.
3. **Confirmed:** Kelp Line's lesson took. The package now asks for the favicon as a file, and this builder made
   `src/app/icon.svg` (the letter P) — the static export needed no patch.
4. **Open (the user's):** a shop's shot list asks for a set per product (three angles and a close-up for each of six
   pieces: 24 photos of the same six objects). Stock photos cannot give that — one piece from three angles needs the
   owner's own shoot. The picked set covers every shared slot; each product page's first picture reuses its grid photo
   and the rest stay temporary until the owner shoots them (`media-src/fetch.sh`).
5. **Seen, no fix:** the engine test, as built — a whole shop through the flow works end to end: product grid with
   stock labels ("Only 4 left", "Sold out"), six static product pages (`generateStaticParams`), glaze choice, a bag
   that keeps its count across pages, a cart with a free-delivery mug that fills, an empty cart in the site's voice,
   checkout that says plainly card payments are not open, a sold-out product whose button is disabled with a "tell me"
   line; the sentence's workshops page with dates, prices and a Saturday-only booking form; the cart's
   micro-interactions (the bag's count, a toast, the free-delivery line). Product photos per item come from the shot
   list (`productPageBuy/{product}-1…3`).

## 2. Build Package

`scripts/build-package.ts` into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router,
src/, `--skip-install`, `--disable-git`) at `~/projects/pip-kiln`, outside the OpusKit repository. `next.config.ts` got
the `turbopack.root` pin before the first install; `.gitignore` keeps `build/`; the placeholder SVGs were removed. Then
`npm install` and the package's `npm i motion` (Prints on a desk, Wavy underline).

## 3. Prompts to Claude Code

Fully isolated: a separate Claude Code session (`claude -p`, Claude Opus 5.5) started inside the project folder, outside
the OpusKit repository, with only the project's own settings (`--setting-sources project,local`),
`--permission-mode acceptEdits` and Bash/Read/Write/Edit/Glob/Grep allowed.

### Prompt 1 (2026-10-09)

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are not ready yet. Until they are, every picture is a temporary one: make a plain placeholder image for each asset key in src/config/assets.ts (and for each photo the shot list in recipe/media.md asks for), in the exact ratio and size the shot list gives, with the key written clearly in a corner, saved in public/media/ under the name the asset layer expects. Make each placeholder clearly visible against the page's own background — a lighter or contrasting tone, never one that disappears into it. Mark them all temporary in assets/manifest.json. When my photos arrive I will only replace those files.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3022 for the dev server. Never remove or change the turbopack.root line in next.config.ts. Before your final reply stop any dev server you started — do not leave one running.
```

Finished in one run (~33 min, 140 turns, $11.26 reported): Home, Shop, six product pages, Cart, Checkout, Workshops, a
404 and a loading screen; lint and production build clean; checked by the builder at 1440, 390 and 320 px and with
reduced motion; it stopped its dev server before replying. Its moments: the Morning Person Mug on a big pale disc with
a raspberry price starburst that pops on once the page is readable, the mug tilting away as you scroll, a sticky
"Add to bag" bar on phones (Home); "Cooling down" — a kiln thermometer in the sticky filter bar counts from 1,240°C to
21°C as you scroll the grid, ending on "Cool enough to post" (Shop); "Pick a glaze, get a personality" — Sunshine,
Raspberry or Liquorice rolls in the piece's nickname and recolours the ground behind its photos (Product); "Fill the
mug" — a drawn mug fills with tea towards free delivery, steam and a "Free!" starburst when it gets there, "Emptier than
a Monday mug" when empty (Cart); "Lump to mug" — a drawing on a wheel turns from a lump into a glazed mug as you read
the Saturday (Workshops). Details: the yellow page drips into the dark footer like glaze, "Two of us. One kiln. Zero
beige." set huge, the grid dims the other products on hover, the photo glides into the product page, the workshop
prints with a "Messy desk / Tidy grid" switch, a 404 with a broken mug, a "P" favicon as `icon.svg`.
What it named: no payment, mailing-list or booking service (forms write an email and say so; checkout says card
payments are not open); invented facts marked `PLACEHOLDER` in `src/content/`; shadcn's site blocked, so the same
components written by hand on the real Radix, react-day-picker, Embla, sonner and react-hook-form packages; the bag
lives in the visitor's browser. No deviation from the recipe.

### Review (Claude, 2026-10-09)

Production build clean; every page (Home, Shop, two product pages, Cart, Checkout, Workshops, 404) at 1440 and 390 in
headless Chromium: no horizontal overflow, no console errors, no failed requests. The shop walked through: add to bag
→ the header's count → the cart lists it → checkout; the sold-out plate's button is disabled. Looked at as a stranger:
loud, funny, one design — the strongest playful site OpusKit has. No fix round needed.

## 4. Media — waiting for the morning

The photos were picked through the Unsplash connector by the shot list and checked in its 400px previews
(`media-src/contact-sheet.jpg`, sources in `media-src/SOURCES.md`, `picks.json`). The cloud cannot download the
originals (Kelp Line's Engine lessons 6), so the site still shows the build's temporary pictures. Per-product sets are
the owner's own shoot (Engine lessons 4).

In the morning, on a machine with a network: `cd examples/pip-kiln && bash media-src/fetch.sh`, then send Prompt 2 in
the same session (`claude -p --continue` from a copy of the project outside the repository), then replace the card and
poster (`public/examples/pip-kiln.jpg`, `public/media/poster.jpg`).

Prompt 2 (written by the night run; sent 2026-10-09 with two additions, below):

```
My photos are in public/media/ now, under the same names, except the product pages' second and third views and their close-ups, which stay temporary until I shoot them. Update src/config/assets.ts and assets/manifest.json: status 'have' for every replaced file, no Temporary badge on those, centre crops again, and alt text from what each real photo shows (media-src/picks.json → alt, by key). Where a real photo shows a colour or shape the copy does not (a product's glaze, a mug's size), tell me rather than change the product.

Check every page with the photos at 1440 and 390, run the production build, and before your final reply stop any dev server you started — do not leave one running.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3022 for the dev server. Never remove or change the turbopack.root line in next.config.ts.
```

## 5. Registration (2026-10-09)

Moved from `~/projects/pip-kiln` into `examples/pip-kiln/`. `opuskit.json` is the recipe as built. Registered in
`src/data/examples.ts` (title and summary from the site's own metadata); `public/examples/pip-kiln` symlink; card
`public/examples/pip-kiln.jpg` and the hero still `public/media/poster.jpg` (its first screen, 1440×900, with the
temporary pictures); `npm run examples`; live export at `/live/pip-kiln` (media patched to `/examples/pip-kiln/media/`;
no icon patch needed), checked by a click-through from the menu (Shop, Mugs, Workshops, a product page, add to bag, the
bag — every page renders, no broken images; only aborted link prefetches); `npm run check` ✓. Clips wait for the
user's screen recording, after the photos.

## 6. Photos and Prompt 2 (2026-10-09, on the user's machine)

The cloud could not download from Unsplash; here it could. The 24 picked originals fetched into `media-src/` and fitted
over the temporary files at their exact sizes (Python PIL, `fetch.sh`'s crops). The six "pad" photos (wide frames of
plates filling their height) gave no clean 2:3: centred crops cut the plates, a stretched or blurred ground showed its
seams. Six portrait-friendly plate photos were picked instead (`picks.json`, `SOURCES.md`, `fetch.sh` updated); three
were cropped by hand around the plate. The night run's session lives in the cloud, so Prompt 2 went to a **new**
isolated session (`claude -p`, Claude Opus 5.5, `--setting-sources project,local`, outside the repository), with a first
line saying the site is already built and two fixes the user asked for that day (decision 53):

```
The site in this folder is already built from its Build Package (read CLAUDE.md first).

My photos are in public/media/ now, under the same names, except the product pages' second and third views and their close-ups, which stay temporary until I shoot them. Update src/config/assets.ts and assets/manifest.json: status 'have' for every replaced file, no Temporary badge on those, centre crops again, and alt text from what each real photo shows (media-src/picks.json → alt, by key). Where a real photo shows a colour or shape the copy does not (a product's glaze, a mug's size), tell me rather than change the product.

Check every page with the photos at 1440 and 390, run the production build, and before your final reply stop any dev server you started — do not leave one running.

Two more fixes that must hold everywhere on the site:
1. No letter is ever cut. Line reveals (.line-mask or any overflow-hidden/clip box around text) and tight line-heights must leave room for descenders and accents: about 0.15em above and 0.3em below inside the mask, cancelled by the same negative margin. Check every heading in the display face with letters like g, y, p, j at 1440 and 390.
2. Everything clickable shows the pointer cursor: buttons, tabs, toggles, menu items, cards and tiles with a click; disabled ones show not-allowed. Tailwind v4 gives buttons the arrow, so set it in the base styles.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3023 for the dev server. Never remove or change the turbopack.root line in next.config.ts.```

Finished (78 turns, ~16 min, $3.92 reported): photos marked real (each product's second and third views and close-up
stay temporary for the owner's shoot; the grid's hover swap waits for a real second view); line masks with room for
descenders (measured on every page), a close-up no longer covering "belly" and "dip", the newsletter heading set in
three lines; the pointer on every clickable thing. It re-centred the three hand crops ("centre crops again"), which cut
the yellow plate — Claude put the hand crops back (`media-src/handcrop-*.jpg`). It listed where the photos show what
the copy does not (glazes and shapes of the six products) and changed nothing: the products are the owner's.

Moved back, live export rebuilt, click-through checked in a real browser (no failed requests, every button shows the
pointer); card and poster replaced.

## 7. A first screen of layers — Prompt 3 (2026-10-10, on the user's machine)

The user tested a new first screen in a preview page (OpusKit session, 2026-10-10): instead of an AI film, one still
made in Google Flow, cut out (`media-src/SOURCES.md` → heroMug) and moved by code — a giant word behind, the photo in
front, depth from the layers. Two tries before it looked natural: a 3D pointer tilt read as a cardboard cut-out, and a
WebGL relight from a depth map looked fake ("flash") because the photo already carries its own light. The user: apply
only this first screen to Pip & Kiln (not the physics shelf). A new isolated session (`claude -p`, Claude Opus 5.5,
`--setting-sources project,local`, `--permission-mode acceptEdits`, Bash/Read/Write/Edit/Glob/Grep, the project moved
outside the repository):

```
The site in this folder is already built from its Build Package (read CLAUDE.md first).

Change only the Home first screen (src/components/home/ProductStage.tsx and what it needs). Keep every other page and section as it is.

public/media/heroMug.webp is the Morning Person Mug in its Raspberry glaze, cut out on a transparent background. Rebuild the first screen from layers, not from a photo on a ground:
1. Behind: the word MORNING in the display face, as wide as the screen allows — it must fit whole, no letter cut, at 1440 and at 390 — centred vertically, in the text colour, aria-hidden. The h1 stays the real headline.
2. In front: the mug, centred, covering the middle letters of the word, floating gently (a few px up and down and a few degrees of lean, about 5–6 s, alternating), with a soft shadow below it that grows and shrinks as it floats.
3. Pointer (fine pointers only): the mug drifts toward the pointer (up to about 35 px) and leans (up to about 6°); the word moves a little the other way. The mug is a flat photo: it never turns in 3D — no rotateX/rotateY, no perspective tilt, no added light, shine or highlight on it (all of these look fake on a photo).
4. Scroll: the first screen stays pinned for about 2.3 screens; the word slides left fast; the mug rises slowly, rolls in its own plane (up to about 16°) and shrinks a little; the headline, its line and the actions fade out, and a second line arrives in the display face: "Thrown on Tuesday. Glazed loud." (put it in the copy deck, src/content/home.ts, marked PLACEHOLDER).
5. The headline, its line, the price and Add to bag sit at the foot of the screen: headline and line on the left in the heading face, the action on the right. Keep the existing add-to-bag behaviour and price. The starburst, sticker, badge and disc go: the giant word and the mug are the whole picture.
6. Phones: the word just above the middle with the mug covering its top half; headline, line and action below; no pointer effect; the scroll effect lighter.
7. Reduced motion: nothing floats, pins or moves; the same layers stand still.
8. Register heroMug in src/config/assets.ts and assets/manifest.json (status 'have', alt "The Morning Person Mug in Raspberry: a raspberry glaze dripping over a sunflower-yellow rim"); leave hero.jpg where else it is used.

Check Home at 1440 and 390 (top, mid-scroll, end of the pin) and that the rest of the site is unchanged, run the production build, and before your final reply stop any dev server you started — do not leave one running.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3023 for the dev server. Never remove or change the turbopack.root line in next.config.ts.
```

Finished (31 turns, ~4.7 min, $1.36 reported): the word fitted to the width from its own measure (no layout shift), the
mug floating and drifting in its plane only, the scroll roll ending with the mug upright "as if set down", actions
unclickable once faded, phones lighter (1.5-screen pin), reduced motion still. It noted that Add to bag still added
the Sunshine glaze while the picture shows Raspberry, and that hero.jpg is now unused (left in place). Reviewed by
Claude at 1440 and 390 (production build, no overflow, the other pages unchanged).

Prompt 4, the same session resumed (`claude -p --continue`, same flags):

```
The first screen shows the Morning Person Mug in Raspberry, so its Add to bag adds the Raspberry glaze. Run the production build, and before your final reply stop any dev server you started.
```

Finished (3 turns, reported $1.47 with the resumed context): `add(p, 'Raspberry')` on the first screen; lint and production build pass.

Moved back; live export rebuilt (`/live/pip-kiln`, media pointed at `/examples/pip-kiln/media/`), click-through from the
menu checked in a real browser (the mug loads, Shop renders, no 4xx; only aborted link prefetches); card and poster
replaced with the new first screen; `npm run examples`, `npm run check` ✓.
