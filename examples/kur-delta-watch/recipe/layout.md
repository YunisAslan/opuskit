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

### Shape — Bold outline

Thick black borders and hard offset shadows — loud and graphic. Buttons 0px, cards 0px, media 0px, borders 2px, shadow 4px 4px 0 var(--color-text). 2px ink borders on every module; hard offset shadow that collapses on press; no blur shadows.

### Menu — Menu with cards

A compact bar that opens into image cards for each part of the site.
- **Composition:** Compact bar; opening it reveals 3–4 cards below, each a section of the site with a photo, title and 2–3 links.
- **Behavior:** Cards drop in with a short stagger; the bar grows to hold them.
- **Responsive:** Mobile: cards stack vertically in a sheet.

## Page Structure

Pages: Home · The river · What we do · Field notes · Donate · Contact

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Kinetic type hero
- **Purpose:** Establish mood and promise immediately
- **Composition:** Oversized words that move with scroll: horizontal drift, weight or width shifts on a variable font, line-by-line masking.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Scroll-linked transforms (translateX, font-variation-settings) via Motion useScroll + useTransform (or CSS animation-timeline: view()); one idea per screen.
- **Responsive:** Mobile: reduce to vertical line reveals; avoid horizontal scroll overflow.

### 02 Stats
- **Purpose:** Prove it with a few real numbers
- **Composition:** 3–4 large numbers with plain labels on one row
- **Content:** 3–4 true figures (years, projects, customers, ratings) with a label each
- **Behavior:** Static — readable at once
- **Responsive:** 2 × 2 grid
- **Ready code:** `src/components/sections/Stats.tsx` → `<StatsSection title="In numbers" stats={[{ value: "12", label: "Years" }]} note="…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Hero — Ambient video hero · mid-page
- **Purpose:** Establish mood and promise immediately
- **Composition:** Placed mid-page, right after Stats — not the first screen. Build it as a full-width band at exactly this point of the page: the page opens with Hero, whose heading is the page's h1 (this band's headline is an h2), and the menu sits solid over that first section, never overlaid on this band. A pinned or scroll-driven version pins only while this band is in view and releases before the next section; its video loads and plays only as the band nears the viewport (preload="none" + IntersectionObserver), never at page load. Full-viewport muted loop (8–15s) behind a short headline; a poster frame shows instantly while video loads. This part shows Ambient video hero, not what the site's first screen shows — it needs its own video, separate from the first screen's media.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** autoplay, muted, loop, playsInline. Pauses when out of view (IntersectionObserver) and when the tab is hidden. Visible pause control.
- **Responsive:** Mobile: 9:16 or 4:5 encode ≤ 3MB, or the poster image only on Save-Data / slow connections.

### 04 Manifesto
- **Purpose:** State the point of view boldly
- **Composition:** Display-size statement spanning the grid
- **Content:** 1–3 sentences that could only be yours
- **Behavior:** Line reveal / scroll-driven type
- **Responsive:** Re-break lines for mobile
- **Ready code:** `src/components/sections/Manifesto.tsx` → `<ManifestoSection statement="…" attribution="…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 05 Timeline
- **Purpose:** Tell the story as dated steps
- **Composition:** Heading and a short line beside a hairline of dated steps, oldest first, the latest marked
- **Content:** 4–7 real dates (years or months), each with what happened and one line on why it mattered
- **Behavior:** Static; a scroll-drawn line is an optional moment
- **Responsive:** Heading above, steps stacked along the line
- **Ready code:** `src/components/sections/Timeline.tsx` → `<TimelineSection title="How we got here" text="…" steps={[{ when: "2019", title, detail }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 06 Services
- **Purpose:** Make offers clear
- **Composition:** Numbered service rows with rules between
- **Content:** 4–6 services, each with a one-line description
- **Behavior:** Row hover highlight
- **Responsive:** Full-width rows, description beneath title
- **Ready code:** `src/components/sections/Services.tsx` → `<ServicesSection title="Services" items={[{ name, line }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 07 CTA Band
- **Purpose:** Offer the next step mid-page without ending it
- **Composition:** Slim full-width band: one line and one action, optional short note
- **Content:** One specific offer (trial, deadline, free delivery) and its action
- **Behavior:** Static
- **Responsive:** Line above the button
- **Ready code:** `src/components/sections/CtaBand.tsx` → `<CtaBandSection text="One line" action={{ label, href }} note="…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 08 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view
- **Ready code:** `src/components/sections/Journal.tsx` → `<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 09 Newsletter
- **Purpose:** Turn a visit into a returning reader
- **Composition:** One reason to subscribe beside an email field and a button, with a note under it
- **Content:** What they get, how often, and that it is easy to leave
- **Behavior:** Static; the form posts to your email provider
- **Responsive:** Field and button stack, full width
- **Ready code:** `src/components/sections/Newsletter.tsx` → `<NewsletterSection title text placeholder="you@example.com" button="Subscribe" note="Once a month." action="https://…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## The river

Put a human face and point of view on the work; build trust.

### 01 About
- **Purpose:** Put a human face and point of view on the work
- **Composition:** Portrait image + statement + short bio
- **Content:** Real names, real history, no mission-statement clichés
- **Behavior:** Fade-rise
- **Responsive:** Portrait above text
- **Ready code:** `src/components/sections/About.tsx` → `<AboutSection title="About" image alt statement bio />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width
- **Ready code:** `src/components/sections/EditorialStory.tsx` → `<EditorialStorySection title image alt caption paragraphs={[…]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Team
- **Purpose:** Show the people behind it
- **Composition:** Portrait grid: photo, name, role, one line each
- **Content:** 3–8 people: real photo, name, role, one sentence
- **Behavior:** Fade-rise
- **Responsive:** 2-column grid
- **Ready code:** `src/components/sections/Team.tsx` → `<TeamSection title="The team" people={[{ name, role, line, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## What we do

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

### 03 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Field notes

Let real clients or customers make the case, in their own words.

### 01 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Ready code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width
- **Ready code:** `src/components/sections/EditorialStory.tsx` → `<EditorialStorySection title image alt caption paragraphs={[…]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Ready code:** `src/components/sections/Gallery.tsx` → `<GallerySection photos={[{ src, alt, caption }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Donate

Turn a visitor into a donor: give once or monthly, preset amounts that each say what they pay for (a sack of rubbish out, a month of water tests, a boat day), how the money is spent, and a short donation form.

### 01 Pricing
- **Purpose:** Remove the final uncertainty
- **Composition:** 2–3 plans side by side, one recommended
- **Content:** Plan name, price, what's included
- **Behavior:** Static
- **Responsive:** Stacked plans, recommended first
- **Ready code:** `src/components/sections/Pricing.tsx` → `<PricingSection title plans={[{ name, price, period, features: [], action: { label, href }, recommended }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Trust Strip
- **Purpose:** Remove the small worries before a purchase or sign-up
- **Composition:** One row of 3–5 short promises between rules
- **Content:** Shipping, returns, trial, guarantee, insurance — 2–5 words each plus one plain line
- **Behavior:** Static
- **Responsive:** 2-column grid, then one column
- **Ready code:** `src/components/sections/Trust.tsx` → `<TrustSection items={[{ title: "Free returns", text: "Within 30 days." }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width
- **Ready code:** `src/components/sections/Faq.tsx` → `<FaqSection title="Questions"><Accordion type="single" collapsible>{items.map(({ q, a }) => <AccordionItem …>)}</Accordion></FaqSection>` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

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

---

## Site Chrome

### 01 Navigation — Menu with cards
- **Purpose:** Orientation and the primary action
- **Composition:** Compact bar; opening it reveals 3–4 cards below, each a section of the site with a photo, title and 2–3 links.
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Cards drop in with a short stagger; the bar grows to hold them.
- **Responsive:** Mobile: cards stack vertically in a sheet.

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
| Hero | Set the mood and the promise in one view | Oversized words that move with scroll: horizontal drift, weight or width shifts on a variable font, line-by-line masking. | Scroll-linked transforms (translateX, font-variation-settings) via Motion useScroll + useTransform (or CSS animation-timeline: view()); one idea per screen. |
| StatementBlock | State the point of view in one or two sentences | Display-size text, optional small label | Line reveal |
| ServiceList | List services as clear, scannable offers | Numbered rows: service, one-line description, deliverables | Row hover highlight; optional hover preview |
| Quote | Give a voice to a real person | Quote in display face, attribution in utility | Static |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| CTA | Close the page with one clear action | Short headline, one button/link, real contact detail | Static; button state feedback only |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
