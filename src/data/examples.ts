// Finished sites built from a Recipe's Build Package — proof of what a Recipe actually produces.
// Each one lives at examples/{slug}/ as its own runnable Next.js project (see AGENTS.md). Its media
// is the single source of truth for what gets shown here — public/examples/{slug} is a symlink into
// examples/{slug}/public, not a copy, so there is exactly one copy of the bytes on disk.
// public/live/{slug}/ is a real static export of the site's code only (no media in it — its <img>/
// <video> tags are patched to point back at the symlinked path above), so visiting it is the actual site.

export type ExampleHero =
  | { kind: 'video'; src: string; poster: string }
  | { kind: 'image'; src: string }

/** One answer from the questionnaire that produced the site, as the user saw it. */
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
  /** Exactly what was picked to make it — recovered from the recipe files the site shipped with. */
  choices: RecipeChoice[]
  /** Anything beyond the Build Package that went into the build, stated plainly. */
  note?: string
  /** If it was built straight from a seed recipe (rather than a remix), link back to it. */
  recipeSlug?: string
}

export const examples: ExampleProject[] = [
  {
    slug: 'bluestone',
    title: 'Bluestone — Fine jewellery, formed in stone',
    summary: 'Diamond rings and earrings from the Bluestone atelier. Collection 07, Emberstone: pieces set in volcanic light.',
    mood: ['Nostalgic', 'Warm', 'Dramatic', 'Futuristic'],
    hero: { kind: 'video', src: '/examples/bluestone/media/hero-scrub.mp4', poster: '/examples/bluestone/media/hero-poster.webp' },
    livePath: '/live/bluestone/index.html',
    clip: '/examples/bluestone/media/collection-loop.mp4',
    // From start.md (recipe b04811e7). Palette and type are from the library before its 2026-09-27 refresh.
    choices: [
      { label: 'Making', value: 'Fashion house' },
      { label: 'Style', value: 'Film Inspired' },
      { label: 'Voice', value: 'Futuristic' },
      { label: 'First screen', value: 'Film on the first screen (scroll-controlled video)' },
      { label: 'Movement', value: 'Immersive' },
      { label: 'Colors', value: 'Earthy (earlier library)' },
      { label: 'Lettering', value: 'Bold Display (earlier library)' },
      { label: 'Layout', value: 'Full-bleed' },
      { label: 'Pages', value: 'Home — collection, lookbook, editorial story, product grid, journal' },
      { label: 'Built with', value: 'Recipe document (start.md)' },
    ],
  },
  {
    slug: 'skyisthelimit',
    title: 'SKYISTHELIMIT — art direction with the ceiling removed',
    summary: 'An art direction studio working at the edge of type, depth and motion.',
    mood: ['Expressive', 'Unexpected', 'Crafted'],
    hero: { kind: 'image', src: '/examples/skyisthelimit/media/preRenderedPoster.jpg' },
    livePath: '/live/skyisthelimit/index.html',
    // From recipe/*.md (recipe e9f8953e). Palette and type are from the library before its 2026-09-27 refresh.
    choices: [
      { label: 'Making', value: 'Creative experiment' },
      { label: 'Style', value: 'Art Direction' },
      { label: 'Voice', value: 'Futuristic' },
      { label: 'First screen', value: 'Object you can play with (3D scene)' },
      { label: 'Movement', value: 'Dynamic' },
      { label: 'Colors', value: 'High Contrast (earlier library)' },
      { label: 'Lettering', value: 'Experimental (earlier library)' },
      { label: 'Layout', value: 'Experimental' },
      { label: 'Pages', value: 'Home, Experiment, About, Contact, FAQ, Privacy Policy, 404, Sign In, Sign Up, Terms of Service, Cookie Policy, Accessibility' },
      { label: 'Built with', value: 'Claude Code' },
    ],
  },
  {
    slug: 'buytolose',
    title: 'BUYTOLOSE — Fleece, carry and snacks',
    summary: 'Fleece, carry and snacks from one Porto workshop, made in runs of two hundred.',
    mood: ['Dramatic', 'Dark', 'Rebellious'],
    hero: { kind: 'video', src: '/examples/buytolose/media/heroVideo.mp4', poster: '/examples/buytolose/media/posterImage.webp' },
    livePath: '/live/buytolose/index.html',
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
    title: 'Keepers — Citrus Coffee Soda',
    summary: 'Sparkling cold-brew coffee with orange and lemon peel, in a 330 ml can. 45 mg caffeine, 35 kcal.',
    mood: ['Direct', 'Informed', 'Urgent'],
    hero: { kind: 'video', src: '/examples/keepers/media/heroVideo.mp4', poster: '/examples/keepers/media/posterImage.jpg' },
    livePath: '/live/keepers/index.html',
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
]

export const exampleBySlug = Object.fromEntries(examples.map((e) => [e.slug, e])) as Record<string, ExampleProject>
