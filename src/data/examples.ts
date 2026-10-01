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
  /** index.html of a real static export — opens the actual site, not a copy of it. */
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
    slug: 'slow-atlas',
    title: 'Slow Atlas — One place, told slowly',
    summary: 'An independent magazine of long-form travel essays — one place, told slowly.',
    mood: ['Direct', 'Informed', 'Urgent'],
    // Its first screen is type, not media: the hero still is the site's own first screen.
    hero: { kind: 'image', src: '/examples/slow-atlas/media/poster.jpg' },
    livePath: '/live/slow-atlas/index.html',
    clip: '/examples/slow-atlas/media/clip.mp4',
    sectionClips: Object.fromEntries((['navbar', 'intro', 'journal', 'about', 'team', 'editorial-story', 'contact-cta', 'footer'] as const).map((id) => [id, `/examples/slow-atlas/media/clips/${id}.mp4`])),
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
      { label: 'Pages', value: 'Home, Articles, About, Newsletter, Article' },
      { label: 'Built with', value: 'Claude Code' },
    ],
    note: 'Photos are from Unsplash (credits in media-src/SOURCES.md); Claude Code drew the logo during the build.',
  },
  {
    slug: 'swiss-modern-event-site-claude-code',
    legacy: true,
    title: 'RALPH&LAUREN — Sheki Polo Weekend, 11–13 June 2027',
    summary: 'Three days of polo on the grass ground in Sheki, 11–13 June 2027. Seats by RSVP.',
    mood: ['Rational', 'Direct', 'Timeless'],
    hero: { kind: 'video', src: '/examples/swiss-modern-event-site-claude-code/media/heroVideo.mp4', poster: '/examples/swiss-modern-event-site-claude-code/media/posterImage.jpg' },
    livePath: '/live/swiss-modern-event-site-claude-code/index.html',
    // From CLAUDE.md + recipe/*.md. The owner's 720×404 web-copy video was sharpened afterwards with the automatic
    // Real-ESRGAN step now built into prepare-video.sh (the version it was built with only suggested it).
    choices: [
      { label: 'Making', value: 'Event / wedding' },
      { label: 'Name', value: 'RALPH&LAUREN' },
      { label: 'Visitors should', value: 'Book or reserve' },
      { label: 'Style', value: 'Swiss Modern' },
      { label: 'First screen', value: 'Film on the first screen (own video uploaded)' },
      { label: 'Movement', value: 'Immersive' },
      { label: 'Colors', value: 'Signal White' },
      { label: 'Lettering', value: 'Loud and Clear' },
      { label: 'Layout', value: 'Grid-driven' },
      { label: 'Photos', value: 'Even grid (temporary stock photos)' },
      { label: 'Pages', value: 'Home, RSVP, Venue & travel, FAQ, Gallery, Contact, Sign In, Sign Up, Privacy Policy, Terms of Service, Cookie Policy, Accessibility' },
      { label: 'Built with', value: 'Claude Code' },
    ],
    note: 'Its 720×404 source video was sharpened to 1920×1078 by the prepare-video.sh step that now runs automatically for every small upload.',
  },
  {
    slug: 'cheeky911',
    legacy: true,
    title: 'CHEEKY, a fashion house for the 911',
    summary: 'Porsche 911s, filmed and shown like a collection. Selected cars, one season at a time.',
    mood: ['Nostalgic', 'Warm', 'Dramatic'],
    hero: { kind: 'video', src: '/examples/cheeky911/media/heroVideo.mp4', poster: '/examples/cheeky911/media/posterImage.jpg' },
    livePath: '/live/cheeky911/index.html',
    clip: '/examples/cheeky911/media/clip.mp4',
    // From CLAUDE.md + recipe/*.md (recipe e8e483ca).
    choices: [
      { label: 'Making', value: 'Fashion' },
      { label: 'Name', value: 'CHEEKY' },
      { label: 'Visitors should', value: 'Explore the work' },
      { label: 'Style', value: 'Film-inspired' },
      { label: 'First screen', value: 'Film on the first screen (own video uploaded)' },
      { label: 'Movement', value: 'Immersive' },
      { label: 'Colors', value: 'Oxblood Room' },
      { label: 'Lettering', value: 'Stretch Test' },
      { label: 'Layout', value: 'Full-bleed' },
      { label: 'Photos', value: 'Endless rows (11 own photos uploaded)' },
      { label: 'Pages', value: 'Home, Collections, About, Contact, Size Guide, Gift Cards, Wholesale, FAQ, Journal, Sign In, Cookie Policy, Sign Up, Privacy Policy, Terms of Service, Shop' },
      { label: 'Built with', value: 'Claude Code' },
    ],
  },
  {
    slug: 'buytolose',
    legacy: true,
    title: 'BUYTOLOSE — Fleece, carry and snacks',
    summary: 'Fleece, carry and snacks from one Porto workshop, made in runs of two hundred.',
    mood: ['Dramatic', 'Dark', 'Rebellious'],
    hero: { kind: 'video', src: '/examples/buytolose/media/heroVideo.mp4', poster: '/examples/buytolose/media/posterImage.webp' },
    livePath: '/live/buytolose/index.html',
    clip: '/examples/buytolose/media/clip.mp4',
    // From CLAUDE.md + recipe/*.md (recipe 9858fffc).
    choices: [
      { label: 'Making', value: 'E-commerce store' },
      { label: 'Name', value: 'BUYTOLOSE' },
      { label: 'Visitors should', value: 'Buy something — “Add to bag”' },
      { label: 'Style', value: 'Gothic Modern' },
      { label: 'First screen', value: 'Film on the first screen (own video uploaded)' },
      { label: 'Movement', value: 'Immersive' },
      { label: 'Colors', value: 'Pool Tile' },
      { label: 'Lettering', value: 'Round Future' },
      { label: 'Layout', value: 'Full-bleed' },
      { label: 'Pages', value: 'Home, Shop, Product, Cart, Checkout, Account, About, Contact, Shipping & Returns, Size Guide, Gift Cards, Testimonials, FAQ, Sign In, Sign Up, Privacy Policy, Terms of Service, Cookie Policy, 404' },
      { label: 'Built with', value: 'Claude Code' },
    ],
    note: 'One follow-up prompt refined the hero film: scene-by-scene text synced to the video, with products named at each pause or zoom. That guidance is now built into every scroll-film recipe, so it is no longer needed.',
  },
  {
    slug: 'keepers',
    legacy: true,
    title: 'Keepers — Citrus Coffee Soda',
    summary: 'Sparkling cold-brew coffee with orange and lemon peel, in a 330 ml can. 45 mg caffeine, 35 kcal.',
    mood: ['Direct', 'Informed', 'Urgent'],
    hero: { kind: 'video', src: '/examples/keepers/media/heroVideo.mp4', poster: '/examples/keepers/media/posterImage.jpg' },
    livePath: '/live/keepers/index.html',
    clip: '/examples/keepers/media/clip.mp4',
    // From CLAUDE.md + recipe/*.md (recipe 1c6a6cfc).
    choices: [
      { label: 'Making', value: 'Product launch' },
      { label: 'Name', value: 'KEEPERS' },
      { label: 'Visitors should', value: 'Explore the work' },
      { label: 'Style', value: 'News Grid' },
      { label: 'First screen', value: 'Film behind the whole page (own video uploaded)' },
      { label: 'Movement', value: 'Immersive' },
      { label: 'Colors', value: 'Electric Lime' },
      { label: 'Lettering', value: 'Workshop Manual' },
      { label: 'Layout', value: 'Full-bleed' },
      { label: 'Pages', value: 'Home, Features, Contact, Testimonials, Privacy Policy, Terms of Service, Cookie Policy, About, Pricing, Comparison, FAQ, Sign In, Sign Up, 404, Accessibility' },
      { label: 'Built with', value: 'Claude Code' },
    ],
  },
  {
    slug: 'kofii',
    legacy: true,
    title: 'KOFİİ — Coffee, made to order',
    summary: 'A small coffee shop in Old Town. Espresso, iced drinks, matcha and cake, each one made to order.',
    mood: ['Light', 'Friendly', 'Functional'],
    hero: { kind: 'video', src: '/examples/kofii/media/heroVideo.mp4', poster: '/examples/kofii/media/posterImage.jpg' },
    livePath: '/live/kofii/index.html',
    clip: '/examples/kofii/media/clip.mp4',
    choices: [
      { label: 'Making', value: 'Restaurant' },
      { label: 'Name', value: 'KOFİİ' },
      { label: 'Visitors should', value: 'Explore the work' },
      { label: 'Style', value: 'Scandinavian Minimal' },
      { label: 'First screen', value: 'Film behind the whole page (own video uploaded)' },
      { label: 'Movement', value: 'Immersive' },
      { label: 'Colors', value: 'Celery Room' },
      { label: 'Lettering', value: 'Grid Discipline' },
      { label: 'Photos', value: 'Liquid glass carousel (9 own photos uploaded)' },
      { label: 'Pages', value: 'Home, Menu, Reservations, About, Gallery, Contact, Order Online, Catering & Private Events, Locations, Gift Cards, Privacy Policy, FAQ, Sign In, Sign Up, Terms of Service, Cookie Policy, 404, Accessibility' },
      { label: 'Built with', value: 'Claude Code' },
    ],
  },
]

export const exampleBySlug = Object.fromEntries(examples.map((e) => [e.slug, e])) as Record<string, ExampleProject>
