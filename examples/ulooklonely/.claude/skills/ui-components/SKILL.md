---
name: ui-components
description: "Builds every control and form for ulooklonely — Film-inspired Portfolio from shadcn/ui, themed to the recipe: button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, badge, pagination, input, checkbox, form, label, input-otp, textarea, select. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu badge pagination input checkbox form label input-otp textarea select
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #B6DADA; --foreground: #101010;
  --card: #F4F4F4; --card-foreground: #101010; --popover: #F4F4F4; --popover-foreground: #101010;
  --primary: #101010; --primary-foreground: #B6DADA; --secondary: #9CCACA; --secondary-foreground: #101010;
  --muted: #F4F4F4; --muted-foreground: #324545; --accent: #9CCACA; --accent-foreground: #101010;
  --border: #8DBABA; --input: #324545; --ring: #101010; --radius: 0px;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page
- **Toast messages** (`sonner`): every page
- **Tooltip** (`tooltip`): every page
- **Navigation menu** (`navigation-menu`): navigation
- **Dropdown menu** (`dropdown-menu`): navigation
- **Badge** (`badge`): Home — Journal
- **Pagination** (`pagination`): Home — Journal
- **Text field** (`input`): Sign In, Sign Up, Services — Closing CTA
- **Checkbox** (`checkbox`): Sign In, Sign Up, Services — Closing CTA
- **Form with validation** (`form`): Sign In, Sign Up, Services — Closing CTA
- **Label** (`label`): Sign In, Sign Up, Services — Closing CTA
- **One-time code** (`input-otp`): Sign Up
- **Message field** (`textarea`): Services — Closing CTA
- **Select** (`select`): Services — Closing CTA

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Restyle, don't ship the demo look: recipe fonts, bold outline shape (buttons 0px, cards 0px), 2px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
