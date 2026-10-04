// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Replacing a file = dropping a new one at the same path, or editing one line here. Sizes are the real pixel sizes
// (they reserve space, so nothing shifts while loading). Every file here is real and final (none temporary);
// where each photo comes from is in media-src/SOURCES.md.
type Image = { src: string; alt: string; width: number; height: number }

const img = (src: string, width: number, height: number, alt: string): Image => ({ src: `/media/${src}`, width, height, alt })

export const assets = {
  portrait: img('portrait.jpg', 1600, 2400, 'Sela Mor in a leather jacket, holding studio headphones to one ear'),
  fieldRecording: img('field-recording.jpg', 2400, 1581, 'A sound recordist with a boom microphone on a dune under a grey sky'),
  workWind: img('work-wind.jpg', 2400, 1600, 'Tall grass bent flat by the wind'),
  workMachine: img('work-machine.jpg', 2400, 1600, 'The chuck of a lathe spinning, blurred'),
  workRain: img('work-rain.jpg', 2400, 2227, 'A drop hitting black water, rings of light around it'),
  workRoom: img('work-room.jpg', 2400, 1677, 'A loudspeaker cone close up'),
  workLive: img('work-live.jpg', 2400, 1600, 'A performer in silhouette in smoke and hard white light'),
  stage: img('stage.jpg', 2400, 1351, 'A dark room with one figure at an instrument and empty chairs lit beside him'),
  gallery: [
    img('gallery-1.jpg', 1714, 2400, 'Wheat against a white sky'),
    img('gallery-2.jpg', 2400, 1600, 'A field of grass combed flat by the wind'),
    img('gallery-3.jpg', 2400, 1600, 'Raindrops ringing on dark water'),
    img('gallery-4.jpg', 2400, 1600, 'Night sea, small waves catching the light'),
    img('gallery-5.jpg', 1600, 2400, 'Industrial machinery, pipes and cables'),
    img('gallery-6.jpg', 1600, 2400, 'A worn gear housing'),
    img('gallery-7.jpg', 2400, 1600, 'A row of stage lights in haze'),
    img('gallery-8.jpg', 1920, 2400, 'A figure in darkness raising a hand into a smoky beam'),
  ],
  // The film band on Home (prepared with scripts/prepare-video.sh; the scrub encode has a keyframe every 6 frames).
  film: {
    desktop: '/media/scrubReadyEncode.mp4', // 1920×1080, scroll-scrubbed
    loop: '/media/heroVideo.mp4', // 1920×1080, plain encode (kept for a looping fallback)
    mobile: '/media/mobileVideoEncode.mp4', // 1080×1920, 9:16, also keyframed every 6 frames
    poster: img('posterImage.jpg', 1920, 1080, ''),
    posterMobile: img('posterMobile.jpg', 1080, 1920, ''),
  },
  ambientSound: { src: '/media/ambientSound.mp3', usage: 'The sound switch (AmbientSound): a 40 s loop, off until the visitor turns it on' },
  tracks: {
    windArchive: '/media/tracks/wind-archive.mp3',
    machineHymns: '/media/tracks/machine-hymns.mp3',
    rainCaspian: '/media/tracks/rain-caspian.mp3',
    roomTone: '/media/tracks/room-tone.mp3',
    nightShift: '/media/tracks/night-shift.mp3',
    saltFlats: '/media/tracks/salt-flats.mp3',
  },
} as const

export type AssetKey = keyof typeof assets
