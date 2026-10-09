---
name: visual-qa
description: Compares the implemented site against the Kelp Line — Warm Coastal Calm Foundation recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #0F3F2E; no other page background colors are introduced.
- [ ] Display text uses Hedvig Letters Serif 400; body uses Hedvig Letters Sans; no other families appear.
- [ ] Accent #F4A6C1 covers < 5% of any viewport.
- [ ] Pages: Home · Our mission · Programs · Stories · Donate · Contact — every page shares the same navbar and footer.
- [ ] Footer “One quiet line”: One row on the page ground above a hairline: logo left, 3–5 links centred, copyright right.
- [ ] Home section order: Hero → Timeline → Stats → Services → Editorial Story → CTA Band → Journal → Newsletter.
- [ ] Our mission section order: About → Editorial Story → Team → Stats.
- [ ] Programs section order: Services → Process → Stats → CTA Band.
- [ ] Stories section order: Testimonials → Editorial Story → Gallery.
- [ ] Donate section order: Donate → Trust Strip → FAQ.
- [ ] Contact section order: Schedule → Closing CTA → Location.
- [ ] Hero matches "Editorial image hero": One strong photograph (portrait 4:5 or wide 3:2) beside or beneath a restrained headline. Clear focal point, generous empty space.
- [ ] Controls and forms use shadcn/ui restyled to the recipe tokens and shape (from: button, sheet, sonner, toggle-group, input, form, label, badge, dialog, carousel, accordion, textarea, select, checkbox) — no unstyled native select, date input or checkbox anywhere; every form says where it goes (an email the visitor sends, or the owner's service) and none fakes a sent message.
- [ ] Sections with reference code in src/components/sections/ keep its design (real copy and media, no placeholder text left) and are fitted into this site: tokens only, the site’s type sizes and spacing, the code edited wherever its defaults disagree. Pass the framework link as `link` (Next.js: `link={Link}` from next/link) so in-site links navigate client-side and respect basePath; without it they render plain <a>.
- [ ] Kit piece "Tap to open large" (<Lightbox/> from src/components/pieces/Lightbox.tsx) is used on Home → Editorial Story: it does what the owner picked it for, and its size, place and the type around it follow the site.
- [ ] One system: things of one kind look alike everywhere — menu links, footer links, labels and button text share one face, width and size step; headings of one level share one size.
- [ ] Every row lines up: the items of one row (the menu’s logo, links and button; a card’s title and meta) share one vertical centre or baseline — none sits higher because of padding it brought along.
- [ ] Nothing looks pasted in: no part keeps a size, padding, width or font from its reference code that its neighbours do not share.
- [ ] Feel: every button, link card and tappable tile answers the press (:active scale 0.97, --duration-press, --ease-out — or the look’s own press), and hover effects wait for a pointer that can hover: on a phone nothing stays hovered.
- [ ] Motion ingredients: no `transition: all`; nothing enters from scale(0); no ease-in on anything that enters, exits or answers; menus, popovers and dialogs take ≤ 300ms on the tokens.css curves; popovers grow out of their trigger, dialogs from the centre; an exit leaves the way it came, never slower; scroll reveals play once.
- [ ] Worst case: with the longest real words in the copy deck and one about 40% longer, a long email, one item and zero items in every list and a missing photo, at 320px and at 200% browser zoom — nothing overflows, squashes, reads “1 items” or leaves a blank band; numbers that change hold their width (tabular figures, unless the face’s tabular set changes their look — a slashed zero, a typewriter set — then a fixed-width box).
- [ ] Seasoning, salt not sauce (recipe → Seasoning): pictures fade into space held for them and nothing pops or jumps while loading; a waiting button keeps its width and never flickers; the micro-interactions are this site’s small set, used the same way everywhere; parallax stays in its dose (one picture on the whole site, 4–6%) and only ever moves pictures.
- [ ] Locked items are as the owner chose them: palette, lettering, pages and their part order, each part’s design, menu, footer, shape, first screen, the copy’s facts and the owner’s files (recipe/design.md → Room to invent).
- [ ] The site reads as Coastal Calm beyond its tokens: at least three of the style’s moves are in it, and none of its traps (recipe/design.md → What Coastal Calm is known for).
- [ ] Every page has one remembered moment; each one the builder designed is named in the final reply, belongs to this owner (their words, pictures or trade) and has a mobile and a reduced-motion version.
- [ ] Every page passes the award checklist in the recipe (one idea, one remembered moment per page, type scale contrast, motion choreography, mobile as its own composition, a designed ending).
- [ ] Stories → Gallery: photos shown as "Photo story", every picture visible as the layout intends.
- [ ] Layout: Headlines 8 columns, body 5 columns max (~65ch), captions in the rail; section spacing clamp(104px, 13vw, 196px) between sections (--section-y).
- [ ] Shape “Soft”: buttons 8px, cards 12px, media 12px radius (rounded-button / rounded-card / rounded-media) — Small, consistent radii; never mix sharp and rounded.
- [ ] Menu “Floating pill”: A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.
- [ ] Absent: Dark heavy sections.
- [ ] Absent: Crowded grids.
- [ ] Absent: Loud colours.
- [ ] Absent: A cream or beige page ground with a clay/terracotta accent.
- [ ] Absent: Small uppercase, letter-spaced monospace labels above every heading.
- [ ] Absent: Numbered markers (01 / 02) on content that is not a real sequence.
- [ ] Absent: Meta strings joined with middle dots or spaced em dashes, and "→" appended to links.
- [ ] Absent: One italic or coloured accent word inside an otherwise plain headline.
- [ ] Absent: Falling back to Inter, Space Grotesk, Syne or Fraunces instead of the recipe's fonts.
- [ ] Absent: Text in mix-blend-difference (or any blend mode) over a photo — its colours turn random; text on a picture sits on a scrim or a solid block.
- [ ] Absent: Effects nobody picked: no text effect, hover, cursor or scroll trick beyond the recipe's motion system and Your Kit.
- [ ] Phone (390px): no horizontal scroll, headlines re-broken intentionally, touch targets ≥ 44px; the first screen uses svh (never vh); fields are ≥ 16px so focusing one never zooms the page, and zoom is never disabled; fixed bars clear the notch and home bar (viewportFit cover + env(safe-area-inset-*)); no grey flash on tap; theme-color is the colour at the top of the page.
- [ ] prefers-reduced-motion: every animation has its documented alternative — gentler, not gone: movement becomes a short fade, colour changes that explain stay, nothing loops, pins or springs.
- [ ] Every media element is rendered through the asset config layer; temporary assets are listed in the manifest.
- [ ] Every picture goes through next/image (or its getImageProps for a plain <img>, a srcSet or a CSS background) — never a hand-written /_next/image?url=… address, which only exists on a running Next server; the site also works as a static export.
- [ ] Lighthouse on mobile: LCP < 2.5s, CLS < 0.1.

Do not mark work complete while any item fails. Fix, then re-check.
