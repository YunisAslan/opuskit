## UI Components — shadcn/ui (Radix primitives)

Every control and form uses these ready-made, accessible components (https://ui.shadcn.com/docs/components), restyled to this recipe. Users expect polished fields — no unstyled browser defaults.

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu calendar popover select form label tabs switch card badge input textarea accordion command checkbox
```

| Component | Used on |
|---|---|
| Button (`button`) | every page |
| Slide-in panel (`sheet`) | every page |
| Toast messages (`sonner`) | every page |
| Tooltip (`tooltip`) | every page |
| Navigation menu (`navigation-menu`) | navigation |
| Dropdown menu (`dropdown-menu`) | navigation |
| Calendar (`calendar`) | main action — book or reserve, Home — Reservation, Book an appointment, Book an appointment — Reservation |
| Popover (`popover`) | main action — book or reserve, Home — Reservation, Book an appointment, Book an appointment — Reservation |
| Select (`select`) | main action — book or reserve, Home — Reservation, Book an appointment, Book an appointment — Reservation, FAQ — Closing CTA |
| Form with validation (`form`) | main action — book or reserve, Home — Reservation, Book an appointment, Book an appointment — Reservation, FAQ — Closing CTA |
| Label (`label`) | main action — book or reserve, Home — Reservation, Book an appointment, Book an appointment — Reservation, FAQ — Closing CTA |
| Tabs (`tabs`) | Home — Pricing, Treatments — Pricing |
| Switch (`switch`) | Home — Pricing, Treatments — Pricing |
| Card (`card`) | Home — Pricing, Treatments — Pricing |
| Badge (`badge`) | Home — Pricing, Treatments — Pricing |
| Text field (`input`) | Home — Reservation, Book an appointment, Book an appointment — Reservation, FAQ — Closing CTA |
| Message field (`textarea`) | Home — Reservation, Book an appointment — Reservation, FAQ — Closing CTA |
| Accordion (`accordion`) | Treatments — FAQ, Book an appointment — FAQ, FAQ, FAQ — FAQ |
| Search box (`command`) | FAQ |
| Checkbox (`checkbox`) | FAQ — Closing CTA |

### Theme (paste over the :root values shadcn init writes)

```css
:root {
  --background: #EACDC3; --foreground: #1D2B4F;
  --card: #F4DFD8; --card-foreground: #1D2B4F; --popover: #F4DFD8; --popover-foreground: #1D2B4F;
  --primary: #1D2B4F; --primary-foreground: #EACDC3; --secondary: #E5BDAF; --secondary-foreground: #1D2B4F;
  --muted: #F4DFD8; --muted-foreground: #5A4A55; --accent: #E5BDAF; --accent-foreground: #1D2B4F;
  --border: #D8B5A8; --input: #5A4A55; --ring: #1D2B4F; --radius: 12px;
}
```

### Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Restyle, don't ship the demo look: recipe fonts, soft shape (buttons 8px, cards 12px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
