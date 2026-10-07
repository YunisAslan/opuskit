# Review — engine gaps seen in Fieldhouse, Maison Vey and Halden

**Status: fixed the same day** (decision 30 in `docs/plan-library.md`; regression checks at the end of `scripts/check.ts`,
block "Engine review, 2026-10-07"). What changed is listed under "Fixed" at the end; the findings below are as found.

2026-10-07. Three sites made the Library + Build way (#17 Fieldhouse, #18 Maison Vey, #20 Halden) came out as their
recipes said, but each builder had to settle the same contradictions and fill the same silences. One read-only audit
per site compared the Build Package with the built code and traced each gap to the engine. Below: the gaps grouped by
cause, the sites that show each, and where it starts. Line numbers are from 2026-10-07 and will drift.

## 1. The asset layer ignores the shot list (all three — the biggest)

- `assetsConfigTs` (`build-packages/shared.ts:54-67`) makes one key per asset *requirement* ("Photography set",
  "Product photography"), each one file with `alt: ''`. The shot list (`engine.ts:893-907`) never feeds it. Fieldhouse
  shipped 2 keys and needed 28; Maison Vey 3 and needed 33; Halden 6 and needed 29. Every builder invented the keys.
- Counts disagree three ways: checklist "6–10 / 6–12 images" (`patterns.ts:106,145,118`), the shot list (≈30), the
  creation path ("front, 3/4 and detail for each product") and the buy box ("3–6 photos").
- `SHOTS` (`engine.ts:763-776`) has no row for product-buy, how-it-works (Cards with pictures), services; shots are
  per section, never per item (a Project page template gets one set for every project; Fieldhouse's four projects
  share their "how it was made" photos).
- The hero shot is generic ("the place, the thing it makes or the person") and ignores the hero's own `requires`
  (`engine.ts:901-902`): Maison Vey's product stage asked for "the product isolated on a clean surface" elsewhere.
- Status words: own products are "⌕ Find it" with Unsplash as a tool (`patterns.ts:145`), a recommended row becomes
  "find" even when the script makes it (`engine.ts:224-230`), and an optional `secondaryVideo` ships with no section
  using it (`patterns.ts:122`, `shared.ts:57`).

## 2. Two sources for the same number

- Frame: `tokens.css` (`lib/frame.ts:12`) says `--section-y: clamp(104px,13vw,196px)`, gutter `clamp(20px,3vw,44px)`;
  `layout.md` and `verification.md` say `clamp(120px,14vw,200px)` and 32px (`ingredients.ts:931-937`). All three
  builders rewrote the tokens. 120 and 200 are not on the recipe's own spacing scale.
- Ratios: tokens give 3:4 cards and media; shot list asks 3:2 for work, places and case studies; ProductCard 4:5.
- Film length: 5–8 s (`patterns.ts:44`), 15–30 s (`FILM_FORMAT`, `engine.ts:777`, borrowed from the whole-page film),
  5–15 s (`patterns.ts:118`), plus "trim to 5–8 s … loop" for a scrubbed film (`engine.ts:393,427,429`). The script's
  size budget then raises CRF to 24–30 without saying so (`video.ts:113-128`), against the promised CRF 20.
- Smaller: hero "portrait offset to columns 8–12" vs "100svh full-bleed" (`engine.ts:968`, `forcesLayout`); menu
  "4–6 links" vs "3–5 links" (`patterns.ts:904` vs `:422`); Process recommended `rail` but the reference call shows
  `columns` (`blocks.ts` usage strings ignore the picked variant); Collection gets two designs in one entry.

## 3. Rules that forbid the owner's own picks

- Halden's palette (charcoal ground, orange accent) is banned by its look's avoid list and by `GENERIC_TELLS`
  ("tinted charcoal", "near-black … orange accent") — `taxonomy.ts:431-432`, `patterns.ts:530`; `fitPicks` keeps the
  line (`engine.ts:936`). Verification cannot pass.
- Designs named "Numbered rows / Numbered steps" against "Absent: Numbered markers" (`patterns.ts:418,427,445,532`).
- "One unforgettable moment per page" next to "Signature Moments: None" (`markdown.ts:81`), even when the hero film is
  that moment.
- Footer "Dark band (text colour as ground)" comes out cream on a dark palette (`patterns.ts:882`, `frame.ts:27`);
  with an inverse Closing CTA, two light bands end the page.
- Scroll progress offered under "Whole site" but its rule says "long pages only, not the home page" (`pieces.ts:350`
  vs `:151`).
- The accent "for small caps labels" while small caps labels are a listed tell; "transform/opacity only" next to
  clip-path reveals.

## 4. Wrong-world defaults

- The base recipe follows the look, not the kind of site: an architecture studio and a perfume house both got
  `luxury-fashion` — fashion references, "Spacing signals price", "Romantic" (`plan.ts:378,483`, `engine.ts:980`).
- "Health & wellness" is a dental clinic: "Practice", "Meet your dentist", Treatments / Practitioners / Book an
  appointment (`taxonomy.ts:281-294`, `PURPOSE_COPY.clinic` `engine.ts:798`). No spa / bathhouse kind.
- Section content written for agencies: Testimonials "name and role", Process "working together … duration", Trust
  "trial, guarantee, insurance", buy box option "Colour", highlight "Materials, dimensions" (`patterns.ts:428-456`).
- The UI kit is per kind of site, not per section present: restaurant "party sizes", a date Calendar on sites with no
  date field (`engine.ts:739`), Pricing Tabs + Switch, slider and pagination for five products, dropdown menus with
  no sub-items — and `verification.md` makes every one mandatory (`shared.ts:80`).
- Motion patterns by level and lead only: "project thumbnail expands into the case study hero" on a bathhouse.

## 5. Silences every builder filled

- Forms: where a contact, booking or sign-in goes. All three invented a mailto hand-off and "accounts aren't open
  yet"; Sign In / Sign Up get "Standard sign-in" and an empty section order ("Sign In section order: .").
- Roles: no error colour in any palette (errors went into the accent), no caption type role (Maison Vey invented one).
- Cart and Checkout: "No composed sections"; the product model (sizes, samples, sets) unspecified.
- The goal's "every page ends with a contact prompt" is never applied to page sections (`taxonomy.ts:920`).
- `CLAUDE.md` points to `src/components/pieces/` "your kit" when no piece ships (`shared.ts:115`).
- Logo: "✎ Create it" with no direction (every builder drew one).

## 6. Defaults that caused fix rounds

- Fieldhouse fix 1 — Home photos hidden behind hover: studio/agency + motion picks "Names that reveal photos" for
  Featured Work and site-wide (`engine.ts:270,302`), media.md says "every gallery, lookbook, featured-work", and
  verification + plan step 6 enforce it. Decision 26 stopped it for galleries only.
- Fieldhouse fix 2 — the project's main photo small: `pageRhythm` gives the first media section on every page
  `media="side"` (`engine.ts:605-621`), whose design is a 3:4 card in 5 of 12 columns.

## 7. Type and film details

- `type-display` loses the pairing's italic; the serif's fallback is `sans-serif`; `--font-*` are not wired to
  next/font (`lib/type-tokens.ts:15`, `shared.ts:45`).
- Turbopack can fail on `next/font/google` ("queries have exactly one entry") depending on the network; a package
  could ship the faces through `next/font/local`.
- The scene map is required before coding even with `mediaPlan: 'temporary'` (`engine.ts:482-489`): Halden's four
  guessed scenes were all rewritten when the film came.
- One LCP target (2.5 s) whatever the first screen (`engine.ts:1028`): no word on which element is the LCP for a
  scrubbed film.

## Suggested order

1. Build the asset layer and the checklist from the shot list: one key per shot, per item where a page repeats
   (products, projects), with the shot's ratio, size and alt — the gap all three builders filled by hand.
2. One source for frame, ratios, film length and type: the recipe text reads the same values the tokens ship.
3. A pick-aware filter: drop avoid / tell / verification lines that forbid the owner's palette, designs or effects;
   footer and inverse bands decided by the palette's lightness.
4. Kind-aware defaults: base recipe and references by kind of site; a spa / bathhouse kind apart from clinic;
   section content and the UI kit from the sections actually present.
5. Fill the silences: a form hand-off rule (mailto / tel, said plainly), error and caption roles, Cart / Checkout /
   Sign In content, the goal's closing prompt on every page.

## Fixed (2026-10-07)

1. **Asset layer = shot list.** Every shot has a `key`, `count`, `ratio`, `size` and, on item pages, `per` (each product,
   project, article — `productPageBuy`, `projectPageGallery`); one part on several pages is one set of files; lists of
   other items on an item page share the main pictures. `assetsConfigTs` writes one entry per photo shot (files, width,
   height, ratio, alt from what it shows), the manifest the same; photo-set checklist rows (`AssetSpec.set`) take their
   count from the shot list (`fitSets`); optional rows stay out of the asset layer. Shot sizes follow what each ready
   section takes (one image for About, Location, Editorial Story…), new rows for the buy box, steps with pictures,
   journal, categories, article. Own products are "Create it", not stock.
2. **One source per number.** Layout text is written from the frame tokens (`lib/frame.ts`): container, gutter,
   section spacing, card and media ratios; shot ratios follow the same tokens (21:9 for a full-width band); the hero
   composition is the hero's own. Film length is one value per film hero (`FILM_LENGTH`: ambient 8–15 s loop, scroll
   10–20 s not a loop, whole page 15–30 s) everywhere; `prepare-video.sh` gives a scrubbed film a budget by length and
   warns (⚠) when it has to soften it. Reference calls carry the picked design's `variant`.
3. **Pick-aware rules** (`fitTells`): avoid / do / principles / generic tells / references that forbid the owner's
   ground or fonts are left out. "Numbered" designs renamed; the gallery rail has no running count; the award checklist
   names the first screen as the page's moment and "Signature Moments" no longer says "None" beside a film. A dark
   palette keeps its footer on the ground (`light`), and the closing part takes the surface when the footer is an
   inverse band. Reading line: one site-wide rule. Animation rule allows clip-path.
4. **Kind-aware defaults.** New kind `spa` ("Spa & bathhouse"); `clinic` is "Clinic & therapy" (Halden re-filed to
   `spa`, Hane stays a clinic). References lead with one of the site's own kind; a seed's references about another kind
   are dropped. Section wording neutral (testimonials, process, trust, product highlight, buy-box option, booking form).
   The UI kit only lists what parts use: no tooltip, navigation/dropdown menus, slider, pagination or one-time code;
   Closing CTA has no form; a monthly/yearly switch only where subscriptions are sold; the calendar rule only with a
   date field. Hover preview only on sites with a list to hover. Featured work never hides its photos by default, and
   a case study opens its page full width.
5. **Silences filled.** A form hand-off rule (mailto, said on screen; accounts "not open yet"), `--color-error` (AA on
   the ground) and `type-caption`, a copy deck for Cart, Checkout, Account, Sign in / up, 404, Privacy, Terms, the
   contact goal no longer promises a closing prompt on every page, `CLAUDE.md` names the kit folder only when it ships,
   a logo direction (a wordmark until the owner's own). Type roles carry italics and a serif / mono fallback; font
   tokens read the next/font variables; the plan says how to get past Turbopack's Google Fonts error. A scrubbed film's
   scene map is a stub until the film exists; a film site's LCP is measured on its poster.
