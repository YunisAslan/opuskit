// Copy deck — the week's programme and the seasons. The owner's facts: new and old films every night, a late-night
// series on Fridays, tickets for every screening. Every film, director, time and season below is a PLACEHOLDER for the
// real week — the films and directors are invented (no real titles or people), in the spirit of the programme: old
// films restored, new films in their first week, a cult film on Friday Late, a family film at the Sunday Matinee.

export type Screening = { time: string; title: string; detail: string }
export type Day = { label: string; weekday: number; items: Screening[] } // weekday: 0 Sunday … 6 Saturday

export const week: Day[] = [
  { label: 'Monday', weekday: 1, items: [
    { time: '18:30', title: 'The Harbour at Dusk', detail: 'Ilse Marrow, 1961. New 4K restoration.' },
    { time: '21:15', title: 'Weather for Strangers', detail: 'Noémie Arland. New this week, in French with subtitles.' },
  ] },
  { label: 'Tuesday', weekday: 2, items: [
    { time: '18:30', title: 'Weather for Strangers', detail: 'Noémie Arland. New this week, in French with subtitles.' },
    { time: '21:00', title: 'A Room Without Clocks', detail: 'Teodor Valen, 1979. On 35mm. Two hours forty.' },
  ] },
  { label: 'Wednesday', weekday: 3, items: [
    { time: '18:00', title: 'The Glass Orchard', detail: 'Kasper Lindqvist. New this week. Director in the room.' },
    { time: '20:45', title: 'Seven Rooms of Winter', detail: 'Renata Kovač, 1966. Restored.' },
  ] },
  { label: 'Thursday', weekday: 4, items: [
    { time: '18:30', title: 'The Harbour at Dusk', detail: 'Ilse Marrow, 1961.' },
    { time: '21:00', title: 'The Glass Orchard', detail: 'Kasper Lindqvist. New this week.' },
  ] },
  { label: 'Friday', weekday: 5, items: [
    { time: '18:30', title: 'Weather for Strangers', detail: 'Noémie Arland. New this week.' },
    { time: '21:00', title: 'Seven Rooms of Winter', detail: 'Renata Kovač, 1966.' },
    { time: '23:30', title: 'Friday Late: Teeth of the Lantern', detail: 'Dario Vesk, 1983. The late-night series. Doors at 23:15.' },
  ] },
  { label: 'Saturday', weekday: 6, items: [
    { time: '15:00', title: 'The Kite Keeper', detail: 'Hana Oribe, 1998. Animated, dubbed in English.' },
    { time: '18:30', title: 'The Glass Orchard', detail: 'Kasper Lindqvist. New this week.' },
    { time: '21:00', title: 'A Room Without Clocks', detail: 'Teodor Valen, 1979. On 35mm.' },
  ] },
  { label: 'Sunday', weekday: 0, items: [
    { time: '15:00', title: 'The Kite Keeper', detail: 'Hana Oribe, 1998. Sunday Matinee, children welcome.' },
    { time: '19:00', title: 'The Harbour at Dusk', detail: 'Ilse Marrow, 1961.' },
  ] },
] // PLACEHOLDER — invented films and directors; the owner's real week replaces them

export const scheduleCopy = {
  home: { title: 'This week', line: 'Two or three films a night. One of them is always old.' },
  programme: { title: 'Seven nights', line: 'Every screening this week, earliest first. Tickets for each one.' },
  repeatAction: 'Book tickets',
  empty: 'Nothing on this night yet. The week is still being threaded.',
}

// Featured Work → the seasons that make the programme. Title, kind, year, one picture each (assets: featuredWork 1–4).
export const seasons = [
  { slug: 'friday-late', title: 'Friday Late', kind: 'Late-night series', year: 'Since 2019', line: 'Every Friday, one film after 23:00. Cult, horror, the odd forgotten noir. The bar stays open until the credits end.' },
  { slug: 'second-run', title: 'Second Run', kind: 'Old films', year: 'Since 2017', line: 'Films from before most of us were born, on the best print we can find. Restorations when they exist, 35mm when they don’t.' },
  { slug: 'first-week', title: 'First Week', kind: 'New films', year: 'Every week', line: 'New arthouse releases in their first seven days, shown the way their makers meant them to be seen.' },
  { slug: 'sunday-matinee', title: 'Sunday Matinee', kind: 'Afternoons', year: 'Since 2021', line: 'A three o’clock film for anyone who would rather be home by dark. Children welcome.' },
] // PLACEHOLDER — season names, years and lines

export const seasonsCopy = { title: 'Seasons', line: 'What runs through the programme, week after week.', action: 'See the week' }

export const countdownCopy = {
  label: 'Next screening',
  doors: 'Doors in',
  late: 'Friday Late tonight',
  action: 'Book this one',
}
