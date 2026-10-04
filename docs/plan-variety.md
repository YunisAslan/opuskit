# Plan — variety and beauty (2026-10-04)

The user (2026-10-04): the kit repeats itself — forms, but "everything, not only forms" — some palettes feel dated, and
the engine should get more variety and beauty, **not more weight**. Five research reports back this plan:

| Report | What it found |
|---|---|
| `docs/research/2026-10-04-repetition-audit.md` | Sameness comes from the shared frame and the defaults, not a small catalogue: 39/40 sections hardcode one container, 29 the same padding, 19 are 12-col splits; only 2 sections leave the page ground; footer `signature` for every look; 14/15 packages share one voice; `SectionHeader` forced into every recipe; one reveal on every site; 6 big ideas → ~6 signature sets; 5 paths end on a giant brand name; 28/77 default pages end on contact-cta; several near-duplicate sections and pieces. |
| `docs/research/2026-10-04-use-cases.md` (175 sites, 18 kinds) | Real sites lay out the same job many ways (services 30, featured-work 29, testimonials 27…); ours have one look each. 64 prioritised section variants; few truly new things; per-kind default fixes. |
| `docs/research/2026-10-04-colour.md` (139 sites) | Award sites keep colour off the ground (86% neutral grounds); colour lives in media or one small accent; coloured grounds go all the way. 11/42 of our palettes sit in the greyed mid-tone band that reads dated — caused by our own "grounds ≥ 0.06 apart" rule. Audit: keep 24, tune 11, retire 7; Set A (13) passes today; Set B (5 neutral) needs a relaxed rule. Fit-based palette choice. |
| `docs/research/2026-10-04-typography.md` (225 sites) | The current award look is one neo-grotesk, huge and **light**, tightly tracked; ours are almost all 700–900. Keep 33, tune 9, replace 4 in place, add 11. |
| `docs/research/2026-10-04-awwwards-collections.md` (127 collections, 154 sites, 349 element videos) | 30 transferable ideas: 13 new, 18 better versions of ours. Wordmark footer variants, mad-lib contact form, index footer, status-bar nav, etc. Awwwards' own collections are dated (2016–21); the live signal is SOTD/SOTM/SOTY and element collections. |

## Principles

- Fewer, better parts: merge near-duplicates into one section with **2–4 visually distinct variants**.
- Break the shared frame before adding anything.
- Every change keeps old plans and built examples opening (legacy maps, pinned colours).
- `npm run pieces` + `npm run check` after each step; check.ts grows a guard for each rule we add.

## Phases (each needs the user's OK before it starts)

**A. Frame (biggest win, no new parts)**
1. Layout tokens (`--container`, `--gutter`, `--section-y`, `--ratio-card`) written from the chosen layout; all sections use
   them instead of the hardcoded 1440 / py-24 / 4:5.
2. A `tone` prop on every section (ground / surface / inverse / chapter); the engine gives each page a rhythm.
3. Media placement (`side | full | over`) on the image + text sections.

**B. Defaults that make every recipe converge**
4. A voice per look; footer recommended per look; each big idea gets its own ending; `SectionHeader` and chrome rows out
   of the forced components; a reveal vocabulary per family; per-page endings instead of contact-cta everywhere.
5. Big ideas: `loud-and-quiet` photo-led; giant-word chapters from one idea only; signature moments not only from the idea.

**C. Merge + variants (sections)**
6. **Ask** = Reservation + Donate + Newsletter + a real contact form → variants book / write / subscribe / give (+ the
   mad-lib form from the Awwwards research as a `write` style).
7. **Steps** = Process + HowItWorks; **Name wall** = Clients + Integrations (Press redesigned as a pull quote); **Facts** =
   Stats + Trust; **Listing** = Menu + Schedule; **Statement** = Intro + Manifesto.
8. `layout` variants on the most-used sections (P1): testimonials, featured-work, services, stats, pricing, team, footer
   wordmark treatments (cropped, outline, pattern, over photo). P2 later: journal, categories, product-grid, collection,
   feature-rows, location.
   → 40 sections become ~33, each with more looks than today.

**D. Colour**
9. Retire 7 dated palettes (legacy map), tune 11, add Set A; relax the ground rule (grounds AND accents) and add Set B
   (neutral grounds) + a check that rejects greyed mid-tone grounds; `rankPalettes` — choose by fit (where colour lives,
   media brightness, warm/cool, kind). Pin the current colours of the 5 built examples that use tuned palettes.

**E. Type**
10. Replace 4 pairings in place, tune 9, add 11 — including the light, huge, tight grotesk the library lacks.

**F. Pieces (merge first, then one addition)**
11. WavyLink + ScribbleLink → DrawnLink; CutReveal → a TextEffect preset; one **Pinned** piece (sticky stage + progress)
    that the pinned/scrubbed signatures and scroll heroes point at.

**G. The few genuinely new things (only what a user would look for and not find)**
12. Product buy box + specs, project / article page types, two starter templates for real-estate / course / event; a
    status-bar nav and an index footer if the user wants them.

After A–C: rebuild two kit previews and one example (from its recipe, in an `-v2` folder) to show the difference.

## Progress

| Phase | State (2026-10-04) |
|---|---|
| A. Frame | ✓ `src/lib/frame.ts`: layout tokens per layout in every `tokens.css` and the kit previews; `tone` on every section (`TONE_CSS`, engine `pageRhythm`); `media` side/full/over on About, Location, ProductHighlight, EditorialStory, CaseStudy, FeatureRows. |
| B. Defaults | ✓ voice per look; `recommendedFooter` by family and big idea (only giant chapters ends on a giant name); `SectionHeader` and chrome out of forced components; section entrance per family (`ENTRANCE` in engine.ts: soft fade, clip reveal, hard cut, spring settle, decode) and no line reveal when a headline behaviour is picked; `footer-moment` speaks its big idea's ending; reveal-footer adds no wordmark; loud-and-quiet is photo-led (zoom-into-image + curtain-reveal); giant-word chapters only on manifesto, work, services, journal, menu; default pages end on their own part (contact-cta closes only Home, Contact and a listing's page). Built examples keep the footer they were built with (`example-specs.ts` reads it from their layout.md); moment clips are checked against the recipe they were built from. |
| C. Merge + designs | ✓ Merged components (section ids kept, so old plans, specs and examples open): `Steps` (process + how-it-works), `NameWall` (clients + integrations), `Statement` (intro + manifesto). Designs (`variant` prop; `src/data/section-variants.ts`, picked per family, owner's pick in the kit's Other designs tab → `spec.sectionVariants`): steps, statement, name wall, testimonials (lead/single/wall), featured work (staggered/index/grid/stack), services (rows/big/cards), stats (row/giant/ledger), pricing (cards/table), team (grid/large/list), press (grid/quote), contact (statement/write = mad-lib form/details); footer wordmark full/cropped/outline by family. Not done (low value for the churn): Ask merge (Reservation/Donate/Newsletter stay separate — the mad-lib form landed as contact `write`), Facts (Stats + Trust have different content), Listing (Menu + Schedule have different content). P2 designs (journal, categories, product-grid, collection, feature-rows, location) later. |
| D. Colour | ✓ Retired 7 dusty palettes (`LEGACY_PALETTE` maps them), tuned 11 (wet-concrete keeps its light ground, graphite ink), added 7 (grape-soda, signal-orange + the neutral set paper-cobalt, gallery-grey, sage-white, charcoal-signal, warm-black). check.ts: palettes collide only when ground AND accent are close; no dusty mid-tone ground; ink never tinted to another hue. `rankPalettes` / `recommendPalette` (engine.ts) choose by fit — where colour lives (lead), kind of site, the look's own pick — and the kit's Colours list is in that order ("Fits your site"). Colour role usage carries the award rules (accent is a signal, ink is ink, surfaces step). Built examples keep the colours they were built with (`example-specs.ts` pins them from their tokens.css as `customPalette`: aster-house, inkwell-moth, fennwood, hane, halvik). Not done: measuring uploaded media (brightness, warm/cool, hue) to refine the pick. |
| E. Type | ✓ 11 new pairings (plain-giant — the light huge grotesk —, cut-glass, real-ink, tall-order, signature, horizon, soft-wedge, projection, kind-words, dial, fat-chance), 4 replaced in place (parlour, wanderer, terminal-city, dream-logic), 4 tuned (dreamlight, loud-mix, neon-drive, sketchbook); offered on the looks the research names; unused font keys dropped. No built example uses a changed pairing. |
| G. New things | ✓ Sections `product-buy` (sticky / mosaic: pictures, price, one option as buttons, quantity, add to bag, details opening in place), `specs` (table / grid), `article` (title block, lead picture, reading column with break-out quotes and pictures, author card). Page types `project` (case study → gallery → specs → more work; portfolio, agency and studio start with it; their Work page became the index) and `article` (blogs start with it). Every product page starts with the buy box; a property page is gallery → specs → agent → similar homes; product sites get specs. Two more ways to start (`Purpose.starters`, the kit's first screen): Real estate → New development, Event → Festival or conference. Status-bar menu (`status-bar`: a thin line with a live note; experiments get it) and the index footer (`index`: every page in 3–4 columns; blogs get it). |
| F. Pieces | ✓ WavyLink + ScribbleLink → one `DrawnLink` (`stroke`), CutReveal → `TextEffect preset="cut"` — ids kept (examples, clips), one file each, a package ships a shared file once. New `PinnedStage` (pinned-stage): a held section with steps and a progress bar; pinned-proof and zoom-into-image build on it (`SignaturePattern.piece`), also offered as a moment. |
