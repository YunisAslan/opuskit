// Section designs: the ready sections that come in more than one look (the `variant` prop of their component). The
// engine picks one per section from the look's first family (`byFamily`, else the first), so two sites with the same
// parts still differ; the owner can pick another in the kit (Pages → a part → Other designs). Ids match the component's
// own `variant` values — check.ts asserts each appears in the shipped source.
import type { FamilyId, SectionId } from '@/types/domain'

export type SectionVariant = { id: string; name: string; line: string }
type Designs = { options: SectionVariant[]; byFamily?: Partial<Record<FamilyId, string>> }

const v = (id: string, name: string, line: string): SectionVariant => ({ id, name, line })

const steps: SectionVariant[] = [
  v('columns', 'Big numbers', 'Each step under a large number, side by side.'),
  v('cards', 'Cards with pictures', 'A card per step, each with its own picture.'),
  v('rail', 'A line to follow', 'The title holds still while the steps run down a line.'),
]
const statement: SectionVariant[] = [
  v('lead', 'Label and sentence', 'A small label beside the sentence, a calm paragraph under it.'),
  v('giant', 'Across the page', 'The sentence huge, across the whole page.'),
  v('split', 'Magazine opener', 'The sentence large on the left, the paragraph low on the right.'),
]
const names: SectionVariant[] = [
  v('grid', 'Ruled cells', 'Names in a quiet grid of cells.'),
  v('inline', 'Like credits', 'The names run as one big paragraph.'),
  v('split', 'Beside a title', 'A title and a line on the left, the names in cells on the right.'),
]

export const sectionVariants: Partial<Record<SectionId, Designs>> = {
  intro: { options: statement, byFamily: { editorial: 'split', cinematic: 'split', bold: 'giant', raw: 'giant' } },
  manifesto: { options: [statement[1], statement[2], statement[0]], byFamily: { quiet: 'lead', minimal: 'split' } },
  process: { options: steps, byFamily: { editorial: 'rail', quiet: 'rail', organic: 'cards' } },
  'how-it-works': { options: [steps[1], steps[0], steps[2]], byFamily: { bold: 'columns', raw: 'columns', editorial: 'rail' } },
  clients: { options: names, byFamily: { editorial: 'inline', bold: 'inline', raw: 'inline', experimental: 'inline' } },
  integrations: { options: [names[2], names[0], names[1]] },
  testimonials: {
    options: [v('lead', 'One leads', 'One large quote, the rest in a quiet row.'), v('single', 'One big quote', 'A single quote set huge across the page.'), v('wall', 'A wall of notes', 'Every quote as a card, in columns.')],
    byFamily: { bold: 'single', cinematic: 'single', raw: 'single', organic: 'wall', experimental: 'wall' },
  },
  'featured-work': {
    options: [v('staggered', 'Large and small', 'Projects alternate large and small.'), v('index', 'An index', 'Big titles on rules, a small picture beside each.'), v('grid', 'Even grid', 'Two columns, every picture the same shape.'), v('stack', 'One per row', 'Each project full width, picture first.')],
    byFamily: { bold: 'index', raw: 'index', futuristic: 'index', minimal: 'grid', quiet: 'grid', cinematic: 'stack' },
  },
  services: {
    options: [v('rows', 'Ruled rows', 'One row per service beside the title.'), v('big', 'Said loudly', 'Each service name set large, its line small.'), v('cards', 'Cards', 'A card per service, in a grid.')],
    byFamily: { bold: 'big', raw: 'big', experimental: 'big', organic: 'cards', futuristic: 'cards' },
  },
  stats: {
    options: [v('row', 'In a row', 'The numbers side by side.'), v('giant', 'One huge number', 'The first number across the page, the rest small.'), v('ledger', 'A ledger', 'Label left, number right, one line each.')],
    byFamily: { bold: 'giant', raw: 'giant', cinematic: 'giant', editorial: 'ledger', quiet: 'ledger', minimal: 'ledger' },
  },
  pricing: {
    options: [v('cards', 'Cards', 'Plans side by side, the recommended one outlined.'), v('table', 'A table', 'One row per plan, easy to compare.')],
    byFamily: { editorial: 'table', quiet: 'table', minimal: 'table', raw: 'table' },
  },
  team: {
    options: [v('grid', 'Portrait grid', 'Four small portraits to a row.'), v('large', 'Large portraits', 'Two big portraits to a row.'), v('list', 'A list', 'Name, role and line on one row, a small portrait.')],
    byFamily: { editorial: 'large', cinematic: 'large', bold: 'list', raw: 'list', futuristic: 'list' },
  },
  press: {
    options: [v('grid', 'Quotes in cells', 'Every quote in a cell, the outlet beneath.'), v('quote', 'Pull quote', 'The best line large, the other outlets named under it.')],
    byFamily: { editorial: 'quote', cinematic: 'quote', quiet: 'quote', bold: 'quote' },
  },
  'product-buy': {
    options: [v('sticky', 'Buy column stays', 'Pictures stacked; the price and button stay in view beside them.'), v('mosaic', 'Picture mosaic', 'The first picture large, the rest in a grid; the buy column beside.')],
    byFamily: { bold: 'mosaic', raw: 'mosaic', experimental: 'mosaic' },
  },
  specs: {
    options: [v('table', 'Line by line', 'One ruled line per fact, name and value.'), v('grid', 'Big values', 'Each fact in a cell, the value large.')],
    byFamily: { bold: 'grid', futuristic: 'grid', experimental: 'grid' },
  },
  faq: {
    options: [v('side', 'Beside the title', 'The title on the left, the questions in a narrow column beside it.'), v('centered', 'One quiet column', 'The title over one narrow, centred column.'), v('stacked', 'Said loudly', 'The title large across the top, the questions full width and set large.')],
    byFamily: { quiet: 'centered', organic: 'centered', minimal: 'centered', bold: 'stacked', raw: 'stacked', experimental: 'stacked', futuristic: 'stacked' },
  },
  schedule: {
    options: [v('columns', 'Days side by side', 'Each day a column of times and events.'), v('timeline', 'A departure board', 'One long list, the times set large, each day a heading at the side.'), v('cards', 'A card per day', 'Each day its own card on the surface colour.')],
    byFamily: { bold: 'timeline', raw: 'timeline', futuristic: 'timeline', cinematic: 'timeline', experimental: 'timeline', organic: 'cards', quiet: 'cards' },
  },
  reservation: {
    options: [v('side', 'Form beside', 'The invitation and hours on the left, the form on a card beside them.'), v('centered', 'Centred', 'The invitation centred over the form, the hours and phone under it.'), v('ledger', 'A ledger', 'The title large, the hours and phone as ruled lines, the form open beside them.')],
    byFamily: { quiet: 'centered', minimal: 'centered', organic: 'centered', editorial: 'ledger', bold: 'ledger', raw: 'ledger', cinematic: 'ledger' },
  },
  'product-grid': {
    options: [v('grid', 'Even tiles', 'Every product in the same shape, four to a row.'), v('editorial', 'One leads', 'The first product large across two columns and two rows, the rest around it.'), v('shelf', 'A shelf list', 'A ruled list: a small photo, the name large, the price at the end.')],
    byFamily: { editorial: 'editorial', cinematic: 'editorial', bold: 'editorial', raw: 'shelf', minimal: 'shelf', futuristic: 'shelf' },
  },
  'feature-grid': {
    options: [v('cells', 'Ruled cells', 'Every feature in a cell of one grid.'), v('rows', 'One per line', 'The name large on the left, its line on the right, a rule between.'), v('bento', 'Mixed sizes', 'The first feature wide with its picture, the rest in cells around it.')],
    byFamily: { editorial: 'rows', minimal: 'rows', raw: 'rows', quiet: 'rows', futuristic: 'bento', bold: 'bento', experimental: 'bento' },
  },
  'cta-band': {
    options: [v('card', 'A quiet box', 'The line and the action in a box on the surface colour.'), v('line', 'Between two rules', 'The line large between two rules, the action an underlined link.'), v('loud', 'A loud band', 'A full-width band in the ink colour, the line huge.')],
    byFamily: { editorial: 'line', minimal: 'line', quiet: 'line', bold: 'loud', raw: 'loud', experimental: 'loud', cinematic: 'loud' },
  },
  journal: {
    options: [v('cards', 'Pictures over titles', 'Three entries side by side, a picture over each.'), v('index', 'A contents page', 'No pictures: each title large on its own rule, the date beside it.'), v('lead', 'The newest leads', 'The newest entry large with its picture, the next ones listed beside it.')],
    byFamily: { editorial: 'index', minimal: 'index', raw: 'index', futuristic: 'index', cinematic: 'lead', bold: 'lead' },
  },
  newsletter: {
    options: [v('split', 'Reason and field', 'Why to subscribe on the left, the field and button on the right.'), v('giant', 'Said loudly', 'The title huge across the page, the field one ruled line under it.'), v('card', 'A small card', 'A calm card in the middle, everything centred.')],
    byFamily: { bold: 'giant', raw: 'giant', experimental: 'giant', editorial: 'giant', quiet: 'card', organic: 'card' },
  },
  'contact-cta': {
    options: [v('statement', 'Big invitation', 'The headline huge, one button and the email.'), v('write', 'A letter to fill in', 'The sentence is the form: name, what about, email.'), v('details', 'Ways to reach you', 'The headline left, email, phone and address large on the right.')],
    byFamily: { experimental: 'write', organic: 'write', editorial: 'details', quiet: 'details' },
  },
}

/** The design a section gets: the owner's pick, else the look's family default, else the first. */
export function variantFor(id: SectionId, family: FamilyId, picked?: string): string | undefined {
  const d = sectionVariants[id]
  if (!d) return undefined
  if (picked && d.options.some((o) => o.id === picked)) return picked
  return d.byFamily?.[family] ?? d.options[0].id
}
