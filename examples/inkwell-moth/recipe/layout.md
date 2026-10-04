## Layout System — Experimental

| | |
|---|---|
| Container | Full width, free positioning within a 24-column underlying grid |
| Grid | 24 columns (fine-grained for off-grid placement) |
| Columns | Elements span unusual widths (5, 7, 11); overlaps allowed |
| Gutters | 1vw |
| Section spacing | Irregular: 80–240px, set per section by composition |
| Alignment | Deliberately varied; one anchor element per section keeps it readable |
| Hero composition | Type overlapping media, one element rotated or cropped by the viewport edge |
| Card proportions | No uniform cards — each item composed individually |
| Media proportions | Free, including circles, arches and extreme crops |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Use only values from the scale. Space between sections is always larger than space within them.

### Shape — Sharp

Square corners, crisp lines — precise and editorial. Buttons 0px, cards 0px, media 0px, borders 1px, shadow none. No rounded corners anywhere; structure comes from lines and space.

### Menu — Side index

A quiet list of pages fixed down the left side, like a book’s contents.
- **Composition:** Fixed left column (≈220px): logo, then the page list in the utility face, the current page marked; content fills the rest.
- **Behavior:** Current section updates while scrolling (scroll-spy).
- **Responsive:** Mobile: collapses to a top bar with a menu button.

## Page Structure

Pages: Home · Books · About · Commissions

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Illustrated hero
- **Purpose:** Establish mood and promise immediately
- **Composition:** A commissioned illustration as the key visual, with type set in harmony with its line weight and palette.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** SVG layers can drift independently (parallax at 2–3 depths) or draw in once (stroke-dashoffset).
- **Responsive:** Mobile: a portrait version of the illustration or a cropped detail.

### 02 Featured Work
- **Purpose:** Prove quality with 3–6 best projects
- **Composition:** Alternating large/small project cards, or a numbered index list with hover preview
- **Content:** Project title, discipline, year, 1 image each
- **Behavior:** Image reveal on entry; hover preview on index
- **Responsive:** Single column, images first
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Ready code:** `src/components/sections/FeaturedWork.tsx` → `<FeaturedWorkSection title="Selected work" projects={[{ title, meta, image, alt, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row
- **Photos — Gallery wall (recommended):** Masonry columns (3 desktop, 2 tablet) using each photo’s native ratio — no forced crops; gutters from the spacing scale; one or two photos span two columns to break the grid. Staggered reveal (40–60 ms per item); click opens an accessible lightbox with arrow keys, Esc and swipe. Mobile: Two columns on mobile down to 360 px, then one; the lightbox swipes.
- **Ready code:** `src/components/sections/Gallery.tsx` → `<GallerySection photos={[{ src, alt, caption }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Books

Prove quality and range through the strongest projects; make it easy to go deeper on any one.

### 01 Featured Work
- **Purpose:** Prove quality with 3–6 best projects
- **Composition:** Alternating large/small project cards, or a numbered index list with hover preview
- **Content:** Project title, discipline, year, 1 image each
- **Behavior:** Image reveal on entry; hover preview on index
- **Responsive:** Single column, images first
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Ready code:** `src/components/sections/FeaturedWork.tsx` → `<FeaturedWorkSection title="Selected work" projects={[{ title, meta, image, alt, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Case Study Preview
- **Purpose:** Show depth on one project
- **Composition:** Wide media + 3-column facts (client, role, outcome)
- **Content:** Problem, approach, result — 3 short paragraphs
- **Behavior:** Pinned media with advancing text (immersive) or static
- **Responsive:** Stack facts under media
- **Ready code:** `src/components/sections/CaseStudy.tsx` → `<CaseStudySection title image alt facts={[{ label, value }]} paragraphs={["Problem…", "Approach…", "Result…"]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row
- **Photos — Gallery wall (recommended):** Masonry columns (3 desktop, 2 tablet) using each photo’s native ratio — no forced crops; gutters from the spacing scale; one or two photos span two columns to break the grid. Staggered reveal (40–60 ms per item); click opens an accessible lightbox with arrow keys, Esc and swipe. Mobile: Two columns on mobile down to 360 px, then one; the lightbox swipes.
- **Ready code:** `src/components/sections/Gallery.tsx` → `<GallerySection photos={[{ src, alt, caption }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Clients
- **Purpose:** Show breadth of trust
- **Composition:** Logo/name grid or slow marquee
- **Content:** Real client names only
- **Behavior:** Static or slow marquee
- **Responsive:** 2-column grid
- **Ready code:** `src/components/sections/Clients.tsx` → `<ClientsSection title="Clients" names={["…"]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

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

### 02 Process
- **Purpose:** Reduce uncertainty about working together
- **Composition:** 3–5 steps in columns or a pinned sequence
- **Content:** Step name, 1–2 sentences, duration
- **Behavior:** Steps reveal in order
- **Responsive:** Vertical list
- **Ready code:** `src/components/sections/Process.tsx` → `<ProcessSection title="How we work" steps={[{ name, text, duration }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Stats
- **Purpose:** Prove it with a few real numbers
- **Composition:** 3–4 large numbers with plain labels on one row
- **Content:** 3–4 true figures (years, projects, customers, ratings) with a label each
- **Behavior:** Static — readable at once
- **Responsive:** 2 × 2 grid
- **Ready code:** `src/components/sections/Stats.tsx` → `<StatsSection title="In numbers" stats={[{ value: "12", label: "Years" }]} note="…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Ready code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 05 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Commissions

Tell publishers and authors how to commission a book or a cover: what Nell takes on, lead times, rough fees, and a short enquiry form.

### 01 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Site Chrome

### 01 Navigation — Side index
- **Purpose:** Orientation and the primary action
- **Composition:** Fixed left column (≈220px): logo, then the page list in the utility face, the current page marked; content fills the rest.
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Current section updates while scrolling (scroll-spy).
- **Responsive:** Mobile: collapses to a top bar with a menu button.

### 02 Footer — One quiet line
- **Purpose:** Practical information and a calm ending
- **Composition:** One row on the page ground above a hairline: logo left, 3–5 links centred, copyright right.
- **Content:** Address/email, links, copyright
- **Behavior:** Static.
- **Responsive:** Mobile: logo, links and copyright centred on three short lines.
- **Ready code:** `src/components/sections/Footer.tsx` → `<FooterSection variant="line" logo={<Logo />} columns={[{ title, links: [{ label, href, current }] }]} legal={[…]} copyright />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| Navigation | Orient and offer the primary action | Logo left, 3–5 links, one primary action right; mobile: full-screen menu | Hides on scroll down, reappears on scroll up; solid background after hero |
| Hero | Set the mood and the promise in one view | A commissioned illustration as the key visual, with type set in harmony with its line weight and palette. | SVG layers can drift independently (parallax at 2–3 depths) or draw in once (stroke-dashoffset). |
| ProjectCard | Preview one project and lead to its case study | Media (fixed ratio), title, discipline/year in utility face | Hover: subtle image scale (1.03) or preview; whole card is one link |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| StatementBlock | State the point of view in one or two sentences | Display-size text, optional small label | Line reveal |
| CTA | Close the page with one clear action | Short headline, one button/link, real contact detail | Static; button state feedback only |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
