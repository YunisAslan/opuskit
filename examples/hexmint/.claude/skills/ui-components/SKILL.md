---
name: ui-components
description: "Builds every control and form for Hexmint — Digital Futurism Software Site from shadcn/ui, themed to the recipe: button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, form, input, input-otp, label, card, tabs, textarea, select, checkbox, radio-group, badge, switch, table, accordion, command. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu form input input-otp label card tabs textarea select checkbox radio-group badge switch table accordion command
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #11254B; --foreground: #F1F3F8;
  --card: #1B315B; --card-foreground: #F1F3F8; --popover: #1B315B; --popover-foreground: #F1F3F8;
  --primary: #F1F3F8; --primary-foreground: #11254B; --secondary: #253C67; --secondary-foreground: #F1F3F8;
  --muted: #1B315B; --muted-foreground: #A7B2C8; --accent: #253C67; --accent-foreground: #F1F3F8;
  --border: #34497A; --input: #A7B2C8; --ring: #F1F3F8; --radius: 24px;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page
- **Toast messages** (`sonner`): every page
- **Tooltip** (`tooltip`): every page
- **Navigation menu** (`navigation-menu`): navigation
- **Dropdown menu** (`dropdown-menu`): navigation
- **Form with validation** (`form`): main action — sign up or start a trial, Home — Closing CTA, Features — Closing CTA, Pricing — Closing CTA, FAQ — Closing CTA
- **Text field** (`input`): main action — sign up or start a trial, Home — Closing CTA, Features — Closing CTA, Pricing — Closing CTA, FAQ — Closing CTA
- **One-time code** (`input-otp`): main action — sign up or start a trial
- **Label** (`label`): main action — sign up or start a trial, Home — Closing CTA, Features — Closing CTA, Pricing — Closing CTA, FAQ — Closing CTA
- **Card** (`card`): Home — Features, Features — Features, Pricing, Pricing — Pricing
- **Tabs** (`tabs`): Home — Features, Features — Features, Pricing, Pricing — Pricing
- **Message field** (`textarea`): Home — Closing CTA, Features — Closing CTA, Pricing — Closing CTA, FAQ — Closing CTA
- **Select** (`select`): Home — Closing CTA, Features — Product Highlight, Features — Closing CTA, Pricing — Closing CTA, FAQ — Closing CTA
- **Checkbox** (`checkbox`): Home — Closing CTA, Features — Closing CTA, Pricing — Closing CTA, FAQ — Closing CTA
- **Option picker** (`radio-group`): Features — Product Highlight
- **Badge** (`badge`): Features — Product Highlight, Pricing — Pricing
- **Switch** (`switch`): Pricing, Pricing — Pricing
- **Table** (`table`): Pricing
- **Accordion** (`accordion`): Pricing — FAQ, FAQ, FAQ — FAQ
- **Search box** (`command`): FAQ

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Restyle, don't ship the demo look: recipe fonts, round shape (buttons 14px, cards 24px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
