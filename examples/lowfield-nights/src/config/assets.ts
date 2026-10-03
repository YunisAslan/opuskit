// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Replacing a file = replacing the file at that path or editing one line here. Sources: media-src/SOURCES.md.
type Asset = { src: string; alt: string; width: number; height: number; status: 'have' | 'temporary'; usage: string }

export const assets = {
  heroVideo: { src: '/media/heroVideo.mp4', alt: '', width: 1920, height: 1080, status: 'have', usage: 'The film, played on request when motion is reduced' },
  scrubReadyEncode: { src: '/media/scrubReadyEncode.mp4', alt: '', width: 1920, height: 1080, status: 'have', usage: 'Scroll-controlled page film, desktop' },
  mobileVideoEncode: { src: '/media/mobileVideoEncode.mp4', alt: '', width: 1080, height: 1920, status: 'have', usage: 'Scroll-controlled page film, phones' },
  posterImage: { src: '/media/posterImage.jpg', alt: '', width: 1920, height: 1080, status: 'have', usage: 'First frame of the film, desktop' },
  posterMobile: { src: '/media/posterMobile.jpg', alt: '', width: 1080, height: 1920, status: 'have', usage: 'First frame of the film, phones' },
  artist1: { src: '/media/artist-1.jpg', alt: 'Tural Amirli with his double bass in low amber light', width: 1597, height: 2400, status: 'have', usage: 'Team' },
  artist2: { src: '/media/artist-2.jpg', alt: 'Ines Varga, looking away from the camera against a dark ground', width: 1600, height: 2400, status: 'have', usage: 'Team' },
  artist3: { src: '/media/artist-3.jpg', alt: 'Kamran Sadiq in a sand-coloured scarf, lit from one side', width: 1920, height: 2400, status: 'have', usage: 'Team' },
  artist4: { src: '/media/artist-4.jpg', alt: 'Nora Halloway in a white blouse, side-lit on black', width: 2069, height: 2400, status: 'have', usage: 'Team' },
  venue1: { src: '/media/venue-1.jpg', alt: 'The inside of the hangar: a dark steel-truss hall with one pale window', width: 2400, height: 1353, status: 'have', usage: 'Gallery stop: the hall' },
  venue2: { src: '/media/venue-2.jpg', alt: 'An outdoor screening at night, people on blankets in front of a glowing screen', width: 2084, height: 2400, status: 'have', usage: 'Gallery stop: the apron' },
  venue3: { src: '/media/venue-3.jpg', alt: 'An audience seen from behind, musicians in warm haze on a dark stage', width: 2400, height: 961, status: 'have', usage: 'Gallery stop: the floor' },
  venue4: { src: '/media/venue-4.jpg', alt: 'A sea beacon at dusk in sand-gold haze, an industrial shore on the horizon', width: 2400, height: 1800, status: 'have', usage: 'Gallery stop: the shore' },
  location: { src: '/media/location.jpg', alt: 'The hangar from outside at night: corrugated walls by the water, one warm lamp', width: 2400, height: 1421, status: 'have', usage: 'Location' },
} satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets
