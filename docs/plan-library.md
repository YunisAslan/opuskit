# Plan — OpusKit Library

The current direction (agreed with the user 2026-10-05). It replaces the kit as OpusKit's front door. This file holds the
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
(as built 2026-10-05: Discover → Pages → Style → Recipe; Collect is the header sheet, Brand is the name on Pages, Build is the recipe page — §2a)
```

### DISCOVER
- **The person:** browses, filters, searches. Optionally picks the kind of site first (Portfolio), or filters by it later.
- **Three shelves:** Sites, Sections, Effects. Every card is rendered live; once a kind of site is picked, everything is
  shown in that kind's world.
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

Flow: **Discover → Pages → Style → Recipe**. The Collection is not a step: it opens from the header (a side sheet). The
recipe page is the end — it downloads the Build Package and takes your files — so there is no Build step. The kit is no
longer on the way (still at `/kit`).
- `/library` — Discover: Sites (16 built + 10 recipes), Sections (first screens, menus, every section design, footers),
  Effects. "What are you making?" chips, search, one filter per shelf. Cards are samples in fixed looks (a part as on the
  first real site that has it, else one neutral look) — they never take the visitor's choices. Name + one fact; clicking
  a section's or effect's picture collects it. `/library/sites/{example|seed}/{slug}`: a site's parts, each with +.
- The Collection chip in the steps bar opens the sheet: items grouped, quiet notes,
  remove with undo, **Build my site** (`planFromStudio`: rebuilt only when the Collection changed; `KitPlan.via =
  'studio'`). Toasts only when a rule speaks. `/studio` redirects to Pages.
- `/studio/pages` — Pages: the site's name and one sentence as the page title (typed in place); "What are you making?"
  only when nothing says it; "Start from" when several sites were collected. A start site's pages, else the kind of
  site's; "Usually also there", Add a page, Your own page. Each page's parts, placed by the engine: move or remove only
  (decided 2026-10-05), controls on hover; "From your Collection" marked. Back / next in one bar at the bottom.
- `/studio/style` — Style: all 42 palettes (Light / Dark) and all 58 letterings (Serif / Sans / Expressive), what fits
  marked first, beside the home page drawn in them.
- Recipe (`/result/{id}`): the flow line on top; every Change leads to Pages or Style; its Your files tab takes logo,
  photos and video.
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
11. New example sites (#17–#20) are on hold (`docs/plan-examples.md` §5).

## 5. Open

1. Retiring the kit: the choices only it edits (shape, menu and footer look, movement, big idea, behaviours) — the engine
   picks them, or some move to Style (Claude suggests: the engine, except the menu look in Style); examples' "Customise
   in kit" and saved recipes to open on Pages; then `/kit` is deleted.
2. "Your own colours" in Style (the palette editor already exists in the code).
3. Recipe: "you picked / we added, and why".
4. The home page copy still describes the kit.
5. Two whole sites in one Collection beyond "Start from"; Review — both once there are first results.
6. Persona files and the test tasks; the pass mark agreed before testing.
