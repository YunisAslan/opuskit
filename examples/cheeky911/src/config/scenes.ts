// Scene map for the hero film (heroVideo / scrubReadyEncode, 15.4s, 720×1280).
// start/end are fractions of the timeline; cuts measured with ffmpeg scene detection
// (1.77s, 3.40s, 4.53s, 7.17s, 9.47s, 10.40s, 13.60s). Short neighbouring shots of the
// same subject share one scene so every message has time to hold.
export type Reveal = 'lines' | 'wipe' | 'rise' | 'track' | 'scale'

export type Scene = {
  id: string
  start: number
  end: number
  shot: string
  /** [text, width utility] — width is art-directed per line */
  lines: [string, 'stretch-wide' | 'stretch-mid' | 'stretch-narrow'][]
  body?: string
  price?: string
  link?: { href: string; label: string }
  reveal: Reveal
}

export const scenes: Scene[] = [
  {
    id: 'headlight', start: 0, end: 0.114, shot: 'Headlight close-up',
    lines: [['Nine eleven,', 'stretch-wide'], ['held still', 'stretch-narrow']],
    body: 'A fashion house for the Porsche 911. Scroll to run the film.',
    link: { href: '/collections', label: 'See the work' },
    reveal: 'lines',
  },
  {
    id: 'wing', start: 0.114, end: 0.293, shot: 'Wheel, then the rear wing from below',
    lines: [['911 GT3 RS,', 'stretch-narrow'], ['Obsidian', 'stretch-mid']],
    body: 'Swan-neck wing and satin black centre-lock wheels, 3,100 km from new.',
    price: '€289,000',
    link: { href: '/shop#gt3-rs-obsidian', label: 'See the car' },
    reveal: 'wipe',
  },
  {
    id: 'taillight', start: 0.293, end: 0.463, shot: 'Tail light bar in close-up',
    lines: [['One red', 'stretch-wide'], ['line across', 'stretch-narrow'], ['the dusk', 'stretch-mid']],
    reveal: 'track',
  },
  {
    id: 'rooftop', start: 0.463, end: 0.672, shot: 'Wide on the rooftop, then rear three-quarter',
    lines: [['Top floor,', 'stretch-mid'], ['last light,', 'stretch-narrow'], ['one lap', 'stretch-mid']],
    reveal: 'rise',
  },
  {
    id: 'standing', start: 0.672, end: 0.879, shot: 'Parked, facing camera',
    lines: [['Stopped,', 'stretch-mid'], ['engine ticking,', 'stretch-narrow'], ['lights on', 'stretch-mid']],
    reveal: 'scale',
  },
  {
    id: 'sky', start: 0.879, end: 1, shot: 'Wing against the evening sky',
    lines: [['Last light', 'stretch-mid'], ['on the wing', 'stretch-narrow']],
    link: { href: '/collections', label: 'Keep exploring' },
    reveal: 'lines',
  },
]
