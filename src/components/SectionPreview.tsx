'use client'
// A ready section rendered for real, with sample content, in a plan's tokens — the same component a Build Package ships.
import type { ReactNode } from 'react'
import { ScaledFrame } from '@/components/ScaledFrame'
import { TokenScope } from '@/components/TokenScope'
import { AboutSection } from '@/sections/About'
import { CaseStudySection } from '@/sections/CaseStudy'
import { ClientsSection } from '@/sections/Clients'
import { CollectionSection } from '@/sections/Collection'
import { ContactCtaSection } from '@/sections/ContactCta'
import { ColourChaptersSection } from '@/sections/ColourChapters'
import { FooterSection } from '@/sections/Footer'
import { OrbitHeroSection } from '@/sections/OrbitHero'
import { STICKERS } from '@/components/PieceDemo'
import { EditorialStorySection } from '@/sections/EditorialStory'
import { FaqSection } from '@/sections/Faq'
import { FeatureGridSection } from '@/sections/FeatureGrid'
import { FeaturedWorkSection } from '@/sections/FeaturedWork'
import { GallerySection } from '@/sections/Gallery'
import { HowItWorksSection } from '@/sections/HowItWorks'
import { IntroSection } from '@/sections/Intro'
import { JournalSection } from '@/sections/Journal'
import { LocationSection } from '@/sections/Location'
import { LookbookSection } from '@/sections/Lookbook'
import { ManifestoSection } from '@/sections/Manifesto'
import { MenuSection } from '@/sections/Menu'
import { PricingSection } from '@/sections/Pricing'
import { ProcessSection } from '@/sections/Process'
import { ProductGridSection } from '@/sections/ProductGrid'
import { ProductHighlightSection } from '@/sections/ProductHighlight'
import { ReservationSection } from '@/sections/Reservation'
import { ServicesSection } from '@/sections/Services'
import { StatsSection } from '@/sections/Stats'
import { TeamSection } from '@/sections/Team'
import { TestimonialsSection } from '@/sections/Testimonials'
import type { PaletteColors, PurposeId, SectionId, ShapeStyle, TypographyPairing } from '@/types/domain'

// Real photos already on disk (example sites' media), one set per "world" so a preview looks like the user's kind of site.
const ph = ['arena', 'box', 'chestnut', 'gallop', 'groom', 'herd', 'jump', 'palomino', 'ponies', 'rider-grey', 'stables'].map((n) => `/examples/swiss-modern-event-site-claude-code/media/photos/${n}.jpg`)
const car = [1, 2, 3, 4, 5, 6, 7, 9].map((n) => `/examples/cheeky911/media/yourPhotos-${n}.jpg`)
const cafe = [1, 2, 3, 5, 6, 7, 8, 9].map((n) => `/examples/kofii/media/yourPhotos-${n}.jpg`)
const can = ['pour', 'beans', 'glassPour', 'glassIce', 'canFinal', 'ingredients', 'canDetail', 'canFloat', 'founderLena', 'founderMarco'].map((n) => `/examples/keepers/media/${n}.jpg`)
const shop = ['collection-wide', 'highlight-2', 'highlight-3', 'product-hoodie-b', 'product-pant-a', 'product-cup-a', 'product-sling-a', 'about-portrait', 'collection-tall', 'closing-wide'].map((n) => `/examples/buytolose/media/${n}.webp`)

/** The kind of site a preview is dressed as. */
export type World = 'studio' | 'food' | 'shop' | 'product' | 'software' | 'event'
const WORLD_OF: Partial<Record<PurposeId, World>> = {
  portfolio: 'studio', agency: 'studio', studio: 'studio', 'personal-brand': 'studio', experiment: 'studio', blog: 'studio',
  restaurant: 'food', hotel: 'food', fashion: 'shop', ecommerce: 'shop', product: 'product', saas: 'software', course: 'software',
  event: 'event', nonprofit: 'event', clinic: 'event', 'real-estate': 'event',
}
export const worldFor = (purpose?: PurposeId): World => (purpose && WORLD_OF[purpose]) || 'studio'

type Step = { name: string; text: string }
type Copy = {
  img: string[]; label: string; statement: string; body: string; manifesto: string; attribution: string
  work: string; projects: [string, string][]; caseTitle: string; facts: [string, string][]; story: [string, string, string]
  offer: string; services: [string, string][]; process: (Step & { duration: string })[]; how: Step[]; howTitle: string
  aboutStatement: string; bio: string; galleryTitle: string; editorial: { title: string; caption: string; paragraphs: string[] }
  clientsTitle: string; clients: string[]; features: Step[]; featuresTitle: string; plans: [string, string, string, string[]][]; pricingTitle: string
  faq: [string, string][]; journal: [string, string, string][]; cta: [string, string, string]
  quotes: [string, string, string][]; team: [string, string, string][]; stats: [string, string][]; statsNote: string
  where: { title: string; address: string; hours: string[]; notes: string }
}
const W: Record<World, Copy> = {
  studio: {
    img: car, label: 'The studio', statement: 'We photograph and film cars as if they were people — slowly, and in the right light.', body: 'Two photographers, one grader, a borrowed hangar. Forty shoots since 2019.',
    manifesto: 'Nothing we shoot should need a caption.', attribution: 'From our first brief, 2019',
    work: 'Selected work', projects: [['Nine eleven, held still', '2025 · Film'], ['Grey on grey', '2024 · Stills'], ['The long drive', '2023 · Campaign']],
    caseTitle: 'Nine eleven, held still', facts: [['Client', 'Private collector'], ['Role', 'Direction, grade'], ['Outcome', 'A 90-second film']], story: ['One car, one afternoon, and no second take on the light.', 'We kept to one lens and one move per shot.', 'The film ran in three galleries and a single cinema.'],
    offer: 'What we do', services: [['Films', 'Short films for launches and collectors'], ['Stills', 'Portraits of objects, in series'], ['Grading', 'Colour for footage shot elsewhere'], ['Direction', 'For campaigns that need one eye']],
    process: [{ name: 'Look first', text: 'A day with the subject before any camera.', duration: '1 day' }, { name: 'One plan', text: 'A single shot list, not a mood board.', duration: '1 week' }, { name: 'Shoot and grade', text: 'The same two people, start to finish.', duration: '3 weeks' }],
    howTitle: 'From idea to film in three steps', how: [{ name: 'Tell us what it is', text: 'A few lines and a photo are enough.' }, { name: 'Pick a treatment', text: 'Three directions, all adaptable.' }, { name: 'We shoot', text: 'Fixed price, fixed date.' }],
    aboutStatement: 'Lena and Tomas started with one camera and a borrowed car.', bio: 'Six years later the studio is four people and a hangar that smells of oil and coffee.',
    galleryTitle: 'Recent frames', editorial: { title: 'Why we shoot at 4 p.m.', caption: 'The hangar door, open for the last light', paragraphs: ['Every shoot waits for the hour when the light lies down across the floor.', 'Nothing else in the day looks like it.'] },
    clientsTitle: 'Worked with', clients: ['Hangar 9', 'Motorhall', 'Nordlicht', 'Grey Garage', 'Circuit Club', 'Atelier 911', 'Road & Rest', 'Foundry'],
    featuresTitle: 'What every shoot includes', features: [{ name: 'One team', text: 'The same people on set and in the edit.' }, { name: 'Real light', text: 'No studio flash unless the brief needs it.' }, { name: 'Every file', text: 'Raw and graded, yours to keep.' }],
    pricingTitle: 'Rates', plans: [['Stills', '€900', 'day', ['One subject', '20 graded frames']], ['Film', '€2,400', 'project', ['60–90 seconds', 'Two rounds of edits', 'Colour grade']], ['Campaign', '€6,000', 'project', ['Film + stills', 'Direction', 'Usage rights']]],
    faq: [['Do you travel?', 'Yes, anywhere a car can go.'], ['Can we bring our own crew?', 'We work best as the whole team.'], ['How soon can you start?', 'Usually within three weeks.']],
    journal: [['Why we shoot at 4 p.m.', '2 May', 'Notes'], ['Grading grey paint', '18 Apr', 'Craft'], ['A short history of the hangar', '3 Apr', 'Studio']],
    cta: ['Something to film', 'slowly?', 'Tell us about it'],
    quotes: [['They made our car look like it was thinking.', 'Mira Holt', 'Collector'], ['Calm on set, exact in the edit.', 'Jonas Reuter', 'Motorhall'], ['The only studio that asked about the light first.', 'Ada Kern', 'Nordlicht']],
    team: [['Lena Weiss', 'Director', 'Watches the light.'], ['Tomas Berg', 'Photographer', 'Keeps the lens still.'], ['Ines Roth', 'Colourist', 'Makes grey warm.'], ['Paul Adler', 'Producer', 'Answers the phone.']],
    stats: [['40', 'Shoots since 2019'], ['6', 'Years together'], ['3', 'Gallery screenings'], ['1', 'Hangar']], statsNote: 'Numbers from our own records, updated each season.',
    where: { title: 'Visit the hangar', address: 'Hangar 9, Airfield Road\nBerlin', hours: ['Mon–Fri, 10:00–18:00', 'By appointment'], notes: 'Ring the side door.' },
  },
  food: {
    img: cafe, label: 'The café', statement: 'Coffee made one cup at a time, by the person who greets you.', body: 'Eight seats, one espresso machine and a cake that changes every morning.',
    manifesto: 'Good coffee, made to order.', attribution: 'Written on our first chalkboard',
    work: 'From the counter', projects: [['Iced oat latte', 'Summer · Drink'], ['Matcha, whisked', 'Daily · Drink'], ['Burnt basque cheesecake', 'Weekends · Cake']],
    caseTitle: 'How we roast', facts: [['Beans', 'Single-origin, Ethiopia'], ['Roast', 'Light, every Monday'], ['Rest', 'Five days']], story: ['We buy from one farm and visit it every year.', 'Roasting light keeps the fruit in the cup.', 'Five days of rest before a bean meets the grinder.'],
    offer: 'On the menu', services: [['Espresso', 'Single-origin, pulled to order'], ['Iced drinks', 'Oat, cold brew, tonic'], ['Matcha', 'Whisked, never from powder mix'], ['Cake', 'One a day, baked here']],
    process: [{ name: 'Choose', text: 'Tell us how you like it.', duration: '1 min' }, { name: 'We make it', text: 'Weighed, pulled, poured.', duration: '4 min' }, { name: 'Sit or go', text: 'Eight seats or a paper cup.', duration: '—' }],
    howTitle: 'Order ahead in three steps', how: [{ name: 'Pick your drink', text: 'From the menu online.' }, { name: 'Choose a time', text: 'Any 10 minutes of the day.' }, { name: 'Collect', text: 'Your name on the cup.' }],
    aboutStatement: 'Aylin opened the counter with one machine and a borrowed grinder.', bio: 'Four years on, the queue still starts at 7:30 and the cake still sells out by noon.',
    galleryTitle: 'At the counter', editorial: { title: 'The cake that sells out by noon', caption: 'Monday’s basque cheesecake', paragraphs: ['It started as a birthday cake for a regular.', 'Now there is a list, and it is always full by Thursday.'] },
    clientsTitle: 'You’ll find us in', clients: ['Time Out', 'Old Town Guide', 'Coffee Map', 'The Local', 'City Eats', 'Morning Paper', 'Bean Club', 'Street Food Week'],
    featuresTitle: 'Every cup', features: [{ name: 'Weighed', text: 'Every dose, every time.' }, { name: 'Fresh milk', text: 'From a farm an hour away.' }, { name: 'No syrups', text: 'Just coffee, milk and time.' }],
    pricingTitle: 'Prices', plans: [['Espresso', '₼3', 'cup', ['Single origin', 'Double shot']], ['Latte', '₼5', 'cup', ['Oat or whole milk', 'Hot or iced']], ['Coffee club', '₼60', 'month', ['A drink a day', 'Cake on Fridays']]],
    faq: [['Do you have oat milk?', 'Yes, and it costs the same.'], ['Can I work here?', 'Yes, until 11 and after 3.'], ['Do you take bookings?', 'For groups of six or more.']],
    journal: [['A visit to the farm', '2 May', 'Beans'], ['Why we roast light', '18 Apr', 'Craft'], ['The new summer menu', '3 Apr', 'Menu']],
    cta: ['Come in', 'for a cup?', 'See the menu'],
    quotes: [['The best flat white on this side of the river.', 'Leyla M.', 'Regular since 2022'], ['They remember your order after one visit.', 'Omar K.', 'Neighbour'], ['Go for the cheesecake, stay for the quiet.', 'City Eats', 'Review']],
    team: [['Aylin', 'Owner', 'Pulls the first shot.'], ['Rauf', 'Barista', 'Latte art, mostly hearts.'], ['Nigar', 'Baker', 'Up at five.'], ['Elvin', 'Weekends', 'Knows everyone’s name.']],
    stats: [['8', 'Seats'], ['312', 'Cups on a Saturday'], ['1', 'Farm we buy from'], ['4.9', 'Rating, 600 reviews']], statsNote: 'Counted on our till, last summer.',
    where: { title: 'Find us', address: '12 Old Town Street\nBaku', hours: ['Mon–Fri, 07:30–18:00', 'Sat–Sun, 09:00–17:00'], notes: 'Two minutes from the metro.' },
  },
  shop: {
    img: shop, label: 'The workshop', statement: 'Fleece, carry and snacks from one small workshop, made in runs of two hundred.', body: 'Designed and sewn in Porto. When a run sells out, it’s gone.',
    manifesto: 'Buy less, keep it longer.', attribution: 'Stitched inside every label',
    work: 'This season', projects: [['The crossing fleece', 'Autumn · Knit'], ['Sling bag 02', 'All year · Carry'], ['Enamel cup', 'Camp · Home']],
    caseTitle: 'How a fleece is made', facts: [['Wool', 'Recycled, Portugal'], ['Run', '200 pieces'], ['Sewn', 'In Porto']], story: ['We start from one fabric and design around it.', 'Every seam is tested on a week-long walk.', 'Then we make two hundred and stop.'],
    offer: 'Shop by', services: [['Fleece', 'Warm layers, runs of 200'], ['Carry', 'Bags that go everywhere'], ['Home', 'Cups and blankets'], ['Snacks', 'For the walk']],
    process: [{ name: 'Order', text: 'Pick your size and colour.', duration: '2 min' }, { name: 'We pack', text: 'In paper, by hand.', duration: '1 day' }, { name: 'Delivered', text: 'Tracked, plastic-free.', duration: '3 days' }],
    howTitle: 'Find your size in three steps', how: [{ name: 'Measure one thing', text: 'Your chest, over a T-shirt.' }, { name: 'Match the chart', text: 'Between two? Go up.' }, { name: 'Free returns', text: 'For 30 days.' }],
    aboutStatement: 'Two friends, one sewing machine and a walk that went too long.', bio: 'The workshop now has six people and still makes everything in runs of two hundred.',
    galleryTitle: 'Autumn 2026', editorial: { title: 'The walk that started it', caption: 'The first fleece, on the coast path', paragraphs: ['It rained for three days and nothing we owned stayed warm.', 'So we made the thing we wished we had.'] },
    clientsTitle: 'As seen in', clients: ['Monocle', 'Kinfolk', 'Cereal', 'Openhouse', 'Sidetracked', 'Hole & Corner', 'Apartamento', 'Drift'],
    featuresTitle: 'Every piece', features: [{ name: 'Small runs', text: '200 pieces, then it’s gone.' }, { name: 'Repair for life', text: 'Send it back, we fix it.' }, { name: 'Plastic-free', text: 'Paper and string, nothing else.' }],
    pricingTitle: 'Shipping', plans: [['Standard', '€5', 'order', ['3–5 days', 'Tracked']], ['Express', '€12', 'order', ['Next day', 'Tracked', 'Before noon']], ['Free', '€0', 'over €120', ['3–5 days', 'Tracked']]],
    faq: [['How do sizes run?', 'True to size; between two, go up.'], ['Can I return it?', 'Free, within 30 days.'], ['Do you restock?', 'Rarely — each run is its own.']],
    journal: [['The walk that started it', '2 May', 'Story'], ['How we choose wool', '18 Apr', 'Craft'], ['Autumn run, first look', '3 Apr', 'New']],
    cta: ['Get the next run', 'first?', 'Join the list'],
    quotes: [['Warmest thing I own, and I own a lot.', 'Sara P.', 'Bought the crossing fleece'], ['They repaired a zip after two years, free.', 'Marco D.', 'Customer'], ['Small runs, done properly.', 'Kinfolk', 'Review']],
    team: [['Rita', 'Design', 'Starts from the fabric.'], ['João', 'Sewing', 'Tests every seam.'], ['Inês', 'Shop', 'Packs in paper.'], ['Tiago', 'Repairs', 'Fixes it for life.']],
    stats: [['200', 'Pieces per run'], ['14', 'Runs sold out'], ['30', 'Day free returns'], ['0', 'Plastic in the box']], statsNote: 'Since the first run, autumn 2021.',
    where: { title: 'Visit the workshop', address: 'Rua das Flores 21\nPorto', hours: ['Thu–Sat, 11:00–19:00'], notes: 'Try everything on; we’ll put the kettle on.' },
  },
  product: {
    img: can, label: 'Keepers', statement: 'Sparkling cold-brew coffee with orange and lemon peel, in one small can.', body: '330 ml, 45 mg caffeine, 35 kcal. Nothing else to read on the label.',
    manifesto: 'Coffee, but it fizzes.', attribution: 'On the side of every can',
    work: 'How it’s made', projects: [['Cold brew, 18 hours', 'Step 1'], ['Citrus peel, pressed', 'Step 2'], ['Canned the same day', 'Step 3']],
    caseTitle: 'Eighteen hours in a tank', facts: [['Beans', 'Brazil, medium roast'], ['Brew', '18 hours, cold'], ['Can', '330 ml']], story: ['We brew cold so it never turns bitter.', 'Pressed peel, not flavouring, gives the citrus.', 'Canned the same day, so nothing fades.'],
    offer: 'Why it works', services: [['Cold brew', 'Smooth, never bitter'], ['Real citrus', 'Pressed orange and lemon peel'], ['Light', '35 kcal, no added sugar'], ['Steady', '45 mg caffeine, no crash']],
    process: [{ name: 'Brew', text: 'Eighteen hours, cold.', duration: '18 h' }, { name: 'Press', text: 'Peel, not concentrate.', duration: '1 h' }, { name: 'Can', text: 'Sealed the same day.', duration: 'Same day' }],
    howTitle: 'From tank to can in three steps', how: [{ name: 'Cold brew', text: 'Coarse beans, cold water, patience.' }, { name: 'Add the peel', text: 'Orange and lemon, pressed.' }, { name: 'Sparkle', text: 'A little fizz, then sealed.' }],
    aboutStatement: 'Lena and Marco wanted coffee that tasted like summer.', bio: 'Two years, forty test batches and one very tired fridge later, there was Keepers.',
    galleryTitle: 'In the wild', editorial: { title: 'Forty batches and a tired fridge', caption: 'Batch 31, the first good one', paragraphs: ['The first thirty were either bitter or flat.', 'Batch 31 had both the fizz and the fruit, and we stopped there.'] },
    clientsTitle: 'Stocked at', clients: ['Whole Foods', 'Selfridges', 'Coffee Lab', 'Daylesford', 'Planet Organic', 'Monmouth', 'Grind', 'Harvey Nichols'],
    featuresTitle: 'In every can', features: [{ name: '45 mg caffeine', text: 'About half an espresso.' }, { name: '35 kcal', text: 'No added sugar.' }, { name: 'Real peel', text: 'Orange and lemon, pressed.' }],
    pricingTitle: 'Order', plans: [['Try it', '€15', '6 cans', ['One flavour', 'Free delivery']], ['Case', '€28', '12 cans', ['Mix flavours', 'Free delivery']], ['Subscribe', '€24', 'monthly', ['12 cans', 'Skip any month', '15% off']]],
    faq: [['How much caffeine?', '45 mg — about half an espresso.'], ['Is there sugar?', 'None added; 35 kcal from the fruit.'], ['Where can I buy it?', 'Online, and in 40 shops.']],
    journal: [['Batch 31', '2 May', 'Story'], ['Why cold brew fizzes', '18 Apr', 'Science'], ['New: grapefruit', '3 Apr', 'News']],
    cta: ['One can,', 'try it?', 'Order six'],
    quotes: [['Tastes like an orange in a café.', 'Nina R.', 'Subscriber'], ['My 3 p.m. can, every day.', 'Tom B.', 'Customer'], ['A soft drink grown-ups can drink at work.', 'Coffee Lab', 'Stockist']],
    team: [['Lena', 'Co-founder', 'Tastes every batch.'], ['Marco', 'Co-founder', 'Runs the tank.'], ['Aida', 'Growth', 'Finds new shops.'], ['Sam', 'Ops', 'Keeps the fridge full.']],
    stats: [['45 mg', 'Caffeine'], ['35', 'Kcal'], ['18 h', 'Cold brew'], ['40', 'Shops']], statsNote: 'Per 330 ml can.',
    where: { title: 'Tasting room', address: 'Unit 4, Canal Yard\nLondon', hours: ['Sat, 10:00–16:00'], notes: 'Free cans, always cold.' },
  },
  software: {
    img: car, label: 'Ledger', statement: 'Close your books in one click — invoices, receipts and VAT, done while you work.', body: 'For studios and small teams. Connects to your bank in two minutes.',
    manifesto: 'Accounting should take minutes, not Sundays.', attribution: 'Our first pitch, 2022',
    work: 'What teams build with it', projects: [['Month-end in 10 minutes', 'Studio Nord'], ['VAT without a spreadsheet', 'Lumen Bakery'], ['One inbox for receipts', 'Foundry']],
    caseTitle: 'Studio Nord’s month-end', facts: [['Team', '12 people'], ['Before', '2 days a month'], ['After', '10 minutes']], story: ['Receipts lived in five inboxes and one shoebox.', 'Ledger matched them to the bank feed as they arrived.', 'Month-end is now a single review before lunch.'],
    offer: 'What it does', services: [['Invoices', 'Send, chase and match payments'], ['Receipts', 'Snap or forward, matched for you'], ['VAT', 'Filed from the numbers you already have'], ['Reports', 'Profit and cash, live']],
    process: [{ name: 'Connect your bank', text: 'Read-only, two minutes.', duration: '2 min' }, { name: 'Forward receipts', text: 'From any inbox.', duration: 'Ongoing' }, { name: 'Close the month', text: 'One review, one click.', duration: '10 min' }],
    howTitle: 'Set up in three steps', how: [{ name: 'Connect', text: 'Your bank, read-only.' }, { name: 'Import', text: 'Last year’s invoices, in one drop.' }, { name: 'Relax', text: 'It matches as money moves.' }],
    aboutStatement: 'Two accountants got tired of doing the same thing every month.', bio: 'So they wrote it down, then wrote the software. Today 3,000 teams close their books with Ledger.',
    galleryTitle: 'Inside Ledger', editorial: { title: 'Why we built it for studios', caption: 'The first customer’s shoebox of receipts', paragraphs: ['Our first customers were designers who hated spreadsheets.', 'Everything in Ledger is still built for them first.'] },
    clientsTitle: 'Used by', clients: ['Studio Nord', 'Lumen Bakery', 'Foundry', 'Atelier Six', 'Northfield', 'Kiln & Co', 'Brightside', 'Parcel'],
    featuresTitle: 'Everything month-end needs', features: [{ name: 'Bank feed', text: 'Every transaction, matched.' }, { name: 'Receipt inbox', text: 'Forward, snap, done.' }, { name: 'VAT returns', text: 'Filed from your numbers.' }],
    pricingTitle: 'Pricing', plans: [['Solo', '€9', 'month', ['1 user', 'Invoices and receipts']], ['Team', '€29', 'month', ['5 users', 'VAT returns', 'Bank feed']], ['Studio', '€79', 'month', ['Unlimited users', 'Reports', 'Priority help']]],
    faq: [['Is my data safe?', 'Read-only bank access, encrypted at rest.'], ['Can I switch from spreadsheets?', 'Yes — drop last year’s files in.'], ['Is there a free trial?', '30 days, no card.']],
    journal: [['Month-end in 10 minutes', '2 May', 'Guides'], ['What changed in VAT this year', '18 Apr', 'Updates'], ['New: receipt inbox', '3 Apr', 'Product']],
    cta: ['Close this month', 'in ten minutes?', 'Start free trial'],
    quotes: [['We got two days a month back.', 'Anna K.', 'Studio Nord'], ['The first finance tool our designers actually open.', 'Rui S.', 'Foundry'], ['Our accountant asked what changed.', 'Mia L.', 'Lumen Bakery']],
    team: [['Anna', 'Co-founder', 'Former accountant.'], ['Ravi', 'Co-founder', 'Writes the matching.'], ['Sofia', 'Design', 'Hates spreadsheets.'], ['Leo', 'Support', 'Answers in an hour.']],
    stats: [['3,000', 'Teams'], ['10 min', 'Average month-end'], ['98%', 'Receipts matched'], ['4.8', 'Rating, 900 reviews']], statsNote: 'From our own usage data, last quarter.',
    where: { title: 'Our office', address: 'Kanalstraße 8\nBerlin', hours: ['Mon–Fri, 09:00–18:00'], notes: 'Support answers within an hour.' },
  },
  event: {
    img: ph, label: 'The weekend', statement: 'Three days of polo on the grass ground below the Caucasus. Seats by RSVP.', body: '11–13 June 2027, Sheki. Four chukkas a match, picnics allowed.',
    manifesto: 'Come for the horses, stay for the evening.', attribution: 'The first invitation, 2019',
    work: 'The programme', projects: [['Opening match', 'Friday · 14:00'], ['Grooms’ parade', 'Saturday · 11:00'], ['The final', 'Sunday · 16:00']],
    caseTitle: 'The final, 2026', facts: [['Teams', 'Sheki vs Caspian'], ['Chukkas', 'Four'], ['Crowd', '1,200']], story: ['The field was cut short and rolled twice.', 'Sheki led by one goal at half-time.', 'Caspian took it in the last minute.'],
    offer: 'The weekend', services: [['Matches', 'Four chukkas each, three days'], ['Picnics', 'Field-side, bring your own'], ['Shuttle', 'From Baku, twice a day'], ['Dinner', 'Saturday, under the planes']],
    process: [{ name: 'RSVP', text: 'Tell us who’s coming.', duration: '2 min' }, { name: 'Choose seats', text: 'Field, stand or club.', duration: '1 min' }, { name: 'Arrive', text: 'Gates open at 10:00.', duration: 'Friday' }],
    howTitle: 'Your weekend in three steps', how: [{ name: 'RSVP', text: 'By 1 May.' }, { name: 'Book the shuttle', text: 'Or park on the upper field.' }, { name: 'Bring flat shoes', text: 'For the divot stomp.' }],
    aboutStatement: 'The Sheki club started with six horses and a borrowed field.', bio: 'Seven years later it hosts the region’s only grass-ground weekend.',
    galleryTitle: 'Last season', editorial: { title: 'The horses arrive two weeks early', caption: 'Morning exercise on the lower field', paragraphs: ['Every June the grooms bring the strings down from the hills a fortnight before the first chukka.', 'The field is cut short, rolled twice and left to rest.'] },
    clientsTitle: 'With thanks to', clients: ['Sheki Polo Club', 'Caspian Riders', 'Ganja Stud', 'Lankaran Equestrian', 'Baku Hunt', 'Quba Farms', 'Zaqatala Grooms', 'Old Town Saddlery'],
    featuresTitle: 'Everything the weekend needs', features: [{ name: 'Seats by RSVP', text: 'No tickets, no queues.' }, { name: 'Shuttle from Baku', text: 'Twice a day, both days.' }, { name: 'Grass-ground polo', text: 'Four chukkas a match.' }],
    pricingTitle: 'Seats', plans: [['Field', '€40', 'day', ['Standing, field side', 'Picnic allowed']], ['Stand', '€90', 'day', ['Covered seat', 'Lunch included', 'Shuttle']], ['Club', '€220', 'weekend', ['Both days', 'Dinner', 'Paddock visit']]],
    faq: [['What should I wear?', 'Flat shoes for the divot stomp.'], ['Can I bring children?', 'Yes, under 12s go free.'], ['Is there parking?', 'On the upper field, free.']],
    journal: [['Why the season starts in June', '2 May', 'Field notes'], ['Meet the grooms', '18 Apr', 'People'], ['A short history of the ground', '3 Apr', 'History']],
    cta: ['Save a seat', 'by June?', 'RSVP now'],
    quotes: [['The most beautiful afternoon of my summer.', 'Aysel M.', 'Guest, 2026'], ['Polo you can actually get close to.', 'Farid H.', 'Rider'], ['Book the Saturday dinner.', 'Baku Weekly', 'Review']],
    team: [['Kamran', 'Club captain', 'Plays number three.'], ['Leyla', 'Head groom', 'Knows every horse.'], ['Orkhan', 'Events', 'Runs the weekend.'], ['Sabina', 'Guests', 'Your first hello.']],
    stats: [['3', 'Days'], ['12', 'Matches'], ['1,200', 'Guests last year'], ['48', 'Horses']], statsNote: 'From the 2026 weekend.',
    where: { title: 'Getting there', address: 'Sheki Polo Ground\nSheki, Azerbaijan', hours: ['Gates open 10:00', 'First chukka 14:00'], notes: 'Parking on the upper field; shuttle from Baku twice a day.' },
  },
}
const a = { href: '#', label: 'Book a visit' }

function sample(id: SectionId | 'orbit-hero', world: World, brand?: string): ReactNode {
  const w = W[world], img = w.img, pick = (i: number) => img[i % img.length]
  switch (id) {
    case 'orbit-hero': return <OrbitHeroSection eyebrow="What we do" loud="All" quiet="in motion" line="Brands, people, attention — we set them moving." items={[...STICKERS, ...car.slice(0, 4), ...STICKERS.slice(0, 3)].map((src, i) => ({ src, alt: '', size: src.endsWith('.svg') ? 130 : 110, tilt: [-8, 6, -4, 10, -6, 4][i % 6] }))} />
    case 'chapters': return <ColourChaptersSection chapters={w.services.slice(0, 2).map(([title, text], i) => ({ eyebrow: i ? 'No talk. All pictures.' : 'Hard story? Easily told.', title, text, media: { src: pick(i + 3), alt: '' }, sticker: { src: STICKERS[i * 3], alt: '' } }))} />
    case 'footer': return <FooterSection logo={<span className="type-display [font-size:5rem] italic">{brand || 'Studio'}</span>} columns={[{ title: 'Navigation', links: [{ label: 'About', href: '#' }, { label: 'Work', href: '#', current: true }, { label: 'Contact', href: '#' }] }, { title: 'Contact', links: [{ label: 'hello@example.com', href: '#' }] }]} legal={[{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }]} copyright={`© 2026 ${brand || 'Studio'}`} />
    case 'intro': return <IntroSection label={brand || w.label} statement={w.statement} body={w.body} />
    case 'manifesto': return <ManifestoSection statement={w.manifesto} attribution={w.attribution} />
    case 'featured-work': return <FeaturedWorkSection title={w.work} projects={w.projects.map(([title, meta], i) => ({ title, meta, image: pick(i + 1), alt: '', href: `#${i}` }))} />
    case 'case-study': return <CaseStudySection title={w.caseTitle} image={pick(3)} alt="" facts={w.facts.map(([label, value]) => ({ label, value }))} paragraphs={w.story} />
    case 'services': return <ServicesSection title={w.offer} items={w.services.map(([name, line]) => ({ name, line }))} />
    case 'process': return <ProcessSection title="How it works" steps={w.process} />
    case 'how-it-works': return <HowItWorksSection title={w.howTitle} steps={w.how.map((s, i) => ({ ...s, image: pick(i + 4), alt: '' }))} />
    case 'about': return <AboutSection title="About" image={pick(4)} alt="" statement={w.aboutStatement} bio={w.bio} />
    case 'gallery': return <GallerySection title={w.galleryTitle} photos={img.slice(0, 7).map((src) => ({ src, alt: '' }))} />
    case 'editorial-story': return <EditorialStorySection title={w.editorial.title} image={pick(5)} alt="" caption={w.editorial.caption} paragraphs={w.editorial.paragraphs} />
    case 'clients': return <ClientsSection title={w.clientsTitle} names={w.clients} />
    case 'testimonials': return <TestimonialsSection title="What people say" quotes={w.quotes.map(([quote, name, role]) => ({ quote, name, role }))} />
    case 'team': return <TeamSection title="The team" people={w.team.map(([name, role, line], i) => ({ name, role, line, image: pick(i + 2), alt: '' }))} />
    case 'stats': return <StatsSection title="In numbers" stats={w.stats.map(([value, label]) => ({ value, label }))} note={w.statsNote} />
    // Sections that belong to one kind of site keep that site's content whatever the plan is.
    case 'menu': return <MenuSection title="Today" groups={[{ name: 'Coffee', items: [{ name: 'Espresso', description: 'single origin, Ethiopia', price: '3' }, { name: 'Iced oat latte', description: 'cold, not watered down', price: '5' }] }, { name: 'Cake', items: [{ name: 'Basque cheesecake', description: 'burnt top, soft middle', price: '6' }, { name: 'Orange loaf', description: 'olive oil, whole orange', price: '4' }] }]} note="Menu changes daily." />
    case 'reservation': return <ReservationSection title="Book a table" text={world === 'food' ? 'Eight seats; groups of six or more, please book.' : 'Seats by RSVP, one sitting a night.'} hours={w.where.hours} phone="+994 12 000 00 00" bookingUrl="#" />
    case 'location': return <LocationSection title={w.where.title} address={w.where.address} hours={w.where.hours} notes={w.where.notes} mapUrl="#" image={pick(0)} alt="" />
    case 'collection': return <CollectionSection season="Autumn 2026" title="The crossing" text="Recycled wool and waxed cotton, made in runs of two hundred." image={shop[0]} alt="" pieces={[3, 4, 6].map((n, i) => ({ name: ['Crossing fleece', 'Walk trouser', 'Sling bag 02'][i], price: ['€180', '€120', '€70'][i], image: shop[n], alt: '', href: `#${i}` }))} />
    case 'lookbook': return <LookbookSection looks={[{ number: '01', image: shop[8], alt: '', detail: shop[3], pieces: 'Crossing fleece, walk trouser' }]} />
    case 'product-grid': return <ProductGridSection title="Shop" products={[3, 4, 5, 6, 1, 2, 9, 7].map((n, i) => ({ name: ['Crossing fleece', 'Walk trouser', 'Enamel cup', 'Sling bag 02', 'Coast jacket', 'Field shirt', 'Blanket', 'Cap'][i], price: `€${[180, 120, 24, 70, 220, 90, 110, 35][i]}`, image: shop[n], alt: '', href: `#${i}`, soldOut: i === 2 }))} />
    case 'product-highlight': return world === 'product'
      ? <ProductHighlightSection name="Keepers Citrus" text="Sparkling cold-brew coffee with orange and lemon peel." image={can[4]} alt="" details={[{ label: 'Can', value: '330 ml' }, { label: 'Caffeine', value: '45 mg' }, { label: 'Energy', value: '35 kcal' }]} action={{ label: 'Order six', href: '#' }} />
      : <ProductHighlightSection name="Crossing fleece" text="Recycled wool, sewn in Porto, one run of two hundred." image={shop[3]} alt="" details={[{ label: 'Wool', value: 'Recycled' }, { label: 'Run', value: '200' }, { label: 'Made in', value: 'Porto' }]} action={{ label: 'Add to bag', href: '#' }} />
    case 'feature-grid': return <FeatureGridSection title={w.featuresTitle} features={w.features} />
    case 'pricing': return <PricingSection title={w.pricingTitle} plans={w.plans.map(([name, price, period, features], i) => ({ name, price, period, features, action: a, recommended: i === 1 }))} />
    case 'faq': return <FaqSection title="Questions" items={w.faq.map(([q, ans]) => ({ q, a: ans }))} />
    case 'journal': return <JournalSection title="Journal" entries={w.journal.map(([title, date, category], i) => ({ title, date, category, href: `#${i}`, image: pick(i + 2), alt: '' }))} />
    case 'contact-cta': return <ContactCtaSection headline={w.cta[0]} quiet={w.cta[1]} action={{ label: w.cta[2], href: '#' }} email="hello@example.com" inverse />
    default: return null
  }
}

export function SectionPreview({ id, colors, type, shape, chapters, className, auto, maxHeight, width, world = 'studio', brand }: { id: SectionId | 'orbit-hero'; colors: PaletteColors; type: TypographyPairing; shape: ShapeStyle; chapters?: readonly string[]; className?: string; auto?: boolean; maxHeight?: number; width?: number; world?: World; brand?: string }) {
  return (
    <ScaledFrame className={className} auto={auto} maxHeight={maxHeight} width={width}>
      <TokenScope colors={colors} type={type} shape={shape} chapters={chapters}>{sample(id, world, brand)}</TokenScope>
    </ScaledFrame>
  )
}
