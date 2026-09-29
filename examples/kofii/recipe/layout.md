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

### Shape — Soft

Gently rounded corners — calm and friendly. Buttons 8px, cards 12px, media 12px, borders 1px, shadow none. Small, consistent radii; never mix sharp and rounded.

### Menu — Floating pill

A rounded bar that floats above the page and tucks away while you read.
- **Composition:** A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.
- **Behavior:** Hides on scroll down, returns on scroll up; the active link has a sliding highlight.
- **Responsive:** Mobile: capsule with logo + menu button; menu expands inside the capsule.
- **Start from:** [React Bits — Pill Nav](https://reactbits.dev/components/pill-nav), [Aceternity — Floating Navbar](https://ui.aceternity.com/components/floating-navbar), [Aceternity — Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar) — restyle to this recipe’s tokens and type; never ship a component’s demo look.

## Page Structure

Pages: Home · Menu · Reservations · About · Gallery · Contact · Order Online · Catering & Private Events · Locations · Gift Cards · Privacy Policy · FAQ · Sign In · Sign Up · Terms of Service · Cookie Policy · 404 · Accessibility

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — Whole-page scroll video
- **Purpose:** Establish mood and promise immediately
- **Composition:** A fixed 100svh video layer behind the entire page; the playhead is mapped to total page scroll (0 → 100%). Every section scrolls over it on transparent or semi-opaque surfaces, so the film is always visible.
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** GSAP ScrollTrigger (trigger: document, start "top top", end "bottom bottom", scrub: 0.5) drives video.currentTime. Sections use the surface color at 70–90% opacity for text legibility; key moments in the film line up with section boundaries.
- **Responsive:** Mobile: 9:16 encode; if seeking is janky on low-end devices, freeze on the poster and crossfade between 3–5 stills per section.

### 02 Intro
- **Purpose:** Say what this is and who it is for
- **Composition:** Short statement in display face across 8 columns, with a small label
- **Content:** 1–2 sentences, specific and concrete
- **Behavior:** Line reveal
- **Responsive:** Scale statement to ~8vw; keep line breaks intentional

---

## Menu

Let guests decide what they want before they arrive.

### 01 Menu
- **Purpose:** Let guests decide before arriving
- **Composition:** Two-column HTML menu with section headings
- **Content:** Dish names, short descriptions, prices
- **Behavior:** Static; tabs if multiple menus
- **Responsive:** Single column, prices aligned right

---

## Reservations

Convert interest into a booking with minimal friction.

### 01 Reservation
- **Purpose:** Convert interest into a booking
- **Composition:** Short invitation + booking widget/form
- **Content:** Opening hours, group policy, phone number
- **Behavior:** Sticky booking button on mobile
- **Responsive:** Full-width form, large touch targets

### 02 Location
- **Purpose:** Make visiting easy
- **Composition:** Address, hours, map link, one exterior image
- **Content:** Address, hours, transit notes
- **Behavior:** Static
- **Responsive:** Stack; tap-to-call and tap-to-map

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

## Gallery

Let atmosphere and craft speak for themselves.

### 01 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row

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

## Order Online

Get an order placed for pickup or delivery with minimal friction.

_No composed sections — see purpose above._

---

## Catering & Private Events

Explain catering and private event options and how to inquire.

_No composed sections — see purpose above._

---

## Locations

Help visitors find and choose the right location.

_No composed sections — see purpose above._

---

## Gift Cards

Let someone buy a gift card in under a minute.

_No composed sections — see purpose above._

---

## Privacy Policy

State plainly what data is collected and how it is used.

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

## Accessibility

State the accessibility standard aimed for and how to report issues.

_No composed sections — see purpose above._

---

## Site Chrome

### 01 Navigation — Floating pill
- **Purpose:** Orientation and the primary action
- **Composition:** A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.
- **Content:** Logo, 3–5 links, one action
- **Behavior:** Hides on scroll down, returns on scroll up; the active link has a sliding highlight.
- **Responsive:** Mobile: capsule with logo + menu button; menu expands inside the capsule.

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
| MenuList | Readable menu in HTML (never PDF) | Section headings, dish name, short description, price aligned right | Static; tabs for lunch/dinner if needed |
| Gallery | Show a set of images as a curated sequence | Mixed-size grid or horizontal strip; captions optional | Keyboard navigable; opens a lightbox only if needed |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| ReservationForm | Book a table in under 30 seconds | Date, time, guests, or embed of the booking provider | Sticky "Book" button on mobile |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
