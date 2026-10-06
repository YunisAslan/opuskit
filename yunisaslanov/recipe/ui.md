## UI Components — shadcn/ui (Radix primitives)

Every control and form uses these ready-made, accessible components (https://ui.shadcn.com/docs/components), restyled to this recipe. Users expect polished fields — no unstyled browser defaults.

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu form input textarea label dialog carousel select checkbox
```

| Component | Used on |
|---|---|
| Button (`button`) | every page |
| Slide-in panel (`sheet`) | every page |
| Toast messages (`sonner`) | every page |
| Tooltip (`tooltip`) | every page |
| Navigation menu (`navigation-menu`) | navigation |
| Dropdown menu (`dropdown-menu`) | navigation |
| Form with validation (`form`) | main action — get in touch, Home — Newsletter, Contact, Contact — Closing CTA |
| Text field (`input`) | main action — get in touch, Home — Newsletter, Contact, Contact — Closing CTA |
| Message field (`textarea`) | main action — get in touch, Contact, Contact — Closing CTA |
| Label (`label`) | main action — get in touch, Home — Newsletter, Contact, Contact — Closing CTA |
| Dialog (`dialog`) | Projects — Gallery |
| Carousel (`carousel`) | Projects — Gallery |
| Select (`select`) | Contact, Contact — Closing CTA |
| Checkbox (`checkbox`) | Contact, Contact — Closing CTA |

### Theme (paste over the :root values shadcn init writes)

```css
:root {
  --background: #040404; --foreground: #EDEAE4;
  --card: #141518; --card-foreground: #EDEAE4; --popover: #141518; --popover-foreground: #EDEAE4;
  --primary: #EDEAE4; --primary-foreground: #040404; --secondary: #1F2226; --secondary-foreground: #EDEAE4;
  --muted: #141518; --muted-foreground: #9C9890; --accent: #1F2226; --accent-foreground: #EDEAE4;
  --border: #26282C; --input: #9C9890; --ring: #EDEAE4; --radius: 0px;
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
