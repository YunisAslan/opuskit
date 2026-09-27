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

## Page Structure

Pages: Home · Experiment · About · Contact · FAQ · Privacy Policy · 404 · Sign In · Sign Up · Terms of Service · Cookie Policy · Accessibility

---

## Home

Establish mood and promise in seconds; orient the visitor to what this site is and give them a clear next step.

### 01 Hero — 3D / WebGL scene
- **Purpose:** Establish mood and promise immediately
- **Composition:** A real-time 3D object or scene as the hero, lit with restraint; headline overlaid in HTML (never inside the canvas).
- **Content:** One headline (≤ 8 words), one supporting line, one action
- **Behavior:** Object reacts gently to pointer (≤ 8° rotation) and scroll (camera dolly). Render only while in view; cap DPR at 2.
- **Responsive:** Mobile: lower poly/texture budget, disable pointer effects, or show a pre-rendered video/image.

### 02 Manifesto
- **Purpose:** State the point of view boldly
- **Composition:** Display-size statement spanning the grid
- **Content:** 1–3 sentences that could only be yours
- **Behavior:** Line reveal / scroll-driven type
- **Responsive:** Re-break lines for mobile

---

## Experiment

Let the piece be experienced, with just enough framing to make sense of it.

### 01 Gallery
- **Purpose:** Let atmosphere speak
- **Composition:** Mixed-size image grid or horizontal strip
- **Content:** 6–10 images with sparse captions
- **Behavior:** Parallax drift or clip reveals per motion level
- **Responsive:** Two-column or single swipeable row

### 02 Editorial Story
- **Purpose:** Tell the story behind the brand in a readable, magazine-like format
- **Composition:** Headline + narrow text column + large image; captions in margin rail
- **Content:** 150–300 words, one pull quote
- **Behavior:** Image clip reveal, text fade-rise
- **Responsive:** Single column, pull quote full width

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

## FAQ

Answer the questions that would otherwise stall a decision.

### 01 FAQ
- **Purpose:** Answer real objections
- **Composition:** Accordion list in a narrow column
- **Content:** 5–8 genuine questions
- **Behavior:** Accordion expand
- **Responsive:** Full width

---

## Privacy Policy

State plainly what data is collected and how it is used.

_No composed sections — see purpose above._

---

## 404

Acknowledge the wrong turn and offer a clear way back.

_No composed sections — see purpose above._

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
| Hero | Set the mood and the promise in one view | A real-time 3D object or scene as the hero, lit with restraint; headline overlaid in HTML (never inside the canvas). | Object reacts gently to pointer (≤ 8° rotation) and scroll (camera dolly). Render only while in view; cap DPR at 2. |
| StatementBlock | State the point of view in one or two sentences | Display-size text, optional small label | Line reveal |
| Gallery | Show a set of images as a curated sequence | Mixed-size grid or horizontal strip; captions optional | Keyboard navigable; opens a lightbox only if needed |
| MediaSection | Present a large image or video with a caption | Media frame (fixed aspect), caption in utility face, optional short text | Reveal per motion system; lazy-loaded |
| Marquee | Show breadth (clients, capabilities) in a compact strip | Repeating row of names/logos | Slow CSS loop; pauses on hover; static under reduced motion |
| Footer | Practical information and a calm ending | Contact, social, legal, small logo | Static |
| MediaAsset | Render any image/video from the asset config layer | <MediaAsset id="heroVideo" /> resolves src, poster, alt, crops from assets config | Handles loading, poster, reduced motion and temporary-asset badge in dev |
| SectionHeader | Name a section consistently | Index number, label, heading | Static |
