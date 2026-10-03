## Layout System — Asymmetric

| | |
|---|---|
| Container | Full width with 5vw side margins |
| Grid | 12 columns, content intentionally weighted to one side per section |
| Columns | Alternate 7/5 and 4/8 splits; leave columns empty on purpose |
| Gutters | 2vw (mobile 16px) |
| Section spacing | clamp(120px, 16vw, 240px); vary spacing to create rhythm |
| Alignment | Mixed: text blocks aligned to column edges, never centred |
| Hero composition | Small headline in the lower-left third, media block in columns 6–12, generous empty space |
| Card proportions | Mixed sizes: 1 large (7 cols) beside 1 small (4 cols), offset vertically |
| Media proportions | 4:5, 3:2, and tall 2:3 used in alternation |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Use only values from the scale. Space between sections is always larger than space within them.

### Shape — Soft

Gently rounded corners — calm and friendly. Buttons 8px, cards 12px, media 12px, borders 1px, shadow none. Small, consistent radii; never mix sharp and rounded.

### Menu — Classic bar

Logo on the left, links on the right, always at the top.
- **Composition:** Full-width bar: logo left, 4–6 links and the primary action right, on the page ground with a hairline bottom border.
- **Behavior:** Sticky; gains a surface background after 40px of scroll.
- **Responsive:** Mobile: logo + menu button; opens a simple full-width sheet.

## Page Structure

Pages: Home · Treatments · Practitioners · Book an appointment · FAQ

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Editorial image hero
- **Purpose:** Establish mood and promise immediately
- **Composition:** One strong photograph (portrait 4:5 or wide 3:2) beside or beneath a restrained headline. Clear focal point, generous empty space.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Headline and image fade up once on load (≤ 600ms). No looping motion.
- **Responsive:** Mobile: headline first, image full-width beneath at 4:5. Keep the focal point inside the centre 60% for safe cropping.

### 02 Services
- **Purpose:** Make offers clear
- **Composition:** Numbered service rows with rules between
- **Content:** 4–6 services, each with a one-line description
- **Behavior:** Row hover highlight
- **Responsive:** Full-width rows, description beneath title
- **Ready code:** `src/components/sections/Services.tsx` → `<ServicesSection title="Services" items={[{ name, line }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 How It Works
- **Purpose:** Show the workflow in steps
- **Composition:** Numbered steps with product visuals, horizontal on desktop
- **Content:** 3–4 steps, one sentence each
- **Behavior:** Steps activate in sequence on scroll
- **Responsive:** Vertical steps
- **Ready code:** `src/components/sections/HowItWorks.tsx` → `<HowItWorksSection title steps={[{ name, text, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Team
- **Purpose:** Show the people behind it
- **Composition:** Portrait grid: photo, name, role, one line each
- **Content:** 3–8 people: real photo, name, role, one sentence
- **Behavior:** Fade-rise
- **Responsive:** 2-column grid
- **Ready code:** `src/components/sections/Team.tsx` → `<TeamSection title="The team" people={[{ name, role, line, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 05 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Ready code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 06 Pricing
- **Purpose:** Remove the final uncertainty
- **Composition:** 2–3 plans side by side, one recommended
- **Content:** Plan name, price, what's included
- **Behavior:** Static
- **Responsive:** Stacked plans, recommended first
- **Ready code:** `src/components/sections/Pricing.tsx` → `<PricingSection title plans={[{ name, price, period, features: [], action: { label, href }, recommended }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 07 Location
- **Purpose:** Make visiting easy
- **Composition:** Address, hours, map link, one exterior image
- **Content:** Address, hours, transit notes
- **Behavior:** Static
- **Responsive:** Stack; tap-to-call and tap-to-map
- **Ready code:** `src/components/sections/Location.tsx` → `<LocationSection title address hours={["…"]} notes mapUrl image alt />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 08 Reservation
- **Purpose:** Convert interest into a booking
- **Composition:** Short invitation + booking widget/form
- **Content:** Opening hours, group policy, phone number
- **Behavior:** Sticky booking button on mobile
- **Responsive:** Full-width form, large touch targets
- **Ready code:** `src/components/sections/Reservation.tsx` → `<ReservationSection title text hours={["…"]} phone bookingUrl="https://…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Treatments

Make the offer and the way of working clear enough to remove hesitation.

### 01 Services
- **Purpose:** Make offers clear
- **Composition:** Numbered service rows with rules between
- **Content:** 4–6 services, each with a one-line description
- **Behavior:** Row hover highlight
- **Responsive:** Full-width rows, description beneath title
- **Ready code:** `src/components/sections/Services.tsx` → `<ServicesSection title="Services" items={[{ name, line }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Process
- **Purpose:** Reduce uncertainty about working together
- **Composition:** 3–5 steps in columns or a pinned sequence
- **Content:** Step name, 1–2 sentences, duration
- **Behavior:** Steps reveal in order
- **Responsive:** Vertical list
- **Ready code:** `src/components/sections/Process.tsx` → `<ProcessSection title="How we work" steps={[{ name, text, duration }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Pricing
- **Purpose:** Remove the final uncertainty
- **Composition:** 2–3 plans side by side, one recommended
- **Content:** Plan name, price, what's included
- **Behavior:** Static
- **Responsive:** Stacked plans, recommended first
- **Ready code:** `src/components/sections/Pricing.tsx` → `<PricingSection title plans={[{ name, price, period, features: [], action: { label, href }, recommended }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions" items={[{ q, a }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Practitioners

Introduce the people doing the work — real names, real roles, real faces.

### 01 Team
- **Purpose:** Show the people behind it
- **Composition:** Portrait grid: photo, name, role, one line each
- **Content:** 3–8 people: real photo, name, role, one sentence
- **Behavior:** Fade-rise
- **Responsive:** 2-column grid
- **Ready code:** `src/components/sections/Team.tsx` → `<TeamSection title="The team" people={[{ name, role, line, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Ready code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Book an appointment

Convert interest into a booking with minimal friction.

### 01 Reservation
- **Purpose:** Convert interest into a booking
- **Composition:** Short invitation + booking widget/form
- **Content:** Opening hours, group policy, phone number
- **Behavior:** Sticky booking button on mobile
- **Responsive:** Full-width form, large touch targets
- **Ready code:** `src/components/sections/Reservation.tsx` → `<ReservationSection title text hours={["…"]} phone bookingUrl="https://…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

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
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions" items={[{ q, a }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## FAQ

Answer the questions that would otherwise stall a decision.

### 01 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions" items={[{ q, a }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Site Chrome

### 01 Navigation — Classic bar
- **Purpose:** Orientation and the primary action
- **Composition:** Full-width bar: logo left, 4–6 links and the primary action right, on the page ground with a hairline bottom border.
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Sticky; gains a surface background after 40px of scroll.
- **Responsive:** Mobile: logo + menu button; opens a simple full-width sheet.

### 02 Footer — Say hello
- **Purpose:** Practical information and a calm ending
- **Composition:** A large headline invitation (“Let’s talk”, “Book a table”) with the email/phone as display-size links, address and hours beside it, then one small row of links, copyright and legal.
- **Content:** Address/email, links, copyright
- **Behavior:** Static; the contact links underline on hover; email opens mail, phone dials.
- **Responsive:** Mobile: invitation, contact links, details and the links row stacked.
- **Ready code:** `src/components/sections/Footer.tsx` → `<FooterSection variant="contact" invite="…" contact={[{ label, href }]} logo={<Logo />} columns={[{ title, links: [{ label, href, current }] }]} legal={[…]} copyright />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| Navigation | Orient and offer the primary action | Logo left, 3–5 links, one primary action right; mobile: full-screen menu | Hides on scroll down, reappears on scroll up; solid background after hero |
| Hero | Set the mood and the promise in one view | One strong photograph (portrait 4:5 or wide 3:2) beside or beneath a restrained headline. Clear focal point, generous empty space. | Headline and image fade up once on load (≤ 600ms). No looping motion. |
| ServiceList | List services as clear, scannable offers | Numbered rows: service, one-line description, deliverables | Row hover highlight; optional hover preview |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| ReservationForm | Book a table in under 30 seconds | Date, time, guests, or embed of the booking provider | Sticky "Book" button on mobile |
| Accordion | Keep FAQs and details scannable | Native <details>/<summary> styled | Height animation via CSS interpolate-size where supported |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
