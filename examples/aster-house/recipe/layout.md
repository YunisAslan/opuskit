## Layout System — Full-bleed

| | |
|---|---|
| Container | Media edge-to-edge (100vw); text in a 1200px inner container |
| Grid | 12 columns for overlaid text |
| Columns | Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8 |
| Gutters | 24px |
| Section spacing | Media sections are 100svh; text sections 120–160px padding |
| Alignment | Text anchored to bottom-left of media with safe-area padding |
| Hero composition | A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points. |
| Card proportions | Rare — use full-width project slides instead of cards |
| Media proportions | 16:9 / 21:9 desktop, 9:16 or 4:5 crop on mobile |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Use only values from the scale. Space between sections is always larger than space within them.

### Shape — Hairline

Thin outlines and no fills — light and airy. Buttons 4px, cards 6px, media 4px, borders 1px, shadow none. Buttons and cards are outlined, not filled (except the one primary action); 1px borders in the border token.

### Menu — Classic bar

Logo on the left, links on the right, always at the top.
- **Composition:** Full-width bar: logo left, 4–6 links and the primary action right, on the page ground with a hairline bottom border.
- **Behavior:** Sticky; gains a surface background after 40px of scroll.
- **Responsive:** Mobile: logo + menu button; opens a simple full-width sheet.

## Page Structure

Pages: Home · Residences · A house · Book a viewing

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Scroll-controlled video
- **Purpose:** Establish mood and promise immediately
- **Composition:** A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** A sticky 100svh stage inside a ~300vh block; Motion useScroll on the block gives progress, smoothed with useSpring (stiffness ~120, damping ~30), and useMotionValueEvent sets video.currentTime. Encode with scripts/prepare-video.sh (CRF 20, keyframe every 6 frames) so seeking is instant and frames stay sharp.
- **Responsive:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.

### 02 Intro
- **Purpose:** Say what this is and who it is for
- **Composition:** Short statement in display face across 8 columns, with a small label
- **Content:** 1–2 sentences, specific and concrete
- **Behavior:** Line reveal
- **Responsive:** Scale statement to ~8vw; keep line breaks intentional
- **Ready code:** `src/components/sections/Intro.tsx` → `<IntroSection label="Studio" statement="…" body="…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Feature Rows
- **Purpose:** Explain one capability or offer at a time, each with its own picture
- **Composition:** 3–6 rows: large media on one side, heading + short text + optional link on the other; sides alternate
- **Content:** Per row: one concrete capability, 1–2 sentences, one real visual
- **Behavior:** Fade-rise per row
- **Responsive:** Stack each row, media first
- **Ready code:** `src/components/sections/FeatureRows.tsx` → `<FeatureRowsSection title rows={[{ name, text, image, alt, link: { label, href } }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Product Grid
- **Purpose:** Browse and choose
- **Composition:** 3–4 column grid of product cards; filters minimal
- **Content:** Name, price, image, availability
- **Behavior:** Hover alternate image
- **Responsive:** 2 columns on mobile
- **Photos — Even grid (recommended):** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile. Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards). Mobile: 2 columns on mobile; never 1 unless the photos are the product itself.
- **Ready code:** `src/components/sections/ProductGrid.tsx` → `<ProductGridSection title products={[{ name, price, image, alt, hoverImage, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 05 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Ready code:** `src/components/sections/Gallery.tsx` → `<GallerySection photos={[{ src, alt, caption }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 06 Location
- **Purpose:** Make visiting easy
- **Composition:** Address, hours, map link, one exterior image
- **Content:** Address, hours, transit notes
- **Behavior:** Static
- **Responsive:** Stack; tap-to-call and tap-to-map
- **Ready code:** `src/components/sections/Location.tsx` → `<LocationSection title address hours={["…"]} notes mapUrl image alt />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 07 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Residences

All twelve houses in one list: the hour each is built around, floor area, bedrooms, terrace, price, and whether it is still free, reserved or sold.

### 01 Product Grid
- **Purpose:** Browse and choose
- **Composition:** 3–4 column grid of product cards; filters minimal
- **Content:** Name, price, image, availability
- **Behavior:** Hover alternate image
- **Responsive:** 2 columns on mobile
- **Photos — Even grid (recommended):** Even grid (4 / 3 / 2 columns) with one fixed ratio for every tile (4:5 for products and people, 3:2 for places); caption below each tile. Hover: subtle image scale (1.03) or a second photo; the hovered tile stays sharp while the others dim slightly (focus cards). Mobile: 2 columns on mobile; never 1 unless the photos are the product itself.
- **Ready code:** `src/components/sections/ProductGrid.tsx` → `<ProductGridSection title products={[{ name, price, image, alt, hoverImage, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Features
- **Purpose:** Explain capabilities with evidence
- **Composition:** 2×2 or 3-column feature blocks, each with a real visual
- **Content:** 3–6 features, concrete language
- **Behavior:** Fade-rise stagger
- **Responsive:** Single column
- **Ready code:** `src/components/sections/FeatureGrid.tsx` → `<FeatureGridSection title features={[{ name, text, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## A house

Show one product in full: gallery, price, variants, add-to-cart, and related items.

### 01 Product Highlight
- **Purpose:** Show one product (or feature) in depth
- **Composition:** Large product media with 3–4 annotated details
- **Content:** Materials, dimensions, key benefit
- **Behavior:** Pinned product with advancing details (immersive) or static
- **Responsive:** Media then detail list
- **Ready code:** `src/components/sections/ProductHighlight.tsx` → `<ProductHighlightSection name text image alt details={[{ label, value }]} action={{ label, href }} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Ready code:** `src/components/sections/Gallery.tsx` → `<GallerySection photos={[{ src, alt, caption }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Feature Rows
- **Purpose:** Explain one capability or offer at a time, each with its own picture
- **Composition:** 3–6 rows: large media on one side, heading + short text + optional link on the other; sides alternate
- **Content:** Per row: one concrete capability, 1–2 sentences, one real visual
- **Behavior:** Fade-rise per row
- **Responsive:** Stack each row, media first
- **Ready code:** `src/components/sections/FeatureRows.tsx` → `<FeatureRowsSection title rows={[{ name, text, image, alt, link: { label, href } }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Book a viewing

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
- **Ready code:** `src/components/sections/Footer.tsx` → `<FooterSection logo={<Logo />} columns={[{ title, links: [{ label, href, current }] }]} legal={[…]} copyright />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| Navigation | Orient and offer the primary action | Logo left, 3–5 links, one primary action right; mobile: full-screen menu | Hides on scroll down, reappears on scroll up; solid background after hero |
| Hero | Set the mood and the promise in one view | A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points. | A sticky 100svh stage inside a ~300vh block; Motion useScroll on the block gives progress, smoothed with useSpring (stiffness ~120, damping ~30), and useMotionValueEvent sets video.currentTime. Encode with scripts/prepare-video.sh (CRF 20, keyframe every 6 frames) so seeking is instant and frames stay sharp. |
| ProductCard | Show a product with price and a way to buy | Image (4:5), name, price, optional swatches | Hover: alternate image; quick add on desktop only |
| Gallery | Show a set of images as a curated sequence | Mixed-size grid or horizontal strip; captions optional | Keyboard navigable; opens a lightbox only if needed |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| ReservationForm | Book a table in under 30 seconds | Date, time, guests, or embed of the booking provider | Sticky "Book" button on mobile |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
