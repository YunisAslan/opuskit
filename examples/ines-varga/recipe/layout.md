## Layout System — Grid-driven

The frame is already in `src/styles/tokens.css`: `--container`, `--gutter`, `--section-y`, `--ratio-card`, `--ratio-media` — every ready section uses them; new sections use them too, never a fixed max-width or padding. Each section's tone (ground, surface, inverse, chapter) and media placement are set per page below.

| | |
|---|---|
| Container | max-width none (full width), side gutter clamp(16px, 2vw, 24px) (--container, --gutter) |
| Grid | 12 columns desktop, 6 tablet, 4 mobile |
| Columns | Modules snap to 3, 4, 6 or 12 columns |
| Gutters | clamp(16px, 2vw, 24px) (--gutter) |
| Section spacing | clamp(72px, 9vw, 120px) between sections (--section-y) |
| Alignment | Strict flush-left; numbers and labels in fixed column positions |
| Hero composition | A commissioned illustration as the key visual, with type set in harmony with its line weight and palette. |
| Card proportions | 1:1 for project, product and people cards (--ratio-card) |
| Media proportions | 4:3 for pictures beside text (--ratio-media); 21:9 for a full-width band. Photo files follow the shot list (recipe/media.md) |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Inside a section use only values from the scale; between sections use --section-y. Space between sections is always larger than space within them.

### Shape — Hairline

Thin outlines and no fills — light and airy. Buttons 4px, cards 6px, media 4px, borders 1px, shadow none. Buttons and cards are outlined, not filled (except the one primary action); 1px borders in the border token.

### Menu — Full-screen menu

Just the logo and “Menu” — it opens into huge links over the whole screen.
- **Composition:** Minimal bar: logo and a “Menu” label only. The menu is a full-viewport panel with display-size links, one per line, plus contact details.
- **Behavior:** Panel slides or wipes in; links stagger in (40ms); hovering a link can reveal an image or run a flowing marquee.
- **Responsive:** Same on every screen — it is already touch-first.

## Page Structure

Pages: Home · Selected Work · Project · About · Contact

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Illustrated hero
- **Purpose:** Establish mood and promise immediately
- **Composition:** A commissioned illustration as the key visual, with type set in harmony with its line weight and palette.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** SVG layers can drift independently (parallax at 2–3 depths) or draw in once (stroke-dashoffset).
- **Responsive:** Mobile: a portrait version of the illustration or a cropped detail.

### 02 Featured Work
- **Purpose:** Prove quality with 3–6 best projects
- **Composition:** The projects as its design says (below) — every project’s picture visible without hovering
- **Content:** Project title, discipline, year, 1 image each
- **Behavior:** Image reveal on entry; hover preview on index
- **Responsive:** Single column, images first
- **Design — An index (recommended):** Big titles on rules, a small picture beside each. Pass `variant="index"`.
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Reference code:** `src/components/sections/FeaturedWork.tsx` → `<FeaturedWorkSection variant="index" title="Selected work" projects={[{ title, meta, image, alt, href }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, one action, and the real ways to reach you (email, and phone or address where they exist)
- **Behavior:** Static
- **Responsive:** Large tap target
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — Big invitation (recommended):** The headline huge, one button and the email. Pass `variant="statement"`.
- **Reference code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection variant="statement" headline quiet="second line in the serif" action={{ label, href }} email phone address />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Selected Work

Prove quality and range through the strongest projects; make it easy to go deeper on any one.

### 01 Featured Work
- **Purpose:** Prove quality with 3–6 best projects
- **Composition:** The projects as its design says (below) — every project’s picture visible without hovering
- **Content:** Project title, discipline, year, 1 image each
- **Behavior:** Image reveal on entry; hover preview on index
- **Responsive:** Single column, images first
- **Design — An index (recommended):** Big titles on rules, a small picture beside each. Pass `variant="index"`.
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Reference code:** `src/components/sections/FeaturedWork.tsx` → `<FeaturedWorkSection variant="index" title="Selected work" projects={[{ title, meta, image, alt, href }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Clients
- **Purpose:** Show breadth of trust
- **Composition:** Logo/name grid or slow marquee
- **Content:** Real client names only
- **Behavior:** Static or slow marquee
- **Responsive:** 2-column grid
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — Like credits (recommended):** The names run as one big paragraph. Pass `variant="inline"`.
- **Reference code:** `src/components/sections/NameWall.tsx` → `<NameWallSection variant="inline" title="Clients" names={["…"]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Project

Show one project in full: what it was, the facts (client, place, year, role), the pictures in order, and the way to the next project.

### 01 Case Study Preview
- **Purpose:** Show depth on one project
- **Composition:** Wide media + 3-column facts (client, role, outcome)
- **Content:** Problem, approach, result — 3 short paragraphs
- **Behavior:** Pinned media with advancing text (immersive) or static
- **Responsive:** Stack facts under media
- **Media:** full — pass `media="full"`
- **Reference code:** `src/components/sections/CaseStudy.tsx` → `<CaseStudySection title image alt facts={[{ label, value }]} paragraphs={["Problem…", "Approach…", "Result…"]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row
- **Photos — Gallery wall (recommended):** Masonry columns (3 desktop, 2 tablet) using each photo’s native ratio — no forced crops; gutters from the spacing scale; one or two photos span two columns to break the grid. Staggered reveal (40–60 ms per item); click opens an accessible lightbox with arrow keys, Esc and swipe. Mobile: Two columns on mobile down to 360 px, then one; the lightbox swipes.
- **Reference code:** `src/components/sections/Gallery.tsx` → `<GallerySection photos={[{ src, alt, caption }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Specs
- **Purpose:** Give the facts people check before deciding
- **Composition:** A heading and a line beside the facts: one ruled line per fact (name and value), or a grid of cells with the value large
- **Content:** 6–12 real facts — dimensions, materials, rooms and area, year, place, what is included
- **Behavior:** Static
- **Responsive:** The table keeps two columns; the grid drops to two cells per row
- **Design — Line by line (recommended):** One ruled line per fact, name and value. Pass `variant="table"`.
- **Reference code:** `src/components/sections/Specs.tsx` → `<SpecsSection variant="table" title text specs={[{ label, value }]} note />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 04 Featured Work
- **Purpose:** Prove quality with 3–6 best projects
- **Composition:** The projects as its design says (below) — every project’s picture visible without hovering
- **Content:** Project title, discipline, year, 1 image each
- **Behavior:** Image reveal on entry; hover preview on index
- **Responsive:** Single column, images first
- **Design — An index (recommended):** Big titles on rules, a small picture beside each. Pass `variant="index"`.
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Reference code:** `src/components/sections/FeaturedWork.tsx` → `<FeaturedWorkSection variant="index" title="Selected work" projects={[{ title, meta, image, alt, href }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## About

Put a human face and point of view on the work; build trust.

### 01 About
- **Purpose:** Put a human face and point of view on the work
- **Composition:** Portrait image + statement + short bio
- **Content:** Real names, real history, no mission-statement clichés
- **Behavior:** Fade-rise
- **Responsive:** Portrait above text
- **Media:** full — pass `media="full"`
- **Reference code:** `src/components/sections/About.tsx` → `<AboutSection title="About" image alt statement bio />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and who they are to this place (client, guest, customer, member)
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — One big quote (recommended):** A single quote set huge across the page. Pass `variant="single"`.
- **Reference code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection variant="single" title="What people say" quotes={[{ quote, name, role }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Timeline
- **Purpose:** Tell the story as dated steps
- **Composition:** Heading and a short line beside a hairline of dated steps, oldest first, the latest marked
- **Content:** 4–7 real dates (years or months), each with what happened and one line on why it mattered
- **Behavior:** Static; a scroll-drawn line is an optional moment
- **Responsive:** Heading above, steps stacked along the line
- **Design — Years set huge (recommended):** No line: each year huge, its step beside it. Pass `variant="years"`.
- **Reference code:** `src/components/sections/Timeline.tsx` → `<TimelineSection variant="years" title="How we got here" text="…" steps={[{ when: "2019", title, detail }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Contact

Give one clear, low-friction way to get in touch.

### 01 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, one action, and the real ways to reach you (email, and phone or address where they exist)
- **Behavior:** Static
- **Responsive:** Large tap target
- **Design — Big invitation (recommended):** The headline huge, one button and the email. Pass `variant="statement"`.
- **Reference code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection variant="statement" headline quiet="second line in the serif" action={{ label, href }} email phone address />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Design — Said loudly (recommended):** The title large across the top, the questions full width and set large. Pass `variant="stacked"`.
- **Reference code:** `src/components/sections/Faq.tsx` → `<FaqSection variant="stacked" title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Site Chrome

### 01 Navigation — Full-screen menu
- **Purpose:** Orientation and the primary action
- **Composition:** Minimal bar: logo and a “Menu” label only. The menu is a full-viewport panel with display-size links, one per line, plus contact details.
- **Content:** Logo, 4–6 links, one action
- **Behavior:** Panel slides or wipes in; links stagger in (40ms); hovering a link can reveal an image or run a flowing marquee.
- **Responsive:** Same on every screen — it is already touch-first.

### 02 Footer — Say hello
- **Purpose:** Practical information and a calm ending
- **Composition:** A large headline invitation (“Let’s talk”, “Book a table”) with the email/phone as display-size links, address and hours beside it, then one small row of links, copyright and legal.
- **Content:** Address/email, links, copyright
- **Behavior:** Static; the contact links underline on hover; email opens mail, phone dials.
- **Responsive:** Mobile: invitation, contact links, details and the links row stacked.
- **Reference code:** `src/components/sections/Footer.tsx` → `<FooterSection variant="contact" invite="…" contact={[{ label, href }]} logo={<Logo />} columns={[{ title, links: [{ label, href, current }] }]} legal={[…]} copyright />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| ProjectCard | Preview one project and lead to its case study | Media (fixed ratio), title, discipline/year in utility face | Hover: subtle image scale (1.03) or preview; whole card is one link |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| StatementBlock | State the point of view in one or two sentences | Display-size text, optional small label | Line reveal |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
