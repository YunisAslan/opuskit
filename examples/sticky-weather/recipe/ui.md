## UI Components — shadcn/ui (Radix primitives)

Every control and form uses these ready-made, accessible components (https://ui.shadcn.com/docs/components), restyled to this recipe. Users expect polished fields — no unstyled browser defaults.

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu form input textarea label badge pagination select checkbox dialog carousel
```

| Component | Used on |
|---|---|
| Button (`button`) | every page |
| Slide-in panel (`sheet`) | every page |
| Toast messages (`sonner`) | every page |
| Tooltip (`tooltip`) | every page |
| Navigation menu (`navigation-menu`) | navigation |
| Dropdown menu (`dropdown-menu`) | navigation |
| Form with validation (`form`) | main action — get in touch, Home — Closing CTA, Practice — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA |
| Text field (`input`) | main action — get in touch, Home — Closing CTA, Practice — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA |
| Message field (`textarea`) | main action — get in touch, Home — Closing CTA, Practice — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA |
| Label (`label`) | main action — get in touch, Home — Closing CTA, Practice — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA |
| Badge (`badge`) | Home — Journal |
| Pagination (`pagination`) | Home — Journal |
| Select (`select`) | Home — Closing CTA, Practice — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA |
| Checkbox (`checkbox`) | Home — Closing CTA, Practice — Closing CTA, About — Closing CTA, Contact, Contact — Closing CTA |
| Dialog (`dialog`) | Practice — Gallery |
| Carousel (`carousel`) | Practice — Gallery |

### Theme (paste over the :root values shadcn init writes)

```css
:root {
  --background: #FF8FC7; --foreground: #2A0A1F;
  --card: #FFB0D7; --card-foreground: #2A0A1F; --popover: #FFB0D7; --popover-foreground: #2A0A1F;
  --primary: #2A0A1F; --primary-foreground: #FF8FC7; --secondary: #F27AB6; --secondary-foreground: #2A0A1F;
  --muted: #FFB0D7; --muted-foreground: #5A1A40; --accent: #F27AB6; --accent-foreground: #2A0A1F;
  --border: #EE76B3; --input: #5A1A40; --ring: #2A0A1F; --radius: 0px;
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
