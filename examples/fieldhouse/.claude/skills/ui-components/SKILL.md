---
name: ui-components
description: "Builds every control and form for Fieldhouse — Refined Modern Heritage Studio Site from shadcn/ui, themed to the recipe: button, sheet, sonner, tooltip, navigation-menu, dropdown-menu, form, input, textarea, label, select, checkbox, dialog, carousel. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu form input textarea label select checkbox dialog carousel
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #231F1B; --foreground: #F4EFE8;
  --card: #2E2925; --card-foreground: #F4EFE8; --popover: #2E2925; --popover-foreground: #F4EFE8;
  --primary: #F4EFE8; --primary-foreground: #231F1B; --secondary: #3F3933; --secondary-foreground: #F4EFE8;
  --muted: #2E2925; --muted-foreground: #B8AFA4; --accent: #3F3933; --accent-foreground: #F4EFE8;
  --border: #4A433C; --input: #B8AFA4; --ring: #F4EFE8; --radius: 12px;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page
- **Toast messages** (`sonner`): every page
- **Tooltip** (`tooltip`): every page
- **Navigation menu** (`navigation-menu`): navigation
- **Dropdown menu** (`dropdown-menu`): navigation
- **Form with validation** (`form`): main action — get in touch, Home — Closing CTA, Contact, Contact — Closing CTA
- **Text field** (`input`): main action — get in touch, Home — Closing CTA, Contact, Contact — Closing CTA
- **Message field** (`textarea`): main action — get in touch, Home — Closing CTA, Contact, Contact — Closing CTA
- **Label** (`label`): main action — get in touch, Home — Closing CTA, Contact, Contact — Closing CTA
- **Select** (`select`): Home — Closing CTA, Contact, Contact — Closing CTA
- **Checkbox** (`checkbox`): Home — Closing CTA, Contact, Contact — Closing CTA
- **Dialog** (`dialog`): Work — Gallery, Project — Gallery
- **Carousel** (`carousel`): Work — Gallery, Project — Gallery

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Button text uses the recipe’s type roles, never shadcn’s own text-sm / font-medium; a button beside links (the menu’s action) is set exactly like them — same role, size and width — so the row reads as one.
- Restyle, don't ship the demo look: recipe fonts, soft shape (buttons 8px, cards 12px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
