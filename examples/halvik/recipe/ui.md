## UI Components — shadcn/ui (Radix primitives)

Every control and form uses these ready-made, accessible components (https://ui.shadcn.com/docs/components), restyled to this recipe. Users expect polished fields — no unstyled browser defaults.

```bash
npx shadcn@latest init && npx shadcn@latest add button sheet sonner tooltip navigation-menu dropdown-menu radio-group select badge tabs switch card input textarea checkbox form label accordion
```

| Component | Used on |
|---|---|
| Button (`button`) | every page |
| Slide-in panel (`sheet`) | every page, main action — buy something |
| Toast messages (`sonner`) | every page |
| Tooltip (`tooltip`) | every page |
| Navigation menu (`navigation-menu`) | navigation |
| Dropdown menu (`dropdown-menu`) | navigation |
| Option picker (`radio-group`) | main action — buy something, Home — Product Highlight, Features — Product Highlight |
| Select (`select`) | main action — buy something, Home — Product Highlight, Home — Closing CTA, Features — Product Highlight, Features — Closing CTA, Contact, Contact — Closing CTA |
| Badge (`badge`) | Home — Product Highlight, Home — Pricing, Features — Product Highlight |
| Tabs (`tabs`) | Home — Pricing, Features — Features |
| Switch (`switch`) | Home — Pricing |
| Card (`card`) | Home — Pricing, Features — Features |
| Text field (`input`) | Home — Closing CTA, Features — Closing CTA, Contact, Contact — Closing CTA |
| Message field (`textarea`) | Home — Closing CTA, Features — Closing CTA, Contact, Contact — Closing CTA |
| Checkbox (`checkbox`) | Home — Closing CTA, Features — Closing CTA, Contact, Contact — Closing CTA |
| Form with validation (`form`) | Home — Closing CTA, Features — Closing CTA, Contact, Contact — Closing CTA |
| Label (`label`) | Home — Closing CTA, Features — Closing CTA, Contact, Contact — Closing CTA |
| Accordion (`accordion`) | Contact — FAQ |

### Theme (paste over the :root values shadcn init writes)

```css
:root {
  --background: #9D91E3; --foreground: #000000;
  --card: #B2A8EA; --card-foreground: #000000; --popover: #B2A8EA; --popover-foreground: #000000;
  --primary: #000000; --primary-foreground: #9D91E3; --secondary: #8A7DD8; --secondary-foreground: #000000;
  --muted: #B2A8EA; --muted-foreground: #1E1640; --accent: #8A7DD8; --accent-foreground: #000000;
  --border: #7D70CC; --input: #1E1640; --ring: #000000; --radius: 24px;
}
```

### Rules
- Every interactive control — select, date picker, checkbox, radio, switch, tabs, accordion, dialog, menu, toast — comes from these components. Never ship an unstyled native <select>, <input type="date"> or a hand-rolled dropdown.
- Date fields are a Calendar inside a Popover (shadcn “Date Picker” pattern); times and party sizes are a Select. Forms use Form (react-hook-form + zod) with inline errors under each field.
- After `shadcn init`, replace the :root color values it writes with the theme block below — hex values, so shadcn components and the recipe tokens always match. Do not map them back to --color-* (that makes a loop).
- Restyle, don't ship the demo look: recipe fonts, round shape (buttons 14px, cards 24px), 1px borders.
- No focus rings, glows or outlines on fields, selects, menus or their options — remove shadcn’s ring-* / outline classes. A focused field only darkens its border to the text color; a highlighted option only changes its background.
- Keep Radix accessibility intact: labels tied to fields, keyboard navigation, 44px touch targets, prefers-reduced-motion on every open/close animation.
- Mobile: Select, Popover and Dropdown open as a bottom Sheet/Drawer on screens under 640px.
