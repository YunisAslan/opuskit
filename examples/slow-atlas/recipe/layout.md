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

### Shape — Sharp

Square corners, crisp lines — precise and editorial. Buttons 0px, cards 0px, media 0px, borders 1px, shadow none. No rounded corners anywhere; structure comes from lines and space.

### Menu — Classic bar

Logo on the left, links on the right, always at the top.
- **Composition:** Full-width bar: logo left, 4–6 links and the primary action right, on the page ground with a hairline bottom border.
- **Behavior:** Sticky; gains a surface background after 40px of scroll.
- **Responsive:** Mobile: logo + menu button; opens a simple full-width sheet.

## Page Structure

Pages: Home · Articles · About · Newsletter · Article

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Typographic statement
- **Purpose:** Establish mood and promise immediately
- **Composition:** A single sentence at display scale (8–14vw) set on the grid, with a small metadata row beneath. No image required.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Lines reveal once with a short stagger (80ms per line). Nothing else moves.
- **Responsive:** Mobile: re-break lines manually (don't rely on auto-wrapping) and scale to ~15vw.

### 02 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width
- **Ready code:** `src/components/sections/EditorialStory.tsx` → `<EditorialStorySection title image alt caption paragraphs={[…]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view
- **Ready code:** `src/components/sections/Journal.tsx` → `<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 04 Categories
- **Purpose:** Show the range and let people go straight to their part of it
- **Composition:** 3–4 column grid of image tiles, name and count under each
- **Content:** 3–8 categories, each with a real picture and an honest count
- **Behavior:** Image zooms slightly on hover
- **Responsive:** 2-column grid
- **Ready code:** `src/components/sections/Categories.tsx` → `<CategoriesSection title="Shop by category" items={[{ name, href, image, alt, count }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 05 Newsletter
- **Purpose:** Turn a visit into a returning reader
- **Composition:** One reason to subscribe beside an email field and a button, with a note under it
- **Content:** What they get, how often, and that it is easy to leave
- **Behavior:** Static; the form posts to your email provider
- **Responsive:** Field and button stack, full width
- **Ready code:** `src/components/sections/Newsletter.tsx` → `<NewsletterSection title text placeholder="you@example.com" button="Subscribe" note="Once a month." action="https://…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Articles

Show ongoing thinking, in your own voice, over time.

### 01 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view
- **Ready code:** `src/components/sections/Journal.tsx` → `<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

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

---

## Newsletter

Give a clear reason to subscribe and show what they’ll get.

### 01 Newsletter
- **Purpose:** Turn a visit into a returning reader
- **Composition:** One reason to subscribe beside an email field and a button, with a note under it
- **Content:** What they get, how often, and that it is easy to leave
- **Behavior:** Static; the form posts to your email provider
- **Responsive:** Field and button stack, full width
- **Ready code:** `src/components/sections/Newsletter.tsx` → `<NewsletterSection title text placeholder="you@example.com" button="Subscribe" note="Once a month." action="https://…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view
- **Ready code:** `src/components/sections/Journal.tsx` → `<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Article



### 01 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width
- **Ready code:** `src/components/sections/EditorialStory.tsx` → `<EditorialStorySection title image alt caption paragraphs={[…]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view
- **Ready code:** `src/components/sections/Journal.tsx` → `<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Newsletter
- **Purpose:** Turn a visit into a returning reader
- **Composition:** One reason to subscribe beside an email field and a button, with a note under it
- **Content:** What they get, how often, and that it is easy to leave
- **Behavior:** Static; the form posts to your email provider
- **Responsive:** Field and button stack, full width
- **Ready code:** `src/components/sections/Newsletter.tsx` → `<NewsletterSection title text placeholder="you@example.com" button="Subscribe" note="Once a month." action="https://…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Site Chrome

### 01 Navigation — Classic bar
- **Purpose:** Orientation and the primary action
- **Composition:** Full-width bar: logo left, 4–6 links and the primary action right, on the page ground with a hairline bottom border.
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Sticky; gains a surface background after 40px of scroll.
- **Responsive:** Mobile: logo + menu button; opens a simple full-width sheet.

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
| Hero | Set the mood and the promise in one view | A single sentence at display scale (8–14vw) set on the grid, with a small metadata row beneath. No image required. | Lines reveal once with a short stagger (80ms per line). Nothing else moves. |
| StatementBlock | State the point of view in one or two sentences | Display-size text, optional small label | Line reveal |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
| CTA | Close the page with one clear action | Short headline, one button/link, real contact detail | Static; button state feedback only |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
