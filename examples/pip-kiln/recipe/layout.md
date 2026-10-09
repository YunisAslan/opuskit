## Layout System — Experimental

The frame is already in `src/styles/tokens.css`: `--container`, `--gutter`, `--section-y`, `--ratio-card`, `--ratio-media` — every ready section uses them; new sections use them too, never a fixed max-width or padding. Each section's tone (ground, surface, inverse, chapter) and media placement are set per page below.

| | |
|---|---|
| Container | max-width none (full width), side gutter clamp(16px, 1vw + 12px, 28px) (--container, --gutter) |
| Grid | 24 columns (fine-grained for off-grid placement) |
| Columns | Elements span unusual widths (5, 7, 11); overlaps allowed |
| Gutters | clamp(16px, 1vw + 12px, 28px) (--gutter) |
| Section spacing | clamp(80px, 14vw, 240px) between sections (--section-y) |
| Alignment | Deliberately varied; one anchor element per section keeps it readable |
| Hero composition | The product isolated on a clean surface, large and centred or offset, with name, one-line promise and price/CTA. |
| Card proportions | 2:3 for project, product and people cards (--ratio-card) |
| Media proportions | 1:1 for pictures beside text (--ratio-media); 21:9 for a full-width band. Photo files follow the shot list (recipe/media.md) |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Inside a section use only values from the scale; between sections use --section-y. Space between sections is always larger than space within them.

### Shape — Pill

Fully round buttons and bubbly cards — playful. Buttons 999px, cards 32px, media 28px, borders 1px, shadow none. Buttons, tags and inputs are full pills; cards and media are very round.

### Menu — Classic bar

Logo on the left, links on the right, always at the top.
- **Composition:** Full-width bar: logo left, 4–6 links and the primary action right, on the page ground with a hairline bottom border.
- **Behavior:** Sticky; gains a surface background after 40px of scroll.
- **Responsive:** Mobile: logo + menu button; opens a simple full-width sheet.

## Page Structure

Pages: Home · Shop · Product · Cart · Checkout · Workshops

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Product stage
- **Purpose:** Establish mood and promise immediately
- **Composition:** The product isolated on a clean surface, large and centred or offset, with name, one-line promise and price/CTA.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Subtle: product fades/scales in. Dynamic: product rotates or swaps angles on scroll using an image sequence (24–48 frames).
- **Responsive:** Mobile: product first, text beneath, CTA sticky at bottom.

### 02 Categories
- **Purpose:** Show the range and let people go straight to their part of it
- **Composition:** 3–4 column grid of image tiles, name and count under each
- **Content:** 3–8 categories, each with a real picture and an honest count
- **Behavior:** Image zooms slightly on hover
- **Responsive:** 2-column grid
- **Reference code:** `src/components/sections/Categories.tsx` → `<CategoriesSection title="Shop by category" items={[{ name, href, image, alt, count }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Product Grid
- **Purpose:** Browse and choose
- **Composition:** 3–4 column grid of product cards; filters minimal
- **Content:** Name, price, image, availability
- **Behavior:** Hover alternate image
- **Responsive:** 2 columns on mobile
- **Photos — Even grid (recommended):** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile. Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards). Mobile: 2 columns on mobile; never 1 unless the photos are the product itself.
- **Reference code:** `src/components/sections/ProductGrid.tsx` → `<ProductGridSection title products={[{ name, price, image, alt, hoverImage, href }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 04 Collection
- **Purpose:** Introduce the season or range
- **Composition:** The collection’s name and one paragraph, then one picture per range or key piece, laid out as its photo layout says (below)
- **Content:** Collection name, one paragraph, season
- **Behavior:** Image reveal
- **Responsive:** Portrait crop, title over lower third
- **Photos — Sideways strip (recommended):** One row of large photos at a shared height (60–70 vh), native widths, generous gutters; a caption under each in the utility face — no running count. Desktop: pinned section, vertical scroll translates the row horizontally (sticky frame + Motion useScroll → useTransform on x, or CSS scroll-driven animation). Reduced motion: native horizontal scroll with snap. Mobile: Mobile: native swipe carousel with scroll-snap — no pinning.
- **Reference code:** `src/components/sections/Collection.tsx` → `<CollectionSection season title text image alt pieces={[{ name, price, image, alt, href }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 05 Manifesto
- **Purpose:** State the point of view boldly
- **Composition:** Display-size statement spanning the grid
- **Content:** 1–3 sentences that could only be yours
- **Behavior:** Line reveal / scroll-driven type
- **Responsive:** Re-break lines for mobile
- **Design — Across the page:** The sentence huge, across the whole page. Pass `variant="giant"`.
- **Reference code:** `src/components/sections/Statement.tsx` → `<StatementSection variant="giant" statement="…" attribution="…" />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 06 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and who they are to this place (client, guest, customer, member)
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — One big quote (recommended):** A single quote set huge across the page. Pass `variant="single"`.
- **Reference code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection variant="single" title="What people say" quotes={[{ quote, name, role }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 07 Trust Strip
- **Purpose:** Remove the small worries before a purchase or sign-up
- **Composition:** One row of 3–5 short promises between rules
- **Content:** The promises that matter for this kind of site (delivery, returns, guarantees, safety, what is included) — 2–5 words each plus one plain line
- **Behavior:** Static
- **Responsive:** 2-column grid, then one column
- **Reference code:** `src/components/sections/Trust.tsx` → `<TrustSection items={[{ title: "Free returns", text: "Within 30 days." }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 08 Newsletter
- **Purpose:** Turn a visit into a returning reader
- **Composition:** One reason to subscribe beside an email field and a button, with a note under it
- **Content:** What they get, how often, and that it is easy to leave
- **Behavior:** Static; the form posts to your email provider
- **Responsive:** Field and button stack, full width
- **Reference code:** `src/components/sections/Newsletter.tsx` → `<NewsletterSection title text placeholder="you@example.com" button="Subscribe" note="Once a month." action="https://…" />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Shop

Let visitors browse and choose confidently.

### 01 Product Grid
- **Purpose:** Browse and choose
- **Composition:** 3–4 column grid of product cards; filters minimal
- **Content:** Name, price, image, availability
- **Behavior:** Hover alternate image
- **Responsive:** 2 columns on mobile
- **Photos — Even grid (recommended):** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile. Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards). Mobile: 2 columns on mobile; never 1 unless the photos are the product itself.
- **Reference code:** `src/components/sections/ProductGrid.tsx` → `<ProductGridSection title products={[{ name, price, image, alt, hoverImage, href }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Product Highlight
- **Purpose:** Show one product (or feature) in depth
- **Composition:** Large product media with 3–4 annotated details
- **Content:** What it is made of, its size or measure, and the one thing it does best
- **Behavior:** Pinned product with advancing details (immersive) or static
- **Responsive:** Media then detail list
- **Media:** over — pass `media="over"`
- **Reference code:** `src/components/sections/ProductHighlight.tsx` → `<ProductHighlightSection name text image alt details={[{ label, value }]} action={{ label, href }} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Collection
- **Purpose:** Introduce the season or range
- **Composition:** The collection’s name and one paragraph, then one picture per range or key piece, laid out as its photo layout says (below)
- **Content:** Collection name, one paragraph, season
- **Behavior:** Image reveal
- **Responsive:** Portrait crop, title over lower third
- **Photos — Sideways strip (recommended):** One row of large photos at a shared height (60–70 vh), native widths, generous gutters; a caption under each in the utility face — no running count. Desktop: pinned section, vertical scroll translates the row horizontally (sticky frame + Motion useScroll → useTransform on x, or CSS scroll-driven animation). Reduced motion: native horizontal scroll with snap. Mobile: Mobile: native swipe carousel with scroll-snap — no pinning.
- **Reference code:** `src/components/sections/Collection.tsx` → `<CollectionSection season title text image alt pieces={[{ name, price, image, alt, href }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 04 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Reference code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Product

Show one product in full: gallery, price, variants, add-to-cart, and related items.

### 01 Product buy box
- **Purpose:** Let people buy one product on its own page
- **Composition:** The pictures on one side; on the other the name (the page h1), price, a line on what it is, one choice as buttons (colour or size), quantity, the add-to-bag button and the details people check (materials, size, delivery, returns), each opening in place
- **Content:** 3–6 photos of the real product, one price, one option set, 3–4 short details
- **Behavior:** Choosing an option and quantity updates in place; one detail open at a time; the buy column may stay in view while the pictures scroll
- **Responsive:** Pictures first as a swipeable row or stack, then the buy column; the button stays full width
- **Design — Picture mosaic (recommended):** The first picture large, the rest in a grid; the buy column beside. Pass `variant="mosaic"`.
- **Reference code:** `src/components/sections/ProductBuy.tsx` → `<ProductBuySection variant="mosaic" name price line images={[{ src, alt }]} option={{ label: "Size", values: ["…"] }} details={[{ title, text }]} action={{ label: "Add to bag", href }} note />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Product Highlight
- **Purpose:** Show one product (or feature) in depth
- **Composition:** Large product media with 3–4 annotated details
- **Content:** What it is made of, its size or measure, and the one thing it does best
- **Behavior:** Pinned product with advancing details (immersive) or static
- **Responsive:** Media then detail list
- **Media:** over — pass `media="over"`
- **Reference code:** `src/components/sections/ProductHighlight.tsx` → `<ProductHighlightSection name text image alt details={[{ label, value }]} action={{ label, href }} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and who they are to this place (client, guest, customer, member)
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — One big quote (recommended):** A single quote set huge across the page. Pass `variant="single"`.
- **Reference code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection variant="single" title="What people say" quotes={[{ quote, name, role }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 04 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Reference code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 05 Product Grid
- **Purpose:** Browse and choose
- **Composition:** 3–4 column grid of product cards; filters minimal
- **Content:** Name, price, image, availability
- **Behavior:** Hover alternate image
- **Responsive:** 2 columns on mobile
- **Photos — Even grid (recommended):** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile. Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards). Mobile: 2 columns on mobile; never 1 unless the photos are the product itself.
- **Reference code:** `src/components/sections/ProductGrid.tsx` → `<ProductGridSection title products={[{ name, price, image, alt, hoverImage, href }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Cart

Let visitors review and adjust their selection before checkout.

### 01 Product Grid
- **Purpose:** Browse and choose
- **Composition:** 3–4 column grid of product cards; filters minimal
- **Content:** Name, price, image, availability
- **Behavior:** Hover alternate image
- **Responsive:** 2 columns on mobile
- **Photos — Even grid (recommended):** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile. Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards). Mobile: 2 columns on mobile; never 1 unless the photos are the product itself.
- **Reference code:** `src/components/sections/ProductGrid.tsx` → `<ProductGridSection title products={[{ name, price, image, alt, hoverImage, href }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Checkout

Collect payment and shipping with as little friction as possible.

_No composed sections — see purpose above._

---

## Workshops

Make the offer and the way of working clear enough to remove hesitation.

### 01 Services
- **Purpose:** Make offers clear
- **Composition:** One row per service with rules between
- **Content:** 4–6 services, each with a one-line description
- **Behavior:** Row hover highlight
- **Responsive:** Full-width rows, description beneath title
- **Design — Said loudly (recommended):** Each service name set large, its line small. Pass `variant="big"`.
- **Reference code:** `src/components/sections/Services.tsx` → `<ServicesSection variant="big" title="Services" items={[{ name, line }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Schedule
- **Purpose:** Show what happens when
- **Composition:** Days as columns (or stacked groups), each a list of time, title and a line of detail
- **Content:** Every day of the programme, real times, short titles
- **Behavior:** Static — no tabs, everything readable at once
- **Responsive:** Days stack, times stay left
- **Reference code:** `src/components/sections/Schedule.tsx` → `<ScheduleSection title="Programme" days={[{ label: "Friday", items: [{ time, title, detail }] }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row
- **Photos — Even grid (recommended):** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile. Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards). Mobile: 2 columns on mobile; never 1 unless the photos are the product itself.
- **Reference code:** `src/components/sections/Gallery.tsx` → `<GallerySection photos={[{ src, alt, caption }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 04 Pricing
- **Purpose:** Remove the final uncertainty
- **Composition:** 2–3 plans side by side, one recommended
- **Content:** Plan name, price, what's included
- **Behavior:** Static
- **Responsive:** Stacked plans, recommended first
- **Design — Cards (recommended):** Plans side by side, the recommended one outlined. Pass `variant="cards"`.
- **Reference code:** `src/components/sections/Pricing.tsx` → `<PricingSection variant="cards" title plans={[{ name, price, period, features: [], action: { label, href }, recommended }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 05 Reservation
- **Purpose:** Convert interest into a booking
- **Composition:** Short invitation + booking widget/form
- **Content:** Opening hours, group policy, phone number
- **Behavior:** Sticky booking button on mobile
- **Responsive:** Full-width form, large touch targets
- **Reference code:** `src/components/sections/Reservation.tsx` → `<ReservationSection title text hours={["…"]} phone form={<BookingForm /> /* shadcn: Calendar in a Popover, Selects, Button */} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 06 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Reference code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Site Chrome

### 01 Navigation — Classic bar
- **Purpose:** Orientation and the primary action
- **Composition:** Full-width bar: logo left, 4–6 links and the primary action right, on the page ground with a hairline bottom border.
- **Content:** Logo, 4–6 links, one action
- **Behavior:** Sticky; gains a surface background after 40px of scroll.
- **Responsive:** Mobile: logo + menu button; opens a simple full-width sheet.

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
| ProductCard | Show a product with price and a way to buy | Image (4:5), name, price, optional swatches | Hover: alternate image; quick add on desktop only |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| FeatureBlock | Explain one capability with evidence | Number/label, heading, 1–2 sentences, supporting visual | Static or fade-rise |
| Accordion | Keep FAQs and details scannable | shadcn/ui Accordion (type="single" collapsible), restyled to the tokens | Height animates open and closed; one answer open at a time |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
