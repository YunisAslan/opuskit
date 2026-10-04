// Pieces — the kit. Ready components users collect ("add to my kit") and every Build Package then ships as real code
// in src/components/pieces/. Each one is adapted from an MIT-licensed library (never React Bits, Aceternity or Hover.dev,
// whose terms forbid redistributing their components), restyled to the recipe tokens (--color-*, --font-*), with a
// reduced-motion version and no dependency beyond `motion` (Paper Shaders and Lenis where a piece lists them). The source files live in src/pieces/ and are type-checked with OpusKit.

import type { BehaviourId, MotionLevel, Piece, PieceId, PieceSlot } from '@/types/domain'

const MP = { license: 'MIT', library: 'Motion Primitives', url: 'https://motion-primitives.com', copyright: 'Copyright (c) 2024 ibelick' } as const
const MU = { license: 'MIT', library: 'Magic UI', url: 'https://magicui.design', copyright: 'Copyright (c) Magic UI' } as const
const CU = { license: 'MIT', library: 'Cult UI', url: 'https://www.cult-ui.com', copyright: 'Copyright (c) 2023 Jordan-Gilliam' } as const
const AN = { license: 'MIT', library: 'Animata', url: 'https://animata.design', copyright: 'Copyright (c) Animata' } as const
const FA = { license: 'MIT', library: 'Fancy Components', url: 'https://www.fancycomponents.dev', copyright: 'Copyright (c) 2024 Daniel Petho' } as const
const PS = { license: 'Apache-2.0', library: 'Paper Shaders', url: 'https://shaders.paper.design', copyright: 'Copyright (c) Paper Design' } as const
const OK = { license: 'MIT', library: 'OpusKit', url: 'https://opuskit.app', copyright: 'Copyright (c) OpusKit' } as const
const CY = { license: 'MIT', library: 'Componentry', url: 'https://componentry.dev', copyright: 'Copyright (c) Componentry' } as const

const MOVING: MotionLevel[] = ['subtle', 'dynamic', 'immersive']
const LIVELY: MotionLevel[] = ['dynamic', 'immersive']
const ALL: MotionLevel[] = ['still', 'subtle', 'dynamic', 'immersive']
const M = ['motion']

export const pieceSlots: Record<PieceSlot, { name: string; line: string }> = {
  headline: { name: 'Headlines', line: 'How the big words arrive' },
  label: { name: 'Labels & links', line: 'Small type that reacts' },
  statement: { name: 'Statements', line: 'One paragraph that carries the point' },
  numbers: { name: 'Numbers', line: 'Figures, dates, times' },
  photos: { name: 'Photos', line: 'How a set of images is shown' },
  scroll: { name: 'Scroll', line: 'What scrolling does' },
  pointer: { name: 'Pointer', line: 'What the cursor does' },
  background: { name: 'Backgrounds', line: 'Texture and structure behind content' },
  video: { name: 'Video', line: 'How a film is played' },
  button: { name: 'Buttons', line: 'How the main action behaves' },
  decor: { name: 'Stickers', line: 'Brand marks stuck onto a section' },
  open: { name: 'Opening photos', line: 'What tapping a photo does' },
  site: { name: 'Whole site', line: 'Page transitions, cursor, notices' },
}

export const pieces: Record<PieceId, Piece> = {
  'text-effect': {
    id: 'text-effect', name: 'Words that arrive', line: 'Headlines reveal word by word as they come into view.', slot: 'headline', source: MP,
    file: 'TextEffect.tsx', exportName: 'TextEffect', deps: M, levels: MOVING, sections: ['hero', 'intro', 'manifesto', 'contact-cta'],
    usage: '<TextEffect as="h1" preset="slide" className="font-(family-name:--font-display)">Your headline here</TextEffect>',
    rules: ['Use on the h1 and at most two section headlines — not every heading.', 'Choose one preset for the whole site: slide (default), blur or fade.'],
  },
  'text-loop': {
    id: 'text-loop', name: 'Rotating word', line: 'One word in the headline cycles through a short list.', slot: 'headline', source: MP,
    file: 'TextLoop.tsx', exportName: 'TextLoop', deps: M, levels: MOVING, sections: ['hero', 'intro'],
    usage: '<h1>We make <TextLoop words={["shops", "archives", "tools"]} /></h1>',
    rules: ['3–5 words, similar length, all true.', 'Only in the hero headline; the rest of the sentence stays still.'],
  },
  'split-flap': {
    id: 'split-flap', name: 'Departure board', line: 'Letters flick through characters until they land — like a station board.', slot: 'numbers', source: CY,
    file: 'SplitFlap.tsx', exportName: 'SplitFlap', deps: M, levels: MOVING, sections: ['hero', 'location', 'reservation', 'pricing'],
    usage: '<SplitFlap text="11–13 JUNE" className="font-(family-name:--font-utility) text-4xl" />',
    rules: ['For short facts only: a date, a time, a gate, a price — ≤ 14 characters.', 'Once per page.'],
  },
  'number-ticker': {
    id: 'number-ticker', name: 'Counting numbers', line: 'Real figures count up once when they scroll into view.', slot: 'numbers', source: MU,
    file: 'NumberTicker.tsx', exportName: 'NumberTicker', deps: M, levels: MOVING, sections: ['about', 'feature-grid', 'how-it-works', 'clients'],
    usage: '<NumberTicker value={1240} className="font-(family-name:--font-display) text-6xl" />',
    rules: ['Only true, specific numbers with a label — never decoration.', '3–4 figures in one row at most.'],
  },
  'text-scramble': {
    id: 'text-scramble', name: 'Scrambled labels', line: 'Short labels resolve out of random letters, and again on hover.', slot: 'label', source: MP,
    file: 'TextScramble.tsx', exportName: 'TextScramble', deps: M, levels: MOVING, sections: ['navbar', 'featured-work', 'footer'],
    usage: '<TextScramble className="font-(family-name:--font-utility)">Selected work</TextScramble>',
    rules: ['Labels of 1–3 words. Never on body copy or headlines.', 'Suits technical, futuristic and editorial directions; skip it for warm, organic ones.'],
  },
  'text-roll': {
    id: 'text-roll', name: 'Rolling links', line: 'On hover, each letter of a link rolls over to a fresh copy.', slot: 'label', source: MP,
    file: 'TextRoll.tsx', exportName: 'TextRoll', deps: M, levels: MOVING, sections: ['navbar', 'footer', 'contact-cta'],
    usage: '<a href="/work"><TextRoll>Work</TextRoll></a>',
    rules: ['Navigation and footer links only.', 'The link keeps its normal focus outline.'],
  },
  'spinning-text': {
    id: 'spinning-text', name: 'Spinning badge', line: 'A slow ring of text — a stamp beside the hero or the main button.', slot: 'label', source: MP,
    file: 'SpinningText.tsx', exportName: 'SpinningText', deps: M, levels: MOVING, sections: ['hero', 'contact-cta'],
    usage: '<SpinningText radius={6} className="font-(family-name:--font-utility) text-sm">SCROLL • SINCE 2019 • </SpinningText>',
    rules: ['One on the whole site.', 'End the text with a separator so the ring joins cleanly.'],
  },
  'text-reveal': {
    id: 'text-reveal', name: 'Words light up on scroll', line: 'A statement paragraph whose words brighten one by one as you scroll.', slot: 'statement', source: MU,
    file: 'TextReveal.tsx', exportName: 'TextReveal', deps: M, levels: LIVELY, sections: ['manifesto', 'intro', 'about'],
    usage: '<TextReveal className="font-(family-name:--font-display) text-4xl md:text-6xl">One or two sentences that say what you believe.</TextReveal>',
    rules: ['One paragraph, 15–40 words, once per site.', 'Give it room: the section is at least 120vh tall.'],
  },
  marquee: {
    id: 'marquee', name: 'Endless row', line: 'A row of photos, logos or words that drifts endlessly.', slot: 'photos', source: MU,
    file: 'Marquee.tsx', exportName: 'Marquee', deps: [], levels: MOVING, sections: ['gallery', 'clients', 'collection', 'lookbook'],
    usage: '<Marquee seconds={50}>{photos.map((p) => <img key={p.src} src={p.src} alt={p.alt} className="h-64 w-auto" />)}</Marquee>',
    rules: ['Two rows running opposite ways at most.', 'Same height for every item; widths stay native.'],
  },
  'image-comparison': {
    id: 'image-comparison', name: 'Before / after', line: 'Drag a divider to compare two photos of the same view.', slot: 'photos', source: MP,
    file: 'ImageComparison.tsx', exportName: 'ImageComparison', deps: M, levels: ALL, sections: ['case-study', 'featured-work', 'product-highlight'],
    usage: '<ImageComparison before="/media/before.jpg" after="/media/after.jpg" beforeAlt="…" afterAlt="…" className="aspect-[3/2]" />',
    rules: ['Only for a real before/after pair shot from the same position.', 'Keyboard: the divider is a slider (arrow keys).'],
  },
  'ring-carousel': {
    id: 'ring-carousel', name: '3D photo ring', line: 'Photos on a turning cylinder; drag to spin, click to open one.', slot: 'photos', source: CU,
    file: 'RingCarousel.tsx', exportName: 'RingCarousel', deps: M, levels: LIVELY, heavy: true, sections: ['gallery', 'featured-work', 'collection'],
    usage: '<RingCarousel photos={photos} height={440} />',
    rules: ['8–16 photos of the same shape (portrait works best).', 'Once per site, in its own full-width section.'],
  },
  'image-field': {
    id: 'image-field', name: 'Endless photo field', line: 'A field of photos visitors drag in any direction, forever.', slot: 'photos', source: CY,
    file: 'ImageField.tsx', exportName: 'ImageField', deps: M, levels: ['immersive'], heavy: true, sections: ['gallery', 'featured-work'],
    usage: '<ImageField photos={photos} cell={260} className="h-[80svh]" />',
    rules: ['12+ photos (they repeat); a link to a plain grid next to it.', 'Its own full-height section — never inside a scrolling column.'],
  },
  'tilted-grid': {
    id: 'tilted-grid', name: 'Tilted scroll grid', line: 'A dense photo grid that stands up flat as you scroll into it.', slot: 'photos', source: CY,
    file: 'TiltedGrid.tsx', exportName: 'TiltedGrid', deps: M, levels: LIVELY, sections: ['gallery', 'collection', 'featured-work'],
    usage: '<TiltedGrid photos={photos} columns={5} />',
    rules: ['10+ photos, same ratio.', '3 columns on mobile.'],
  },
  'image-trail': {
    id: 'image-trail', name: 'Photos follow the cursor', line: 'Moving across a section leaves a short trail of photos.', slot: 'pointer', source: AN,
    file: 'ImageTrail.tsx', exportName: 'ImageTrail', deps: M, levels: LIVELY, sections: ['hero', 'featured-work', 'contact-cta'],
    usage: '<ImageTrail photos={photos.map((p) => p.src)} className="min-h-[70svh]"><h2>…</h2></ImageTrail>',
    rules: ['One section only, with a large headline over it.', 'Mouse only — touch visitors see the section without it.'],
  },
  tilt: {
    id: 'tilt', name: 'Cards that lean', line: 'Cards tilt gently toward the cursor in 3D.', slot: 'pointer', source: MP,
    file: 'Tilt.tsx', exportName: 'Tilt', deps: M, levels: MOVING, sections: ['featured-work', 'product-grid', 'pricing'],
    usage: '<Tilt degrees={6}><article>…</article></Tilt>',
    rules: ['≤ 8°. On cards in one grid, not on every card of the site.'],
  },
  'cursor-area': {
    id: 'cursor-area', name: 'Custom cursor', line: 'Over photos the cursor becomes a round “View” label.', slot: 'pointer', source: MP,
    file: 'Cursor.tsx', exportName: 'CursorArea', deps: M, levels: MOVING, sections: ['featured-work', 'gallery', 'collection'],
    usage: '<CursorArea label="View"><ProjectGrid /></CursorArea>',
    rules: ['Only over clickable media; the system cursor stays everywhere else.', 'Label is one word in the utility face.'],
  },
  magnetic: {
    id: 'magnetic', name: 'Magnetic button', line: 'The main button leans toward the cursor when it comes near.', slot: 'pointer', source: MP,
    file: 'Magnetic.tsx', exportName: 'Magnetic', deps: M, levels: MOVING, sections: ['hero', 'contact-cta', 'navbar'],
    usage: '<Magnetic><a href="/contact" className="btn">Start a project</a></Magnetic>',
    rules: ['One or two primary actions per page — never every button.'],
  },
  'hover-highlight': {
    id: 'hover-highlight', name: 'Sliding highlight', line: 'A soft block slides between links as the pointer moves.', slot: 'label', source: MP,
    file: 'HoverHighlight.tsx', exportName: 'HoverHighlight', deps: M, levels: MOVING, sections: ['navbar', 'services', 'faq'],
    usage: '<HoverHighlight link={Link} items={[{ label: "Work", href: "/work" }, { label: "About", href: "/about" }]} />',
    rules: ['Uses the surface token; no shadow, no gradient.'],
  },
  'scroll-progress': {
    id: 'scroll-progress', name: 'Reading line', line: 'A hairline across the top fills as the visitor reads.', slot: 'scroll', source: MP,
    file: 'ScrollProgress.tsx', exportName: 'ScrollProgress', deps: M, levels: ALL, sections: ['journal', 'case-study', 'editorial-story'],
    usage: '<ScrollProgress />',
    rules: ['Long pages only (journal posts, case studies) — not the home page.'],
  },
  'velocity-band': {
    id: 'velocity-band', name: 'Type that races the scroll', line: 'A band of big words drifts sideways and speeds up with scrolling.', slot: 'scroll', source: MU,
    file: 'VelocityBand.tsx', exportName: 'VelocityBand', deps: M, levels: LIVELY, sections: ['manifesto', 'clients', 'footer'],
    usage: '<VelocityBand text="Available for new work — " className="font-(family-name:--font-display) text-[12vw] leading-none" />',
    rules: ['One band, one short phrase, between two sections.'],
  },
  'pinned-stage': {
    id: 'pinned-stage', name: 'Held in place', line: 'The section holds still while scrolling moves it through its steps; a thin bar shows how far along you are.', slot: 'scroll', source: OK,
    file: 'PinnedStage.tsx', exportName: 'PinnedStage', deps: M, levels: LIVELY, heavy: true, sections: ['featured-work', 'testimonials', 'case-study', 'feature-rows', 'editorial-story', 'product-highlight', 'process', 'how-it-works', 'stats'],
    usage: '<PinnedStage label="Projects" steps={projects.map((p) => <Project key={p.slug} {...p} />)} />\n// or draw the stage yourself: <PinnedStage steps={…}>{({ progress, active }) => …}</PinnedStage>',
    rules: ['3–6 steps with real content; each holds for about 70svh of scroll.', 'One pinned section per page — two in a row feel like the page is stuck.', 'Pinned and scrubbed moments (proof one at a time, scroll into an image) build on it instead of their own sticky code.'],
  },
  'sticky-cards': {
    id: 'sticky-cards', name: 'Stacking cards', line: 'Cards pile up on each other while scrolling, each settling as the next arrives.', slot: 'scroll', source: CY,
    file: 'StickyCards.tsx', exportName: 'StickyCards', deps: M, levels: LIVELY, heavy: true, sections: ['featured-work', 'services', 'how-it-works', 'process'],
    usage: '<StickyCards cards={projects.map((p) => <ProjectCard key={p.slug} {...p} />)} />',
    rules: ['3–6 cards with real content (a project, a step, a service).', 'Mobile keeps the stack but each card fits one screen.'],
  },
  'grid-pattern': {
    id: 'grid-pattern', name: 'Hairline grid', line: 'A fine grid behind a section, drawn in the border colour.', slot: 'background', source: MU,
    file: 'GridPattern.tsx', exportName: 'GridPattern', deps: [], levels: ALL, sections: ['hero', 'feature-grid', 'pricing', 'how-it-works'],
    usage: '<section className="relative"><GridPattern size={48} />…</section>',
    rules: ['Swiss, technical and architectural directions; one or two sections.', 'Filled cells only where they mean something (a seat, a slot).'],
  },
  grain: {
    id: 'grain', name: 'Film grain', line: 'A faint grain over the page, drawn in code — no image file.', slot: 'background', source: MU,
    file: 'Grain.tsx', exportName: 'Grain', deps: [], levels: ALL, sections: ['hero'],
    usage: '<Grain fixed opacity={0.05} />  {/* once, in the root layout */}',
    rules: ['4–8% opacity — felt, not seen.', 'Film, editorial and organic directions.'],
  },
  'magnet-lines': {
    id: 'magnet-lines', name: 'Lines that follow', line: 'A field of short lines that all turn toward the cursor.', slot: 'background', source: CY,
    file: 'MagnetLines.tsx', exportName: 'MagnetLines', deps: M, levels: LIVELY, sections: ['hero', 'contact-cta', 'footer'],
    usage: '<MagnetLines rows={8} columns={14} className="absolute inset-0 opacity-30" />',
    rules: ['Behind one section with little else in it.', 'Line colour from the text token at 20–40% opacity.'],
  },
  'video-dialog': {
    id: 'video-dialog', name: 'Play the film', line: 'A still with a play button; the full film opens with sound.', slot: 'video', source: MU,
    file: 'VideoDialog.tsx', exportName: 'VideoDialog', deps: M, levels: ALL, sections: ['intro', 'about', 'case-study', 'editorial-story'],
    usage: '<VideoDialog poster="/media/posterImage.jpg" src="/media/heroVideo.mp4" title="The film" className="aspect-video w-full" />',
    rules: ['For a film worth watching with sound — the silent hero loop stays separate.', 'Esc and the backdrop close it.'],
  },
  'media-between-text': {
    id: 'media-between-text', name: 'Photo between words', line: 'A headline parts in the middle and a photo or clip opens between the words.', slot: 'statement', source: FA,
    file: 'MediaBetweenText.tsx', exportName: 'MediaBetweenText', deps: M, levels: MOVING, sections: ['intro', 'manifesto', 'about', 'contact-cta'],
    usage: '<MediaBetweenText before="Made by" after="hand" src="/media/hands.jpg" alt="Hands shaping clay" className="font-(family-name:--font-display) text-7xl" />',
    rules: ['One per page; a photo that says the same thing as the words.', 'Keep both halves short (1–3 words).'],
  },
  'cut-reveal': {
    id: 'cut-reveal', name: 'Cut-out headline', line: 'Words slide up out of a hard mask — sharper than a fade.', slot: 'headline', source: FA,
    file: 'TextEffect.tsx', exportName: 'TextEffect', deps: M, levels: MOVING, sections: ['hero', 'intro', 'manifesto', 'contact-cta'],
    usage: '<TextEffect as="h1" preset="cut" className="font-(family-name:--font-display) text-8xl">Polo in Sheki</TextEffect>',
    rules: ['Best with heavy, condensed or wide display faces.', 'h1 plus at most two section headlines.'],
  },
  'underline-fill': {
    id: 'underline-fill', name: 'Filling underline', line: 'A link’s underline grows into a full block on hover, flipping its colour.', slot: 'label', source: FA,
    file: 'UnderlineFill.tsx', exportName: 'UnderlineFill', deps: M, levels: MOVING, sections: ['navbar', 'footer', 'contact-cta'],
    usage: '<UnderlineFill href="/contact">Start a conversation</UnderlineFill>',
    rules: ['Text links only — never on buttons.'],
  },
  'parallax-floating': {
    id: 'parallax-floating', name: 'Floating photos', line: 'Photos around a headline drift at different depths as the cursor moves.', slot: 'photos', source: FA,
    file: 'ParallaxFloating.tsx', exportName: 'ParallaxFloating', deps: M, levels: LIVELY, sections: ['hero', 'intro', 'contact-cta'],
    usage: '<ParallaxFloating photos={[{ src: "/media/a.jpg", alt: "…", x: "8%", y: "12%", w: "14vw", depth: 1 }]} className="h-svh"><h1>…</h1></ParallaxFloating>',
    rules: ['5–8 photos, varied sizes, none covering the headline.', 'Depth 0.5–2; phones show the photos still.'],
  },
  'drag-photos': {
    id: 'drag-photos', name: 'Prints on a desk', line: 'Photos scattered like prints; visitors pick one up and move it.', slot: 'photos', source: FA,
    file: 'DragPhotos.tsx', exportName: 'DragPhotos', deps: M, levels: LIVELY, sections: ['gallery', 'about', 'featured-work'],
    usage: '<DragPhotos photos={[{ src: "/media/a.jpg", alt: "…", x: "10%", y: "20%", w: "22%", rotate: -4 }]} className="h-[80svh]" />',
    rules: ['6–10 photos, small rotations (±6°).', 'A plain grid of the same photos stays in the page for keyboard users.'],
  },
  'text-along-path': {
    id: 'text-along-path', name: 'Text on a curve', line: 'A line of words runs along a curve and travels with the scroll.', slot: 'scroll', source: FA,
    file: 'TextAlongPath.tsx', exportName: 'TextAlongPath', deps: M, levels: LIVELY, sections: ['manifesto', 'clients', 'footer'],
    usage: '<TextAlongPath text="Open for commissions —" className="font-(family-name:--font-display) text-6xl" />',
    rules: ['One short phrase; it repeats along the curve.', 'Between two sections, full width.'],
  },
  'shader-grain': {
    id: 'shader-grain', name: 'Grainy colour field', line: 'A slow, grainy colour field in your own colours, drawn on the GPU.', slot: 'background', source: PS,
    file: 'ShaderGrain.tsx', exportName: 'ShaderGrain', deps: ['@paper-design/shaders-react', 'motion'], levels: MOVING, heavy: true, sections: ['hero', 'contact-cta', 'manifesto'],
    usage: '<section className="relative"><ShaderGrain shape="wave" /><div className="relative">…</div></section>',
    rules: ['One section — usually the hero or the closing call to action.', 'Text over it must still pass AA contrast.'],
  },
  'shader-dither': {
    id: 'shader-dither', name: 'Dithered pattern', line: 'A two-colour dithered pattern, like a risograph or an old screen.', slot: 'background', source: PS,
    file: 'ShaderDither.tsx', exportName: 'ShaderDither', deps: ['@paper-design/shaders-react', 'motion'], levels: MOVING, heavy: true, sections: ['hero', 'contact-cta', 'footer'],
    usage: '<section className="relative"><ShaderDither shape="warp" size={3} /><div className="relative">…</div></section>',
    rules: ['Brutal, technical and futuristic directions.', 'One section; keep text on a solid block over it.'],
  },
  'duo-headline': {
    id: 'duo-headline', name: 'Two-voice headline', line: 'One word loud in the grotesk, the rest quiet in the serif — letters rise into place.', slot: 'headline', source: OK,
    file: 'DuoHeadline.tsx', exportName: 'DuoHeadline', deps: M, levels: MOVING, sections: ['hero', 'intro', 'manifesto', 'contact-cta', 'chapters'],
    usage: '<DuoHeadline as="h1" loud="Everything" quiet="moves" />',
    rules: ['Split at a whole word — never one decorated word inside a sentence.', 'Best with the Two Voices lettering (or any pairing whose heading is a contrasting family).'],
  },
  'scribble-link': {
    id: 'scribble-link', name: 'Hand-drawn underline', line: 'A squiggle draws itself under a link on hover; the current page keeps it.', slot: 'label', source: OK,
    file: 'DrawnLink.tsx', exportName: 'DrawnLink', deps: M, levels: MOVING, sections: ['navbar', 'hero', 'contact-cta'],
    usage: '<DrawnLink link={Link} stroke="scribble" href="/work" current={path === "/work"}>Work</DrawnLink>',
    rules: ['Navigation links; pass `current` for the page you are on.'],
  },
  'wavy-link': {
    id: 'wavy-link', name: 'Wavy underline', line: 'A link’s underline draws in as a wave on hover.', slot: 'label', source: OK,
    file: 'DrawnLink.tsx', exportName: 'DrawnLink', deps: M, levels: MOVING, sections: ['footer', 'contact-cta', 'about', 'journal'],
    usage: '<DrawnLink link={Link} stroke="wave" href="/faq">FAQ</DrawnLink>',
    rules: ['Footer and inline links; the wave uses the second chapter colour (or the accent).'],
  },
  'swap-button': {
    id: 'swap-button', name: 'Hopping arrow button', line: 'On hover the arrow hops to the other side and the button tilts a little.', slot: 'button', source: OK,
    file: 'SwapButton.tsx', exportName: 'SwapButton', deps: M, levels: MOVING, sections: ['hero', 'contact-cta', 'pricing', 'chapters'],
    usage: '<SwapButton href="/contact" label="Tell us your story" />',
    rules: ['The one primary action of a section.'],
  },
  stickers: {
    id: 'stickers', name: 'Brand stickers', line: 'Your stickers stuck onto a section — they drift with scroll and can be thrown around.', slot: 'decor', source: OK,
    file: 'Stickers.tsx', exportName: 'Stickers', deps: M, levels: MOVING, sections: ['hero', 'intro', 'manifesto', 'chapters', 'about', 'contact-cta', 'gallery'],
    usage: '<section className="relative"><Stickers stickers={[{ src: "/media/sticker-1.png", alt: "…", x: "8%", y: "12%", w: "9rem", rotate: -8, depth: 1 }]} />…</section>',
    rules: ['2–4 per section, overlapping the edges of text blocks, never covering words.', 'Use the brand’s own marks (see the Brand stickers asset).'],
  },
  'fade-transition': {
    id: 'fade-transition', name: 'Soft fade between pages', line: 'The page dims into its own colour and the next one fades in — quiet, half a second.', slot: 'site', source: OK,
    file: 'PageFade.tsx', exportName: 'PageFade', deps: M, levels: ALL, sections: [],
    usage: '// app/layout.tsx, inside <body>:\n<PageFade />',
    rules: ['Mount once in the root layout; it handles every internal link.', 'About half a second in all — calm, never a wait.'],
  },
  'blob-transition': {
    id: 'blob-transition', name: 'Blob page transition', line: 'A blob of colour sweeps over the page between pages.', slot: 'site', source: OK,
    file: 'BlobTransition.tsx', exportName: 'BlobTransition', deps: M, levels: MOVING, sections: [],
    usage: '// app/layout.tsx, inside <body>:\n<BlobTransition />',
    rules: ['Mount once in the root layout; it handles every internal link.', 'Under 600 ms each way — never make people wait.'],
  },
  'brand-cursor': {
    id: 'brand-cursor', name: 'Brand cursor', line: 'A hand-drawn arrow (or your own) replaces the system cursor.', slot: 'site', source: OK,
    file: 'BrandCursor.tsx', exportName: 'BrandCursor', deps: [], levels: ALL, sections: [],
    usage: '// app/layout.tsx:\n<BrandCursor />  {/* or <BrandCursor src="/media/cursor.svg" /> */}',
    rules: ['Links and buttons keep the pointer cursor.'],
  },
  'cookie-note': {
    id: 'cookie-note', name: 'Cookie note card', line: 'The cookie notice as a small brand card, not a grey bar.', slot: 'site', source: OK,
    file: 'CookieNote.tsx', exportName: 'CookieNote', deps: M, levels: ALL, sections: [],
    usage: '// app/layout.tsx:\n<CookieNote text="We use cookies to …" place="Zone 1" label="Note" />',
    rules: ['Say plainly what is collected; offer “only necessary” as an equal choice.'],
  },
  'curtain-transition': {
    id: 'curtain-transition', name: 'Curtain between pages', line: 'A plain panel rises over the page carrying the next page’s name, then lifts away.', slot: 'site', source: OK,
    file: 'PageCurtain.tsx', exportName: 'PageCurtain', deps: M, levels: MOVING, sections: [],
    usage: '// app/layout.tsx, inside <body>:\n<PageCurtain />',
    rules: ['Mount once in the root layout; it handles every internal link.', 'Under 700 ms in total — the name is a beat, not a wait.'],
  },
  preloader: {
    id: 'preloader', name: 'Designed preloader', line: 'The first visit opens on your name counting in while the page loads, then it lifts away.', slot: 'site', source: OK,
    file: 'Preloader.tsx', exportName: 'Preloader', deps: M, levels: MOVING, sections: [],
    usage: '// app/layout.tsx, inside <body>:\n<Preloader brand="Your name" />',
    rules: ['Once per visit (session), never on every page.', 'It follows real loading (fonts and the first-screen media) and never holds people past 2.5 s.'],
  },
  'smooth-scroll': {
    id: 'smooth-scroll', name: 'Smooth scroll', line: 'Scrolling glides instead of stepping, so every scroll effect moves as one.', slot: 'site', source: OK,
    file: 'SmoothScroll.tsx', exportName: 'SmoothScroll', deps: ['lenis'], levels: MOVING, sections: [],
    usage: '// app/layout.tsx, inside <body>:\n<SmoothScroll />',
    rules: ['Mouse and trackpad only — touch keeps the phone’s own scroll.', 'Never hijack the scroll: the page moves exactly as far as the visitor scrolls.'],
  },
  'ambient-sound': {
    id: 'ambient-sound', name: 'Sound, with a mute', line: 'A quiet sound loop visitors can turn on — the switch is always in view.', slot: 'site', source: OK,
    file: 'AmbientSound.tsx', exportName: 'AmbientSound', deps: [], levels: MOVING, sections: [],
    usage: '// app/layout.tsx, inside <body>:\n<AmbientSound src="/media/ambientSound.mp3" />',
    rules: ['Off until the visitor turns it on; never autoplays.', 'One calm loop (30–90 s, seamless); the site works fully without it.', 'The switch never covers text or another fixed bar: put it in the menu bar (`placement=""`) or keep the page clear of the corner it sits in.'],
  },
  'entry-gate': {
    id: 'entry-gate', name: 'A playful way in', line: 'The first visit opens under a sheet visitors drag away or hold to open — three seconds, always skippable.', slot: 'site', source: OK,
    file: 'EntryGate.tsx', exportName: 'EntryGate', deps: M, levels: LIVELY, sections: [],
    usage: '// app/layout.tsx, inside <body>:\n<EntryGate title="Lift the tracing paper" hint="Drag the sheet up or off to the side." action="Lift the sheet" />',
    rules: ['Once per visit (session); Skip is focused first and Esc skips.', 'The title says what to do in the brand’s own words; one action, never a puzzle.', 'Mount it as a direct child of <body> so it can make the page behind inert.'],
  },
  'chapter-colours': {
    id: 'chapter-colours', name: 'Each item brings its own colours', line: 'As each item reaches the middle of the screen, the whole section turns its colours.', slot: 'scroll', source: OK,
    file: 'ChapterColours.tsx', exportName: 'ChapterColours', deps: [], levels: MOVING, sections: ['featured-work', 'collection', 'product-grid', 'case-study', 'categories', 'product-highlight'],
    usage: '<ChapterColours>\n  <article data-ground="var(--color-chapter-1)" data-ink="var(--color-text)">…</article>\n</ChapterColours>',
    rules: ['Two colours per item (ground and ink) from its own photo or the colour chapters; text stays AA on every ground.', 'Wrap one section; the page’s own colours return above the first item.'],
  },
  lightbox: {
    id: 'lightbox', name: 'Tap to open large', line: 'Any photo opens full screen; arrows and swipe move between them.', slot: 'open', source: OK,
    file: 'Lightbox.tsx', exportName: 'Lightbox', deps: M, levels: ALL, sections: ['gallery', 'featured-work', 'collection', 'lookbook', 'about', 'editorial-story'],
    usage: 'const [open, setOpen] = useState<number | null>(null)\n// each photo: <button onClick={() => setOpen(i)}>…</button>\n<Lightbox photos={photos} index={open} onIndex={setOpen} />',
    rules: ['Every photo opens from a real <button> with the photo’s caption or alt as its name.', 'Captions travel with the photo into the viewer.'],
  },
}

export const MAX_HEAVY_PIECES = 2

/** Behaviours — the site's voice in motion, the same on every page (chosen in Design). Everything else is a moment:
 *  a piece placed on one section, on one page (chosen in Pages). One per behaviour, except the whole-site extras. */
export const behaviours: Record<BehaviourId, { name: string; line: string; ids: PieceId[]; many: boolean; none?: string }> = {
  headlines: { name: 'Headlines', line: 'How every big heading arrives', ids: ['text-effect', 'cut-reveal', 'duo-headline'], many: false, none: 'Headings simply appear' },
  links: { name: 'Links', line: 'What menu, footer and text links do on hover', ids: ['text-roll', 'scribble-link', 'wavy-link', 'underline-fill', 'text-scramble', 'hover-highlight'], many: false, none: 'A plain underline on hover' },
  buttons: { name: 'Main button', line: 'How the main action of each page responds', ids: ['magnetic', 'swap-button'], many: false, none: 'The button just changes colour' },
  transitions: { name: 'Between pages', line: 'What happens when visitors go to another page', ids: ['fade-transition', 'curtain-transition', 'blob-transition'], many: false, none: 'The next page simply appears' },
  site: { name: 'Whole site', line: 'Extras across every page — pick any', ids: ['entry-gate', 'preloader', 'smooth-scroll', 'ambient-sound', 'brand-cursor', 'cookie-note', 'scroll-progress', 'grain'], many: true },
}
export const behaviourOf = (id: PieceId): BehaviourId | undefined => (Object.keys(behaviours) as BehaviourId[]).find((b) => behaviours[b].ids.includes(id))
export const isMoment = (id: PieceId) => !behaviourOf(id)
