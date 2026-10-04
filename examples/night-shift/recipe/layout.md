## Layout System — Grid-driven

| | |
|---|---|
| Container | Full width, 24px margins; grid lines may be visible |
| Grid | 12 columns desktop, 6 tablet, 4 mobile |
| Columns | Modules snap to 3, 4, 6 or 12 columns |
| Gutters | 0 (bordered modules) or 16px |
| Section spacing | 96–128px, or sections separated by rules only |
| Alignment | Strict flush-left; numbers and labels in fixed column positions |
| Hero composition | Oversized headline spanning 12 columns, metadata row beneath in 4 × 3 columns |
| Card proportions | 1:1 or 4:5 modules, bordered, equal heights per row |
| Media proportions | 1:1, 4:3, 16:9 — always snapped to module width |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Use only values from the scale. Space between sections is always larger than space within them.

### Shape — Hairline

Thin outlines and no fills — light and airy. Buttons 4px, cards 6px, media 4px, borders 1px, shadow none. Buttons and cards are outlined, not filled (except the one primary action); 1px borders in the border token.

### Menu — Floating dock

An app-style dock at the bottom of the screen with icons that grow as you pass.
- **Composition:** A floating dock centred 20px from the bottom: 4–6 labelled icons for the main pages plus the action; the logo sits alone at the top-left.
- **Behavior:** Icons magnify under the pointer (macOS-style); a tooltip shows the page name.
- **Responsive:** Mobile: a fixed bottom tab bar with the same icons — thumb-friendly.
- **Start from:** [Magic UI — Dock](https://magicui.design/docs/components/dock) — restyle to this recipe’s tokens and type; never ship a component’s demo look.

## Page Structure

Pages: Home · Curriculum · Enrol · Instructor · FAQ

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — 3D / WebGL scene
- **Purpose:** Establish mood and promise immediately
- **Composition:** A real-time 3D object or scene as the hero, lit with restraint; headline overlaid in HTML (never inside the canvas).
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Object reacts gently to pointer (≤ 8° rotation) and scroll (camera dolly). Render only while in view; cap DPR at 2.
- **Responsive:** Mobile: lower poly/texture budget, disable pointer effects, or show a pre-rendered video/image.

### 02 Intro
- **Purpose:** Say what this is and who it is for
- **Composition:** Short statement in display face across 8 columns, with a small label
- **Content:** 1–2 sentences, specific and concrete
- **Behavior:** Line reveal
- **Responsive:** Scale statement to ~8vw; keep line breaks intentional
- **Ready code:** `src/components/sections/Intro.tsx` → `<IntroSection label="Studio" statement="…" body="…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Case Study Preview
- **Purpose:** Show depth on one project
- **Composition:** Wide media + 3-column facts (client, role, outcome)
- **Content:** Problem, approach, result — 3 short paragraphs
- **Behavior:** Pinned media with advancing text (immersive) or static
- **Responsive:** Stack facts under media
- **Ready code:** `src/components/sections/CaseStudy.tsx` → `<CaseStudySection title image alt facts={[{ label, value }]} paragraphs={["Problem…", "Approach…", "Result…"]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Process
- **Purpose:** Reduce uncertainty about working together
- **Composition:** 3–5 steps in columns or a pinned sequence
- **Content:** Step name, 1–2 sentences, duration
- **Behavior:** Steps reveal in order
- **Responsive:** Vertical list
- **Ready code:** `src/components/sections/Process.tsx` → `<ProcessSection title="How we work" steps={[{ name, text, duration }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 05 About
- **Purpose:** Put a human face and point of view on the work
- **Composition:** Portrait image + statement + short bio
- **Content:** Real names, real history, no mission-statement clichés
- **Behavior:** Fade-rise
- **Responsive:** Portrait above text
- **Ready code:** `src/components/sections/About.tsx` → `<AboutSection title="About" image alt statement bio />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 06 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Ready code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 07 Pricing
- **Purpose:** Remove the final uncertainty
- **Composition:** 2–3 plans side by side, one recommended
- **Content:** Plan name, price, what's included
- **Behavior:** Static
- **Responsive:** Stacked plans, recommended first
- **Ready code:** `src/components/sections/Pricing.tsx` → `<PricingSection title plans={[{ name, price, period, features: [], action: { label, href }, recommended }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 08 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 09 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Curriculum

Show the eight weeks: what each module covers, the lessons in it, the real shot students grade that week, and what they hand in.

### 01 Features
- **Purpose:** Explain capabilities with evidence
- **Composition:** 2×2 or 3-column feature blocks, each with a real visual
- **Content:** 3–6 features, concrete language
- **Behavior:** Fade-rise stagger
- **Responsive:** Single column
- **Ready code:** `src/components/sections/FeatureGrid.tsx` → `<FeatureGridSection title features={[{ name, text, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Process
- **Purpose:** Reduce uncertainty about working together
- **Composition:** 3–5 steps in columns or a pinned sequence
- **Content:** Step name, 1–2 sentences, duration
- **Behavior:** Steps reveal in order
- **Responsive:** Vertical list
- **Ready code:** `src/components/sections/Process.tsx` → `<ProcessSection title="How we work" steps={[{ name, text, duration }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Case Study Preview
- **Purpose:** Show depth on one project
- **Composition:** Wide media + 3-column facts (client, role, outcome)
- **Content:** Problem, approach, result — 3 short paragraphs
- **Behavior:** Pinned media with advancing text (immersive) or static
- **Responsive:** Stack facts under media
- **Ready code:** `src/components/sections/CaseStudy.tsx` → `<CaseStudySection title image alt facts={[{ label, value }]} paragraphs={["Problem…", "Approach…", "Result…"]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Enrol

Remove the final uncertainty before signing up.

### 01 Pricing
- **Purpose:** Remove the final uncertainty
- **Composition:** 2–3 plans side by side, one recommended
- **Content:** Plan name, price, what's included
- **Behavior:** Static
- **Responsive:** Stacked plans, recommended first
- **Ready code:** `src/components/sections/Pricing.tsx` → `<PricingSection title plans={[{ name, price, period, features: [], action: { label, href }, recommended }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Ready code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Instructor

Put a human face and point of view on the work; build trust.

### 01 About
- **Purpose:** Put a human face and point of view on the work
- **Composition:** Portrait image + statement + short bio
- **Content:** Real names, real history, no mission-statement clichés
- **Behavior:** Fade-rise
- **Responsive:** Portrait above text
- **Ready code:** `src/components/sections/About.tsx` → `<AboutSection title="About" image alt statement bio />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Stats
- **Purpose:** Prove it with a few real numbers
- **Composition:** 3–4 large numbers with plain labels on one row
- **Content:** 3–4 true figures (years, projects, customers, ratings) with a label each
- **Behavior:** Static — readable at once
- **Responsive:** 2 × 2 grid
- **Ready code:** `src/components/sections/Stats.tsx` → `<StatsSection title="In numbers" stats={[{ value: "12", label: "Years" }]} note="…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Ready code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

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

### 01 Navigation — Floating dock
- **Purpose:** Orientation and the primary action
- **Composition:** A floating dock centred 20px from the bottom: 4–6 labelled icons for the main pages plus the action; the logo sits alone at the top-left.
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Icons magnify under the pointer (macOS-style); a tooltip shows the page name.
- **Responsive:** Mobile: a fixed bottom tab bar with the same icons — thumb-friendly.

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
| Hero | Set the mood and the promise in one view | A real-time 3D object or scene as the hero, lit with restraint; headline overlaid in HTML (never inside the canvas). | Object reacts gently to pointer (≤ 8° rotation) and scroll (camera dolly). Render only while in view; cap DPR at 2. |
| FeatureBlock | Explain one capability with evidence | Number/label, heading, 1–2 sentences, supporting visual | Static or fade-rise |
| PricingTable | Compare plans honestly | 2–3 plans, price, 5–7 differentiators, one recommended | Static; monthly/yearly toggle if relevant |
| Quote | Give a voice to a real person | Quote in display face, attribution in utility | Static |
| Accordion | Keep FAQs and details scannable | shadcn/ui Accordion (type="single" collapsible), restyled to the tokens | Height animates open and closed; one answer open at a time |
| CTA | Close the page with one clear action | Short headline, one button/link, real contact detail | Static; button state feedback only |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
