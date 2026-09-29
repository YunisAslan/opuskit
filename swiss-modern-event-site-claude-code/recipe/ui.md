## UI Components — shadcn/ui (Radix primitives)

Every control and form uses these ready-made, accessible components (https://ui.shadcn.com/docs/components), restyled to this recipe. Users expect polished fields — no unstyled browser defaults.

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu calendar popover select form label input textarea tabs card accordion command dialog carousel checkbox input-otp
```

| Component | Used on |
|---|---|
| Button (`button`) | every page |
| Slide-in panel (`sheet`) | every page |
| Toast messages (`sonner`) | every page |
| Tooltip (`tooltip`) | every page |
| Navigation menu (`navigation-menu`) | navigation |
| Dropdown menu (`dropdown-menu`) | navigation |
| Calendar (`calendar`) | main action — book or reserve, RSVP, RSVP — Reservation |
| Popover (`popover`) | main action — book or reserve, RSVP, RSVP — Reservation |
| Select (`select`) | main action — book or reserve, RSVP, RSVP — Reservation, Contact, Contact — Closing CTA |
| Form with validation (`form`) | main action — book or reserve, RSVP, RSVP — Reservation, Contact, Contact — Closing CTA, Sign In, Sign Up |
| Label (`label`) | main action — book or reserve, RSVP, RSVP — Reservation, Contact, Contact — Closing CTA, Sign In, Sign Up |
| Text field (`input`) | RSVP, RSVP — Reservation, Contact, Contact — Closing CTA, Sign In, Sign Up |
| Message field (`textarea`) | RSVP — Reservation, Contact, Contact — Closing CTA |
| Tabs (`tabs`) | Venue & travel |
| Card (`card`) | Venue & travel |
| Accordion (`accordion`) | FAQ, FAQ — FAQ |
| Search box (`command`) | FAQ |
| Dialog (`dialog`) | Gallery — Gallery |
| Carousel (`carousel`) | Gallery — Gallery |
| Checkbox (`checkbox`) | Contact, Contact — Closing CTA, Sign In, Sign Up |
| One-time code (`input-otp`) | Sign Up |

### Theme (paste over the :root values shadcn init writes)

```css
:root {
  --background: #FFFFFF; --foreground: #000000;
  --card: #F1F1EF; --card-foreground: #000000; --popover: #F1F1EF; --popover-foreground: #000000;
  --primary: #000000; --primary-foreground: #FFFFFF; --secondary: #E6E6E4; --secondary-foreground: #000000;
  --muted: #F1F1EF; --muted-foreground: #5E5E5E; --accent: #E6E6E4; --accent-foreground: #000000;
  --border: #DCDCDA; --input: #5E5E5E; --ring: #000000; --radius: 0px;
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
