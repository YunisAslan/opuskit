// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Replacing a file = dropping a new one at the same path, or editing one line here. Sources: media-src/SOURCES.md.
type Status = 'have' | 'temporary'
type Asset = { src: string; alt: string; status: Status; usage: string; width?: number; height?: number }

export const assets = {
  heroVideo: { src: '/media/heroVideo.mp4', alt: '', status: 'have', usage: 'Hero loop, desktop', width: 1920, height: 1080 },
  mobileVideoEncode: { src: '/media/mobileVideoEncode.mp4', alt: '', status: 'have', usage: 'Hero loop, phones', width: 608, height: 1080 },
  posterImage: { src: '/media/posterImage.jpg', alt: '', status: 'have', usage: 'Hero poster, desktop' },
  posterMobile: { src: '/media/posterMobile.jpg', alt: '', status: 'have', usage: 'Hero poster, phones' },

  product1: { src: '/media/product-1.jpg', alt: 'The Narikala coat in black waxed wool, hanging on a wall hook', status: 'have', usage: 'Product' },
  product2: { src: '/media/product-2.jpg', alt: 'The Sololaki rider, a black leather biker jacket, laid flat', status: 'have', usage: 'Product' },
  product3: { src: '/media/product-3.jpg', alt: 'The heavy tee in black cotton, worn oversized', status: 'have', usage: 'Product' },
  product4: { src: '/media/product-4.jpg', alt: 'The Vake trouser, black and wide in the leg, seen from behind', status: 'have', usage: 'Product' },
  product5: { src: '/media/product-5.jpg', alt: 'A pair of black leather slouch boots', status: 'have', usage: 'Product' },
  product6: { src: '/media/product-6.jpg', alt: 'The round bag in black leather against a white wall', status: 'have', usage: 'Product' },
  product7: { src: '/media/product-7.jpg', alt: 'The rib turtleneck in black, folded flat', status: 'have', usage: 'Product' },
  product8: { src: '/media/product-8.jpg', alt: 'The black waxed cotton cap on a window sill', status: 'have', usage: 'Product' },

  look1: { src: '/media/look-1.jpg', alt: 'A woman in a long black coat against dark stone walls', status: 'have', usage: 'Collection, lookbook' },
  look2: { src: '/media/look-2.jpg', alt: 'A figure in black facing a bare concrete corner', status: 'have', usage: 'Collection, lookbook' },
  look3: { src: '/media/look-3.jpg', alt: 'A woman in black coat, trousers and boots walking past a stone wall', status: 'have', usage: 'Collection, lookbook' },
  detail: { src: '/media/detail.jpg', alt: 'Black leather lace-up boots up close: eyelets, laces and stitching', status: 'have', usage: 'Editorial story' },
  studio: { src: '/media/studio.jpg', alt: 'An overlock machine under a lamp in the dim Saint Ashe workshop, thread cones behind', status: 'have', usage: 'About' },
  team1: { src: '/media/team-1.jpg', alt: 'Nino Beridze in a black turtleneck', status: 'have', usage: 'Team' },
  team2: { src: '/media/team-2.jpg', alt: 'Levan Abashidze in a black turtleneck', status: 'have', usage: 'Team' },
  team3: { src: '/media/team-3.jpg', alt: 'Tamar Kvaratskhelia in black', status: 'have', usage: 'Team' },
  shop: { src: '/media/shop.jpg', alt: 'The Saint Ashe shop: a bare concrete room with a black iron rail of dark garments', status: 'have', usage: 'Location' },
} satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets
