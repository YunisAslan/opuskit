## Layout System — Editorial

The frame is already in `src/styles/tokens.css`: `--container`, `--gutter`, `--section-y`, `--ratio-card`, `--ratio-media` — every ready section uses them; new sections use them too, never a fixed max-width or padding. Each section's tone (ground, surface, inverse, chapter) and media placement are set per page below.

| | |
|---|---|
| Container | max-width 1440px, side gutter clamp(20px, 3vw, 44px) (--container, --gutter) |
| Grid | 12 columns with a 2-column margin rail for captions |
| Columns | Headlines 8 columns, body 5 columns max (~65ch), captions in the rail |
| Gutters | clamp(20px, 3vw, 44px) (--gutter) |
| Section spacing | clamp(104px, 13vw, 196px) between sections (--section-y) |
| Alignment | Flush-left, ragged-right; captions top-aligned to images |
| Hero composition | 100svh full-bleed photograph, headline anchored bottom-left, image slightly larger than viewport (scale 1.1) to allow drift. |
| Card proportions | 3:4 for project, product and people cards (--ratio-card) |
| Media proportions | 3:2 for pictures beside text (--ratio-media); 21:9 for a full-width band. Photo files follow the shot list (recipe/media.md) |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Inside a section use only values from the scale; between sections use --section-y. Space between sections is always larger than space within them.

### Shape — Sharp

Square corners, crisp lines — precise and editorial. Buttons 0px, cards 0px, media 0px, borders 1px, shadow none. No rounded corners anywhere; structure comes from lines and space.

### Menu — Centered logo

Logo in the middle, links split on either side — like a boutique.
- **Composition:** Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.
- **Behavior:** Shrinks to a compact bar after 80px.
- **Responsive:** Mobile: centred logo, menu button left, action right.

## Page Structure

Pages: Home · Exhibitions · Visit · About

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Full-bleed photo with depth
- **Purpose:** Establish mood and promise immediately
- **Composition:** 100svh full-bleed photograph, headline anchored bottom-left, image slightly larger than viewport (scale 1.1) to allow drift.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** On scroll the image translates at ~0.3× scroll speed and the headline lines reveal upward; the next section overlaps the hero as it leaves.
- **Responsive:** Mobile: use a dedicated 4:5 or 9:16 crop; reduce parallax to a simple scale-down (1.1 → 1.0).

### 02 Intro
- **Purpose:** Say what this is and who it is for
- **Composition:** Short statement in display face across 8 columns, with a small label
- **Content:** 1–2 sentences, specific and concrete
- **Behavior:** Line reveal
- **Responsive:** Scale statement to ~8vw; keep line breaks intentional
- **Design — Magazine opener (recommended):** The sentence large on the left, the paragraph low on the right. Pass `variant="split"`.
- **Reference code:** `src/components/sections/Statement.tsx` → `<StatementSection variant="split" label="Studio" statement="…" body="…" />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Featured Work
- **Purpose:** Prove quality with 3–6 best projects
- **Composition:** The projects as its design says (below) — every project’s picture visible without hovering
- **Content:** Project title, discipline, year, 1 image each
- **Behavior:** Image reveal on entry; hover preview on index
- **Responsive:** Single column, images first
- **Design — Even grid:** Two columns, every picture the same shape. Pass `variant="grid"`.
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Reference code:** `src/components/sections/FeaturedWork.tsx` → `<FeaturedWorkSection variant="grid" title="Selected work" projects={[{ title, meta, image, alt, href }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 04 Schedule
- **Purpose:** Show what happens when
- **Composition:** Days as columns (or stacked groups), each a list of time, title and a line of detail
- **Content:** Every day of the programme, real times, short titles
- **Behavior:** Static — no tabs, everything readable at once
- **Responsive:** Days stack, times stay left
- **Reference code:** `src/components/sections/Schedule.tsx` → `<ScheduleSection title="Programme" days={[{ label: "Friday", items: [{ time, title, detail }] }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 05 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view
- **Reference code:** `src/components/sections/Journal.tsx` → `<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Exhibitions

Prove quality and range through the strongest projects; make it easy to go deeper on any one.

### 01 Featured Work
- **Purpose:** Prove quality with 3–6 best projects
- **Composition:** The projects as its design says (below) — every project’s picture visible without hovering
- **Content:** Project title, discipline, year, 1 image each
- **Behavior:** Image reveal on entry; hover preview on index
- **Responsive:** Single column, images first
- **Design — Large and small (recommended):** Projects alternate large and small. Pass `variant="staggered"`.
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Reference code:** `src/components/sections/FeaturedWork.tsx` → `<FeaturedWorkSection variant="staggered" title="Selected work" projects={[{ title, meta, image, alt, href }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row
- **Photos — Gallery wall (recommended):** Masonry columns (3 desktop, 2 tablet) using each photo’s native ratio — no forced crops; gutters from the spacing scale; one or two photos span two columns to break the grid. Staggered reveal (40–60 ms per item); click opens an accessible lightbox with arrow keys, Esc and swipe. Mobile: Two columns on mobile down to 360 px, then one; the lightbox swipes.
- **Reference code:** `src/components/sections/Gallery.tsx` → `<GallerySection photos={[{ src, alt, caption }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Visit

Help visitors find and choose the right location.

### 01 Location
- **Purpose:** Make visiting easy
- **Composition:** Address, hours, map link, one exterior image
- **Content:** Address, hours, transit notes
- **Behavior:** Static
- **Responsive:** Stack; tap-to-call and tap-to-map
- **Media:** side — pass `media="side"`
- **Reference code:** `src/components/sections/Location.tsx` → `<LocationSection title address hours={["…"]} notes mapUrl image alt />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Schedule
- **Purpose:** Show what happens when
- **Composition:** Days as columns (or stacked groups), each a list of time, title and a line of detail
- **Content:** Every day of the programme, real times, short titles
- **Behavior:** Static — no tabs, everything readable at once
- **Responsive:** Days stack, times stay left
- **Reference code:** `src/components/sections/Schedule.tsx` → `<ScheduleSection title="Programme" days={[{ label: "Friday", items: [{ time, title, detail }] }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Reference code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## About

Put a human face and point of view on the work; build trust.

### 01 About
- **Purpose:** Put a human face and point of view on the work
- **Composition:** Portrait image + statement + short bio
- **Content:** Real names, real history, no mission-statement clichés
- **Behavior:** Fade-rise
- **Responsive:** Portrait above text
- **Media:** side — pass `media="side"`
- **Reference code:** `src/components/sections/About.tsx` → `<AboutSection title="About" image alt statement bio />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Team
- **Purpose:** Show the people behind it
- **Composition:** Portrait grid: photo, name, role, one line each
- **Content:** 3–8 people: real photo, name, role, one sentence
- **Behavior:** Fade-rise
- **Responsive:** 2-column grid
- **Design — Large portraits (recommended):** Two big portraits to a row. Pass `variant="large"`.
- **Reference code:** `src/components/sections/Team.tsx` → `<TeamSection variant="large" title="The team" people={[{ name, role, line, image, alt }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Site Chrome

### 01 Navigation — Centered logo
- **Purpose:** Orientation and the primary action
- **Composition:** Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.
- **Content:** Logo, 4–6 links, one action
- **Behavior:** Shrinks to a compact bar after 80px.
- **Responsive:** Mobile: centred logo, menu button left, action right.

### 02 Footer — Signature columns
- **Purpose:** Practical information and a calm ending
- **Composition:** Dark band (text colour as ground): the logo large on the left (5 of 12 columns), 2–3 link columns with headings, then a hairline and one row: copyright left, legal links right.
- **Content:** Address/email, links, copyright
- **Behavior:** Static; links do what the site’s Links behaviour does (a plain underline if none), the current page marked the same way.
- **Responsive:** Mobile: logo, then the columns stacked, then the legal row wrapped.
- **Reference code:** `src/components/sections/Footer.tsx` → `<FooterSection logo={<Logo />} columns={[{ title, links: [{ label, href, current }] }]} legal={[…]} copyright />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| StatementBlock | State the point of view in one or two sentences | Display-size text, optional small label | Line reveal |
| Gallery | Show a set of images as a curated sequence | Mixed-size grid or horizontal strip; captions optional | Keyboard navigable; opens a lightbox only if needed |
| ReservationForm | Book in under 30 seconds | Date, time and how many — or the booking provider’s own embed when the owner has one | Sticky "Book" button on mobile |
| Accordion | Keep FAQs and details scannable | shadcn/ui Accordion (type="single" collapsible), restyled to the tokens | Height animates open and closed; one answer open at a time |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
