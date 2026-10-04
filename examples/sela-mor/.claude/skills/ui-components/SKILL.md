---
name: ui-components
description: "Builds every control and form for Sela Mor — Monochrome Minimal Personal Site from shadcn/ui, themed to the recipe: button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, form, input, textarea, label, dialog, carousel, select, checkbox. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu form input textarea label dialog carousel select checkbox
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #000000; --foreground: #FFFFFF;
  --card: #141414; --card-foreground: #FFFFFF; --popover: #141414; --popover-foreground: #FFFFFF;
  --primary: #FFFFFF; --primary-foreground: #000000; --secondary: #262626; --secondary-foreground: #FFFFFF;
  --muted: #141414; --muted-foreground: #A3A3A3; --accent: #262626; --accent-foreground: #FFFFFF;
  --border: #333333; --input: #A3A3A3; --ring: #FFFFFF; --radius: 6px;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page
- **Toast messages** (`sonner`): every page
- **Tooltip** (`tooltip`): every page
- **Navigation menu** (`navigation-menu`): navigation
- **Dropdown menu** (`dropdown-menu`): navigation
- **Form with validation** (`form`): main action — get in touch, Home — Newsletter, Listen — Closing CTA, Live — Newsletter, About — Closing CTA, Contact, Contact — Closing CTA
- **Text field** (`input`): main action — get in touch, Home — Newsletter, Listen — Closing CTA, Live — Newsletter, About — Closing CTA, Contact, Contact — Closing CTA
- **Message field** (`textarea`): main action — get in touch, Listen — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA
- **Label** (`label`): main action — get in touch, Home — Newsletter, Listen — Closing CTA, Live — Newsletter, About — Closing CTA, Contact, Contact — Closing CTA
- **Dialog** (`dialog`): Works — Gallery
- **Carousel** (`carousel`): Works — Gallery
- **Select** (`select`): Listen — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA
- **Checkbox** (`checkbox`): Listen — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Restyle, don't ship the demo look: recipe fonts, hairline shape (buttons 4px, cards 6px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
