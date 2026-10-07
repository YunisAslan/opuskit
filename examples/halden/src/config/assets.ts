// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Replacing a file = dropping the new one at the same path (same name, same shape). Nothing else changes.
//
// Every file under /public/media is the owner's real media (assets/manifest.json; sources in media-src/SOURCES.md):
// - The film: a 25 s drone shot over a sea of fog at first light, encoded by `bash scripts/prepare-video.sh`
//   (heroVideo.mp4, scrubReadyEncode.mp4, mobileVideoEncode.mp4, posterImage.jpg, posterMobile.jpg). Its scenes and
//   their messages are mapped in src/config/scenes.ts.
// - Photos: at the size given here (shot list, recipe/media.md). The optional secondary film is not delivered; its
//   real still (secondaryPoster) stands in for it.

type Status = 'have' | 'temporary' | 'create' | 'find' | 'optional'

export type ImageAsset = {
  kind: 'image'
  src: string
  width: number
  height: number
  alt: string
  status: Status
  usage: string
  /** What the real photo shows (shot list). */
  subject: string
}

export type VideoAsset = {
  kind: 'video'
  src: string
  /** The still shown before the film loads, on reduced motion, and until the file exists. */
  poster: ImageKey
  width: number
  height: number
  alt: string
  status: Status
  usage: string
  subject: string
}

const image = (src: string, width: number, height: number, alt: string, usage: string, subject: string, status: Status = 'have'): ImageAsset =>
  ({ kind: 'image', src, width, height, alt, status, usage, subject })

const images = {
  // The film's stills — the first frame of the film, same crop (prepare-video.sh writes both).
  posterImage: image('/media/posterImage.jpg', 1920, 1080, '', 'Shown before video loads and on reduced motion', 'First frame of the opening film: first light over a sea of fog, dark ridges on the horizon'),
  posterMobile: image('/media/posterMobile.jpg', 1080, 1920, '', 'Phone poster for the opening film', 'First frame of the opening film, 9:16 centre crop'),
  supportingImages: image('/media/supportingImages.jpg', 1920, 2400, 'A black sauna house on the water, its chimney against a grey sky', 'Sections between video moments: sign in and sign up', 'A sauna house on the water, its chimney, a grey sky'),

  // Home · Gallery — 3:2 for places, 4:5 for people and things, 2400px long edge, one light, one grade.
  gallery1: image('/media/gallery1.jpg', 2400, 1600, 'A timber sauna on stilts over the rocks, the sea beyond', 'Home · Gallery', 'A timber sauna on the rocks, the sea beyond'),
  gallery2: image('/media/gallery2.jpg', 1920, 2400, 'Birch logs stacked by the open stove, the fire burning', 'Home · Gallery', 'Birch logs and the stove fire, close'),
  gallery3: image('/media/gallery3.jpg', 2400, 1600, 'The bathing pier and its ladders reaching into still water at blue hour', 'Home · Gallery (full width)', 'The bathing pier and its ladders at blue hour'),
  gallery4: image('/media/gallery4.jpg', 2400, 1600, 'A bather in a hole in the winter sea, snow on the shore', 'Home · Gallery', 'A bather in the winter sea, snow on the shore'),
  gallery5: image('/media/gallery5.jpg', 1920, 2400, 'A bather wrapped in a wool blanket by the sea, hat pulled low', 'Home · Gallery', 'Wrapped in a wool blanket after the sea'),
  secondaryPoster: image('/media/secondaryPoster.jpg', 2400, 1600, 'Wooden steps leading down into a still, empty sea', 'Home · Gallery closing frame (stands in for the optional secondary film)', 'Steps into a still, empty sea'),

  // Home · Location and Visit · Location — the way in, and one view inside. 3:2, 2400px.
  locationHomeArrival: image('/media/locationHomeArrival.jpg', 2400, 1600, 'The shore path through the grass to the huts by the sea', 'Home · Location', 'The shore path to the huts, as visitors arrive'),
  locationHomeInside: image('/media/locationHomeInside.jpg', 2400, 1600, 'Inside: the benches, the stove and the long window onto snow', 'Home · Location', 'The benches, the stove and the long window onto snow'),
  locationVisitArrival: image('/media/locationVisitArrival.jpg', 2400, 1600, 'The pier out over the rocks to the bath hut', 'Visit · Location', 'The pier out to the bath hut'),
  locationVisitInside: image('/media/locationVisitInside.jpg', 2400, 1600, 'Inside the sauna, the benches leading to a window onto the snow', 'Visit · Location', 'Inside, the window onto the snow'),

  // Home · How It Works — one picture per step (3:2).
  stepArrive: image('/media/stepArrive.jpg', 2400, 1600, 'A white robe on its hook', 'Home · How It Works', 'Arrive: a robe on its hook'),
  stepHeat: image('/media/stepHeat.jpg', 2400, 1600, 'The sauna stones, the bucket and the benches in low light', 'Home · How It Works', 'Heat: the stones, the bucket, the benches in low light'),
  stepSea: image('/media/stepSea.jpg', 2400, 1600, 'The ladder from the dock down into the sea', 'Home · How It Works', 'The sea: the ladder into the water'),
  stepRest: image('/media/stepRest.jpg', 2400, 1600, 'A cup of tea by a misted window', 'Home · How It Works', 'Rest: tea by the window'),

  // Services · hover preview — 4:5, things and rooms.
  serviceSauna: image('/media/serviceSauna.jpg', 1920, 2400, 'The sauna room, its benches and a window onto the water', 'Services · hover preview', 'The sauna room and its window onto the water'),
  serviceSea: image('/media/serviceSea.jpg', 1920, 2400, 'A wooden jetty running out into the grey sea under low cloud', 'Services · hover preview', 'The sea from the jetty'),
  serviceSmoke: image('/media/serviceSmoke.jpg', 1920, 2400, 'Steam rising off the hot stones', 'Services · hover preview', 'Steam rising off the stones'),
  serviceTubs: image('/media/serviceTubs.jpg', 1920, 2400, 'A wood-fired cedar tub with its chimney', 'Services · hover preview', 'A wood-fired cedar tub'),
  serviceQuiet: image('/media/serviceQuiet.jpg', 1920, 2400, 'A blanket and a cup of tea in the quiet room', 'Services · hover preview', 'The quiet room: a blanket and a cup'),
  servicePrivate: image('/media/servicePrivate.jpg', 1920, 2400, 'The house lit at dusk above the shore', 'Services · hover preview', 'The house lit at dusk above the shore'),
}

const videos = {
  heroVideo: { kind: 'video', src: '/media/heroVideo.mp4', poster: 'posterImage', width: 1920, height: 1080, alt: '', status: 'have', usage: 'Hero (loop or scroll-controlled)', subject: 'The opening film: 25 s drone shot over a sea of fog at first light' },
  scrubReadyEncode: { kind: 'video', src: '/media/scrubReadyEncode.mp4', poster: 'posterImage', width: 1920, height: 1080, alt: '', status: 'have', usage: 'Scroll-controlled hero', subject: 'The opening film, keyframe every 6 frames' },
  mobileVideoEncode: { kind: 'video', src: '/media/mobileVideoEncode.mp4', poster: 'posterMobile', width: 1080, height: 1920, alt: '', status: 'have', usage: 'Hero on small screens', subject: 'The opening film, 9:16' },
  secondaryVideo: { kind: 'video', src: '/media/secondaryVideo.mp4', poster: 'secondaryPoster', width: 1920, height: 1080, alt: 'Wooden steps leading down into a still, empty sea', status: 'optional', usage: 'Chapter transitions — the gallery’s closing frame (not delivered; its still is shown)', subject: 'Optional: a slow, still sea' },
} satisfies Record<string, VideoAsset>

export const assets = { ...images, ...videos }

export type ImageKey = keyof typeof images
export type VideoKey = keyof typeof videos
export type AssetKey = keyof typeof assets

export const isVideoKey = (key: AssetKey): key is VideoKey => key in videos
export const getImage = (key: ImageKey): ImageAsset => images[key]
export const getVideo = (key: VideoKey): VideoAsset => videos[key]
