---
name: ui-components
description: "Builds every control and form for Aster House — Architectural Minimal Property Site from shadcn/ui, themed to the recipe: button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, calendar, popover, select, form, label, toggle-group, card, badge, dialog, carousel, input, textarea, checkbox, slider, pagination, tabs, accordion, radio-group, breadcrumb. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu calendar popover select form label toggle-group card badge dialog carousel input textarea checkbox slider pagination tabs accordion radio-group breadcrumb
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #CDB58F; --foreground: #1E1A14;
  --card: #DCC8A6; --card-foreground: #1E1A14; --popover: #DCC8A6; --popover-foreground: #1E1A14;
  --primary: #1E1A14; --primary-foreground: #CDB58F; --secondary: #C0A57A; --secondary-foreground: #1E1A14;
  --muted: #DCC8A6; --muted-foreground: #4A3F2E; --accent: #C0A57A; --accent-foreground: #1E1A14;
  --border: #B39A70; --input: #4A3F2E; --ring: #1E1A14; --radius: 6px;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page
- **Toast messages** (`sonner`): every page
- **Tooltip** (`tooltip`): every page
- **Navigation menu** (`navigation-menu`): navigation
- **Dropdown menu** (`dropdown-menu`): navigation
- **Calendar** (`calendar`): main action — book or reserve
- **Popover** (`popover`): main action — book or reserve
- **Select** (`select`): main action — book or reserve, Home — Product Grid, Home — Closing CTA, Residences, Residences — Product Grid, A house, A house — Product Highlight, A house — Closing CTA, Book a viewing, Book a viewing — Closing CTA
- **Form with validation** (`form`): main action — book or reserve, Home — Closing CTA, A house — Closing CTA, Book a viewing, Book a viewing — Closing CTA
- **Label** (`label`): main action — book or reserve, Home — Closing CTA, A house — Closing CTA, Book a viewing, Book a viewing — Closing CTA
- **Filter chips** (`toggle-group`): Home — Product Grid, Residences, Residences — Product Grid
- **Card** (`card`): Home — Product Grid, Residences — Product Grid, Residences — Features
- **Badge** (`badge`): Home — Product Grid, Residences — Product Grid, A house — Product Highlight
- **Dialog** (`dialog`): Home — Gallery, A house — Gallery
- **Carousel** (`carousel`): Home — Gallery, A house, A house — Gallery
- **Text field** (`input`): Home — Closing CTA, A house — Closing CTA, Book a viewing, Book a viewing — Closing CTA
- **Message field** (`textarea`): Home — Closing CTA, A house — Closing CTA, Book a viewing, Book a viewing — Closing CTA
- **Checkbox** (`checkbox`): Home — Closing CTA, A house — Closing CTA, Book a viewing, Book a viewing — Closing CTA
- **Range slider** (`slider`): Residences
- **Pagination** (`pagination`): Residences
- **Tabs** (`tabs`): Residences — Features
- **Accordion** (`accordion`): Residences — FAQ, A house
- **Option picker** (`radio-group`): A house, A house — Product Highlight
- **Breadcrumb** (`breadcrumb`): A house

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Restyle, don't ship the demo look: recipe fonts, hairline shape (buttons 4px, cards 6px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
