// Asset reference layer. Components never hardcode media paths — they ask for a key (<MediaAsset id="farm" />).
// Replacing a photo = drop the new JPEG at the same path, run `bash scripts/media.sh`, adjust alt/position here.
// All photos are the owner's own set (see media-src/SOURCES.md); none are temporary.
export const assets = {
  hero: { src: '/media/hero.jpg', width: 2400, height: 3600, position: '50% 72%', status: 'have', usage: 'Home hero, desktop',
    alt: 'The wood oven with the fire going and flatbreads inside, the cooks dark against it' },
  heroMobile: { src: '/media/hero-mobile.jpg', width: 1440, height: 2560, position: '50% 50%', status: 'have', usage: 'Home hero, 9:16 mobile crop',
    alt: 'The wood oven with the fire going and flatbreads inside, the cooks dark against it' },
  dish1: { src: '/media/dish-1.jpg', width: 2400, height: 1597, position: '50% 50%', status: 'have', usage: 'Menu, gallery',
    alt: 'Peppers, courgette, carrot and red onion charred in the oven, on a white plate' },
  dish2: { src: '/media/dish-2.jpg', width: 2400, height: 1600, position: '50% 50%', status: 'have', usage: 'Menu, gallery',
    alt: 'A round scored loaf on a striped linen runner' },
  dish3: { src: '/media/dish-3.jpg', width: 2400, height: 1800, position: '50% 50%', status: 'have', usage: 'Menu, gallery',
    alt: 'A whole grilled fish with lemon slices, potatoes and courgette on a wooden board' },
  room1: { src: '/media/room-1.jpg', width: 2400, height: 1600, position: '50% 50%', status: 'have', usage: 'Gallery',
    alt: 'The dining room in low evening sun, wooden tables set, bentwood chairs' },
  room2: { src: '/media/room-2.jpg', width: 2400, height: 1600, position: '50% 50%', status: 'have', usage: 'Gallery',
    alt: 'Hands chopping herbs on a worn wooden board' },
  farm: { src: '/media/farm.jpg', width: 2400, height: 1527, position: '45% 50%', status: 'have', usage: 'Intro, gallery',
    alt: 'A wooden crate of tomatoes, peppers, onions and herbs from the farm' },
  location: { src: '/media/location.jpg', width: 2400, height: 1285, position: '40% 50%', status: 'have', usage: 'Location',
    alt: 'The restaurant window from the street at dusk, bulbs lit over the tables' },
} as const

export type AssetKey = keyof typeof assets
