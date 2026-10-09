# Build log — Kelp Line

How this site was made, step by step (see docs/plan-examples.md §3 and §5b). Example #23: volunteers replanting kelp
forests on a cold northern coast — Nonprofit / cause · Coastal Calm · **subtle** · photography. Made through the flow
Library → You → Direction → Recipe by the night run of 2026-10-09 (`docs/NIGHT-RUN.md`), unattended. Its engine test:
**Donate** as the main action (form, amounts, what each buys), **numbers** that change (stats, a running count —
tabular figures), events with dates, and the **subtle** parallax dose (one picture on the whole site).

**The recipe has not been approved yet** — there is no approval at night; the pull request is the approval. Open it in
the studio from the link in §1.

## 1. Recipe (2026-10-09)

Made by Claude in a real browser (headless Chromium) with OpusKit's own screens, as a user would:
- **Library** — taken from three sites, signature parts only (decision 52): from **Kür Delta Watch** its Timeline (the
  coast's story, year by year) and Editorial Story; from **Lowfield Nights** its Schedule (dive days and beach days
  with dates); from **Velmira** its Gallery and its one effect, **Tap to open large** (a subtle site takes no bigger
  effect). Then **Build my site**.
- **You** — name "Kelp Line"; one sentence "Volunteers replanting kelp forests on a cold northern coast: dives, beach
  days and a count of every plant in the water."; What are you making: **Words or a cause** → Nonprofit / cause (read
  from the sentence, right first time). The main action read from it: **donate**.
- **Direction (Make it yours)** — Look: **Coastal Calm**. Colours: **Bottle Green** (kelp's own colour as the whole
  ground, pale sea-foam type, a soft pink signal — previewed on the brand poster against **Wet Concrete**, a cold grey
  sea with a magenta accent, and **Studio Aqua**: the dark green lets the underwater photos glow and keeps the site
  out of the cream-and-blue "coastal" default). Lettering: **Letterpress Modern** (Hedvig Letters Serif + Sans —
  crisp serif headlines as the look asks, and a sans with plain figures for counts and amounts; previewed against
  **Quiet Page** (Literata), which read as a book, and **Private Collection**). Screens in `media-src/flow/`.
- Pages came from the kind of site: Home (Hero, Timeline, Stats, Services, Editorial Story, CTA band, Journal,
  Newsletter) · Our mission (About, Editorial Story, Team, Stats) · Programs (Services, Process, Stats, CTA band) ·
  Stories (Testimonials, Editorial Story, Gallery) · Donate (Donate, Trust, FAQ) · Contact (Schedule, Contact / CTA,
  Location). Tap to open large sits on Home's Editorial Story.
- **Next: Recipe** → saved. The exact spec, with what was taken (`taken`): `opuskit.json`. To open it in the studio:
  `/studio/open?recipe=…` (the full link is in `media-src/flow/link.txt`).

## Engine lessons

1. **Fixed after the build:** a story told on several pages had one picture. Editorial Story sat on Home, Our mission
   and Stories, and the shot list gave the three one file (`editorialStory`): the same photo three times, under three
   different stories. A story part (Editorial Story, Case Study, About) on more than one page now gets one picture per
   page (`homeEditorialStory`, `ourMissionEditorialStory`…; `PER_PAGE_SHOTS` in `engine.ts`). The build got the same
   through fix round 1. check.ts.
2. **Fixed after the build:** the UI table in `recipe/ui.md` listed the Donate page twice ("Donate, Donate — Donate"):
   a part named like its page is now listed as the page. check.ts (every place once).
3. **Fixed after the build:** the builder drew the favicon as a generated route (`app/icon.tsx`, `ImageResponse`) that
   fetches the serif from Google Fonts at build time. It cannot be exported statically without `force-static`, its
   link loses the `basePath`, and the build fails without a network. The logo row now says: the favicon is a file
   (`src/app/icon.svg`, the letter as a path), never a generated route. check.ts. (For this export the route was made
   static for the export build only and its link patched, like the media links.)
4. **Open (judgement):** a taken Schedule (dive days, beach days) went to Contact, because its job, "help people
   visit", is Location's. The builder made it "A week on the coast" above "Come down to the water", and it reads well;
   but a cause's events may belong on Programs. Left for the user.
5. **Seen, no fix:** the kind of site repeats parts across pages (Services on Home and Programs; Stats on Home, Our
   mission and Programs). The builder gave each its own content (the count, the water we work in, the plant's year),
   so the copy deck held; nothing doubled.
6. **Process:** in the cloud, `images.unsplash.com` is blocked by the network policy; only the connector's 400px
   previews download. The site was built with temporary pictures, the 21 photos are picked and checked from the
   previews, and `media-src/fetch.sh` downloads and crops the originals on a machine with a network
   (`docs/NIGHT-RUN.md` §4 now says so).
7. **Process:** `claude -p` in the cloud reports the parent session's id; the fix round was resumed with `--continue`
   from the project folder instead of `--resume <id>`. Its reported cost includes the resumed context.

The engine test, as built: **Donate** is the main action everywhere (the menu's one button, the hero's first, a gift
form with once / monthly, four amounts each saying what it buys, Gift Aid, a live sentence "£25 every month puts about
1,200 plants in the water in a year", the spending split, one line on how payment happens); **numbers** — the running
count of plants in the hero card, the stats bands, the footer and the postcard stamp; **events with dates** — "A week
on the coast" and the CTA bands ("Beach days start again on Sunday 2 November"); the **subtle** dose — exactly one
picture drifts, the first full-width photo on Stories.

## 2. Build Package

`scripts/build-package.ts` into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router,
src/, `--skip-install`, `--disable-git`) at `~/projects/kelp-line`, outside the OpusKit repository. `next.config.ts` got
the `turbopack.root` pin before the first install; `.gitignore` keeps `build/`; the placeholder SVGs were removed. Then
`npm install` and the package's `npm i motion` (Tap to open large).

## 3. Prompts to Claude Code

Fully isolated: a separate Claude Code session (`claude -p`, Claude Opus 5.5) started inside the project folder, outside
the OpusKit repository, with only the project's own settings (`--setting-sources project,local`),
`--permission-mode acceptEdits` and Bash/Read/Write/Edit/Glob/Grep allowed.

### Prompt 1 (2026-10-09)

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are not ready yet. Until they are, every picture is a temporary one: make a plain placeholder image for each asset key in src/config/assets.ts (and for each photo the shot list in recipe/media.md asks for), in the exact ratio and size the shot list gives, with the key written clearly in a corner, saved in public/media/ under the name the asset layer expects. Make each placeholder clearly visible against the page's own background — a lighter or contrasting tone, never one that disappears into it. Mark them all temporary in assets/manifest.json. When my photos arrive I will only replace those files.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3022 for the dev server. Never remove or change the turbopack.root line in next.config.ts. Before your final reply stop any dev server you started — do not leave one running.
```

Finished in one run (~41 min, 194 turns, $13.78 reported): Home, Our mission, Programs, Stories, Donate, Contact and a
404; production build clean; checked by the builder at 1440, 1024, 768, 390 and 320 px; it stopped its dev server
before replying. Its moments: the hero's frosted card over the photo's corner — plants in the water, the next dive,
today's sea temperature, the time on the quay (Home); "The waterline" — a thin line draws across the page and the story
photo opens from it, up and down like sky and sea (Our mission); "The seeded line" — the line beside a plant's five
stages draws down as you scroll, each stage lighting as it is reached (Programs); "The dive log" — every photo captioned
like a logbook entry, date, depth, sea temperature (Stories); "What your gift plants" — the sentence under the form
changes in place with amount, frequency and Gift Aid (Donate); "Postcard to the boathouse" — the contact form as a
postcard with a stamp showing the count and a postmark with today's date (Contact). Details: the footer ends on the
count and the time in Skerra Bay, a serif "K" favicon, a 404 "Nothing planted on this stretch", copying the email
ticks, the phone menu marks the page with a pink dot, waiting buttons keep their width and end on a tick.
What it named: no payment or email service is connected (gifts and messages open the visitor's email app, and say
so; `paymentUrl` in `src/content/site.ts`); invented facts are marked `[P]` there with a checklist; shadcn's installer
site was blocked, so the controls are written in shadcn's style on the same Radix parts; no deviation from the recipe.

### Review (Claude, 2026-10-09)

Production build clean; every page at 1440 and 390 in headless Chromium: no horizontal overflow, no console errors, no
failed requests (the 404 page aside). Looked at as a stranger: one design throughout, the donate page the strongest.
One gap: the same story picture on three pages (Engine lessons 1).

### Prompt 2 — fix round 1 (2026-10-09)

```
One fix. The three Editorial Story parts (Home, Our mission, Stories) all show the same picture, editorialStory.jpg — each tells a different story, so each needs its own picture. Give them three asset keys and files: storyHome (Home: seedlings on a line, hands lifting a seeded line out of the water), storyMission (Our mission: the waterline — a wide view of the cold coast and the water over the reef) and storyStories (Stories: a Saturday on the north reef — divers in a small boat on a grey sea). Same ratio and size as now (3:4, 1800×2400), temporary placeholders like the others with the key written in the corner, marked temporary in assets/manifest.json; remove editorialStory.jpg once nothing uses it. Keep everything else as it is.

Run the production build, check the three pages at 1440 and 390, and before your final reply stop any dev server you started — do not leave one running.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3022 for the dev server. Never remove or change the turbopack.root line in next.config.ts.
```

Finished in one resumed run (`--continue`, 15 turns, ~2.4 min, $15.17 reported with the resumed context): three keys
`storyHome`, `storyMission`, `storyStories`, each a placeholder; the two alt texts that no longer matched rewritten;
`editorialStory.jpg` removed. It flagged one caption for the owner: under the Stories picture "Clipping a seeded line to
the reef at eight metres" describes a dive, not a boat — left for the photo round (below).

## 4. Media — waiting for the morning

21 photos picked through the Unsplash connector by the shot list (one per key the site uses; `mobileHeroCrop` is cut
from the hero), checked in the connector's 400px previews (`media-src/contact-sheet.jpg`) — one grade, cool northern
light; no logos seen (team-1's chest label falls outside its crop). Sources: `media-src/SOURCES.md`, `picks.json`.
The cloud could not download the originals (Engine lessons 6), so the site still shows the build's temporary pictures.

In the morning, on a machine with a network: `cd examples/kelp-line && bash media-src/fetch.sh` (downloads each original
into `media-src/`, crops and resizes into `public/media/`; needs ImageMagick), then send Prompt 3 in the same session
(`claude -p --continue` from a copy of the project outside the repository), then replace the card and poster
(`public/examples/kelp-line.jpg`, `public/media/poster.jpg`). The live export needs no rebuild (it reads the media).

Prompt 3 (not sent yet):

```
My photos are in public/media/ now, under the same names. Update src/config/assets.ts and assets/manifest.json: status 'have' for every photo, no Temporary badge, centre crops again, and alt text from what each real photo shows (media-src/picks.json → alt, by key). The Stories story picture shows a small boat with people in life jackets on a calm grey sea: change its caption to match, in the site's voice. The Our mission picture shows surf over a dark shore rock fringed with kelp: check its caption too.

Check every page with the photos at 1440 and 390, run the production build, and before your final reply stop any dev server you started — do not leave one running.

Rules for this session: work only inside this folder, never read or edit anything outside it. Port 3000 is taken: use port 3022 for the dev server. Never remove or change the turbopack.root line in next.config.ts.
```

## 5. Registration (2026-10-09)

Moved from `~/projects/kelp-line` into `examples/kelp-line/`. `opuskit.json` is the recipe as built (nothing to pin: the
engine's later changes are shot-list keys and package wording, not the spec). Registered in `src/data/examples.ts`
(title and summary from the site's own metadata); `public/examples/kelp-line` symlink; card
`public/examples/kelp-line.jpg` and the hero still `public/media/poster.jpg` (its first screen, 1440×900, with the
temporary pictures); `npm run examples`; live export at `/live/kelp-line` (media patched to `/examples/kelp-line/media/`;
the icon route made static for the export build only, its link patched to `/live/kelp-line/icon`), checked by a
click-through from the menu (every page renders, no broken images; only aborted link prefetches); `npm run check` ✓.
Clips wait for the user's screen recording, after the photos.
