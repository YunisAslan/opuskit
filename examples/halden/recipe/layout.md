## Layout System — Full-bleed

The frame is already in `src/styles/tokens.css`: `--container`, `--gutter`, `--section-y`, `--ratio-card`, `--ratio-media` — every ready section uses them; new sections use them too, never a fixed max-width or padding. Each section's tone (ground, surface, inverse, chapter) and media placement are set per page below.

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

### Shape — Sharp

Square corners, crisp lines — precise and editorial. Buttons 0px, cards 0px, media 0px, borders 1px, shadow none. No rounded corners anywhere; structure comes from lines and space.

### Menu — Classic bar

Logo on the left, links on the right, always at the top.
- **Composition:** Full-width bar: logo left, 4–6 links and the primary action right, on the page ground with a hairline bottom border.
- **Behavior:** Sticky; gains a surface background after 40px of scroll.
- **Responsive:** Mobile: logo + menu button; opens a simple full-width sheet.

## Page Structure

Pages: Home · The baths · Visit · FAQ · Sign In · Sign Up

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Scroll-controlled video
- **Purpose:** Establish mood and promise immediately
- **Composition:** A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** A sticky 100svh stage inside a ~300vh block; Motion useScroll on the block gives progress, smoothed with useSpring (stiffness ~120, damping ~30), and useMotionValueEvent sets video.currentTime. Encode with scripts/prepare-video.sh (CRF 20, keyframe every 6 frames) so seeking is instant and frames stay sharp.
- **Responsive:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.

### 02 Services
- **Purpose:** Make offers clear
- **Composition:** Numbered service rows with rules between
- **Content:** 4–6 services, each with a one-line description
- **Behavior:** Row hover highlight
- **Responsive:** Full-width rows, description beneath title
- **Design — Ruled rows (recommended):** One row per service beside the title. Pass `variant="rows"`.
- **Reference code:** `src/components/sections/Services.tsx` → `<ServicesSection title="Services" items={[{ name, line }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 How It Works
- **Purpose:** Show the workflow in steps
- **Composition:** Numbered steps with product visuals, horizontal on desktop
- **Content:** 3–4 steps, one sentence each
- **Behavior:** Steps activate in sequence on scroll
- **Responsive:** Vertical steps
- **Design — Cards with pictures (recommended):** A card per step, each with its own picture. Pass `variant="cards"`.
- **Reference code:** `src/components/sections/Steps.tsx` → `<StepsSection variant="cards" title steps={[{ name, text, image, alt }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 04 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Reference code:** `src/components/sections/Gallery.tsx` → `<GallerySection photos={[{ src, alt, caption }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 05 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — A wall of notes:** Every quote as a card, in columns. Pass `variant="wall"`.
- **Reference code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 06 Pricing
- **Purpose:** Remove the final uncertainty
- **Composition:** 2–3 plans side by side, one recommended
- **Content:** Plan name, price, what's included
- **Behavior:** Static
- **Responsive:** Stacked plans, recommended first
- **Design — Cards (recommended):** Plans side by side, the recommended one outlined. Pass `variant="cards"`.
- **Reference code:** `src/components/sections/Pricing.tsx` → `<PricingSection title plans={[{ name, price, period, features: [], action: { label, href }, recommended }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 07 Location
- **Purpose:** Make visiting easy
- **Composition:** Address, hours, map link, one exterior image
- **Content:** Address, hours, transit notes
- **Behavior:** Static
- **Responsive:** Stack; tap-to-call and tap-to-map
- **Media:** over — pass `media="over"`
- **Reference code:** `src/components/sections/Location.tsx` → `<LocationSection title address hours={["…"]} notes mapUrl image alt />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 08 Reservation
- **Purpose:** Convert interest into a booking
- **Composition:** Short invitation + booking widget/form
- **Content:** Opening hours, group policy, phone number
- **Behavior:** Sticky booking button on mobile
- **Responsive:** Full-width form, large touch targets
- **Reference code:** `src/components/sections/Reservation.tsx` → `<ReservationSection title text hours={["…"]} phone form={<BookingForm /> /* shadcn: Calendar in a Popover, Selects, Button */} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## The baths

Make the offer and the way of working clear enough to remove hesitation.

### 01 Services
- **Purpose:** Make offers clear
- **Composition:** Numbered service rows with rules between
- **Content:** 4–6 services, each with a one-line description
- **Behavior:** Row hover highlight
- **Responsive:** Full-width rows, description beneath title
- **Design — Ruled rows (recommended):** One row per service beside the title. Pass `variant="rows"`.
- **Reference code:** `src/components/sections/Services.tsx` → `<ServicesSection title="Services" items={[{ name, line }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Process
- **Purpose:** Reduce uncertainty about working together
- **Composition:** 3–5 steps in columns or a pinned sequence
- **Content:** Step name, 1–2 sentences, duration
- **Behavior:** Steps reveal in order
- **Responsive:** Vertical list
- **Design — Big numbers (recommended):** Each step under a large number, side by side. Pass `variant="columns"`.
- **Reference code:** `src/components/sections/Steps.tsx` → `<StepsSection variant="columns" title="How we work" steps={[{ name, text, duration }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Pricing
- **Purpose:** Remove the final uncertainty
- **Composition:** 2–3 plans side by side, one recommended
- **Content:** Plan name, price, what's included
- **Behavior:** Static
- **Responsive:** Stacked plans, recommended first
- **Design — Cards (recommended):** Plans side by side, the recommended one outlined. Pass `variant="cards"`.
- **Reference code:** `src/components/sections/Pricing.tsx` → `<PricingSection title plans={[{ name, price, period, features: [], action: { label, href }, recommended }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 04 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Reference code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Visit

Convert interest into a booking with minimal friction.

### 01 Reservation
- **Purpose:** Convert interest into a booking
- **Composition:** Short invitation + booking widget/form
- **Content:** Opening hours, group policy, phone number
- **Behavior:** Sticky booking button on mobile
- **Responsive:** Full-width form, large touch targets
- **Reference code:** `src/components/sections/Reservation.tsx` → `<ReservationSection title text hours={["…"]} phone form={<BookingForm /> /* shadcn: Calendar in a Popover, Selects, Button */} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Location
- **Purpose:** Make visiting easy
- **Composition:** Address, hours, map link, one exterior image
- **Content:** Address, hours, transit notes
- **Behavior:** Static
- **Responsive:** Stack; tap-to-call and tap-to-map
- **Media:** over — pass `media="over"`
- **Reference code:** `src/components/sections/Location.tsx` → `<LocationSection title address hours={["…"]} notes mapUrl image alt />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Reference code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## FAQ

Answer the questions that would otherwise stall a decision.

### 01 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Reference code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Sign In

Standard sign-in: email/password, forgot-password link, link to sign up.

**No menu and no footer on this page — it stands on its own.**

_No composed sections — see purpose above._

---

## Sign Up

Standard sign-up: minimal required fields, clear value of creating an account.

**No menu and no footer on this page — it stands on its own.**

_No composed sections — see purpose above._

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
| ServiceList | List services as clear, scannable offers | Numbered rows: service, one-line description, deliverables | Row hover highlight; optional hover preview |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| ReservationForm | Book a table in under 30 seconds | Date, time, guests, or embed of the booking provider | Sticky "Book" button on mobile |
| Accordion | Keep FAQs and details scannable | shadcn/ui Accordion (type="single" collapsible), restyled to the tokens | Height animates open and closed; one answer open at a time |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
