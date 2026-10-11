// Asset reference layer. Components never hardcode media paths — they ask for a key (<MediaAsset id="…" />).
// One entry per row of the shot list (recipe/media.md). status: 'have' = the owner's real file; 'temporary' = a
// labelled placeholder at the exact size and ratio the shot list asks for — drop the real file in at the same path
// and change the status to 'have'. alt starts as what the shot shows; rewrite it from the real photo.

export type AssetStatus = 'have' | 'temporary'
export type Asset = { src: string; width: number; height: number; alt: string; status: AssetStatus; position?: string }

export type ProjectSlug = 'salt-isles' | 'centro-on-foot' | 'riverside-quarter' | 'lake-loop'

export const assets = {
  // Home · Featured Work; Selected Work · Featured Work; Project · Featured Work — one per project, in order.
  // Shot list asks 1:1 · 2400×2400; the owner's files are 3:2, so each is cropped square from its centre.
  'featuredWork-1': { src: '/media/featuredWork-1.jpg', width: 2400, height: 1682, alt: 'A fantasy island map in black ink on white paper, a pen resting at its edge', status: 'have' },
  'featuredWork-2': { src: '/media/featuredWork-2.jpg', width: 2400, height: 1600, alt: 'A hand-drawn city centre map with avenues, trees and street names, under olive-green leaf shapes', status: 'have' },
  'featuredWork-3': { src: '/media/featuredWork-3.jpg', width: 2400, height: 1600, alt: 'A fine-line map of a dense city quarter with grey markers lying across it', status: 'have', position: '40% 50%' },
  'featuredWork-4': { src: '/media/featuredWork-4.jpg', width: 2400, height: 1600, alt: 'A black and white line map around a body of water, two grey markers on top', status: 'have', position: '60% 50%' },
  // About · About — the shot list asks 4:3; the owner's portrait is 3:4, so wide frames crop it high on the face.
  about: { src: '/media/about.jpg', width: 1800, height: 2400, alt: 'Ines Varga in a red jumper in her studio, holding a framed line drawing', status: 'have', position: '50% 28%' },
  // The making of a map (About → the story; Home → the desk)
  processWalk: { src: '/media/process-walk-sign.jpg', width: 2400, height: 1600, alt: 'A trail map board beside a country road through the hills', status: 'have' },
  processSketch: { src: '/media/process-sketch.jpg', width: 1600, height: 2400, alt: 'A hand sketching rooftops in pen on white paper', status: 'have' },
  deskInk: { src: '/media/desk-glasses-map.jpg', width: 1917, height: 2400, alt: 'Glasses, coloured pencils and a pen on a city map on the work table', status: 'have' },
  processWatercolour: { src: '/media/process-watercolour.jpg', width: 1800, height: 2400, alt: 'Brushes in a jar beside a watercolour palette and paint swatches', status: 'have' },
  // Studio pictures for the project galleries and wherever a picture of the studio helps
  processPath: { src: '/media/process-path.jpg', width: 1800, height: 2400, alt: 'A walker with a rucksack on a woodland path past a signpost', status: 'have' },
  processSupplies: { src: '/media/process-supplies.jpg', width: 1528, height: 2400, alt: 'Paint tubes and brushes on a wooden drawing board', status: 'have' },
  processPalette: { src: '/media/process-palette.jpg', width: 2400, height: 1596, alt: 'A jar of brushes and a paint palette on a cluttered studio desk', status: 'have' },
  workVintageStack: { src: '/media/work-vintage-stack.jpg', width: 1601, height: 2400, alt: 'Old printed maps lying on top of each other', status: 'have' },
} satisfies Record<string, Asset>

// Project · Case Study Preview — 21:9 · 2400×1029, one per project (temporary until the real wide picture exists)
const cover = (slug: ProjectSlug): Asset => ({ src: `/media/projectPageCaseStudy/${slug}-1.jpg`, width: 2400, height: 1029, alt: 'Placeholder for the project’s wide opening picture', status: 'temporary' })
// Project · Gallery — 3:2 · 2400×1600, eight per project (temporary until each project's own set exists)
const gallery = (slug: ProjectSlug, n: number): Asset => ({ src: `/media/projectPageGallery/${slug}-${n}.jpg`, width: 2400, height: 1600, alt: 'Placeholder for a gallery photo', status: 'temporary' })

export type AssetKey = keyof typeof assets
export type MediaId = AssetKey | `cover:${ProjectSlug}` | `gallery:${ProjectSlug}:${number}`

export function media(id: MediaId): Asset {
  if (id.startsWith('cover:')) return cover(id.slice(6) as ProjectSlug)
  if (id.startsWith('gallery:')) { const [, slug, n] = id.split(':'); return gallery(slug as ProjectSlug, Number(n)) }
  return assets[id as AssetKey]
}

export const featuredFor = (i: number) => `featuredWork-${i + 1}` as AssetKey
