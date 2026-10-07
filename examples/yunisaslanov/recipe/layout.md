## Layout System — Experimental

The frame is already in `src/styles/tokens.css`: `--container`, `--gutter`, `--section-y`, `--ratio-card`, `--ratio-media` — every ready section uses them; new sections use them too, never a fixed max-width or padding. Each section's tone (ground, surface, inverse, chapter) and media placement are set per page below.

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

### Menu — Floating pill

A rounded bar that floats above the page and tucks away while you read.
- **Composition:** A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.
- **Behavior:** Hides on scroll down, returns on scroll up; the active link has a sliding highlight.
- **Responsive:** Mobile: capsule with logo + menu button; menu expands inside the capsule.

## Page Structure

Pages: Home · About · Projects · Contact

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Typographic statement
- **Purpose:** Establish mood and promise immediately
- **Composition:** A single sentence at display scale (8–14vw) set on the grid, with a small metadata row beneath. No image required.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Lines reveal once with a short stagger (80ms per line). Nothing else moves.
- **Responsive:** Mobile: re-break lines manually (don't rely on auto-wrapping) and scale to ~15vw.

### 02 Featured Work
- **Purpose:** Prove quality with 3–6 best projects
- **Composition:** Alternating large/small project cards, or a numbered index list with hover preview
- **Content:** Project title, discipline, year, 1 image each
- **Behavior:** Image reveal on entry; hover preview on index
- **Responsive:** Single column, images first
- **Design — An index:** Big titles on rules, a small picture beside each. Pass `variant="index"`.
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Ready code:** `src/components/sections/FeaturedWork.tsx` → `<FeaturedWorkSection title="Selected work" projects={[{ title, meta, image, alt, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Testimonials
- **Purpose:** Let real people vouch for the work
- **Composition:** One large quote leading, 2–3 smaller quotes in a row
- **Content:** 3–4 real quotes, each with a name and role
- **Behavior:** Fade-rise
- **Responsive:** Quotes stack; the lead quote stays large
- **Tone:** surface — pass `tone="surface"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — One big quote (recommended):** A single quote set huge across the page. Pass `variant="single"`.
- **Ready code:** `src/components/sections/Testimonials.tsx` → `<TestimonialsSection title="What people say" quotes={[{ quote, name, role }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Newsletter
- **Purpose:** Turn a visit into a returning reader
- **Composition:** One reason to subscribe beside an email field and a button, with a note under it
- **Content:** What they get, how often, and that it is easy to leave
- **Behavior:** Static; the form posts to your email provider
- **Responsive:** Field and button stack, full width
- **Ready code:** `src/components/sections/Newsletter.tsx` → `<NewsletterSection title text placeholder="you@example.com" button="Subscribe" note="Once a month." action="https://…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## About

Put a human face and point of view on the work; build trust.

### 01 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width
- **Media:** over — pass `media="over"`
- **Ready code:** `src/components/sections/EditorialStory.tsx` → `<EditorialStorySection title image alt caption paragraphs={[…]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Projects

Show one project in full: what it was, the facts (client, place, year, role), the pictures in order, and the way to the next project.

### 01 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row
- **Photos — Full-bleed moments (recommended):** Full-bleed or near-full-bleed frame at 3:2 (landscape) or 4:5 (portrait), one short caption in the utility face; never grouped with other images. Slow reveal (clip or fade) once, on entering the viewport; no carousel, no lightbox. Mobile: Keeps its own crop on mobile: set a focal point so the subject stays in frame at 4:5.
- **Ready code:** `src/components/sections/Gallery.tsx` → `<GallerySection photos={[{ src, alt, caption }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Contact

Give one clear, low-friction way to get in touch.

### 01 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Tone:** inverse — pass `tone="inverse"` (sets data-tone; tokens.css swaps the colours for it)
- **Design — Big invitation (recommended):** The headline huge, one button and the email. Pass `variant="statement"`.
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Site Chrome

### 01 Navigation — Floating pill
- **Purpose:** Orientation and the primary action
- **Composition:** A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Hides on scroll down, returns on scroll up; the active link has a sliding highlight.
- **Responsive:** Mobile: capsule with logo + menu button; menu expands inside the capsule.

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
| ProjectCard | Preview one project and lead to its case study | Media (fixed ratio), title, discipline/year in utility face | Hover: subtle image scale (1.03) or preview; whole card is one link |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| StatementBlock | State the point of view in one or two sentences | Display-size text, optional small label | Line reveal |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
