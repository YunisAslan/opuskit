import { assets } from '@/config/assets'

// The four books. `chapter` names each book's own colours in tokens.css (--color-{chapter}-ground / -ink).
export const books = [
  {
    id: 'rooster', chapter: 'rooster', image: assets.bookRooster,
    title: 'The Loudest Rooster in Sheki', publisher: 'Larkmoor Books', year: 2019, kind: 'Picture book, ages 3–6',
    line: 'A rooster who crows before the sun is up learns that the town already keeps its own time: church bells, bread ovens and the silk mill whistle.',
    more: 'Text by Leyla Mammadli. Nell’s first book about her own street, drawn from the window above the bakery. Now in six languages.',
  },
  {
    id: 'koi', chapter: 'koi', image: assets.bookKoi,
    title: 'Nine Koi and a Copper Moon', publisher: 'Tidewell Press', year: 2021, kind: 'Counting book, ages 2–5',
    line: 'A counting book that sinks slowly: nine fish, one moon in the pond, and a heron the reader spots long before the koi do.',
    more: 'Words and pictures by Nell Arden. Painted in ink and two watercolours only, so every page sits a little deeper in the pond.',
  },
  {
    id: 'sparrow', chapter: 'sparrow', image: assets.bookSparrow,
    title: 'Sparrow Keeps the Spring', publisher: 'Fenlark Editions', year: 2023, kind: 'Picture book, ages 4–7',
    line: 'Through a cold March a sparrow guards the magnolia buds. Nobody thanks her. She does it anyway, and the tree knows.',
    more: 'Text by Tomas Reyhan. Drawn over one real spring in Sheki, a sketchbook page a day, from the first bud to the last petal.',
  },
  {
    id: 'moths', chapter: 'moths', image: assets.bookMoths,
    title: 'The Moths Who Came to Tea', publisher: 'Hollin & Pike', year: 2016, kind: 'Picture book, ages 3–7',
    line: 'Twelve moths follow a lamp into a grandmother’s kitchen and stay for tea. The first book, and the one the studio is named after.',
    more: 'Words and pictures by Nell Arden. Drawn from old specimen plates, reprinted eight times and read aloud in nine languages.',
  },
]
