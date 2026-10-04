# Build log — Sela Mor

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).
Example #15 of docs/plan-for-fit.md §11: minimal / monochrome-minimal, kinetic type first screen, immersive, personal brand.

## 1. Recipe (2026-10-04)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `setBehaviour`, `toggleSitePiece`, `addSection`,
`removeSection`, `togglePiece`, `setPartHero`, `renamePage`, `removePage`, `addPage`, `setPagePurpose`), the same calls the
kit UI makes, then loaded into `/kit` and shown to the user. Approved by the user ("gettik"), with one change: the film
band scroll-based, not a loop — so the band shows Scroll-controlled video and the movement rose to Immersive (the only
level that hero allows).
- Kind of site: Personal brand · name "Sela Mor" · about "Sound artist and composer from Baku: field recordings of wind,
  water and machines, turned into music for rooms, films and long nights." · goal: contact
- Look: Monochrome Minimal · colours Black Box · lettering Data Sheet · shape Hairline (the look's own) · first screen:
  Words in motion · movement: Immersive
- Big idea: Chapters in giant words → Proof, one at a time (Home — Featured Work), Chapters that open with a giant word
  (Listen — Intro)
- Menu: Split pill · footer: Signature columns
- Behaviour: links — Rolling links; main button — Magnetic button; between pages — Soft fade; whole site — Sound, with a
  mute; headlines — none
- Pages: Home (hero → featured work with Photos follow the cursor → film/image part showing Scroll-controlled video →
  about → schedule → clients → newsletter), Works (featured work → case study → gallery → clients), Listen (custom: intro →
  closing CTA; its brief: "Let people hear the work: six tracks from her records and installations, each with a player,
  its length, where it was recorded and what it was made for; one plays at a time."), Live (custom: schedule →
  newsletter; its brief: "Where to hear her next: upcoming performances and installations with dates, places and
  tickets, then the last season's shows."), About (about → press → closing CTA), Contact (closing CTA)
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install`).
`next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps the recipe's `build/` folder;
the create-next-app placeholder SVGs in `public/` were removed. Then `npm install` and, as the package README says,
`npm i motion`.

Kit fix before the export: a scroll-scrubbed film band mid-page (on a site whose first screen is not a film) got neither
the scrub-ready encode in `scripts/prepare-video.sh` nor a film brief that says "one continuous shot, 15–30 s". Fixed in
OpusKit (`video.ts` makes the scrub encode for a scroll band too; the band's film row says what a scroll film needs; a
check in `scripts/check.ts`).

## 3. Media

16 photos from Pexels, picked by Claude (the Unsplash connector needed a new sign-in; sources and the brand check in
`media-src/SOURCES.md`). Originals in `media-src/`; resized to at most 2400 px on the long side (JPEG q82) into
`public/media/`; `portrait.jpg` had a small headphone brand mark painted over in the block's own tone
(`media-src/retouch.py`).

Film: the user's pick (Pexels 6274580, 3840×2160, 10.2 s, one continuous shot of a trio in a smoky room, the camera
circling slowly), kept as `media-src/film-original.mp4`; turned black and white for the monochrome look (`hue=s=0`, CRF 16)
into `media-src/film.mp4`, then the package's own `bash scripts/prepare-video.sh media-src/film.mp4`: `heroVideo.mp4`
1920×1080 3.7 MB, `scrubReadyEncode.mp4` 4.9 MB (a keyframe every 6 frames), `mobileVideoEncode.mp4` 1080×1920 2.7 MB,
posters. Shorter than the 15–30 s the brief asks for a scroll film; it still scrubs, just over less footage.

Sound: picked by Claude at the user's request ("Səsi özün seç"): "Drone Ambient" by atlasaudio on Pixabay, chosen from
four by its loudness range and spectrogram (no beat in the first ~50 s). Seconds 6–46 with the last 4 s crossfaded into
seconds 2–6 make a seamless 40 s loop, encoded at 96 kbps to `public/media/ambientSound.mp3` (470 KB), the path the
recipe uses.

Tracks for Listen: six more Pixabay tracks picked by Claude, a 75 s excerpt of each in `public/media/tracks/`
(sources in `media-src/SOURCES.md`).

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-04)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context), as for #11 and #12. It was
given only: "work inside `examples/sela-mor/` as the project root, never edit files outside it; read its CLAUDE.md and
AGENTS.md first; port 3001 is taken, use port 3008 for its dev server; never remove or change the `turbopack.root` line in
next.config.ts (`output: 'export'` and `images: { unoptimized: true }` may be added)" — then the prompt below, word for
word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

The film is already prepared (I ran scripts/prepare-video.sh on a black-and-white version): public/media/scrubReadyEncode.mp4 for scrolling on desktop, heroVideo.mp4, mobileVideoEncode.mp4 for phones, posterImage.jpg and posterMobile.jpg. It is the film band on Home after the works: a live set in a dark room, played forwards and back by the scroll.

The sound is public/media/ambientSound.mp3 — a 40-second loop of one of my drones. It stays off until someone turns it on.

My photos are in public/media/ (where each one comes from is in media-src/SOURCES.md):
- portrait.jpg — me, Sela Mor. For About and anywhere I appear.
- work-wind.jpg, work-machine.jpg, work-rain.jpg, work-room.jpg, work-live.jpg — one image for each of five works: "Wind Archive" (a record made from a year of wind on the Absheron coast), "Machine Hymns" (an album built from the lathes of an old Baku factory), "Rain, Caspian" (a piece for a planetarium), "Room Tone" (an installation for an empty bathhouse) and "Night Shift" (my live set). Invent years, labels and venues that fit.
- stage.jpg — the bathhouse installation, for the Works page's case study of "Room Tone", with work-room.jpg.
- field-recording.jpg — recording on the dunes with my sound recordist.
- gallery-1.jpg to gallery-8.jpg — grass and wind, rain and sea, machines, stage light. The Works gallery.

The first screen is just my name, huge, breathing: the letters widen and narrow slowly like a breath (Mona Sans has a width axis), and when the sound is on they follow it. In the works list, moving the pointer over a work leaves a trail of photos.

Listen: six tracks, already in public/media/tracks/ — wind-archive.mp3, machine-hymns.mp3, rain-caspian.mp3, room-tone.mp3, night-shift.mp3 (one from each work above) and salt-flats.mp3 (a sixth, unreleased). Each gets a play button, its length, where it was recorded and what it was made for. Only one plays at a time, and playing a track turns the site's own sound off.

Live: upcoming dates for the next months and last season's shows — invent venues in Baku, Tbilisi, Istanbul and Berlin that sound real.

I don't have a logo yet — make a simple one for Sela Mor.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

Result: every page built from the ready sections and kit pieces (Home, Works, Listen, Live, About, Contact, a 404);
`next build` with `output: 'export'` passes, all routes static. Its own additions: her name breathing on Mona Sans's width
axis (one breath every 7 s; with the sound on it follows the loop's loudness, measured into `src/config/sound-envelope.ts`),
the five works held still one at a time with a photo trail per work, the film band scrubbed by scroll on desktop and
phones, a one-player Listen page (playing a track turns the site's sound off and back), Live dates, giant chapter words on
every page, a white footer ending on the name, and a circle-and-wave logo as the favicon. Forms open the visitor's email
app. It reshaped ready sections within the tokens and fixed two contrast states (the menu pill, the closing button); it
changed no kit piece. It listed two lint errors inside kit pieces (AmbientSound, PageFade).

Reviewed by Claude on the dev server at 1440 px and 390 px (Playwright): no console errors, no 4xx, no horizontal
overflow on any page; a track plays on Listen. No fix round.

Kit fixes from this build (in OpusKit, not here): AmbientSound and PageFade no longer trip React's
`set-state-in-effect` lint (PageFade adjusts its state while rendering when the path changes; AmbientSound's restore of a
saved choice after hydration is marked as intended). `npm run pieces`, `npm run check` ✓.

## 5. On OpusKit (2026-10-04)

Registered in `src/data/examples.ts` (title and summary from the site's own `<title>` and meta description; choices with
the kit's exact option names; the hero still is the film's poster). `public/examples/sela-mor` is a symlink to this
project's `public/`; the card is a 1440×900 screenshot of the live first screen. `npm run examples` wrote its spec and
`public/downloads/sela-mor.zip` (sound and tracks left out like videos); the live export is in `public/live/sela-mor/`
(code only, media paths pointed at `/examples/sela-mor/media/`). Checked in a browser at 1440 px and 390 px: home, scroll
(the scrub encode plays at 1440, the phone encode at 390), then the menu to Listen and a track plays — no failed
requests (only aborted prefetches). `npm run check` ✓. Clips: waiting for the user's recordings.

## 6. Kit growth (2026-10-04)

Asked the user after the build; they agreed to the one candidate. Added to OpusKit, adapted from this site's player
(React only, tokens only): `ListenSection` (tracks with one shared player, time and progress on the playing row; starting
a track presses the AmbientSound switch off) and a Listen page type. This site keeps its own hand-built player.
