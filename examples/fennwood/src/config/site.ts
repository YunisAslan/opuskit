// Every fact and line of copy the site repeats. Change it here; pages read it.
// The address, phone (an Ofcom drama number) and email are stand-ins until Fennwood's real ones are known.
import type { MenuGroup } from '@/components/sections/Menu'
import type { AssetKey } from '@/config/assets'

export const site = {
  name: 'Fennwood',
  description:
    'A wood-fire kitchen with forty seats in Bristol: vegetables from two farms, bread baked in the same oven, a menu that changes with the week.',
  email: 'tables@fennwood.example',
  phone: '0117 496 0732',
  address: '27 Larder Street\nBristol BS1 4QA',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=27+Larder+Street+Bristol+BS1+4QA',
  hours: ['Dinner Wednesday to Sunday, from 6 pm', 'Lunch Saturday and Sunday, 12 to 3 pm', 'Closed Monday and Tuesday'],
  transit: 'Ten minutes on foot from Temple Meads. Buses 2 and 76 stop at the end of the street. Bike racks by the door.',
  groups: 'Tables for up to six book online. For seven to twelve, call us and we will set the long table by the oven.',
}

export const nav = [
  { label: 'Menu', href: '/menu' },
  { label: 'Reservations', href: '/reservations' },
]

/* Dining days and seatings — the booking form offers only these. Day numbers: 0 Sunday … 6 Saturday. */
export const openDays = [0, 3, 4, 5, 6]
export const lunchDays = [0, 6]
export const dinnerTimes = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']
export const lunchTimes = ['12:00', '12:30', '13:00', '13:30', '14:00']
export const partySizes = ['1', '2', '3', '4', '5', '6']

type Dish = MenuGroup['items'][number] & { image?: AssetKey }
export type Menu = { id: string; label: string; groups: { name: string; items: Dish[] }[] }

export const menus: Menu[] = [
  {
    id: 'dinner',
    label: 'Dinner',
    groups: [
      {
        name: 'From the oven first',
        items: [
          { name: 'Oven bread', description: 'Baked at dawn in the same oven, with cultured butter and flaky salt.', price: '£5', image: 'dish2' },
          { name: 'Embered vegetables', description: 'Peppers, courgette, carrot and red onion from Larkrise Farm, whipped feta, burnt honey.', price: '£12', image: 'dish1' },
          { name: 'Leeks in the ashes', description: 'Cooked black in the embers, peeled, with mustard dressing and a soft egg.', price: '£10' },
          { name: 'Smoked beetroot', description: 'Fresh curd, toasted hazelnut, the beet leaves wilted in brown butter.', price: '£9' },
        ],
      },
      {
        name: 'Larger plates',
        items: [
          { name: 'Whole fish from the grill', description: 'The day’s catch from Brixham, lemon, charred courgette and new potatoes.', price: '£28', image: 'dish3' },
          { name: 'Lamb shoulder', description: 'In the oven overnight as the fire dies, with white beans and salsa verde.', price: '£26' },
          { name: 'Roast squash', description: 'Brown butter, sage and spelt from Stonepit Farm, a spoon of chilli oil.', price: '£19' },
        ],
      },
      {
        name: 'Afters',
        items: [
          { name: 'Baked apple', description: 'Oat crumble and cold pouring cream.', price: '£8' },
          { name: 'Burnt honey custard', description: 'Set in the last heat of the oven.', price: '£8' },
          { name: 'Cheese', description: 'One West Country cheese, oatcakes, quince.', price: '£11' },
        ],
      },
      {
        name: 'To drink',
        items: [
          { name: 'Cider from Stonepit Farm', description: 'Dry and still, by the glass or the bottle.', price: '£6' },
          { name: 'House wine', description: 'A red and a white from a small grower in the Loire.', price: '£8' },
          { name: 'Rhubarb soda', description: 'Made in the kitchen, not too sweet.', price: '£4' },
        ],
      },
    ],
  },
  {
    id: 'lunch',
    label: 'Weekend lunch',
    groups: [
      {
        name: 'To start',
        items: [
          { name: 'Oven bread', description: 'With cultured butter and flaky salt.', price: '£5', image: 'dish2' },
          { name: 'Soup of the week', description: 'Whatever the farms sent most of, with a heel of bread.', price: '£8' },
          { name: 'Flatbread from the fire', description: 'Blistered in the oven mouth, with greens, yogurt and chilli butter.', price: '£11' },
        ],
      },
      {
        name: 'Main and after',
        items: [
          { name: 'Sunday roast', description: 'Lamb or squash, roasted roots, greens and the gravy from the tray.', price: '£24' },
          { name: 'Whole fish from the grill', description: 'Lemon, charred courgette, new potatoes. For one, or two to share.', price: '£28', image: 'dish3' },
          { name: 'Baked apple', description: 'Oat crumble and cold pouring cream.', price: '£8' },
        ],
      },
    ],
  },
]

export const menuNote =
  'This is this week’s menu; it changes every Wednesday with what the farms send. Tell us about allergies when you book and the kitchen will cook around them.'

export const gallery: { id: AssetKey; caption: string }[] = [
  { id: 'room1', caption: 'The room before the first table' },
  { id: 'room2', caption: 'Herbs for the salsa verde' },
  { id: 'farm', caption: 'Monday’s crate from Larkrise' },
  { id: 'dish1', caption: 'Vegetables after the embers' },
  { id: 'dish2', caption: 'The morning bake' },
  { id: 'dish3', caption: 'Fish off the grill' },
]

export const faq = [
  { q: 'Can I come without booking?', a: 'Yes. We keep the eight counter seats by the oven for walk-ins every night. Come early in the evening and you will usually get one.' },
  { q: 'What if I have an allergy or eat no meat?', a: 'Tell us when you book. Half the menu is vegetables anyway, and because we cook everything ourselves the kitchen can leave things out or cook a dish just for you.' },
  { q: 'Do you have a set menu?', a: 'No, you order what you like from the menu of the week. If you would rather not choose, ask for the kitchen to cook for the table; it is £45 a head.' },
  { q: 'How big a group can you take?', a: 'Up to six online. For seven to twelve, call us: we set the long table by the oven, and we ask groups that size to order the kitchen’s menu.' },
  { q: 'What if I need to cancel?', a: 'Reply to our confirmation email or call us. We only ask that you let us know a day ahead, so someone else can have the table.' },
  { q: 'Is it accessible?', a: 'The dining room is on the ground floor with a level entrance, and there is an accessible toilet. Tell us if you need a particular table and we will keep it.' },
  { q: 'Can I bring a dog?', a: 'Well-behaved dogs are welcome at the counter and the tables by the window.' },
]
