// Placeholder specs and prices — replace with the real listings.
// `photo` / `alt` are indexes into assets.yourPhotos.gallery.
export type Product = {
  slug: string
  name: string
  line: string
  price: string
  availability: 'Available' | 'Reserved' | 'Sold'
  year: number
  photo: number
  alt: number
}

export const products: Product[] = [
  { slug: 'gt3-rs-arctic-grey', name: '911 GT3 RS, Arctic Grey', line: 'Weissach package, bare carbon bonnet, blue forged wheels.', price: '€312,000', availability: 'Available', year: 2024, photo: 0, alt: 1 },
  { slug: 'gt3-rs-gentian-blue', name: '911 GT3 RS, Gentian Blue', line: 'Silver side script, carbon mirrors, 4,200 km.', price: '€298,000', availability: 'Reserved', year: 2023, photo: 1, alt: 0 },
  { slug: 'gt3-rs-obsidian', name: '911 GT3 RS, Obsidian', line: 'The car from the film. Swan-neck wing, satin black wheels.', price: '€289,000', availability: 'Available', year: 2023, photo: 2, alt: 3 },
  { slug: 'gt3-rs-weissach-jet-black', name: '911 GT3 RS Weissach, Jet Black', line: 'Magnesium wheels, roll cage, one owner.', price: '€326,000', availability: 'Available', year: 2024, photo: 3, alt: 2 },
  { slug: 'gt3-rs-night-blue', name: '911 GT3 RS, Night Blue', line: 'Full-width light bar, clubsport seats.', price: '€305,000', availability: 'Sold', year: 2023, photo: 4, alt: 5 },
  { slug: 'turbo-s-midnight', name: '911 Turbo S, Midnight', line: 'Aero kit, gold-rimmed wheels, sport exhaust.', price: '€268,000', availability: 'Available', year: 2022, photo: 5, alt: 6 },
  { slug: 'turbo-black', name: '911 Turbo, Black', line: 'Quiet specification, loud tail light.', price: '€214,000', availability: 'Reserved', year: 2021, photo: 6, alt: 5 },
  { slug: 'gt3-carmine-red', name: '911 GT3, Carmine Red', line: 'Manual, touring seats, the colour of this room.', price: '€198,000', availability: 'Available', year: 2019, photo: 7, alt: 9 },
  { slug: 'gt3-rs-racing-yellow', name: '911 GT3 RS, Racing Yellow', line: 'Black decals, carbon roof, 1,800 km.', price: '€301,000', availability: 'Available', year: 2025, photo: 8, alt: 9 },
  { slug: 'carrera-signal-yellow', name: '911 Carrera, Signal Yellow', line: 'An everyday 911 for autumn roads.', price: '€139,000', availability: 'Available', year: 2026, photo: 9, alt: 8 },
]
