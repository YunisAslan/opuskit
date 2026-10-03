## UI Components — shadcn/ui (Radix primitives)

Every control and form uses these ready-made, accessible components (https://ui.shadcn.com/docs/components), restyled to this recipe. Users expect polished fields — no unstyled browser defaults.

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu calendar popover select form label tabs input textarea dialog carousel accordion
```

| Component | Used on |
|---|---|
| Button (`button`) | every page |
| Slide-in panel (`sheet`) | every page |
| Toast messages (`sonner`) | every page |
| Tooltip (`tooltip`) | every page |
| Navigation menu (`navigation-menu`) | navigation |
| Dropdown menu (`dropdown-menu`) | navigation |
| Calendar (`calendar`) | main action — book or reserve, Home — Reservation, Menu — Reservation, Reservations, Reservations — Reservation |
| Popover (`popover`) | main action — book or reserve, Home — Reservation, Menu — Reservation, Reservations, Reservations — Reservation |
| Select (`select`) | main action — book or reserve, Home — Reservation, Menu — Reservation, Reservations, Reservations — Reservation |
| Form with validation (`form`) | main action — book or reserve, Home — Reservation, Menu — Reservation, Reservations, Reservations — Reservation |
| Label (`label`) | main action — book or reserve, Home — Reservation, Menu — Reservation, Reservations, Reservations — Reservation |
| Tabs (`tabs`) | Home — Menu, Menu — Menu |
| Text field (`input`) | Home — Reservation, Menu — Reservation, Reservations, Reservations — Reservation |
| Message field (`textarea`) | Home — Reservation, Menu — Reservation, Reservations — Reservation |
| Dialog (`dialog`) | Menu — Gallery |
| Carousel (`carousel`) | Menu — Gallery |
| Accordion (`accordion`) | Reservations — FAQ |

### Theme (paste over the :root values shadcn init writes)

```css
:root {
  --background: #FECD8C; --foreground: #001317;
  --card: #FFE0B5; --card-foreground: #001317; --popover: #FFE0B5; --popover-foreground: #001317;
  --primary: #001317; --primary-foreground: #FECD8C; --secondary: #F5BC6E; --secondary-foreground: #001317;
  --muted: #FFE0B5; --muted-foreground: #4A3A22; --accent: #F5BC6E; --accent-foreground: #001317;
  --border: #E5B06A; --input: #4A3A22; --ring: #001317; --radius: 12px;
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
