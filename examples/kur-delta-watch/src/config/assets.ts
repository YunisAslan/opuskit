// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Replacing a photo = replacing the file at that path or editing one line here. Sources: media-src/SOURCES.md.
export const assets = {
  // The film band on Home (prepared with scripts/prepare-video.sh)
  heroVideo: { src: '/media/heroVideo.mp4', alt: '', status: 'have', usage: 'Home film band, desktop (1920×1080)' },
  mobileVideoEncode: { src: '/media/mobileVideoEncode.mp4', alt: '', status: 'have', usage: 'Home film band, phones (1080×1920)' },
  posterImage: { src: '/media/posterImage.jpg', alt: 'Dawn mist over a winding river channel through the marsh', status: 'have', usage: 'Film band poster, desktop' },
  posterMobile: { src: '/media/posterMobile.jpg', alt: 'Dawn mist over a winding river channel through the marsh', status: 'have', usage: 'Film band poster, phones' },

  // Cleanup days
  cleanup1: { src: '/media/cleanup-1.jpg', alt: 'Two volunteers in rubber boots bagging rubbish at the water’s edge among the reeds', status: 'have', usage: 'Field notes, gallery' },
  cleanup2: { src: '/media/cleanup-2.jpg', alt: 'A volunteer in waders netting rubbish out of the reed beds, a full sack beside him', status: 'have', usage: 'What we do, menu' },
  cleanup3: { src: '/media/cleanup-3.jpg', alt: 'A volunteer leaning over still water to lift a mask out of the reeds', status: 'have', usage: 'Journal' },
  cleanup4: { src: '/media/cleanup-4.jpg', alt: 'A volunteer emptying a net of rubbish in dry reeds at dusk', status: 'have', usage: 'Field notes, gallery' },
  cleanup5: { src: '/media/cleanup-5.jpg', alt: 'Five volunteers with full bags on a sandy riverbank', status: 'have', usage: 'What we do, cover' },
  volunteerDay: { src: '/media/volunteer-day.jpg', alt: 'Rauf smiling with a full bag, the group cleaning the beach behind him', status: 'have', usage: 'The river, team' },
  glove: { src: '/media/glove.jpg', alt: 'A gloved hand picking used masks off dark water', status: 'have', usage: 'Field notes, gallery' },
  waterTest: { src: '/media/water-test.jpg', alt: 'A hand dipping a tester pen into shallow river water', status: 'have', usage: 'Journal, field notes' },

  // The delta and its birds
  delta1: { src: '/media/delta-1.jpg', alt: 'Marsh channels from the air, green reeds and silver water to the horizon', status: 'have', usage: 'The river, cover' },
  delta2: { src: '/media/delta-2.jpg', alt: 'The delta’s branching channels on pale mudflats, seen from above', status: 'have', usage: 'The river, story; menu' },
  pelicans: { src: '/media/pelicans.jpg', alt: 'White pelicans on open water in front of a wall of reeds, one spreading its wings', status: 'have', usage: 'Journal, gallery' },
  heron1: { src: '/media/heron-1.jpg', alt: 'A grey heron wading through broken reeds and lily pads', status: 'have', usage: 'Field notes, menu' },
  heron2: { src: '/media/heron-2.jpg', alt: 'A grey heron with a fish in golden shallow water', status: 'have', usage: 'Field notes, gallery' },

  // Boat days
  boat1: { src: '/media/boat-1.jpg', alt: 'From the bow, past an orange life ring, a channel through tall reeds', status: 'have', usage: 'Donate, menu' },
  boat2: { src: '/media/boat-2.jpg', alt: 'A blue rowing boat moored by the reeds and a lone tree', status: 'have', usage: 'Contact, location' },
  boat3: { src: '/media/boat-3.jpg', alt: 'A volunteer wading through pale shallow water, pulling a small boat', status: 'have', usage: 'Gallery' },

  // The people
  team1: { src: '/media/team-1.jpg', alt: 'Leyla in a white cap and brown hoodie, smiling, a volunteer badge on her lanyard', status: 'have', usage: 'The river, about and team' },
  team2: { src: '/media/team-2.jpg', alt: 'Nigar in gloves holding a rubbish bag, pine trees behind her', status: 'have', usage: 'The river, team' },
  team3: { src: '/media/team-3.jpg', alt: 'Elshan standing in tall grass and reeds under a pale sky', status: 'have', usage: 'The river, team' },
} as const

export type AssetKey = keyof typeof assets
export const media = (key: AssetKey) => assets[key]
