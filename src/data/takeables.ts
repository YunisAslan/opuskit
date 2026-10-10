// What the Library offers to take, one card per design (the user, 2026-10-10): a design shows once, on the site that
// shows it best (`bestOn`), under a name that earns it — never "Footer" or "Gallery" alone. Kept: only what is
// special, a site's own idea worth taking by hand — `NOT_OFFERED` names the rest; left out: parts whose versions are
// not worth choosing between (every testimonials or FAQ section — `SIGNATURE_PARTS` in features/library/collection.ts).
//
// A design is keyed by what builds it: `hero:{HeroId}`, `nav:{NavStyleId}`, `footer:{FooterStyleId}`,
// `section:{SectionId}` or `section:{SectionId}/{variant}`, `effect:{PieceId}`. check.ts fails when a site in the
// Library has a design missing here — so every new example (or a new thing brought in from a site the user sends)
// gets its name, its category and the site that shows it best before it can be taken.
import type { SiteRef } from '@/features/library/collection'

export type TakeGroup = 'sections' | 'moments' | 'touches'
export type TakeEntry = { key: string; group: TakeGroup; category: string; name: string; line: string; bestOn: SiteRef }

/** The Library offers only what is special — a site's own idea, worth taking by hand (the user, 2026-10-10): not the
 *  basics any AI builder does unasked (a bar menu, a grid of work, a story column, a timeline, a soft fade, a reading
 *  line), nor near-twins of a design it does offer. Sites keep these and the engine still builds them; they are not
 *  choices here. check.ts counts them as named. */
export const NOT_OFFERED = new Set([
  'hero:type-statement', 'hero:parallax-photo', 'hero:editorial-image', 'hero:product-stage',
  'nav:classic-bar', 'nav:centered-logo', 'nav:floating-pill', 'nav:split-pill',
  'section:featured-work/staggered', 'section:featured-work/grid', 'section:featured-work/index', 'section:case-study', 'section:product-grid', 'section:collection',
  'section:gallery', 'section:editorial-story', 'section:manifesto/giant', 'section:timeline', 'section:schedule', 'section:menu',
  'footer:contact', 'footer:signature',
  'effect:fade-transition', 'effect:text-effect', 'effect:smooth-scroll', 'effect:scroll-progress', 'effect:lightbox', 'effect:underline-fill',
])
/** How a section's card shows it (the user, 2026-10-10: by what suits each): a menu or a footer is drawn pure, in the
 *  standard dark theme like Moments and Touches; a first screen or a showcase is shown as its site has it. */
export const shownPure = (key: string) => key.startsWith('nav:') || key.startsWith('footer:')

/** Categories in the order they are shown inside their group. */
export const TAKE_CATEGORIES: Record<TakeGroup, string[]> = {
  sections: ['First screen', 'Menu', 'Showcase', 'Footer'],
  moments: ['Welcome', 'Page change', 'Headline', 'Scroll', 'Photos', 'Sound'],
  // Scrambling labels are a link hover too (one of the one-of links): they sit with the links, not in a group of their own.
  touches: ['Link', 'Button', 'Cursor'],
}

const s = (key: string, category: string, name: string, line: string, site: string): TakeEntry => ({ key, group: 'sections', category, name, line, bestOn: `example:${site}` as SiteRef })
const m = (key: string, category: string, name: string, line: string, site: string): TakeEntry => ({ key, group: 'moments', category, name, line, bestOn: `example:${site}` as SiteRef })
const t = (key: string, category: string, name: string, line: string, site: string): TakeEntry => ({ key, group: 'touches', category, name, line, bestOn: `example:${site}` as SiteRef })

export const TAKEABLES: TakeEntry[] = [
  // ─── Sections: first screens (the ones a site in the Library shows) ───
  s('hero:scroll-video', 'First screen', 'Film that plays as you scroll', 'A full-screen film held in place; scrolling moves it forward and back.', 'halden'),
  s('hero:kinetic-type', 'First screen', 'Words that move with the scroll', 'Huge words drift, stretch or change weight as you scroll.', 'sela-mor'),
  s('hero:orbit-stickers', 'First screen', 'Stickers orbiting the headline', 'Brand stickers and small photos circle a two-voice headline.', 'sticky-weather'),
  s('hero:illustrated', 'First screen', 'A drawing that comes apart as you scroll', 'The first screen is a drawing in layers: scrolling pulls them apart, its moths lean toward the pointer.', 'inkwell-moth'),
  s('hero:webgl-scene', 'First screen', 'Live 3D object', 'A 3D object you can watch turn, lit softly behind the headline.', 'hexmint'),

  // ─── Sections: menus (all eight) ───
  s('nav:fullscreen-menu', 'Menu', 'Full-screen menu in big type', 'A “Menu” label opens the whole screen with the pages set large.', 'brasshand'),
  s('nav:side-index', 'Menu', 'Menu as a side index', 'A fixed column on the left lists the pages like a book’s index.', 'fieldhouse'),
  s('nav:card-menu', 'Menu', 'Menu that opens into picture cards', 'Opening it shows a few cards, each a part of the site with a photo.', 'kur-delta-watch'),
  s('nav:bottom-dock', 'Menu', 'Floating dock at the bottom', 'The pages sit in a small dock at the bottom of the screen, like an app.', 'night-shift'),

  // ─── Sections: content ───
  s('section:featured-work/stack', 'Showcase', 'Work, one project per screen', 'Each project fills the width, its picture first.', 'ninth-row'),
  s('section:product-highlight', 'Showcase', 'Product with its details called out', 'One product large, its details pointed out around it.', 'pip-kiln'),

  // ─── Sections: footers (all five) ───
  s('footer:wordmark', 'Footer', 'Big name footer', 'Links in one row, then the name set across the full width.', 'ninth-row'),
  s('footer:index', 'Footer', 'Everything, listed', 'Every page in columns under the name and one line of contact.', 'qum'),
  s('footer:line', 'Footer', 'One quiet line', 'The name, a few links and the copyright on one line.', 'kelp-line'),

  // ─── Moments: things that happen on the page ───
  m('effect:preloader', 'Welcome', 'Your name counting in as it loads', 'The first visit opens on the name while the page loads, then lifts away.', 'brasshand'),
  m('effect:entry-gate', 'Welcome', 'A door to open first', 'The first visit opens under a sheet the visitor drags or holds away.', 'sticky-weather'),
  m('effect:curtain-transition', 'Page change', 'Curtain between pages', 'A panel with the next page’s name rises over the page, then lifts.', 'ninth-row'),
  m('effect:blob-transition', 'Page change', 'Colour blob between pages', 'A blob of colour sweeps over the screen between pages.', 'sticky-weather'),
  m('effect:cut-reveal', 'Headline', 'Words cut out of a mask', 'Headline words slide up out of a hard edge.', 'slow-atlas'),
  m('effect:split-flap', 'Headline', 'Departure board letters', 'Letters flick through characters until they land, like a station board.', 'kur-delta-watch'),
  m('effect:pinned-stage', 'Scroll', 'Section held while you scroll', 'A section stays still while scrolling moves it through its steps.', 'sela-mor'),
  m('effect:tilted-grid', 'Scroll', 'Photo grid that stands up as you scroll', 'A dense grid of photos lies tilted, then stands up flat.', 'inkwell-moth'),
  m('effect:chapter-colours', 'Scroll', 'Colours that change with each item', 'As each item reaches the middle, the whole section takes its colours.', 'inkwell-moth'),
  m('effect:drag-photos', 'Photos', 'Prints on a desk', 'Photos scattered like prints; visitors pick one up and move it.', 'inkwell-moth'),
  m('effect:image-trail', 'Photos', 'Photos follow the cursor', 'Moving across a section leaves a short trail of photos.', 'pale-hour'),
  m('effect:image-comparison', 'Photos', 'Before and after slider', 'Drag a divider across two photos of the same view.', 'night-shift'),
  m('effect:ambient-sound', 'Sound', 'Sound you can switch on', 'A quiet sound loop, off until the visitor turns it on.', 'sela-mor'),

  // ─── Touches: how it answers the hand ───
  t('effect:wavy-link', 'Link', 'Wavy underline', 'A link’s underline draws in as a wave.', 'pip-kiln'),
  t('effect:scribble-link', 'Link', 'Hand-drawn underline', 'A squiggle draws itself under a link; the current page keeps it.', 'fennwood'),
  t('effect:text-roll', 'Link', 'Links that roll their letters', 'Each letter of a link rolls over to a fresh copy.', 'brasshand'),
  t('effect:magnetic', 'Button', 'Button that pulls to the cursor', 'The main button leans toward the pointer when it comes near.', 'sela-mor'),
  t('effect:brand-cursor', 'Cursor', 'A cursor drawn in your brand', 'The arrow on your site becomes your own drawn pointer — in your colours, or your mark.', 'sticky-weather'),
  t('effect:text-scramble', 'Link', 'Links that scramble into place', 'A link’s letters scramble and settle into its word on hover.', 'hexmint'),
]

export const TAKE_BY_KEY = new Map(TAKEABLES.map((x) => [x.key, x]))
/** Words a card's name may never be on its own: the name must say which one it is. */
export const GENERIC_NAMES = new Set(['first screen', 'menu', 'navigation', 'footer', 'gallery', 'work', 'products', 'story', 'schedule', 'effect', 'section'])
