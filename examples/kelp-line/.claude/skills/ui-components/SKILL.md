---
name: ui-components
description: "Builds every control and form for Kelp Line — Warm Coastal Calm Foundation from shadcn/ui, themed to the recipe: button, sheet, sonner, toggle-group, input, form, label, badge, dialog, carousel, accordion, textarea, select, checkbox. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner toggle-group input form label badge dialog carousel accordion textarea select checkbox
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #0F3F2E; --foreground: #EEF3EC;
  --card: #1E4C3A; --card-foreground: #EEF3EC; --popover: #1E4C3A; --popover-foreground: #EEF3EC;
  --primary: #EEF3EC; --primary-foreground: #0F3F2E; --secondary: #2A5A47; --secondary-foreground: #EEF3EC;
  --muted: #1E4C3A; --muted-foreground: #A9C2B5; --accent: #2A5A47; --accent-foreground: #EEF3EC;
  --border: #386652; --input: #A9C2B5; --ring: #EEF3EC; --radius: 12px;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page
- **Toast messages** (`sonner`): every page
- **Filter chips** (`toggle-group`): main action — donate or support, Donate, Donate — Donate
- **Text field** (`input`): main action — donate or support, Home — Newsletter, Donate, Donate — Donate, Contact
- **Form with validation** (`form`): main action — donate or support, Home — Newsletter, Donate, Donate — Donate, Contact
- **Label** (`label`): main action — donate or support, Home — Newsletter, Donate, Donate — Donate, Contact
- **Badge** (`badge`): Home — Journal
- **Dialog** (`dialog`): Stories — Gallery
- **Carousel** (`carousel`): Stories — Gallery
- **Accordion** (`accordion`): Donate — FAQ
- **Message field** (`textarea`): Contact
- **Select** (`select`): Contact
- **Checkbox** (`checkbox`): Contact

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Forms use Form (react-hook-form + zod) with inline errors under each field, in --color-error.
- Where a form goes: nothing is connected unless the owner names a service. A contact, booking or enquiry form opens the visitor’s email app with every field filled in (mailto: to the address in the copy deck) and says so on screen; a newsletter field does the same. Sign in / Sign up without an account service check their fields, then say plainly that accounts are not open yet and give the email. Never fake a sent message, a booking or a login.
- Install only the components below; a component listed for a part the site no longer has is left out, not shipped unused.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Button text uses the recipe’s type roles, never shadcn’s own text-sm / font-medium; a button beside links (the menu’s action) is set exactly like them — same role, size and width — so the row reads as one.
- Restyle, don't ship the demo look: recipe fonts, soft shape (buttons 8px, cards 12px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
- Open and close as tokens.css says: popovers, dropdowns and selects scale from 0.95 with opacity out of their trigger (keep shadcn’s origin-(--radix-…-transform-origin) classes) in --duration-menu on --ease-out; dialogs stay centred (--duration-dialog); sheets slide on --ease-drawer (--duration-sheet); an exit leaves the way it came, never slower; toasts are sonner.
