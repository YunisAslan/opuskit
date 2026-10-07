## Layout System — Editorial

The frame is already in `src/styles/tokens.css`: `--container`, `--gutter`, `--section-y`, `--ratio-card`, `--ratio-media` — every ready section uses them; new sections use them too, never a fixed max-width or padding. Each section's tone (ground, surface, inverse, chapter) and media placement are set per page below.

| | |
|---|---|
| Container | max-width 1440px, 32px side padding (mobile 20px) |
| Grid | 12 columns with a 2-column margin rail for captions |
| Columns | Headlines 8 columns, body 5 columns max (~65ch), captions in the rail |
| Gutters | 32px (mobile 16px) |
| Section spacing | clamp(120px, 14vw, 200px) between chapters, 48px within |
| Alignment | Flush-left, ragged-right; captions top-aligned to images |
| Hero composition | Large headline across 8 columns, portrait image offset to columns 8–12 |
| Card proportions | 3:4 portrait covers, alternating 1 large + 2 small |
| Media proportions | 3:4 portrait, 4:5, occasional full-width 21:9 |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Use only values from the scale. Space between sections is always larger than space within them.

### Shape — Sharp

Square corners, crisp lines — precise and editorial. Buttons 0px, cards 0px, media 0px, borders 1px, shadow none. No rounded corners anywhere; structure comes from lines and space.

### Menu — Classic bar

Logo on the left, links on the right, always at the top.
- **Composition:** Full-width bar: logo left, 4–6 links and the primary action right, on the page ground with a hairline bottom border.
- **Behavior:** Sticky; gains a surface background after 40px of scroll.
- **Responsive:** Mobile: logo + menu button; opens a simple full-width sheet.

## Page Structure

Pages: Home · Shop · Product · Cart · Checkout · About

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Product stage
- **Purpose:** Establish mood and promise immediately
- **Composition:** The product isolated on a clean surface, large and centred or offset, with name, one-line promise and price/CTA.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Subtle: product fades/scales in. Dynamic: product rotates or swaps angles on scroll using an image sequence (24–48 frames).
- **Responsive:** Mobile: product first, text beneath, CTA sticky at bottom.

### 02 Product Grid
- **Purpose:** Browse and choose
- **Composition:** 3–4 column grid of product cards; filters minimal
- **Content:** Name, price, image, availability
- **Behavior:** Hover alternate image
- **Responsive:** 2 columns on mobile
- **Photos — Even grid (recommended):** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile. Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards). Mobile: 2 columns on mobile; never 1 unless the photos are the product itself.
- **Reference code:** `src/components/sections/ProductGrid.tsx` → `<ProductGridSection title products={[{ name, price, image, alt, hoverImage, href }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Collection
- **Purpose:** Introduce the season or range
- **Composition:** Full-height image with collection title, then 2–3 key pieces
- **Content:** Collection name, one paragraph, season
- **Behavior:** Image reveal
- **Responsive:** Portrait crop, title over lower third
- **Photos — Sideways strip (recommended):** One row of large photos at a shared height (60–70 vh), native widths, generous gutters; a small counter (01 / 08) in the utility face. Desktop: pinned section, vertical scroll translates the row horizontally (sticky frame + Motion useScroll → useTransform on x, or CSS scroll-driven animation). Reduced motion: native horizontal scroll with snap. Mobile: Mobile: native swipe carousel with scroll-snap — no pinning.
- **Reference code:** `src/components/sections/Collection.tsx` → `<CollectionSection season title text image alt pieces={[{ name, price, image, alt, href }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 04 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width
- **Media:** side — pass `media="side"`
- **Reference code:** `src/components/sections/EditorialStory.tsx` → `<EditorialStorySection title image alt caption paragraphs={[…]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 05 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — One leads (recommended):** One large quote, the rest in a quiet row. Pass `variant="lead"`.
- **Reference code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 06 Trust Strip
- **Purpose:** Remove the small worries before a purchase or sign-up
- **Composition:** One row of 3–5 short promises between rules
- **Content:** Shipping, returns, trial, guarantee, insurance — 2–5 words each plus one plain line
- **Behavior:** Static
- **Responsive:** 2-column grid, then one column
- **Reference code:** `src/components/sections/Trust.tsx` → `<TrustSection items={[{ title: "Free returns", text: "Within 30 days." }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 07 Newsletter
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
- **Content:** Materials, dimensions, key benefit
- **Behavior:** Pinned product with advancing details (immersive) or static
- **Responsive:** Media then detail list
- **Media:** side — pass `media="side"`
- **Reference code:** `src/components/sections/ProductHighlight.tsx` → `<ProductHighlightSection name text image alt details={[{ label, value }]} action={{ label, href }} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Collection
- **Purpose:** Introduce the season or range
- **Composition:** Full-height image with collection title, then 2–3 key pieces
- **Content:** Collection name, one paragraph, season
- **Behavior:** Image reveal
- **Responsive:** Portrait crop, title over lower third
- **Photos — Sideways strip (recommended):** One row of large photos at a shared height (60–70 vh), native widths, generous gutters; a small counter (01 / 08) in the utility face. Desktop: pinned section, vertical scroll translates the row horizontally (sticky frame + Motion useScroll → useTransform on x, or CSS scroll-driven animation). Reduced motion: native horizontal scroll with snap. Mobile: Mobile: native swipe carousel with scroll-snap — no pinning.
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
- **Design — Buy column stays (recommended):** Pictures stacked; the price and button stay in view beside them. Pass `variant="sticky"`.
- **Reference code:** `src/components/sections/ProductBuy.tsx` → `<ProductBuySection name price line images={[{ src, alt }]} option={{ label: "Colour", values: ["…"] }} details={[{ title, text }]} action={{ label: "Add to bag", href }} note />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Product Highlight
- **Purpose:** Show one product (or feature) in depth
- **Composition:** Large product media with 3–4 annotated details
- **Content:** Materials, dimensions, key benefit
- **Behavior:** Pinned product with advancing details (immersive) or static
- **Responsive:** Media then detail list
- **Media:** side — pass `media="side"`
- **Reference code:** `src/components/sections/ProductHighlight.tsx` → `<ProductHighlightSection name text image alt details={[{ label, value }]} action={{ label, href }} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — One leads (recommended):** One large quote, the rest in a quiet row. Pass `variant="lead"`.
- **Reference code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

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

### 02 Process
- **Purpose:** Reduce uncertainty about working together
- **Composition:** 3–5 steps in columns or a pinned sequence
- **Content:** Step name, 1–2 sentences, duration
- **Behavior:** Steps reveal in order
- **Responsive:** Vertical list
- **Design — A line to follow (recommended):** The title holds still while the steps run down a line. Pass `variant="rail"`.
- **Reference code:** `src/components/sections/Steps.tsx` → `<StepsSection variant="columns" title="How we work" steps={[{ name, text, duration }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Site Chrome

### 01 Navigation — Classic bar
- **Purpose:** Orientation and the primary action
- **Composition:** Full-width bar: logo left, 4–6 links and the primary action right, on the page ground with a hairline bottom border.
- **Content:** Logo, 3–5 links, one action
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
