---
name: ui-components
description: "Builds every control and form for Maison Vey — Refined Luxury Editorial Store from shadcn/ui, themed to the recipe: button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, radio-group, select, toggle-group, card, badge, input, form, label, slider, pagination, accordion, carousel, breadcrumb, table, separator, checkbox. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu radio-group select toggle-group card badge input form label slider pagination accordion carousel breadcrumb table separator checkbox
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #4A1119; --foreground: #F8ECE8;
  --card: #5A1A23; --card-foreground: #F8ECE8; --popover: #5A1A23; --popover-foreground: #F8ECE8;
  --primary: #F8ECE8; --primary-foreground: #4A1119; --secondary: #6B2530; --secondary-foreground: #F8ECE8;
  --muted: #5A1A23; --muted-foreground: #D7B5B0; --accent: #6B2530; --accent-foreground: #F8ECE8;
  --border: #6E2A34; --input: #D7B5B0; --ring: #F8ECE8; --radius: 0px;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page, main action — buy something
- **Toast messages** (`sonner`): every page
- **Tooltip** (`tooltip`): every page
- **Navigation menu** (`navigation-menu`): navigation
- **Dropdown menu** (`dropdown-menu`): navigation
- **Option picker** (`radio-group`): main action — buy something, Shop — Product Highlight, Product, Product — Product Highlight, Checkout
- **Select** (`select`): main action — buy something, Home — Product Grid, Shop, Shop — Product Grid, Shop — Product Highlight, Product, Product — Product Highlight, Product — Product Grid, Cart — Product Grid, Checkout
- **Filter chips** (`toggle-group`): Home — Product Grid, Home — Collection, Shop, Shop — Product Grid, Shop — Collection, Product — Product Grid, Cart — Product Grid
- **Card** (`card`): Home — Product Grid, Shop — Product Grid, Product — Product Grid, Cart — Product Grid
- **Badge** (`badge`): Home — Product Grid, Home — Collection, Shop — Product Grid, Shop — Product Highlight, Shop — Collection, Product — Product Highlight, Product — Product Grid, Cart — Product Grid
- **Text field** (`input`): Home — Newsletter, Cart, Checkout
- **Form with validation** (`form`): Home — Newsletter, Checkout
- **Label** (`label`): Home — Newsletter, Checkout
- **Range slider** (`slider`): Shop
- **Pagination** (`pagination`): Shop
- **Accordion** (`accordion`): Shop — FAQ, Product, Product — FAQ
- **Carousel** (`carousel`): Product
- **Breadcrumb** (`breadcrumb`): Product
- **Table** (`table`): Cart
- **Separator** (`separator`): Cart, Checkout
- **Checkbox** (`checkbox`): Checkout

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Button text uses the recipe’s type roles, never shadcn’s own text-sm / font-medium; a button beside links (the menu’s action) is set exactly like them — same role, size and width — so the row reads as one.
- Restyle, don't ship the demo look: recipe fonts, sharp shape (buttons 0px, cards 0px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
