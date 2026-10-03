## Layout System — Full-bleed

| | |
|---|---|
| Container | Media edge-to-edge (100vw); text in a 1200px inner container |
| Grid | 12 columns for overlaid text |
| Columns | Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8 |
| Gutters | 24px |
| Section spacing | Media sections are 100svh; text sections 120–160px padding |
| Alignment | Text anchored to bottom-left of media with safe-area padding |
| Hero composition | 100svh media, headline bottom-left, minimal nav overlaid with blend-safe contrast |
| Card proportions | Rare — use full-width project slides instead of cards |
| Media proportions | 16:9 / 21:9 desktop, 9:16 or 4:5 crop on mobile |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Use only values from the scale. Space between sections is always larger than space within them.

### Shape — Sharp

Square corners, crisp lines — precise and editorial. Buttons 0px, cards 0px, media 0px, borders 1px, shadow none. No rounded corners anywhere; structure comes from lines and space.

### Menu — Centered logo

Logo in the middle, links split on either side — like a boutique.
- **Composition:** Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.
- **Behavior:** Shrinks to a compact bar after 80px.
- **Responsive:** Mobile: centred logo, menu button left, action right.

## Page Structure

Pages: Home · Collections · About · Contact

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Ambient video hero
- **Purpose:** Establish mood and promise immediately
- **Composition:** Full-viewport muted loop (8–15s) behind a short headline; a poster frame shows instantly while video loads.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** autoplay, muted, loop, playsInline. Pauses when out of view (IntersectionObserver) and when the tab is hidden. Visible pause control.
- **Responsive:** Mobile: 9:16 or 4:5 encode ≤ 3MB, or the poster image only on Save-Data / slow connections.

### 02 Collection
- **Purpose:** Introduce the season or range
- **Composition:** Full-height image with collection title, then 2–3 key pieces
- **Content:** Collection name, one paragraph, season
- **Behavior:** Image reveal
- **Responsive:** Portrait crop, title over lower third
- **Photos — Sideways strip (recommended):** One row of large photos at a shared height (60–70 vh), native widths, generous gutters; a small counter (01 / 08) in the utility face. Desktop: pinned section, vertical scroll translates the row horizontally (sticky frame + Motion useScroll → useTransform on x, or CSS scroll-driven animation). Reduced motion: native horizontal scroll with snap. Mobile: Mobile: native swipe carousel with scroll-snap — no pinning.
- **Ready code:** `src/components/sections/Collection.tsx` → `<CollectionSection season title text image alt pieces={[{ name, price, image, alt, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Product Grid
- **Purpose:** Browse and choose
- **Composition:** 3–4 column grid of product cards; filters minimal
- **Content:** Name, price, image, availability
- **Behavior:** Hover alternate image
- **Responsive:** 2 columns on mobile
- **Photos — Even grid (recommended):** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile. Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards). Mobile: 2 columns on mobile; never 1 unless the photos are the product itself.
- **Ready code:** `src/components/sections/ProductGrid.tsx` → `<ProductGridSection title products={[{ name, price, image, alt, hoverImage, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view
- **Ready code:** `src/components/sections/Journal.tsx` → `<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 05 Newsletter
- **Purpose:** Turn a visit into a returning reader
- **Composition:** One reason to subscribe beside an email field and a button, with a note under it
- **Content:** What they get, how often, and that it is easy to leave
- **Behavior:** Static; the form posts to your email provider
- **Responsive:** Field and button stack, full width
- **Ready code:** `src/components/sections/Newsletter.tsx` → `<NewsletterSection title text placeholder="you@example.com" button="Subscribe" note="Once a month." action="https://…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Collections

Present the current collection through an editorial, image-led experience.

### 01 Collection
- **Purpose:** Introduce the season or range
- **Composition:** Full-height image with collection title, then 2–3 key pieces
- **Content:** Collection name, one paragraph, season
- **Behavior:** Image reveal
- **Responsive:** Portrait crop, title over lower third
- **Photos — Sideways strip (recommended):** One row of large photos at a shared height (60–70 vh), native widths, generous gutters; a small counter (01 / 08) in the utility face. Desktop: pinned section, vertical scroll translates the row horizontally (sticky frame + Motion useScroll → useTransform on x, or CSS scroll-driven animation). Reduced motion: native horizontal scroll with snap. Mobile: Mobile: native swipe carousel with scroll-snap — no pinning.
- **Ready code:** `src/components/sections/Collection.tsx` → `<CollectionSection season title text image alt pieces={[{ name, price, image, alt, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Lookbook
- **Purpose:** Sell a mood through styled looks
- **Composition:** Magazine spreads: large + small image pairs with look numbers
- **Content:** Look number, pieces worn, links to products
- **Behavior:** Clip reveals; optional horizontal scroll on desktop
- **Responsive:** Vertical stack, one look per screen
- **Photos — Lookbook spreads (recommended):** Two-up spreads of portrait (4:5 or 2:3) photos, one pair per screen; every third spread breaks the pattern with a single full-height photo and a line of text. Each spread reveals as a pair; optional curtain reveal on the first. Mobile: One photo per screen on mobile, keeping the pair order.
- **Ready code:** `src/components/sections/Lookbook.tsx` → `<LookbookSection looks={[{ number: "01", image, alt, detail, pieces: "…" }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Product Grid
- **Purpose:** Browse and choose
- **Composition:** 3–4 column grid of product cards; filters minimal
- **Content:** Name, price, image, availability
- **Behavior:** Hover alternate image
- **Responsive:** 2 columns on mobile
- **Photos — Even grid (recommended):** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile. Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards). Mobile: 2 columns on mobile; never 1 unless the photos are the product itself.
- **Ready code:** `src/components/sections/ProductGrid.tsx` → `<ProductGridSection title products={[{ name, price, image, alt, hoverImage, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## About

Put a human face and point of view on the work; build trust.

### 01 About
- **Purpose:** Put a human face and point of view on the work
- **Composition:** Portrait image + statement + short bio
- **Content:** Real names, real history, no mission-statement clichés
- **Behavior:** Fade-rise
- **Responsive:** Portrait above text
- **Ready code:** `src/components/sections/About.tsx` → `<AboutSection title="About" image alt statement bio />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width
- **Ready code:** `src/components/sections/EditorialStory.tsx` → `<EditorialStorySection title image alt caption paragraphs={[…]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Team
- **Purpose:** Show the people behind it
- **Composition:** Portrait grid: photo, name, role, one line each
- **Content:** 3–8 people: real photo, name, role, one sentence
- **Behavior:** Fade-rise
- **Responsive:** 2-column grid
- **Ready code:** `src/components/sections/Team.tsx` → `<TeamSection title="The team" people={[{ name, role, line, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Contact

Give one clear, low-friction way to get in touch.

### 01 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Location
- **Purpose:** Make visiting easy
- **Composition:** Address, hours, map link, one exterior image
- **Content:** Address, hours, transit notes
- **Behavior:** Static
- **Responsive:** Stack; tap-to-call and tap-to-map
- **Ready code:** `src/components/sections/Location.tsx` → `<LocationSection title address hours={["…"]} notes mapUrl image alt />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 FAQ
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

### 02 Footer — Signature columns
- **Purpose:** Practical information and a calm ending
- **Composition:** Dark band (text colour as ground): the logo large on the left (5 of 12 columns), 2–3 link columns with headings, then a hairline and one row: copyright left, legal links right.
- **Content:** Address/email, links, copyright
- **Behavior:** Static; links get a wavy underline on hover and on the current page.
- **Responsive:** Mobile: logo, then the columns stacked, then the legal row wrapped.
- **Ready code:** `src/components/sections/Footer.tsx` → `<FooterSection logo={<Logo />} columns={[{ title, links: [{ label, href, current }] }]} legal={[…]} copyright />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| Navigation | Orient and offer the primary action | Logo left, 3–5 links, one primary action right; mobile: full-screen menu | Hides on scroll down, reappears on scroll up; solid background after hero |
| Hero | Set the mood and the promise in one view | Full-viewport muted loop (8–15s) behind a short headline; a poster frame shows instantly while video loads. | autoplay, muted, loop, playsInline. Pauses when out of view (IntersectionObserver) and when the tab is hidden. Visible pause control. |
| LookbookSpread | Present a look like a magazine spread | One large + one small image, look number, credits | Image clip reveal |
| ProductCard | Show a product with price and a way to buy | Image (4:5), name, price, optional swatches | Hover: alternate image; quick add on desktop only |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| Gallery | Show a set of images as a curated sequence | Mixed-size grid or horizontal strip; captions optional | Keyboard navigable; opens a lightbox only if needed |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
