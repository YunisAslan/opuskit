## Layout System — Editorial

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

### Menu — Full-screen menu

Just the logo and “Menu” — it opens into huge links over the whole screen.
- **Composition:** Minimal bar: logo and a “Menu” label only. The menu is a full-viewport panel with display-size links, one per line, plus contact details.
- **Behavior:** Panel slides or wipes in; links stagger in (40ms); hovering a link can reveal an image or run a flowing marquee.
- **Responsive:** Same on every screen — it is already touch-first.

## Page Structure

Pages: Home · Case Studies · Services · About · Contact

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Kinetic type hero
- **Purpose:** Establish mood and promise immediately
- **Composition:** Oversized words that move with scroll: horizontal drift, weight or width shifts on a variable font, line-by-line masking.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Scroll-linked transforms (translateX, font-variation-settings) via ScrollTrigger scrub; one idea per screen.
- **Responsive:** Mobile: reduce to vertical line reveals; avoid horizontal scroll overflow.

### 02 Manifesto
- **Purpose:** State the point of view boldly
- **Composition:** Display-size statement spanning the grid
- **Content:** 1–3 sentences that could only be yours
- **Behavior:** Line reveal / scroll-driven type
- **Responsive:** Re-break lines for mobile
- **Ready code:** `src/components/sections/Manifesto.tsx` → `<ManifestoSection statement="…" attribution="…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Featured Work
- **Purpose:** Prove quality with 3–6 best projects
- **Composition:** Alternating large/small project cards, or a numbered index list with hover preview
- **Content:** Project title, discipline, year, 1 image each
- **Behavior:** Image reveal on entry; hover preview on index
- **Responsive:** Single column, images first
- **Photos — Names that reveal photos (recommended):** Full-width list of titles in the display face with year/category in the utility face; the photo appears in a fixed-size frame (4:5) that follows the cursor or sits in a side column. Photo fades and scales in (200–300 ms) on hover/focus, follows the pointer with light lag; keyboard focus shows it too. Mobile: Touch has no hover: show each photo as a small thumbnail at the start of its row.
- **Ready code:** `src/components/sections/FeaturedWork.tsx` → `<FeaturedWorkSection title="Selected work" projects={[{ title, meta, image, alt, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Services
- **Purpose:** Make offers clear
- **Composition:** Numbered service rows with rules between
- **Content:** 4–6 services, each with a one-line description
- **Behavior:** Row hover highlight
- **Responsive:** Full-width rows, description beneath title
- **Ready code:** `src/components/sections/Services.tsx` → `<ServicesSection title="Services" items={[{ name, line }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 05 Clients
- **Purpose:** Show breadth of trust
- **Composition:** Logo/name grid or slow marquee
- **Content:** Real client names only
- **Behavior:** Static or slow marquee
- **Responsive:** 2-column grid
- **Ready code:** `src/components/sections/Clients.tsx` → `<ClientsSection title="Clients" names={["…"]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 06 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view
- **Ready code:** `src/components/sections/Journal.tsx` → `<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 07 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Case Studies

Prove quality and range through the strongest projects; make it easy to go deeper on any one.

### 01 Featured Work
- **Purpose:** Prove quality with 3–6 best projects
- **Composition:** Alternating large/small project cards, or a numbered index list with hover preview
- **Content:** Project title, discipline, year, 1 image each
- **Behavior:** Image reveal on entry; hover preview on index
- **Responsive:** Single column, images first
- **Photos — Names that reveal photos (recommended):** Full-width list of titles in the display face with year/category in the utility face; the photo appears in a fixed-size frame (4:5) that follows the cursor or sits in a side column. Photo fades and scales in (200–300 ms) on hover/focus, follows the pointer with light lag; keyboard focus shows it too. Mobile: Touch has no hover: show each photo as a small thumbnail at the start of its row.
- **Ready code:** `src/components/sections/FeaturedWork.tsx` → `<FeaturedWorkSection title="Selected work" projects={[{ title, meta, image, alt, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Case Study Preview
- **Purpose:** Show depth on one project
- **Composition:** Wide media + 3-column facts (client, role, outcome)
- **Content:** Problem, approach, result — 3 short paragraphs
- **Behavior:** Pinned media with advancing text (immersive) or static
- **Responsive:** Stack facts under media
- **Ready code:** `src/components/sections/CaseStudy.tsx` → `<CaseStudySection title image alt facts={[{ label, value }]} paragraphs={["Problem…", "Approach…", "Result…"]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Clients
- **Purpose:** Show breadth of trust
- **Composition:** Logo/name grid or slow marquee
- **Content:** Real client names only
- **Behavior:** Static or slow marquee
- **Responsive:** 2-column grid
- **Ready code:** `src/components/sections/Clients.tsx` → `<ClientsSection title="Clients" names={["…"]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Services

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

### 05 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

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

### 02 Team
- **Purpose:** Show the people behind it
- **Composition:** Portrait grid: photo, name, role, one line each
- **Content:** 3–8 people: real photo, name, role, one sentence
- **Behavior:** Fade-rise
- **Responsive:** 2-column grid
- **Ready code:** `src/components/sections/Team.tsx` → `<TeamSection title="The team" people={[{ name, role, line, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Stats
- **Purpose:** Prove it with a few real numbers
- **Composition:** 3–4 large numbers with plain labels on one row
- **Content:** 3–4 true figures (years, projects, customers, ratings) with a label each
- **Behavior:** Static — readable at once
- **Responsive:** 2 × 2 grid
- **Ready code:** `src/components/sections/Stats.tsx` → `<StatsSection title="In numbers" stats={[{ value: "12", label: "Years" }]} note="…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

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
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions" items={[{ q, a }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Site Chrome

### 01 Navigation — Full-screen menu
- **Purpose:** Orientation and the primary action
- **Composition:** Minimal bar: logo and a “Menu” label only. The menu is a full-viewport panel with display-size links, one per line, plus contact details.
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Panel slides or wipes in; links stagger in (40ms); hovering a link can reveal an image or run a flowing marquee.
- **Responsive:** Same on every screen — it is already touch-first.

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
| Hero | Set the mood and the promise in one view | Oversized words that move with scroll: horizontal drift, weight or width shifts on a variable font, line-by-line masking. | Scroll-linked transforms (translateX, font-variation-settings) via ScrollTrigger scrub; one idea per screen. |
| StatementBlock | State the point of view in one or two sentences | Display-size text, optional small label | Line reveal |
| ProjectCard | Preview one project and lead to its case study | Media (fixed ratio), title, discipline/year in utility face | Hover: subtle image scale (1.03) or preview; whole card is one link |
| ServiceList | List services as clear, scannable offers | Numbered rows: service, one-line description, deliverables | Row hover highlight; optional hover preview |
| Marquee | Show breadth (clients, capabilities) in a compact strip | Repeating row of names/logos | Slow CSS loop; pauses on hover; static under reduced motion |
| CTA | Close the page with one clear action | Short headline, one button/link, real contact detail | Static; button state feedback only |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
