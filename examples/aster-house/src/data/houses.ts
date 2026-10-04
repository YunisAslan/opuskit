import type { AssetKey } from '@/config/assets'

export type Status = 'available' | 'reserved' | 'sold'
export type House = {
  slug: string; name: string; time: string; facing: string
  area: number; bedrooms: number; terrace: number; price: number; status: Status
  image: AssetKey; second: AssetKey; light: string
}

// Twelve houses, each named after the hour it faces. One release, spring 2027.
export const houses: House[] = [
  { slug: 'dawn', name: 'Dawn', time: '05:40', facing: 'east-north-east', area: 168, bedrooms: 2, terrace: 38, price: 1480000, status: 'available', image: 'hourDawn', second: 'roomBed',
    light: 'The first sun reaches the bedroom before anyone else in the row is up. Pale, level light along the stone stair.' },
  { slug: 'six', name: 'Six', time: '06:00', facing: 'east', area: 182, bedrooms: 3, terrace: 42, price: 1620000, status: 'available', image: 'hourMorning', second: 'terraceStone',
    light: 'At six the window frames print themselves across the kitchen wall and slowly walk down it.' },
  { slug: 'eight', name: 'Eight', time: '08:00', facing: 'east-south-east', area: 204, bedrooms: 3, terrace: 46, price: 1790000, status: 'reserved', image: 'roomBed', second: 'hourMorning',
    light: 'The main bedroom turns its angled windows to the sea, so the eight o’clock sun lands on the bed.' },
  { slug: 'ten', name: 'Ten', time: '10:00', facing: 'south-east', area: 226, bedrooms: 3, terrace: 54, price: 1940000, status: 'available', image: 'detailJug', second: 'roomBalcony',
    light: 'The show house. Mid-morning light falls in a shaft through the roof slot onto the dining table.' },
  { slug: 'noon', name: 'Noon', time: '12:00', facing: 'south', area: 248, bedrooms: 4, terrace: 62, price: 2260000, status: 'sold', image: 'hourNoon', second: 'terracePool',
    light: 'A glass roof over the hall takes the hard noon sun straight down the middle of the house.' },
  { slug: 'two', name: 'Two', time: '14:00', facing: 'south-south-west', area: 231, bedrooms: 3, terrace: 58, price: 2080000, status: 'reserved', image: 'stair', second: 'terraceStone',
    light: 'Slatted light climbs the concrete stair after lunch, one step at a time.' },
  { slug: 'four', name: 'Four', time: '16:00', facing: 'south-west', area: 212, bedrooms: 3, terrace: 49, price: 1880000, status: 'available', image: 'hourAfternoon', second: 'roomBed',
    light: 'A slab of afternoon light crosses the long stone wall of the living room and holds there.' },
  { slug: 'golden', name: 'Golden', time: '17:20', facing: 'west-south-west', area: 264, bedrooms: 4, terrace: 71, price: 2420000, status: 'sold', image: 'hourEvening', second: 'terracePool',
    light: 'The largest house. Warm, low sun reaches all the way to the back wall in the hour before sunset.' },
  { slug: 'six-evening', name: 'Six Evening', time: '18:00', facing: 'west', area: 196, bedrooms: 3, terrace: 44, price: 1760000, status: 'available', image: 'roomBalcony', second: 'hourEvening',
    light: 'The balcony doors face the evening sea; at six the whole room turns the colour of the water.' },
  { slug: 'dusk', name: 'Dusk', time: '19:30', facing: 'west-north-west', area: 188, bedrooms: 2, terrace: 40, price: 1690000, status: 'reserved', image: 'hourDusk', second: 'roomBalcony',
    light: 'One deep window, and the last red light laid across the floor of the sitting room.' },
  { slug: 'blue-hour', name: 'Blue Hour', time: '20:00', facing: 'north-west', area: 174, bedrooms: 2, terrace: 36, price: 1560000, status: 'available', image: 'terraceStone', second: 'hourDusk',
    light: 'The terrace parapet is set low so that, after sunset, there is only stone, sea and a blue sky.' },
  { slug: 'night', name: 'Night', time: '22:00', facing: 'north, across the bay to Baku', area: 158, bedrooms: 2, terrace: 34, price: 1420000, status: 'available', image: 'terracePool', second: 'stair',
    light: 'The pool terrace looks north across the bay, where the lights of Baku come on after dark.' },
]

export const houseBySlug = (slug: string) => houses.find((h) => h.slug === slug)
export const price = (n: number) => `₼${n.toLocaleString('en-US')}`
export const statusLabel: Record<Status, string> = { available: 'Available', reserved: 'Reserved', sold: 'Sold' }
