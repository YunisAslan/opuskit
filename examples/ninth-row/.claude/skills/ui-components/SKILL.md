---
name: ui-components
description: "Builds every control and form for Ninth Row — Nocturne Film-inspired Event Site from shadcn/ui, themed to the recipe: button, sheet, sonner, calendar, popover, select, form, label, input, textarea, card, badge, accordion, tabs. Use when adding any button, field, select, date picker, dialog, menu, tabs, accordion or toast."
---

# UI components — shadcn/ui

Read `recipe/ui.md`. Install once:

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner calendar popover select form label input textarea card badge accordion tabs
```

## Theme
Replace the :root values `shadcn init` writes with:

```css
:root {
  --background: #040404; --foreground: #EDEAE4;
  --card: #141518; --card-foreground: #EDEAE4; --popover: #141518; --popover-foreground: #EDEAE4;
  --primary: #EDEAE4; --primary-foreground: #040404; --secondary: #1F2226; --secondary-foreground: #EDEAE4;
  --muted: #141518; --muted-foreground: #9C9890; --accent: #1F2226; --accent-foreground: #EDEAE4;
  --border: #26282C; --input: #9C9890; --ring: #EDEAE4; --radius: 0px;
}
```

## Where each one goes
- **Button** (`button`): every page
- **Slide-in panel** (`sheet`): every page
- **Toast messages** (`sonner`): every page
- **Calendar** (`calendar`): main action — book or reserve, Tickets, Tickets — Reservation
- **Popover** (`popover`): main action — book or reserve, Tickets, Tickets — Reservation
- **Select** (`select`): main action — book or reserve, Tickets, Tickets — Reservation
- **Form with validation** (`form`): main action — book or reserve, Home — Newsletter, Tickets, Tickets — Reservation
- **Label** (`label`): main action — book or reserve, Home — Newsletter, Tickets, Tickets — Reservation
- **Text field** (`input`): Home — Newsletter, Tickets, Tickets — Reservation
- **Message field** (`textarea`): Tickets — Reservation
- **Card** (`card`): Tickets — Pricing, Visit
- **Badge** (`badge`): Tickets — Pricing
- **Accordion** (`accordion`): Tickets — FAQ, Visit — FAQ
- **Tabs** (`tabs`): Visit

## Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and counts (people, sessions) are a Select.
- Forms use Form (react-hook-form + zod) with inline errors under each field, in --color-error.
- Where a form goes: nothing is connected unless the owner names a service. A contact, booking or enquiry form opens the visitor’s email app with every field filled in (mailto: to the address in the copy deck) and says so on screen; a newsletter field does the same. Sign in / Sign up without an account service check their fields, then say plainly that accounts are not open yet and give the email. Never fake a sent message, a booking or a login.
- Install only the components below; a component listed for a part the site no longer has is left out, not shipped unused.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Button text uses the recipe’s type roles, never shadcn’s own text-sm / font-medium; a button beside links (the menu’s action) is set exactly like them — same role, size and width — so the row reads as one.
- Restyle, don't ship the demo look: recipe fonts, sharp shape (buttons 0px, cards 0px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
- Open and close as tokens.css says: popovers, dropdowns and selects scale from 0.95 with opacity out of their trigger (keep shadcn’s origin-(--radix-…-transform-origin) classes) in --duration-menu on --ease-out; dialogs stay centred (--duration-dialog); sheets slide on --ease-drawer (--duration-sheet); an exit leaves the way it came, never slower; toasts are sonner.
