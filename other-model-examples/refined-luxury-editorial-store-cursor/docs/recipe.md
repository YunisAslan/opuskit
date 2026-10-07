# Maison Vey — Refined Luxury Editorial Store

Maison Vey: A small perfume house making five scents by hand, each one a single place at a single hour. A store in the Luxury Editorial look: the Gala Night lettering (Bodoni Moda with Jost), the Oxblood Room palette, product leading and subtle motion. Primary goal: buy something.

Complexity: light · Recipe id: 04a186d2

---

## Creative Direction

**Mood:** Refined, Unhurried, Exclusive, Elegant

**Personality:** Elegant — graceful and composed

### Visual principles
- Slowness signals value
- Type as jewellery — small, sharp, precise
- Photography does the selling

### Do
- Use the high-contrast serif at large sizes only
- Space sections far apart
- Keep UI text small, in sentence case

### Avoid
- Discount-style badges
- Gold gradients
- Crowded product grids

### Not the generic AI look
- A cream or beige page ground with a clay/terracotta accent
- A near-black ground with one acid-green or orange accent, or tinted charcoal standing in for black
- Small uppercase, letter-spaced monospace labels above every heading
- Numbered markers (01 / 02) on content that is not a real sequence
- Meta strings joined with middle dots or spaced em dashes, and "→" appended to links
- One italic or coloured accent word inside an otherwise plain headline
- Falling back to Inter, Space Grotesk, Syne or Fraunces instead of the recipe's fonts
- Text in mix-blend-difference (or any blend mode) over a photo — its colours turn random; text on a picture sits on a scrim or a solid block
- Effects nobody picked: no text effect, hover, cursor or scroll trick beyond the recipe's motion system and Your Kit

### Design principles
- Slowness signals value
- Type as jewellery — small, sharp, precise
- Photography does the selling
- Content eases in once as it enters the viewport; media drifts slightly. Nothing loops.

---

## Award checklist

What separates an award-winning site from a good template (from a study of 12 Awwwards sites). Check every page against it.

- One idea: everything serves the creative direction. A part that doesn’t serve it gets quieter, not louder.
- One unforgettable moment per page — and only one. Everything else on that page supports it.
- Type scale contrast: the biggest Bodoni Moda size is at least 6× the body size on desktop, labels stay small (11–14 px, Jost), and nothing in between competes.
- Motion choreography: one thing moves at a time; each arrival enters, holds and leaves; staggers of 40–80 ms; the same one or two easings everywhere.
- The first seconds: the first screen is complete and readable before anything animates.
- Mobile is its own composition: headlines re-broken by hand, media re-cropped, pinned and hover effects replaced by their mobile versions — never a squeezed desktop.
- The ending is designed: the footer (Signature columns) is a moment, not leftovers
- Craft details: text selection in the accent colour, a favicon from the logo, designed focus states, no layout shift, real copy everywhere, a 404 page in the same voice.
- Smooth is part of the effect: 60 fps on a mid-range laptop; animate transform and opacity only; nothing runs off-screen.

---

## Color System — Oxblood Room

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#4A1119` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#5A1A23` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 11.30:1 — AAA |
| text | `#F8ECE8` | Primary reading color | Headlines and body copy — ink is ink: keep it neutral, never recolour it to another hue | On background: 13.10:1 — AAA |
| muted | `#D7B5B0` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 8.03:1 — AAA |
| primary | `#F8ECE8` | Brand ink | Primary buttons, key links, logo | On background: 13.10:1 — AAA |
| secondary | `#6B2530` | Supporting tone | Secondary buttons, tags, subtle section backgrounds — a small step from the ground, never a darker mid-tone of it | — |
| accent | `#A9D6FF` | The one signal | Powder blue for time-codes, active chapter and play states | On background: 9.92:1 — AAA |
| border | `#6E2A34` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #4A1119;
  --color-surface: #5A1A23;
  --color-text: #F8ECE8;
  --color-muted: #D7B5B0;
  --color-primary: #F8ECE8;
  --color-secondary: #6B2530;
  --color-accent: #A9D6FF;
  --color-border: #6E2A34;
}
```

---

## Typography — Gala Night

| Role | Family | Weight | Size | Line-height | Letter-spacing | Use |
|---|---|---|---|---|---|---|
| Display | Bodoni Moda | 400 | clamp(3.25rem, 9vw, 8rem) | 0.95 | -0.02em | Hero, mastheads |
| Heading | Bodoni Moda | 500 | clamp(1.75rem, 3vw, 2.5rem) | 1.1 | -0.01em | Section headings |
| Body | Jost | 400 | 1rem | 1.6 | 0 | Paragraphs, product details |
| Utility | Jost | 500 | 0.75rem | 1.3 | 0.06em (uppercase) | Mastheads and navigation only — the one pairing where caps are the convention |

Source: Google Fonts (Bodoni Moda, Jost)

**Why this pairing works:** The fashion-magazine pairing: an optical-size Didone keeps hairlines at display size, and Jost carries Futura's geometry for the quiet parts.

---

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

---

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

---

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| ProductCard | Show a product with price and a way to buy | Image (4:5), name, price, optional swatches | Hover: alternate image; quick add on desktop only |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| FeatureBlock | Explain one capability with evidence | Number/label, heading, 1–2 sentences, supporting visual | Static or fade-rise |
| Accordion | Keep FAQs and details scannable | shadcn/ui Accordion (type="single" collapsible), restyled to the tokens | Height animates open and closed; one answer open at a time |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |

---

## Media Direction — Product-led

The product is photographed like an object of desire: isolated, well-lit, from consistent angles.

### Treatment
- Seamless backgrounds matching the palette surface color
- Same lighting and lens across all product shots
- Show scale and detail (close-ups)
- Use lifestyle images only in editorial sections

**Formats:** Transparent PNG/WebP cut-outs or AVIF on seamless background; 2400px min

### Hero — Product stage
- **Composition:** The product isolated on a clean surface, large and centred or offset, with name, one-line promise and price/CTA.
- **Behavior:** Subtle: product fades/scales in. Dynamic: product rotates or swaps angles on scroll using an image sequence (24–48 frames).
- **Responsive:** Mobile: product first, text beneath, CTA sticky at bottom.
- **Requires:** Product photo on seamless background (min 2400px); Optional 24–48 frame turntable sequence
- **Fallback:** Temporary curated product image; mark as placeholder.

### Shot list — part by part

What each picture or film shows. Real media is what makes the site premium: find, shoot or make exactly these; until one exists, its part uses a temporary picture of the same subject and format.

| Where | | What it shows | Format |
|---|---|---|---|
| Home · First screen — Product stage | photo | The opening picture of Maison Vey: the place, the thing it makes or the person, at its best light, with calm space where the headline sits | min 2800px · 16:9 for desktop and a 4:5 crop for phones |
| Home · Product Grid | photo | each product alone on the same ground, from the same angle, in the same light | one per product · 4:5 · min 2000px |
| Home · Collection | photo | one picture per range: its best piece, all styled and lit the same way | 3–6 photos · 4:5 · min 2400px |
| Home · Editorial Story | photo | the pictures that carry the story between paragraphs: a detail, the place, the people | 2–4 photos · mixed 3:2 and 4:5 · min 2400px |
| Shop · Product Grid | photo | each product alone on the same ground, from the same angle, in the same light | one per product · 4:5 · min 2000px |
| Shop · Product Highlight | photo | the main product up close: in hand or in use, its material visible | 1–3 photos · 4:5 or 1:1 · min 2400px |
| Shop · Collection | photo | one picture per range: its best piece, all styled and lit the same way | 3–6 photos · 4:5 · min 2400px |
| Product · Product Highlight | photo | the main product up close: in hand or in use, its material visible | 1–3 photos · 4:5 or 1:1 · min 2400px |
| Product · Product Grid | photo | each product alone on the same ground, from the same angle, in the same light | one per product · 4:5 · min 2000px |
| Cart · Product Grid | photo | each product alone on the same ground, from the same angle, in the same light | one per product · 4:5 · min 2000px |
| About · About | photo | a real portrait of the person or the team, in their own place | 1–2 photos · 4:5 portrait · min 2400px |

---

## Motion System — Subtle

Content eases in once as it enters the viewport; media drifts slightly. Nothing loops.

**Rule:** animation for demonstration, not decoration.

**Libraries:** CSS (transitions, scroll-driven animations), Motion

### State feedback
- **Purpose:** Confirm interaction (hover, focus, press) so controls feel responsive.
- **Trigger:** Pointer hover, keyboard focus, active press
- **Behavior:** Color/underline/opacity change; no layout shift.
- **Duration:** 120–180ms
- **Easing:** ease-out
- **Implementation:** CSS transitions on color, opacity, transform.
- **Performance:** Transition only color, opacity, transform.
- **Reduced motion:** Keep — these are not motion-heavy; remove transform component.

### Clip reveal
- **Purpose:** Sections open like turning a page — the frame first, then the words.
- **Trigger:** Element enters viewport (IntersectionObserver, threshold 0.2), once
- **Behavior:** blocks unmask upward: clip-path inset(100% 0 0 0) → inset(0); images settle from scale 1.06; text lines follow 70ms apart.
- **Duration:** 700–900ms
- **Easing:** cubic-bezier(0.65, 0, 0.35, 1)
- **Implementation:** Motion `whileInView` with `viewport={{ once: true }}`, or CSS + IntersectionObserver class toggle.
- **Performance:** Animate transform/opacity only; don't observe hundreds of nodes — observe section wrappers.
- **Reduced motion:** Opacity only, 200ms, no translate.

### Image clip reveal
- **Purpose:** Create a visual transition into the next section; the image "opens" like a curtain.
- **Trigger:** Viewport entry
- **Behavior:** clip-path: inset(100% 0 0 0) → inset(0); inner image scales 1.15 → 1.
- **Duration:** 900–1200ms
- **Easing:** cubic-bezier(0.65, 0, 0.35, 1)
- **Implementation:** CSS clip-path transition triggered by IntersectionObserver, or Motion useScroll + useTransform for a scroll-linked version.
- **Performance:** clip-path and transform are compositor-friendly in modern browsers; avoid animating width/height.
- **Reduced motion:** Simple 200ms fade.

### Line-by-line headline reveal
- **Purpose:** Direct attention to headlines and set reading pace.
- **Trigger:** Viewport entry, once
- **Behavior:** Each line masked (overflow hidden) and translated from 100% to 0, 80ms stagger.
- **Duration:** 700ms per line
- **Easing:** cubic-bezier(0.22, 1, 0.36, 1)
- **Implementation:** Split lines manually in markup (preferred for control) (one span per line or word); animate with Motion or CSS.
- **Performance:** Only transform; split into lines, not characters, for body-length text.
- **Reduced motion:** Show lines immediately.

---

## Signature Moments

None — this recipe keeps interaction deliberately quiet.

---

## Content Direction

- **Tone:** composed, precise
- **Voice:** Measured sentences, no exclamation marks.
- **Headline style:** Short, poised statements
- **Headline examples:** "Made to be used every day", "New this week", "Built to last, priced fairly"
- **Paragraph length:** 2–4 sentences (40–80 words); never more than 65 characters per line
- **CTA style:** Product pages, a cart and a short checkout path are prioritised. Clear "Add to bag" on product surfaces; editorial sections link to products, not to generic "Shop now".
- **CTA examples:** "Add to bag", "Shop the collection", "Buy now", "Shop now"
- **Content density:** Very low — images dominate, copy is caption-length
- **Words to avoid:** "Elevate your brand", "The future of…", "Seamless experiences", "Unlock your potential", "Built for modern teams", "Cutting-edge", "Revolutionary", "World-class"

## Copy deck — write it before any layout

Write from the owner's own words — the name “Maison Vey” and “A small perfume house making five scents by hand, each one a single place at a single hour.” Every headline, line and claim grows from them: name what is really there — what is made, where, when, for whom. The headline and CTA examples are only the register, taken from another site: never reuse them. Anything you must invent (quotes, prices, names, numbers, dates) is marked in the copy deck as a placeholder for the owner to replace.

### Home
Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

- **Hero:** Establish mood and promise immediately. One headline (≤ 8 words), one supporting line, one action.
- **Product Grid:** Browse and choose. Name, price, image, availability.
- **Collection:** Introduce the season or range. Collection name, one paragraph, season.
- **Editorial Story:** Tell the story behind the brand in a readable, magazine-like format. 150–300 words, one pull quote.
- **Testimonials:** Let real people vouch for the work. 3–4 real quotes, each with a name and role.
- **Trust Strip:** Remove the small worries before a purchase or sign-up. Shipping, returns, trial, guarantee, insurance — 2–5 words each plus one plain line.
- **Newsletter:** Turn a visit into a returning reader. What they get, how often, and that it is easy to leave.

### Shop
Let visitors browse and choose confidently.

- **Product Grid:** Browse and choose. Name, price, image, availability.
- **Product Highlight:** Show one product (or feature) in depth. Materials, dimensions, key benefit.
- **Collection:** Introduce the season or range. Collection name, one paragraph, season.
- **FAQ:** Answer real objections. 5–8 genuine questions.

### Product
Show one product in full: gallery, price, variants, add-to-cart, and related items.

- **Product buy box:** Let people buy one product on its own page. 3–6 photos of the real product, one price, one option set, 3–4 short details.
- **Product Highlight:** Show one product (or feature) in depth. Materials, dimensions, key benefit.
- **Testimonials:** Let real people vouch for the work. 3–4 real quotes, each with a name and role.
- **FAQ:** Answer real objections. 5–8 genuine questions.
- **Product Grid:** Browse and choose. Name, price, image, availability.

### Cart
Let visitors review and adjust their selection before checkout.

- **Product Grid:** Browse and choose. Name, price, image, availability.

### Checkout
Collect payment and shipping with as little friction as possible.

- Written in full from the page brief above.

### About
Put a human face and point of view on the work; build trust.

- **About:** Put a human face and point of view on the work. Real names, real history, no mission-statement clichés.
- **Process:** Reduce uncertainty about working together. Step name, 1–2 sentences, duration.

---

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 2 families | required | All text | Bodoni Moda, Jost (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ⌕ Find it | Product photography | 6–12 images | required | Hero, product grid, detail views | Consistent angles: front, 3/4, detail; seamless background |
| ⌕ Find it | Lifestyle images | 2–4 images | recommended | Editorial story sections | Product in context, same grade |
| ○ Optional | Turntable sequence | 24–48 frames | optional | Scroll-rotating product | Fixed camera, 7.5–15° per frame |

### Asset Creation Paths

#### Shoot products on a seamless background
1. Use a paper sweep in the recipe surface color (#5A1A23).
2. One soft key light at 45°, one fill card; same lens and height for every product.
3. Shoot front, 3/4 and one detail for each product.
4. Export 2400px, compress to AVIF/WebP.

Tools: Squoosh, Unsplash

---

## Curated Resources

- **Google Fonts** (fonts) — https://fonts.google.com
  Variable families with width and optical-size axes (Zalando Sans, Mona Sans, Newsreader, Bodoni Moda) give a whole type system from one file, and next/font self-hosts them. Skip the most-used defaults. _License: Open-source licenses, mostly SIL OFL; free for commercial use_
- **Realtime Colors** (color) — https://www.realtimecolors.com
  Shows a palette applied to real UI with light and dark modes before tokens are committed. _License: Free web tool_
- **WebAIM Contrast Checker** (color) — https://webaim.org/resources/contrastchecker/
  Muted, low-contrast palettes common in quiet and editorial designs need checking to stay readable. _License: Free web tool_
- **Lucide** (icons) — https://lucide.dev
  Consistent 24px stroke icons with adjustable stroke width, so icons can match the weight of the chosen typeface. _License: ISC_
- **Squoosh** (developer-tools) — https://squoosh.app
  Compares AVIF, WebP and JPEG output visually so large hero images can be shrunk without visible loss. _License: Apache-2.0_
- **Unsplash** (images) — https://unsplash.com
  Its imgix CDN resizes and crops by URL parameter, so one photo ID serves every breakpoint during prototyping. _License: Free under the Unsplash License; attribution appreciated; Unsplash+ images excluded_
- **Motion** (motion) — https://motion.dev
  Layout animations, shared-element transitions and spring physics are declared directly on React components. _License: MIT_

---

## References

Study the principle. Build something original — never copy a referenced site.

### Fashion websites (Awwwards)
https://www.awwwards.com/websites/fashion/
- **Study:** Type–image relationships: how display serifs overlap or sit beside portrait imagery.
- **Why it matters:** Large type establishes hierarchy without adding decorative UI.
- **Principle:** Typography as frame

### E-commerce websites (Awwwards)
https://www.awwwards.com/websites/e-commerce/
- **Study:** How premium stores keep product grids calm: gutters, image ratios, quiet prices.
- **Why it matters:** Space between products reads as value.
- **Principle:** Spacing signals price

### Land-book — fashion category (Land-book)
https://land-book.com/
- **Study:** Navigation patterns on fashion sites: small labels, split menus.
- **Why it matters:** Navigation restraint keeps attention on the imagery.
- **Principle:** Quiet chrome

---

## Why It Works

### Why the visual direction works
Premium brands earn trust through calm confidence: fewer elements, more space, and typography with real craft.

### Why the typography works
The fashion-magazine pairing: an optical-size Didone keeps hairlines at display size, and Jost carries Futura's geometry for the quiet parts.

### Why the palette works
A claret room is warm and dramatic like a cinema interior; the cool powder-blue accent keeps it modern instead of the usual brown-black with copper.

### Why the layout works
Editorial grids pair narrow reading columns with generous media, mimicking print — content feels curated and worth reading.

### Why the motion works
Subtle reveals give rhythm and polish without distracting from reading. Here, clip reveal and image clip reveal serve the story: sections open like turning a page — the frame first, then the words.

### Why the chosen assets work
Consistent product photography builds trust and perceived quality — it is the storefront window.

---

## UI Components — shadcn/ui (Radix primitives)

Every control and form uses these ready-made, accessible components (https://ui.shadcn.com/docs/components), restyled to this recipe. Users expect polished fields — no unstyled browser defaults.

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu radio-group select toggle-group card badge input form label slider pagination accordion carousel breadcrumb table separator checkbox
```

| Component | Used on |
|---|---|
| Button (`button`) | every page |
| Slide-in panel (`sheet`) | every page, main action — buy something |
| Toast messages (`sonner`) | every page |
| Tooltip (`tooltip`) | every page |
| Navigation menu (`navigation-menu`) | navigation |
| Dropdown menu (`dropdown-menu`) | navigation |
| Option picker (`radio-group`) | main action — buy something, Shop — Product Highlight, Product, Product — Product Highlight, Checkout |
| Select (`select`) | main action — buy something, Home — Product Grid, Shop, Shop — Product Grid, Shop — Product Highlight, Product, Product — Product Highlight, Product — Product Grid, Cart — Product Grid, Checkout |
| Filter chips (`toggle-group`) | Home — Product Grid, Home — Collection, Shop, Shop — Product Grid, Shop — Collection, Product — Product Grid, Cart — Product Grid |
| Card (`card`) | Home — Product Grid, Shop — Product Grid, Product — Product Grid, Cart — Product Grid |
| Badge (`badge`) | Home — Product Grid, Home — Collection, Shop — Product Grid, Shop — Product Highlight, Shop — Collection, Product — Product Highlight, Product — Product Grid, Cart — Product Grid |
| Text field (`input`) | Home — Newsletter, Cart, Checkout |
| Form with validation (`form`) | Home — Newsletter, Checkout |
| Label (`label`) | Home — Newsletter, Checkout |
| Range slider (`slider`) | Shop |
| Pagination (`pagination`) | Shop |
| Accordion (`accordion`) | Shop — FAQ, Product, Product — FAQ |
| Carousel (`carousel`) | Product |
| Breadcrumb (`breadcrumb`) | Product |
| Table (`table`) | Cart |
| Separator (`separator`) | Cart, Checkout |
| Checkbox (`checkbox`) | Checkout |

### Theme (paste over the :root values shadcn init writes)

```css
:root {
  --background: #4A1119; --foreground: #F8ECE8;
  --card: #5A1A23; --card-foreground: #F8ECE8; --popover: #5A1A23; --popover-foreground: #F8ECE8;
  --primary: #F8ECE8; --primary-foreground: #4A1119; --secondary: #6B2530; --secondary-foreground: #F8ECE8;
  --muted: #5A1A23; --muted-foreground: #D7B5B0; --accent: #6B2530; --accent-foreground: #F8ECE8;
  --border: #6E2A34; --input: #D7B5B0; --ring: #F8ECE8; --radius: 0px;
}
```

### Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Button text uses the recipe’s type roles, never shadcn’s own text-sm / font-medium; a button beside links (the menu’s action) is set exactly like them — same role, size and width — so the row reads as one.
- Restyle, don't ship the demo look: recipe fonts, sharp shape (buttons 0px, cards 0px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.

---

## Implementation Guide

**Recommended stack:** Next.js (App Router), TypeScript, Tailwind CSS, Motion

### Dependencies
- `motion` — Viewport reveals, hover and layout animations in React
- `shadcn/ui` — Accessible, themeable controls and forms (Radix primitives) — see UI components

### Suggested file structure
```
src/
  app/            — routes; layout.tsx loads fonts via next/font
  components/     — ProductCard, MediaSection, FeatureBlock, Accordion, MediaAsset
  config/assets.ts — asset reference layer (every image/video by key)
  styles/tokens.css — palette + type tokens as CSS variables
public/media/     — optimised images and videos
```

### Implementation sequence
1. Write the copy deck first (recipe/content.md → Copy deck): every headline, line and button of every part, from the owner’s own words, into src/content/ — no layout before the words exist.
2. Set up tokens: palette as CSS variables, fonts with next/font, spacing scale in Tailwind theme.
3. Build the asset config layer (config/assets.ts) and <MediaAsset/> so every media reference is replaceable; place media by the shot list (recipe/media.md) — a part still waiting for its media gets a temporary picture of the same subject and format, listed in your final reply.
4. Build static layout for all 6 pages (19 sections plus navbar and footer) with real copy — no motion yet.
5. Build the hero: Product stage.
6. Make every section responsive (mobile first, then tablet and desktop).
7. Add motion in order of importance: Clip reveal, Image clip reveal, Line-by-line headline reveal.
8. Add reduced-motion variants, then run the visual QA checklist against this recipe.

### Responsive
- Design mobile as its own composition, not a squeezed desktop.
- Hero: Mobile: product first, text beneath, CTA sticky at bottom.
- Type: display scales with clamp() — clamp(3.25rem, 9vw, 8rem); re-break headlines manually on mobile.
- Grid: 12 columns with a 2-column margin rail for captions; 32px (mobile 16px).
- Touch targets ≥ 44px; primary action reachable with a thumb.

### Accessibility
- Semantic landmarks (header, nav, main, footer) and one h1 per page.
- Keyboard focus is shown without rings or outlines: a focused field darkens its border, a focused link or button gets an underline or background change.
- Every animation has a prefers-reduced-motion alternative (see Motion System).
- Alt text for meaningful images; empty alt for decorative ones.
- Check contrast: body text must pass AA (13.1:1 on background).

### Performance
- Only the hero media uses priority loading; everything else lazy-loads.
- Animate transform and opacity only; avoid animating layout properties.
- Self-host fonts with next/font; Bodoni Moda / Jost — subset display faces.
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms on a mid-range phone.
