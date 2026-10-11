// Ideas a built site invented for itself — its remembered moments — that the Library offers to take (the user,
// 2026-10-11): not a design the engine composes but one site's own invention, shown as a clip of it working. Taken,
// it travels in the recipe (`taken`, kind 'idea') and the Build Package ships the site's code as a reference with
// IDEAS.md: make the same idea for this site, in its own look and words. Each idea is a catalog card (takeables.ts);
// its clip is recorded by scripts/capture/site-clips.mjs (`slug:idea-{id}`).
import type { TakeGroup } from './takeables'

export type SiteIdea = {
  id: string
  /** The example it comes from (examples/{site}/). */
  site: string
  group: TakeGroup
  category: string
  name: string
  line: string
  /** Where it lives on that site, for the builder: "Shop". */
  page: string
  /** Its code, from examples/{site}/ — shipped as the reference. */
  file: string
}

export const SITE_IDEAS: SiteIdea[] = [
  { id: 'mug-stage', site: 'pip-kiln', group: 'sections', category: 'First screen', name: 'A product in front of a giant word',
    line: 'A cut-out product floats before one word as wide as the screen; the pointer pulls it near and pushes the word away, and scrolling slides the word off as the product rises.',
    page: 'Home', file: 'src/components/home/ProductStage.tsx' },
  { id: 'kiln-thermometer', site: 'pip-kiln', group: 'moments', category: 'Shop', name: 'A thermometer that cools as you scroll',
    line: 'A kiln thermometer rides in the shop’s filter bar and counts down from the firing to room heat as the page is read.',
    page: 'Shop', file: 'src/components/shop/KilnThermo.tsx' },
  { id: 'mug-gauge', site: 'pip-kiln', group: 'moments', category: 'Shop', name: 'A mug that fills toward free delivery',
    line: 'The bag’s total pours tea into a drawn mug; past the line on the glass it steams and says delivery is on us.',
    page: 'Cart', file: 'src/components/cart/MugGauge.tsx' },
  { id: 'lump-to-mug', site: 'pip-kiln', group: 'moments', category: 'Scroll', name: 'Clay that becomes a mug as you read',
    line: 'Beside a day’s schedule, a drawing on a potter’s wheel turns from a lump into a glazed mug, following the hour being read.',
    page: 'Workshops', file: 'src/components/workshops/LumpToMug.tsx' },
  { id: 'pressed-record', site: 'low-hum', group: 'moments', category: 'Forms', name: 'A booking printed on a record label',
    line: 'As the booking is filled in, a 45’s label prints it line by line; on send the arm swings over and the record turns.',
    page: 'Reservations', file: 'src/components/site/PressedRecord.tsx' },
  { id: 'sleeve-record', site: 'low-hum', group: 'moments', category: 'Scroll', name: 'A menu as a record half out of its sleeve',
    line: 'The record slides out as the menu arrives, turns as the dishes are read and flips from Side A to Side B.',
    page: 'Menu', file: 'src/components/site/SleeveRecord.tsx' },
  { id: 'faq-search', site: 'raster-school', group: 'moments', category: 'Forms', name: 'A question typed as the headline',
    line: 'The search box is the page’s headline: what you type is set at display size, and the answers below count down.',
    page: 'FAQ', file: 'src/components/site/FaqSearch.tsx' },
  { id: 'barn-index', site: 'fieldhouse', group: 'sections', category: 'Showcase', name: 'Names beside one photo held in place',
    line: 'The projects’ names scroll past one large photo held still; it crossfades to whichever name is in the middle or hovered.',
    page: 'Home', file: 'src/components/BarnIndex.tsx' },
  { id: 'names-reveal', site: 'fieldhouse', group: 'moments', category: 'Photos', name: 'Names that show their photo at the cursor',
    line: 'A list of names set large; hovering one brings its photo to the cursor, following it with a light lag.',
    page: 'A project', file: 'src/components/NamesReveal.tsx' },
  { id: 'salt-walk', site: 'qum', group: 'sections', category: 'Showcase', name: 'A walk through named stops',
    line: 'Full-screen views that hold still one after another, a small card naming each stop and an index of them at the side.',
    page: 'The salt', file: 'src/components/site/SaltWalk.tsx' },
  { id: 'giant-word', site: 'kur-delta-watch', group: 'moments', category: 'Headline', name: 'One word wider than the screen',
    line: 'A chapter opens on one word set huge, cropped at the edges, sliding a little sideways as the page scrolls.',
    page: 'Home', file: 'src/components/GiantWord.tsx' },
]

export const ideaClip = (i: SiteIdea) => `/examples/${i.site}/media/clips/idea-${i.id}.mp4`
export const IDEA_BY_ID = new Map(SITE_IDEAS.map((i) => [i.id, i]))
