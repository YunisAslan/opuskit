# OPUSKIT — MASTER PRODUCT & BUILD PROMPT

## 0. YOUR ROLE

You are the lead product engineer, UX designer, UI designer, frontend architect, and design-systems engineer responsible for building **OpusKit**.

Do not treat this as a generic SaaS dashboard project.

Do not build a generic AI website-builder interface.

Do not build a simple prompt library.

Build a polished, production-minded MVP for a product whose core value is:

> **Turning a user's website goals and visual taste into a buildable design recipe, then translating that recipe into the right AI-development tool.**

The final product must feel like a premium creative product, not an AI-generated template marketplace.

Before implementing anything, inspect the repository and determine what already exists. Preserve useful existing infrastructure where appropriate. Do not blindly rewrite working code.

When a technical or product detail is unclear, prefer the simplest implementation that preserves the product model and future extensibility.

---

# 1. PRODUCT

## Product name

**OpusKit**

## Core positioning

> **Tell us what you want your website to feel like. We'll turn it into a buildable design recipe.**

Secondary positioning:

> **From inspiration to implementation.**

Alternative supporting message:

> **Build websites worth remembering.**

OpusKit helps people create distinctive, modern websites without requiring them to already know how to make every design decision themselves.

The product takes the fragmented knowledge commonly distributed through Instagram, YouTube, design creators, tutorials, inspiration galleries, prompts, resource lists, animation examples, and implementation advice and turns it into one structured experience.

The user should be able to:

1. Describe or visually choose what they want.
2. Explore visual directions.
3. Make a small number of meaningful design decisions.
4. Understand what assets they need.
5. Get missing assets or instructions for creating them.
6. Receive a complete **Universal Recipe**.
7. Choose the AI tool they want to use.
8. Receive a tool-specific **Build Package**.
9. Use that package to build the website.

---

# 2. WHAT OPUSKIT IS NOT

OpusKit is NOT:

* a generic AI website builder
* a clone of Framer
* a clone of Lovable
* a clone of Bolt
* a clone of v0
* a generic prompt marketplace
* a template marketplace
* a giant inspiration gallery
* a random collection of links
* a generic SaaS dashboard full of cards

OpusKit may later generate repositories directly, but that is NOT the primary MVP.

The core MVP relationship is:

```text
USER
  ↓
VISUAL + FUNCTIONAL CHOICES
  ↓
DESIGN DECISION ENGINE
  ↓
UNIVERSAL RECIPE
  ↓
AI TOOL ADAPTER
  ↓
BUILD PACKAGE
  ↓
USER'S WEBSITE
```

---

# 3. CORE PRODUCT PRINCIPLES

## Principle 1 — Selection over generation

The user should not need to type a long prompt.

The experience should help the user make design decisions through fast, visual, interactive choices.

Use:

* visual cards
* image previews
* mini website previews
* palette previews
* typography previews
* animation previews
* short questions
* chips
* toggles
* direct manipulation where useful

Prefer:

> “Choose the feeling.”

over:

> “Describe your preferred aesthetic in detail.”

---

## Principle 2 — Ask only decisions that matter

The questionnaire must be adaptive.

There must NOT be a fixed 15–20 question form for everybody.

Rule:

> **Only ask questions that materially change the final Recipe or Build Package.**

Target approximately **6–10 meaningful decisions**, depending on the user's previous answers.

Some users may finish in 6 steps.

Others may need 8–10.

Never ask irrelevant questions.

Example:

If the user chooses a video-led experience, ask about video.

If the user chooses image-led, do not ask:

> “How should your video behave?”

---

## Principle 3 — User can take control

The user should never feel that OpusKit is forcing its taste onto them.

For important decisions provide:

* Recommended
* Explore alternatives
* Choose myself
* Remix

Example:

### Choose your color atmosphere

```text
[ Warm Ivory ]
[ Dark Cinematic ]
[ Earthy ]
[ Monochrome ]
[ Deep Color ]
```

Then allow:

> **Customize palette**

The user can manually choose/change colors.

The same principle should be usable for typography, imagery, motion intensity, and other high-impact decisions where appropriate.

---

## Principle 4 — Premium = selection + presentation + quality

Premium should NOT come from:

* excessive gradients
* glowing effects
* decorative blobs
* excessive rounded cards
* huge generic headings
* purple/blue AI aesthetics
* excessive glassmorphism
* unnecessary shadows

Premium comes from:

* excellent curation
* strong art direction
* typography
* spacing
* visual hierarchy
* meaningful motion
* high-quality previews
* excellent copy
* high-quality resources
* coherent systems
* details that feel intentional

---

## Principle 5 — Animation for demonstration, not decoration

This is a core OpusKit rule.

> **Animation for demonstration, not decoration.**

Use animation when it helps explain:

* how a website can behave
* how media transitions work
* how a layout reveals itself
* how an interaction feels
* what a recipe is actually producing

Do not animate everything because animation is possible.

Respect:

* performance
* mobile
* reduced motion
* accessibility
* readability

---

# 4. TARGET USERS

Primary users:

### A. Developers

People who can code but struggle with design/art direction.

### B. Designers / creative developers

People who want stronger references, systems, resources, and implementation ideas.

### C. Founders / creators

People who know the website they want conceptually but do not know how to translate the idea into design and implementation.

### D. AI builders

People who use:

* Claude Code
* Cursor
* v0
* Lovable
* future AI development tools

but struggle to give those tools enough design and implementation context.

---

# 5. CORE EXPERIENCE

The primary flow is:

```text
DISCOVER
   ↓
CREATE YOUR RECIPE
   ↓
ANSWER / CHOOSE VISUALLY
   ↓
REVIEW YOUR DIRECTION
   ↓
CHECK REQUIRED ASSETS
   ↓
GENERATE UNIVERSAL RECIPE
   ↓
CHOOSE AI TOOL
   ↓
GENERATE BUILD PACKAGE
   ↓
BUILD
```

---

# 6. SITE INFORMATION ARCHITECTURE

MVP routes:

```text
/
 /explore
 /create
 /result/[id]
 /recipe/[slug]
 /resources
 /saved
 /pricing
 /account
 /login
 /signup
```

Optional future routes:

```text
/admin
/collections
/profile
```

Do not overbuild the future routes during MVP.

---

# 7. HOMEPAGE

The homepage itself must be a demonstration of OpusKit.

A visitor should be able to understand the product without reading a wall of text.

The homepage should tell a story.

## Section 1 — Hero

Possible headline:

> **Build websites worth remembering.**

Supporting copy:

> Tell us what you want your website to feel like. We'll turn it into a buildable design recipe.

Primary CTA:

> **Create your recipe**

Secondary CTA:

> **Explore recipes**

The hero should immediately feel visually distinctive.

Avoid:

* generic centered SaaS hero
* AI gradients
* massive empty hero with no product demonstration
* generic dashboard screenshot

Use controlled motion and an interactive visual demonstration.

---

## Section 2 — The problem

Storytelling section:

> **Beautiful websites aren't magic.**

Show visually:

```text
Typography
+
Color
+
Layout
+
Media
+
Motion
=
Experience
```

Each element should reveal or transform as the user scrolls.

The animation should explain the concept, not just decorate the page.

---

## Section 3 — Inspiration → Recipe

Show a beautiful website-style visual example.

Then animate the transformation:

```text
Inspiration
      ↓
Direction
      ↓
Ingredients
      ↓
Recipe
```

The visitor should understand what OpusKit does.

---

## Section 4 — Choose visually

Show a live miniature questionnaire interaction.

Example:

> **What should your website feel like?**

```text
[ QUIET ]
[ EDITORIAL ]
[ CINEMATIC ]
[ BOLD ]
[ RAW ]
[ ORGANIC ]
[ EXPERIMENTAL ]
```

When a user interacts with an option, the preview should change.

This demonstrates the actual product.

---

## Section 5 — Your ingredients

Visually show:

```text
Typography
Palette
Layout
Hero
Motion
Media
Components
```

Each ingredient can animate into place.

---

## Section 6 — Asset reality

Explain an important truth:

> Some beautiful website experiences depend on the right visual assets.

Demonstrate:

```text
No video
   ↓
Existing image
   ↓
Image → Video
   ↓
Scroll-driven experience
```

This must teach the user that certain effects require actual media.

---

## Section 7 — Build with your AI

Show:

```text
Universal Recipe
       ↓
Claude Code
Cursor
v0
Lovable
```

The product should visually communicate:

> OpusKit does not replace your AI development tool.
> It gives your AI development tool better design context.

---

## Section 8 — References

Show selected inspiration references.

Examples:

* Awwwards
* Siteinspire
* Land-book
* CSS Design Awards

Do not imply OpusKit copies any of these websites.

The purpose is:

> Study the principle. Build something original.

---

## Section 9 — Final CTA

Possible copy:

> **Your next website starts with a direction.**

CTA:

> **Create your Opus**

---

# 8. EXPLORATION

The Explore page should feel more like a curated creative library than a SaaS dashboard.

Primary sections:

```text
Recipes
Styles
Components
Motion
Resources
References
```

Allow visual filtering.

Examples:

### Style

* Japanese Minimal
* Editorial
* Cinematic
* Luxury
* Swiss
* Neo-Brutalist
* Organic
* Experimental
* Futuristic
* Typography-led

Do not treat “Modern” as one precise style.

“Modern” is an umbrella description.

Use more specific visual directions beneath it.

---

# 9. STYLE TAXONOMY

Build the taxonomy so it can evolve.

Broad visual families:

```text
Quiet
Editorial
Cinematic
Minimal
Bold
Raw
Organic
Futuristic
Experimental
```

Specific directions can include:

```text
Japanese Minimal
Scandinavian Minimal
Architectural Minimal
Luxury Editorial
Fashion Editorial
Cinematic Portfolio
Swiss Modern
Neo-Brutalist
Art Direction
Organic Modern
Typography First
Digital Futurism
```

These should not all be treated as mutually exclusive.

A recipe can combine directions.

Example:

```text
Editorial
+
Mysterious
+
Dark
+
Cinematic
=
Dark Editorial Experience
```

---

# 10. RECIPE CREATION FLOW

Route:

```text
/create
```

The experience must feel fast, visual, and premium.

Do not use a boring form layout.

Use a focused stepper/fullscreen flow.

Show:

* progress
* current choice
* visual preview
* back
* continue
* optional save state

---

# 11. QUESTIONNAIRE

## Step 1 — What are you building?

Examples:

```text
Portfolio
Agency
Studio
Fashion
Restaurant
E-commerce
Product
SaaS
Personal Brand
Creative Experiment
Other
```

This affects:

* structure
* components
* content
* imagery
* CTA patterns
* references

---

## Step 2 — What should it feel like?

Use visual cards.

Primary options:

```text
Quiet
Editorial
Cinematic
Minimal
Bold
Raw
Organic
Experimental
```

Each card needs a visual mini-preview.

Do not rely on text alone.

---

## Step 3 — Choose a visual direction

The options should adapt to Step 2.

Example:

If Editorial:

```text
Luxury Editorial
Fashion Editorial
Art Editorial
Swiss Editorial
```

If Minimal:

```text
Japanese Minimal
Scandinavian Minimal
Architectural Minimal
Monochrome Minimal
```

If Cinematic:

```text
Dark Cinematic
Cinematic Editorial
Immersive Portfolio
Film-inspired
```

Do not hardcode arbitrary style combinations forever.

The styles should eventually come from the Design Knowledge Base.

---

## Step 4 — Add a character

Ask:

> **What personality should it have?**

Examples:

```text
Elegant
Warm
Mysterious
Playful
Technical
Futuristic
Sophisticated
Raw
```

Allow one or two selections.

This creates more nuanced recipes.

---

## Step 5 — What should lead the experience?

```text
Photography
Video
Typography
Product
Illustration
3D
```

This determines the media direction.

---

## Step 6 — How alive should it feel?

Use interactive visual previews:

```text
Still
Subtle
Dynamic
Immersive
```

Each option should demonstrate its level of motion.

---

## Step 7 — How should the page be structured?

Use visual layouts rather than technical terminology.

```text
Balanced
Editorial
Asymmetric
Grid-driven
Full-bleed
Experimental
```

---

## Step 8 — Color

Question:

> **Choose the color atmosphere**

Show real website snippets, not only swatches.

Examples:

```text
Warm Ivory
Dark Cinematic
Monochrome
Earthy
Muted Color
Deep Color
High Contrast
```

Every palette option should have a **Palette Preview**.

The user must be able to:

* preview palette
* inspect colors
* manually change colors
* save their own custom palette
* reset to curated palette

Do not force the user to accept an automatic palette.

---

## Step 9 — Typography

Question:

> **How should the typography feel?**

Examples:

```text
Editorial Serif
Modern Sans
Elegant Contrast
Bold Display
Technical
Experimental
```

Show actual type samples.

For every combination display:

```text
Display font
Heading font
Body font
Utility font
```

Include:

* sample sentence
* size
* weight
* line-height
* letter-spacing
* why it works

Allow:

> **Choose another pairing**

Do not make the user understand font terminology to use the product.

---

## Step 10 — Assets

Ask:

> **What do you already have?**

Use icons and upload controls.

```text
Logo
Images
Video
Product photos
Illustrations
3D assets
Brand fonts
Copy
```

The answer should affect the recipe and Asset Checklist.

---

## Step 11 — Build target

Question:

> **How are you planning to build it?**

Options:

```text
Claude Code
Cursor
v0
Lovable
My own code
Not sure yet
```

If the user chooses “Not sure yet”, still produce the Universal Recipe and recommend an appropriate build target based on the recipe complexity.

---

# 12. MEDIA + VIDEO LOGIC

This is a core feature.

Users may not understand that some visual website experiences require actual media.

If the user chooses:

```text
Video
+
Immersive
+
Scroll-controlled
```

the system must detect:

> This recipe requires a video asset.

Show:

# This recipe needs visual media

Example:

> **This recipe is possible, but you'll need visual media first.**

Then provide:

```text
[ I already have a video ]

[ I have an image ]

[ Help me create a video ]

[ Find a temporary video ]
```

---

# 13. IMAGE → VIDEO FLOW

If the user has an image but no video:

Show:

> **You can turn this image into a video asset.**

Provide:

* image upload
* image preview
* desired motion
* camera movement
* duration
* aspect ratio
* image-to-video prompt
* recommended current tools/resources
* usage instructions

Example output:

```text
Asset:
Hero Video

Source:
User image

Creation:
Image → Video

Suggested motion:
Slow cinematic forward camera movement

Suggested duration:
5–8 seconds

Usage:
Scroll-controlled hero
```

Do not force OpusKit to become an image-to-video generator in MVP.

OpusKit should initially provide the best path and materials to create the missing asset externally.

---

# 14. EXISTING VIDEO FLOW

If the user already has a video:

allow:

* upload
* preview
* aspect-ratio validation
* basic duration/file guidance
* replace
* continue

The Recipe should describe how the video is used.

Example:

```text
Autoplay muted
Scroll controlled
Desktop:
fullscreen

Mobile:
optimized crop / poster / simplified motion
```

---

# 15. NO-ASSET FALLBACK

If the user has no appropriate visual assets:

Do not block the user.

Offer:

> **Use a temporary visual and replace it later.**

Use a curated temporary image/video resource.

The system should make it clear:

> This is a temporary placeholder. Replace it with your own asset before launch.

This is especially important for recipes involving:

* video
* large photography
* 3D
* product imagery

A user must still be able to see the final idea.

---

# 16. ASSET CHECKLIST

Every generated Recipe must have:

# What you'll need

Example:

```text
✓ Logo
✓ 4–6 images
⚠ 1 hero video
✓ Typeface
○ Optional texture
○ Optional secondary media
```

Every item has a status:

```text
Have it
Create it
Find it
Temporary placeholder
Optional
Required
```

---

# 17. ASSET REQUIREMENTS

Every Recipe stores asset requirements.

Example:

## Japanese Minimal

Required:

```text
4–6 high-quality images
Logo
Typography
```

Optional:

```text
Subtle motion assets
Texture
```

Fallback:

```text
Use a curated temporary image set
```

---

## Cinematic Video

Required:

```text
1 hero video
Logo
Supporting images
Typography
```

Recommended:

```text
Secondary video
Alternative mobile crop
Poster image
```

Fallback:

```text
Temporary curated video
or
Image-led hero
```

---

# 18. UNIVERSAL RECIPE

This is the heart of OpusKit.

A Recipe is:

> **What to build and why.**

It is NOT an AI prompt.

It must contain enough information for a developer or AI coding tool to understand the complete design direction.

---

# 19. UNIVERSAL RECIPE STRUCTURE

Every Recipe must contain:

```text
Recipe
├── Summary
├── Creative Direction
├── Design Principles
├── Visual System
│   ├── Color
│   ├── Typography
│   ├── Spacing
│   └── Grid
├── Information Architecture
├── Page Structure
├── Section Recipes
├── Component System
├── Media Direction
├── Motion System
├── Content Direction
├── Asset Requirements
├── Asset Creation Paths
├── Curated Resources
├── Implementation Guide
├── References
├── Why It Works
└── Build Metadata
```

---

# 20. RECIPE — SUMMARY

Example:

```text
Cinematic Editorial Portfolio

An immersive portfolio built around atmospheric media,
expressive typography, restrained color, and scroll-linked motion.
```

Keep this concise.

---

# 21. CREATIVE DIRECTION

Define:

```text
Mood
Personality
Visual principles
Do
Don't
```

Example:

```text
Mood:
Atmospheric
Refined
Immersive

Do:
Use large-scale media
Use restrained typography
Use intentional whitespace
Use slow, controlled motion

Avoid:
Generic SaaS UI
Excessive cards
Decorative gradients
Unnecessary animation
```

---

# 22. COLOR SYSTEM

Every Recipe must have a complete palette.

Example:

```text
Background
Surface
Text
Muted
Primary
Secondary
Accent
Border
```

For each:

* hex
* purpose
* usage
* contrast considerations

Also create:

> **Palette Preview**

The actual UI should display the palette in context.

---

# 23. TYPOGRAPHY SYSTEM

Every Recipe should define:

```text
Display
Heading
Body
Label / Utility
```

Include:

* font family
* weight
* size
* line-height
* letter-spacing
* use cases

Include:

> Why this pairing works

---

# 24. LAYOUT SYSTEM

Define:

```text
Container
Grid
Columns
Gutters
Section spacing
Alignment
Hero composition
Card proportions
Media proportions
```

Never leave these completely to the AI.

The point is to reduce arbitrary AI design decisions.

---

# 25. PAGE STRUCTURE

Every Recipe needs an actual website structure.

Example:

```text
Navbar
↓
Hero
↓
Intro
↓
Featured Work
↓
Editorial Story
↓
Gallery
↓
CTA
↓
Footer
```

Each section must explain:

* purpose
* visual composition
* content
* behavior
* responsive behavior

---

# 26. COMPONENT SYSTEM

Define recommended components.

Example:

```text
Navigation
Hero
MediaSection
ProjectCard
Gallery
FeatureBlock
Quote
CTA
Footer
```

Do not blindly generate components just to increase complexity.

---

# 27. MOTION SYSTEM

Every animation must define:

```text
Purpose
Trigger
Behavior
Duration
Easing
Implementation direction
Performance notes
Accessibility / reduced-motion behavior
```

Example:

```text
Image Reveal

Purpose:
Create a visual transition into the next section.

Trigger:
Viewport entry / scroll progress.

Behavior:
Clip-path expands from 0% to 100%.

Implementation:
GSAP + ScrollTrigger.

Reduced motion:
Use a simple fade.

Performance:
Animate transform/opacity where possible.
Avoid unnecessary layout recalculation.
```

The specific technology should be chosen based on the effect.

Use:

* GSAP / ScrollTrigger for advanced scroll-driven sequences
* Motion for standard React animation/interactions
* CSS for simple transitions
* specialized tools only when genuinely useful

Do not use GSAP everywhere.

---

# 28. CONTENT DIRECTION

Each Recipe should explain:

```text
Tone
Voice
Headline style
Paragraph length
CTA style
Words to avoid
Content density
```

Avoid generic AI phrases such as:

* “Elevate your brand”
* “The future of…”
* “Seamless experiences”
* “Unlock your potential”
* “Built for modern teams”

unless the specific brand genuinely requires them.

---

# 29. RESOURCES

OpusKit must maintain a curated resource library.

Categories:

```text
Fonts
Images
Video
Icons
Illustrations
3D
Textures
Motion
Libraries
Developer Tools
AI Media Tools
Design Tools
```

Initial resource ecosystem can include carefully selected examples such as:

```text
Inspiration
Awwwards
Siteinspire
Land-book
CSS Design Awards

Fonts
Google Fonts
Fontshare

Images
Unsplash

Video
Pexels
other verified creative/video sources

Icons
Lucide
Phosphor
Iconify

Motion
GSAP
Motion
Lenis
Lottie where appropriate

3D
Spline
Three.js
React Three Fiber

Color tools
Realtime Colors
other curated palette tools
```

Do not present this as an unfiltered directory.

For every resource store:

```text
Name
Category
URL
Description
Why it is useful
Recommended for
Related Recipes
License / usage note
Verified date
```

Re-check external resources when maintaining content.

Do not make stale claims about a resource.

---

# 30. REFERENCES

Every Recipe should contain selected references.

Possible sources:

```text
Awwwards
Siteinspire
Land-book
CSS Design Awards
```

A reference must explain:

```text
Reference
What to study
Why it matters
What principle is being used
```

Do NOT copy a referenced website.

Do NOT use another site's screenshot as a production asset unless appropriately licensed.

References exist to teach design principles.

Example:

```text
Reference:
Editorial website example

Study:
Typography-to-image relationship

Why:
The large type establishes visual hierarchy
without adding decorative UI.
```

---

# 31. WHY THIS WORKS

This section is mandatory.

Every Recipe must explain:

### Why the visual direction works

### Why the typography works

### Why the palette works

### Why the layout works

### Why the motion works

### Why the chosen assets work

This should educate the user rather than simply provide instructions.

---

# 32. IMPLEMENTATION GUIDE

A Recipe must also contain:

```text
Recommended stack
Required dependencies
Suggested file structure
Implementation sequence
Responsive guidance
Accessibility guidance
Performance guidance
```

Example:

```text
Recommended:
Next.js
TypeScript
Tailwind CSS
GSAP
Motion
```

Do not force every dependency into every recipe.

Keep the implementation proportional to the experience.

---

# 33. UNIVERSAL RECIPE vs BUILD PACKAGE

This separation is mandatory.

## Recipe

> **What to build and why**

## Build Package

> **Exactly how to give this to a particular AI/tool**

The Recipe is universal.

The Build Package is tool-specific.

Never mix these concepts.

---

# 34. BUILD PACKAGE ARCHITECTURE

Create an adapter system.

Conceptually:

```text
UniversalRecipe
      │
      ├── ClaudeCodeAdapter
      ├── CursorAdapter
      ├── V0Adapter
      └── LovableAdapter
```

Each adapter converts the same Recipe into the correct format for its tool.

Build an extensible interface such as:

```ts
interface BuildPackageAdapter {
  id: string
  name: string
  description: string
  generate(recipe: UniversalRecipe): Promise<BuildPackage>
}
```

The architecture must allow future tools to be added without changing the Universal Recipe schema.

---

# 35. CLAUDE CODE BUILD PACKAGE

Claude Code is the most advanced Build Package in the MVP because it can use project-level instructions and skills.

Before implementing the package format, verify the current official Claude Code documentation.

The package should conceptually include:

```text
CLAUDE.md

.claude/
  skills/
    visual-direction/
      SKILL.md
    motion-system/
      SKILL.md
    responsive-design/
      SKILL.md
    media-experience/
      SKILL.md
    visual-qa/
      SKILL.md
    performance/
      SKILL.md

recipe/
  design.md
  typography.md
  color.md
  layout.md
  motion.md
  media.md
  content.md

assets/
  README.md

build/
  implementation-plan.md
  verification.md
```

Use only skills relevant to that specific Recipe.

Do not generate every possible skill for every project.

---

# 36. CLAUDE SKILLS — IMPORTANT

The skills must teach Claude not only WHAT to create but HOW to create it correctly.

Potential skill families:

### visual-direction

Teaches:

* visual hierarchy
* aesthetic principles
* palette use
* typography behavior
* spacing
* visual consistency

### motion-system

Teaches:

* animation sequence
* scroll behavior
* timing
* easing
* performance
* reduced motion

### responsive-design

Teaches:

* desktop
* tablet
* mobile
* media cropping
* typography scaling
* layout adaptation

### media-experience

Teaches:

* video handling
* image handling
* poster fallback
* mobile fallback
* loading
* aspect ratio
* asset replacement

### visual-qa

Teaches Claude how to inspect the result and compare the implementation against the Recipe.

### performance

Teaches:

* image optimization
* video efficiency
* avoiding layout thrashing
* animation performance
* lazy loading

Do NOT ship irrelevant skills.

---

# 37. CURSOR BUILD PACKAGE

Before implementing, verify the current official Cursor documentation.

The package should provide the tool with:

* visual direction
* architecture
* design constraints
* implementation rules
* recipe
* asset manifest
* responsive rules
* motion rules
* visual QA guidance

Use the current project-level rules/context mechanism recommended by Cursor.

Do not assume the Claude Code file structure applies to Cursor.

---

# 38. V0 BUILD PACKAGE

Before implementing, verify the current official v0 documentation and current capabilities.

The package should emphasize:

```text
Product surface
Context of use
Constraints
Visual taste
Layout
Components
Responsive behavior
References
Assets
```

Provide:

* a primary build prompt
* supporting context
* reference assets
* exact constraints
* design decisions

Do not create a vague:

> “Build a beautiful modern website”

prompt.

The Build Package should contain enough context to reduce AI guesswork.

---

# 39. LOVABLE BUILD PACKAGE

Before implementing, verify the current official Lovable documentation and current project-context capabilities.

The package should include:

* product intent
* target users
* page structure
* design system
* visual direction
* components
* content
* constraints
* asset requirements
* references
* implementation details

Again, the package is generated from the Universal Recipe.

---

# 40. ASSET MANIFEST

Every Build Package must contain an asset manifest.

Example:

```json
{
  "heroVideo": {
    "required": true,
    "status": "temporary",
    "source": "curated-placeholder",
    "replaceWith": "user-owned-video",
    "usage": "scroll-controlled hero"
  }
}
```

This allows AI tools to understand:

* what assets exist
* what assets are temporary
* what must be replaced
* how an asset should be used

---

# 41. TEMPORARY ASSETS

If no user asset exists, the Build Package can specify:

```text
Temporary asset:
Use curated placeholder media.

Important:
Treat this as replaceable.

Do not hardcode the asset into the architecture.
Use an asset reference/configuration layer.
```

This means users can swap their own image/video later without rebuilding the entire experience.

---

# 42. DESIGN DECISION ENGINE

For MVP, use a **deterministic curated system first**.

Do not make an LLM randomly invent a Recipe.

The engine should compose from:

```text
Styles
Characters
Color Palettes
Typography Pairings
Layouts
Hero Patterns
Media Patterns
Motion Patterns
Components
Resources
References
```

Example:

```text
User:
Editorial
+
Mysterious
+
Video
+
Immersive
+
Asymmetric
+
Dark palette

              ↓

Recipe:
Dark Cinematic Editorial
```

The engine selects compatible ingredients.

Each ingredient should declare compatibility metadata.

For example:

```ts
{
  id: "luxury-editorial-serif",
  type: "typography",
  tags: ["editorial", "luxury", "fashion"],
  compatibleWith: ["dark-editorial", "cinematic-editorial"],
  incompatibleWith: ["neo-brutalist"]
}
```

Do not rely exclusively on arbitrary AI generation.

---

# 43. RECIPE COMPOSITION

The engine should consider:

```text
Purpose
Style
Character
Media
Motion
Layout
Palette
Typography
Available assets
Build target
```

Then produce:

```text
Creative Direction
+
Visual System
+
Layout
+
Media
+
Motion
+
Components
+
Resources
+
Implementation
+
References
```

---

# 44. MANUAL OVERRIDE

After the generated Recipe appears, the user should be able to modify it.

Examples:

```text
Change palette
Change font pairing
Change hero
Change motion intensity
Change layout
Change media direction
```

Use:

> **Remix**

rather than:

> Regenerate everything

The rest of the Recipe should remain stable unless the user explicitly changes a fundamental decision.

---

# 45. RECIPE RESULT PAGE

Route:

```text
/result/[id]
```

This should feel like opening a premium design document.

Not like opening a JSON dump.

Structure:

```text
Recipe title
Description
Visual preview

Creative Direction

Visual System

Page Structure

Components

Media

Motion

Asset Checklist

Resources

References

Why It Works

Implementation

Build with...
```

The user should be able to copy sections individually.

---

# 46. RECIPE PREVIEW

Every Recipe needs a strong visual preview.

The preview can be:

* static
* interactive
* animated
* video-driven

depending on the Recipe.

Whenever possible, demonstrate the actual experience.

For example:

```text
Scroll
↓
Hero video advances
↓
Typography reveals
↓
Image transitions
↓
Next section appears
```

---

# 47. VIDEO-DRIVEN EXPERIENCE

For video Recipes, explain the prerequisite clearly.

Example:

```text
Hero:
Scroll-controlled video

Needs:
1 hero video
1 poster image

Optional:
mobile-specific video
secondary media
```

If no video exists:

```text
Use temporary video
OR
turn image into video
OR
switch to image-led variant
```

Never leave the user confused about why the result needs a video.

---

# 48. FREE VS PAID

The initial monetization model should prioritize **one-time purchases**.

Do not force a subscription-first product.

Possible model:

## Free

* explore
* view previews
* view limited Recipe information
* create limited free recipe previews

## Paid Recipe

One-time payment for complete Recipe + Build Package.

Paid content may include:

```text
Full design system
Full implementation guide
Asset package
AI-ready package
Claude skills where applicable
References
Advanced motion recipe
```

---

# 49. FUTURE SUBSCRIPTION

Design the architecture so a subscription can be introduced later.

Possible future benefits:

* new recipes every month
* full recipe library
* advanced recipe composer
* additional AI adapters
* premium resources
* saved collections
* member-only recipes

Do not bake subscription assumptions deeply into the data model.

---

# 50. BILLING ARCHITECTURE

Use a provider abstraction.

Example:

```ts
interface BillingProvider {
  createCheckout(...)
  verifyPurchase(...)
  getEntitlements(...)
}
```

The MVP can use:

* test checkout
* mock purchase state
* configurable product pricing

Do not hardcode the business model into UI components.

---

# 51. 10 INITIAL RECIPES

Seed the product with exactly **10 strong recipes**.

Do not fill them with shallow placeholder content.

Suggested initial set:

### 01 — Japanese Quiet Minimal

Characteristics:

* restrained typography
* generous whitespace
* calm layout
* subtle motion
* neutral / natural palette
* editorial photography

### 02 — Cinematic Editorial

Characteristics:

* immersive media
* large typography
* dark or atmospheric palette
* scroll-driven video
* cinematic transitions

### 03 — Luxury Fashion

Characteristics:

* high-contrast typography
* refined spacing
* premium photography
* subtle motion
* editorial product presentation

### 04 — Swiss Modern

Characteristics:

* strong grid
* typography hierarchy
* geometric structure
* restrained palette
* functional motion

### 05 — Neo-Brutalist Commerce

Characteristics:

* visible structure
* strong contrast
* expressive type
* raw UI elements
* controlled interaction

### 06 — Organic Modern

Characteristics:

* natural palette
* tactile imagery
* softer geometry
* editorial sections
* subtle motion

### 07 — Typography First

Characteristics:

* typography as primary visual
* minimal media
* strong composition
* large type
* scroll-based type transitions

### 08 — Art Direction Studio

Characteristics:

* unusual layout
* experimental media
* asymmetric composition
* art-directed typography
* expressive transitions

### 09 — Digital Futurism

Characteristics:

* dark surfaces
* technical typography
* 3D / WebGL-compatible direction
* sophisticated motion
* restrained futuristic language

### 10 — Warm Editorial Hospitality

Characteristics:

* warm color system
* photography-led
* elegant typography
* approachable premium tone
* subtle section motion

Every recipe must be complete according to the Universal Recipe structure.

---

# 52. RECIPE QUALITY BAR

Do not optimize for recipe count.

Optimize for quality.

A recipe should feel usable by a real developer.

It must answer:

> What should I build?

> Why should I build it this way?

> Which assets do I need?

> What if I don't have them?

> Which resources can I use?

> How should the layout work?

> How should motion behave?

> How should the AI implement it?

> How should it behave on mobile?

> What should I pay attention to?

If these questions are unanswered, the Recipe is incomplete.

---

# 53. SAVED RECIPES

Users should be able to:

* save a Recipe
* unsave it
* revisit it
* compare recipes
* view recent Recipes

Do not make this a complex social system.

---

# 54. RESOURCE PAGE

The Resource page should feel like a curated toolbox.

Do not turn it into a giant directory.

Filter by:

```text
Category
Use case
Style
Technology
Recipe
```

Example:

> Show motion resources compatible with Cinematic recipes.

---

# 55. ADMIN / CONTENT MODEL

Even if admin UI is not fully implemented in MVP, the data model must anticipate content management.

Entities:

```text
Recipe
Style
Character
Palette
TypographyPairing
LayoutPattern
HeroPattern
MediaPattern
MotionPattern
ComponentPattern
Resource
Reference
AssetRequirement
BuildAdapter
Purchase
User
SavedRecipe
RecipeGeneration
```

---

# 56. IMPORTANT DATA RELATIONSHIPS

A Recipe is composed from reusable ingredients.

Example:

```text
Recipe
 ├── Style
 ├── Character
 ├── Palette
 ├── Typography
 ├── Layout
 ├── Hero
 ├── Media
 ├── Motion
 ├── Components
 ├── Resources
 └── References
```

The same typography can appear in many recipes.

The same motion pattern can appear in many recipes.

The same resource can be associated with many recipes.

This is necessary for the long-term **Design Knowledge Base**.

---

# 57. DESIGN KNOWLEDGE BASE

This is one of the most important long-term product principles.

Over time OpusKit should become:

> **A structured design knowledge base for building modern websites.**

Not merely a collection of prompts.

The knowledge base should eventually understand relationships between:

```text
Styles
↓
Ingredients
↓
Patterns
↓
Resources
↓
Recipes
↓
Tools
```

The user sees a simple UI.

The backend should hold a rich structured system.

---

# 58. UI DESIGN DIRECTION

The OpusKit UI should itself demonstrate excellent web design.

Desired feeling:

* premium
* editorial
* intelligent
* creative
* modern
* calm
* tactile
* fast
* confident

Visual references may come from:

* high-end editorial websites
* digital agencies
* fashion sites
* creative studios
* curated web galleries
* sophisticated design tools

But the final OpusKit design must be original.

---

# 59. COLOR DIRECTION FOR OPUSKIT

Use:

* warm off-white / paper-like background
* near-black text
* muted neutral surfaces
* one restrained accent color
* subtle borders
* carefully used contrast

Do not use the default “AI purple gradient” aesthetic.

Do not make the entire interface dark unless the visual concept genuinely benefits from it.

---

# 60. TYPOGRAPHY FOR OPUSKIT

The brand should use typography intentionally.

Consider:

* one distinctive display face
* one highly readable interface sans
* optional monospace for technical metadata

Do not use five fonts.

The typography itself should make the product feel designed.

---

# 61. UI COMPONENT PRINCIPLES

Avoid:

```text
huge rounded cards everywhere
floating gradient blobs
generic pill soup
dashboard-like sidebars
excessive shadows
```

Use cards only when the content benefits from contained presentation.

Prefer:

* editorial sections
* strong type hierarchy
* borders
* whitespace
* image-led surfaces
* subtle hover states
* intentional grids
* full-bleed media where appropriate

---

# 62. MOTION FOR OPUSKIT

Use motion to explain the product.

Examples:

### Hero

Visual transformation.

### Questionnaire

Smooth selection transitions.

### Palette

UI recolors itself.

### Typography

Preview updates.

### Recipe

Ingredients assemble into a complete system.

### AI handoff

Recipe transforms into a tool-specific Build Package.

Do not animate every small interaction.

---

# 63. RESPONSIVENESS

The product must be excellent on:

```text
Mobile
Tablet
Desktop
Large desktop
```

Do not treat mobile as a compressed desktop.

For video-heavy experiences:

* optimize media
* use appropriate crops
* provide posters
* reduce animation where needed
* consider alternate mobile behavior

For questionnaires:

* use full-width touch-friendly options
* one focused question at a time
* maintain visible progress
* maintain selected state

---

# 64. ACCESSIBILITY

Include:

* keyboard navigation
* semantic HTML
* focus states
* readable contrast
* reduced-motion support
* accessible labels
* touch-friendly controls
* proper media fallbacks

Animation must never block comprehension.

---

# 65. PERFORMANCE

Performance is a product feature.

Especially because OpusKit itself demonstrates video and animation.

Use:

* lazy loading
* optimized images
* efficient video handling
* responsive media
* minimal client state
* code splitting where helpful
* transform/opacity-based animation when possible
* avoiding unnecessary layout recalculation

Do not ship a beautiful website that feels slow.

---

# 66. TECH STACK

Use a modern TypeScript-first stack.

Preferred:

```text
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
Zod
React Hook Form where useful
Supabase / PostgreSQL for persistent data
```

For motion:

```text
Motion
GSAP
```

Use each only when appropriate.

For advanced scroll-driven experiences:

```text
GSAP + ScrollTrigger
```

For normal UI interactions:

```text
Motion / CSS
```

Do not introduce unnecessary libraries.

---

# 67. ARCHITECTURE

Prefer feature-oriented architecture.

Example:

```text
src/
  app/
  components/
  features/
    recipes/
    questionnaire/
    resources/
    build-packages/
    assets/
    billing/
    auth/
  lib/
  data/
  types/
  config/
```

Keep universal domain types independent from UI.

---

# 68. DOMAIN MODEL

Create strong types for:

```ts
type UniversalRecipe = {
  id: string
  title: string
  slug: string
  summary: string

  creativeDirection: CreativeDirection
  designPrinciples: string[]

  visualSystem: VisualSystem
  layoutSystem: LayoutSystem

  pageStructure: PageSection[]
  components: ComponentRecipe[]

  media: MediaRecipe
  motion: MotionRecipe

  contentDirection: ContentDirection

  assetRequirements: AssetRequirement[]
  assetCreationPaths: AssetCreationPath[]

  resources: ResourceReference[]
  references: InspirationReference[]

  implementation: ImplementationGuide

  whyItWorks: WhyItWorks

  metadata: RecipeMetadata
}
```

Build Package:

```ts
type BuildPackage = {
  recipeId: string
  target: BuildTarget
  files: BuildFile[]
  instructions: string
  assets: AssetManifest
}
```

---

# 69. RECIPE GENERATION

The MVP can generate recipes deterministically from seeded data.

Use compatible ingredient composition.

Example:

```text
style = cinematic
character = sophisticated
media = video
motion = immersive
layout = asymmetric
palette = dark
typography = editorial-serif
```

Output:

```text
Cinematic Editorial
```

Do not depend on a live LLM call just to determine the Recipe.

AI can later help with:

* copy
* optional refinements
* advanced composition
* natural-language modifications

but the core knowledge should remain deterministic and curated.

---

# 70. RECIPE EDITING

Allow the user to:

```text
Change palette
Change typography
Change hero
Change motion intensity
Change layout
Change media
```

When one ingredient changes, intelligently update only dependent decisions.

Example:

Changing:

```text
Media:
Video → Photography
```

should:

* remove video-specific asset requirement
* replace video motion requirements
* adapt hero behavior
* update implementation notes
* update Build Package

---

# 71. TOOL SELECTION

Once Recipe is complete:

Show:

# How do you want to build it?

```text
Claude Code
Cursor
v0
Lovable
Build it yourself
```

Each option should explain:

```text
What you'll receive
```

Example:

### Claude Code

> A project-ready build package with instructions, design context, asset manifest, and recipe-specific skills.

### Cursor

> A coding context package with project rules, implementation direction, and assets.

### v0

> A context-rich build prompt with visual direction, constraints, references, and assets.

### Lovable

> A structured product/design specification tailored for Lovable's workflow.

---

# 72. BUILD PACKAGE UX

After tool selection, show:

```text
Preparing your Claude Code package...

✓ Recipe
✓ Design System
✓ Motion System
✓ Assets
✓ References
✓ Implementation guide
✓ Skills
✓ Verification notes
```

Then:

```text
Download package
Copy instructions
Open build guide
```

Do not make this feel like a generic “copy prompt” dialog.

It should feel like:

> **Your build kit is ready.**

---

# 73. PURCHASE FLOW

For locked content:

Show what the user is buying.

Example:

```text
Full Creative Direction
Full Design System
Full Recipe
Asset Checklist
Resource Kit
References
Implementation Guide
AI Build Package
Claude Skills
```

Do not hide the value behind a vague paywall.

---

# 74. ERROR STATES

Important error states:

### Missing asset

> This recipe needs a hero video. You can upload one, create one from an image, use a temporary asset, or choose an alternative.

### Unsupported build target

> We don't have a specialized adapter for this tool yet. Your Universal Recipe is still available.

### External resource unavailable

> This resource is currently unavailable. Here are alternative curated options.

### Incomplete recipe

Never let an incomplete Recipe reach Build Package generation.

---

# 75. LOADING STATES

Loading states should feel like part of the product.

Example:

```text
Composing your direction...
Selecting typography...
Building your motion system...
Preparing your assets...
Preparing your build package...
```

Do not use generic spinners everywhere.

---

# 76. EMPTY STATES

Example:

### Saved

> Nothing saved yet.
> Start exploring recipes worth remembering.

### Resources

> We're curating this section carefully.
> Quality over quantity.

---

# 77. COPY STYLE

Product copy must be:

* concise
* confident
* intelligent
* friendly
* non-corporate
* non-generic

Avoid jargon when it does not help the user.

---

# 78. PRODUCT LANGUAGE

Use OpusKit terminology consistently:

```text
Recipe
Ingredients
Build Package
Direction
Character
Palette
Motion
Resource
Reference
Why It Works
Asset Checklist
Remix
Build with...
```

Avoid calling everything:

```text
Template
Prompt
AI generation
AI magic
```

Prompt is a component of a Build Package, not the product itself.

---

# 79. FUTURE VISION

Do not implement these as major MVP features, but architect with them in mind.

Future:

### Recipe Composer

Users manually compose:

```text
Style
+
Hero
+
Typography
+
Palette
+
Motion
+
Layout
```

and get a new Recipe.

### Build for me

OpusKit eventually creates:

```text
Repository
Preview
Assets
Code
```

### Recipe Marketplace

Creators publish high-quality recipes.

### Design Knowledge Graph

Relationships between:

```text
Style
Ingredient
Pattern
Resource
Reference
Recipe
Tool
```

### Continuous Knowledge Updates

New:

* web trends
* tools
* AI builders
* animation technologies
* fonts
* media tools
* resources

can be added without changing the product architecture.

---

# 80. CONTENT QUALITY RULES

Do not use:

* fake lorem ipsum
* meaningless recipe descriptions
* fake source links
* invented resources
* fake testimonials
* fake social proof
* copied site descriptions
* duplicated recipes with minor naming changes

Every Recipe must feel distinct.

---

# 81. INSPIRATION RULES

Use curated external design platforms as inspiration/reference sources.

Relevant categories may include:

* editorial
* typographic
* minimal
* fashion
* e-commerce
* portfolio
* art direction
* unusual layout
* grid
* animation
* background video
* parallax
* 3D
* interactive design

Study principles.

Do not clone individual websites.

Do not create a visual system by copying one reference.

Combine principles intentionally.

---

# 82. CURRENT TECHNOLOGY AWARENESS

The content layer should be able to reference current web technologies and tools.

Examples:

```text
GSAP
ScrollTrigger
Motion
Lenis
Spline
Three.js
React Three Fiber
Lottie
WebGL
WebGPU
```

But only recommend a technology when the experience benefits from it.

The product must remain technology-aware without becoming a technology catalog.

---

# 83. ADMIN CONTENT STRATEGY

Content should be data-driven enough that a future admin can:

* add recipes
* edit recipes
* add palettes
* add font pairings
* add motion patterns
* add resources
* add references
* change compatibility
* update tool adapters
* update prices

without changing application code.

---

# 84. MVP DEFINITION

The MVP must include:

### Public

* Premium homepage
* Explore
* Recipe detail
* Resources
* Pricing
* Auth

### Core product

* Adaptive questionnaire
* Visual choices
* Palette Preview
* Typography Preview
* Recipe composition
* Asset Checklist
* Asset fallback guidance
* Recipe result
* Remix
* Save Recipe

### AI handoff

* Tool selection
* Universal Recipe
* Claude Code adapter
* Cursor adapter
* v0 adapter
* Lovable adapter

### Monetization

* Free/paid state
* One-time purchase architecture
* Test checkout / configurable billing abstraction

### Content

* 10 complete Recipes
* Curated resources
* Curated references

---

# 85. OUT OF SCOPE FOR MVP

Do NOT spend MVP time building:

* social profiles
* comments
* followers
* public creator marketplace
* full AI website generation
* advanced collaboration
* complex analytics dashboards
* internal chat assistant
* giant template marketplace
* dozens of AI models
* complicated credit systems
* unnecessary gamification

---

# 86. DEFINITION OF DONE

The product is not done when the pages render.

It is done when a real user can:

```text
1. Enter OpusKit
2. Understand what it does
3. Start creating
4. Make visual decisions without technical knowledge
5. Choose a design direction
6. Choose a palette visually
7. Choose typography visually
8. Decide the media direction
9. Understand asset requirements
10. Supply or replace assets
11. Receive a coherent Recipe
12. Understand Why It Works
13. Inspect references/resources
14. Select an AI tool
15. Receive a tool-specific Build Package
16. Download/copy the package
```

---

# 87. CRITICAL UX TEST

A non-designer should be able to use the core questionnaire without knowing:

* what “brutalism” means
* what “12-column grid” means
* what “kerning” means
* what “scrubbed animation” means
* what “parallax” means

Technical details may be revealed as explanation, but the primary interaction must remain visually understandable.

---

# 88. CRITICAL PRODUCT TEST

Ask:

> Could the user get something useful from OpusKit even if they have no design vocabulary?

If no, improve the UX.

Ask:

> Could a developer actually build the resulting website from the Recipe?

If no, improve the Recipe.

Ask:

> Would the AI tool understand the website more clearly because of OpusKit?

If no, improve the Build Package.

---

# 89. IMPLEMENTATION ORDER

Build in this order:

## Phase 1

Foundation:

* project setup
* design system
* routing
* data types
* seed data
* base UI

## Phase 2

Homepage:

* storytelling
* motion
* interactive demonstrations

## Phase 3

Explore:

* recipe cards
* filters
* search
* visual previews

## Phase 4

Recipe Creation:

* adaptive questionnaire
* visual choices
* palette preview
* typography preview
* asset questionnaire

## Phase 5

Recipe Engine:

* deterministic composition
* Universal Recipe
* Recipe result page
* Why It Works
* Asset Checklist

## Phase 6

Build Packages:

* Claude Code
* Cursor
* v0
* Lovable

## Phase 7

Auth / Saved / Billing:

* authentication
* saved recipes
* one-time purchase architecture
* locked content

## Phase 8

Polish:

* responsive
* accessibility
* performance
* animation refinement
* error states
* loading states
* content quality
* visual QA

---

# 90. FINAL ENGINEERING DIRECTIVE

Do not build this as:

> “a page with cards that demonstrates the idea.”

Build the actual product model.

The core domain is:

```text
Questionnaire
→ Design Decision Engine
→ Universal Recipe
→ Asset Requirements
→ Resources
→ References
→ Why It Works
→ AI Adapter
→ Build Package
```

Everything in the UI should reinforce this system.

---

# 91. FINAL BRAND DIRECTIVE

OpusKit should feel like:

> a premium design studio,
> a creative recipe book,
> a design knowledge base,
> and a bridge between human taste and AI development tools.

It should not feel like:

> another AI app.

The product itself must be proof that OpusKit understands beautiful web design.

---

# 92. BUILD THIS NOW

Start by inspecting the repository.

Then:

1. Establish the domain model.
2. Establish the design system.
3. Implement the MVP routes.
4. Seed the 10 complete Recipes.
5. Build the homepage storytelling experience.
6. Build the adaptive visual questionnaire.
7. Build the Recipe composition engine.
8. Build the Asset Checklist and media fallback flow.
9. Build the Universal Recipe result.
10. Build AI tool adapters.
11. Build the purchase architecture.
12. Test the complete user flow.

Do not stop at a static visual prototype.

The result must be a working, coherent MVP that can be extended into the long-term OpusKit product.

Most importantly:

> **Do not optimize for more content. Optimize for better decisions, better recipes, better resources, and better outcomes.**

--------------------------------------------------------------------------------------------------------------------------------
Additionally, take into account...: 

# OPUSKIT — MASTER BUILD PROMPT

Build **OpusKit**, a premium web product that helps people create distinctive, modern websites by turning their goals, taste and preferences into a **buildable design recipe**.

Use these installed skills:

* `design-dna`
* `frontend-design`
* `design-taste-frontend`
* `scrollcraft`

---

## 1. PRODUCT

Core idea:

> **Tell us what you want your website to feel like. We'll turn it into a buildable design recipe.**

OpusKit is:

* a curated design knowledge base
* an interactive design decision system
* a website Recipe generator
* a bridge between design and AI coding tools

OpusKit is NOT:

* a generic AI website builder
* a prompt library
* a template marketplace
* a generic SaaS dashboard

Core flow:

```text
User goals + taste
        ↓
Visual questionnaire
        ↓
Design Decision Engine
        ↓
Universal Recipe
        ↓
Asset Checklist
        ↓
AI Tool Adapter
        ↓
Build Package
        ↓
User builds website
```

---

# 2. PRODUCT QUALITY BAR

The product must feel:

* premium
* modern
* creative
* intelligent
* refined
* fast
* intentional
* visually memorable

Premium comes from:

> **selection + presentation + quality**

Do not create generic AI aesthetics.

Avoid:

* gradient blobs
* excessive rounded cards
* generic purple/blue AI styling
* glassmorphism everywhere
* meaningless illustrations
* dashboard-heavy layouts
* excessive shadows
* unnecessary UI decoration
* repetitive animations

The website itself must demonstrate the quality OpusKit promises.

---

# 3. HOMEPAGE

The homepage must tell a story rather than behave like a typical SaaS landing page.

Core narrative:

```text
Beautiful websites aren't magic.
        ↓
Typography
Color
Layout
Media
Motion
        ↓
Recipe
        ↓
Build Package
        ↓
Website
```

Use visual storytelling, interactive previews and meaningful scroll transitions.

The homepage should make the visitor think:

> “I want a website like this.”

Then:

> “I understand how OpusKit helps me create it.”

The primary CTA should be:

> **Create your recipe**

Secondary CTA:

> **Explore recipes**

Possible headline:

> **Build websites worth remembering.**

Supporting message:

> **Tell us what you want your website to feel like. We'll turn it into a buildable design recipe.**

---

# 4. MOTION

Core rule:

> **Animation for demonstration, not decoration.**

Use motion to explain the product.

Examples:

* palette changes
* typography changes
* layout transformations
* image reveals
* recipe assembly
* section transitions
* interactive previews
* visual comparisons

Do not animate everything.

Motion should improve comprehension and atmosphere.

There is currently **no supplied hero video**.

Do not make video a dependency of the homepage.

The architecture should remain video-ready for future implementations.

Use imagery, typography, layout, clipping, scale, parallax and controlled transitions to create a cinematic experience.

---

# 5. RECIPE CREATOR

This is the core product experience.

Create an adaptive questionnaire.

Do NOT force every user through the same number of questions.

Ask only questions that materially change the final Recipe.

Typical flow:

```text
What are you building?
        ↓
What should it feel like?
        ↓
Choose a specific visual direction
        ↓
Choose personality
        ↓
How should the experience be structured?
        ↓
What should lead the experience?
        ↓
How alive should it feel?
        ↓
Choose color atmosphere
        ↓
Choose typography character
        ↓
What assets do you already have?
        ↓
Which AI tool will you use?
```

Usually this should take around **6–10 meaningful decisions**, depending on branching.

Do not make users write long text answers.

Prefer:

* visual cards
* image previews
* mini website previews
* animated examples
* palette previews
* typography previews
* quick selections

---

# 6. STYLE SYSTEM

Do not treat every style as the same type of category.

Broad directions can include:

* Quiet
* Editorial
* Cinematic
* Minimal
* Bold
* Raw
* Organic
* Experimental
* Futuristic

Specific directions can include:

* Japanese Minimal
* Luxury Editorial
* Fashion Editorial
* Cinematic Portfolio
* Swiss Modern
* Neo-Brutalist
* Organic Modern
* Typography First
* Art Direction
* Digital Futurism

Allow combinations.

Example:

```text
Editorial
+
Mysterious
+
Dark
=
Dark Editorial
```

The style system must be data-driven and extensible.

---

# 7. VISUAL DECISIONS

## Color

Provide a visual **Palette Preview**.

Users should see palettes inside an actual interface rather than only seeing hex values.

Allow:

* selecting a curated palette
* previewing it
* customizing colors
* replacing individual colors
* resetting to the recommended palette

Store:

* background
* surface
* text
* muted
* primary
* secondary
* accent
* border

## Typography

Provide actual visual typography previews.

Show:

* display
* heading
* body
* utility

For every pairing provide:

* font
* weight
* size
* line-height
* letter-spacing
* intended use
* why it works

Users may choose another pairing.

Do not require technical typography knowledge.

---

# 8. ASSET SYSTEM

Every Recipe must understand its asset requirements.

Create an **Asset Checklist**.

Example:

```text
✓ Logo
✓ 4–6 images
⚠ Hero video
✓ Typography
○ Texture
```

Every asset has a state:

* Required
* Recommended
* Optional
* Already have
* Create
* Find
* Temporary

---

# 9. MISSING ASSETS

Never block the user because they lack media.

If a Recipe needs video:

```text
I already have a video
I have an image
Create a video from my image
Find a suitable temporary video
Use an image-based alternative
```

If the user has an image but no video, provide the materials needed to create an image-to-video asset.

If the user has nothing, provide a curated temporary asset.

Clearly mark temporary assets as replaceable.

Example:

> **This recipe is possible, but you'll need visual media first.**

Then explain the available paths.

The same principle applies to:

* images
* video
* 3D assets
* illustrations
* fonts
* textures

---

# 10. UNIVERSAL RECIPE

The Universal Recipe is the core OpusKit product.

It answers:

> **What should be built and why?**

It must contain:

```text
Creative Direction
Design Principles
Color System
Typography System
Layout System
Page Structure
Components
Media Direction
Motion System
Content Direction
Asset Requirements
Asset Creation Paths
Curated Resources
Implementation Guide
References
Why It Works
```

The Recipe must contain enough information for a developer or AI tool to build the intended website with minimal guesswork.

---

# 11. WHY IT WORKS

Every Recipe must explain the reasoning behind important decisions.

Examples:

* Why this palette?
* Why this typography?
* Why this layout?
* Why this media treatment?
* Why this motion?
* Why these resources?

This is educational content, not marketing copy.

The goal is to teach design thinking while providing the actual solution.

---

# 12. RESOURCES

Build a curated resource system.

Categories:

```text
Fonts
Images
Video
Icons
Illustrations
3D
Textures
Motion
UI Libraries
Developer Tools
AI Media Tools
```

Resources should be selected because they are useful for the specific Recipe.

Do NOT create a giant directory.

Every resource should contain:

* name
* URL
* category
* purpose
* why it is recommended
* related styles/recipes
* usage/license information where relevant

Use quality sources and keep the resource system maintainable.

---

# 13. REFERENCES

Every Recipe should include selected design references.

Possible sources:

* Awwwards
* Siteinspire
* Land-book
* CSS Design Awards

For every reference explain:

> **What should the user study here?**

Examples:

* typography relationship
* layout composition
* media treatment
* motion principle
* spacing
* interaction

References are for learning principles.

Do not clone or reproduce individual websites.

---

# 14. AI TOOL SYSTEM

Keep these two concepts strictly separate:

### Recipe

> **What to build and why**

### Build Package

> **Exactly how to give the Recipe to a specific AI/tool**

The Universal Recipe must never depend on one AI tool.

Create adapters:

```text
Universal Recipe
      ↓
Claude Code Adapter
Cursor Adapter
v0 Adapter
Lovable Adapter
```

The Universal Recipe stays unchanged.

The adapter produces the correct format for the selected tool.

---

# 15. CLAUDE CODE BUILD PACKAGE

Claude Code deserves the most complete package.

Where relevant, provide:

```text
CLAUDE.md

.claude/
  skills/
    visual-direction/
    motion-system/
    responsive-design/
    media-experience/
    visual-qa/
    performance/

recipe/
assets/
implementation/
```

Only include relevant skills.

Skills should teach Claude:

* what the visual direction is
* how to implement it
* how motion should behave
* how assets should be handled
* how responsive behavior should work
* how to visually verify the result
* how to preserve performance

The Build Package should not merely contain a large prompt.

It should provide actual project context and reusable instructions.

---

# 16. OTHER AI TOOLS

Create separate adapters for:

* Cursor
* v0
* Lovable

Before implementing an adapter, inspect and use the current official workflow/context mechanisms of that tool.

Never assume Claude Code's package structure applies to another tool.

The same Universal Recipe should produce different tool-specific outputs.

---

# 17. DESIGN DECISION ENGINE

Do not ask an LLM to randomly invent every Recipe.

Start with curated structured data.

The engine composes:

```text
Style
+
Character
+
Palette
+
Typography
+
Layout
+
Hero
+
Media
+
Motion
+
Components
+
Resources
+
References
```

Use compatibility metadata.

Example:

```text
Cinematic
→ compatible with
Editorial Serif
Fullscreen Video
Scroll Motion
Dark Palette
```

An ingredient can belong to multiple Recipes.

The system must become a reusable **Design Knowledge Base**.

---

# 18. RECIPE REMIX

After generating a Recipe, allow users to modify key ingredients:

* palette
* typography
* hero
* layout
* media
* motion

Use:

> **Remix**

instead of simply regenerating everything.

Changing one ingredient should intelligently update dependent parts.

Example:

```text
Video → Photography
```

should update:

* asset requirements
* hero behavior
* motion
* implementation
* Build Package

---

# 19. EXPLORE

The Explore experience should feel like a premium creative library.

Users can explore:

* Recipes
* Styles
* Components
* Motion
* Resources
* References

Use visual previews and useful filtering.

Do not create hundreds of shallow items.

MVP starts with:

> **10 exceptional Recipes**

---

# 20. INITIAL RECIPES

Create 10 genuinely complete Recipes:

1. Japanese Minimal
2. Cinematic Editorial
3. Luxury Fashion
4. Swiss Modern
5. Neo-Brutalist
6. Organic Modern
7. Typography First
8. Art Direction Studio
9. Digital Futurism
10. Warm Editorial Hospitality

Every Recipe must follow the full Universal Recipe structure.

No fake filler content.

---

# 21. DATA MODEL

Create reusable domain entities:

```text
Recipe
Style
Character
Palette
TypographyPairing
LayoutPattern
HeroPattern
MediaPattern
MotionPattern
ComponentPattern
Resource
Reference
AssetRequirement
BuildAdapter
User
SavedRecipe
Purchase
```

Use relationships between entities.

Do not hardcode Recipes directly into page components.

---

# 22. MVP ROUTES

Build the actual product:

```text
/
 /explore
 /create
 /result/[id]
 /recipe/[slug]
 /resources
 /saved
 /pricing
 /login
 /signup
 /account
```

Keep future functionality out of the MVP unless required by the core architecture.

---

# 23. MONETIZATION

Start with a one-time purchase model.

Free:

* explore
* previews
* limited recipe access

Paid:

* complete Recipe
* complete Asset Checklist
* resources
* references
* implementation
* AI Build Package
* relevant Claude Code skills

Keep the billing architecture flexible enough to support a future subscription.

---

# 24. RESPONSIVE + PERFORMANCE

Mobile must be intentionally designed.

Do not simply scale the desktop layout down.

Adapt:

* layout
* typography
* motion
* media
* interactions

Support reduced motion.

Prioritize:

* image optimization
* lazy loading
* efficient animation
* minimal unnecessary JavaScript
* smooth interactions
* fast initial rendering

---

# 25. IMPORTANT PRODUCT RULES

### Rule 1

Do not confuse beauty with decoration.

### Rule 2

Do not confuse Recipe with Prompt.

### Rule 3

Do not force technical terminology on users.

### Rule 4

Do not block users because they lack assets.

### Rule 5

Do not invent random design decisions when curated knowledge can be used.

### Rule 6

Do not sacrifice usability for visual effects.

### Rule 7

Do not optimize for content quantity.

Optimize for:

> **better decisions → better recipes → better websites**

---

# 26. BEFORE IMPLEMENTATION

First inspect the repository and current project structure.

Then briefly explain:

1. product architecture
2. visual direction
3. questionnaire flow
4. Recipe architecture
5. AI adapter architecture
6. homepage storytelling

Then implement.

Do not stop at a static mockup.

---

# 27. DEFINITION OF DONE

A real user must be able to:

```text
Enter OpusKit
↓
Understand the product
↓
Create a Recipe
↓
Make visual decisions
↓
Customize important choices
↓
Understand asset requirements
↓
Use temporary or real assets
↓
Receive a complete Universal Recipe
↓
Understand Why It Works
↓
Explore Resources and References
↓
Select an AI tool
↓
Receive a tool-specific Build Package
↓
Use that package to build the website
```

The final product should feel like:

> **a premium design studio + design knowledge base + recipe system + AI development bridge.**

It should NOT feel like another generic AI SaaS product.

Build the product, not just the interface.
