// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Replacing a photo or the film = replacing the file at that path or editing one line here.
// status: 'have' = the owner's chosen file; 'temporary' = a stand-in to replace before launch (see assets/manifest.json).
export type Asset = { src: string; alt: string; status: 'have' | 'temporary' }

export const assets = {
  // The film: one walk through the show house (prepared with scripts/prepare-video.sh).
  scrubReadyEncode: { src: '/media/scrubReadyEncode.mp4', alt: '', status: 'have' },
  heroVideo: { src: '/media/heroVideo.mp4', alt: 'A slow walk through the show house: the living room, the kitchen, the hall and the stair.', status: 'have' },
  mobileVideoEncode: { src: '/media/mobileVideoEncode.mp4', alt: '', status: 'have' },
  posterImage: { src: '/media/posterImage.jpg', alt: 'The living room of the show house, looking through to the kitchen.', status: 'have' },
  posterMobile: { src: '/media/posterMobile.jpg', alt: 'The living room of the show house, looking through to the kitchen.', status: 'have' },

  // The site
  cliff1: { src: '/media/cliff-1.jpg', alt: 'A dry ochre clifftop above open blue sea.', status: 'temporary' },
  cliff2: { src: '/media/cliff-2.jpg', alt: 'A white angular house on the rocks above the surf, seen from the air.', status: 'temporary' },

  // The hours: the light inside the houses
  hourDawn: { src: '/media/hour-dawn.jpg', alt: 'Pale stone steps in soft early light against a rough limestone wall.', status: 'temporary' },
  hourMorning: { src: '/media/hour-morning.jpg', alt: 'The shadow of a window frame on a plaster wall, in low morning sun.', status: 'temporary' },
  hourNoon: { src: '/media/hour-noon.jpg', alt: 'A concrete hall lit from a glass roof in hard noon light.', status: 'temporary' },
  hourAfternoon: { src: '/media/hour-afternoon.jpg', alt: 'A slab of afternoon light across a stone wall.', status: 'temporary' },
  hourEvening: { src: '/media/hour-evening.jpg', alt: 'Warm low sun across a wall and a wooden chair.', status: 'temporary' },
  hourDusk: { src: '/media/hour-dusk.jpg', alt: 'A dark room with one window and the last red light on the floor.', status: 'temporary' },

  // Rooms, terraces and details
  roomBed: { src: '/media/room-bed.jpg', alt: 'A bedroom whose angled windows look straight out to sea.', status: 'temporary' },
  roomBalcony: { src: '/media/room-balcony.jpg', alt: 'A pale room opening onto a balcony over turquoise water.', status: 'temporary' },
  terracePool: { src: '/media/terrace-pool.jpg', alt: 'A stone terrace and pool on the shore, chairs, the sea beyond.', status: 'temporary' },
  terraceStone: { src: '/media/terrace-stone.jpg', alt: 'A limestone parapet against a calm sea.', status: 'temporary' },
  detailJug: { src: '/media/detail-jug.jpg', alt: 'A clay jug in a shaft of sun by stone walls.', status: 'temporary' },
  stair: { src: '/media/stair.jpg', alt: 'A concrete stair under slatted light.', status: 'temporary' },

  architect: { src: '/media/architect.jpg', alt: 'Leyla Gadirli at her desk of drawings, under a warm lamp.', status: 'temporary' },
} as const satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets
export const media = (key: AssetKey) => assets[key]
