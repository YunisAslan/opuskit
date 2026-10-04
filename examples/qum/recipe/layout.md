## Layout System — Balanced

The frame is already in `src/styles/tokens.css`: `--container`, `--gutter`, `--section-y`, `--ratio-card`, `--ratio-media` — every ready section uses them; new sections use them too, never a fixed max-width or padding. Each section's tone (ground, surface, inverse, chapter) and media placement are set per page below.

| | |
|---|---|
| Container | max-width 1200px, centred, 24px side padding (mobile 20px) |
| Grid | 12 columns |
| Columns | Text in 6–8 central columns; media spans 10–12 |
| Gutters | 24px (mobile 16px) |
| Section spacing | clamp(96px, 12vw, 160px) between sections |
| Alignment | Centred headings, left-aligned body text |
| Hero composition | Centred headline over or above a wide media block (16:9 or 21:9) |
| Card proportions | 4:5 for project/product cards, 3 per row desktop, 1 per row mobile |
| Media proportions | 16:9 wide, 4:5 portrait, 1:1 detail |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Use only values from the scale. Space between sections is always larger than space within them.

### Shape — Soft

Gently rounded corners — calm and friendly. Buttons 8px, cards 12px, media 12px, borders 1px, shadow none. Small, consistent radii; never mix sharp and rounded.

### Menu — Centered logo

Logo in the middle, links split on either side — like a boutique.
- **Composition:** Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.
- **Behavior:** Shrinks to a compact bar after 80px.
- **Responsive:** Mobile: centred logo, menu button left, action right.

## Page Structure

Pages: Home · Shop · Product · Cart · Checkout · The salt · Journal · Article · Help

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Editorial image hero
- **Purpose:** Establish mood and promise immediately
- **Composition:** One strong photograph (portrait 4:5 or wide 3:2) beside or beneath a restrained headline. Clear focal point, generous empty space.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Headline and image fade up once on load (≤ 600ms). No looping motion.
- **Responsive:** Mobile: headline first, image full-width beneath at 4:5. Keep the focal point inside the centre 60% for safe cropping.

### 02 Intro
- **Purpose:** Say what this is and who it is for
- **Composition:** Short statement in display face across 8 columns, with a small label
- **Content:** 1–2 sentences, specific and concrete
- **Behavior:** Line reveal
- **Responsive:** Scale statement to ~8vw; keep line breaks intentional
- **Design — Label and sentence (recommended):** A small label beside the sentence, a calm paragraph under it. Pass `variant="lead"`.
- **Ready code:** `src/components/sections/Statement.tsx` → `<StatementSection variant="lead" label="Studio" statement="…" body="…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Product Grid
- **Purpose:** Browse and choose
- **Composition:** 3–4 column grid of product cards; filters minimal
- **Content:** Name, price, image, availability
- **Behavior:** Hover alternate image
- **Responsive:** 2 columns on mobile
- **Photos — Even grid (recommended):** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile. Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards). Mobile: 2 columns on mobile; never 1 unless the photos are the product itself.
- **Ready code:** `src/components/sections/ProductGrid.tsx` → `<ProductGridSection title products={[{ name, price, image, alt, hoverImage, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width
- **Media:** side — pass `media="side"`
- **Ready code:** `src/components/sections/EditorialStory.tsx` → `<EditorialStorySection title image alt caption paragraphs={[…]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 05 Process
- **Purpose:** Reduce uncertainty about working together
- **Composition:** 3–5 steps in columns or a pinned sequence
- **Content:** Step name, 1–2 sentences, duration
- **Behavior:** Steps reveal in order
- **Responsive:** Vertical list
- **Design — A line to follow (recommended):** The title holds still while the steps run down a line. Pass `variant="rail"`.
- **Ready code:** `src/components/sections/Steps.tsx` → `<StepsSection variant="columns" title="How we work" steps={[{ name, text, duration }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 06 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — One leads (recommended):** One large quote, the rest in a quiet row. Pass `variant="lead"`.
- **Ready code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 07 Press
- **Purpose:** Borrow the credibility of what others wrote
- **Composition:** Grid of short outlet quotes, outlet name set as type; awards in a line beneath
- **Content:** 2–4 real quotes with their outlet, optional awards with year
- **Behavior:** Static
- **Responsive:** Quotes stack
- **Design — Pull quote (recommended):** The best line large, the other outlets named under it. Pass `variant="quote"`.
- **Ready code:** `src/components/sections/Press.tsx` → `<PressSection title="Press" quotes={[{ outlet, quote }]} awards={["…"]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 08 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view
- **Ready code:** `src/components/sections/Journal.tsx` → `<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 09 Newsletter
- **Purpose:** Turn a visit into a returning reader
- **Composition:** One reason to subscribe beside an email field and a button, with a note under it
- **Content:** What they get, how often, and that it is easy to leave
- **Behavior:** Static; the form posts to your email provider
- **Responsive:** Field and button stack, full width
- **Ready code:** `src/components/sections/Newsletter.tsx` → `<NewsletterSection title text placeholder="you@example.com" button="Subscribe" note="Once a month." action="https://…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Shop

Let visitors browse and choose confidently.

### 01 Categories
- **Purpose:** Show the range and let people go straight to their part of it
- **Composition:** 3–4 column grid of image tiles, name and count under each
- **Content:** 3–8 categories, each with a real picture and an honest count
- **Behavior:** Image zooms slightly on hover
- **Responsive:** 2-column grid
- **Ready code:** `src/components/sections/Categories.tsx` → `<CategoriesSection title="Shop by category" items={[{ name, href, image, alt, count }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Product Grid
- **Purpose:** Browse and choose
- **Composition:** 3–4 column grid of product cards; filters minimal
- **Content:** Name, price, image, availability
- **Behavior:** Hover alternate image
- **Responsive:** 2 columns on mobile
- **Photos — Even grid (recommended):** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile. Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards). Mobile: 2 columns on mobile; never 1 unless the photos are the product itself.
- **Ready code:** `src/components/sections/ProductGrid.tsx` → `<ProductGridSection title products={[{ name, price, image, alt, hoverImage, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Trust Strip
- **Purpose:** Remove the small worries before a purchase or sign-up
- **Composition:** One row of 3–5 short promises between rules
- **Content:** Shipping, returns, trial, guarantee, insurance — 2–5 words each plus one plain line
- **Behavior:** Static
- **Responsive:** 2-column grid, then one column
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Ready code:** `src/components/sections/Trust.tsx` → `<TrustSection items={[{ title: "Free returns", text: "Within 30 days." }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

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
- **Ready code:** `src/components/sections/ProductBuy.tsx` → `<ProductBuySection name price line images={[{ src, alt }]} option={{ label: "Colour", values: ["…"] }} details={[{ title, text }]} action={{ label: "Add to bag", href }} note />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Specs
- **Purpose:** Give the facts people check before deciding
- **Composition:** A heading and a line beside the facts: one ruled line per fact (name and value), or a grid of cells with the value large
- **Content:** 6–12 real facts — dimensions, materials, rooms and area, year, place, what is included
- **Behavior:** Static
- **Responsive:** The table keeps two columns; the grid drops to two cells per row
- **Design — Line by line (recommended):** One ruled line per fact, name and value. Pass `variant="table"`.
- **Ready code:** `src/components/sections/Specs.tsx` → `<SpecsSection title text specs={[{ label, value }]} note />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Process
- **Purpose:** Reduce uncertainty about working together
- **Composition:** 3–5 steps in columns or a pinned sequence
- **Content:** Step name, 1–2 sentences, duration
- **Behavior:** Steps reveal in order
- **Responsive:** Vertical list
- **Design — A line to follow (recommended):** The title holds still while the steps run down a line. Pass `variant="rail"`.
- **Ready code:** `src/components/sections/Steps.tsx` → `<StepsSection variant="columns" title="How we work" steps={[{ name, text, duration }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — One leads (recommended):** One large quote, the rest in a quiet row. Pass `variant="lead"`.
- **Ready code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 05 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 06 Product Grid
- **Purpose:** Browse and choose
- **Composition:** 3–4 column grid of product cards; filters minimal
- **Content:** Name, price, image, availability
- **Behavior:** Hover alternate image
- **Responsive:** 2 columns on mobile
- **Photos — Even grid (recommended):** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile. Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards). Mobile: 2 columns on mobile; never 1 unless the photos are the product itself.
- **Ready code:** `src/components/sections/ProductGrid.tsx` → `<ProductGridSection title products={[{ name, price, image, alt, hoverImage, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

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
- **Ready code:** `src/components/sections/ProductGrid.tsx` → `<ProductGridSection title products={[{ name, price, image, alt, hoverImage, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Checkout

Collect payment and shipping with as little friction as possible.

_No composed sections — see purpose above._

---

## The salt

Where QUM comes from: the salt pans at Masazir, the saffron fields at Bilgah, the small lab in Mardakan, and the three people who make every batch.

### 01 About
- **Purpose:** Put a human face and point of view on the work
- **Composition:** Portrait image + statement + short bio
- **Content:** Real names, real history, no mission-statement clichés
- **Behavior:** Fade-rise
- **Responsive:** Portrait above text
- **Media:** side — pass `media="side"`
- **Ready code:** `src/components/sections/About.tsx` → `<AboutSection title="About" image alt statement bio />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width
- **Media:** full — pass `media="full"`
- **Ready code:** `src/components/sections/EditorialStory.tsx` → `<EditorialStorySection title image alt caption paragraphs={[…]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Timeline
- **Purpose:** Tell the story as dated steps
- **Composition:** Heading and a short line beside a hairline of dated steps, oldest first, the latest marked
- **Content:** 4–7 real dates (years or months), each with what happened and one line on why it mattered
- **Behavior:** Static; a scroll-drawn line is an optional moment
- **Responsive:** Heading above, steps stacked along the line
- **Ready code:** `src/components/sections/Timeline.tsx` → `<TimelineSection title="How we got here" text="…" steps={[{ when: "2019", title, detail }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Location
- **Purpose:** Make visiting easy
- **Composition:** Address, hours, map link, one exterior image
- **Content:** Address, hours, transit notes
- **Behavior:** Static
- **Responsive:** Stack; tap-to-call and tap-to-map
- **Media:** side — pass `media="side"`
- **Ready code:** `src/components/sections/Location.tsx` → `<LocationSection title address hours={["…"]} notes mapUrl image alt />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Journal

Show ongoing thinking, in your own voice, over time.

### 01 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view
- **Ready code:** `src/components/sections/Journal.tsx` → `<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Newsletter
- **Purpose:** Turn a visit into a returning reader
- **Composition:** One reason to subscribe beside an email field and a button, with a note under it
- **Content:** What they get, how often, and that it is easy to leave
- **Behavior:** Static; the form posts to your email provider
- **Responsive:** Field and button stack, full width
- **Ready code:** `src/components/sections/Newsletter.tsx` → `<NewsletterSection title text placeholder="you@example.com" button="Subscribe" note="Once a month." action="https://…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Article

Let people read one story well: title, summary, author and date, a calm reading column with pull quotes and pictures, then what to read next.

### 01 Article
- **Purpose:** Let people read one story well
- **Composition:** Kicker, headline (the page h1), a line under it, author and date; the lead picture across the page; one reading column (about 64 characters) where pull quotes and pictures break out wider; the author with a short bio and tags at the end
- **Content:** A title, a 1–2 line summary, 600–2,000 words in short paragraphs, one or two pull quotes, one or two pictures with captions
- **Behavior:** Static; pictures load as they near the screen
- **Responsive:** One column; break-outs return to the column width
- **Ready code:** `src/components/sections/Article.tsx` → `<ArticleSection kicker title dek author={{ name, role, image, bio }} date image={{ src, alt, caption }} body={["Paragraph…", { quote, by }, { image, alt, caption }]} tags={["…"]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view
- **Ready code:** `src/components/sections/Journal.tsx` → `<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Newsletter
- **Purpose:** Turn a visit into a returning reader
- **Composition:** One reason to subscribe beside an email field and a button, with a note under it
- **Content:** What they get, how often, and that it is easy to leave
- **Behavior:** Static; the form posts to your email provider
- **Responsive:** Field and button stack, full width
- **Ready code:** `src/components/sections/Newsletter.tsx` → `<NewsletterSection title text placeholder="you@example.com" button="Subscribe" note="Once a month." action="https://…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Help

Answer the questions that would otherwise stall a decision.

### 01 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Site Chrome

### 01 Navigation — Centered logo
- **Purpose:** Orientation and the primary action
- **Composition:** Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Shrinks to a compact bar after 80px.
- **Responsive:** Mobile: centred logo, menu button left, action right.

### 02 Footer — Everything, listed
- **Purpose:** Practical information and a calm ending
- **Composition:** On the page ground: the logo and one line of contact at the top, then 3–4 columns, each a heading and every link under it (all pages, services, categories, recent posts), then a hairline and copyright and legal.
- **Content:** Address/email, links, copyright
- **Behavior:** Static; links do what the site’s Links behaviour does, the current page marked.
- **Responsive:** Mobile: two columns of lists, then the legal row.
- **Ready code:** `src/components/sections/Footer.tsx` → `<FooterSection variant="index" logo={<Logo />} columns={[{ title, links: [{ label, href, current }] }]} legal={[…]} copyright />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| ProductCard | Show a product with price and a way to buy | Image (4:5), name, price, optional swatches | Hover: alternate image; quick add on desktop only |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| FeatureBlock | Explain one capability with evidence | Number/label, heading, 1–2 sentences, supporting visual | Static or fade-rise |
| Accordion | Keep FAQs and details scannable | shadcn/ui Accordion (type="single" collapsible), restyled to the tokens | Height animates open and closed; one answer open at a time |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
