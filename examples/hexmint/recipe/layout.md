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

### Shape — Round

Generous curves, like a modern app. Buttons 14px, cards 24px, media 20px, borders 1px, shadow 0 1px 2px rgb(0 0 0 / 0.06), 0 8px 24px rgb(0 0 0 / 0.06). Large radii on cards and media; nested elements use radius − padding.

### Menu — Floating pill

A rounded bar that floats above the page and tucks away while you read.
- **Composition:** A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.
- **Behavior:** Hides on scroll down, returns on scroll up; the active link has a sliding highlight.
- **Responsive:** Mobile: capsule with logo + menu button; menu expands inside the capsule.

## Page Structure

Pages: Home · Features · Pricing · FAQ

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — 3D / WebGL scene
- **Purpose:** Establish mood and promise immediately
- **Composition:** A real-time 3D object or scene as the hero, lit with restraint; headline overlaid in HTML (never inside the canvas).
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Object reacts gently to pointer (≤ 8° rotation) and scroll (camera dolly). Render only while in view; cap DPR at 2.
- **Responsive:** Mobile: lower poly/texture budget, disable pointer effects, or show a pre-rendered video/image.

### 02 Clients
- **Purpose:** Show breadth of trust
- **Composition:** Logo/name grid or slow marquee
- **Content:** Real client names only
- **Behavior:** Static or slow marquee
- **Responsive:** 2-column grid
- **Ready code:** `src/components/sections/Clients.tsx` → `<ClientsSection title="Clients" names={["…"]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Feature Rows
- **Purpose:** Explain one capability or offer at a time, each with its own picture
- **Composition:** 3–6 rows: large media on one side, heading + short text + optional link on the other; sides alternate
- **Content:** Per row: one concrete capability, 1–2 sentences, one real visual
- **Behavior:** Fade-rise per row
- **Responsive:** Stack each row, media first
- **Ready code:** `src/components/sections/FeatureRows.tsx` → `<FeatureRowsSection title rows={[{ name, text, image, alt, link: { label, href } }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Features
- **Purpose:** Explain capabilities with evidence
- **Composition:** 2×2 or 3-column feature blocks, each with a real visual
- **Content:** 3–6 features, concrete language
- **Behavior:** Fade-rise stagger
- **Responsive:** Single column
- **Ready code:** `src/components/sections/FeatureGrid.tsx` → `<FeatureGridSection title features={[{ name, text, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 05 Integrations
- **Purpose:** Show it fits the tools people already use
- **Composition:** Short heading and line beside a grid of tool names set as type
- **Content:** 6–12 real tool names, one optional line on how connecting works
- **Behavior:** Static
- **Responsive:** 2-column grid under the heading
- **Ready code:** `src/components/sections/Integrations.tsx` → `<IntegrationsSection title text tools={["…"]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 06 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Ready code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 07 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Features

Explain what the product does with concrete, specific evidence, not adjectives.

### 01 Features
- **Purpose:** Explain capabilities with evidence
- **Composition:** 2×2 or 3-column feature blocks, each with a real visual
- **Content:** 3–6 features, concrete language
- **Behavior:** Fade-rise stagger
- **Responsive:** Single column
- **Ready code:** `src/components/sections/FeatureGrid.tsx` → `<FeatureGridSection title features={[{ name, text, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Product Highlight
- **Purpose:** Show one product (or feature) in depth
- **Composition:** Large product media with 3–4 annotated details
- **Content:** Materials, dimensions, key benefit
- **Behavior:** Pinned product with advancing details (immersive) or static
- **Responsive:** Media then detail list
- **Ready code:** `src/components/sections/ProductHighlight.tsx` → `<ProductHighlightSection name text image alt details={[{ label, value }]} action={{ label, href }} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 How It Works
- **Purpose:** Show the workflow in steps
- **Composition:** Numbered steps with product visuals, horizontal on desktop
- **Content:** 3–4 steps, one sentence each
- **Behavior:** Steps activate in sequence on scroll
- **Responsive:** Vertical steps
- **Ready code:** `src/components/sections/HowItWorks.tsx` → `<HowItWorksSection title steps={[{ name, text, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Pricing

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
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions" items={[{ q, a }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Ready code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

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

### 01 Navigation — Floating pill
- **Purpose:** Orientation and the primary action
- **Composition:** A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Hides on scroll down, returns on scroll up; the active link has a sliding highlight.
- **Responsive:** Mobile: capsule with logo + menu button; menu expands inside the capsule.

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
| Hero | Set the mood and the promise in one view | A real-time 3D object or scene as the hero, lit with restraint; headline overlaid in HTML (never inside the canvas). | Object reacts gently to pointer (≤ 8° rotation) and scroll (camera dolly). Render only while in view; cap DPR at 2. |
| FeatureBlock | Explain one capability with evidence | Number/label, heading, 1–2 sentences, supporting visual | Static or fade-rise |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| PricingTable | Compare plans honestly | 2–3 plans, price, 5–7 differentiators, one recommended | Static; monthly/yearly toggle if relevant |
| Accordion | Keep FAQs and details scannable | Native <details>/<summary> styled | Height animation via CSS interpolate-size where supported |
| CTA | Close the page with one clear action | Short headline, one button/link, real contact detail | Static; button state feedback only |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
