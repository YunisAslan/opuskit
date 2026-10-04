---
name: ui-components
description: "Builds every control and form for Night Shift — Technical Minimal Course Site from shadcn/ui, themed to the recipe: button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, form, input, input-otp, label, tabs, switch, card, badge, accordion, textarea, select, checkbox, table, command. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu form input input-otp label tabs switch card badge accordion textarea select checkbox table command
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #040404; --foreground: #EDEAE4;
  --card: #141518; --card-foreground: #EDEAE4; --popover: #141518; --popover-foreground: #EDEAE4;
  --primary: #EDEAE4; --primary-foreground: #040404; --secondary: #1F2226; --secondary-foreground: #EDEAE4;
  --muted: #141518; --muted-foreground: #9C9890; --accent: #1F2226; --accent-foreground: #EDEAE4;
  --border: #26282C; --input: #9C9890; --ring: #EDEAE4; --radius: 6px;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page
- **Toast messages** (`sonner`): every page
- **Tooltip** (`tooltip`): every page
- **Navigation menu** (`navigation-menu`): navigation
- **Dropdown menu** (`dropdown-menu`): navigation
- **Form with validation** (`form`): main action — sign up or start a trial, Home — Closing CTA, FAQ — Closing CTA
- **Text field** (`input`): main action — sign up or start a trial, Home — Closing CTA, FAQ — Closing CTA
- **One-time code** (`input-otp`): main action — sign up or start a trial
- **Label** (`label`): main action — sign up or start a trial, Home — Closing CTA, FAQ — Closing CTA
- **Tabs** (`tabs`): Home — Pricing, Curriculum — Features, Enrol, Enrol — Pricing
- **Switch** (`switch`): Home — Pricing, Enrol, Enrol — Pricing
- **Card** (`card`): Home — Pricing, Curriculum — Features, Enrol, Enrol — Pricing
- **Badge** (`badge`): Home — Pricing, Enrol — Pricing
- **Accordion** (`accordion`): Home — FAQ, Curriculum — FAQ, Enrol — FAQ, FAQ, FAQ — FAQ
- **Message field** (`textarea`): Home — Closing CTA, FAQ — Closing CTA
- **Select** (`select`): Home — Closing CTA, FAQ — Closing CTA
- **Checkbox** (`checkbox`): Home — Closing CTA, FAQ — Closing CTA
- **Table** (`table`): Enrol
- **Search box** (`command`): FAQ

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Restyle, don't ship the demo look: recipe fonts, hairline shape (buttons 4px, cards 6px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
