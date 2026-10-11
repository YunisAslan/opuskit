## UI Components — shadcn/ui (Radix primitives)

Every control and form uses these ready-made, accessible components (https://ui.shadcn.com/docs/components), restyled to this recipe. Users expect polished fields — no unstyled browser defaults.

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner form input textarea label dialog carousel select checkbox accordion
```

| Component | Used on |
|---|---|
| Button (`button`) | every page |
| Slide-in panel (`sheet`) | every page |
| Toast messages (`sonner`) | every page |
| Form with validation (`form`) | main action — get in touch, Contact |
| Text field (`input`) | main action — get in touch, Contact |
| Message field (`textarea`) | main action — get in touch, Contact |
| Label (`label`) | main action — get in touch, Contact |
| Dialog (`dialog`) | Project — Gallery |
| Carousel (`carousel`) | Project — Gallery |
| Select (`select`) | Contact |
| Checkbox (`checkbox`) | Contact |
| Accordion (`accordion`) | Contact — FAQ |

### Theme (paste over the :root values shadcn init writes)

```css
:root {
  --background: #DAD8DB; --foreground: #0D0D0F;
  --card: #E9E8EA; --card-foreground: #0D0D0F; --popover: #E9E8EA; --popover-foreground: #0D0D0F;
  --primary: #0D0D0F; --primary-foreground: #DAD8DB; --secondary: #CDCBCF; --secondary-foreground: #0D0D0F;
  --muted: #E9E8EA; --muted-foreground: #4A484D; --accent: #CDCBCF; --accent-foreground: #0D0D0F;
  --border: #C0BEC3; --input: #4A484D; --ring: #0D0D0F; --radius: 6px;
}
```

### Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Forms use Form (react-hook-form + zod) with inline errors under each field, in --color-error.
- Where a form goes: nothing is connected unless the owner names a service. A contact, booking or enquiry form opens the visitor’s email app with every field filled in (mailto: to the address in the copy deck) and says so on screen; a newsletter field does the same. Sign in / Sign up without an account service check their fields, then say plainly that accounts are not open yet and give the email. Never fake a sent message, a booking or a login.
- Install only the components below; a component listed for a part the site no longer has is left out, not shipped unused.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Button text uses the recipe’s type roles, never shadcn’s own text-sm / font-medium; a button beside links (the menu’s action) is set exactly like them — same role, size and width — so the row reads as one.
- Restyle, don't ship the demo look: recipe fonts, hairline shape (buttons 4px, cards 6px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
- Open and close as tokens.css says: popovers, dropdowns and selects scale from 0.95 with opacity out of their trigger (keep shadcn’s origin-(--radix-…-transform-origin) classes) in --duration-menu on --ease-out; dialogs stay centred (--duration-dialog); sheets slide on --ease-drawer (--duration-sheet); an exit leaves the way it came, never slower; toasts are sonner.
