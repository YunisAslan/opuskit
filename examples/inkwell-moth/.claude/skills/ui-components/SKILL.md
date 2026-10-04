---
name: ui-components
description: "Builds every control and form for Inkwell & Moth — Scrapbook Portfolio from shadcn/ui, themed to the recipe: button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, form, input, textarea, label, dialog, carousel, select, checkbox, accordion. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu form input textarea label dialog carousel select checkbox accordion
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #F7EEC0; --foreground: #16204A;
  --card: #FBF6DB; --card-foreground: #16204A; --popover: #FBF6DB; --popover-foreground: #16204A;
  --primary: #2336A8; --primary-foreground: #F7EEC0; --secondary: #EADFAA; --secondary-foreground: #16204A;
  --muted: #FBF6DB; --muted-foreground: #5A5A52; --accent: #EADFAA; --accent-foreground: #16204A;
  --border: #E4D9A0; --input: #5A5A52; --ring: #16204A; --radius: 0px;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page
- **Toast messages** (`sonner`): every page
- **Tooltip** (`tooltip`): every page
- **Navigation menu** (`navigation-menu`): navigation
- **Dropdown menu** (`dropdown-menu`): navigation
- **Form with validation** (`form`): main action — get in touch, Home — Closing CTA, Books — Closing CTA, About — Closing CTA, Commissions, Commissions — Closing CTA
- **Text field** (`input`): main action — get in touch, Home — Closing CTA, Books — Closing CTA, About — Closing CTA, Commissions, Commissions — Closing CTA
- **Message field** (`textarea`): main action — get in touch, Home — Closing CTA, Books — Closing CTA, About — Closing CTA, Commissions, Commissions — Closing CTA
- **Label** (`label`): main action — get in touch, Home — Closing CTA, Books — Closing CTA, About — Closing CTA, Commissions, Commissions — Closing CTA
- **Dialog** (`dialog`): Home — Gallery, Books — Gallery
- **Carousel** (`carousel`): Home — Gallery, Books — Gallery
- **Select** (`select`): Home — Closing CTA, Books — Closing CTA, About — Closing CTA, Commissions, Commissions — Closing CTA
- **Checkbox** (`checkbox`): Home — Closing CTA, Books — Closing CTA, About — Closing CTA, Commissions, Commissions — Closing CTA
- **Accordion** (`accordion`): Commissions — FAQ

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Restyle, don't ship the demo look: recipe fonts, sharp shape (buttons 0px, cards 0px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
