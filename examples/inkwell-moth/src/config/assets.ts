// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Replacing a photo = replacing the file at that path or editing one line here.
// The hero illustration, spot drawings and logo are drawn in code (src/components/Drawings.tsx, Logo.tsx).
type Asset = { src: string; alt: string; caption: string; w: number; h: number; status: 'have' | 'temporary' }

const a = (src: string, w: number, h: number, alt: string, caption: string): Asset => ({ src: `/media/${src}`, w, h, alt, caption, status: 'have' })

export const assets = {
  bookRooster: a('book-rooster.jpg', 2400, 1600, 'A watercolour rooster in red, gold and green, painted in a spiral sketchbook beside a paint box', 'The rooster, before he was loud'),
  bookKoi: a('book-koi.jpg', 2400, 1600, 'Two koi in ink and orange wash swimming through water plants, brushes laid across the sheet', 'Nine koi, two of them finished'),
  bookSparrow: a('book-sparrow.jpg', 2400, 1600, 'An open sketchbook with a sparrow on a twig on one page and magnolia buds on the other', 'Sparrow on the left, spring on the right'),
  bookMoths: a('book-moths.jpg', 2400, 1600, 'Painted moths and butterflies cut out on paper beside a black teacup', 'The guests arriving for tea'),
  mothSpecimens: a('moth-specimens.jpg', 2400, 1600, 'Three old specimen plates of moths and butterflies hung side by side on a pale wall', 'The old specimen plates the moths came from'),

  desk1: a('desk-1.jpg', 2400, 1600, 'Rabbit sketches in soft watercolour with a paint box and brushes on a dark wooden table', 'Rabbits, in two washes'),
  desk2: a('desk-2.jpg', 2400, 1602, 'Pencil drawings of birds in flight with pencils and brushes lying across them', 'Swifts, from the window'),
  desk3: a('desk-3.jpg', 1600, 2400, 'A watercolour cow in a sketchbook with a tray of pastels beside it', 'A cow who stood still for once'),
  desk4: a('desk-4.jpg', 1600, 2400, 'Ink drawings of potted plants in an open sketchbook with fineliners alongside', 'Plants on the bakery sill'),
  desk5: a('desk-5.jpg', 1600, 2400, 'A sketchbook of loose pencil drafts with cut-out paper pieces laid on top', 'Loose drafts, not yet anything'),

  spread1: a('spread-1.jpg', 2400, 2400, 'A pink watercolour flamingo beside a used palette tin', 'A flamingo for a counting book'),
  spread2: a('spread-2.jpg', 1602, 2400, 'Grey watercolour hares beneath a spray of yellow mimosa', 'Hares under mimosa'),
  spread3: a('spread-3.jpg', 1800, 2400, 'A page of painted strawberries in a spiral pad with a palette above', 'Strawberries, June'),
  spread4: a('spread-4.jpg', 1597, 2400, 'A small sketchbook page of a crate of pumpkins lettered October', 'October, a crate of pumpkins'),
  spread5: a('spread-5.jpg', 1800, 2400, 'Bamboo stems painted in green wash on a sheet laid on dark wood', 'Bamboo in one green'),
  spread6: a('spread-6.jpg', 2400, 1600, 'A pencil flower sketch next to its loose watercolour version', 'One flower, drawn then painted'),
  spread7: a('spread-7.jpg', 1882, 2400, 'Small paintings of a leaf, mushrooms and a sun scattered around a paint box', 'Small studies'),
  spread8: a('spread-8.jpg', 1669, 2400, 'A coral flower painted on a spiral pad with a round palette resting on it', 'A coral flower, late'),

  process1: a('process-1.jpg', 2400, 1590, 'A hand sketching a small monkey in pencil', 'The pencil rough'),
  process2: a('process-2.jpg', 2400, 1778, 'A hand inking a pufferfish with a fineliner over a blue wash', 'The ink'),
  process3: a('process-3.jpg', 1602, 2400, 'A hand painting a tree in watercolour over an open paint box', 'The colour'),
  process4: a('process-4.jpg', 1800, 2400, 'A table covered in small finished paintings, a hand still at work', 'The pages laid out'),

  portrait: a('portrait.jpg', 1602, 2400, 'Nell Arden painting at a white table under a wall of pinned drawings', 'Nell, at the long table'),
  studio: a('studio.jpg', 2400, 1590, 'A tilted drawing table by a window with pinned pictures on a white-painted brick wall', 'The drawing table, where the ovens were'),
  sheki: a('sheki.jpg', 2400, 1600, 'An old brick street in Sheki with red roofs and green hills behind', 'The street outside, Sheki'),
} as const

export type AssetKey = keyof typeof assets
