export type ImageKey =
  | 'architecture'
  | 'interior'
  | 'ceramics'
  | 'fashion'
  | 'fashion2'
  | 'cinematic'
  | 'landscape'
  | 'restaurant'
  | 'food'
  | 'botanical'
  | 'texture'
  | 'product'
  | 'abstract3d'
  | 'tech'
  | 'studio'
  | 'portrait'
  | 'sea'
  | 'stone';

export type CuratedImage = { src: string; alt: string; credit: string; page: string };

// All photos are free (non-Unsplash+) images under the Unsplash License. Verified 2026-09-26.
export const images: Record<ImageKey, CuratedImage> = {
  architecture: {
    src: 'https://images.unsplash.com/photo-1579724175242-0204ecac28cb',
    alt: 'Concrete steps with tree branch shadows cast across the textured grey surface',
    credit: 'Tanner Vote',
    page: 'https://unsplash.com/photos/concrete-steps-with-tree-shadows-rKgb2jb7wk0',
  },
  interior: {
    src: 'https://images.unsplash.com/photo-1496113329550-ce8886d06d54',
    alt: 'An empty Japanese room with tatami mats and shoji windows',
    credit: 'charlesdeluvio',
    page: 'https://unsplash.com/photos/an-empty-room-with-tata-mats-and-windows-hxNlMIzmgDI',
  },
  ceramics: {
    src: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa',
    alt: 'White and brown handmade ceramic cups on a white shelf',
    credit: 'Vladimir Gladkov',
    page: 'https://unsplash.com/photos/white-and-brown-ceramic-bowls-NPPIq1XFdck',
  },
  fashion: {
    src: 'https://images.unsplash.com/photo-1668952135120-7d997b1b3778',
    alt: 'A woman in a long camel coat against a pale wall, face out of frame',
    credit: 'Onur Senay',
    page: 'https://unsplash.com/photos/a-woman-in-a-long-coat-Qy8IEssqkYU',
  },
  fashion2: {
    src: 'https://images.unsplash.com/photo-1518019671582-55004f1bc9ab',
    alt: 'Close-up of soft folds in grey linen fabric',
    credit: 'Luca Laurence',
    page: 'https://unsplash.com/photos/grey-linen-FseXc3OsIic',
  },
  cinematic: {
    src: 'https://images.unsplash.com/photo-1789113655379-bb0b0cdd4186',
    alt: 'Three people walking along a dark cobblestone street at night under streetlights',
    credit: 'Bruno BD',
    page: 'https://unsplash.com/photos/people-walking-on-dark-cobblestone-street-Dg36T-ypHHc',
  },
  landscape: {
    src: 'https://images.unsplash.com/photo-1680430154331-3c3352a1a6ec',
    alt: 'A lone tree in a foggy field',
    credit: 'Wolfgang Hasselmann',
    page: 'https://unsplash.com/photos/a-lone-tree-in-a-foggy-field-aEzsF4eIdBQ',
  },
  restaurant: {
    src: 'https://images.unsplash.com/photo-1709548145082-04d0cde481d4',
    alt: 'A dimly lit restaurant with tables and chairs',
    credit: 'Oliver Guhr',
    page: 'https://unsplash.com/photos/a-dimly-lit-restaurant-with-tables-and-chairs-EjHiN2KxTO4',
  },
  food: {
    src: 'https://images.unsplash.com/photo-1762922425398-00c2c6635dc5',
    alt: 'Seafood pasta dish in a blue bowl on a wooden table, seen from above',
    credit: 'Jessie Maxwell',
    page: 'https://unsplash.com/photos/seafood-pasta-dish-in-a-blue-bowl-on-wooden-table-89x1gsvk_Pk',
  },
  botanical: {
    src: 'https://images.unsplash.com/photo-1786840437558-2a2a4539d9d0',
    alt: 'A leafy plant casting a sharp shadow on a textured white wall',
    credit: 'Spencer Liao',
    page: 'https://unsplash.com/photos/leafy-plant-shadow-on-wall-4WeRq0FLB2s',
  },
  texture: {
    src: 'https://images.unsplash.com/photo-1629968417841-d87296c4205b',
    alt: 'A sheet of light brown recycled paper with a subtle textured surface',
    credit: 'Kiwihug',
    page: 'https://unsplash.com/photos/light-brown-recycled-paper-texture-XRTlS6TYK1M',
  },
  product: {
    src: 'https://images.unsplash.com/photo-1598634222670-87c5f558119c',
    alt: 'Clear glass perfume bottle on a black background',
    credit: 'Joppe Spaa',
    page: 'https://unsplash.com/photos/clear-glass-perfume-bottle-with-black-background-Y8kwv9_Vay8',
  },
  abstract3d: {
    src: 'https://images.unsplash.com/photo-1679669693872-12d991fc9d93',
    alt: 'A black and white render of a wavy glass-like object',
    credit: 'Trophim Laptev',
    page: 'https://unsplash.com/photos/a-black-and-white-photo-of-a-wavy-object-WRaMq1fJWdg',
  },
  tech: {
    src: 'https://images.unsplash.com/photo-1618601208267-baa5b780b70e',
    alt: 'Colored light streaks against a black background',
    credit: 'Annie Spratt',
    page: 'https://unsplash.com/photos/blue-and-white-light-streaks-vqdPQJgfMfc',
  },
  studio: {
    src: 'https://images.unsplash.com/photo-1785502664647-99734616d5ea',
    alt: 'Long glowing green structure in a dark, green-lit room',
    credit: 'Doon _MUC',
    page: 'https://unsplash.com/photos/long-glowing-green-structure-in-a-dark-green-lit-room-os5lCnZgA14',
  },
  portrait: {
    src: 'https://images.unsplash.com/photo-1704202632056-de2c85caf4cf',
    alt: 'A silhouette of a woman in profile in the dark',
    credit: 'Sophia',
    page: 'https://unsplash.com/photos/a-silhouette-of-a-woman-in-the-dark-Mjm6ot0FdNE',
  },
  sea: {
    src: 'https://images.unsplash.com/photo-1536082558989-67e8fb74a9a0',
    alt: 'Calm sea meeting a pastel horizon',
    credit: 'Jan Tinneberg',
    page: 'https://unsplash.com/photos/wide-angle-photo-of-body-of-water-f3PRhiYEfkM',
  },
  stone: {
    src: 'https://images.unsplash.com/photo-1760740516392-e959f71c6027',
    alt: 'Close-up of sand dunes with wavy patterns',
    credit: 'Maru Heredia',
    page: 'https://unsplash.com/photos/close-up-of-sand-dunes-with-wavy-patterns-G3bZgGrBr4c',
  },
};

export const img = (key: ImageKey, w = 1200) => `${images[key].src}?w=${w}&q=80&auto=format&fit=crop`;
