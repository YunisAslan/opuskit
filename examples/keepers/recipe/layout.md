## Layout System — Full-bleed

| | |
|---|---|
| Container | Media edge-to-edge (100vw); text in a 1200px inner container |
| Grid | 12 columns for overlaid text |
| Columns | Overlay text in 5–6 columns at bottom-left; interstitial text centred in 8 |
| Gutters | 24px |
| Section spacing | Media sections are 100svh; text sections 120–160px padding |
| Alignment | Text anchored to bottom-left of media with safe-area padding |
| Hero composition | A fixed 100svh video layer behind the entire page; the playhead is mapped to total page scroll (0 → 100%). Every section scrolls over it on transparent or semi-opaque surfaces, so the film is always visible. |
| Card proportions | Rare — use full-width project slides instead of cards |
| Media proportions | 16:9 / 21:9 desktop, 9:16 or 4:5 crop on mobile |

**Spacing scale (base 8px):** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 160px, 240px. Use only values from the scale. Space between sections is always larger than space within them.

## Page Structure

Pages: Home · Features · Contact · Testimonials · Privacy Policy · Terms of Service · Cookie Policy · About · Pricing · Comparison · FAQ · Sign In · Sign Up · 404 · Accessibility

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Whole-page scroll video
- **Purpose:** Establish mood and promise immediately
- **Composition:** A fixed 100svh video layer behind the entire page; the playhead is mapped to total page scroll (0 → 100%). Every section scrolls over it on transparent or semi-opaque surfaces, so the film is always visible.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** GSAP ScrollTrigger (trigger: document, start "top top", end "bottom bottom", scrub: 0.5) drives video.currentTime. Sections use the surface color at 70–90% opacity for text legibility; key moments in the film line up with section boundaries.
- **Responsive:** Mobile: 9:16 encode; if seeking is janky on low-end devices, freeze on the poster and crossfade between 3–5 stills per section.

### 02 Product Highlight
- **Purpose:** Show one product (or feature) in depth
- **Composition:** Large product media with 3–4 annotated details
- **Content:** Materials, dimensions, key benefit
- **Behavior:** Pinned product with advancing details (immersive) or static
- **Responsive:** Media then detail list

---

## Features

Explain what the product does with concrete, specific evidence, not adjectives.

### 01 Features
- **Purpose:** Explain capabilities with evidence
- **Composition:** 2×2 or 3-column feature blocks, each with a real visual
- **Content:** 3–6 features, concrete language
- **Behavior:** Fade-rise stagger
- **Responsive:** Single column

---

## Contact

Give one clear, low-friction way to get in touch.

### 01 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target

---

## Testimonials

Let real clients or customers make the case, in their own words.

_No composed sections — see purpose above._

---

## Privacy Policy

State plainly what data is collected and how it is used.

_No composed sections — see purpose above._

---

## Terms of Service

State the terms of using the site or product.

_No composed sections — see purpose above._

---

## Cookie Policy

Explain what cookies are used and why.

_No composed sections — see purpose above._

---

## About

Put a human face and point of view on the work; build trust.

### 01 About
- **Purpose:** Put a human face and point of view on the work
- **Composition:** Portrait image + statement + short bio
- **Content:** Real names, real history, no mission-statement clichés
- **Behavior:** Fade-rise
- **Responsive:** Portrait above text

---

## Pricing

Remove the final uncertainty before signing up.

### 01 Pricing
- **Purpose:** Remove the final uncertainty
- **Composition:** 2–3 plans side by side, one recommended
- **Content:** Plan name, price, what's included
- **Behavior:** Static
- **Responsive:** Stacked plans, recommended first

---

## Comparison

Make an honest, specific case for why this over the obvious alternative.

_No composed sections — see purpose above._

---

## FAQ

Answer the questions that would otherwise stall a decision.

### 01 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width

---

## Sign In

Standard sign-in: email/password, forgot-password link, link to sign up.

_No composed sections — see purpose above._

---

## Sign Up

Standard sign-up: minimal required fields, clear value of creating an account.

_No composed sections — see purpose above._

---

## 404

Acknowledge the wrong turn and offer a clear way back.

_No composed sections — see purpose above._

---

## Accessibility

State the accessibility standard aimed for and how to report issues.

_No composed sections — see purpose above._

---

## Site Chrome

### 01 Navbar
- **Purpose:** Orientation and the primary action
- **Composition:** Single row, logo left, links right; transparent over hero, solid afterward
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Hide on scroll down, show on scroll up
- **Responsive:** Mobile: logo + menu button; full-screen menu with large links

### 02 Footer
- **Purpose:** Practical information and a calm ending
- **Composition:** 3–4 columns: contact, links, social, legal
- **Content:** Address/email, links, copyright
- **Behavior:** Static
- **Responsive:** Stacked columns

## Component System

| Component | Purpose | Anatomy | Behavior |
|---|---|---|---|
| Navigation | Orient and offer the primary action | Logo left, 3–5 links, one primary action right; mobile: full-screen menu | Hides on scroll down, reappears on scroll up; solid background after hero |
| Hero | Set the mood and the promise in one view | A fixed 100svh video layer behind the entire page; the playhead is mapped to total page scroll (0 → 100%). Every section scrolls over it on transparent or semi-opaque surfaces, so the film is always visible. | GSAP ScrollTrigger (trigger: document, start "top top", end "bottom bottom", scrub: 0.5) drives video.currentTime. Sections use the surface color at 70–90% opacity for text legibility; key moments in the film line up with section boundaries. |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| FeatureBlock | Explain one capability with evidence | Number/label, heading, 1–2 sentences, supporting visual | Static or fade-rise |
| StatementBlock | State the point of view in one or two sentences | Display-size text, optional small label | Line reveal |
| Accordion | Keep FAQs and details scannable | Native <details>/<summary> styled | Height animation via CSS interpolate-size where supported |
| CTA | Close the page with one clear action | Short headline, one button/link, real contact detail | Static; button state feedback only |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
