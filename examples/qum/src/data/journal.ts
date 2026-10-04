import type { AssetKey } from '@/config/assets'

type Block = string | { quote: string; by?: string } | { image: AssetKey; caption?: string }
export type Post = {
  slug: string; title: string; kicker: string; dek: string; date: string; author: 'leyla' | 'nigar' | 'rauf'
  image: AssetKey; caption: string; body: Block[]; tags: string[]
}

export const people = {
  leyla: { name: 'Leyla Həsənova', role: 'Makes the salt products', image: 'founder1' as AssetKey, bio: 'Leyla started QUM at her kitchen table in Mardakan in 2019. She still rakes the salt herself every August.' },
  nigar: { name: 'Nigar Əliyeva', role: 'Writes the formulas', image: 'founder2' as AssetKey, bio: 'Nigar trained as a chemist in Baku and worked for ten years in a pharmacy lab before she joined in 2021.' },
  rauf: { name: 'Rauf Quliyev', role: 'Buys the saffron, runs the lab', image: 'founder3' as AssetKey, bio: 'Rauf grew up in Bilgah, between the fields. He knows every grower by name and every bottle by batch.' },
}

export const posts: Post[] = [
  {
    slug: 'three-weeks-in-october', title: 'Three weeks in October', kicker: 'Saffron', date: '3 October 2026', author: 'rauf',
    dek: 'The crocus at Bilgah flowers once a year, for about three weeks. This is how we spend them.',
    image: 'saffronField', caption: 'The first flowers, Bilgah, last October.', tags: ['Saffron', 'Bilgah', 'Harvest'],
    body: [
      'Every year, some time in the second week of October, my phone rings before six in the morning. It is Əli, who grows saffron on two small fields behind the village where I grew up, and he says the same three words: they are open.',
      'Saffron is the stigma of one kind of crocus, three red threads in the middle of each purple flower. The flowers open at dawn and start to wilt by noon, so the picking happens early and fast, bent over in rows, with a basket at your hip. There is no machine for it. There never has been.',
      { quote: 'A hundred and fifty flowers give you about one gram. We use a fifth of that in each bottle of serum.', by: 'Rauf' },
      'By ten o’clock the baskets come into Əli’s kitchen, and the second job begins: pulling the threads out of each flower by hand. His mother does it faster than anyone I have met. She talks the whole time and never looks down.',
      'The threads dry on paper overnight, in a warm room with the windows shut. The next morning they are a third of their weight and a deep, dark red. That is the moment I drive them to the lab in Mardakan, forty minutes along the coast road.',
      { image: 'saffronClose', caption: 'Each flower holds three threads. Nothing else of it is used.' },
      'At the lab, Nigar weighs them, and they go straight into olive squalane in amber jars. They sit there for six weeks while the colour and the scent move into the oil. You can see it happen: on the first day the oil is clear; by the end it is the colour of late afternoon.',
      'We buy everything Əli and one other grower can spare, which is never quite enough. It is why the serum comes in batches of 300 and why, some months, there is none at all. We could buy saffron from further away, more cheaply, all year round. We have decided not to.',
      'If you are near Bilgah in the second half of October, come and see the fields. Go early. By lunchtime, the purple is gone.',
    ],
  },
  {
    slug: 'why-we-rake-salt-in-august', title: 'Why we rake salt in August', kicker: 'The salt', date: '12 September 2026', author: 'leyla',
    dek: 'The lake at Masazir turns pink, then white. We have about three weeks to take what we need for the year.',
    image: 'saltLake', caption: 'Masazir lake from the air, late August.', tags: ['Salt', 'Masazir', 'Harvest'],
    body: [
      'Masazir lake is twenty minutes from the centre of Baku and most people drive past it without a second look. For most of the year it is a flat, grey sheet of shallow water. In summer, as it evaporates, tiny algae turn it pink, and then the salt starts to show.',
      'By the middle of August the water has drawn back from the edges and left a crust of white crystals, a few centimetres thick. That is the salt we use. We rake it by hand, from the same strip of shore every year, with wooden rakes my uncle made.',
      { quote: 'We take about four hundred kilos. It sounds like a lot until you see the lake.', by: 'Leyla' },
      'The salt goes into cloth sacks and back to Mardakan, where it dries in the sun on the lab roof for a week. Then we wash it twice in filtered water from the lake itself and dry it again. What is left is coarse, clean and faintly grey, with the minerals of the Caspian still in it.',
      { image: 'saltCrystals', caption: 'After the second wash. The grey is magnesium, and it stays.' },
      'Some of it is ground fine for the cleanser and the day cream. The rest stays coarse for the scrub. A small amount is dissolved back into water for the toner, which is the closest thing to bottling the lake.',
      'People ask why we do not buy salt like everyone else. The honest answer is that this is where QUM began: a jar of Masazir salt and sunflower oil on my kitchen table, made for my mother’s hands. Everything else grew from that jar.',
      'If you want to see the lake at its pinkest, go in late July on a still day, in the hour before sunset. Bring water and a hat. The light off the salt is stronger than you expect.',
    ],
  },
  {
    slug: 'a-slow-morning-in-three-steps', title: 'A slow morning, in three steps', kicker: 'The ritual', date: '28 August 2026', author: 'nigar',
    dek: 'You do not need ten products. You need three, used well, and about four minutes.',
    image: 'ritualFace', caption: 'Warming the cream between your fingertips first helps it sink in.', tags: ['Ritual', 'How to'],
    body: [
      'When I worked in a pharmacy, people would come to the counter with bags full of skincare and ask which one was not working. Usually the answer was all of them, a little, because they were using too many at once and none of them for long enough.',
      'QUM has six products because we think that is the most anyone needs, and most mornings you will use three. Here is the order I use them in, and why.',
      { image: 'bathroom', caption: 'Lukewarm water, not hot. Hot water takes the oil you want to keep.' },
      'First, wash. One pump of the Salt Cleanser on damp skin, half a minute of slow circles, then rinse with lukewarm water. The salt is fine enough that you will not feel it; it is there for the minerals, not to scrub. Pat your face dry, do not rub.',
      'Second, treat. Three drops of the Saffron Serum, warmed between your fingertips and pressed in, starting at the cheeks. Pressing matters more than you would think. It spreads the serum evenly without pulling at the skin around your eyes.',
      { quote: 'If your skin feels tight after washing, it is the water, not your skin. Change the water first.', by: 'Nigar' },
      'Third, seal. A pea-sized amount of the Day Cream in the morning, or four drops of the Night Oil before bed. This is the step people skip when they are in a hurry, and it is the one that keeps the other two working through the day.',
      { image: 'ritualHands', caption: 'A pea-sized amount is enough for face and neck.' },
      'That is all. The toner, the scrub and the balm are there for the days you want them, not the days you have to. Give any new routine four weeks before you judge it; skin takes about that long to show what it thinks.',
    ],
  },
]

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug)
