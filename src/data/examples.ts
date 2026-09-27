// Finished sites built from a Recipe's Build Package — proof of what a Recipe actually produces.
// Each one lives at examples/{slug}/ as its own runnable Next.js project (see AGENTS.md). Its media
// is the single source of truth for what gets shown here — public/examples/{slug} is a symlink into
// examples/{slug}/public, not a copy, so there is exactly one copy of the bytes on disk.
// public/live/{slug}/ is a real static export of the site's code only (no media in it — its <img>/
// <video> tags are patched to point back at the symlinked path above), so visiting it is the actual site.

export type ExampleHero =
  | { kind: 'video'; src: string; poster: string }
  | { kind: 'image'; src: string }

export type ExampleProject = {
  slug: string
  title: string
  summary: string
  mood: string[]
  /** Real media from the site itself, shown directly — proof, not a mockup. */
  hero: ExampleHero
  /** index.html of a real static export — opens the actual site, not a copy of it. */
  livePath: string
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
  },
  {
    slug: 'skyisthelimit',
    title: 'SKYISTHELIMIT — art direction with the ceiling removed',
    summary: 'An art direction studio working at the edge of type, depth and motion.',
    mood: ['Expressive', 'Unexpected', 'Crafted'],
    hero: { kind: 'image', src: '/examples/skyisthelimit/media/preRenderedPoster.jpg' },
    livePath: '/live/skyisthelimit/index.html',
  },
]

export const exampleBySlug = Object.fromEntries(examples.map((e) => [e.slug, e])) as Record<string, ExampleProject>
