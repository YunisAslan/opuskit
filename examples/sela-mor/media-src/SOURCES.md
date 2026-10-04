# Media sources — Sela Mor

Photos downloaded at original size on 2026-10-04, picked by Claude (docs/plan-for-fit.md §11, #15), all under the Pexels
License (the Unsplash connector needed a new sign-in). Originals here are untouched; retouches and crops are made when
resizing into `public/media/`.

Each was checked for readable brand names and logos. Left out for that reason: headphone portraits with a readable brand
script (12384785), portable recorders and mic covers with their maker's name (11824853, 11713445, 39934713), a speaker
with a printed brand (157534). `portrait.jpg` has a small headphone brand mark: it is painted over in the block's own tone
when resized, as Halvik's keycap was.

The film (scroll-scrubbed band on Home) is the user's pick; the sound was picked by Claude at the user's request (shot
lists in docs/plan-for-fit.md §7, #15).

| File | Status | Size | Source link | Author | Shows |
|---|---|---|---|---|---|
| film-original.mp4 | ✓ the user's pick | 3840×2160, 10.2 s, 30 fps, no sound | https://www.pexels.com/video/6274580/ (Pexels License; the author's name is behind a Cloudflare check here — to add) | — | A trio in a dark smoky room — guitar, bass, drums — under rows of white light, the camera circling slowly; one continuous shot. A small, blurred amp maker's name ("Laney") shows at the left edge for about a second near the start and again mid-shot. |
| film.mp4 | ✓ | 3840×2160, 10.2 s | film-original.mp4 turned black and white (`hue=s=0`, CRF 16), the file run through `scripts/prepare-video.sh` | — | The band's scroll film |
| sound-original.mp3 | ✓ picked by Claude (the user asked) | 4:00 | https://pixabay.com/music/ambient-drone-ambient-518685/ | atlasaudio (Pixabay Content License) | "Drone Ambient": a slow, steady drone; the first ~50 s have no pulse (later a soft beat comes in). Chosen over three others by loudness range (2.6 LU) and its spectrogram |
| sound.mp3 | ✓ | 0:40, 96 kbps | seconds 6–46 of sound-original.mp3 with its last 4 s crossfaded into seconds 2–6, so the end flows back into the start; copied to `public/media/ambientSound.mp3` | — | The site's sound loop |
| portrait.jpg | ✓ | 2730×4096 | https://www.pexels.com/photo/portrait-of-woman-in-black-and-white-18871563/ | Anna Lian Goldstein | A woman in a leather jacket holding studio headphones to one ear, black and white — Sela Mor (headphone mark retouched) |
| field-recording.jpg | ✓ | 5388×3550 | https://www.pexels.com/photo/a-man-holding-a-microphone-standing-on-a-sandy-hill-23657254/ | Nairod Reyes | A recordist with a boom microphone on a dune under a grey sky |
| work-wind.jpg | ✓ | 5825×3883 | https://www.pexels.com/photo/tall-grasses-on-grassland-in-black-and-white-18452327/ | Javid Hashimov | Tall grasses bent by the wind, black and white on dark |
| work-machine.jpg | ✓ | 6000×4000 | https://www.pexels.com/photo/grayscale-photo-of-a-lathe-machine-5846176/ | Tima Miroshnichenko | A lathe chuck spinning, grey and blurred |
| work-rain.jpg | ✓ | 2534×2351 | https://www.pexels.com/photo/close-up-photo-of-water-drop-9460333/ | Umair Bhutta | A drop hitting black water, rings of light |
| work-room.jpg | ✓ | 3781×2642 | https://www.pexels.com/photo/monochrome-shot-of-a-bass-speaker-6587321/ | Guillaume Meurice | A speaker cone close up, black and white, no markings |
| work-live.jpg | ✓ | 5472×3648 | https://www.pexels.com/photo/mystical-performer-on-stage-with-dramatic-lighting-32680082/ | Ernesto Vazquez | A performer in silhouette in smoke and hard white light |
| stage.jpg | ✓ | 4592×2584 | https://www.pexels.com/photo/back-view-shot-of-a-man-playing-piano-on-the-stage-12061300/ | Ник Коробов | A dark stage: a pianist from behind, empty chairs lit beside him |
| gallery-1.jpg | ✓ | 3840×5376 | https://www.pexels.com/photo/grayscale-photo-of-wheat-9249009/ | Benny Stæhr | Wheat against a white sky, black and white |
| gallery-2.jpg | ✓ | 6000×4000 | https://www.pexels.com/photo/crops-in-black-and-white-15457447/ | Atish Kumar Ravi | A field of grass combed by wind, grey |
| gallery-3.jpg | ✓ | 6240×4160 | https://www.pexels.com/photo/raindrops-forming-ripples-in-water-17631189/ | Feyza Yıldırım | Raindrops ringing on dark water |
| gallery-4.jpg | ✓ | 12492×8328 | https://www.pexels.com/photo/close-up-photo-of-a-wavy-water-9398213/ | Tim Mossholder | Night sea, small waves catching blue light |
| gallery-5.jpg | ✓ | 3386×5079 | https://www.pexels.com/photo/complex-industrial-machinery-with-cables-and-pipes-36311187/ | Peter Dyllong | Industrial machinery, pipes and cables, black and white |
| gallery-6.jpg | ✓ | 3451×5177 | https://www.pexels.com/photo/close-up-of-mechanical-gear-in-black-and-white-36747949/ | Peter Dyllong | A worn mechanical gear housing, black and white |
| gallery-7.jpg | ✓ | 6720×4480 | https://www.pexels.com/photo/line-up-spotlights-hanging-on-a-ceiling-12092991/ | Filipe Braggio | A row of stage lights in haze |
| gallery-8.jpg | ✓ | 2006×2507 | https://www.pexels.com/photo/smoke-over-man-in-darkness-21051450/ | Fer Flores | A figure in darkness raising a hand into a smoky beam |

Tracks for the Listen page, picked by Claude (Pixabay Content License): a 75 s excerpt of each (2 s fade in, 3 s out,
128 kbps) in `public/media/tracks/`; the full downloads in `media-src/tracks/*-original.mp3`.

| File | Source link | Author | Excerpt |
|---|---|---|---|
| tracks/wind-archive.mp3 | https://pixabay.com/music/ambient-drone-ambient-518685/ | atlasaudio | 1:00–2:15 |
| tracks/machine-hymns.mp3 | https://pixabay.com/music/ambient-ambient-background-soft-air-drift-575882/ | alex-morgan | 0:20–1:35 |
| tracks/rain-caspian.mp3 | https://pixabay.com/music/ambient-calm-ambient-dreamscape-529861/ | morgan-ambient | 0:30–1:45 |
| tracks/room-tone.mp3 | https://pixabay.com/music/ambient-dystopian-ambient-520165/ | leberch | 0:40–1:55 |
| tracks/night-shift.mp3 | https://pixabay.com/music/ambient-drone-ambient-561599/ | mirostar | 0:10–1:25 |
| tracks/salt-flats.mp3 | https://pixabay.com/music/ambient-epic-ambience-140110/ | haletski | 2:00–3:15 |
