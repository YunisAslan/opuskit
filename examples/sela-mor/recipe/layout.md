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

### Shape — Hairline

Thin outlines and no fills — light and airy. Buttons 4px, cards 6px, media 4px, borders 1px, shadow none. Buttons and cards are outlined, not filled (except the one primary action); 1px borders in the border token.

### Menu — Split pill

Logo left, a small white pill of links in the middle, the main action on its own on the right.
- **Composition:** Three separate pieces at the top edge: signature logo left, a compact white pill of 3–4 uppercase links centred, and one boxed action with a status dot (● Contact) right. No bar behind them.
- **Behavior:** Fixed; the pill stays white over every section. Links do what the site’s Links behaviour does (a plain underline if none); the current page keeps its mark.
- **Responsive:** Mobile: logo + menu button; the pill opens as a full-width sheet with the same links.

## Page Structure

Pages: Home · Works · Listen · Live · About · Contact

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Kinetic type hero
- **Purpose:** Establish mood and promise immediately
- **Composition:** Oversized words that move with scroll: horizontal drift, weight or width shifts on a variable font, line-by-line masking.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Scroll-linked transforms (translateX, font-variation-settings) via Motion useScroll + useTransform (or CSS animation-timeline: view()); one idea per screen.
- **Responsive:** Mobile: reduce to vertical line reveals; avoid horizontal scroll overflow.

### 02 Featured Work
- **Purpose:** Prove quality with 3–6 best projects
- **Composition:** Alternating large/small project cards, or a numbered index list with hover preview
- **Content:** Project title, discipline, year, 1 image each
- **Behavior:** Image reveal on entry; hover preview on index
- **Responsive:** Single column, images first
- **Photos — Photo story (recommended):** Photo / text pairs that alternate sides on a 12-column grid; vary widths (7/5, then 5/7, then one full-bleed) so the rhythm never repeats twice in a row. Each pair reveals together; the photo may drift slightly slower than the text (≤ 8% parallax). Mobile: Stacks to photo-then-text; every photo full width; keep the original order.
- **Ready code:** `src/components/sections/FeaturedWork.tsx` → `<FeaturedWorkSection title="Selected work" projects={[{ title, meta, image, alt, href }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Hero — Scroll-controlled video · mid-page
- **Purpose:** Establish mood and promise immediately
- **Composition:** Placed mid-page, right after Featured Work — not the first screen. Build it as a full-width band at exactly this point of the page: the page opens with Hero, whose heading is the page's h1 (this band's headline is an h2), and the menu sits solid over that first section, never overlaid on this band. A pinned or scroll-driven version pins only while this band is in view and releases before the next section; its video loads and plays only as the band nears the viewport (preload="none" + IntersectionObserver), never at page load. A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points. This part shows Scroll-controlled video, not what the site's first screen shows — it needs its own video, separate from the first screen's media.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** A sticky 100svh stage inside a ~300vh block; Motion useScroll on the block gives progress, smoothed with useSpring (stiffness ~120, damping ~30), and useMotionValueEvent sets video.currentTime. Encode with scripts/prepare-video.sh (CRF 20, keyframe every 6 frames) so seeking is instant and frames stay sharp.
- **Responsive:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.

### 04 About
- **Purpose:** Put a human face and point of view on the work
- **Composition:** Portrait image + statement + short bio
- **Content:** Real names, real history, no mission-statement clichés
- **Behavior:** Fade-rise
- **Responsive:** Portrait above text
- **Ready code:** `src/components/sections/About.tsx` → `<AboutSection title="About" image alt statement bio />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 05 Schedule
- **Purpose:** Show what happens when
- **Composition:** Days as columns (or stacked groups), each a list of time, title and a line of detail
- **Content:** Every day of the programme, real times, short titles
- **Behavior:** Static — no tabs, everything readable at once
- **Responsive:** Days stack, times stay left
- **Ready code:** `src/components/sections/Schedule.tsx` → `<ScheduleSection title="Programme" days={[{ label: "Friday", items: [{ time, title, detail }] }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 06 Clients
- **Purpose:** Show breadth of trust
- **Composition:** Logo/name grid or slow marquee
- **Content:** Real client names only
- **Behavior:** Static or slow marquee
- **Responsive:** 2-column grid
- **Ready code:** `src/components/sections/Clients.tsx` → `<ClientsSection title="Clients" names={["…"]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 07 Newsletter
- **Purpose:** Turn a visit into a returning reader
- **Composition:** One reason to subscribe beside an email field and a button, with a note under it
- **Content:** What they get, how often, and that it is easy to leave
- **Behavior:** Static; the form posts to your email provider
- **Responsive:** Field and button stack, full width
- **Ready code:** `src/components/sections/Newsletter.tsx` → `<NewsletterSection title text placeholder="you@example.com" button="Subscribe" note="Once a month." action="https://…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Works

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

---

## Listen

Let people hear the work: six tracks from her records and installations, each with a player, its length, where it was recorded and what it was made for; one plays at a time.

### 01 Intro
- **Purpose:** Say what this is and who it is for
- **Composition:** Short statement in display face across 8 columns, with a small label
- **Content:** 1–2 sentences, specific and concrete
- **Behavior:** Line reveal
- **Responsive:** Scale statement to ~8vw; keep line breaks intentional
- **Ready code:** `src/components/sections/Intro.tsx` → `<IntroSection label="Studio" statement="…" body="…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

---

## Live

Where to hear her next: upcoming performances and installations with dates, places and tickets, then the last season’s shows.

### 01 Schedule
- **Purpose:** Show what happens when
- **Composition:** Days as columns (or stacked groups), each a list of time, title and a line of detail
- **Content:** Every day of the programme, real times, short titles
- **Behavior:** Static — no tabs, everything readable at once
- **Responsive:** Days stack, times stay left
- **Ready code:** `src/components/sections/Schedule.tsx` → `<ScheduleSection title="Programme" days={[{ label: "Friday", items: [{ time, title, detail }] }]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 02 Newsletter
- **Purpose:** Turn a visit into a returning reader
- **Composition:** One reason to subscribe beside an email field and a button, with a note under it
- **Content:** What they get, how often, and that it is easy to leave
- **Behavior:** Static; the form posts to your email provider
- **Responsive:** Field and button stack, full width
- **Ready code:** `src/components/sections/Newsletter.tsx` → `<NewsletterSection title text placeholder="you@example.com" button="Subscribe" note="Once a month." action="https://…" />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

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

### 02 Press
- **Purpose:** Borrow the credibility of what others wrote
- **Composition:** Grid of short outlet quotes, outlet name set as type; awards in a line beneath
- **Content:** 2–4 real quotes with their outlet, optional awards with year
- **Behavior:** Static
- **Responsive:** Quotes stack
- **Ready code:** `src/components/sections/Press.tsx` → `<PressSection title="Press" quotes={[{ outlet, quote }]} awards={["…"]} />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

### 03 Closing CTA
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

---

## Site Chrome

### 01 Navigation — Split pill
- **Purpose:** Orientation and the primary action
- **Composition:** Three separate pieces at the top edge: signature logo left, a compact white pill of 3–4 uppercase links centred, and one boxed action with a status dot (● Contact) right. No bar behind them.
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Fixed; the pill stays white over every section. Links do what the site’s Links behaviour does (a plain underline if none); the current page keeps its mark.
- **Responsive:** Mobile: logo + menu button; the pill opens as a full-width sheet with the same links.

### 02 Footer — Signature columns
- **Purpose:** Practical information and a calm ending
- **Composition:** Dark band (text colour as ground): the logo large on the left (5 of 12 columns), 2–3 link columns with headings, then a hairline and one row: copyright left, legal links right.
- **Content:** Address/email, links, copyright
- **Behavior:** Static; links do what the site’s Links behaviour does (a plain underline if none), the current page marked the same way.
- **Responsive:** Mobile: logo, then the columns stacked, then the legal row wrapped.
- **Ready code:** `src/components/sections/Footer.tsx` → `<FooterSection logo={<Logo />} columns={[{ title, links: [{ label, href, current }] }]} legal={[…]} copyright />` — start from it: real copy and media through props, `link={Link}` (next/link) for in-site links, proportions tuned to this recipe, tokens only.

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| Navigation | Orient and offer the primary action | Logo left, 3–5 links, one primary action right; mobile: full-screen menu | Hides on scroll down, reappears on scroll up; solid background after hero |
| Hero | Set the mood and the promise in one view | Oversized words that move with scroll: horizontal drift, weight or width shifts on a variable font, line-by-line masking. | Scroll-linked transforms (translateX, font-variation-settings) via Motion useScroll + useTransform (or CSS animation-timeline: view()); one idea per screen. |
| StatementBlock | State the point of view in one or two sentences | Display-size text, optional small label | Line reveal |
| ProjectCard | Preview one project and lead to its case study | Media (fixed ratio), title, discipline/year in utility face | Hover: subtle image scale (1.03) or preview; whole card is one link |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| CTA | Close the page with one clear action | Short headline, one button/link, real contact detail | Static; button state feedback only |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
