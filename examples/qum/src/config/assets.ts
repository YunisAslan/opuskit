// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Every file is the owner's own photo in public/media/ (sources in media-src/SOURCES.md).
// Replacing one = dropping a new file at the same path, or editing one line here.
type Asset = { src: string; alt: string; width: number; height: number; status: 'have' | 'temporary'; usage: string }

const photo = (file: string, width: number, height: number, alt: string, usage: string): Asset =>
  ({ src: `/media/${file}`, alt, width, height, status: 'have', usage })

export const assets = {
  hero: photo('hero.jpg', 2400, 1600, 'Three amber bottles of QUM standing on coarse white salt', 'Home first screen'),
  cleanser: photo('cleanser.jpg', 1601, 2400, 'The Salt Cleanser, a white pump bottle beside a pale stone', 'Salt Cleanser'),
  toner: photo('toner.jpg', 2400, 1600, 'The Mineral Toner, three slim bottles in a row', 'Mineral Toner'),
  serum1: photo('serum-1.jpg', 1802, 2400, 'The Saffron Serum with its dropper resting on two jars', 'Saffron Serum, main'),
  serum2: photo('serum-2.jpg', 1802, 2400, 'The Saffron Serum in soft window light and leaf shadows', 'Saffron Serum, second angle'),
  serum3: photo('serum-3.jpg', 2400, 1802, 'The Saffron Serum among the jars of the QUM ritual on linen', 'Saffron Serum, with the family'),
  serum4: photo('serum-4.jpg', 1802, 2400, 'The Saffron Serum standing on a jar, a second bottle lying beside it', 'Saffron Serum, third angle'),
  cream: photo('cream.jpg', 1800, 2400, 'The Day Cream, a pale jar on a stone block', 'Day Cream'),
  oil: photo('oil.jpg', 1586, 2400, 'Two bottles of Night Oil, amber and gold, on white cloth', 'Night Oil'),
  scrub: photo('scrub.jpg', 1601, 2400, 'An open jar of Salt Scrub on the edge of a stone basin', 'Salt Scrub'),
  balm: photo('balm.jpg', 2400, 1600, 'Three tubes of Hand Balm on undyed linen', 'Hand Balm'),
  saltLake: photo('salt-lake.jpg', 2400, 1350, 'The pink salt lake at Masazir from above, a white crust along its shore', 'The salt pans'),
  saltAerial: photo('salt-aerial.jpg', 2400, 1599, 'Salt pans from above, pink water divided by white ridges of salt', 'The salt pans from above'),
  saltCrystals: photo('salt-crystals.jpg', 2400, 1600, 'Coarse Caspian salt, close', 'Salt, close'),
  saffronField: photo('saffron-field.jpg', 2400, 1600, 'Saffron crocuses coming up through dry earth at Bilgah', 'Saffron fields'),
  saffronClose: photo('saffron-close.jpg', 2400, 1600, 'Two purple saffron flowers with red threads', 'Saffron flowers, close'),
  lab: photo('lab.jpg', 1600, 2400, 'A hand measuring oil with a pipette in the QUM lab', 'The lab in Mardakan'),
  ritualHands: photo('ritual-hands.jpg', 2400, 1600, 'Hands opening a jar of cream over a bathroom sink', 'The ritual, hands'),
  ritualFace: photo('ritual-face.jpg', 1600, 2400, 'A woman warming cream between her fingertips', 'The ritual, applying'),
  bathroom: photo('bathroom.jpg', 2400, 1600, 'A round stone basin on a wooden counter', 'The ritual, the basin'),
  founder1: photo('founder-1.jpg', 1600, 2400, 'Leyla in a linen apron', 'Founder, Leyla'),
  founder2: photo('founder-2.jpg', 1600, 2400, 'Nigar sitting against a white wall', 'Founder, Nigar'),
  founder3: photo('founder-3.jpg', 1600, 2400, 'Rauf with his arms crossed', 'Founder, Rauf'),
} satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets
export const asset = (key: AssetKey) => assets[key]
