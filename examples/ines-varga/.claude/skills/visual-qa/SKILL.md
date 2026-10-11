---
name: visual-qa
description: Compares the implemented site against the Ines Varga — Raw Conceptual Sketch Portfolio recipe and lists deviations. Use after finishing a section or page, before declaring work done, or when asked to review the design.
---

# Visual QA

Run the dev server, open each page (use a browser/screenshot tool if available), and compare against the recipe. Report deviations as a list: section → expected → actual → fix.

## Checklist
- [ ] Background is #DAD8DB; no other page background colors are introduced.
- [ ] Display text uses Caveat Brush 400; body uses Winky Sans; no other families appear.
- [ ] Accent #D93208 covers < 5% of any viewport.
- [ ] Pages: Home · Selected Work · Project · About · Contact — every page shares the same navbar and footer.
- [ ] Footer “Say hello”: A large headline invitation (“Let’s talk”, “Book a table”) with the email/phone as display-size links, address and hours beside it, then one small row of links, copyright and legal.
- [ ] Home section order: Hero → Featured Work → Closing CTA.
- [ ] Selected Work section order: Featured Work → Clients.
- [ ] Project section order: Case Study Preview → Gallery → Specs → Featured Work.
- [ ] About section order: About → Testimonials → Timeline.
- [ ] Contact section order: Closing CTA → FAQ.
- [ ] Hero matches "Illustrated hero": A commissioned illustration as the key visual, with type set in harmony with its line weight and palette.
- [ ] Controls and forms use shadcn/ui restyled to the recipe tokens and shape (from: button, sheet, sonner, form, input, textarea, label, dialog, carousel, select, checkbox, accordion) — no unstyled native select, date input or checkbox anywhere; every form says where it goes (an email the visitor sends, or the owner's service) and none fakes a sent message.
- [ ] Sections with reference code in src/components/sections/ keep its design (real copy and media, no placeholder text left) and are fitted into this site: tokens only, the site’s type sizes and spacing, the code edited wherever its defaults disagree. Pass the framework link as `link` (Next.js: `link={Link}` from next/link) so in-site links navigate client-side and respect basePath; without it they render plain <a>.
- [ ] Kit piece "Prints on a desk" (<DragPhotos/> from src/components/pieces/DragPhotos.tsx) is used on Home → Featured Work: it does what the owner picked it for, and its size, place and the type around it follow the site.
- [ ] Kit piece "Hand-drawn underline" (<DrawnLink/> from src/components/pieces/DrawnLink.tsx) is used on Every page — menu, footer and text links: it does what the owner picked it for, and its size, place and the type around it follow the site.
- [ ] Kit piece "A picture that becomes the next page" (<PhotoMorph/> from src/components/pieces/PhotoMorph.tsx) is used on Selected Work → Featured Work: it does what the owner picked it for, and its size, place and the type around it follow the site.
- [ ] Kit piece "A story told beside one held picture" (<ScrollStory/> from src/components/pieces/ScrollStory.tsx) is used on About → About: it does what the owner picked it for, and its size, place and the type around it follow the site.
- [ ] Kit piece "Letters that gather into a sentence" (<LettersAssemble/> from src/components/pieces/LettersAssemble.tsx) is used on Contact → Closing CTA: it does what the owner picked it for, and its size, place and the type around it follow the site.
- [ ] Kit piece "Shutter between pages" (<PageShutter/> from src/components/pieces/PageShutter.tsx) is used on Whole site — every internal link; mount once in app/layout.tsx: it does what the owner picked it for, and its size, place and the type around it follow the site.
- [ ] Kit piece "Tap to open large" (<Lightbox/> from src/components/pieces/Lightbox.tsx) is used on Project → Gallery (its photo layout): it does what the owner picked it for, and its size, place and the type around it follow the site.
- [ ] Kit piece "Smooth scroll" (<SmoothScroll/> from src/components/pieces/SmoothScroll.tsx) is used on Whole site — mount once in app/layout.tsx: it does what the owner picked it for, and its size, place and the type around it follow the site.
- [ ] One system: things of one kind look alike everywhere — menu links, footer links, labels and button text share one face, width and size step; headings of one level share one size.
- [ ] Every row lines up: the items of one row (the menu’s logo, links and button; a card’s title and meta) share one vertical centre or baseline — none sits higher because of padding it brought along.
- [ ] Nothing looks pasted in: no part keeps a size, padding, width or font from its reference code that its neighbours do not share.
- [ ] 404: the site has its own not-found page (app/not-found.tsx — it answers with a real 404 status; 13 of 91 award winners wrongly answer 200) and it is one of the site’s remembered moments: the headline is a line from the brand’s own world, not “Page not found” (a racing driver’s “Welcome to Turn 404”, a musician’s “Track not found”, a hauler’s “You’ve taken a wrong turn”, a shop’s “But our doors are always open”); the page uses the site’s own big move — the giant word, the product in front of it, its photography — keeps the menu and footer, and offers the two ways on most people want (home and the main action). Half of the winners design theirs (docs/research/awwwards/07-details.md).
- [ ] Semantics and meta: header, nav, main and footer landmarks; buttons are buttons and links are links; every image has alt (alt="" when it only decorates); every page has its own title, description and Open Graph image, the html has its lang, the site its favicon.
- [ ] Keyboard and focus: everything works by keyboard in reading order with a visible focus; a skip link to the content; a menu, sheet or dialog traps focus while open and returns it on close; anything that moves or plays on its own can be paused.
- [ ] Speed: the first screen’s picture or poster loads first (priority / fetchpriority=high), everything below loads lazily; every image has its size, so nothing jumps as it loads; fonts load with display swap; films, 3D and loops pause off screen and in a hidden tab.
- [ ] Feel: every button, link card and tappable tile answers the press (:active scale 0.97, --duration-press, --ease-out — or the look’s own press) and shows the pointer cursor (disabled: not-allowed), and hover effects wait for a pointer that can hover: on a phone nothing stays hovered.
- [ ] Letters whole: no headline, label or masked line cuts a descender or an accent (g, y, p, j, Å) — check every line reveal, cut-out headline and rolling link in the display face at desktop and 390px.
- [ ] Motion ingredients: no `transition: all`; nothing enters from scale(0); no ease-in on anything that enters, exits or answers; menus, popovers and dialogs take ≤ 300ms on the tokens.css curves; popovers grow out of their trigger, dialogs from the centre; an exit leaves the way it came, never slower; scroll reveals play once.
- [ ] Headings never skip a level: one h1 per page, then h2, then h3 — a part whose own title gives way to the page’s h1 moves its inner headings up a level (Fennwood’s and Low Hum’s menus went h1 → h3). Text passes AA against what is really behind it, placeholders and hover states included.
- [ ] Worst case: with the longest real words in the copy deck and one about 40% longer, a long email, one item and zero items in every list and a missing photo, at 320px and at 200% browser zoom — nothing overflows, squashes, reads “1 items” or leaves a blank band; numbers that change hold their width (tabular figures, unless the face’s tabular set changes their look — a slashed zero, a typewriter set — then a fixed-width box).
- [ ] Seasoning, salt not sauce (recipe → Seasoning): pictures fade into space held for them and nothing pops or jumps while loading; a waiting button keeps its width and never flickers; the micro-interactions are this site’s small set, used the same way everywhere; parallax stays in its dose (up to two picture bands a page, 6–10%) and only ever moves pictures.
- [ ] Locked items are as the owner chose them: palette, lettering, pages and their part order, each part’s design, menu, footer, shape, first screen, the copy’s facts and the owner’s files (recipe/design.md → Room to invent).
- [ ] The site reads as Conceptual Sketch beyond its tokens: at least three of the style’s moves are in it, and none of its traps (recipe/design.md → What Conceptual Sketch is known for).
- [ ] Every page has one remembered moment; each one the builder designed is named in the final reply, belongs to this owner (their words, pictures or trade) and has a mobile and a reduced-motion version.
- [ ] Every page passes the award checklist in the recipe (one idea, one remembered moment per page, type scale contrast, motion choreography, mobile as its own composition, a designed ending).
- [ ] Home → Featured Work: photos shown as "Photo story", every picture visible as the layout intends.
- [ ] Selected Work → Featured Work: photos shown as "Photo story", every picture visible as the layout intends.
- [ ] Project → Gallery: photos shown as "Gallery wall", every picture visible as the layout intends.
- [ ] Project → Featured Work: photos shown as "Photo story", every picture visible as the layout intends.
- [ ] Layout: Modules snap to 3, 4, 6 or 12 columns; section spacing clamp(72px, 9vw, 120px) between sections (--section-y).
- [ ] Shape “Hairline”: buttons 4px, cards 6px, media 4px radius (rounded-button / rounded-card / rounded-media) — Buttons and cards are outlined, not filled (except the one primary action); 1px borders in the border token.
- [ ] Menu “Full-screen menu”: Minimal bar: logo and a “Menu” label only. The menu is a full-viewport panel with display-size links, one per line, plus contact details.
- [ ] Absent: Sketch texture under body text.
- [ ] Absent: Clip-art doodles.
- [ ] Absent: Too many annotation colours.
- [ ] Absent: A cream or beige page ground with a clay/terracotta accent.
- [ ] Absent: A near-black ground with one acid-green or orange accent, or tinted charcoal standing in for black.
- [ ] Absent: Small uppercase, letter-spaced monospace labels above every heading.
- [ ] Absent: Numbered markers (01 / 02) on content that is not a real sequence.
- [ ] Absent: Meta strings joined with middle dots or spaced em dashes, and "→" appended to links.
- [ ] Absent: One italic or coloured accent word inside an otherwise plain headline.
- [ ] Absent: Falling back to Inter, Space Grotesk, Syne or Fraunces instead of the recipe's fonts.
- [ ] Absent: Text in mix-blend-difference (or any blend mode) over a photo — its colours turn random; text on a picture sits on a scrim or a solid block.
- [ ] Absent: Effects nobody picked: no text effect, hover, cursor or scroll trick beyond the recipe's motion system and Your Kit.
- [ ] Absent: A small label in tracked capitals, or a chip, above the hero headline (an eyebrow); the headline stands alone.
- [ ] Absent: A coloured stripe down one side of a card, alert or list item (a pull quote's rule is fine); a card in a card; a grid of same-size icon tiles as the page's structure.
- [ ] Absent: A hairline border under a wide soft shadow (a ghost card), a zero-offset coloured glow, gradient-filled text.
- [ ] Absent: A pulsing dot or blinking caret pretending something is live, and a strip that scrolls forever when nobody picked one.
- [ ] Absent: Copy in a manufactured cadence: "Not a X. A Y.", "X. No Y.", "X. Just Y." — more than one on a site — or an em dash in every other sentence.
- [ ] Phone (390px): no horizontal scroll, headlines re-broken intentionally, touch targets ≥ 44px; the first screen uses svh (never vh); fields are ≥ 16px so focusing one never zooms the page, and zoom is never disabled; fixed bars clear the notch and home bar (viewportFit cover + env(safe-area-inset-*)); no grey flash on tap; theme-color is the colour at the top of the page.
- [ ] prefers-reduced-motion: every animation has its documented alternative — gentler, not gone: movement becomes a short fade, colour changes that explain stay, nothing loops, pins or springs.
- [ ] Every media element is rendered through the asset config layer; temporary assets are listed in the manifest. A hover, a swap or a gallery step never reveals a temporary picture over a real one: an effect that brings in a second picture (a product’s other view, a hover image) runs only once that file is real (status 'have') — until then the real picture stays.
- [ ] Every picture goes through next/image (or its getImageProps for a plain <img>, a srcSet or a CSS background) — never a hand-written /_next/image?url=… address, which only exists on a running Next server; the site also works as a static export.
- [ ] Lighthouse on mobile: LCP < 2.5s, CLS < 0.1.

Do not mark work complete while any item fails. Fix, then re-check.
