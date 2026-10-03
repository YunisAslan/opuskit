// Finished sites built from a Recipe's Build Package — proof of what a Recipe actually produces.
// Each one lives at examples/{slug}/ as its own runnable Next.js project (see AGENTS.md). Its media
// is the single source of truth for what gets shown here — public/examples/{slug} is a symlink into
// examples/{slug}/public, not a copy, so there is exactly one copy of the bytes on disk.
// public/live/{slug}/ is a real static export of the site's code only (no media in it — its <img>/
// <video> tags are patched to point back at the symlinked path above), so visiting it is the actual site.

import type { SectionId } from '@/types/domain'

export type ExampleHero =
  | { kind: 'video'; src: string; poster: string }
  | { kind: 'image'; src: string }

/** One choice that produced the site, as the user saw it (option names, exactly — `specFromChoices` reads them). */
export type RecipeChoice = { label: string; value: string }

export type ExampleProject = {
  slug: string
  title: string
  summary: string
  mood: string[]
  /** Real media from the site itself, shown directly — proof, not a mockup. */
  hero: ExampleHero
  /** A real static export (public/live/{slug}/, served at /live/{slug} by a rewrite) — opens the actual site, not a copy of it.
   *  Never link its index.html: the page would see /index.html as its path, not /, and mark the wrong menu link. */
  livePath: string
  /** A short, light loop from the same site for small previews (the hero file can be a heavy scrub encode). */
  clip?: string
  /** A few seconds of each of its sections arriving on screen — the kit shows one next to that part (plan §8). */
  sectionClips?: Partial<Record<SectionId, string>>
  /** One of the old examples (docs/plan-for-fit.md §9): stays on /examples until replaced, never offered in the kit as "a site like this". */
  legacy?: true
  /** Exactly what was picked to make it — recovered from the recipe files the site shipped with. */
  choices: RecipeChoice[]
  /** Anything beyond the Build Package that went into the build, stated plainly. */
  note?: string
  /** If it was built straight from a seed recipe (rather than a remix), link back to it. */
  recipeSlug?: string
}

export const examples: ExampleProject[] = [
  {
    slug: 'lowfield-nights',
    title: 'Lowfield Nights — Silent films, live scores, 12–14 June',
    summary: 'Three nights of silent films with live scores in a disused hangar on the Absheron coast, 12–14 June 2027. Entry free with an RSVP.',
    mood: ['Cinematic', 'Nocturnal', 'Warm'],
    hero: { kind: 'video', src: '/examples/lowfield-nights/media/heroVideo.mp4', poster: '/examples/lowfield-nights/media/posterImage.jpg' },
    livePath: '/live/lowfield-nights',
    // Clips are recorded by the user from the live export; until then the kit offers no clip of it.
    // Made in the kit, then built by Claude Code from its Build Package: opuskit.json is the exact recipe.
    choices: [
      { label: 'Making', value: 'Event / wedding' },
      { label: 'Name', value: 'Lowfield Nights' },
      { label: 'Visitors should', value: 'Book or reserve' },
      { label: 'Style', value: 'Cinematic Editorial' },
      { label: 'First screen', value: 'Whole-page scroll video' },
      { label: 'Movement', value: 'Immersive' },
      { label: 'Colors', value: 'Graphite & Sand' },
      { label: 'Lettering', value: 'High and Low' },
      { label: 'Layout', value: 'Full-bleed' },
      { label: 'Shape', value: 'Sharp' },
      { label: 'Menu', value: 'Centered logo' },
      { label: 'Big idea', value: 'A walk through named stops' },
      { label: 'Pages', value: 'Home, RSVP, Venue & travel, FAQ' },
      { label: 'Built with', value: 'Claude Code' },
    ],
    note: 'The film and photos are from Pexels (credits in media-src/SOURCES.md); the dates, players, venue and contacts are made up; the programme names four real public-domain silent films; Claude Code drew the logo during the build.',
  },
  {
    slug: 'velmira',
    title: 'Velmira, a lake house in the Gabala hills',
    summary: 'Nine rooms and a bathhouse on a lake in the Gabala hills: warm water, cold air, long quiet mornings.',
    mood: ['Dreamy', 'Soft', 'Still'],
    hero: { kind: 'video', src: '/examples/velmira/media/heroVideo.mp4', poster: '/examples/velmira/media/posterImage.jpg' },
    livePath: '/live/velmira',
    // Clips are recorded by the user from the live export; until then the kit offers no clip of it.
    // Made in the kit, then built by Claude Code from its Build Package: opuskit.json is the exact recipe.
    choices: [
      { label: 'Making', value: 'Hotel & travel' },
      { label: 'Name', value: 'Velmira' },
      { label: 'Visitors should', value: 'Book or reserve' },
      { label: 'Style', value: 'Ethereal' },
      { label: 'First screen', value: 'Ambient video hero' },
      { label: 'Movement', value: 'Subtle' },
      { label: 'Colors', value: 'Midnight Chapters' },
      { label: 'Lettering', value: 'Kalnia Couture' },
      { label: 'Layout', value: 'Full-bleed' },
      { label: 'Shape', value: 'Frosted glass' },
      { label: 'Menu', value: 'Centered logo' },
      { label: 'Big idea', value: 'One thing guides the scroll' },
      { label: 'Pages', value: 'Home, Rooms, Gallery, Book a stay, Getting here' },
      { label: 'Built with', value: 'Claude Code' },
    ],
    note: 'The film and photos are from Pexels and the lake sound from Pixabay (credits in media-src/SOURCES.md); rooms, prices, contacts and house rules are made up; Claude Code drew the logo during the build.',
  },
  {
    slug: 'saint-ashe',
    title: 'Saint Ashe | Black clothing cut in small runs in Tbilisi',
    summary: 'Black clothing cut in small runs in Tbilisi: heavy cotton, waxed wool and leather that ages with you.',
    mood: ['Dark', 'Sharp', 'Crafted'],
    hero: { kind: 'video', src: '/examples/saint-ashe/media/heroVideo.mp4', poster: '/examples/saint-ashe/media/posterImage.jpg' },
    livePath: '/live/saint-ashe',
    // Clips are recorded by the user from the live export; until then the kit offers no clip of it.
    // Made in the kit, then built by Claude Code from its Build Package: opuskit.json is the exact recipe.
    choices: [
      { label: 'Making', value: 'Fashion' },
      { label: 'Name', value: 'Saint Ashe' },
      { label: 'Visitors should', value: 'Buy something' },
      { label: 'Style', value: 'Gothic Modern' },
      { label: 'First screen', value: 'Ambient video hero' },
      { label: 'Movement', value: 'Dynamic' },
      { label: 'Colors', value: 'Mulberry' },
      { label: 'Lettering', value: 'New Gothic' },
      { label: 'Layout', value: 'Full-bleed' },
      { label: 'Shape', value: 'Sharp' },
      { label: 'Menu', value: 'Centered logo' },
      { label: 'Big idea', value: 'Loud covers, quiet reading' },
      { label: 'Pages', value: 'Home, Collections, About, Contact' },
      { label: 'Built with', value: 'Claude Code' },
    ],
    note: 'The film is from Pexels and the photos from Unsplash (credits in media-src/SOURCES.md); the collection, prices, team and shop address are made up; Claude Code drew the logo during the build.',
  },
  {
    slug: 'fennwood',
    title: 'Fennwood, a wood-fire kitchen in Bristol',
    summary: 'A wood-fire kitchen with forty seats in Bristol: vegetables from two farms, bread baked in the same oven, a menu that changes with the week.',
    mood: ['Warm', 'Honest', 'Crafted'],
    // Its first screen is one tall photo that drifts; the hero still is that photo.
    hero: { kind: 'image', src: '/examples/fennwood/media/hero.jpg' },
    livePath: '/live/fennwood',
    // Clips are recorded by the user from the live export; until then the kit offers no clip of it.
    // Made in the kit, then built by Claude Code from its Build Package: opuskit.json is the exact recipe.
    choices: [
      { label: 'Making', value: 'Restaurant' },
      { label: 'Name', value: 'Fennwood' },
      { label: 'Visitors should', value: 'Book or reserve' },
      { label: 'Style', value: 'Organic Modern' },
      { label: 'First screen', value: 'Full-bleed photo with depth' },
      { label: 'Movement', value: 'Dynamic' },
      { label: 'Colors', value: 'Apricot Hall' },
      { label: 'Lettering', value: 'Gallery Hours' },
      { label: 'Layout', value: 'Balanced' },
      { label: 'Shape', value: 'Soft' },
      { label: 'Menu', value: 'Centered logo' },
      { label: 'Big idea', value: 'One thing guides the scroll' },
      { label: 'Pages', value: 'Home, Menu, Reservations' },
      { label: 'Built with', value: 'Claude Code' },
    ],
    note: 'Photos are from Unsplash (credits in media-src/SOURCES.md); the address, phone number, farms, dishes and prices are made up; Claude Code drew the logo during the build.',
  },
  {
    slug: 'hane',
    title: 'Hane, physiotherapy and slow movement',
    summary: 'A small physiotherapy and slow-movement studio in Islington: hands-on treatment, then exercises you can keep doing at home.',
    mood: ['Still', 'Considered', 'Natural'],
    // Its first screen is one photo; the hero still is that photo.
    hero: { kind: 'image', src: '/examples/hane/media/hero.jpg' },
    livePath: '/live/hane',
    // Clips are recorded by the user from the live export; until then the kit offers no clip of it.
    // Made in the kit, then built by Claude Code from its Build Package: opuskit.json is the exact recipe.
    choices: [
      { label: 'Making', value: 'Health & wellness' },
      { label: 'Name', value: 'Hane' },
      { label: 'Visitors should', value: 'Book or reserve' },
      { label: 'Style', value: 'Japanese Minimal' },
      { label: 'First screen', value: 'Editorial image hero' },
      { label: 'Movement', value: 'Subtle' },
      { label: 'Colors', value: 'Pink Plaster' },
      { label: 'Lettering', value: 'Private Collection' },
      { label: 'Layout', value: 'Asymmetric' },
      { label: 'Shape', value: 'Soft' },
      { label: 'Menu', value: 'Classic bar' },
      { label: 'Big idea', value: 'A walk through named stops' },
      { label: 'Pages', value: 'Home, Treatments, Practitioners, Book an appointment, FAQ' },
      { label: 'Built with', value: 'Claude Code' },
    ],
    note: 'Photos are from Unsplash (credits in media-src/SOURCES.md); the address, phone number, practitioners, prices and quotes are made up; Claude Code drew the logo during the build.',
  },
  {
    slug: 'halvik',
    title: 'Halvik 65, a compact aluminium keyboard',
    summary: 'Halvik 65 is a compact mechanical keyboard in a powder-coated aluminium case, with hot-swap switches and a matching dial pad. From $159.',
    mood: ['Precise', 'Tactile', 'Calm'],
    // Its first screen is a product photo; the hero still is that photo.
    hero: { kind: 'image', src: '/examples/halvik/media/hero.jpg' },
    livePath: '/live/halvik',
    // Clips are recorded by the user from the live export; until then the kit offers no clip of it.
    // Made in the kit, then built by Claude Code from its Build Package: opuskit.json is the exact recipe.
    choices: [
      { label: 'Making', value: 'Product' },
      { label: 'Name', value: 'Halvik' },
      { label: 'Visitors should', value: 'Buy something' },
      { label: 'Style', value: 'Bento Product' },
      { label: 'First screen', value: 'Product stage' },
      { label: 'Movement', value: 'Subtle' },
      { label: 'Colors', value: 'Console Lilac' },
      { label: 'Lettering', value: 'Wide Spec' },
      { label: 'Layout', value: 'Grid-driven' },
      { label: 'Shape', value: 'Round' },
      { label: 'Menu', value: 'Floating pill' },
      { label: 'Big idea', value: 'One thing guides the scroll' },
      { label: 'Pages', value: 'Home, Features, Contact' },
      { label: 'Built with', value: 'Claude Code' },
    ],
    note: 'Photos are from Unsplash (credits in media-src/SOURCES.md; a small keycap logo was retouched out of four); the prices, specs, press and quotes are made up; Claude Code drew the logo during the build.',
  },
  {
    slug: 'sticky-weather',
    title: 'Sticky Weather, a design studio for brands that want to be picked up',
    summary: 'Sticky Weather is a small design studio in Bristol making identities, packaging and websites that feel like stickers on a laptop.',
    mood: ['Cheeky', 'Energetic', 'Crafted'],
    // Its first screen is stickers drawn in code: the hero still is the site's own first screen.
    hero: { kind: 'image', src: '/examples/sticky-weather/media/poster.jpg' },
    livePath: '/live/sticky-weather',
    // Clips are recorded by the user from the live export; until then the kit offers no clip of it.
    // Made in the kit, then built by Claude Code from its Build Package: opuskit.json is the exact recipe.
    choices: [
      { label: 'Making', value: 'Studio' },
      { label: 'Name', value: 'Sticky Weather' },
      { label: 'Visitors should', value: 'Get in touch' },
      { label: 'Style', value: 'Sticker Studio' },
      { label: 'First screen', value: 'Sticker orbit' },
      { label: 'Movement', value: 'Dynamic' },
      { label: 'Colors', value: 'Bubblegum' },
      { label: 'Lettering', value: 'Stack' },
      { label: 'Layout', value: 'Balanced' },
      { label: 'Shape', value: 'Sharp' },
      { label: 'Menu', value: 'Split pill' },
      { label: 'Big idea', value: 'A playful way in' },
      { label: 'Pages', value: 'Home, Practice, About, Contact' },
      { label: 'Built with', value: 'Claude Code' },
    ],
    note: 'Photos are from Unsplash (credits in media-src/SOURCES.md); the stickers and the logo were drawn in code by Claude Code during the build; the clients, team names and contact details are made up.',
  },
  {
    slug: 'hexmint',
    title: 'Hexmint: invoices, expenses and quarterly books for small studios',
    summary: 'Invoices, expenses and quarterly books for small studios. Set up in five minutes, closed in one click.',
    mood: ['Precise', 'Advanced', 'Calm'],
    // Its first screen is a 3D scene built in code; the hero still is the poster rendered from that scene.
    hero: { kind: 'image', src: '/examples/hexmint/media/hero-poster.jpg' },
    livePath: '/live/hexmint',
    // Clips are recorded by the user from the live export; until then the kit offers no clip of it.
    // Made in the kit, then built by Claude Code from its Build Package: opuskit.json is the exact recipe.
    choices: [
      { label: 'Making', value: 'SaaS' },
      { label: 'Name', value: 'Hexmint' },
      { label: 'Visitors should', value: 'Sign up or start a trial' },
      { label: 'Style', value: 'Digital Futurism' },
      { label: 'First screen', value: '3D / WebGL scene' },
      { label: 'Movement', value: 'Immersive' },
      { label: 'Colors', value: 'Night Ink' },
      { label: 'Lettering', value: 'Funnel' },
      { label: 'Layout', value: 'Grid-driven' },
      { label: 'Shape', value: 'Round' },
      { label: 'Menu', value: 'Floating pill' },
      { label: 'Big idea', value: 'A live console' },
      { label: 'Pages', value: 'Home, Features, Pricing, FAQ' },
      { label: 'Built with', value: 'Claude Code' },
    ],
    note: 'No photos: the 3D scene is built in code and its stills are rendered from it; clients, quotes and product figures are made up; Claude Code drew the logo during the build.',
  },
  {
    slug: 'brasshand',
    title: 'Brasshand, a branding studio in Baku',
    summary: 'Brasshand is a three-person branding studio in Baku: names, identities and campaigns for food, music and culture.',
    mood: ['Bold', 'Articulate', 'Graphic'],
    // Its first screen is type, not media: the hero still is the site's own first screen.
    hero: { kind: 'image', src: '/examples/brasshand/media/poster.jpg' },
    livePath: '/live/brasshand',
    // Clips are recorded by the user from the live export; until then the kit offers no clip of it.
    // Made in the kit, then built by Claude Code from its Build Package: opuskit.json is the exact recipe.
    choices: [
      { label: 'Making', value: 'Agency' },
      { label: 'Name', value: 'Brasshand' },
      { label: 'Visitors should', value: 'Get in touch' },
      { label: 'Style', value: 'Typography First' },
      { label: 'First screen', value: 'Kinetic type hero' },
      { label: 'Movement', value: 'Dynamic' },
      { label: 'Colors', value: 'Lido Blue' },
      { label: 'Lettering', value: 'Poster Caps' },
      { label: 'Layout', value: 'Editorial' },
      { label: 'Shape', value: 'Sharp' },
      { label: 'Menu', value: 'Full-screen menu' },
      { label: 'Big idea', value: 'Chapters in giant words' },
      { label: 'Pages', value: 'Home, Case Studies, Services, About, Contact' },
      { label: 'Built with', value: 'Claude Code' },
    ],
    note: 'Photos are from Unsplash (credits in media-src/SOURCES.md); the clients, team names and figures are made up; Claude Code drew the logo during the build.',
  },
  {
    slug: 'slow-atlas',
    title: 'Slow Atlas | Long-form travel essays',
    summary: 'An independent magazine of long-form travel essays. One place per essay, told slowly, every second Sunday.',
    mood: ['Direct', 'Informed', 'Urgent'],
    // Its first screen is type, not media: the hero still is the site's own first screen.
    hero: { kind: 'image', src: '/examples/slow-atlas/media/poster.jpg' },
    livePath: '/live/slow-atlas',
    // Rebuilt 2026-10-01 (plan-vibe C): clips are re-recorded by the user from the new live export — until then the kit
    // offers no clip of it. Add `clip` and `sectionClips` (public/media/clips/{sectionId}.mp4) when they land.
    // Made in the kit, then built by Claude Code from its Build Package: opuskit.json is the exact recipe.
    choices: [
      { label: 'Making', value: 'Blog / magazine' },
      { label: 'Name', value: 'Slow Atlas' },
      { label: 'Visitors should', value: 'Subscribe' },
      { label: 'Style', value: 'News Grid' },
      { label: 'First screen', value: 'Typographic statement' },
      { label: 'Movement', value: 'Subtle' },
      { label: 'Colors', value: 'Cherry Red' },
      { label: 'Lettering', value: 'Newsroom' },
      { label: 'Layout', value: 'Grid-driven' },
      { label: 'Shape', value: 'Sharp' },
      { label: 'Menu', value: 'Classic bar' },
      { label: 'Big idea', value: 'Loud covers, quiet reading' },
      { label: 'Pages', value: 'Home, Articles, About, Newsletter, Article' },
      { label: 'Built with', value: 'Claude Code' },
    ],
    note: 'Photos are from Unsplash (credits in media-src/SOURCES.md); Claude Code drew the logo during the build.',
  },
]

export const exampleBySlug = Object.fromEntries(examples.map((e) => [e.slug, e])) as Record<string, ExampleProject>
