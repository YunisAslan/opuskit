// Asset reference layer. Components never hardcode media paths — they ask for a key.
// One entry per row of the shot list (recipe/media.md), at the exact size and ratio given. Everything here is the
// owner's own media (status 'have'): the film is prepared by scripts/prepare-video.sh from
// media-src/projector-original.mp4, and the photos are listed with their sources and credits in media-src/SOURCES.md.
// alt says what each picture really shows; caption is the line the site sets beside it. Replacing a file: drop it into
// public/media under the same name, then rewrite its alt and caption from the new picture.

export type AssetStatus = 'have' | 'temporary'

type Media = {
  src: string
  files?: readonly string[]
  width?: number
  height?: number
  ratio?: string
  alt: string
  /** One alt per file, where a key holds several photos. */
  alts?: readonly string[]
  /** The line set beside the picture; one per file where a key holds several. */
  caption?: string
  captions?: readonly string[]
  /** Where each crop centres (CSS object-position), chosen per photo so a wide crop keeps its subject. */
  focus?: string
  foci?: readonly string[]
  status: AssetStatus
  usage?: string
}

export const assets = {
  heroVideo: { src: '/media/heroVideo.mp4', width: 1920, height: 1080, alt: '', status: 'have', usage: 'Hero (loop or scroll-controlled)' },
  posterImage: { src: '/media/posterImage.jpg', width: 1920, height: 1080, alt: 'Close on an old film projector, its lamp burning, dust drifting through the beam above rows of red seats', status: 'have', usage: 'Shown before video loads and on reduced motion' },
  posterMobile: { src: '/media/posterMobile.jpg', width: 1080, height: 1920, alt: 'Close on an old film projector, its lamp burning, dust drifting through the beam', status: 'have', usage: 'Phone poster' },
  mobileVideoEncode: { src: '/media/mobileVideoEncode.mp4', width: 1080, height: 1920, alt: '', status: 'have', usage: 'Hero on small screens — made from the hero video by scripts/prepare-video.sh' },
  scrubReadyEncode: { src: '/media/scrubReadyEncode.mp4', width: 1920, height: 1080, alt: '', status: 'have', usage: 'Scroll-controlled hero' },
  // Home · Featured Work; Programme · Featured Work — one per season, in the order of src/content/programme.ts
  featuredWork: {
    src: '/media/featuredWork-1.jpg',
    files: ['/media/featuredWork-1.jpg', '/media/featuredWork-2.jpg', '/media/featuredWork-3.jpg', '/media/featuredWork-4.jpg'],
    width: 2400, height: 1600, ratio: '3:2',
    alt: 'Four pictures of the cinema, one for each season',
    alts: [
      'A cinema marquee spelling CINEMA in red bulb-lit letters, glowing against the night sky',
      'A curl of 35mm film strip, its frames and sprocket holes lit warm against a deep red ground',
      'An audience in red seats, soft and out of focus, facing a bright blank screen as the lights go down',
      'A small auditorium in red: rows of velvet seats before a red curtain, two people waiting for the film',
    ],
    captions: [
      'The marquee, lit for the late show.',
      'A print, threaded by hand.',
      'Lights down, the screen still white.',
      'An afternoon, a few seats taken.',
    ],
    // the marquee sits high, the screen is the top edge of the third — the wide band keeps it in frame
    foci: ['50% 50%', '50% 50%', '50% 22%', '50% 45%'],
    status: 'have',
  },
  // Visit · Location
  location: { src: '/media/location.jpg', width: 2400, height: 1350, ratio: '16:9', alt: 'The way in at night: a lit CINEMA sign over glass doors, someone walking inside', caption: 'In under the lit sign', focus: '55% 50%', status: 'have' },
  // About · About
  about: { src: '/media/about.jpg', width: 2400, height: 1350, ratio: '16:9', alt: 'An old projector on a wooden stand, throwing a beam of light through haze across a dark room', caption: 'The lamp, lit.', focus: '36% 50%', status: 'have' },
  // About · Team — one per person, in the order of src/content/about.ts. The captions are the site's own words (name and
  // role, set by the Team section from src/content/about.ts); alt describes the portrait itself.
  team: {
    src: '/media/team-1.jpg',
    files: ['/media/team-1.jpg', '/media/team-2.jpg', '/media/team-3.jpg', '/media/team-4.jpg'],
    width: 2000, height: 1333, ratio: '3:2',
    alt: 'Four portraits, in the same warm low light',
    alts: [
      'Portrait of a woman with short platinum-blonde hair and a black jacket, in warm low light against a dark wall',
      'Portrait of a man with a short beard in a grey T-shirt, lit from one side against black',
      'Portrait of a woman with dark hair falling across one eye, her hand raised to her head, against black',
      'Close portrait of a young man with dark hair, half his face in shadow, against black',
    ],
    status: 'have',
  },
} as const satisfies Record<string, Media>

export type AssetKey = keyof typeof assets

/** Resolve a key (and, for multi-file keys, an index) to one file. */
export function asset(key: AssetKey, index = 0) {
  const a: Media = assets[key]
  const src = a.files?.[index] ?? a.src
  const alt = a.alts?.[index] ?? a.alt
  const caption = a.captions?.[index] ?? a.caption
  const focus = a.foci?.[index] ?? a.focus ?? '50% 50%'
  return { src, alt, caption, focus, width: a.width ?? 1600, height: a.height ?? 900, status: a.status }
}
