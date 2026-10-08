## UI Components — shadcn/ui (Radix primitives)

Every control and form uses these ready-made, accessible components (https://ui.shadcn.com/docs/components), restyled to this recipe. Users expect polished fields — no unstyled browser defaults.

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner form input textarea select checkbox label tabs switch card badge accordion table command
```

| Component | Used on |
|---|---|
| Button (`button`) | every page |
| Slide-in panel (`sheet`) | every page |
| Toast messages (`sonner`) | every page |
| Form with validation (`form`) | main action — apply or enrol |
| Text field (`input`) | main action — apply or enrol |
| Message field (`textarea`) | main action — apply or enrol |
| Select (`select`) | main action — apply or enrol |
| Checkbox (`checkbox`) | main action — apply or enrol |
| Label (`label`) | main action — apply or enrol |
| Tabs (`tabs`) | Home — monthly or yearly, Enrol — monthly or yearly |
| Switch (`switch`) | Home — monthly or yearly, Enrol — monthly or yearly |
| Card (`card`) | Home — Pricing, Enrol, Enrol — Pricing |
| Badge (`badge`) | Home — Pricing, Enrol — Pricing |
| Accordion (`accordion`) | Home — FAQ, Curriculum — FAQ, Enrol — FAQ, FAQ, FAQ — FAQ |
| Table (`table`) | Enrol |
| Search box (`command`) | FAQ |

### Theme (paste over the :root values shadcn init writes)

```css
:root {
  --background: #1F35D6; --foreground: #FFFFFF;
  --card: #2A43E6; --card-foreground: #FFFFFF; --popover: #2A43E6; --popover-foreground: #FFFFFF;
  --primary: #FFFFFF; --primary-foreground: #1F35D6; --secondary: #1428A8; --secondary-foreground: #FFFFFF;
  --muted: #2A43E6; --muted-foreground: #C9D0FF; --accent: #1428A8; --accent-foreground: #FFFFFF;
  --border: #4B5DEB; --input: #C9D0FF; --ring: #FFFFFF; --radius: 0px;
}
```

### Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
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
