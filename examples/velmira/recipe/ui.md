## UI Components — shadcn/ui (Radix primitives)

Every control and form uses these ready-made, accessible components (https://ui.shadcn.com/docs/components), restyled to this recipe. Users expect polished fields — no unstyled browser defaults.

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu calendar popover select form label toggle-group badge pagination input textarea carousel dialog accordion tabs card
```

| Component | Used on |
|---|---|
| Button (`button`) | every page |
| Slide-in panel (`sheet`) | every page |
| Toast messages (`sonner`) | every page |
| Tooltip (`tooltip`) | every page |
| Navigation menu (`navigation-menu`) | navigation |
| Dropdown menu (`dropdown-menu`) | navigation |
| Calendar (`calendar`) | main action — book or reserve, Home — Reservation, Rooms — Reservation, Book a stay, Book a stay — Reservation |
| Popover (`popover`) | main action — book or reserve, Home — Reservation, Rooms — Reservation, Book a stay, Book a stay — Reservation |
| Select (`select`) | main action — book or reserve, Home — Reservation, Rooms — Reservation, Book a stay, Book a stay — Reservation |
| Form with validation (`form`) | main action — book or reserve, Home — Reservation, Rooms — Reservation, Book a stay, Book a stay — Reservation |
| Label (`label`) | main action — book or reserve, Home — Reservation, Rooms — Reservation, Book a stay, Book a stay — Reservation |
| Filter chips (`toggle-group`) | Home — Collection, Rooms — Collection |
| Badge (`badge`) | Home — Collection, Home — Journal, Rooms — Collection |
| Pagination (`pagination`) | Home — Journal |
| Text field (`input`) | Home — Reservation, Rooms — Reservation, Book a stay, Book a stay — Reservation |
| Message field (`textarea`) | Home — Reservation, Rooms — Reservation, Book a stay — Reservation |
| Carousel (`carousel`) | Rooms — Lookbook, Gallery — Gallery |
| Dialog (`dialog`) | Gallery — Gallery |
| Accordion (`accordion`) | Book a stay — FAQ, Getting here — FAQ |
| Tabs (`tabs`) | Getting here |
| Card (`card`) | Getting here |

### Theme (paste over the :root values shadcn init writes)

```css
:root {
  --background: #271A70; --foreground: #FFFFFF;
  --card: #33246F; --card-foreground: #FFFFFF; --popover: #33246F; --popover-foreground: #FFFFFF;
  --primary: #FFFFFF; --primary-foreground: #271A70; --secondary: #33267E; --secondary-foreground: #FFFFFF;
  --muted: #33246F; --muted-foreground: #C8C3E8; --accent: #33267E; --accent-foreground: #FFFFFF;
  --border: #40338A; --input: #C8C3E8; --ring: #FFFFFF; --radius: 20px;
}
```

### Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Restyle, don't ship the demo look: recipe fonts, frosted glass shape (buttons 14px, cards 20px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
