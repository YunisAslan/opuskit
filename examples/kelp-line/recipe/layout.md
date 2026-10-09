## Layout System — Editorial

The frame is already in `src/styles/tokens.css`: `--container`, `--gutter`, `--section-y`, `--ratio-card`, `--ratio-media` — every ready section uses them; new sections use them too, never a fixed max-width or padding. Each section's tone (ground, surface, inverse, chapter) and media placement are set per page below.

| | |
|---|---|
| Container | max-width 1440px, side gutter clamp(20px, 3vw, 44px) (--container, --gutter) |
| Grid | 12 columns with a 2-column margin rail for captions |
| Columns | Headlines 8 columns, body 5 columns max (~65ch), captions in the rail |
| Gutters | clamp(20px, 3vw, 44px) (--gutter) |
| Section spacing | clamp(104px, 13vw, 196px) between sections (--section-y) |
| Alignment | Flush-left, ragged-right; captions top-aligned to images |
| Hero composition | One strong photograph (portrait 4:5 or wide 3:2) beside or beneath a restrained headline. Clear focal point, generous empty space. |
| Card proportions | 3:4 for project, product and people cards (--ratio-card) |
| Media proportions | 3:2 for pictures beside text (--ratio-media); 21:9 for a full-width band. Photo files follow the shot list (recipe/media.md) |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Inside a section use only values from the scale; between sections use --section-y. Space between sections is always larger than space within them.

### Shape — Soft

Gently rounded corners — calm and friendly. Buttons 8px, cards 12px, media 12px, borders 1px, shadow none. Small, consistent radii; never mix sharp and rounded.

### Menu — Floating pill

A rounded bar that floats above the page and tucks away while you read.
- **Composition:** A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.
- **Behavior:** Hides on scroll down, returns on scroll up; the active link has a sliding highlight.
- **Responsive:** Mobile: capsule with logo + menu button; menu expands inside the capsule.

## Page Structure

Pages: Home · Our mission · Programs · Stories · Donate · Contact

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Editorial image hero
- **Purpose:** Establish mood and promise immediately
- **Composition:** One strong photograph (portrait 4:5 or wide 3:2) beside or beneath a restrained headline. Clear focal point, generous empty space.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Headline and image fade up once on load (≤ 600ms). No looping motion.
- **Responsive:** Mobile: headline first, image full-width beneath at 4:5. Keep the focal point inside the centre 60% for safe cropping.

### 02 Timeline
- **Purpose:** Tell the story as dated steps
- **Composition:** Heading and a short line beside a hairline of dated steps, oldest first, the latest marked
- **Content:** 4–7 real dates (years or months), each with what happened and one line on why it mattered
- **Behavior:** Static; a scroll-drawn line is an optional moment
- **Responsive:** Heading above, steps stacked along the line
- **Reference code:** `src/components/sections/Timeline.tsx` → `<TimelineSection title="How we got here" text="…" steps={[{ when: "2019", title, detail }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Stats
- **Purpose:** Prove it with a few real numbers
- **Composition:** 3–4 large numbers with plain labels on one row
- **Content:** 3–4 true figures (years, projects, customers, ratings) with a label each
- **Behavior:** Static — readable at once
- **Responsive:** 2 × 2 grid
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — A ledger (recommended):** Label left, number right, one line each. Pass `variant="ledger"`.
- **Reference code:** `src/components/sections/Stats.tsx` → `<StatsSection variant="ledger" title="In numbers" stats={[{ value: "12", label: "Years" }]} note="…" />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 04 Services
- **Purpose:** Make offers clear
- **Composition:** One row per service with rules between
- **Content:** 4–6 services, each with a one-line description
- **Behavior:** Row hover highlight
- **Responsive:** Full-width rows, description beneath title
- **Design — Ruled rows (recommended):** One row per service beside the title. Pass `variant="rows"`.
- **Reference code:** `src/components/sections/Services.tsx` → `<ServicesSection variant="rows" title="Services" items={[{ name, line }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 05 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width
- **Media:** side — pass `media="side"`
- **Reference code:** `src/components/sections/EditorialStory.tsx` → `<EditorialStorySection title image alt caption paragraphs={[…]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 06 CTA Band
- **Purpose:** Offer the next step mid-page without ending it
- **Composition:** Slim full-width band: one line and one action, optional short note
- **Content:** One specific offer (trial, deadline, free delivery) and its action
- **Behavior:** Static
- **Responsive:** Line above the button
- **Tone:** inverse — pass `tone="inverse"` (sets data-tone; tokens.css swaps the colours for it)
- **Reference code:** `src/components/sections/CtaBand.tsx` → `<CtaBandSection text="One line" action={{ label, href }} note="…" />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 07 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view
- **Reference code:** `src/components/sections/Journal.tsx` → `<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 08 Newsletter
- **Purpose:** Turn a visit into a returning reader
- **Composition:** One reason to subscribe beside an email field and a button, with a note under it
- **Content:** What they get, how often, and that it is easy to leave
- **Behavior:** Static; the form posts to your email provider
- **Responsive:** Field and button stack, full width
- **Reference code:** `src/components/sections/Newsletter.tsx` → `<NewsletterSection title text placeholder="you@example.com" button="Subscribe" note="Once a month." action="https://…" />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Our mission

Put a human face and point of view on the work; build trust.

### 01 About
- **Purpose:** Put a human face and point of view on the work
- **Composition:** Portrait image + statement + short bio
- **Content:** Real names, real history, no mission-statement clichés
- **Behavior:** Fade-rise
- **Responsive:** Portrait above text
- **Media:** side — pass `media="side"`
- **Reference code:** `src/components/sections/About.tsx` → `<AboutSection title="About" image alt statement bio />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width
- **Media:** full — pass `media="full"`
- **Reference code:** `src/components/sections/EditorialStory.tsx` → `<EditorialStorySection title image alt caption paragraphs={[…]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Team
- **Purpose:** Show the people behind it
- **Composition:** Portrait grid: photo, name, role, one line each
- **Content:** 3–8 people: real photo, name, role, one sentence
- **Behavior:** Fade-rise
- **Responsive:** 2-column grid
- **Design — Portrait grid (recommended):** Four small portraits to a row. Pass `variant="grid"`.
- **Reference code:** `src/components/sections/Team.tsx` → `<TeamSection variant="grid" title="The team" people={[{ name, role, line, image, alt }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 04 Stats
- **Purpose:** Prove it with a few real numbers
- **Composition:** 3–4 large numbers with plain labels on one row
- **Content:** 3–4 true figures (years, projects, customers, ratings) with a label each
- **Behavior:** Static — readable at once
- **Responsive:** 2 × 2 grid
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — A ledger (recommended):** Label left, number right, one line each. Pass `variant="ledger"`.
- **Reference code:** `src/components/sections/Stats.tsx` → `<StatsSection variant="ledger" title="In numbers" stats={[{ value: "12", label: "Years" }]} note="…" />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Programs

Make the offer and the way of working clear enough to remove hesitation.

### 01 Services
- **Purpose:** Make offers clear
- **Composition:** One row per service with rules between
- **Content:** 4–6 services, each with a one-line description
- **Behavior:** Row hover highlight
- **Responsive:** Full-width rows, description beneath title
- **Design — Ruled rows (recommended):** One row per service beside the title. Pass `variant="rows"`.
- **Reference code:** `src/components/sections/Services.tsx` → `<ServicesSection variant="rows" title="Services" items={[{ name, line }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Process
- **Purpose:** Show what happens, step by step
- **Composition:** 3–5 steps in columns or a pinned sequence
- **Content:** Step name, 1–2 sentences, and how long it takes where that matters
- **Behavior:** Steps reveal in order
- **Responsive:** Vertical list
- **Design — A line to follow (recommended):** The title holds still while the steps run down a line. Pass `variant="rail"`.
- **Reference code:** `src/components/sections/Steps.tsx` → `<StepsSection variant="rail" title="How we work" steps={[{ name, text, duration }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Stats
- **Purpose:** Prove it with a few real numbers
- **Composition:** 3–4 large numbers with plain labels on one row
- **Content:** 3–4 true figures (years, projects, customers, ratings) with a label each
- **Behavior:** Static — readable at once
- **Responsive:** 2 × 2 grid
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — A ledger (recommended):** Label left, number right, one line each. Pass `variant="ledger"`.
- **Reference code:** `src/components/sections/Stats.tsx` → `<StatsSection variant="ledger" title="In numbers" stats={[{ value: "12", label: "Years" }]} note="…" />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 04 CTA Band
- **Purpose:** Offer the next step mid-page without ending it
- **Composition:** Slim full-width band: one line and one action, optional short note
- **Content:** One specific offer (trial, deadline, free delivery) and its action
- **Behavior:** Static
- **Responsive:** Line above the button
- **Tone:** inverse — pass `tone="inverse"` (sets data-tone; tokens.css swaps the colours for it)
- **Reference code:** `src/components/sections/CtaBand.tsx` → `<CtaBandSection text="One line" action={{ label, href }} note="…" />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Stories

Let real clients or customers make the case, in their own words.

### 01 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and who they are to this place (client, guest, customer, member)
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — One leads (recommended):** One large quote, the rest in a quiet row. Pass `variant="lead"`.
- **Reference code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection variant="lead" title="What people say" quotes={[{ quote, name, role }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width
- **Media:** side — pass `media="side"`
- **Reference code:** `src/components/sections/EditorialStory.tsx` → `<EditorialStorySection title image alt caption paragraphs={[…]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Reference code:** `src/components/sections/Gallery.tsx` → `<GallerySection photos={[{ src, alt, caption }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Donate

Turn a visitor into a donor: preset gifts that each say what they pay for, once or monthly, where the money goes, and a short form that hands off to payment.

### 01 Donate
- **Purpose:** Turn support into a gift
- **Composition:** Preset gifts, each saying what it pays for, beside a short pledge form (once or monthly); where the money goes underneath
- **Content:** 3–4 amounts with what each one buys, the split of spending in percent, one line on how payment happens
- **Behavior:** Static; the form is the project’s own (shadcn ToggleGroup for once/monthly and the amounts, Input, Button) and hands off to the payment page
- **Responsive:** Gifts stacked above the form; the spending split as a 2 × 2 grid
- **Reference code:** `src/components/sections/Donate.tsx` → `<DonateSection title text gifts={[{ amount, what, detail }]} form={<PledgeForm /> /* shadcn: ToggleGroup once/monthly + amounts, Inputs, Button */} spend={[{ label, share }]} note />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Trust Strip
- **Purpose:** Remove the small worries before a purchase or sign-up
- **Composition:** One row of 3–5 short promises between rules
- **Content:** The promises that matter for this kind of site (delivery, returns, guarantees, safety, what is included) — 2–5 words each plus one plain line
- **Behavior:** Static
- **Responsive:** 2-column grid, then one column
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Reference code:** `src/components/sections/Trust.tsx` → `<TrustSection items={[{ title: "Free returns", text: "Within 30 days." }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Reference code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Contact

Give one clear, low-friction way to get in touch.

### 01 Schedule
- **Purpose:** Show what happens when
- **Composition:** Days as columns (or stacked groups), each a list of time, title and a line of detail
- **Content:** Every day of the programme, real times, short titles
- **Behavior:** Static — no tabs, everything readable at once
- **Responsive:** Days stack, times stay left
- **Reference code:** `src/components/sections/Schedule.tsx` → `<ScheduleSection title="Programme" days={[{ label: "Friday", items: [{ time, title, detail }] }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, one action, and the real ways to reach you (email, and phone or address where they exist)
- **Behavior:** Static
- **Responsive:** Large tap target
- **Design — Ways to reach you (recommended):** The headline left, email, phone and address large on the right. Pass `variant="details"`.
- **Reference code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection variant="details" headline quiet="second line in the serif" action={{ label, href }} email phone address />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Location
- **Purpose:** Make visiting easy
- **Composition:** Address, hours, map link, one exterior image
- **Content:** Address, hours, transit notes
- **Behavior:** Static
- **Responsive:** Stack; tap-to-call and tap-to-map
- **Media:** side — pass `media="side"`
- **Reference code:** `src/components/sections/Location.tsx` → `<LocationSection title address hours={["…"]} notes mapUrl image alt />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Site Chrome

### 01 Navigation — Floating pill
- **Purpose:** Orientation and the primary action
- **Composition:** A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.
- **Content:** Logo, 4–6 links, one action
- **Behavior:** Hides on scroll down, returns on scroll up; the active link has a sliding highlight.
- **Responsive:** Mobile: capsule with logo + menu button; menu expands inside the capsule.

### 02 Footer — One quiet line
- **Purpose:** Practical information and a calm ending
- **Composition:** One row on the page ground above a hairline: logo left, 3–5 links centred, copyright right.
- **Content:** Address/email, links, copyright
- **Behavior:** Static.
- **Responsive:** Mobile: logo, links and copyright centred on three short lines.
- **Reference code:** `src/components/sections/Footer.tsx` → `<FooterSection variant="line" logo={<Logo />} columns={[{ title, links: [{ label, href, current }] }]} legal={[…]} copyright />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| StatementBlock | State the point of view in one or two sentences | Display-size text, optional small label | Line reveal |
| ServiceList | List services as clear, scannable offers | Rows: service, one-line description, what it includes | Row hover highlight; optional hover preview |
| Quote | Give a voice to a real person | Quote in display face, attribution in utility | Static |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
