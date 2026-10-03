---
name: ui-components
description: "Builds every control and form for Saint Ashe — Gothic Modern Fashion House from shadcn/ui, themed to the recipe: button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, radio-group, select, toggle-group, badge, card, pagination, input, form, label, carousel, textarea, checkbox, accordion. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu radio-group select toggle-group badge card pagination input form label carousel textarea checkbox accordion
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #6E1E4A; --foreground: #FFF0F6;
  --card: #7C2A57; --card-foreground: #FFF0F6; --popover: #7C2A57; --popover-foreground: #FFF0F6;
  --primary: #FFF0F6; --primary-foreground: #6E1E4A; --secondary: #852F5F; --secondary-foreground: #FFF0F6;
  --muted: #7C2A57; --muted-foreground: #E3B9CD; --accent: #852F5F; --accent-foreground: #FFF0F6;
  --border: #8A3A66; --input: #E3B9CD; --ring: #FFF0F6; --radius: 0px;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page, main action — buy something
- **Toast messages** (`sonner`): every page
- **Tooltip** (`tooltip`): every page
- **Navigation menu** (`navigation-menu`): navigation
- **Dropdown menu** (`dropdown-menu`): navigation
- **Option picker** (`radio-group`): main action — buy something
- **Select** (`select`): main action — buy something, Home — Product Grid, Collections — Product Grid, Contact, Contact — Closing CTA
- **Filter chips** (`toggle-group`): Home — Collection, Home — Product Grid, Collections — Collection, Collections — Product Grid
- **Badge** (`badge`): Home — Collection, Home — Product Grid, Home — Journal, Collections — Collection, Collections — Product Grid
- **Card** (`card`): Home — Product Grid, Collections — Product Grid
- **Pagination** (`pagination`): Home — Journal
- **Text field** (`input`): Home — Newsletter, Contact, Contact — Closing CTA
- **Form with validation** (`form`): Home — Newsletter, Contact, Contact — Closing CTA
- **Label** (`label`): Home — Newsletter, Contact, Contact — Closing CTA
- **Carousel** (`carousel`): Collections — Lookbook
- **Message field** (`textarea`): Contact, Contact — Closing CTA
- **Checkbox** (`checkbox`): Contact, Contact — Closing CTA
- **Accordion** (`accordion`): Contact — FAQ

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Restyle, don't ship the demo look: recipe fonts, sharp shape (buttons 0px, cards 0px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
