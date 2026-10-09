---
name: ui-components
description: "Builds every control and form for Pip & Kiln — Cheeky Playful Pop Store from shadcn/ui, themed to the recipe: button, sheet, sonner, radio-group, select, toggle-group, card, badge, input, form, label, accordion, carousel, breadcrumb, table, separator, checkbox, dialog, calendar, popover, textarea. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner radio-group select toggle-group card badge input form label accordion carousel breadcrumb table separator checkbox dialog calendar popover textarea
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #FFDE47; --foreground: #1A1600;
  --card: #FFEB8F; --card-foreground: #1A1600; --popover: #FFEB8F; --popover-foreground: #1A1600;
  --primary: #1A1600; --primary-foreground: #FFDE47; --secondary: #F2CF2E; --secondary-foreground: #1A1600;
  --muted: #FFEB8F; --muted-foreground: #4A4010; --accent: #F2CF2E; --accent-foreground: #1A1600;
  --border: #E0C230; --input: #4A4010; --ring: #1A1600; --radius: 1rem;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page, main action — buy something
- **Toast messages** (`sonner`): every page
- **Option picker** (`radio-group`): main action — buy something, Shop — Product Highlight, Product, Product — Product Highlight, Checkout
- **Select** (`select`): main action — buy something, Home — Product Grid, Shop, Shop — Product Grid, Shop — Product Highlight, Product, Product — Product Highlight, Product — Product Grid, Cart — Product Grid, Checkout, Workshops — Reservation
- **Filter chips** (`toggle-group`): Home — Product Grid, Home — Collection, Shop, Shop — Product Grid, Shop — Collection, Product — Product Grid, Cart — Product Grid
- **Card** (`card`): Home — Product Grid, Shop — Product Grid, Product — Product Grid, Cart — Product Grid, Workshops — Pricing
- **Badge** (`badge`): Home — Product Grid, Home — Collection, Shop — Product Grid, Shop — Product Highlight, Shop — Collection, Product — Product Highlight, Product — Product Grid, Cart — Product Grid, Workshops — Pricing
- **Text field** (`input`): Home — Newsletter, Cart, Checkout, Workshops — Reservation
- **Form with validation** (`form`): Home — Newsletter, Checkout, Workshops — Reservation
- **Label** (`label`): Home — Newsletter, Checkout, Workshops — Reservation
- **Accordion** (`accordion`): Shop — FAQ, Product, Product — FAQ, Workshops — FAQ
- **Carousel** (`carousel`): Product, Workshops — Gallery
- **Breadcrumb** (`breadcrumb`): Product
- **Table** (`table`): Cart
- **Separator** (`separator`): Cart, Checkout
- **Checkbox** (`checkbox`): Checkout
- **Dialog** (`dialog`): Workshops — Gallery
- **Calendar** (`calendar`): Workshops — Reservation
- **Popover** (`popover`): Workshops — Reservation
- **Message field** (`textarea`): Workshops — Reservation

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and counts (people, sessions) are a Select.
- Forms use Form (react-hook-form + zod) with inline errors under each field, in --color-error.
- Where a form goes: nothing is connected unless the owner names a service. A contact, booking or enquiry form opens the visitor’s email app with every field filled in (mailto: to the address in the copy deck) and says so on screen; a newsletter field does the same. Sign in / Sign up without an account service check their fields, then say plainly that accounts are not open yet and give the email. Never fake a sent message, a booking or a login.
- Install only the components below; a component listed for a part the site no longer has is left out, not shipped unused.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Button text uses the recipe’s type roles, never shadcn’s own text-sm / font-medium; a button beside links (the menu’s action) is set exactly like them — same role, size and width — so the row reads as one.
- Restyle, don't ship the demo look: recipe fonts, pill shape (buttons 999px, cards 32px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
- Open and close as tokens.css says: popovers, dropdowns and selects scale from 0.95 with opacity out of their trigger (keep shadcn’s origin-(--radix-…-transform-origin) classes) in --duration-menu on --ease-out; dialogs stay centred (--duration-dialog); sheets slide on --ease-drawer (--duration-sheet); an exit leaves the way it came, never slower; toasts are sonner.
