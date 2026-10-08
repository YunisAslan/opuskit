# Plan — OpusKit Library

The current direction (agreed with the user 2026-10-05; **the flow as it stands is decisions 33–38** — Library → You → Direction → Recipe; sections 2 and 2a below describe the earlier Brand / Pages flow). It replaces the kit as OpusKit's front door. This file holds the
model; the prototype and the test plan come next and will be added here. Keep the **Decisions** and **Open** lists current.

## 1. Why

- The kit puts people in a frame and on a long road: colours, then type, then pages, then sections. Most people don't
  want to make design decisions in a form; they want to see things they like and take them.
- The user, thinking as someone who wants a portfolio: talking a site into shape with Claude is tiring; Wix/Envato
  templates feel old; Aceternity, Magic UI and 21st.dev mean picking and copying every piece yourself, and keeping them
  coherent is on you. What would feel easy: **a place full of sites, sections and effects, filtered and searched fast,
  where you collect what you like and get a guided prompt for the kind of site you want.**
- Relume (tried 2026-10-05) does a similar thing — a sitemap and pages from its component library, many options per
  section, Figma-style editing — but it is slow (it generates everything with AI, ~5 minutes) and shows grey wireframes.
  Framer templates are the shortest road to a modern portfolio today. Both are the competitors to beat.
- **OpusKit's edge: you see what you'll get before you build it** — the finished site, in colour, with its type,
  movement and real examples, not a wireframe. Our engine is deterministic and our sections are real components, so
  this preview is instant.
- Don't build a free-form, Figma-style editor: Relume, Framer and Webflow have won that, and it turns the person back
  into a designer. Choices happen on OpusKit; fine edits happen in the agent after the build.
- Research behind this (2026-10-04): `docs/research/2026-10-04-landscape-builders.md` (23 products; Relume, Framer,
  shadcn registries, 21st.dev), `-demand.md` (freelancers and studios feel the sharpest pain; free rules alone don't
  sell; Tailwind's revenue fell as agents bypass storefronts — so value must reach the agent, not stop at a gallery),
  `-analogies.md` ("procedural oatmeal": things that differ on paper look the same — only put on the shelves what the eye
  can tell apart), `-business-models.md`.

**Core vs door.** OpusKit changed its front door three times (questionnaire → kit → library); the core never changed:
the knowledge base (`src/data/`), the engine (`composeRecipe`), ready sections and pieces, the `check` rules, the Build
Package. The core is the long-term investment. A door is an experiment: built cheaply, tested, replaced if it fails.

## 2. The flow

```
DISCOVER → COLLECT → BRAND → COMPOSE → RECIPE → BUILD (zip)   [REVIEW later]
(as built 2026-10-06: browse Discover, then build Brand → Pages → Recipe; Collect is the header sheet, Build is the recipe page — §2a, §4)
```

### DISCOVER
- **The person:** browses, filters, searches. Optionally picks the kind of site first (Portfolio), or filters by it later.
- **Sites only** (decision 20, 2026-10-06; it was three shelves — Sites, Sections, Effects). Parts are taken on a
  site's own page; effects are picked on a part in Pages; whatever no site has is in Pages → All parts.
- **Shelves lead into each other:** on a site's page every section has a "+" ("take this site's footer"); a section's
  card shows which sites use it. Real sites become the shop window for sections, so every built site works twice.
- **Exists:** `SectionPreview` (six worlds, `worldFor`), section designs (`section-variants.ts`), `PieceDemo`,
  `MenuDemo`, `LinkDemo`, `DualShot`, the example sites and their clips (`src/data/examples.ts`).
- **Volume:** we can't win on count (21st.dev has thousands). We need enough per kind of site to feel rich, and rendering
  multiplies it (one section × worlds × looks). Whole sites can be engine-rendered from recipes in seconds; built
  examples stay as proof.

### COLLECT — the **Collection**
- Free first: anything from any shelf goes in.
- Rules work quietly in the background (`pieces.ts`: one per kind, a limit on heavy effects; menu ↔ footer fit). They
  never block: a small note on the card ("these two work in the same place — you'll pick one in Compose").
- Missing parts are not filled here, only mentioned softly ("a portfolio usually has a contact part — we'll add one").
- **A whole site in the Collection** changes the page: "Start from this site → Compose" becomes the main action, and the
  other items show as additions on top of it.
- Stored in the browser first, like the kit's plans (`src/lib/kit.ts`).

### BRAND — between Collect and Compose
- A short "About you": name and kind of site (carried over if picked in Discover); logo and photos optional — with
  photos, palettes are offered by fit to them (`rankPalettes`, the colour research's fit algorithm).
- **Style is not a separate question.** If the Collection mixes looks, it is asked here: "your picks come from three
  looks — which feels like you?" This is where looks are unified.
- Skippable: carry on with sample content to see the result fast. The kit's "About your site" moves here.

### COMPOSE
- Simpler than the kit: the person has already chosen, section by section or as a whole site.
- **The engine:** fills pages and missing sections for the kind of site, brings the Collection to one look, places the
  effects on fitting sections, shows the assembled site live.
- **The person:** per section only three actions — swap (other designs), remove, move. Effects come from the
  Collection; the engine places them.
- The full kit opens from an "Edit in detail" link, for people who want more.
- **Exists:** almost all of it, in the kit — `KitPlan`, `src/features/kit/plan.ts` (`start`, `swapOptions`,
  `replaceSection`, `piecesFor`), Pages → Other designs.

### RECIPE
- A summary of the site the person can read and approve: pages, sections, look, movement, big idea, and **what you
  picked vs what we added, and why**.
- Its own step for now (decided 2026-10-05); whether it shares a screen with Compose is decided later from the flow.
  The two must stay strongly linked: a change in either shows in the other.
- **Exists:** `composeRecipe`, the result page (`src/app/result/[id]`), `check.ts`.

### BUILD
- The zip first (the Build Package, `src/features/build-packages/`). Plugin, MCP or registry later.
- The weakest part today is the road from zip to a working site, so at minimum: a one-line first prompt inside the zip
  ("open Claude Code and paste this") and the same prompt with a copy button on the download page.

### REVIEW — later
- Screenshot the built site, compare it with the recipe, send differences back to the agent as fixes. It is the
  guarantee behind "see what you'll get". Kept in the model; designed once there are first results.

## 2a. Built (2026-10-05)

Flow: browse **Discover**, then build **Brand → Pages → Recipe** (decisions 13, 17). The Collection is not a step: it opens from the header (a side sheet). The
recipe page is the end — it downloads the Build Package and takes your files — so there is no Build step. The kit is no
longer on the way (still at `/kit`).
- `/library` — Discover: the built sites only (decision 20). No sidebar: above the cards two filters alike, each a heading
  with its chips under it — Kind of site, Feel — several can be on at once; no search (16 sites); four cards a row on wide screens. Name + one fact per card; + collects, the picture opens the site's page.
  `/library/sites/{example|seed}/{slug}`: a site's parts in its own look, each with +.
- The Collection chip in Discover's steps bar opens the sheet (look and remove only): items grouped, quiet notes,
  remove with undo. Discover's **Next** builds the pages (`planFromStudio`: rebuilt only when the Collection changed; `KitPlan.via =
  'studio'`). Toasts only when a rule speaks. `/studio` redirects to Pages.
- `/studio/pages` — Pages: the site's name and one sentence as the page title (typed in place); "What are you making?"
  only when nothing says it; "Start from" when several sites were collected. A start site's pages, else the kind of
  site's; "Usually also there", Add a page, Your own page. Each page's parts, placed by the engine: move or remove only
  (decided 2026-10-05), controls on hover; "From your Collection" marked. Back / next in one bar at the bottom.
- `/studio/brand` — Brand (was Style; now the first step, decision 16): colours first, then lettering — eight of each (what fits leads, "Fits your site" / "Made for
  this look"), **Show more** adds twelve, so the lettering below is never buried (Light/Dark, Serif/Sans/Expressive
  filters). Beside them (`UsedOn`) a **style tile** at full size — not a page shrunk to a thumbnail, and no outside sites
  (decided 2026-10-05): your name and sentence as headline and paragraph in your faces, the main button and a link, a
  card on the surface, a real photo (the start site's own first picture, else the look's curated one), an inverse band,
  the palette with hex and contrast; under it OpusKit's built sites with the same colours or lettering.
- Recipe (`/result/{id}`): its actions (Save, Unlock, or tool + Download) sit in the steps bar on top, like Next on
  the other steps — no bottom bar; every Change leads to Pages or Style; its Your files tab takes logo, photos and
  video.
- **One road, one bar** (2026-10-05, after "I have to press the Collection icon to go on"): every step opens with the
  same sticky bar under the site header (`FlowBar`) — left the four numbered steps (done ones are links back), right
  the Collection chip (its last items, count, bump; opens the sheet) and **Next: …**. It is the first thing seen on
  arrival and never scrolls away. The Collection lives only there; the header's button reads **Continue · n** once
  something is collected. Discover's Next is on once something is collected or the kind of site is picked.
- Logic: `src/features/library/collection.ts` (pure, tested in check.ts); storage: `src/lib/collection.ts`.

Not yet: Recipe's "you picked / we added"; shape, menu/footer look, movement, big idea and behaviours are not editable
outside the kit; the home page copy still describes the kit; examples' "Customise in kit" and saved recipes still open
the kit.

## 3. Testing with agent personas

The user's idea (2026-10-05): test with agents playing users, each given a persona file.
- **Good for:** where people get confused, whether they can finish the task, what they look for and can't find.
- **Not good for:** taste, boredom, willingness to pay — models tend to be optimistic and share the same "average
  taste" (the sameness we are fighting).
- **Rules:** each persona is a fresh agent that knows nothing of this repo or its docs and sees only the site through a
  browser. Personas: a freelance developer, a designer who doesn't code, a small studio, a café owner, a student making a
  portfolio. Before a final decision, at least one or two real people.

## 4. Decisions (2026-10-05)

1. Flow: **Discover → Pages → Style → Recipe**; Review later. (The first model — Collect, Brand, Compose, Build as steps —
   was tried the same day and simplified after the user used it.)
2. Three shelves (Sites, Sections, Effects) that lead into each other. Shelves are samples: they never take the
   visitor's colours or type. Little text, concrete: a name and one fact per card.
3. The cart is called **Collection**: free, rules suggest quietly and never block. It is not a step — a chip in the steps
   bar (its last items and a count that bumps) opens it as a side sheet. The separate Studio page was dropped ("it is
   not clear what it is for").
4. Name and one sentence are the title of Pages; the kind of site is asked only when nothing says it; "Start from" only
   with several sites.
5. Pages: pages from the start site or the kind of site, with suggestions and your own page. Parts: move or remove only.
6. Style: colours and lettering only, all of them with filters, what fits first; the preview shows Home only.
7. Your files (logo, photos, video) belong on the recipe, where it says what the site needs — not in Style.
8. No Build step: the recipe page downloads the Build Package (zip first; plugin/MCP/registry later).
9. Controls go where they are needed, not everywhere: row controls on hover, back/next in one bottom bar, the picture of
   a card collects it.
10. **One road, one bar**: the four steps are visible from the first second in Discover, in one sticky bar under the site
    header on every step — steps on the left (done ones link back), Collection and **Next: …** on the right. No second
    way in (the header's Collection icon was removed; its button reads "Continue · n" once something is collected).
    Next sits in the same place on every step.
11. **One job, one place**: collecting happens only in Discover — the Collection chip is only in Discover's bar, and its
    sheet is for looking and removing (no Next inside). The one way on is the bar's Next. Pages says where the
    Collection went ("From your Collection: 5 of 6 on your pages", and what waits and why — `placement`).
12. (Replaced by 20.) **Discover browses with a sidebar on wide screens** (2026-10-05): the three shelves,
    and under the open shelf its groups with counts — a group works like a category: a click shows just that group from
    the top ("All" shows every one); no scroll-spy or jumping, which felt jerky. Sites: the feels and "Built and live
    only". Phones keep the same as chips and tabs across the top. Cards collect with a click on the picture.
    It reads like a documentation sidebar (the user's reference: the Next.js docs): one type size (14px), weight and
    colour for rank; shelves as plain rows with a chevron, each opening and closing on its own (not an accordion — all
    start open); their groups indented on a thin guide line, the picked one in the accent with its stretch of the line
    lit, sliding to the next pick, also across shelves (a group in another shelf opens that shelf on it); the cards fade in when what is shown changes; reduced motion
    turns it off. Its scroll is quiet (thin, no track, the list kept clear of it). The kind of site is never asked in
    Discover: it is an optional "For …" filter of chips above the cards (it puts that kind's sites first and marks the
    sections it usually has); Pages asks only if nothing says it. Names in sentence case ("Testimonials — one leads"), site names without their tagline.
13. **Browse, then build** (2026-10-05): Discover is not a step — no steps bar, nothing to finish; you browse and
    collect. The Collection is the cart, in the site's header on every page (one button: last items, count, bump; the
    first thing collected says once "Keep browsing. Build your site from the Collection when you're ready"). Its sheet
    ends in **Build my site**, the one way from browsing to building. Building is three steps — **Pages → Style →
    Recipe** — with the steps bar ("← Library", the steps, Next). The header's "Start a site" shows only while the
    Collection is empty. This replaces decisions 10 and 11 where they differ.
    The sheet is wide (38rem) and made to lead on to building: your start site large, then parts and effects as
    pictures in two columns (remove on hover), the quiet notes, **Clear all** (with Undo); at the bottom one line of what
    Build will make ("9 pages in Scandinavian Minimal · 3 parts · 2 effects"), a big **Build my site**, and the three
    steps it leads to. Toasts come from the top, under the header.
14. **Many sites, one site** (2026-10-06): sites are collected like anything else ("Collect", not "Start from this");
    Pages starts from one of them ("Start from" chips) and a third column, **Your Collection**, lists the parts of the
    other collected sites (in their own look and design) and the collected parts not placed yet — each added to the open
    page with +. Every part row carries what belongs on it: **Add an effect** — a large picker that shows each effect
    moving (a real site's recording where there is one, else drawn in your look), grouped by what it does, one per group
    (picking another swaps it), collected ones first — **Your photos** (photo and media parts, an image first screen) and **Your film** (a film first screen);
    uploads remember their part (`UploadedAsset.place`, written next to the file in the build's asset list).
15. **Style in three columns**: 1 your site (name, one sentence — moved here from Pages), 2 colours then lettering, 3 the
    example in your picks, marked "Example · how your site will look", with little text.
16. **Brand first** (2026-10-06): building is **Brand → Pages → Recipe**. Brand (was Style) comes first so Pages
    already shows your colours, type and name; it is the quick, rewarding step, and Pages — the longest — leads straight
    to the recipe. Brand is three columns side by side (from 1024px): 1 your site — name, one sentence (what
    visitors should do is never asked: it is read in the background from the parts and pages, `inferGoal` — a buy box
    means buy, a booking part means book, a donate part means donate, else the kind of site — and becomes the example's
    main button); 2 colours, then lettering; 3 the example, marked as one.
    Build my site opens Brand; `/studio/style` became `/studio/brand`.
17. **Sites are inspiration, not a base** (2026-10-06, replaces "Start from"): one collected site gives its own pages;
    several are **mixed** — the kind of site gives the pages, and each part is taken, in its design, from a collected
    site whose page of that kind has a part doing the same job, spread so every site gives something (`blendPage`); a
    part no site has stays the engine's. On Pages each page says **Made from: All your sites · Sela Mor · …** — picking
    a site makes that page follow it (`pageLike`, remembered as `Collection.like`); every part says "From Sela Mor"
    (`PlanSection.from`). The Collection panel lists every collected site's parts to add by hand. The look until Brand
    comes from the first site. A page never gets one part twice (2026-10-06: Fennwood + Velmira gave Home two
    Reservations — two parts doing one job each became the same part; check.ts now mixes every pair of sites).
18. On Pages each page opens with the **Menu** and ends with the **Footer**: locked in place (🔒, the same on every page,
    their style named), never moved or removed; **Shown / Hidden** leaves either out of one page (`toggleChrome`,
    written into the recipe and QA). Either row is picked like a part (a click on it): the right column then offers
    Other menus / Other footers, tap to swap — for every page at once.
18c. **Brand scrolls without losing anything** (2026-10-06): Show all opens a whole list at once; each list's heading
    and filters stick under the steps bar while it scrolls by; the example never scrolls on its own — on short screens
    its card row steps aside so it always fits beside the lists. Column one is only your name and one sentence (no logo,
    no summary of picks, no built-site strip: holding the example in place was enough).
    A picked colour or lettering stays where it was clicked: each list's order is set once, when Brand opens (the
    pick then, what fits, the rest), never re-sorted by a new pick.
18d. **Pages is built to be played with** (2026-10-06): what is collected later **joins** the pages as arranged
    (`applyItems`, adding, never replacing; a new site's parts wait in the panel); pages are rebuilt only when the kind
    of site changes. Parts are dragged to reorder (or arrows), removed, and **picked**: the right column then offers
    the picked part's other designs and the other parts doing its job — for the first screen, the other first screens
    (how a film start becomes a photo start) — tap to swap in place. Below, everything collected: parts, first screens,
    effects, menu and footer, each site's parts — dragged onto the page (a part to a spot, an effect onto a part, a
    first screen onto the first screen) or added with +; whatever lands scrolls into view and glows. Suggested pages
    lead the searchable Add a page list. A part is titled by its name everywhere on Pages — on the page and in every
    panel list — with its job (and design) under it ("Testimonials / Build trust · One leads"); All parts is grouped
    by job. Thumbnails everywhere keep their own colours; only Brand's example takes
    yours. Brand starts on the first site's colours and lettering, marked "From QUM", and says so.
18e. (Replaced by 20.) Discover: a picture opens a closer look (large, its designs to flip through, the real sites that have it, an
    effect moving on a real site); + collects.
18f. **Browse like a shop, build with one button** (2026-10-06): no steps or numbers in the Library (they clashed with
    the building steps). Under the title one line says the rule: "Take a few sites and any parts you like — several
    sites are mixed into one site." Once something is collected, the header shows the Collection and, beside it, the
    one way on — **Build my site** (later **Continue building**, back to the step last open, with what was newly
    collected already on the pages) — like a cart and its checkout. The Sites shelf shows built sites only (the drawn
    recipes are gone). On Pages: the page's name is typed in place; one line says thumbnails keep their source site's
    colours and the site takes the Brand colours; each collected site's parts are folded per site, its page of this
    kind first ("From QUM · its home page"), the rest under "More from QUM".
20. **Discover shows sites only** (2026-10-06). Three shelves side by side (Sites, Sections, Effects) gave three sizes of
    thing the same weight — a newcomer has no idea yet what a "part" or an "effect" is — with three filters at once
    (feel in the sidebar, kind as chips, search) and a 30-row sidebar. A part out of any site looked generic; an effect
    collected without a part had nowhere to go. Now there is no sidebar (for 16 sites it was more rows than cards): above the cards two rows of chips, both alike (the
    user's call: chips laid out flat, not a select) — **Kind of site** and **Feel**, each a heading with its chips under it,
    related options side by side (no separators, no search — the user's calls), only options some site has. The top is kept light: the title "Collect. Customize. Build." — the three things the person does, in order — with one line under it
    ("Pick the sites you like — we merge them into one. Make it yours, then build it." — about sites, since Discover
    collects sites; short, no list of what changes), small chips, no divider, so the first sites show
    without scrolling. Each card plays its site's recording while on screen (no hover needed; still with reduced
    motion; a site not recorded yet shows its screenshot). Over the picture, top right, two small round buttons: expand
    (the recording large with controls — or, for a site not recorded yet, the live site in a frame — with "See its
    parts" and Collect) and + (collect; a tick once collected). Several of
    each can be on at once (a site shows if it matches any picked kind and any picked feel). Exactly one kind picked is
    kept by the Collection as the kind of pages built; none or several leave it to the sites collected. A site's parts are taken on its own page, in
    its own look; effects are picked on a part in Pages (one place); Pages' right column ends in **All parts**
    (searchable: first screens, menus, every section, footers — one design each, the others a pick away under Other
    designs) for anything no collected site has. The closer-look dialog (18e) went with the shelves.
18b. (Replaced by 20.) Discover's "For" filter: every kind as a chip, wrapping onto the next line (no sideways-scrolling row, no "More").
19. New example sites (#17–#20) are on hold (`docs/plan-examples.md` §5).
21. **What you see is what you get** (2026-10-06, from the first real site built through the Library — `examples/yunisaslanov/`,
    started from Inkwell & Moth). Its build carried things the owner never saw: the start site's link hover (Hand-drawn
    underline), a big idea the engine picked ("Loud covers, quiet reading") with its signature moment, a second typeface
    (IBM Plex Sans, the pairing's text face) and a Testimonials design other than the one Pages showed. Now:
    - Pages ends with **On every page** — Headlines, Links, Main button, Between pages, Whole site — each row saying what
      it is now (the start site's picks show here), × to take it off, a click to see the options moving in the right
      column (`behaviours`, `setBehaviour`, `toggleSitePiece`).
    - A Library-built plan gets **no big idea it did not pick** (`planToSpec`: `concept` is 'off' for `via: 'studio'`
      unless set), so no unseen signature moments or cover rules reach the build.
    - Pages draws every part in the design the engine will build (`variantFor` by the look's family when none is
      picked), and names it ("Build trust · One big quote").
    - Brand's lettering tiles show both faces of a pairing: the headings and "Text in IBM Plex Sans".
    - The recipe speaks to the builder only: pieces' rules no longer carry "suits these directions" lines (the Dithered
      pattern's now says it is the section's background, edge to edge — never a small card or tilted print); every
      recipe's Avoid list bans text in blend modes over photos and effects nobody picked.
    - Sections: Testimonials redesigned (label column, a big accent quotation mark, an accent rule before each name, the
      rest as cards under the quote); Trust strip fuller (ruled columns, heading and text sizes); Name wall's split
      design lost its initial-letter tiles (letters standing in for logos).
22. **References, not parts to paste** (2026-10-06, from the yunisaslanov menu: links in a condensed Plex, 13px and 4px
    higher than the logo and button beside them — the pairing's narrow label width, the drawn underline's padding and
    shadcn's own button size, each correct alone, pasted side by side). The Build Package now tells the builder that the
    code in `src/components/sections/` and `pieces/` shows each part's design and does the hard work, but every part is
    built as this site's own: its sizes, spacing, type and alignment come from the site, and the code is edited wherever
    it disagrees. Every package's QA carries three **one system** checks (`ONE_SYSTEM` in `shared.ts`): things of one
    kind look alike, every row lines up, nothing looks pasted in — and a last look at each page as a stranger would.
    Behind it in the core: the drawn underline takes no room; a pairing's label role in its body face keeps the body's
    width (check.ts; seven pairings changed); a button beside links is set like them.
23. **Change it where you click it** (2026-10-06, after "the effects and sections on the right and at the bottom
    leave people lost"): the right column used to do three jobs at once — the picked part's other designs, the
    Collection and All parts — so a click in the middle opened its choices far away, at the top of a scrolled column, as
    96px thumbnails with cut-off names. Now one **chooser** (`Chooser` in Pages.tsx) opens from whatever is clicked: a
    part (its row, or **Other designs** / **Other first screens** on it), the menu or footer (**Change**), a row of
    **On every page**, and **Add an effect** — all the same dialog: what it is now, marked **Now**, then every option
    drawn large (three across), its name and whole line, grouped (a part: its designs, then other parts doing its job,
    each with its "Best when…"). A tap swaps it at once with Undo; the chooser stays open to compare; Done closes. A
    part's options are drawn in that part's own look, so they compare like for like. The right column only adds:
    **Add to {page}** — the Collection, each site's parts, All parts. "Collect more sites in the Library" is gone (the
    header's Collection and ← Library already lead there).
    **On every page** became cards, not a settings table, and moved from under the footer (easily missed) to the top
    of the middle column, above the page's name — the whole site first, then this page: five small cards in a row,
    each showing its pick moving (links on the drawn footer, the plain underline when none), its name and how many
    options it has; the whole card opens the chooser (whose None is drawn the same way). Taking one off is its None.
24. **Toolbox left, page middle, pages right** (2026-10-06, the user's idea; replaces where 23 put On every page —
    under the footer it was missed, above the page it was in the way). Pages reads like a design tool: the left column
    is the toolbox, two tabs and one search — **Parts** (your Collection, each collected site's parts, All parts) and
    **Effects** (**On every page** first, one row each with its pick moving and its number of options, opening the
    chooser; then **On one part**, every effect that goes on a part, grouped by what it does, collected first) —
    everything a picture, two across, dragged onto the page or added with +. A tab and groups keep it calm as effects
    grow. The right column is only the pages: a plain list (hover: up, down, remove) and one quiet **Add a page**,
    whose search also takes your own page ("Add “Studio notes” as your own page") — the separate "Your own page" form
    is gone. Phones: pages first, then the page, then the toolbox.
26. **The recipe speaks for this site** (2026-10-06; the user: a site is strong through its colours, type, where the
    words go, its photos and films — not a big idea, which was removed from the toolbox again). Reading a Library
    Build Package showed four weak spots, now fixed in the engine:
    - **Copy deck** (`contentDirection.copy`, recipe/content.md): what every part of every page says, from the owner's
      own name and sentence; the headline examples are marked as register from another site, never to reuse; invented
      facts are marked as placeholders. Writing it is the build's first step, before any layout.
    - **Rules fitted to the picks** (`fitPicks`): a look's do / avoid / principles lines about type, colour or corners
      are dropped when the owner picked lettering, a palette or a shape outside that look — no "pair a chunky serif"
      over a one-family sans.
    - **Shot list** (`media.shots`, recipe/media.md): each media part — first screen, film bands, galleries, about,
      location… — with what its picture or film shows and its format. The owner picks films from it; until media
      exists, a part uses a temporary picture of the same subject and format.
    - The summary reads as a sentence ("in the Organic Modern look: the Corner Bakery lettering (Young Serif with
      Alegreya Sans), the Limestone palette…").
    check.ts asserts all four for every seed.
27. **Start blank** (2026-10-06): besides starting from collected sites, anyone can start from nothing. "Or start
    blank" sits in the Library's opening line and on the "Collect something first" screen: pick the kind of site, and
    building opens on Brand with that kind's own pages (`startBlank`; `KitPlan.blank`). The Collection is left as it
    is — what is in it now is not added, what is collected later joins as usual — and no collected site is the start
    (Brand's colours, lettering and photo come from the kind of site's look). It makes a new recipe; Undo goes back.
28. **The look is picked in Brand** (2026-10-06). The look (Japanese Minimal, Organic Modern…) still shapes most of a
    site — the parts' designs, corners, menu, footer, layout, movement, the builder's principles — but after the
    Library it came silently from the first collected site (or, blank, the kind of site's default), so the order of
    collecting decided it. Brand now opens its middle column with **Look**, only where there is a choice to make (the
    user: "if I picked a site, why would I want something else?"): one collected site simply is its look (no Look);
    several collected sites in different looks pick among those ("Your sites come in different looks — which one is
    yours?"), and the picked one brings that site's own colours, lettering, corners, menu and footer; a blank start
    (and so does a Collection of parts only, with no site) picks from every look — those OpusKit's sites of its kind use first ("Fits your site"), filters by family, six
    first, Show all — each bringing its defaults. Every look is drawn as your own site in it (its colours, lettering,
    layout and first screen — 41 looks share 18 stock photos, so photos made them look alike). The pages, parts and
    effects stay; Undo; colours and lettering can still be changed after.
29. **Brand, one list at a time** (2026-10-06, "it's cluttered here too"): Look, Colours and Lettering stacked as three
    long grids, eleven family chips in two right-aligned rows, long notes and cut-off lines under every tile. Now the
    middle column is tabs — Look (only where there is a choice, decision 28) | Colours | Lettering — each tab naming its
    pick ("Colours · Black Box"), one list under it: a one-line note, small filters on one line, the grid, Show all.
    Tiles carry only a short mark (From Fennwood, Fits your site, Made for this look), never a cut-off line. A blank
    start's looks carry no "From …": it takes nothing from the Collection.
    The left column is a plain form (Your site, Name, In one sentence with a 0 / 160 count — no rules, no summary line).
    The example says what it is: "A sample, not your site — only your colours and lettering. The real one goes much further." (it is plain on purpose; nobody should take it for the build); under it, four parts of your own pages in your picks, two across, and
    the column scrolls with the page (too tall to stay pinned).

30. **The recipe agrees with itself** (2026-10-07, from #17–#20 built the Library way; `docs/review-engine-2026-10-07.md`).
    Every builder had settled the same contradictions and silences by hand. Now: the asset layer and the checklist are
    the shot list (one key per shot, per item where a page repeats); every frame number, ratio and film length has one
    source; rules never forbid the owner's own palette, fonts or designs; defaults follow the kind of site (a new
    "Spa & bathhouse" kind apart from clinics; references and section wording of the site's own kind; only the controls
    the parts use); forms say where they go; error colour and caption role exist. Regression checks in check.ts.
31. **The kit is gone; OpusKit has its own look** (2026-10-07, the user: "Kiti də çıxarırıq … Premium olmalıyıq",
    after getartcraft.com and mux.com). Removed: `/kit`, login / signup / account, pricing and the paywall (the recipe
    page is always unlocked), explore, resources, `/recipe/{slug}`; old links redirect (`next.config.ts`). Every recipe
    (example, seed, saved) opens in Brand / Pages through `/studio/open`. New look: cool stone ground, ink, hairline
    ruled frame, one signal orange; Archivo wide for headings, Geist for text, Geist Mono for labels and square
    buttons; no pills. The home page tells what OpusKit is now: Library → Brand → Pages → Recipe, the Build Package
    (Halden's real files and shot list), the examples, the tools it builds with.
32. **Room to invent, and what each look is known for** (2026-10-07, the user: a recipe that says every detail and
    allows nothing beyond it gets flat sites; give the builder model room to be creative, so the owner gets a "wow";
    and the engine should know what sites in each style do — from what OpusKit learned, not a live search). Every
    Build Package now says what is **Locked** (the owner's picks: colours, lettering, pages and part order, each part's
    design, menu, footer, shape, first screen, the copy's facts, files, picked effects, one system, a11y, speed) and
    what is **Free** (composition inside parts, hand-overs, type moments, every state, small details; where the recipe is
    silent, decide as a designer of this style would). **Your move:** every page gets one remembered moment — Home's is
    the first screen; on other pages without a signature moment the builder designs one, from the look's sparks or
    better, names it in the plan and the final reply. "Do not invent / Do not add others / Never an effect nobody
    picked" are gone. Each look carries `lookKnowledge` (`src/data/look-knowledge.ts`: moves, craft, sparks, traps,
    seen) from the award-site study (docs/research/) and OpusKit's own builds; the engine fits it to the owner's picks
    (`fitStyle`) and every adapter carries it. QA checks the Locked list, three of the style's moves, and the named
    moments. Regression checks in check.ts ("Room to invent").

33. **Shown in a site, shipped as a component** (2026-10-07, the user asked how sections should be shared as OpusKit
    grows). A section is found in context and delivered as a clean component:
    - **Discover stays sites only** (decision 20). A section is taken on its site's page, seen on a real site with its
      colours, type and photos — what people actually like is the result, not a part on its own.
    - **What ships is always the clean component** from `src/sections/` (tokens, props, `variant`), never code cut out
      of an example site: its accessibility (semantics, keyboard, reduced motion, contrast) is solved once and reaches
      every site, and it takes any brand. In a package it stays a reference (decision 22).
    - **Feed back after every build** (`docs/plan-examples.md` §3, step 7): where a builder made a section clearly
      better, it comes back to `src/sections/` as a fix or a new design, after the user approves. This keeps the site's
      clip and the collected component the same thing (what you see is what you get).
    - **Finding a section by its job** as they grow ("Build trust → every design → the sites that have it") lives in
      Pages → All parts, not as a shelf in Discover.

34. **Pages is a plan, not a promise** (2026-10-07, prototype awaiting the user's review; research in
    `docs/research/2026-10-07-part-representation.md`). Parts were real sections shrunk to ~240px: unreadable, hard to
    tell apart, and, looking finished, a promise the build is meant to exceed (decision 32). Every field that hands a
    plan to a maker draws what is decided clearly and what is open at low fidelity, and adds a real precedent. So:
    - The page is a **storyboard**. Each part is a numbered frame at full column width, in the owner's colours and
      lettering. Headings and labels are real; body text is bars (Flow Block); photos are crossed blocks (`sketch` on
      `SectionPreview`, `.sketch` in globals.css — one rule for every section).
    - Under each frame, **Says** (its content, as in the copy deck) and **Shows** (its shot-list row).
    - The chooser draws options the same way, with **proof**: a clip from a site built with that very design
      (`sectionDesign` in `closest.ts`), named as that site.
    - **Plan | Sample** switches to stand-in words and photos, said to be a sample.
    The edge in §1 ("you see what you'll get") now means: real sites as proof, and your exact plan.

35. **Inspiration, not imitation — a new flow** (2026-10-07, after the Mara persona test: a ceramicist who collected
    Fennwood for its warm colours got a restaurant — Menu and Reservations pages, "Book a table", a "Restaurant Site"
    recipe; arranging pages part by part was too much for her). The user: arranging pages and sections is out of place;
    people pick from the sites they like and say what is theirs, the engine writes the recipe. Now:
    - **You → Inspiration → Direction → Recipe** (`STEPS` in `library/parts.tsx`).
    - **You** (`/studio/you`): name, one sentence, kind of site — read from the sentence (`purposeFrom`) and shown. What
      the site *is* (pages, parts, words) comes only from here; a liked site never changes it.
    - **Inspiration** (`/library`, with the steps bar once the site has a name): the + on a site opens it large
      (`LikeButton` → `TakeDialog` in `library/SiteTake.tsx`): the site on the left with **Take its whole look** under
      it; on the right everything else it has — one quality (colours, lettering, first screen, movement; a `like`
      item), its parts in their designs (navigation, every section, footer, with the real site's clip) and its effects.
      A tap takes one or puts it back. The site's own page shows the same list (`TakeList`). The Library's kind filter
      is only a filter now.
    - **Direction** (`/studio/direction`): the site three ways (`directionsFor` in `features/library/inspire.ts`), each a
      different lead look and a rotating mix of the liked qualities, saying what it took from which site. No direction
      takes more than two of look, colours, lettering and first screen from one site, and where a direction uses the
      look's own colours or lettering they are never by chance a source's (check.ts). Picking one writes the plan; under
      it, the site's pages read as a list.
    - **Brand and Pages** stay as "Adjust the look" and "Adjust pages", one link from Direction, never in the way.

36. **Make it yours, on Direction** (2026-10-07, the user: teach the habit of taking from the Library, and give real
    customising on Direction — every font, colour and look). Under the three directions, **Make it yours**: the look,
    colours and lettering tabs (`LookPicker` in `studio/LookPicker.tsx`, every option, what fits first), with the picked
    direction drawn live beside them; the picked card redraws too and marks what changed as "your pick". A colour,
    lettering or look seen on a site the owner took from says "From Fennwood", and the picker ends with a link back to
    the Library ("it joins your directions") — taking from real sites stays the way in. Brand is now only "Adjust the
    look" for a recipe opened from an example or a saved recipe (same picker); Pages stays "Adjust pages".

37. **The Library is browsing; three steps after it** (2026-10-07, the user: "why does a step open at once? Let the
    Library be pure; from there, three steps"). Start a site opens the Library — no steps bar there, only taking. Build
    my site (header, Collection) starts **You → Direction → Recipe** (`STEPS`); You goes straight on to Direction, and
    links back to the Library ("Take more"). The home page tells it as Library, You, Direction, Recipe.

38. **What are you making?** (2026-10-07; the user: not eighteen kinds of site but a few general, understandable options
    that still shape the site — then: fewer questions, and no pictures of other sites, they confuse). You is three
    inputs: name, one sentence, and **What are you making?** — six plain answers with an icon each (`OFFERS` in
    `inspire.ts`: my work, a service, things to buy, a place or an event, something online, words or a cause), read from
    the sentence, which also names the exact kind inside the one picked (`kindFor`). What visitors should do is read from the pages (`inferGoal`); `Collection.goal` can carry an
    owner's pick if one is ever asked.

39. **Direction: Make it yours, then ready packs; no Pages screen** (2026-10-08, the user, after reviewing Direction).
    - **Make it yours is on top**: the look, colours and lettering (`LookPicker`) with the owner's site drawn live beside
      it. Under it, **Ready packs**: the three directions as small cards (first screen, "Pack B", its look, three colour
      dots, no other words); a click fills the picker above. Pages are not shown on Direction (the user: not needed).
    - **What was taken by name is in every pack** (a site's colours, its lettering…); only what rode along with a whole
      look rotates. Since colours and lettering are then often shared, the three looks differ in family *and* layout,
      and a first screen one pack opens with is not repeated by another when there is another to take.
    - **Previews speak for the owner's site**: their sentence, their pages as the menu, their main action on the button;
      a words-led first screen has no picture box. The photos stay the look's stand-ins (they carry its feel).
    - **Pages is retired** (`/studio/pages` redirects to Direction; `/studio/open` always opens Brand). Arranging pages
      and parts was a designer's job (Mara, decision 35). Pages come from the kind of site and the sentence
      (`pagesFromWords` in `inspire.ts`: "sold to order / on Etsy / by appointment" drops the cart and checkout;
      "workshops / classes" adds that page; "journal" adds a journal); anything more is a sentence to the AI tool after
      the build. The recipe page links only what can still be changed: the look, colours and lettering.

40. **Direction shows the brand, not the site** (2026-10-08, the user: the owner takes parts and we build a site in
    their brand; examples on Direction should be small and say "inspired by" — dropped later, decision 43 — while the font and colours they picked
    should be shown at least roughly). Beside the picker (first on phones), **Your brand** (`BrandCard`): the name in
    the display face, the sentence in the body face, the main action in the button shape, a link in the accent and the
    palette strip — the one exact thing on the page. Under it, **Inspired by**: the sites taken from, small, with "Your
    site takes from these. It won't look like them." The packs stay small cards. No site mock at full size on Direction:
    the whole site is seen in the build. Picking a new look keeps colours and lettering taken by name; using a pack can
    be undone.

41. **A look is shown by a mood photo; its sites open large** (2026-10-08, the user: tiles should be general pictures
    anyone understands, with an icon that opens a big modal of the sites made in that look). Each look's tile in Make
    it yours shows one photo of the style itself (`lookImages` in `src/data/look-images.ts`: a brutalist building, a zen
    room, a neon street — Unsplash License, chosen with the connector), not a screenshot of a site. A small grid icon
    with a count (only on looks that have sites) opens `LookSites`: every site built or planned in that look, built
    ones playing, each linking to its Library page, with "Use this look". A look without a photo falls back to a site
    built in it, then to the owner's site drawn in it.

42. **No ready packs on Direction** (2026-10-08, the user: not needed). Direction is Make it yours alone (picker, Your
    brand). `directionsFor` still writes the start — its first mix, picked silently — so what was taken
    by name is in it; the other two mixes are no longer shown.

43. **No Inspired by on Direction** (2026-10-08, the user: not needed). The right column is Your brand alone, sticky;
    the sites taken from are named in the line under the title ("From X's whole look…").

44. **No Brand screen: a finished recipe opens in Direction** (2026-10-08, the user: delete it, put Direction in its
    place). `/studio/brand` (Adjust the look) did what Direction does, in an older design (a sample site and four
    parts). An example's "Make it yours", a saved recipe's Continue and the recipe page's "Change the look" now open
    Direction (`/studio/brand` redirects there). `openInStudio` writes the recipe's name, sentence and kind into You
    and marks the plan as made from them (`collectionSig`, with `opened`), so Direction keeps it as it was built and
    says "Opened from X". What was taken in the Library stays; taking more, or changing the sentence or kind, starts
    again from it. A seed has no name: You asks for one, and the plan is kept.
    A plan being built with an empty You (opened before this) is mended by the steps bar (`adoptPlan`): You takes
    its words, Direction opens it as it is.

45. **The recipe page follows the flow, in OpusKit's own look** (2026-10-08, the user: the recipe should show what
    was taken from the Collection; keep the tabs, fit them to the new design). The recipe keeps what was taken
    (`RecipeSpec.taken`, `TakenPart`: site + kind + id), written by Direction from the Collection, so it survives the
    Collection being emptied. The page leads with the owner's name and sentence (the engine's long title stays in the
    package). Tabs are ruled cells like the steps bar. Overview: **Your brand** (`components/BrandCard.tsx`, shared
    with Direction), **What you took** (by site, with where each pick went), **Your choices** (a ruled grid; no big
    idea or touches when there are none). Pages and Effects mark each taken part "from Fennwood". No full-size site
    mock (decision 40). Saved shows each recipe as its brand; Recently viewed and Compare are gone.

46. **A gallery is a gallery** (2026-10-08, found making Pale Hour). The sentence reader knew no galleries and only
    the singular "exhibition", so "A place or an event" fell back to a restaurant (Menu, Reservations). Now
    galleries, museums and exhibitions read as an event venue; the event kind has a second start, **Gallery or
    museum** (Home, Exhibitions, Visit, About — `starterFrom` in `inspire.ts`), and its visitors come to visit
    (`inferGoal`), so the main action is "Get directions", not "Book a table". A recipe can also be handed over in a
    link: `/studio/open?recipe=<base64url spec>` saves it in the browser that opens it and shows it.

47. **Three tabs on the recipe page** (2026-10-08, the user: six tabs are too many; pages need no list; never ask
    for a logo). After Direction three things are left, one tab each: **Your site** (Your brand, What you took, one
    ruled row of facts — Look, Colours, Lettering link back to Direction; First screen, Menu and the page names are
    read from them — and the Effects with their demos), **Your files** (photos and films only — no logo slot: without
    one the builder sets the name as a wordmark — then the shot list, "What each one shows", what else the site needs
    and how to get it), **Build** (Room to invent, then the tool and the download). Design, Pages and Motion are gone
    from the page: tokens, type scale, controls, layout, section plans and motion patterns are for the builder and
    ship in the package and the copied recipe.

48. **Pages are never shown; they are made well** (2026-10-08, the user: showing pages makes people want other ones
    and feel boxed in — work them out behind the scenes and never leave anyone without the pages their picks need).
    No page list or count anywhere the owner looks (the recipe's facts row has Movement instead; What you took says
    "First screen" or "Every page", not page names; Saved's draft says "Continue where you left off"). Behind it,
    `pagesFromWords` also adds a **Shop** for selling on the side (a bookshop, photobooks, prints for sale — not on a
    shop), a **Menu** for food on a site that is not a restaurant (a hotel's restaurant, a gallery café), and
    `reachable` gives any site with no way to reach its owner a Contact page. A side shop never makes "buy" the main
    action (`inferGoal`). check.ts asserts each.

49. **Your site shows the picks, and only the picks** (2026-10-08, the user: show nothing but look, colours and
    lettering; show the parts and effects taken in one place, with filters). Your site is Your brand beside three
    ruled cells — Look, Colours, Lettering, each back to Direction — and **What you took**: every pick in one grid,
    drawn in the owner's brand (a part as its ready section, an effect as its live demo, a whole look or quality as
    the site it came from), marked "from Sela Mor", with filters All · Parts · Effects · Looks & qualities (only the
    kinds that are there). First screen, menu, movement and the separate Effects list are gone. Every card is live, not a
    still: an effect is its working demo (move, click, drag), a part plays its seconds on the recorded site it came
    from (`sectionClips`), a whole look or quality plays that site; a part from an unrecorded site is drawn in the
    owner's brand.

50. **Interaction craft in every package** (2026-10-08, the user sent Emil Kowalski's skills — github.com/emilkowalski/skills,
    MIT — to read, adapt and add to the engine). Sites came out right in their picks but each builder chose its own
    curves, presses and phone fixes. Now (`src/features/build-packages/craft.ts`, one source):
    - **tokens.css** ships strong curves (`--ease-out`, `--ease-in-out`, `--ease-drawer`, overriding Tailwind's own so
      `ease-out` in a class gets them), the look's section entrance as `--ease-entrance` when it is a CSS curve, and UI
      times (`--duration-press` 140ms … `--duration-sheet` 450ms).
    - **Interaction craft** — a Claude Code skill (`interaction-craft`, shipped always, also to still sites) and a Cursor
      rule: decide in order (how often seen → purpose → cheapest tool → transform/opacity → curve and time → interruption
      and exit), every control's press, popovers from their trigger, reduced motion gentler not gone, a phone baseline
      (svh first screens, 16px fields, `viewportFit: 'cover'` + `themeColor` = the page ground, safe-area padding, no tap
      flash, native snap), the worst case (longest copy-deck words +40%, a long email, one and zero items, a missing
      photo, 320px and 200% zoom, a fix table), a Never-ship table. It ends with Emil Kowalski's MIT notice.
    - **The recipe** (all tools): the state-feedback pattern presses at 0.97 and gates hover; the UI kit opens and closes
      on the tokens; responsive rules add svh/dvh, 16px fields and the viewport export.
    - **Definition of done**: three craft lines (feel, motion ingredients, worst case), the phone line and a gentler
      reduced-motion line. Two shipped parts entered from `scale(0)` (Cursor piece, Sticker orbit hero) — now 0.9 + fade.
    - Taken from the set: emil-design-eng, animate (+ recipes), review-animations, mobile-native, break-ui, apple-design;
      not: Swift, Expo, Sonner's own guide, prototype, pick-ui-library (our stack is fixed: shadcn, Motion, sonner).
    check.ts: every seed's QA carries the craft lines; no pattern or signature asks for `transition: all`, `scale(0)` or
    ease-in; every adapter's tokens.css has the curves and times; the skill carries its notice; no shipped piece or section
    enters from `scale(0)`.

51. **Seasoning: smooth loaders, micro-interactions, parallax — salt, not sauce** (2026-10-08, the user: use these like
    salt; and fix everything that goes to the models). Every recipe now has a **Seasoning** section (`seasoning` in
    `craft.ts`, in `recipeSections`, so every tool's recipe document carries it; Claude Code's `recipe/motion.md` too):
    - **Smooth loaders**: pictures fade into space held by their ratio (never a spinner over a photo), `loading.tsx`
      skeletons in the site's tones, a waiting button keeps its width (spinner after 300ms, kept 500ms, a tick at the
      end), the poster before a film, next/font so nothing reflows; no full-screen loader unless the Preloader was picked.
    - **Micro-interactions — the site's whole set**: press and hover in the look family's own voice (`MICRO`: quiet =
      colour only, bold = drops into its shadow, organic = soft spring…), plus only what the site has — sending a form,
      adding to the cart, the phone menu's icon, copying an email, tabular numbers. "Nothing else gets its own trick."
    - **Parallax by dose** (`PARALLAX`, by motion level): still none; subtle one picture on the whole site, 4–6%;
      dynamic up to two bands a page, 6–10%; immersive where the recipe places depth, else the dynamic dose. Only
      pictures move, in an overflow-hidden frame at 1.1; never `background-attachment: fixed`; phones half; reduced
      motion none. The `parallax-drift` pattern says the same.
    Everything that goes to a model was brought in line: the definition of done has a Seasoning line; the build sequence
    has a Season step; the motion-system skill points to it (and allows clip-path); Cursor's motion rule carries it;
    **Lovable** gets `interaction-craft.md`, a short Feel/Seasoning paragraph in its knowledge (`craftBrief`, the
    knowledge stays under 10k — check.ts) and a "Season and finish" prompt; **v0** attaches `interaction-craft.md`,
    names it in the prompt and adds a follow-up; **own-code** ships `interaction-craft.md`. check.ts: every seed × every
    tool carries both; a still site gets no parallax.

52. **A site lends only what carries its design** (2026-10-08, the user: someone building from inspiration looks for what
    shapes a site's design and feel, not its FAQ; the engine must still give what matters but nobody picks). A site's
    + offers its whole look, its qualities (colours, lettering, first screen, movement), its navigation and footer, its
    effects, and only its **signature parts** (`SIGNATURE_PARTS` in `features/library/collection.ts`): Featured Work,
    Case Study, Gallery, Lookbook, Collection, Product Highlight, Product Grid, Manifesto, Editorial Story, Timeline,
    Chapters, Menu, Schedule, Listen — how it shows its work, products, story and place. FAQ, Newsletter, Location,
    Contact / CTA band / Donate, Pricing, Trust, Specs, Integrations, Categories, the buy box, Reservation, Journal,
    Article, Clients, Stats, Press, Testimonials, Process, How it works, Services, Features, Curriculum, Intro, About
    and Team are no longer offered: the kind of site and the sentence give them, drawn in the look's design. A taken part
    only ever replaces another signature part of its job — never a booking, the address, prices or questions (check.ts,
    every kind of site). Parts taken before stay valid. Later, a sections shelf in the Library follows the same rule, and
    OpusKit shows elements with its own photos, films and clean components as it grows.

## 5. Open

1. ~~Retiring the kit~~ — done (decision 31). Shape, menu and footer look, movement and behaviours are now the engine's
   (from the look); a later step may give the menu look a place in Brand.
2. "Your own colours" in Brand (the old palette editor went with the kit; rebuild it in the new style if wanted).
3. Recipe: "you picked / we added, and why".
4. ~~The home page copy still describes the kit~~ — done (decision 31).
5. Two whole sites in one Collection beyond "Start from"; Review — both once there are first results.
6. Persona files and the test tasks; the pass mark agreed before testing.
7. A Colour Chapters part on a site without colour chapters (the Library has no place to turn them on) draws every
   chapter in the one accent, and each chapter wants a photo or clip — found building Tramontane (#17), where it was
   swapped for Features. Either the part brings colour chapters with it, or Pages says what it needs.
