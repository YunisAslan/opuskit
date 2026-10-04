## UI Components — shadcn/ui (Radix primitives)

Every control and form uses these ready-made, accessible components (https://ui.shadcn.com/docs/components), restyled to this recipe. Users expect polished fields — no unstyled browser defaults.

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu toggle-group input form label badge pagination textarea select checkbox dialog carousel tabs switch card accordion
```

| Component | Used on |
|---|---|
| Button (`button`) | every page |
| Slide-in panel (`sheet`) | every page |
| Toast messages (`sonner`) | every page |
| Tooltip (`tooltip`) | every page |
| Navigation menu (`navigation-menu`) | navigation |
| Dropdown menu (`dropdown-menu`) | navigation |
| Filter chips (`toggle-group`) | main action — donate or support |
| Text field (`input`) | main action — donate or support, Home — Newsletter, What we do — Closing CTA, Field notes — Closing CTA, Contact, Contact — Closing CTA |
| Form with validation (`form`) | main action — donate or support, Home — Newsletter, What we do — Closing CTA, Field notes — Closing CTA, Contact, Contact — Closing CTA |
| Label (`label`) | main action — donate or support, Home — Newsletter, What we do — Closing CTA, Field notes — Closing CTA, Contact, Contact — Closing CTA |
| Badge (`badge`) | Home — Journal, Donate — Pricing |
| Pagination (`pagination`) | Home — Journal |
| Message field (`textarea`) | What we do — Closing CTA, Field notes — Closing CTA, Contact, Contact — Closing CTA |
| Select (`select`) | What we do — Closing CTA, Field notes — Closing CTA, Contact, Contact — Closing CTA |
| Checkbox (`checkbox`) | What we do — Closing CTA, Field notes — Closing CTA, Contact, Contact — Closing CTA |
| Dialog (`dialog`) | Field notes — Gallery |
| Carousel (`carousel`) | Field notes — Gallery |
| Tabs (`tabs`) | Donate — Pricing |
| Switch (`switch`) | Donate — Pricing |
| Card (`card`) | Donate — Pricing |
| Accordion (`accordion`) | Donate — FAQ |

### Theme (paste over the :root values shadcn init writes)

```css
:root {
  --background: #F5C518; --foreground: #000000;
  --card: #FFD84D; --card-foreground: #000000; --popover: #FFD84D; --popover-foreground: #000000;
  --primary: #000000; --primary-foreground: #F5C518; --secondary: #E0AE00; --secondary-foreground: #000000;
  --muted: #FFD84D; --muted-foreground: #4A3B00; --accent: #E0AE00; --accent-foreground: #000000;
  --border: #000000; --input: #4A3B00; --ring: #000000; --radius: 0px;
}
```

### Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Restyle, don't ship the demo look: recipe fonts, bold outline shape (buttons 0px, cards 0px), 2px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
