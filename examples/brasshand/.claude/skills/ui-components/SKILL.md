---
name: ui-components
description: "Builds every control and form for Brasshand — Typography First Agency Site from shadcn/ui, themed to the recipe: button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, form, input, textarea, label, badge, pagination, select, checkbox, tabs, switch, card, accordion. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu form input textarea label badge pagination select checkbox tabs switch card accordion
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #5AA9FF; --foreground: #0A0A23;
  --card: #7FBDFF; --card-foreground: #0A0A23; --popover: #7FBDFF; --popover-foreground: #0A0A23;
  --primary: #0A0A23; --primary-foreground: #5AA9FF; --secondary: #4A98EE; --secondary-foreground: #0A0A23;
  --muted: #7FBDFF; --muted-foreground: #14204A; --accent: #4A98EE; --accent-foreground: #0A0A23;
  --border: #3F8DE6; --input: #14204A; --ring: #0A0A23; --radius: 0px;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page
- **Toast messages** (`sonner`): every page
- **Tooltip** (`tooltip`): every page
- **Navigation menu** (`navigation-menu`): navigation
- **Dropdown menu** (`dropdown-menu`): navigation
- **Form with validation** (`form`): main action — get in touch, Home — Closing CTA, Case Studies — Closing CTA, Services — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA
- **Text field** (`input`): main action — get in touch, Home — Closing CTA, Case Studies — Closing CTA, Services — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA
- **Message field** (`textarea`): main action — get in touch, Home — Closing CTA, Case Studies — Closing CTA, Services — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA
- **Label** (`label`): main action — get in touch, Home — Closing CTA, Case Studies — Closing CTA, Services — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA
- **Badge** (`badge`): Home — Journal, Services — Pricing
- **Pagination** (`pagination`): Home — Journal
- **Select** (`select`): Home — Closing CTA, Case Studies — Closing CTA, Services — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA
- **Checkbox** (`checkbox`): Home — Closing CTA, Case Studies — Closing CTA, Services — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA
- **Tabs** (`tabs`): Services — Pricing
- **Switch** (`switch`): Services — Pricing
- **Card** (`card`): Services — Pricing
- **Accordion** (`accordion`): Services — FAQ, Contact — FAQ

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Restyle, don't ship the demo look: recipe fonts, sharp shape (buttons 0px, cards 0px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
