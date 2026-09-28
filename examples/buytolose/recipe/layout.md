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

## Page Structure

Pages: Home · Shop · Product · Cart · Checkout · Account · About · Contact · Shipping & Returns · Size Guide · Gift Cards · Testimonials · FAQ · Sign In · Sign Up · Privacy Policy · Terms of Service · Cookie Policy · 404

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Scroll-controlled video
- **Purpose:** Establish mood and promise immediately
- **Composition:** A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** GSAP ScrollTrigger pins the section and scrubs video.currentTime (scrub: 0.5). Encode with a keyframe every frame (or short GOP) so seeking is smooth.
- **Responsive:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.

### 02 Collection
- **Purpose:** Introduce the season or range
- **Composition:** Full-height image with collection title, then 2–3 key pieces
- **Content:** Collection name, one paragraph, season
- **Behavior:** Image reveal
- **Responsive:** Portrait crop, title over lower third

---

## Shop

Let visitors browse and choose confidently.

### 01 Product Grid
- **Purpose:** Browse and choose
- **Composition:** 3–4 column grid of product cards; filters minimal
- **Content:** Name, price, image, availability
- **Behavior:** Hover alternate image
- **Responsive:** 2 columns on mobile

### 02 Product Highlight
- **Purpose:** Show one product (or feature) in depth
- **Composition:** Large product media with 3–4 annotated details
- **Content:** Materials, dimensions, key benefit
- **Behavior:** Pinned product with advancing details (immersive) or static
- **Responsive:** Media then detail list

---

## Product

Show one product in full: gallery, price, variants, add-to-cart, and related items.

_No composed sections — see purpose above._

---

## Cart

Let visitors review and adjust their selection before checkout.

_No composed sections — see purpose above._

---

## Checkout

Collect payment and shipping with as little friction as possible.

_No composed sections — see purpose above._

---

## Account

Let a returning customer see past orders and manage their details.

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

## Contact

Give one clear, low-friction way to get in touch.

### 01 Closing CTA
- **Purpose:** End with one clear next step
- **Composition:** Large headline + one action + real contact detail
- **Content:** Headline in brand voice, email address
- **Behavior:** Static
- **Responsive:** Large tap target

---

## Shipping & Returns

Answer shipping cost, timing and returns questions before checkout does.

_No composed sections — see purpose above._

---

## Size Guide

Remove size uncertainty with clear measurements and a fit chart.

_No composed sections — see purpose above._

---

## Gift Cards

Let someone buy a gift card in under a minute.

_No composed sections — see purpose above._

---

## Testimonials

Let real clients or customers make the case, in their own words.

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

## 404

Acknowledge the wrong turn and offer a clear way back.

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
| Hero | Set the mood and the promise in one view | A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points. | GSAP ScrollTrigger pins the section and scrubs video.currentTime (scrub: 0.5). Encode with a keyframe every frame (or short GOP) so seeking is smooth. |
| ProductCard | Show a product with price and a way to buy | Image (4:5), name, price, optional swatches | Hover: alternate image; quick add on desktop only |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| FeatureBlock | Explain one capability with evidence | Number/label, heading, 1–2 sentences, supporting visual | Static or fade-rise |
| Accordion | Keep FAQs and details scannable | Native <details>/<summary> styled | Height animation via CSS interpolate-size where supported |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
