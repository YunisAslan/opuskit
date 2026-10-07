// Copy deck — every word on the site, written from the owner's own line:
// "An architecture studio that turns old barns into houses — keeping the timber, the stone and the light."
// Anything marked PLACEHOLDER was invented to fill the layout (names, quotes, numbers, address) — the owner replaces it.
import type { AssetKey } from '@/config/assets'

export const studio = {
  name: 'Fieldhouse',
  line: 'An architecture studio that turns old barns into houses — keeping the timber, the stone and the light.',
  email: 'hello@fieldhouse.studio', // PLACEHOLDER
  phone: '+44 1432 760 214', // PLACEHOLDER
  address: 'The Cart Shed, Lower Hollins Farm\nBredwardine, Herefordshire HR3 6BZ', // PLACEHOLDER
  addressLine: 'The Cart Shed, Lower Hollins Farm, Bredwardine, Herefordshire', // PLACEHOLDER
  mapUrl: 'https://maps.google.com/?q=Bredwardine+Herefordshire', // PLACEHOLDER
  instagram: 'https://instagram.com/fieldhouse.studio', // PLACEHOLDER
  copyright: '© 2026 Fieldhouse Architects Ltd', // PLACEHOLDER: company name
}

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// The parts of each page, as the side index lists them (scroll-spy marks the one in view).
export const pageSections: Record<string, { id: string; label: string }[]> = {
  '/': [
    { id: 'work', label: 'Four barns' },
    { id: 'belief', label: 'What we keep' },
    { id: 'words', label: 'In their words' },
    { id: 'contact', label: 'Get in touch' },
  ],
  '/work': [
    { id: 'barns', label: 'The barns' },
    { id: 'details', label: 'Details' },
  ],
  '/work/[slug]': [
    { id: 'story', label: 'The story' },
    { id: 'pictures', label: 'How it was made' },
    { id: 'facts', label: 'The facts' },
    { id: 'more', label: 'More barns' },
  ],
  '/about': [
    { id: 'studio', label: 'The studio' },
    { id: 'process', label: 'How we work' },
    { id: 'people', label: 'The people' },
  ],
  '/contact': [
    { id: 'write', label: 'Write to us' },
    { id: 'visit', label: 'Visit' },
  ],
}

export const home = {
  hero: {
    // One line per array item; mobile re-breaks with `mobile`.
    lines: ['Old barns,', 'kept for living in'],
    mobile: ['Old barns,', 'kept for', 'living in'],
    line: 'We turn barns into houses, and keep the timber, the stone and the light they already had.',
    action: { label: 'See the barns', href: '/work' },
  },
  work: { title: 'Four barns, still standing' },
  belief: {
    lines: ['We keep what the barn', 'already knows: the timber', 'that carried it, the stone', 'that held it, the light', 'it let in.'],
    mobile: ['We keep what', 'the barn already', 'knows: the timber', 'that carried it,', 'the stone that', 'held it, the light', 'it let in.'],
    attribution: 'Fieldhouse, since 2011', // PLACEHOLDER: founding year
  },
  words: {
    title: 'In their words',
    // PLACEHOLDER: all quotes, names and roles
    quotes: [
      { quote: 'They walked the barn with us for a whole afternoon before drawing a line. Every beam we fell in love with that day is still above our heads.', name: 'Anna and Rhys Pritchard', role: 'Hollins Barn, Herefordshire' },
      { quote: 'The stone wall was the reason we bought it. They built the house around it.', name: 'Martin Hale', role: 'Wyke Gable, Somerset' },
      { quote: 'Calm, exact and honest about cost. The planners trusted them, and so did we.', name: 'Joanna Fell', role: 'Long Meadow, Shropshire' },
    ],
  },
  contact: {
    headline: 'Have a barn in mind?',
    quiet: 'Walk us round it.',
    action: { label: 'Start a project', href: '/contact' },
  },
}

export type Project = {
  slug: string
  title: string
  place: string
  kind: string
  year: string
  image: AssetKey
  summary: string
  facts: { label: string; value: string }[]
  story: string[]
  specs: { label: string; value: string }[]
  pictures: { image: AssetKey; caption: string }[]
}

// PLACEHOLDER: project names, places, years, areas and stories stand in for the studio's real projects.
const making: Project['pictures'] = [
  { image: 'case1', caption: 'As we found it' },
  { image: 'case2', caption: 'The drawings' },
  { image: 'case3', caption: 'New timber, marked by hand' },
  { image: 'gallery6', caption: 'Old post, new joint' },
  { image: 'case4', caption: 'The roof, finished' },
  { image: 'gallery1', caption: 'The kept trusses' },
  { image: 'gallery5', caption: 'Kitchen and stove' },
]

export const projects: Project[] = [
  {
    slug: 'hollins-barn',
    title: 'Hollins Barn',
    place: 'Herefordshire',
    kind: 'Threshing barn to house',
    year: '2025',
    image: 'project1',
    summary: 'A threshing barn of oak and weatherboard, made into a four-bedroom house for a family of five.',
    facts: [
      { label: 'Client', value: 'A family of five' },
      { label: 'Place', value: 'Herefordshire' },
      { label: 'Year', value: '2025' },
      { label: 'Our role', value: 'Survey to handover' },
    ],
    story: [
      'The barn had stood empty for thirty years. Its oak frame was sound, but the boards had gone and the floor was earth. The family wanted a house that still read as a barn from the lane.',
      'We kept every truss and post, recorded each joint, and set the new rooms inside the frame like furniture. The threshing doors became one tall window; the walls were reclad in larch that will grey to match the old boards.',
      'The house uses a third of the energy the family expected. From the lane it is still a barn. Inside, the frame is the first thing you see.',
    ],
    specs: [
      { label: 'Built', value: 'Around 1780, oak frame' },
      { label: 'Converted', value: '2023 to 2025' },
      { label: 'Floor area', value: '286 m²' },
      { label: 'Rooms', value: 'Four bedrooms, three bathrooms, one long hall' },
      { label: 'Kept', value: 'All twelve trusses, the threshing floor stones' },
      { label: 'New', value: 'Larch cladding, wood-fibre insulation, lime plaster' },
      { label: 'Heating', value: 'Ground-source heat pump, wood stove' },
      { label: 'Builder', value: 'Pritchard & Sons, Hay-on-Wye' },
    ],
    pictures: making,
  },
  {
    slug: 'wyke-gable',
    title: 'Wyke Gable',
    place: 'Somerset',
    kind: 'Stone barn to house',
    year: '2024',
    image: 'project2',
    summary: 'A roofless stone barn given a new timber upper storey and one glass gable that faces the hill.',
    facts: [
      { label: 'Client', value: 'A retired couple' },
      { label: 'Place', value: 'Somerset' },
      { label: 'Year', value: '2024' },
      { label: 'Our role', value: 'Design and planning' },
    ],
    story: [
      'Only the stone walls were left, to shoulder height, with an ash tree growing in the middle. The planners asked that the ruin stay legible.',
      'We repaired the walls with lime and stone from the site, then set a light timber storey on top. The new gable is glass, so the old wall and the new frame can be read as two separate hands.',
      'The ruin is now a two-bedroom house. The stone still carries the weight; the glass carries the view.',
    ],
    specs: [
      { label: 'Built', value: 'Around 1840, local lias stone' },
      { label: 'Converted', value: '2022 to 2024' },
      { label: 'Floor area', value: '174 m²' },
      { label: 'Rooms', value: 'Two bedrooms, a studio, one open living room' },
      { label: 'Kept', value: 'All four stone walls, the cart arch' },
      { label: 'New', value: 'Timber upper storey, glass gable, slate roof' },
      { label: 'Heating', value: 'Air-source heat pump' },
      { label: 'Builder', value: 'Coombe Building Co.' },
    ],
    pictures: making,
  },
  {
    slug: 'long-meadow',
    title: 'Long Meadow',
    place: 'Shropshire',
    kind: 'Cattle shed to house',
    year: '2023',
    image: 'project3',
    summary: 'A long cattle shed in a hay meadow, reclad in charred timber and opened to the evening sun.',
    facts: [
      { label: 'Client', value: 'A writer and a potter' },
      { label: 'Place', value: 'Shropshire' },
      { label: 'Year', value: '2023' },
      { label: 'Our role', value: 'Survey to handover' },
    ],
    story: [
      'The shed was steel and asbestos over a fine brick plinth. The owners wanted to work and live in one long room, with the meadow left as it was.',
      'We kept the plinth and the line of the roof, replaced the frame in timber, and charred the cladding so it sits dark in the grass. One long window runs the length of the west wall.',
      'The meadow was never touched; the house was built from a single track. In June the grass comes up to the sills.',
    ],
    specs: [
      { label: 'Built', value: 'Around 1950, brick plinth' },
      { label: 'Converted', value: '2021 to 2023' },
      { label: 'Floor area', value: '212 m²' },
      { label: 'Rooms', value: 'Two bedrooms, a workshop, one long room' },
      { label: 'Kept', value: 'The brick plinth, the roof line' },
      { label: 'New', value: 'Timber frame, charred larch, clay plaster' },
      { label: 'Heating', value: 'Air-source heat pump, kiln heat recovery' },
      { label: 'Builder', value: 'Marches Timber Frame' },
    ],
    pictures: making,
  },
  {
    slug: 'orchard-byre',
    title: 'Orchard Byre',
    place: 'Worcestershire',
    kind: 'Byre to house, in progress',
    year: '2026',
    image: 'project4',
    summary: 'A brick and stone byre in an old cider orchard, waiting for its windows.',
    facts: [
      { label: 'Client', value: 'A young family' },
      { label: 'Place', value: 'Worcestershire' },
      { label: 'Year', value: 'On site, 2026' },
      { label: 'Our role', value: 'Survey to handover' },
    ],
    story: [
      'The byre sits among perry pear and cider apple trees that are older than the building. The family asked us not to lose a single one.',
      'We placed every new opening where a door or vent already was, and set the services underground along the old cart track. The floor is being laid in the bricks we lifted from the yard.',
      'The windows go in this spring. The trees are all still standing.',
    ],
    specs: [
      { label: 'Built', value: 'Around 1820, brick on stone' },
      { label: 'Converting', value: '2025 to 2026' },
      { label: 'Floor area', value: '198 m²' },
      { label: 'Rooms', value: 'Three bedrooms, two bathrooms, a boot room' },
      { label: 'Kept', value: 'Every wall, every tree, the yard bricks' },
      { label: 'New', value: 'Oak windows, a lime floor, a clay tile roof' },
      { label: 'Heating', value: 'Ground-source heat pump' },
      { label: 'Builder', value: 'Teme Valley Builders' },
    ],
    pictures: making,
  },
]

export const workPage = {
  barns: { title: 'Barns we have made into houses' },
  details: {
    title: 'Timber, stone and light',
    photos: [
      { image: 'gallery1', caption: 'Roof trusses, Hollins Barn' },
      { image: 'gallery4', caption: 'The gallery, Long Meadow' },
      { image: 'gallery2', caption: 'Under the rafters' },
      { image: 'gallery7', caption: 'Oak in low sun' },
      { image: 'gallery5', caption: 'Kitchen and stove' },
      { image: 'gallery9', caption: 'Boards and hinge' },
      { image: 'gallery8', caption: 'Dry stone, shuttered' },
      { image: 'gallery3', caption: 'Under the beams' },
      { image: 'gallery10', caption: 'A new joint, cut by hand' },
      { image: 'gallery6', caption: 'Post and beam' },
    ] satisfies { image: AssetKey; caption: string }[],
  },
}

export const projectPage = {
  pictures: 'How it was made',
  facts: { title: 'The facts', text: 'What was there, what we kept and what is new.', note: 'Areas are internal, measured to the inside of the old walls.' },
  more: 'More barns',
}

export const about = {
  label: 'The studio',
  statement: ['A small studio for', 'old barns, and only', 'for old barns'],
  statementMobile: ['A small studio', 'for old barns,', 'and only for', 'old barns'],
  // PLACEHOLDER: founders' names and history
  bio: 'Clara Wren and Owen Hale started Fieldhouse in 2011, after ten years repairing farm buildings for the National Trust. We work from a cart shed in Herefordshire and take on four or five barns a year, so that one of us is on every site, every week.',
  image: 'about' as AssetKey,
  image2: 'about2' as AssetKey,
  process: {
    title: 'How a barn becomes a house',
    steps: [
      { name: 'Walk the barn', text: 'We spend a day with you on site, looking at what is sound, what is worth keeping and where the light falls.', duration: 'One day' },
      { name: 'Survey and record', text: 'Every timber, joint and stone is measured and drawn, so nothing is lost by accident.', duration: 'Three weeks' },
      { name: 'Drawings and permission', text: 'We design the house inside the barn and take it through planning and listed building consent.', duration: 'Four to six months' },
      { name: 'Build with the makers', text: 'We choose the builder with you and stay on site every week until the last board is fixed.', duration: 'Nine to fourteen months' },
      { name: 'Hand over the keys', text: 'A walk round the finished house, a book of every joint we kept, and a visit a year later.', duration: 'One day, and a year on' },
    ],
  },
  people: {
    title: 'The people',
    // PLACEHOLDER: names, roles and lines
    team: [
      { name: 'Clara Wren', role: 'Architect, founder', line: 'Has drawn more than sixty barns, and still measures the first one herself.', image: 'team1' as AssetKey },
      { name: 'Owen Hale', role: 'Architect, founder', line: 'Looks after planning and listed building consent, and the long conversations they need.', image: 'team2' as AssetKey },
      { name: 'Isla Marsh', role: 'Architect', line: 'Runs our sites and knows every builder on the Welsh border by name.', image: 'team3' as AssetKey },
      { name: 'Bill Rook', role: 'Timber surveyor', line: 'Forty years as a carpenter. Reads an oak frame the way others read a map.', image: 'team4' as AssetKey },
    ],
  },
}

export const contact = {
  headline: 'Tell us about your barn',
  quiet: 'We reply within two days.',
  action: { label: 'Write to us', href: '#enquiry' },
  form: {
    title: 'Your barn',
    stages: ['We are just looking', 'We are buying a barn', 'We own a barn', 'We have planning permission'],
    submit: 'Send',
    sent: 'Thank you. We will write back within two days.',
  },
  visit: {
    title: 'Visit the studio',
    hours: ['Monday to Thursday, 9 to 5', 'Fridays by appointment'], // PLACEHOLDER
    notes: 'Hereford station is twenty minutes by taxi. If you drive, park in the yard by the cart shed, and mind the hens.', // PLACEHOLDER
  },
}

export const privacy = {
  title: 'Privacy',
  // PLACEHOLDER: the owner's own notice, checked by their adviser
  paragraphs: [
    'When you write to us through this site we keep your name, your email and what you tell us about your barn, so that we can reply and, if we work together, keep a record of the project.',
    'We do not share your details with anyone, and we do not use them for anything else. This site sets no tracking cookies.',
    'To see what we hold about you, or to ask us to delete it, write to the address below.',
  ],
}

export const notFound = {
  title: 'This one has fallen down',
  line: 'The page you were looking for is not here. The barns are.',
  action: { label: 'See the barns', href: '/work' },
}
