# Build log — Kür Delta Watch

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).
Example #12 of docs/plan-for-fit.md §11: bold / neo-brutalist, kinetic type first screen, lively, nonprofit.

## 1. Recipe (2026-10-03)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `setBehaviour`, `addSection`, `removeSection`,
`togglePiece`, `setPartHero`, `renamePage`, `addPage`, `setPagePurpose`, `movePage`), the same calls the kit UI makes, then
loaded into `/kit` and shown to the user. Approved by the user ("başla").
- Kind of site: Nonprofit · name "Kür Delta Watch" · about "A volunteer river watch on the lower Kür: we pull rubbish out
  of the river, test the water every month and publish what we find." · goal: Donate
- Look: Neo-Brutalist · colours Hazard Yellow · lettering Workshop Manual · shape Bold outline (the look's own) · first
  screen: Words in motion · movement: Dynamic
- Big idea: Loud covers, quiet reading → Chapters that open with a giant word (Home — Manifesto), Photos revealed like a
  curtain (Field notes — Gallery)
- Menu: Menu with cards · footer: Big name
- Behaviour: links — Filling underline; headlines, main button, between pages, whole site — none
- Pages: Home (hero with Departure board → stats → film/image part showing Ambient video → manifesto → timeline →
  services → CTA band → journal → newsletter), The river (about → editorial story → team), What we do (services →
  process → closing CTA), Field notes (testimonials → editorial story → gallery → closing CTA), Donate (a custom page:
  pricing → trust → FAQ; its brief: "Turn a visitor into a donor: give once or monthly, preset amounts that each say what
  they pay for (a sack of rubbish out, a month of water tests, a boat day), how the money is spent, and a short donation
  form."), Contact (closing CTA → location)
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install`).
`next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps the recipe's `build/` folder;
the create-next-app placeholder SVGs in `public/` were removed. Then `npm install` and, as the package README says,
`npm i motion`.

The first export showed a kit bug: the film band mid-page said "it needs its own video", but the package neither listed
that film in `recipe/media.md` / `assets/manifest.json` nor shipped `scripts/prepare-video.sh` (the first screen has no
film). Fixed in OpusKit's engine (`buildAssets`: a band showing a video asks for its own film and poster; a check in
`scripts/check.ts`) and the package was exported again.

A second kit bug: the look's seed recipe is a shop (Neo-Brutalist Commerce), and its own voice reached this charity's
`recipe/design.md` and CLAUDE.md ("a shopkeeper", "SKU, price, stock", "checkout must be boringly clear"). Fixed in the
engine: a seed's personality, principles, do/avoid, tone and "why" apply only to its own kind of site; other kinds get
the look's purpose-neutral words (a check for every seed in `scripts/check.ts`). Exported a third time. Left as is: the
seed's references (Awwwards e-commerce and colourful sites) and the lettering's "prices, SKUs, tags" label use.

## 3. Media

19 photos from Pexels, picked by Claude (the Unsplash connector needed a new sign-in; sources and the brand check in
`media-src/SOURCES.md`). Originals in `media-src/`; resized to at most 2400 px on the long side (JPEG q82) into
`public/media/` (water-test cropped to leave out a branded backpack).

Film: the user's pick ("wetland morning mist", 3840×2160, 30.8 s, one continuous dawn drone shot over a misty marsh
river), kept as `media-src/river-original.mp4`; seconds 4–16 cut to `media-src/river.mp4` (the recipe asks for an 8–15 s
loop), then the package's own `bash scripts/prepare-video.sh media-src/river.mp4`: `heroVideo.mp4` 1920×1080 5.3 MB
(CRF 22), `mobileVideoEncode.mp4` 1080×1920 2.5 MB (CRF 32), `posterImage.jpg`, `posterMobile.jpg`.

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-03)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context), as for #11. It was given only:
"work inside `examples/kur-delta-watch/` as the project root, never edit files outside it; read its CLAUDE.md and
AGENTS.md first; port 3001 is taken, use port 3007 for its dev server; never remove or change the `turbopack.root` line
in next.config.ts (`output: 'export'` and `images: { unoptimized: true }` may be added)" — then the prompt below, word
for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

The river film is already prepared (I ran scripts/prepare-video.sh): public/media/heroVideo.mp4 (desktop, 1920×1080), mobileVideoEncode.mp4 (phones, 1080×1920), posterImage.jpg and posterMobile.jpg. It is the film band on Home, right after the numbers — the quiet half of the page: the full width, no big text over it, at most one short line.

My photos are in public/media/ (where each one comes from is in media-src/SOURCES.md):
- cleanup-1.jpg to cleanup-5.jpg, volunteer-day.jpg, glove.jpg — our cleanup days on the banks and in the reeds.
- water-test.jpg — the monthly water test.
- delta-1.jpg, delta-2.jpg — the delta from above.
- pelicans.jpg, heron-1.jpg, heron-2.jpg — the birds that came back.
- boat-1.jpg, boat-2.jpg, boat-3.jpg — boat days on the channels.
- team-1.jpg, team-2.jpg, team-3.jpg — three of the people who run the watch (volunteer-day.jpg is a fourth).
Use them where they fit: What we do, Field notes, The river, the journal and the gallery.

The first screen is loud: our biggest number turning over like a departure board — 2,140 tonnes of rubbish out of the river so far — huge on the yellow, with one plain line under it. Then the other numbers, then the hard cut to the quiet film.

The timeline tells the river's story, from when the delta was full of birds to the dry years and the rubbish, to the day the watch started and what has come back since. Invent dates and facts that fit — plausible, not dramatic.

Donate: give once or monthly, preset amounts that each say what they pay for (a sack of rubbish out, a month of water tests, a boat day), where the money goes, and a short form. It's a static site, so the form can't take payments — make it collect the pledge and say we'll send the payment link by email.

Invent the people's names, the numbers, the journal posts and the quotes — real-sounding, made up. We're in Neftchala, where the Kür meets the Caspian.

I don't have a logo yet — make a simple one for Kür Delta Watch.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

Result: every page built from the ready sections and kit pieces (Home, The river, What we do, Field notes, Donate,
Contact, three journal posts, a 404); `next build` with `output: 'export'` passes, all routes static. Its own additions:
the first screen's 2,140 on the kit's SplitFlap with the headline drifting apart on scroll, the film band (picks the
desktop or phone encode, loads near the viewport, a pause button, poster only for reduced motion / Save-Data), giant
cover words on every page, a Donate page with a once/monthly switch, three amounts that say what they pay for, a pledge
form that confirms on screen ("we'll email the payment link"), a where-the-money-goes breakdown and six FAQs, a contact
form, and a logo (a yellow channel splitting in three) as the favicon. Forms post to `NEXT_PUBLIC_FORM_ENDPOINT` when set.
It reshaped ready sections within the tokens and changed three shipped pieces: UnderlineFill went through next/link
(it rendered a bare `<a>`), SplitFlap shows the real number in the HTML first, the Footer wordmark fits one line.
Known gaps it listed: forms store nothing without an endpoint, photos served at 2400 px, a lint error in SplitFlap.

Reviewed by Claude on the dev server at 1440 px and 390 px (Playwright): no console errors, no 4xx, no horizontal
overflow on any page; the departure board turns over to 2,140 in the first seconds; the film band plays the right
encode on each width. No fix round.

Kit fixes from this build (in OpusKit, not here): UnderlineFill and SwapButton rendered a bare `<a>`/`<motion.a>`, so
in-site links reloaded the page and ignored basePath — both now take the site's `link` component like the other link
pieces, and `scripts/check.ts` now also catches `<motion.a href>`; SplitFlap no longer sets state synchronously in an
effect (the lint error). `npm run pieces`, `npm run check` ✓.

## 5. On OpusKit (2026-10-04)

Registered in `src/data/examples.ts` (title and summary from the site's own `<title>` and meta description; choices with
the kit's exact option names; the hero still is the film's poster). `public/examples/kur-delta-watch` is a symlink to
this project's `public/`; the card is a 1440×900 screenshot of the live first screen after the board lands.
`npm run examples` wrote its spec and `public/downloads/kur-delta-watch.zip`; the live export is in
`public/live/kur-delta-watch/` (code only, media paths pointed at `/examples/kur-delta-watch/media/`). Checked in a
browser at 1440 px and 390 px: home, scroll (the film plays: desktop encode at 1440, phone encode at 390), then the card
menu to Field notes, renders with no failed requests and no broken images (only aborted prefetches). `npm run check` ✓.
Clips: waiting for the user's recordings.

## 6. Kit growth (2026-10-04)

Asked the user after the build; they agreed to the one candidate: a Donate section. Added to OpusKit, written fresh
for any cause (React only, tokens only): `DonateSection` (gifts that say what they pay for, the pledge form as the
project's own shadcn/ui slot, where the money goes), a Donate page type, and a Donate page in the nonprofit defaults.
This site keeps its own hand-built Donate page (built before the section existed).
