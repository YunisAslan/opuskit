---
name: ui-components
description: "Builds every control and form for QUM — Warm Scandinavian Minimal Store from shadcn/ui, themed to the recipe: button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, radio-group, select, toggle-group, card, badge, pagination, input, form, label, slider, accordion, carousel, breadcrumb, table, separator, checkbox, command. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu radio-group select toggle-group card badge pagination input form label slider accordion carousel breadcrumb table separator checkbox command
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #DDEBD8; --foreground: #0E110E;
  --card: #F0F6EE; --card-foreground: #0E110E; --popover: #F0F6EE; --popover-foreground: #0E110E;
  --primary: #0E110E; --primary-foreground: #DDEBD8; --secondary: #D5DFD1; --secondary-foreground: #0E110E;
  --muted: #F0F6EE; --muted-foreground: #4B5649; --accent: #D5DFD1; --accent-foreground: #0E110E;
  --border: #C5D0C1; --input: #4B5649; --ring: #0E110E; --radius: 12px;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page, main action — buy something
- **Toast messages** (`sonner`): every page
- **Tooltip** (`tooltip`): every page
- **Navigation menu** (`navigation-menu`): navigation
- **Dropdown menu** (`dropdown-menu`): navigation
- **Option picker** (`radio-group`): main action — buy something, Product, Checkout
- **Select** (`select`): main action — buy something, Home — Product Grid, Shop, Shop — Product Grid, Product, Product — Product Grid, Cart — Product Grid, Checkout
- **Filter chips** (`toggle-group`): Home — Product Grid, Shop, Shop — Product Grid, Product — Product Grid, Cart — Product Grid
- **Card** (`card`): Home — Product Grid, Shop — Product Grid, Product — Product Grid, Cart — Product Grid
- **Badge** (`badge`): Home — Product Grid, Home — Journal, Shop — Product Grid, Product — Product Grid, Cart — Product Grid, Journal — Journal, Article, Article — Journal
- **Pagination** (`pagination`): Home — Journal, Shop, Journal — Journal, Article — Journal
- **Text field** (`input`): Home — Newsletter, Cart, Checkout, Journal — Newsletter, Article — Newsletter
- **Form with validation** (`form`): Home — Newsletter, Checkout, Journal — Newsletter, Article — Newsletter
- **Label** (`label`): Home — Newsletter, Checkout, Journal — Newsletter, Article — Newsletter
- **Range slider** (`slider`): Shop
- **Accordion** (`accordion`): Product, Product — FAQ, Help, Help — FAQ
- **Carousel** (`carousel`): Product
- **Breadcrumb** (`breadcrumb`): Product, Article
- **Table** (`table`): Cart
- **Separator** (`separator`): Cart, Checkout, Article
- **Checkbox** (`checkbox`): Checkout
- **Search box** (`command`): Help

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Restyle, don't ship the demo look: recipe fonts, soft shape (buttons 8px, cards 12px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
