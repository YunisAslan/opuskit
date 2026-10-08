## Layout System — Grid-driven

The frame is already in `src/styles/tokens.css`: `--container`, `--gutter`, `--section-y`, `--ratio-card`, `--ratio-media` — every ready section uses them; new sections use them too, never a fixed max-width or padding. Each section's tone (ground, surface, inverse, chapter) and media placement are set per page below.

| | |
|---|---|
| Container | max-width none (full width), side gutter clamp(16px, 2vw, 24px) (--container, --gutter) |
| Grid | 12 columns desktop, 6 tablet, 4 mobile |
| Columns | Modules snap to 3, 4, 6 or 12 columns |
| Gutters | clamp(16px, 2vw, 24px) (--gutter) |
| Section spacing | clamp(72px, 9vw, 120px) between sections (--section-y) |
| Alignment | Strict flush-left; numbers and labels in fixed column positions |
| Hero composition | A single sentence at display scale (8–14vw) set on the grid, with a small metadata row beneath. No image required. |
| Card proportions | 1:1 for project, product and people cards (--ratio-card) |
| Media proportions | 4:3 for pictures beside text (--ratio-media); 21:9 for a full-width band. Photo files follow the shot list (recipe/media.md) |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Inside a section use only values from the scale; between sections use --section-y. Space between sections is always larger than space within them.

### Shape — Sharp

Square corners, crisp lines — precise and editorial. Buttons 0px, cards 0px, media 0px, borders 1px, shadow none. No rounded corners anywhere; structure comes from lines and space.

### Menu — Floating pill

A rounded bar that floats above the page and tucks away while you read.
- **Composition:** A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.
- **Behavior:** Hides on scroll down, returns on scroll up; the active link has a sliding highlight.
- **Responsive:** Mobile: capsule with logo + menu button; menu expands inside the capsule.

## Page Structure

Pages: Home · Curriculum · Enrol · Instructor · FAQ

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Typographic statement
- **Purpose:** Establish mood and promise immediately
- **Composition:** A single sentence at display scale (8–14vw) set on the grid, with a small metadata row beneath. No image required.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Lines reveal once with a short stagger (80ms per line). Nothing else moves.
- **Responsive:** Mobile: re-break lines manually (don't rely on auto-wrapping) and scale to ~15vw.

### 02 Manifesto
- **Purpose:** State the point of view boldly
- **Composition:** Display-size statement spanning the grid
- **Content:** 1–3 sentences that could only be yours
- **Behavior:** Line reveal / scroll-driven type
- **Responsive:** Re-break lines for mobile
- **Design — Across the page:** The sentence huge, across the whole page. Pass `variant="giant"`.
- **Reference code:** `src/components/sections/Statement.tsx` → `<StatementSection variant="giant" statement="…" attribution="…" />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Process
- **Purpose:** Show what happens, step by step
- **Composition:** 3–5 steps in columns or a pinned sequence
- **Content:** Step name, 1–2 sentences, and how long it takes where that matters
- **Behavior:** Steps reveal in order
- **Responsive:** Vertical list
- **Design — Big numbers:** Each step under a large number, side by side. Pass `variant="columns"`.
- **Reference code:** `src/components/sections/Steps.tsx` → `<StepsSection variant="columns" title="How we work" steps={[{ name, text, duration }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 04 Team
- **Purpose:** Show the people behind it
- **Composition:** Portrait grid: photo, name, role, one line each
- **Content:** 3–8 people: real photo, name, role, one sentence
- **Behavior:** Fade-rise
- **Responsive:** 2-column grid
- **Design — A list:** Name, role and line on one row, a small portrait. Pass `variant="list"`.
- **Reference code:** `src/components/sections/Team.tsx` → `<TeamSection variant="list" title="The team" people={[{ name, role, line, image, alt }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 05 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and who they are to this place (client, guest, customer, member)
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — One big quote (recommended):** A single quote set huge across the page. Pass `variant="single"`.
- **Reference code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection variant="single" title="What people say" quotes={[{ quote, name, role }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 06 Pricing
- **Purpose:** Remove the final uncertainty
- **Composition:** 2–3 plans side by side, one recommended
- **Content:** Plan name, price, what's included
- **Behavior:** Static
- **Responsive:** Stacked plans, recommended first
- **Design — Cards:** Plans side by side, the recommended one outlined. Pass `variant="cards"`.
- **Reference code:** `src/components/sections/Pricing.tsx` → `<PricingSection variant="cards" title plans={[{ name, price, period, features: [], action: { label, href }, recommended }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 07 Schedule
- **Purpose:** Show what happens when
- **Composition:** Days as columns (or stacked groups), each a list of time, title and a line of detail
- **Content:** Every day of the programme, real times, short titles
- **Behavior:** Static — no tabs, everything readable at once
- **Responsive:** Days stack, times stay left
- **Reference code:** `src/components/sections/Schedule.tsx` → `<ScheduleSection title="Programme" days={[{ label: "Friday", items: [{ time, title, detail }] }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 08 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Reference code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 09 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, one action, and the real ways to reach you (email, and phone or address where they exist)
- **Behavior:** Static
- **Responsive:** Large tap target
- **Tone:** inverse — pass `tone="inverse"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — Big invitation (recommended):** The headline huge, one button and the email. Pass `variant="statement"`.
- **Reference code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection variant="statement" headline quiet="second line in the serif" action={{ label, href }} email phone address />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Curriculum

Explain what the product does with concrete, specific evidence, not adjectives.

### 01 Curriculum
- **Purpose:** Show exactly what a course teaches, week by week
- **Composition:** One row per module: its week or number and length, the title and a line on what it covers, the lessons in it, and what the student makes or hands in
- **Content:** 4–12 modules, 3–6 lessons each, one outcome per module
- **Behavior:** Static, all lessons visible; rows may reveal in order
- **Responsive:** Each module stacks: label, title, lessons, outcome
- **Reference code:** `src/components/sections/Curriculum.tsx` → `<CurriculumSection title text modules={[{ label: "Week 1", title, text, lessons: ["…"], outcome: { label: "Hand in", value } }]} note />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Process
- **Purpose:** Show what happens, step by step
- **Composition:** 3–5 steps in columns or a pinned sequence
- **Content:** Step name, 1–2 sentences, and how long it takes where that matters
- **Behavior:** Steps reveal in order
- **Responsive:** Vertical list
- **Design — Big numbers (recommended):** Each step under a large number, side by side. Pass `variant="columns"`.
- **Reference code:** `src/components/sections/Steps.tsx` → `<StepsSection variant="columns" title="How we work" steps={[{ name, text, duration }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Reference code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Enrol

Remove the final uncertainty before signing up.

### 01 Pricing
- **Purpose:** Remove the final uncertainty
- **Composition:** 2–3 plans side by side, one recommended
- **Content:** Plan name, price, what's included
- **Behavior:** Static
- **Responsive:** Stacked plans, recommended first
- **Design — Cards (recommended):** Plans side by side, the recommended one outlined. Pass `variant="cards"`.
- **Reference code:** `src/components/sections/Pricing.tsx` → `<PricingSection variant="cards" title plans={[{ name, price, period, features: [], action: { label, href }, recommended }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Reference code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and who they are to this place (client, guest, customer, member)
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — One big quote (recommended):** A single quote set huge across the page. Pass `variant="single"`.
- **Reference code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection variant="single" title="What people say" quotes={[{ quote, name, role }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

---

## Instructor

Put a human face and point of view on the work; build trust.

### 01 About
- **Purpose:** Put a human face and point of view on the work
- **Composition:** Portrait image + statement + short bio
- **Content:** Real names, real history, no mission-statement clichés
- **Behavior:** Fade-rise
- **Responsive:** Portrait above text
- **Media:** full — pass `media="full"`
- **Reference code:** `src/components/sections/About.tsx` → `<AboutSection title="About" image alt statement bio />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 02 Stats
- **Purpose:** Prove it with a few real numbers
- **Composition:** 3–4 large numbers with plain labels on one row
- **Content:** 3–4 true figures (years, projects, customers, ratings) with a label each
- **Behavior:** Static — readable at once
- **Responsive:** 2 × 2 grid
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — One huge number (recommended):** The first number across the page, the rest small. Pass `variant="giant"`.
- **Reference code:** `src/components/sections/Stats.tsx` → `<StatsSection variant="giant" title="In numbers" stats={[{ value: "12", label: "Years" }]} note="…" />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

### 03 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and who they are to this place (client, guest, customer, member)
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Design — One big quote (recommended):** A single quote set huge across the page. Pass `variant="single"`.
- **Reference code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection variant="single" title="What people say" quotes={[{ quote, name, role }]} />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

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

## Site Chrome

### 01 Navigation — Floating pill
- **Purpose:** Orientation and the primary action
- **Composition:** A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.
- **Content:** Logo, 4–6 links, one action
- **Behavior:** Hides on scroll down, returns on scroll up; the active link has a sliding highlight.
- **Responsive:** Mobile: capsule with logo + menu button; menu expands inside the capsule.

### 02 Footer — Big name
- **Purpose:** Practical information and a calm ending
- **Composition:** Links and contact in one row at the top, then the brand name in the display face spanning the full container width (sized to fit, one line), then copyright and legal small underneath. It stays on the page ground (the palette is dark). The name is cut off by the bottom edge of the page (copyright and legal sit above it).
- **Content:** Address/email, links, copyright
- **Behavior:** Static; the wordmark may rise 24px into place as it enters (reduced motion: none).
- **Responsive:** Mobile: links wrap in two columns; the wordmark still spans the full width.
- **Reference code:** `src/components/sections/Footer.tsx` → `<FooterSection light variant="wordmark" brand="…" wordmark="cropped" logo={<Logo />} columns={[{ title, links: [{ label, href, current }] }]} legal={[…]} copyright />` — its design to start from: real copy and media through props, `link={Link}` (next/link) for in-site links, tokens only; its sizes, spacing and type follow this site, and its code is edited wherever it disagrees.

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| FeatureBlock | Explain one capability with evidence | Number/label, heading, 1–2 sentences, supporting visual | Static or fade-rise |
| PricingTable | Compare plans honestly | 2–3 plans, price, 5–7 differentiators, one recommended | Static; monthly/yearly toggle if relevant |
| Quote | Give a voice to a real person | Quote in display face, attribution in utility | Static |
| Accordion | Keep FAQs and details scannable | shadcn/ui Accordion (type="single" collapsible), restyled to the tokens | Height animates open and closed; one answer open at a time |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
