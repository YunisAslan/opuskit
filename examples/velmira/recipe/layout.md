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

### Shape — Frosted glass

Translucent panels with a soft blur over colour or photos. Buttons 14px, cards 20px, media 16px, borders 1px, shadow 0 8px 32px rgb(0 0 0 / 0.12). Cards, menu and dialogs are frosted glass: background at 15–30% opacity of the surface token, backdrop-filter: blur(16px), a 1px border at 20% white. Only over a vivid colour or photo — on a flat page it reads as grey. Body text stays on solid surfaces (4.5:1).

### Menu — Centered logo

Logo in the middle, links split on either side — like a boutique.
- **Composition:** Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.
- **Behavior:** Shrinks to a compact bar after 80px.
- **Responsive:** Mobile: centred logo, menu button left, action right.

## Page Structure

Pages: Home · Rooms · Gallery · Book a stay · Getting here

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Ambient video hero
- **Purpose:** Establish mood and promise immediately
- **Composition:** Full-viewport muted loop (8–15s) behind a short headline; a poster frame shows instantly while video loads.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** autoplay, muted, loop, playsInline. Pauses when out of view (IntersectionObserver) and when the tab is hidden. Visible pause control.
- **Responsive:** Mobile: 9:16 or 4:5 encode ≤ 3MB, or the poster image only on Save-Data / slow connections.

### 02 Intro
- **Purpose:** Say what this is and who it is for
- **Composition:** Short statement in display face across 8 columns, with a small label
- **Content:** 1–2 sentences, specific and concrete
- **Behavior:** Line reveal
- **Responsive:** Scale statement to ~8vw; keep line breaks intentional
- **Ready code:** `src/components/sections/Intro.tsx` → `<IntroSection label="Studio" statement="…" body="…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Collection
- **Purpose:** Introduce the season or range
- **Composition:** Full-height image with collection title, then 2–3 key pieces
- **Content:** Collection name, one paragraph, season
- **Behavior:** Image reveal
- **Responsive:** Portrait crop, title over lower third
- **Photos — Sideways strip (recommended):** One row of large photos at a shared height (60–70 vh), native widths, generous gutters; a small counter (01 / 08) in the utility face. Desktop: pinned section, vertical scroll translates the row horizontally (sticky frame + Motion useScroll → useTransform on x, or CSS scroll-driven animation). Reduced motion: native horizontal scroll with snap. Mobile: Mobile: native swipe carousel with scroll-snap — no pinning.
- **Ready code:** `src/components/sections/Collection.tsx` → `<CollectionSection season title text image alt pieces={[{ name, price, image, alt, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Feature Rows
- **Purpose:** Explain one capability or offer at a time, each with its own picture
- **Composition:** 3–6 rows: large media on one side, heading + short text + optional link on the other; sides alternate
- **Content:** Per row: one concrete capability, 1–2 sentences, one real visual
- **Behavior:** Fade-rise per row
- **Responsive:** Stack each row, media first
- **Ready code:** `src/components/sections/FeatureRows.tsx` → `<FeatureRowsSection title rows={[{ name, text, image, alt, link: { label, href } }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 05 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view
- **Ready code:** `src/components/sections/Journal.tsx` → `<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 06 Reservation
- **Purpose:** Convert interest into a booking
- **Composition:** Short invitation + booking widget/form
- **Content:** Opening hours, group policy, phone number
- **Behavior:** Sticky booking button on mobile
- **Responsive:** Full-width form, large touch targets
- **Ready code:** `src/components/sections/Reservation.tsx` → `<ReservationSection title text hours={["…"]} phone form={<BookingForm /> /* shadcn: Calendar in a Popover, Selects, Button */} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Rooms

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

### 03 Reservation
- **Purpose:** Convert interest into a booking
- **Composition:** Short invitation + booking widget/form
- **Content:** Opening hours, group policy, phone number
- **Behavior:** Sticky booking button on mobile
- **Responsive:** Full-width form, large touch targets
- **Ready code:** `src/components/sections/Reservation.tsx` → `<ReservationSection title text hours={["…"]} phone form={<BookingForm /> /* shadcn: Calendar in a Popover, Selects, Button */} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Gallery

Let atmosphere and craft speak for themselves.

### 01 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row
- **Photos — Gallery wall (recommended):** Masonry columns (3 desktop, 2 tablet) using each photo’s native ratio — no forced crops; gutters from the spacing scale; one or two photos span two columns to break the grid. Staggered reveal (40–60 ms per item); click opens an accessible lightbox with arrow keys, Esc and swipe. Mobile: Two columns on mobile down to 360 px, then one; the lightbox swipes.
- **Ready code:** `src/components/sections/Gallery.tsx` → `<GallerySection photos={[{ src, alt, caption }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Book a stay

Convert interest into a booking with minimal friction.

### 01 Reservation
- **Purpose:** Convert interest into a booking
- **Composition:** Short invitation + booking widget/form
- **Content:** Opening hours, group policy, phone number
- **Behavior:** Sticky booking button on mobile
- **Responsive:** Full-width form, large touch targets
- **Ready code:** `src/components/sections/Reservation.tsx` → `<ReservationSection title text hours={["…"]} phone form={<BookingForm /> /* shadcn: Calendar in a Popover, Selects, Button */} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

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

## Getting here

Help visitors find and choose the right location.

### 01 Location
- **Purpose:** Make visiting easy
- **Composition:** Address, hours, map link, one exterior image
- **Content:** Address, hours, transit notes
- **Behavior:** Static
- **Responsive:** Stack; tap-to-call and tap-to-map
- **Ready code:** `src/components/sections/Location.tsx` → `<LocationSection title address hours={["…"]} notes mapUrl image alt />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 FAQ
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
| Gallery | Show a set of images as a curated sequence | Mixed-size grid or horizontal strip; captions optional | Keyboard navigable; opens a lightbox only if needed |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| LookbookSpread | Present a look like a magazine spread | One large + one small image, look number, credits | Image clip reveal |
| ReservationForm | Book a table in under 30 seconds | Date, time, guests, or embed of the booking provider | Sticky "Book" button on mobile |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
