---
name: ui-components
description: "Builds every control and form for Halden — Nocturne Dark Cinematic Practice from shadcn/ui, themed to the recipe: button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, calendar, popover, select, form, label, dialog, carousel, tabs, switch, card, badge, input, textarea, accordion, command, checkbox, input-otp. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu calendar popover select form label dialog carousel tabs switch card badge input textarea accordion command checkbox input-otp
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #181D21; --foreground: #FFFFFF;
  --card: #22282D; --card-foreground: #FFFFFF; --popover: #22282D; --popover-foreground: #FFFFFF;
  --primary: #FFFFFF; --primary-foreground: #181D21; --secondary: #2B3238; --secondary-foreground: #FFFFFF;
  --muted: #22282D; --muted-foreground: #A3ABB2; --accent: #2B3238; --accent-foreground: #FFFFFF;
  --border: #363E45; --input: #A3ABB2; --ring: #FFFFFF; --radius: 0px;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page
- **Toast messages** (`sonner`): every page
- **Tooltip** (`tooltip`): every page
- **Navigation menu** (`navigation-menu`): navigation
- **Dropdown menu** (`dropdown-menu`): navigation
- **Calendar** (`calendar`): main action — book or reserve, Home — Reservation, Visit, Visit — Reservation
- **Popover** (`popover`): main action — book or reserve, Home — Reservation, Visit, Visit — Reservation
- **Select** (`select`): main action — book or reserve, Home — Reservation, Visit, Visit — Reservation
- **Form with validation** (`form`): main action — book or reserve, Home — Reservation, Visit, Visit — Reservation, Sign In, Sign Up
- **Label** (`label`): main action — book or reserve, Home — Reservation, Visit, Visit — Reservation, Sign In, Sign Up
- **Dialog** (`dialog`): Home — Gallery
- **Carousel** (`carousel`): Home — Gallery
- **Tabs** (`tabs`): Home — Pricing, The baths — Pricing
- **Switch** (`switch`): Home — Pricing, The baths — Pricing
- **Card** (`card`): Home — Pricing, The baths — Pricing
- **Badge** (`badge`): Home — Pricing, The baths — Pricing
- **Text field** (`input`): Home — Reservation, Visit, Visit — Reservation, Sign In, Sign Up
- **Message field** (`textarea`): Home — Reservation, Visit — Reservation
- **Accordion** (`accordion`): The baths — FAQ, Visit — FAQ, FAQ, FAQ — FAQ
- **Search box** (`command`): FAQ
- **Checkbox** (`checkbox`): Sign In, Sign Up
- **One-time code** (`input-otp`): Sign Up

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Button text uses the recipe’s type roles, never shadcn’s own text-sm / font-medium; a button beside links (the menu’s action) is set exactly like them — same role, size and width — so the row reads as one.
- Restyle, don't ship the demo look: recipe fonts, sharp shape (buttons 0px, cards 0px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
