## Layout System — Full-bleed

| | |
|---|---|
| Container | Media edge-to-edge (100vw); text in a 1200px inner container |
| Grid | 12 columns for overlaid text |
| Columns | Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8 |
| Gutters | 24px |
| Section spacing | Media sections are 100svh; text sections 120–160px padding |
| Alignment | Text anchored to bottom-left of media with safe-area padding |
| Hero composition | A fixed 100svh video layer behind the entire page; the playhead is mapped to total page scroll (0 → 100%). Every section scrolls over it on transparent or semi-opaque surfaces, so the film is always visible. |
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

Pages: Home · RSVP · Venue & travel · FAQ

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Whole-page scroll video
- **Purpose:** Establish mood and promise immediately
- **Composition:** A fixed 100svh video layer behind the entire page; the playhead is mapped to total page scroll (0 → 100%). Every section scrolls over it on transparent or semi-opaque surfaces, so the film is always visible.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Motion useScroll on the page (scrollYProgress 0 → 1), smoothed with useSpring, drives video.currentTime through useMotionValueEvent. Sections use the surface color at 70–90% opacity for text legibility; key moments in the film line up with section boundaries.
- **Responsive:** Mobile: 9:16 encode; if seeking is janky on low-end devices, freeze on the poster and crossfade between 3–5 stills per section.

### 02 Intro
- **Purpose:** Say what this is and who it is for
- **Composition:** Short statement in display face across 8 columns, with a small label
- **Content:** 1–2 sentences, specific and concrete
- **Behavior:** Line reveal
- **Responsive:** Scale statement to ~8vw; keep line breaks intentional
- **Ready code:** `src/components/sections/Intro.tsx` → `<IntroSection label="Studio" statement="…" body="…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Schedule
- **Purpose:** Show what happens when
- **Composition:** Days as columns (or stacked groups), each a list of time, title and a line of detail
- **Content:** Every day of the programme, real times, short titles
- **Behavior:** Static — no tabs, everything readable at once
- **Responsive:** Days stack, times stay left
- **Ready code:** `src/components/sections/Schedule.tsx` → `<ScheduleSection title="Programme" days={[{ label: "Friday", items: [{ time, title, detail }] }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Team
- **Purpose:** Show the people behind it
- **Composition:** Portrait grid: photo, name, role, one line each
- **Content:** 3–8 people: real photo, name, role, one sentence
- **Behavior:** Fade-rise
- **Responsive:** 2-column grid
- **Ready code:** `src/components/sections/Team.tsx` → `<TeamSection title="The team" people={[{ name, role, line, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 05 Location
- **Purpose:** Make visiting easy
- **Composition:** Address, hours, map link, one exterior image
- **Content:** Address, hours, transit notes
- **Behavior:** Static
- **Responsive:** Stack; tap-to-call and tap-to-map
- **Ready code:** `src/components/sections/Location.tsx` → `<LocationSection title address hours={["…"]} notes mapUrl image alt />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 06 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 07 Reservation
- **Purpose:** Convert interest into a booking
- **Composition:** Short invitation + booking widget/form
- **Content:** Opening hours, group policy, phone number
- **Behavior:** Sticky booking button on mobile
- **Responsive:** Full-width form, large touch targets
- **Ready code:** `src/components/sections/Reservation.tsx` → `<ReservationSection title text hours={["…"]} phone form={<BookingForm /> /* shadcn: Calendar in a Popover, Selects, Button */} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## RSVP

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

## Venue & travel

Help visitors find and choose the right location.

### 01 Location
- **Purpose:** Make visiting easy
- **Composition:** Address, hours, map link, one exterior image
- **Content:** Address, hours, transit notes
- **Behavior:** Static
- **Responsive:** Stack; tap-to-call and tap-to-map
- **Ready code:** `src/components/sections/Location.tsx` → `<LocationSection title address hours={["…"]} notes mapUrl image alt />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Ready code:** `src/components/sections/Gallery.tsx` → `<GallerySection photos={[{ src, alt, caption }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## FAQ

Answer the questions that would otherwise stall a decision.

### 01 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Site Chrome

### 01 Navigation — Centered logo
- **Purpose:** Orientation and the primary action
- **Composition:** Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Shrinks to a compact bar after 80px.
- **Responsive:** Mobile: centred logo, menu button left, action right.

### 02 Footer — Big name
- **Purpose:** Practical information and a calm ending
- **Composition:** Links and contact in one row at the top, then the brand name in the display face spanning the full container width (sized to fit, one line), then copyright and legal small underneath.
- **Content:** Address/email, links, copyright
- **Behavior:** Static; the wordmark may rise 24px into place as it enters (reduced motion: none).
- **Responsive:** Mobile: links wrap in two columns; the wordmark still spans the full width.
- **Ready code:** `src/components/sections/Footer.tsx` → `<FooterSection variant="wordmark" brand="…" logo={<Logo />} columns={[{ title, links: [{ label, href, current }] }]} legal={[…]} copyright />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| Navigation | Orient and offer the primary action | Logo left, 3–5 links, one primary action right; mobile: full-screen menu | Hides on scroll down, reappears on scroll up; solid background after hero |
| Hero | Set the mood and the promise in one view | A fixed 100svh video layer behind the entire page; the playhead is mapped to total page scroll (0 → 100%). Every section scrolls over it on transparent or semi-opaque surfaces, so the film is always visible. | Motion useScroll on the page (scrollYProgress 0 → 1), smoothed with useSpring, drives video.currentTime through useMotionValueEvent. Sections use the surface color at 70–90% opacity for text legibility; key moments in the film line up with section boundaries. |
| StatementBlock | State the point of view in one or two sentences | Display-size text, optional small label | Line reveal |
| Gallery | Show a set of images as a curated sequence | Mixed-size grid or horizontal strip; captions optional | Keyboard navigable; opens a lightbox only if needed |
| ReservationForm | Book a table in under 30 seconds | Date, time, guests, or embed of the booking provider | Sticky "Book" button on mobile |
| Accordion | Keep FAQs and details scannable | shadcn/ui Accordion (type="single" collapsible), restyled to the tokens | Height animates open and closed; one answer open at a time |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
