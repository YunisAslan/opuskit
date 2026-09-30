## Layout System — Full-bleed

| | |
|---|---|
| Container | Media edge-to-edge (100vw); text in a 1200px inner container |
| Grid | 12 columns for overlaid text |
| Columns | Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8 |
| Gutters | 24px |
| Section spacing | Media sections are 100svh; text sections 120–160px padding |
| Alignment | Text anchored to bottom-left of media with safe-area padding |
| Hero composition | A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points. |
| Card proportions | Rare — use full-width project slides instead of cards |
| Media proportions | 16:9 / 21:9 desktop, 9:16 or 4:5 crop on mobile |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Use only values from the scale. Space between sections is always larger than space within them.

### Shape — Bold outline

Thick black borders and hard offset shadows — loud and graphic. Buttons 0px, cards 0px, media 0px, borders 2px, shadow 4px 4px 0 var(--color-text). 2px ink borders on every module; hard offset shadow that collapses on press; no blur shadows.

### Menu — Floating dock

An app-style dock at the bottom of the screen with icons that grow as you pass.
- **Composition:** A floating dock centred 20px from the bottom: 4–6 labelled icons for the main pages plus the action; the logo sits alone at the top-left.
- **Behavior:** Icons magnify under the pointer (macOS-style); a tooltip shows the page name.
- **Responsive:** Mobile: a fixed bottom tab bar with the same icons — thumb-friendly.
- **Start from:** [Magic UI — Dock](https://magicui.design/docs/components/dock) — restyle to this recipe’s tokens and type; never ship a component’s demo look.

## Page Structure

Pages: Home · About · Sign In · Sign Up · Services · Work

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Scroll-controlled video
- **Purpose:** Establish mood and promise immediately
- **Composition:** A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** GSAP ScrollTrigger pins the section and scrubs video.currentTime (scrub: 0.5). Encode with scripts/prepare-video.sh (CRF 20, keyframe every 6 frames) so seeking is instant and frames stay sharp.
- **Responsive:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.

### 02 Journal
- **Purpose:** Show ongoing thinking and activity
- **Composition:** 3 latest entries as editorial list or cards
- **Content:** Title, date, category
- **Behavior:** Hover underline
- **Responsive:** List view
- **Ready code:** `src/components/sections/Journal.tsx` → `<JournalSection title="Journal" entries={[{ title, date, category, href, image, alt }]} />` — start from it: real copy and media through props, proportions tuned to this recipe, tokens only.

---

## About

Put a human face and point of view on the work; build trust.

### 01 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width
- **Ready code:** `src/components/sections/EditorialStory.tsx` → `<EditorialStorySection title image alt caption paragraphs={[…]} />` — start from it: real copy and media through props, proportions tuned to this recipe, tokens only.

---

## Sign In

Standard sign-in: email/password, forgot-password link, link to sign up.

_No composed sections — see purpose above._

---

## Sign Up

Standard sign-up: minimal required fields, clear value of creating an account.

_No composed sections — see purpose above._

---

## Services

Make the offer and the way of working clear enough to remove hesitation.

### 01 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target
- **Ready code:** `src/components/sections/ContactCta.tsx` → `<ContactCtaSection headline quiet="second line in the serif" action={{ label, href }} email inverse />` — start from it: real copy and media through props, proportions tuned to this recipe, tokens only.

---

## Work

Prove quality and range through the strongest projects; make it easy to go deeper on any one.

### 01 Featured Work
- **Purpose:** Prove quality with 3–6 best projects
- **Composition:** Alternating large/small project cards, or a numbered index list with hover preview
- **Content:** Project title, discipline, year, 1 image each
- **Behavior:** Image reveal on entry; hover preview on index
- **Responsive:** Single column, images first
- **Ready code:** `src/components/sections/FeaturedWork.tsx` → `<FeaturedWorkSection title="Selected work" projects={[{ title, meta, image, alt, href }]} />` — start from it: real copy and media through props, proportions tuned to this recipe, tokens only.

### 02 Case Study Preview
- **Purpose:** Show depth on one project
- **Composition:** Wide media + 3-column facts (client, role, outcome)
- **Content:** Problem, approach, result — 3 short paragraphs
- **Behavior:** Pinned media with advancing text (immersive) or static
- **Responsive:** Stack facts under media
- **Ready code:** `src/components/sections/CaseStudy.tsx` → `<CaseStudySection title image alt facts={[{ label, value }]} paragraphs={["Problem…", "Approach…", "Result…"]} />` — start from it: real copy and media through props, proportions tuned to this recipe, tokens only.

---

## Site Chrome

### 01 Navigation — Floating dock
- **Purpose:** Orientation and the primary action
- **Composition:** A floating dock centred 20px from the bottom: 4–6 labelled icons for the main pages plus the action; the logo sits alone at the top-left.
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Icons magnify under the pointer (macOS-style); a tooltip shows the page name.
- **Responsive:** Mobile: a fixed bottom tab bar with the same icons — thumb-friendly.

### 02 Footer
- **Purpose:** Practical information and a calm ending
- **Composition:** 3–4 columns: contact, links, social, legal
- **Content:** Address/email, links, copyright
- **Behavior:** Static
- **Responsive:** Stacked columns
- **Ready code:** `src/components/sections/Footer.tsx` → `<FooterSection logo={<Logo />} columns={[{ title, links: [{ label, href, current }] }]} legal={[…]} copyright />` — start from it: real copy and media through props, proportions tuned to this recipe, tokens only.

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| Navigation | Orient and offer the primary action | Logo left, 3–5 links, one primary action right; mobile: full-screen menu | Hides on scroll down, reappears on scroll up; solid background after hero |
| Hero | Set the mood and the promise in one view | A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points. | GSAP ScrollTrigger pins the section and scrubs video.currentTime (scrub: 0.5). Encode with scripts/prepare-video.sh (CRF 20, keyframe every 6 frames) so seeking is instant and frames stay sharp. |
| ProjectCard | Preview one project and lead to its case study | Media (fixed ratio), title, discipline/year in utility face | Hover: subtle image scale (1.03) or preview; whole card is one link |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| StatementBlock | State the point of view in one or two sentences | Display-size text, optional small label | Line reveal |
| CTA | Close the page with one clear action | Short headline, one button/link, real contact detail | Static; button state feedback only |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
