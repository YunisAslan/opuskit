# Build log — Halden

How this site was made, step by step (see docs/plan-examples.md §3). Example #20: a wood-fired sauna and cold-sea
bathhouse on a northern coast — health & wellness · Dark Cinematic · immersive. Made the Library + Build way; the
film on its first screen is the user's.

## 1. Recipe (2026-10-07)

Made through the Library flow in the user's browser:
- Library → **Or start blank** → Health & wellness.
- Brand — name "Halden"; one sentence "A wood-fired sauna and cold-sea bathhouse on a northern coast: heat, salt
  water and the long quiet in between."; Look: **Dark Cinematic**; Colours: **Charcoal Signal** (charcoal ground, an
  ember-red accent — the stove's glow); Lettering: **Opening Credits** (Imbue with Hanken Grotesk).
- Pages (Claude) — Home: first screen changed to **Film on the first screen** (scroll-controlled), Team removed,
  Gallery added after How It Works: Film → Services → How It Works → Gallery → Testimonials → Pricing → Location →
  Reservation. Practitioners removed; "Treatments" renamed **The baths**, "Book an appointment" **Visit**; FAQ kept.
- Then the user, in Pages: Testimonials set to the **Wall** design; **Sign In** and **Sign Up** pages added (no menu
  or footer on them); effects on every page: **Smooth scroll** and **Scroll progress**.
- Next: Recipe → saved (`/result/8cbf22c9`). The user: "son nəticəyə uyğun təcrid olunmuş şəkildə işə başla".
- The exact spec: `opuskit.json`

## 2. Build Package

`scripts/build-package.ts` into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router,
src/, `--skip-install`, `--disable-git`), outside the OpusKit repository. `next.config.ts` got the `turbopack.root` pin
before the first install; `.gitignore` keeps `build/`; the placeholder SVGs were removed. Then `npm install` and the
package's `npm i lenis motion`.

## 3. Media

None yet: the film is the user's (shot list sent 2026-10-07); photos by Claude after the build. Built with temporary
pictures and a temporary poster in place of the film (Prompt 1); the media replace them later, file for file.

## 4. Prompts to Claude Code

### Prompt 1 (2026-10-07)

Fully isolated, like Maison Vey: a separate Claude Code session (`claude -p`, Claude Opus 5.5) started inside the
project folder, outside the OpusKit repository, with only the project's own settings (`--setting-sources
project,local`). The prompt, word for word (it now asks for placeholders that stand out from the page — Maison Vey's
were oxblood on oxblood and could not be seen):

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My film and photos are not ready yet. Until they are, every picture is a temporary one: make a plain placeholder image for each asset key in src/config/assets.ts (and for each photo the shot list in recipe/media.md asks for), in the exact ratio and size the shot list gives, with the key written clearly in a corner, saved in public/media/ under the name the asset layer expects. Make each placeholder clearly visible against the page's own background — a lighter or contrasting tone, never one that disappears into it. For the film on the first screen, build the whole scroll-controlled film part now, and until my film arrives let it show a temporary poster still of the same size; when the film arrives I will run scripts/prepare-video.sh on it and drop the result in under the name the asset layer expects, with no code change. Mark everything temporary in assets/manifest.json. When my media arrives I will only replace those files.

Rules for this session: work only inside this folder, never read or edit anything outside it. Ports 3000, 3001, 3017 and 3018 are taken: use port 3019 for the dev server. Never remove or change the turbopack.root line in next.config.ts.
```

Prompt 1 finished (2026-10-07): Home, The baths, Visit, FAQ, Sign in, Sign up and a 404; the scroll-controlled film
part tested with a test clip, its four scenes guessed from the shot list (`src/config/scenes.ts`); 23 light-grey
placeholders by the asset layer's sizes; a booking form that opens the visitor's mail app; Sign in / Sign up check
their fields and say accounts are not open yet; a drawn logo (a low sun over a sea line); invented facts marked ⚑ in
`src/content/site.ts`. Its own checks: production build; every page at 1440 and 390; Lighthouse slow-4G load 3.0–4.1 s
against the recipe's 2.5 s.

## 3b. Media in (2026-10-07)

- **Film** (the user's): `media-src/hero-original.mp4`, 3840×2160, 25 s — a drone over a sea of fog at first light,
  sinking into the fog at the end. Encoded by the package's own `scripts/prepare-video.sh --no-upscale` into
  `heroVideo.mp4`, `scrubReadyEncode.mp4`, `mobileVideoEncode.mp4` and the two posters (1920×1080, phone 1080×1920).
- **Photos**: 21 found and picked by Claude through the Unsplash connector, one shared cool, dark grade, each cropped
  to its asset key's exact size and saved over the placeholder of the same name; sources in `media-src/SOURCES.md`.

### Prompt 2 (2026-10-07)

The same isolated session, resumed (`claude -p --resume`, same flags):

```
My film and photos are in. I ran scripts/prepare-video.sh on the film, so heroVideo.mp4, scrubReadyEncode.mp4, mobileVideoEncode.mp4, posterImage.jpg and posterMobile.jpg in public/media are the real ones now, and all the photos in public/media are real too (media-src/SOURCES.md says what each one shows). Nothing is temporary any more: mark everything as real in assets/manifest.json and in the asset layer, so the "temporary" tags go away.

The film is not the one the scene map guessed. It is 25 seconds from a drone, one continuous move: first light over a sea of fog with dark wooded ridges coming through it (0–12 s), a single dark ridge in front with the sun behind (12–18 s), then the camera sinks into the fog until the whole frame is soft white-grey (18–25 s). Watch it, rewrite the scenes in src/config/scenes.ts so each message belongs to what is on screen at that moment, and make the end of the film ease into the dark page rather than cut from white to charcoal.
```

Prompt 2 finished: three scenes instead of four, each on what the film shows (first light over the fog with the
opening line and the booking button; the dark ridge — "Heat"; sinking into the fog — "The long quiet"), and the end
of the film fades into the dark page; every media file marked real, alt texts rewritten from the photos; a phone bug
that hid one headline fixed. Production build clean.

## 5. Review (2026-10-07)

Production build clean (8 routes). Every page at 1440 and 390 in Chromium: no console errors, no failed requests
(only the 404 page's own 404), no sideways scroll; the film scrubs with scroll and hands over to the dark page.

## 6. Kind of site re-filed (2026-10-07)

Built as "Health & wellness" (purpose `clinic`), whose defaults were a dental practice's. After the engine review
(`docs/review-engine-2026-10-07.md`) the kinds were split: `clinic` is now "Clinic & therapy", and a new "Spa & bathhouse"
(`spa`) holds sites like this one. `opuskit.json` was moved to `spa` (with its menu, Classic bar, pinned, since spas default to another) so the Library
files it right; the site itself is unchanged.
