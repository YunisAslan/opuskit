## UI Components — shadcn/ui (Radix primitives)

Every control and form uses these ready-made, accessible components (https://ui.shadcn.com/docs/components), restyled to this recipe. Users expect polished fields — no unstyled browser defaults.

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu calendar popover select form label accordion input textarea tabs card dialog carousel command checkbox
```

| Component | Used on |
|---|---|
| Button (`button`) | every page |
| Slide-in panel (`sheet`) | every page |
| Toast messages (`sonner`) | every page |
| Tooltip (`tooltip`) | every page |
| Navigation menu (`navigation-menu`) | navigation |
| Dropdown menu (`dropdown-menu`) | navigation |
| Calendar (`calendar`) | main action — book or reserve, Home — Reservation, RSVP, RSVP — Reservation |
| Popover (`popover`) | main action — book or reserve, Home — Reservation, RSVP, RSVP — Reservation |
| Select (`select`) | main action — book or reserve, Home — Reservation, RSVP, RSVP — Reservation, FAQ — Closing CTA |
| Form with validation (`form`) | main action — book or reserve, Home — Reservation, RSVP, RSVP — Reservation, FAQ — Closing CTA |
| Label (`label`) | main action — book or reserve, Home — Reservation, RSVP, RSVP — Reservation, FAQ — Closing CTA |
| Accordion (`accordion`) | Home — FAQ, RSVP — FAQ, Venue & travel — FAQ, FAQ, FAQ — FAQ |
| Text field (`input`) | Home — Reservation, RSVP, RSVP — Reservation, FAQ — Closing CTA |
| Message field (`textarea`) | Home — Reservation, RSVP — Reservation, FAQ — Closing CTA |
| Tabs (`tabs`) | Venue & travel |
| Card (`card`) | Venue & travel |
| Dialog (`dialog`) | Venue & travel — Gallery |
| Carousel (`carousel`) | Venue & travel — Gallery |
| Search box (`command`) | FAQ |
| Checkbox (`checkbox`) | FAQ — Closing CTA |

### Theme (paste over the :root values shadcn init writes)

```css
:root {
  --background: #303030; --foreground: #F5F2EC;
  --card: #3A3A3A; --card-foreground: #F5F2EC; --popover: #3A3A3A; --popover-foreground: #F5F2EC;
  --primary: #F5F2EC; --primary-foreground: #303030; --secondary: #444444; --secondary-foreground: #F5F2EC;
  --muted: #3A3A3A; --muted-foreground: #B5B0A8; --accent: #444444; --accent-foreground: #F5F2EC;
  --border: #4A4A4A; --input: #B5B0A8; --ring: #F5F2EC; --radius: 0px;
}
```

### Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Restyle, don't ship the demo look: recipe fonts, sharp shape (buttons 0px, cards 0px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
