// Every word on the site that is data rather than layout: works, tracks, dates, names.
import { assets } from '@/config/assets'

export const site = {
  name: 'Sela Mor',
  email: 'studio@selamor.az',
  bookings: 'live@selamor.az',
  line: 'Sound artist and composer from Baku. Wind, water and machines, made into music for rooms, films and long nights.',
}

export const nav = [
  { label: 'Works', href: '/works' },
  { label: 'Listen', href: '/listen' },
  { label: 'Live', href: '/live' },
  { label: 'About', href: '/about' },
]

export type Work = {
  slug: string
  title: string
  kind: string
  year: string
  image: { src: string; alt: string; width: number; height: number }
  text: string
  /** Photos the cursor leaves behind while this work is on screen. */
  trail: string[]
}

export const works: Work[] = [
  {
    slug: 'wind-archive', title: 'Wind Archive', kind: 'Album, Salt Line Editions', year: '2023', image: assets.workWind,
    text: 'A year of wind on the Absheron coast, recorded every week from the same four posts between Nardaran and Pirallahi, then cut into eight long pieces. No synthesis: everything you hear moved air.',
    trail: [assets.workWind.src, assets.gallery[0].src, assets.gallery[1].src, assets.fieldRecording.src],
  },
  {
    slug: 'machine-hymns', title: 'Machine Hymns', kind: 'Album, Kiln Records', year: '2021', image: assets.workMachine,
    text: 'The last lathes of a closed tool plant in Bayil, recorded in the weeks before they were sold for scrap. Their hum is tuned and layered into hymns for a building that no longer makes anything.',
    trail: [assets.workMachine.src, assets.gallery[4].src, assets.gallery[5].src],
  },
  {
    slug: 'rain-caspian', title: 'Rain, Caspian', kind: 'Planetarium piece, Kepler Hall Baku', year: '2024', image: assets.workRain,
    text: 'Forty minutes of autumn rain over the Caspian, played through the 32 speakers of a planetarium dome while the stars are switched off one by one.',
    trail: [assets.workRain.src, assets.gallery[2].src, assets.gallery[3].src],
  },
  {
    slug: 'room-tone', title: 'Room Tone', kind: 'Installation, Hamam Days Festival', year: '2025', image: assets.workRoom,
    text: 'An empty nineteenth-century bathhouse in Icherisheher, filled with nothing but its own resonance, fed back into the stone through twelve speakers hidden in the cold rooms.',
    trail: [assets.workRoom.src, assets.stage.src],
  },
  {
    slug: 'night-shift', title: 'Night Shift', kind: 'Live set', year: '2022 to now', image: assets.workLive,
    text: 'Seventy minutes in the dark: wind, rain and machines played live from tape and a modular case, never the same twice. Made for clubs, warehouses and rooms that stay open late.',
    trail: [assets.workLive.src, assets.gallery[6].src, assets.gallery[7].src],
  },
]

export type Track = { slug: string; title: string; src: string; length: string; recorded: string; madeFor: string }

// Each file is a 75-second excerpt (measured with ffprobe), so the length shown is the length you hear.
export const tracks: Track[] = [
  { slug: 'wind-archive', title: 'Northwind, Nardaran', src: assets.tracks.windArchive, length: '1:15', recorded: 'Nardaran shore, January 2023', madeFor: 'Wind Archive, the album (Salt Line Editions, 2023)' },
  { slug: 'machine-hymns', title: 'Lathe Hymn No. 3', src: assets.tracks.machineHymns, length: '1:15', recorded: 'A closed tool plant in Bayil, Baku, 2020', madeFor: 'Machine Hymns, the album (Kiln Records, 2021)' },
  { slug: 'rain-caspian', title: 'Rain over the Dome', src: assets.tracks.rainCaspian, length: '1:15', recorded: 'Rooftops of Sabail and the Caspian shore, autumn 2023', madeFor: 'Rain, Caspian, a piece for the planetarium dome at Kepler Hall (2024)' },
  { slug: 'room-tone', title: 'Cold Room', src: assets.tracks.roomTone, length: '1:15', recorded: 'Inside the Gulbala bathhouse, Icherisheher, 2025', madeFor: 'Room Tone, the installation (Hamam Days Festival, 2025)' },
  { slug: 'night-shift', title: 'Night Shift, live', src: assets.tracks.nightShift, length: '1:15', recorded: 'Live at Kontur, Tbilisi, October 2025', madeFor: 'Night Shift, the live set' },
  { slug: 'salt-flats', title: 'Salt Flats', src: assets.tracks.saltFlats, length: '1:15', recorded: 'The salt lake at Masazir, spring 2026', madeFor: 'Unreleased: the first sketch for the next record' },
]

type Show = { time: string; title: string; detail: string }
type Group = { label: string; items: Show[] }

export const upcoming: Group[] = [
  { label: 'October 2026', items: [
    { time: '17 Oct', title: 'Night Shift at Depo 21', detail: 'Baku. Doors 22:00, set at midnight. Tickets 25 AZN at the door' },
    { time: '31 Oct', title: 'Night Shift at Kontur', detail: 'Tbilisi. Set at 01:00. Tickets on the club’s page, 40 GEL' },
  ] },
  { label: 'November 2026', items: [
    { time: '14 Nov', title: 'Rain, Caspian under the dome', detail: 'Istanbul, Kubbe Kadıköy. Two shows, 19:00 and 21:30' },
    { time: '28 Nov', title: 'Night Shift at Tonhalle Spree', detail: 'Berlin. Doors 23:00. Tickets 18 EUR' },
  ] },
  { label: 'December 2026 to January 2027', items: [
    { time: '5 Dec', title: 'Room Tone opens again', detail: 'Baku, Gulbala bathhouse. Daily 12:00 to 19:00 until 18 January, free entry' },
    { time: '12 Dec', title: 'Wind Archive in four channels', detail: 'Berlin, Haus Echo. One seated show at 20:00' },
    { time: '23 Jan', title: 'Night Shift at Arka Oda', detail: 'Istanbul, Karaköy. Set at 00:30' },
  ] },
]

export const lastSeason: Group[] = [
  { label: 'Autumn 2025', items: [
    { time: '18 Oct', title: 'Night Shift at Kontur', detail: 'Tbilisi. Recorded; an excerpt is on Listen' },
    { time: '22 Nov', title: 'Wind Archive in four channels', detail: 'Berlin, Haus Echo' },
  ] },
  { label: 'Winter 2026', items: [
    { time: '14 Feb', title: 'Night Shift at Arka Oda', detail: 'Istanbul, Karaköy' },
    { time: '20 Mar', title: 'Rain, Caspian, eight nights', detail: 'Baku, Kepler Hall' },
  ] },
  { label: 'Spring and summer 2026', items: [
    { time: '30 May', title: 'Night Shift with Machine Hymns', detail: 'Baku, Depo 21' },
    { time: '4 Jul', title: 'Wind Archive at dawn', detail: 'Tbilisi, on the shore of Lisi Lake' },
  ] },
]

export const madeFor = ['Salt Line Editions', 'Kiln Records', 'Kepler Hall, Baku', 'Hamam Days Festival', 'Kontur, Tbilisi', 'Haus Echo, Berlin', 'Arka Oda, Istanbul', 'Depo 21, Baku']

export const press = [
  { outlet: 'Low Frequency Quarterly', quote: 'She records wind the way other people photograph faces: close, patient, and until it gives something away.' },
  { outlet: 'Kontur Magazine', quote: 'Machine Hymns makes a dead factory sing without pretending it was ever gentle.' },
  { outlet: 'Salt & Signal', quote: 'Room Tone was the quietest thing at the festival, and the one everybody talked about.' },
]

export const awards = ['Caspian Sound Prize 2024, for Rain, Caspian', 'Haus Echo residency, Berlin 2025']

export const about = {
  statement: 'I record what nobody is listening to, then give it a room.',
  bio: 'Sela Mor has spent ten years recording the Absheron wind, Caspian rain and the machines of Baku’s old factories, and turning them into records, installations, film scores and long live sets. She works with the recordist Teymur Aliyev, splits her year between Baku and Berlin, and still carries a recorder everywhere.',
}
