// Every word on the site, in one place. Clients are invented for the portfolio (names that fit Baku).
import { assets, type AssetKey } from '@/config/assets'

export const contact = {
  email: 'hello@brasshand.az',
  phone: '+994 12 555 01 27',
  tel: '+994125550127',
  address: 'Brasshand\n27 Rasul Rza street, 3rd floor\nBaku AZ1010, Azerbaijan',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rasul+Rza+street+Baku',
}

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Case studies', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export type Project = {
  slug: string; client: string; discipline: string; year: string; image: AssetKey
  summary: string; facts: { label: string; value: string }[]; paragraphs: [string, string, string]
}

export const projects: Project[] = [
  {
    slug: 'neft-noise', client: 'Neft Noise', discipline: 'Festival posters', year: '2025', image: 'work2',
    summary: 'One word per poster, a new word every week.',
    facts: [{ label: 'Client', value: 'Neft Noise, a three-night music festival' }, { label: 'Role', value: 'Campaign idea, posters, outdoor' }, { label: 'Outcome', value: 'Two nights sold out before the line-up' }],
    paragraphs: [
      'A three-night festival in an old oil works, launching in a city that is already covered in posters.',
      'One rule: every poster carries one word, and the word changes every Monday. People started photographing the wall on Sahil to see what came next.',
      'Two of the three nights sold out before a single band was announced. The organisers have asked us to keep the rule for next year.',
    ],
  },
  {
    slug: 'bulvar-14', client: 'Bulvar 14', discipline: 'Menus and identity', year: '2025', image: 'work1',
    summary: 'Eleven laminated pages became two kraft folders.',
    facts: [{ label: 'Client', value: 'Bulvar 14, a seafront restaurant' }, { label: 'Role', value: 'Naming, identity, menus' }, { label: 'Outcome', value: 'Orders taken faster, covers stolen often' }],
    paragraphs: [
      'A seafront restaurant with a long menu and guests with a short attention span. The old menu was eleven laminated pages.',
      'We cut it to two kraft folders, FOOD and MENU, one for the kitchen and one for the bar, and set every dish in one tall face a waiter can read by candlelight.',
      'Guests order faster, the kitchen reprints a page in an afternoon, and people keep taking the covers home. We count that as a review.',
    ],
  },
  {
    slug: 'qara-roasters', client: 'Qara Roasters', discipline: 'Coffee packaging', year: '2024', image: 'work3',
    summary: 'A stamp instead of a label.',
    facts: [{ label: 'Client', value: 'Qara Roasters, a small roastery' }, { label: 'Role', value: 'Packaging, stamp system' }, { label: 'Outcome', value: 'Stocked in 14 cafés within a year' }],
    paragraphs: [
      'A small roaster with very good coffee and a bag that looked like every other bag on the shelf.',
      'We kept the plain kraft, because it was honest, and gave it a stamp instead of a label: the roast, the farm and the date, pressed by hand every morning.',
      'The stamp became the brand. Cafés now ask for the bag before they ask about the beans.',
    ],
  },
  {
    slug: 'mugham-tapes', client: 'Mugham Tapes', discipline: 'Tape label identity', year: '2024', image: 'work4',
    summary: 'A name that sounds like a cassette shop in 1979.',
    facts: [{ label: 'Client', value: 'Mugham Tapes, an independent label' }, { label: 'Role', value: 'Naming, identity, cassette inlays' }, { label: 'Outcome', value: '40 releases on one system' }],
    paragraphs: [
      'A label reissuing mugham recordings from the seventies on cassette, and signing young players who have never owned a tape deck.',
      'A name that sounds like a cassette shop in 1979, a colour field for every tape, and type that sits on the inlay like a stamp on a parcel.',
      'Forty releases later the system still holds, and no two tapes look alike.',
    ],
  },
  {
    slug: 'depo-1905', client: 'Depo 1905', discipline: 'Wayfinding', year: '2023', image: 'work5',
    summary: 'Four halls, two courtyards, one tall face.',
    facts: [{ label: 'Client', value: 'Depo 1905, a culture space' }, { label: 'Role', value: 'Wayfinding, signage, print' }, { label: 'Outcome', value: 'Front desk questions down by four fifths' }],
    paragraphs: [
      'A former tram depot turned culture space: four halls, two courtyards and an audience that kept ending up in the kitchen.',
      'Signs painted straight onto the concrete in Azerbaijani, English and Russian, with arrows big enough to read from the tram stop.',
      'The front desk used to answer dozens of “where is” questions a night. Now it answers a handful, mostly about the bar.',
    ],
  },
  {
    slug: 'tandir-and-sons', client: 'Tandir & Sons', discipline: 'Bakery identity', year: '2023', image: 'work6',
    summary: 'A mark you can print with one stamp.',
    facts: [{ label: 'Client', value: 'Tandir & Sons, a family bakery' }, { label: 'Role', value: 'Naming, identity, bags' }, { label: 'Outcome', value: 'Second shop opened in 2025' }],
    paragraphs: [
      'A third-generation bakery opening its first shop outside the family’s own street.',
      'We named the shop after the oven, drew a mark that prints on a paper bag with one stamp, and wrote the bread names on the wall in chalk.',
      'The bag goes everywhere the bread goes. That was the whole plan, and it worked well enough for a second shop.',
    ],
  },
]

export const projectCard = (p: Project) => ({
  title: p.client, meta: `${p.discipline}, ${p.year}`, image: assets[p.image].src, alt: assets[p.image].alt, href: `/work/${p.slug}`,
})

export const clients = ['Neft Noise', 'Bulvar 14', 'Qara Roasters', 'Mugham Tapes', 'Depo 1905', 'Tandir & Sons', 'Shirvan Tea House', 'Gobustan Film Club']

export const services = [
  { name: 'Naming', line: 'Names for places, products and festivals, tested out loud in three languages.' },
  { name: 'Identity', line: 'Logos, lettering and the rules that keep them looking like you.' },
  { name: 'Campaigns', line: 'Posters, launches and the one line people repeat to their friends.' },
  { name: 'Packaging', line: 'Bags, labels and boxes that sell from a shelf without shouting.' },
  { name: 'Menus and print', line: 'Menus, programmes and anything else that ends up in someone’s hand.' },
  { name: 'Wayfinding', line: 'Signs that get people to the right hall, in the right language.' },
]

export const process = [
  { name: 'Listen', text: 'We visit, eat, listen to the music and ask the awkward questions.', duration: '1 week' },
  { name: 'Name', text: 'A long list, a short list, then one name we will defend.', duration: '2 to 3 weeks' },
  { name: 'Draw', text: 'The mark, the letters and the rules, tried on real menus, bags and walls.', duration: '3 to 5 weeks' },
  { name: 'Launch', text: 'Files, printers, signs and a party, if you will have one.', duration: '1 to 2 weeks' },
]

export const plans = [
  {
    name: 'Name and identity', price: '9,500', period: 'AZN, fixed', line: 'What most of our clients choose.', recommended: true,
    features: ['Naming with a trademark pre-check', 'Logo, lettering and colour', 'Two real items: menus, bags or signs', 'A rulebook your team will actually read'],
    action: { label: 'Start with this', href: '/contact' },
  },
  {
    name: 'Name only', price: '3,000', period: 'AZN, fixed', line: 'When you already have a designer.',
    features: ['Workshop and long list', 'Three names presented, one chosen', 'Tested out loud in az, en and ru', 'Domain and trademark search'],
    action: { label: 'Ask about naming', href: '/contact' },
  },
  {
    name: 'Campaign', price: '6,000', period: 'AZN, from', line: 'For launches, seasons and festivals.',
    features: ['One idea, one line', 'Posters, social and outdoor', 'Print production handled', 'Six weeks from brief to street'],
    action: { label: 'Plan a campaign', href: '/contact' },
  },
]

export const servicesFaq = [
  { q: 'Do you only work in Baku?', a: 'Mostly, because we like to eat at the places we name. We have also worked for clients in Ganja, Tbilisi and Istanbul, over video and a lot of tea.' },
  { q: 'Can you just do the logo?', a: 'We can, but we will ask what it is called first. Half the time the name is the real problem.' },
  { q: 'How long does a project take?', a: 'A name takes three to four weeks. A name and identity takes eight to twelve. A campaign takes about six.' },
  { q: 'Do you work in Azerbaijani, Russian and English?', a: 'All three. We test every name out loud in each, because a name that is funny in one language is usually a problem in another.' },
  { q: 'Who owns the work?', a: 'You do, in full, once the last invoice is paid. We keep the right to show it here.' },
  { q: 'Do you print?', a: 'We don’t own a press, but we run the printing: we choose the paper, check the proofs and stand next to the machine.' },
]

export const contactFaq = [
  { q: 'What should I send you?', a: 'Two or three sentences: what you are opening, when, and roughly what you can spend. That is enough for a first call.' },
  { q: 'How fast do you reply?', a: 'Within two working days. If it is urgent, call the studio and Nigar will pick up.' },
  { q: 'Can I visit the studio?', a: 'Yes, on weekdays from ten to six. Ring the bell marked Brasshand on the third floor.' },
  { q: 'Do you do free pitches?', a: 'No. We would rather spend that time on a paid workshop that gives you something to keep.' },
  { q: 'Are you hiring?', a: 'Not right now, but we always read letters from people who write well. Send three things you are proud of.' },
]

export const team = [
  { name: 'Leyla Mammadova', role: 'Founder, words and names', line: 'Will argue for a name for a month, then let it go in a minute.', image: assets.team1.src, alt: assets.team1.alt },
  { name: 'Rauf Guliyev', role: 'Type and identity', line: 'Draws every letter twice: once badly, once for you.', image: assets.team2.src, alt: assets.team2.alt },
  { name: 'Nigar Hasanova', role: 'Campaigns and production', line: 'Knows every printer in Baku, and which ones answer on Sundays.', image: assets.team3.src, alt: assets.team3.alt },
]

export const stats = [
  { value: '2017', label: 'Opened on Rasul Rza street' },
  { value: '64', label: 'Identities launched' },
  { value: '300+', label: 'Names written, 41 chosen' },
  { value: '3', label: 'People, no account managers' },
]

export type Entry = { slug: string; title: string; date: string; category: string; paragraphs: string[] }

export const journal: Entry[] = [
  {
    slug: 'name-before-logo', title: 'Why we write the name before we draw anything', date: '12 Sep 2026', category: 'Naming',
    paragraphs: [
      'A logo can only be as good as the word it carries. Draw first and you end up decorating a name nobody can say.',
      'So every project starts with a list: two hundred words on a wall, read out loud by all three of us in three languages. Most die in the first hour.',
      'The survivors go to lunch with us. If a waiter can repeat one back without asking twice, we start drawing.',
    ],
  },
  {
    slug: 'tall-letters', title: 'What old Baku shop signs taught us about tall letters', date: '28 Aug 2026', category: 'Type',
    paragraphs: [
      'Walk down Nizami street and look up. The old signs are narrow, tall and loud, because shopfronts were narrow and the street was busy.',
      'A condensed face fits more word into less wall and reads from across the road. It is the most practical style there is, and it happens to look good.',
      'We use it the same way: one word, set big, where people need to see it from a distance. Everything else can whisper.',
    ],
  },
  {
    slug: 'names-we-killed', title: 'Three names we killed this summer, and why', date: '4 Aug 2026', category: 'Process',
    paragraphs: [
      'The first sounded perfect in English and rude in Russian. The second belonged to a car dealer in Sumgait. The third was simply too clever.',
      'Killing names is most of the job. A good shortlist is one where every name could survive a phone call, a shop sign and a grandmother.',
      'The name we kept is on a bakery bag now. You may have carried it home.',
    ],
  },
]
