## UI Components — shadcn/ui (Radix primitives)

Every control and form uses these ready-made, accessible components (https://ui.shadcn.com/docs/components), restyled to this recipe. Users expect polished fields — no unstyled browser defaults.

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu form input badge pagination label
```

| Component | Used on |
|---|---|
| Button (`button`) | every page |
| Slide-in panel (`sheet`) | every page |
| Toast messages (`sonner`) | every page |
| Tooltip (`tooltip`) | every page |
| Navigation menu (`navigation-menu`) | navigation |
| Dropdown menu (`dropdown-menu`) | navigation |
| Form with validation (`form`) | main action — subscribe, Home — Newsletter, Newsletter, Newsletter — Newsletter, Article — Newsletter |
| Text field (`input`) | main action — subscribe, Home — Newsletter, Newsletter, Newsletter — Newsletter, Article — Newsletter |
| Badge (`badge`) | Home — Journal, Articles — Journal, Newsletter — Journal, Article — Journal |
| Pagination (`pagination`) | Home — Journal, Articles — Journal, Newsletter — Journal, Article — Journal |
| Label (`label`) | Home — Newsletter, Newsletter — Newsletter, Article — Newsletter |

### Theme (paste over the :root values shadcn init writes)

```css
:root {
  --background: #8C0F1E; --foreground: #FFF1F2;
  --card: #9E1A2A; --card-foreground: #FFF1F2; --popover: #9E1A2A; --popover-foreground: #FFF1F2;
  --primary: #FFF1F2; --primary-foreground: #8C0F1E; --secondary: #A8283A; --secondary-foreground: #FFF1F2;
  --muted: #9E1A2A; --muted-foreground: #F5C2C8; --accent: #A8283A; --accent-foreground: #FFF1F2;
  --border: #B23A4A; --input: #F5C2C8; --ring: #FFF1F2; --radius: 0px;
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
