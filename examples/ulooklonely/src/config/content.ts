// Site copy — draft in the recipe voice (plain, specific, confident). Replace with your own titles and years.
import type { IndexRow } from '@/components/WorkIndex'
import type { Entry } from '@/components/sections/Journal'
import type { Project } from '@/components/sections/FeaturedWork'

export const projects: Project[] = [
  { title: 'Orange Hours', meta: 'Short film, 2025', image: 'stillDesert', href: '/work#case-study' },
  { title: 'Violet Static', meta: 'Music video, 2024', image: 'stillNeon', href: '/work#case-study' },
  { title: 'The Stage Is Empty', meta: 'Edit and grade, 2024', image: 'stillStage', href: '/work#case-study' },
  { title: 'Crowd of One', meta: 'Short film, 2023', image: 'stillCrowd', href: '/work#case-study' },
  { title: 'Snow on the Collar', meta: 'Edit, 2023', image: 'stillSnow', href: '/work#case-study' },
]

export const index: IndexRow[] = [
  { title: 'Orange Hours', discipline: 'Short film', year: '2025', image: 'stillDesert', href: '/work#case-study' },
  { title: 'White Room', discipline: 'Edit', year: '2025', image: 'stillWhiteRoom', href: '/work#case-study' },
  { title: 'Violet Static', discipline: 'Music video', year: '2024', image: 'stillNeon', href: '/work#case-study' },
  { title: 'The Stage Is Empty', discipline: 'Edit and grade', year: '2024', image: 'stillStage', href: '/work#case-study' },
  { title: 'One Lit Window', discipline: 'Short film', year: '2024', image: 'stillWindow', href: '/work#case-study' },
  { title: 'Crowd of One', discipline: 'Short film', year: '2023', image: 'stillCrowd', href: '/work#case-study' },
  { title: 'Snow on the Collar', discipline: 'Edit', year: '2023', image: 'stillSnow', href: '/work#case-study' },
]

export const journal: Entry[] = [
  { title: 'Why every cut lands on a face', date: '12 Sep 2026', category: 'Editing', href: '/work', image: 'stillHand' },
  { title: 'Grading a city that never switches off', date: '28 Aug 2026', category: 'Colour', href: '/work', image: 'stillNoodleBar' },
  { title: 'One window, lit, in a dark building', date: '9 Aug 2026', category: 'Notes', href: '/work', image: 'stillWindow' },
  { title: 'Holding a shot until it hurts a little', date: '21 Jul 2026', category: 'Editing', href: '/work', image: 'stillCigarette' },
  { title: 'Orange haze, and how much is too much', date: '2 Jul 2026', category: 'Colour', href: '/work', image: 'stillOrangeFace' },
  { title: 'Sound for rooms with nobody in them', date: '14 Jun 2026', category: 'Sound', href: '/work', image: 'stillTwoFigures' },
]
