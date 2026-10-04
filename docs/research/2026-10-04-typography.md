# Typography research — Awwwards sample vs. OpusKit's type library (2026-10-04)

Raw data: `docs/research/2026-10-04-typography-sites.json` (225 measured sites, computed styles per role).
Method: Playwright + headed Chrome at 1440×900. 1,248 unique live-site links collected from 26 Awwwards collections
(typography, best fonts, hand-made fonts, minimal, brutalism, e-commerce, product page, agency/freelance portfolios,
non-profit, storytelling, retro, dark mode, black-and-white, pastel, colour exploration, photography, about page, movie
landing, blog, clean, marquee, layout, texture, colour palettes) plus 206 from the four latest Sites of the Day pages.
360 visited (260 round-robin across the collections, 100 recent SOTD); **225 usable** (others dead, blocked or canvas-only).
For each: the computed family, weight, size, tracking, line-height, case, stretch and `font-variation-settings` of
h1, h2, the largest text in the first three screens ("display"), the first real paragraph, the first nav link and the
first small label, plus every loaded `FontFace`. Aggregates below use the **182** sites with a real display line (≥28px),
minus font-resource sites. "Recent" = 70 2026 Sites of the Day; "collections" = 112 older, curated picks.

Every proposed pairing was rendered as a specimen (headline, heading, paragraph, label) from the Google Fonts css2 API
before it went in this report; every `googleFamilies` string returns HTTP 200; every family, weight, width and italic
was checked against Next 16's `font-data.json`; the full library with the proposals passes the check.ts type rules
(simulated: no family in more than 2 pairings, no banned face, mono utility only in `data-sheet`, uppercase utility only in `gala-night`).

## 1. What award sites do with type

| Measure | All (182) | Recent SOTD (70) | Older collections (112) |
|---|---|---|---|
| Display is a sans / neo-grotesk | 66% | — | — |
| Display is a serif | 18% | 14% | 21% |
| Display is condensed | 12% | 16% | 10% |
| Display is script / mono | 2% / 2% | | |
| Display weight ≤ 400 | **59%** (≥ 700 only 19%) | | |
| Display uppercase | 29% | | |
| Display line-height < 1 | 33% | | |
| Display tracking < −0.01em | 36% (grotesks run −0.02 … −0.07em) | median −0.01em | median 0 |
| Display size, median / p75 | 88px / 132px; 31% ≥ 120px | 96px | 80px |
| Display ÷ body size, median (p25–p75) | **5.1×** (3.1–8.6×) | 6.7× | 4.8× |
| Body size, median | 16px | | |
| Label size, median | 12px (range 7.5–13.5) | | |
| Label uppercase | 37% | **46%** | 31% |
| Label in a monospace | 18% | **30%** | 11% |
| One family for the whole site | 41% (2 families 48%, 3+ 10%) | | |
| Serif display + sans body | 10% | | |
| Visible variable-axis use (wdth/slnt/custom) | 5% | | |

Most frequent faces across the 225: Inter 13, Playfair Display 8, PP Neue Montreal 10 (incl. "Neue Montreal"), Suisse Intl 7,
Aeonik 5, Geist 5, Geist Mono 5, Roboto Mono 4, Helvetica Now 4, ABC Diatype 4, Founders Grotesk 3, Söhne 3, Manrope 3.

### Pairing structures (in order of frequency)
1. **One neo-grotesk, scale does everything** (41% single-family). Söhne, Suisse, Neue Montreal, Diatype, Aeonik, Lausanne,
   Helvetica Now, Die Grotesk. Hero 90–360px at **weight 300–500**, tracking −0.02 to −0.07em, line-height 0.8–0.95;
   body 14–20px; labels 10–13px. Stripe.dev (Söhne 300, 144px, −0.07em), Selected Base (Söhne 500, 302px), Aspen Search
   (Suisse 450, 181px), Warm'n Fuzzy, K72 (Lausanne 300 caps), Sui (TWK Everett 400, −0.065em), Trevor Noah (Die Grotesk D
   700 at 361px), Coffee Tech (Inter 500, 216px, −0.07em).
2. **Grotesk + mono labels** — the 2026 award uniform: Geist/Suisse/Neue Montreal/Diatype + Geist Mono / Suisse Mono /
   Supply Mono / Fraktion Mono at 10–13px, uppercase. 30% of recent SOTD (Cominvi, Cerebrium, State of AI Design, Seasats,
   Wolverine, Sui, Bymonolog, Lusion Labs, Made with GSAP, Aspen Search).
3. **Serif display + grotesk text** (10%): PP Editorial New + Neue Montreal (Hilden Kaira), Juana + Editorial New (Normal is
   Boring), Teodor + GT America (Partizan), Freight Big Light Italic + Neue Montreal + Akkurat Mono (Hobro), Ogg (I Killed a
   Cactus), IvyOra 100 at 370px (Artistudyo), Reckless Neue + Roboto Mono (Colonia Zacamil), Signifier + Plex Mono (Mosby).
   The template version of this — Playfair Display + a geometric sans — appears 8 times and reads as the default.
4. **Condensed display + plain text** (12%): Thunder, Druk, FK Screamer, Heathergreen, Oswald, Bebas, Gooper Condensed,
   Freigeist Condensed, Akzidenz Condensed — about half in mixed case, not only caps posters.
5. **Script word + small extended/neutral sans** (luxury, hospitality): Era Residence (copperplate at 173px + Maison Neue
   Extended 8px caps), Pensatori Irrazionali (Ballet at 256px + Helvetica Now), LXL Creative, Koto's Seasoned (Luxurious Script accent).
6. **Wide/extended**: Monument Extended, Maison Neue Extended, Obviously, Druk Wide; Realevate sets Google Sans at 218px.
7. **Variable-axis art direction** (rare but memorable): Decathlon Yestalgia (Roboto Flex wdth 33→151), Displaay (CNTR, wdth),
   NN Swinton (slnt + wght 999), 2XA (wght animated), Haoqi (wdth 120).

### Label treatments
- Median label is **12px**, nav 14–16px; labels below 10px appear on a fifth of recent sites (Era 8px, Bymonolog 7.5px, Risk 7px).
- Uppercase labels are tracked **~0** in mono and +0.04 … +0.2em only in sans (Vacheron 0.2em, Era 0.32em, Kids Maple 0.15em).
- Sentence-case grotesk labels at 12–13px, tracked −0.01 to −0.03em, are the quieter alternative used by Stripe, Toggl,
  Antinomy, Revelatio, Hilden Kaira.
- Italic serif captions (our `printed-word`, `photocopy-zine`) appear on Depoluxe and Paul et Henriette — rare and therefore fresh.

### Feels current vs. dated
**Current:** regular/light weights at huge size; tight negative tracking on grotesks; line-height under 1; a 5–9× display:body
ratio; one family per site; mixed-case condensed; a single script word; wedge-serif or Juana/Teodor-style serifs used light;
real italics for whole phrases; width/optical-size axes; sentence-case labels.
**Ubiquitous (= award default, avoid repeating):** Inter, Neue Montreal/Suisse look-alikes with Geist Mono uppercase labels;
Playfair Display as "the serif".
**Dated:** wide-tracked light sans labels (Mulish/Montserrat 0.14–0.2em caps) for "elegant"; Playfair + Montserrat; Bebas
for everything; Orbitron/Exo/Audiowide "tech"; Cinzel/IM Fell "heritage"; Yeseva One + Nunito "boho"; handwriting for
paragraphs; Lato/Open Sans/Roboto/Source Sans as the only face (all from the older collections).

**For OpusKit's rules:** the check.ts caps on mono and uppercase utility labels are right — the data shows these are exactly
what makes a 2026 award site look like every other one. Keep them. What the library lacks is the other half of the award look:
**light, huge, tightly tracked type** — our grotesk pairings almost all sit at 700–900 (Zalando 800, Schibsted 800, Mona 800,
Hubot 800, Archivo 800, Franklin 900), while 59% of award displays are ≤ 400.

## 2. Commercial faces → closest free Google Fonts (next/font, Next 16)

| Commercial (seen on) | Closest free | Axes | Quality of match |
|---|---|---|---|
| Söhne, Suisse Intl, Neue Haas/Helvetica Now (Stripe, Aspen, Revelatio) | **Archivo** 300–400 | wdth 62–125, wght 100–900, ital | Good at display; slightly wider. Inter/Geist are closer but banned |
| PP Neue Montreal, ABC Diatype (Hilden Kaira, Wolverine) | Archivo, Public Sans, Schibsted Grotesk | Archivo wdth; others wght | Good; Neue Montreal's quirky "a"/"g" not matched |
| Aeonik, Google-Sans-like geometric grotesks (Toggl, Lusion, Realevate) | **Google Sans Flex** | opsz 6–144, wdth 25–151, wght 1–1000, slnt, ROND, GRAD | Very good, and the width range beats the originals |
| Lausanne, GT America, Founders Grotesk | Public Sans, Schibsted, Golos Text, Mozilla Text | wght (Golos 400–900) | Fair — humanist warmth there, not the exact proportions |
| Monument Extended, Maison Neue Extended | Zalando Sans 125%, Hubot 125%, Google Sans Flex 151% | wdth | Good; Michroma/Krona One for heavier wides |
| Druk, Thunder, FK Screamer (caps) | Bayon, League Gothic (wdth 75–100), Anton, Six Caps | | Good for caps; League Gothic is the cleanest |
| Gooper Condensed, Freigeist Condensed, Akzidenz Condensed (mixed case) | **Sofia Sans Extra Condensed / Condensed** | wght 1–1000, ital | Very good, full superfamily |
| Obviously, Champ, Elza 900 (black, squat) | **Boldonse**, Dela Gothic One, Bowlby One | | Good for short words |
| PP Editorial New, Canela, Freight Big | **Prata**, Bodoni Moda (opsz), Noto Serif Display | Bodoni opsz 6–96; Noto wdth | Prata very good (no italic); Instrument Serif/Playfair banned or overused |
| Juana, Teodor | **Ibarra Real Nova**, Gloock, Kalnia | Ibarra wght 400–700 + ital | Good — same flared, mannered serifs |
| Reckless Neue, Signifier, Tiempos | **Petrona**, Newsreader, Source Serif 4 | Petrona wght 100–900 + ital; Newsreader opsz | Good; Fraunces (closest Reckless) banned |
| Ogg, IvyOra light, Freight Big Light | **Labrada** 100–300, Cormorant Garamond 300 | wght + ital | Good at display; Labrada is crisper than Cormorant |
| Jannon / Garamond revivals (Slowness, Depoluxe) | EB Garamond, Cormorant Garamond, Castoro | | Very good |
| Cartier/Vacheron engraved caps | **Castoro Titling** + Castoro | | Very good |
| Copperplate scripts (sloop-script, Era) | **Ballet** (Pensatori uses it), Pinyon Script, Monsieur La Doulaise | Ballet opsz 16–72 | Very good |
| Supply/Fraktion/Akkurat/Söhne Mono | JetBrains Mono, Fragment Mono, IBM Plex Mono, Martian Mono, Sometype Mono, Chivo Mono | wght; Martian wdth | Good (Martian already in `data-sheet`) |
| FK Raster, Tronica, pixel/stencil grotesks | Tektur (wdth), Handjet, Doto, Bitcount, Pixelify Sans | | Fair — novelty-grade |

## 3. Audit of our pairings (`src/data/ingredients.ts` `typography`, 47)

Pairings that built examples use are marked ★ (aster-house quiet-page, night-shift control-room, sela-mor data-sheet,
kur-delta-watch workshop-manual, inkwell-moth cut-and-paste, lowfield-nights high-low, velmira kalnia-couture, saint-ashe
new-gothic, fennwood gallery-hours, hane private-collection, halvik wide-spec, sticky-weather stack, hexmint funnel,
brasshand poster-caps, slow-atlas newsroom). Built examples carry a snapshot; edits change future Build Packages only.

**Keep (current, well matched):** quiet-page★, ink-and-paper, soft-couture, printed-word, opening-credits, gala-night
(the one uppercase-utility pairing — right place for it), loud-and-clear, photocopy-zine, workshop-manual★, corner-bakery,
main-street, high-low★, control-room★, data-sheet★ (the one mono utility — keep it here), letterpress-modern, new-gothic★,
newsroom★, swiss-italic, bubble-pop, poster-warp, two-voice, gallery-hours★, two-scripts, funnel★, wide-spec★, diner-serif,
private-collection★, kalnia-couture★, poster-caps★, campus, stack★, moonlit-italic, cut-and-paste★ (fits scrapbook; keep).

**Tune:**
- *grid-discipline* — display 800 / −0.045em is the heavy end; fine, but `plain-giant` (below) now takes the light-huge slot.
  Leave as is so the two are clearly different.
- *dreamlight* — keep Italiana; swap Mulish → **Gantari** 300 body / 500 utility and drop the utility tracking from
  `0.14em` to `0.02em`. Wide-tracked light labels are the dated part.
- *loud-mix* — swap Outfit → **Savate** (2025, wght 200–900 + italics). Outfit is a first-pick AI/template face.
- *neon-drive* — keep Monoton; Audiowide → **Michroma** (heading + utility), Exo 2 → **Saira** (wdth 50–125) for body. Exo 2/Audiowide date it to 2013.
- *sketchbook* — keep Caveat Brush + Caveat; Patrick Hand body/utility → **Winky Sans** 400/500. Handwriting for paragraphs is the dated part.
- *eight-bit* — optional: Press Start 2P → **Jersey 10** for the display (less overused); keep Pixelify Sans.
- *soft-seventies* — Figtree is template-default-adjacent; consider **Inclusive Sans** for body/utility (it would then be in 2 pairings with `kind-words` — the cap; Golos Text is already at 2).
- *round-future* — Unbounded is the 2022 Web3 look; still right for y2k-chrome/synthwave. Keep, but don't add it elsewhere.
- *friendly-app* — Rethink Sans is fine; the closest of ours to the generic product-site look. Keep.

**Replace in place (keep the id, so directions, seeds and recipes still resolve):**
- *parlour* — Cinzel Decorative + Cinzel + IM Fell reads as costume. → **Castoro Titling + Castoro** (block below).
- *wanderer* — Yeseva One + Nunito Sans is the 2015 lifestyle-blog pairing. → **Sedan + Mozilla Text**.
- *terminal-city* — Orbitron + Share Tech Mono is stock sci-fi. → **Tektur + Sometype Mono** (mono stays in body; utility rule holds).
- *dream-logic* — Gilda stays; Manrope + 0.04em labels → **Mozilla Text**, sentence case.

**Gaps the library has (filled in §4):** light huge grotesk (pattern 1); an Editorial-New-class sharp serif; Juana/Teodor-class
mannered serif; Reckless-class soft serif; mixed-case condensed; a script accent; a truly wide light sans; a hairline serif for
film; a legible, warm sans for non-profits/clinics/courses; a variable-axis showcase; a black squat display for food/pop.

## 4. Proposed pairings (11 new + 4 in-place replacements)

All Google Fonts (OFL; Google Sans Flex confirmed OFL in google/fonts METADATA), all in Next 16's next/font list with the weights/axes used. Family use after adding them: Archivo, Public Sans, Golos Text, Zalando Sans, Schibsted Grotesk, Mozilla Text at 2 (the cap) — every other new face at 1. No pairing becomes a direction default (defaults untouched), so the ≤2-defaults rule is unaffected.

| id | Style | Faces | Cited sources (measured) | Fits looks (taxonomy directions) |
|---|---|---|---|---|
| `plain-giant` | One plain grotesk, set enormous and light | Archivo | stripe.dev, selectedbase.com, aspensearch.com, warmnfuzzy.tv, k72.ca, sui.io, coffee-tech.com, wolverineworldwide.com | swiss-modern, monochrome-minimal, architectural-minimal, typography-first, technical-minimal |
| `cut-glass` | Sharp wedge-serif headlines, plain American grotesk | Prata + Public Sans | hildenkaira.fi, normalisboring.es, neverland.agency, masaigon.space, forcanopy.com, pixelify.net | luxury-editorial, fashion-editorial, coastal-calm, art-editorial |
| `real-ink` | Spanish-royal serif with real italics, modern text | Ibarra Real Nova + Golos Text | normalisboring.es, partizan.com, slowness.com, lettersfromvenus.com, depoluxe.xyz | modern-heritage, art-editorial, luxury-editorial, cinematic-editorial |
| `tall-order` | Mixed-case condensed sans, one superfamily | Sofia Sans Extra Condensed + Sofia Sans Condensed + Sofia Sans | seasoned.koto.studio, quatrecentquatre.com, wcs.org, giveahand.ai, serotoninn.com, moooor.com | news-grid, raw-editorial, film-inspired, swiss-modern, neo-brutalist |
| `signature` | A copperplate word, a wide calm grotesk | Ballet + Zalando Sans | era-residence.com, pensatori-irrazionali.com, lxlcreative.co.uk, seasoned.koto.studio, sobha-privy-collection.com | luxury-editorial, warm-hospitality, ethereal, fashion-editorial, bohemian |
| `horizon` | One flexible sans, stretched wide for headlines | Google Sans Flex | realevate.agency, era-residence.com, likova.space, sstr.tech, cerebrium.ai | architectural-minimal, digital-futurism, bento-product, technical-minimal, y2k-chrome |
| `soft-wedge` | Light contemporary serif, plain sans for the rest | Petrona + Public Sans | coloniazacamil.com, mosbyfiles.com, partizan.com, verostudio.com, lettersfromvenus.com | organic-modern, scandinavian-minimal, coastal-calm, modern-heritage, soft-pastel |
| `projection` | Huge hairline serif, small grotesk captions | Labrada + Schibsted Grotesk | ikilledacactus.com, artistudyo.com, hobro.digital, houseofhoney.com, nouvellenoire.ch | dark-cinematic, cinematic-editorial, immersive-portfolio, art-editorial |
| `kind-words` | One accessible, friendly sans for everything | Inclusive Sans | radiatinghope.org, emergencemagazine.org, unicef.org.au, rspca.org.uk, bluemarinefoundation.com | soft-pastel, organic-modern, scandinavian-minimal, warm-hospitality |
| `dial` | Every axis of one variable grotesk, turned up | Roboto Flex | decathlonyestalgia.com, displaay.net, nn-swinton.world, 2xa.studio, haoqi.design | typography-first, art-direction, playful-pop, maximalism |
| `fat-chance` | Squat ultra-black display, clean Russian grotesk | Boldonse + Golos Text | aardvarkbookclub.com, flyingpapers.com, glitchandgrit.com, buckssauce.com, oakame.com | playful-pop, sticker-studio, maximalism, retro-seventies |
| `parlour` (replace) | Titling capitals, modern-classic book text | Castoro Titling + Castoro | cartier.com, vacheron-constantin.com, kitamura1923.com, izanami-official.com | victorian, modern-heritage, luxury-editorial |
| `wanderer` (replace) | Warm calligraphic serif, quiet humanist sans | Sedan + Mozilla Text | hleb-dom.ru, slowness.com, koraliving.com | bohemian, organic-modern, warm-hospitality, retro-seventies |
| `terminal-city` (replace) | Squared techno grotesk, terminal-mono text | Tektur + Sometype Mono | toyfight.co, lamalama.com, pxpush.com, labs.lusion.co, teletech.events | cyberpunk, digital-futurism |
| `dream-logic` (replace) | Refined display serif, calm humanist sans | Gilda Display + Mozilla Text | michaeltsirakis.com, masaigon.space | surrealism, ethereal, art-editorial |

Specimen notes from rendering: `signature` — Ballet's swashes reach ~0.2em past the left edge, give it inline padding and line-height 1.3; `fat-chance` — Boldonse's descenders run deep, keep line-height 1.2; `dial` — Roboto Flex below ~40% width at heavy weights turns to blobs, so the display base is 50%; `horizon` — the 151% light display is the most striking of the set; `cut-glass` — Prata has no italic, never let a component synthesize one.

### Ready to paste

`src/types/domain.ts` — add to `TypographyId`:

```ts
  | 'plain-giant' | 'cut-glass' | 'real-ink' | 'tall-order' | 'signature' | 'horizon' | 'soft-wedge' | 'projection' | 'kind-words' | 'dial' | 'fat-chance'
```

`src/data/ingredients.ts` — GF keys, then pairings (the last four replace the existing `parlour`, `wanderer`, `terminal-city`, `dream-logic` blocks; afterwards the unused GF keys `cinzelDecorative`, `cinzel`, `imFell`, `yeseva`, `nunitoSans`, `orbitron`, `shareTechMono`, `manrope` can go):

```ts
// GF additions (only keys not already in GF: archivo, zalando, schibsted, gilda exist)
  prata: 'Prata',
  publicSans: 'Public+Sans:ital,wght@0,100..900;1,100..900',
  ibarra: 'Ibarra+Real+Nova:ital,wght@0,400..700;1,400..700',
  golos: 'Golos+Text:wght@400..900',
  sofiaXCond: 'Sofia+Sans+Extra+Condensed:ital,wght@0,1..1000;1,1..1000',
  sofiaCond: 'Sofia+Sans+Condensed:ital,wght@0,1..1000;1,1..1000',
  sofia: 'Sofia+Sans:ital,wght@0,1..1000;1,1..1000',
  ballet: 'Ballet:opsz@16..72',
  googleSansFlex: 'Google+Sans+Flex:opsz,slnt,wdth,wght,ROND@6..144,-10..0,25..151,1..1000,0..100',
  petrona: 'Petrona:ital,wght@0,100..900;1,100..900',
  labrada: 'Labrada:ital,wght@0,100..900;1,100..900',
  inclusive: 'Inclusive+Sans:ital,wght@0,300..700;1,300..700',
  robotoFlex: 'Roboto+Flex:opsz,slnt,wdth,wght@8..144,-10..0,25..151,100..1000',
  boldonse: 'Boldonse',
  castoroTitling: 'Castoro+Titling',
  castoro: 'Castoro:ital@0;1',
  sedan: 'Sedan:ital@0;1',
  mozillaText: 'Mozilla+Text:wght@200..700',
  tektur: 'Tektur:wdth,wght@75..100,400..900',
  sometypeMono: 'Sometype+Mono:ital,wght@0,400..700;1,400..700',

  'plain-giant': {
    id: 'plain-giant', name: 'Plain Giant', line: 'One plain grotesk, set enormous and light', tags: ['swiss', 'minimal', 'bold'],
    display: { family: 'Archivo', weight: 300, size: 'clamp(3.5rem, 12vw, 12rem)', lineHeight: '0.86', letterSpacing: '-0.055em', use: 'Hero words, studio names, big numbers — two or three words at most' },
    heading: { family: 'Archivo', weight: 400, size: 'clamp(1.75rem, 3.4vw, 3rem)', lineHeight: '1', letterSpacing: '-0.03em', use: 'Section statements' },
    body: { family: 'Archivo', weight: 400, size: '1rem', lineHeight: '1.5', letterSpacing: '-0.005em', use: 'Paragraphs' },
    utility: { family: 'Archivo', weight: 500, size: '0.75rem', lineHeight: '1.3', letterSpacing: '0', use: 'Labels, navigation, captions — sentence case, semi-condensed', stretch: '87.5%' },
    googleFamilies: [GF.archivo], source: 'Google Fonts', sample: 'Less, but larger',
    why: 'The award-site default done without the licence: one neutral grotesk at a light weight, 150–300px, tracked tight (Stripe.dev runs Söhne 300 at 144px/−0.07em, Selected Base Söhne at 302px, K72 Lausanne 300). The drama is pure scale; Archivo\'s width axis gives the small labels their own voice without a second family.',
  },
  'cut-glass': {
    id: 'cut-glass', name: 'Cut Glass', line: 'Sharp wedge-serif headlines, plain American grotesk', tags: ['editorial', 'luxury', 'fashion'],
    display: { family: 'Prata', weight: 400, size: 'clamp(3rem, 8.5vw, 8rem)', lineHeight: '0.95', letterSpacing: '-0.025em', use: 'Hero lines, collection and property names — never italic (Prata has none)' },
    heading: { family: 'Prata', weight: 400, size: 'clamp(1.6rem, 2.8vw, 2.5rem)', lineHeight: '1.08', letterSpacing: '-0.01em', use: 'Section headings' },
    body: { family: 'Public Sans', weight: 400, size: '1rem', lineHeight: '1.6', letterSpacing: '0', use: 'Paragraphs, product details' },
    utility: { family: 'Public Sans', weight: 500, size: '0.8125rem', lineHeight: '1.4', letterSpacing: '0', use: 'Navigation, prices, labels' },
    googleFamilies: [GF.prata, GF.publicSans], source: 'Google Fonts', sample: 'Glass, cut by hand',
    why: 'The Editorial New / Canela register that award sites license (Hilden Kaira, Normal is Boring) — and that templates fake with Playfair Display (8 of our 225 sites). Prata\'s wedge serifs and Didone contrast read sharper and less familiar; Public Sans (Franklin-derived, USWDS) is the plain workhorse beside it, as Neue Montreal is on the real thing.',
  },
  'real-ink': {
    id: 'real-ink', name: 'Real Ink', line: 'Spanish-royal serif with real italics, modern text', tags: ['editorial', 'quiet', 'heritage'],
    display: { family: 'Ibarra Real Nova', weight: 400, size: 'clamp(3rem, 7.5vw, 7rem)', lineHeight: '0.96', letterSpacing: '-0.02em', use: 'Hero lines — set whole phrases in italic, never one word' },
    heading: { family: 'Ibarra Real Nova', weight: 500, size: 'clamp(1.6rem, 2.8vw, 2.4rem)', lineHeight: '1.1', letterSpacing: '-0.01em', use: 'Section headings' },
    body: { family: 'Golos Text', weight: 400, size: '1rem', lineHeight: '1.6', letterSpacing: '0', use: 'Paragraphs' },
    utility: { family: 'Golos Text', weight: 500, size: '0.8125rem', lineHeight: '1.4', letterSpacing: '0', use: 'Labels, navigation, dates' },
    googleFamilies: [GF.ibarra, GF.golos], source: 'Google Fonts', sample: 'Printed in Madrid, read everywhere',
    why: 'Revived from the 1780 Ibarra Quixote, it has the flared, slightly mannered shapes of Juana and Teodor (Normal is Boring, Partizan) with a true italic for whole phrases. Golos is a crisp Paratype UI grotesk, so the serif carries all the character.',
  },
  'tall-order': {
    id: 'tall-order', name: 'Tall Order', line: 'Mixed-case condensed sans, one superfamily', tags: ['bold', 'editorial', 'raw'],
    display: { family: 'Sofia Sans Extra Condensed', weight: 700, size: 'clamp(4rem, 13vw, 12.5rem)', lineHeight: '0.84', letterSpacing: '-0.01em', use: 'Hero words in mixed case — the height is the shout, not capitals' },
    heading: { family: 'Sofia Sans Condensed', weight: 600, size: 'clamp(1.75rem, 3.6vw, 3.25rem)', lineHeight: '0.98', letterSpacing: '-0.01em', use: 'Section headings, chapter titles' },
    body: { family: 'Sofia Sans', weight: 400, size: '1.0625rem', lineHeight: '1.55', letterSpacing: '0', use: 'Paragraphs' },
    utility: { family: 'Sofia Sans Condensed', weight: 500, size: '0.875rem', lineHeight: '1.3', letterSpacing: '0.01em', use: 'Labels, navigation, data' },
    googleFamilies: [GF.sofiaXCond, GF.sofiaCond, GF.sofia], source: 'Google Fonts', sample: 'Standing room only',
    why: 'Award sites use condensed grotesks big and in mixed case (Gooper Condensed at Koto\'s Seasoned, Freigeist Condensed at Quatre Cent Quatre, Akzidenz Condensed at WCS) — not only the Bebas all-caps poster. Three widths of one family (1–1000 weight each) keep the voice consistent from hero to footnote.',
  },
  signature: {
    id: 'signature', name: 'Signature', line: 'A copperplate word, a wide calm grotesk', tags: ['luxury', 'hospitality', 'fashion'],
    display: { family: 'Ballet', weight: 400, size: 'clamp(3.5rem, 11vw, 10rem)', lineHeight: '1.3', letterSpacing: '0', use: 'One word or a name per screen — never a sentence, never below 48px; give it 0.2em inline padding, its swashes reach past the margin' },
    heading: { family: 'Zalando Sans', weight: 400, size: 'clamp(1.5rem, 2.6vw, 2.25rem)', lineHeight: '1.1', letterSpacing: '-0.01em', use: 'Section headings', stretch: '125%' },
    body: { family: 'Zalando Sans', weight: 400, size: '1rem', lineHeight: '1.6', letterSpacing: '0', use: 'Paragraphs' },
    utility: { family: 'Zalando Sans', weight: 500, size: '0.75rem', lineHeight: '1.4', letterSpacing: '0.04em', use: 'Navigation, labels, prices — sentence case, wide', stretch: '125%' },
    googleFamilies: [GF.ballet, GF.zalando], source: 'Google Fonts', sample: 'Villa Serena',
    why: 'The luxury move in the Awwwards set: one script word huge over small extended grotesk (Era Residence: a copperplate script at 173px over Maison Neue Extended; Pensatori Irrazionali sets Ballet itself at 256px). Ballet has an optical-size axis, so its hairlines hold at display size; Zalando Sans at 125% width is the extended partner.',
  },
  horizon: {
    id: 'horizon', name: 'Horizon', line: 'One flexible sans, stretched wide for headlines', tags: ['futuristic', 'minimal', 'technical'],
    display: { family: 'Google Sans Flex', weight: 300, size: 'clamp(2.75rem, 8vw, 7.5rem)', lineHeight: '0.95', letterSpacing: '-0.03em', use: 'Hero statements', stretch: '151%' },
    heading: { family: 'Google Sans Flex', weight: 500, size: 'clamp(1.5rem, 2.6vw, 2.25rem)', lineHeight: '1.08', letterSpacing: '-0.015em', use: 'Section headings', stretch: '125%' },
    body: { family: 'Google Sans Flex', weight: 400, size: '1rem', lineHeight: '1.6', letterSpacing: '0', use: 'Paragraphs' },
    utility: { family: 'Google Sans Flex', weight: 500, size: '0.8125rem', lineHeight: '1.4', letterSpacing: '0.01em', use: 'Labels, navigation', stretch: '112.5%' },
    googleFamilies: [GF.googleSansFlex], source: 'Google Fonts', sample: 'Room to breathe, edge to edge',
    why: 'Extended light headlines are the current architecture/real-estate/tech look (Era Residence, Likova, Realevate — which sets Google Sans at 218px). Google Sans Flex (OFL, 2025) has width 25–151, optical size, slant and roundness in one file — wide light headlines and normal-width text without a second family; the ROND axis can soften it for friendlier brands.',
  },
  'soft-wedge': {
    id: 'soft-wedge', name: 'Soft Wedge', line: 'Light contemporary serif, plain sans for the rest', tags: ['editorial', 'organic', 'quiet'],
    display: { family: 'Petrona', weight: 300, size: 'clamp(3rem, 7.5vw, 6.75rem)', lineHeight: '0.98', letterSpacing: '-0.03em', use: 'Hero lines — italic for whole phrases' },
    heading: { family: 'Petrona', weight: 400, size: 'clamp(1.6rem, 2.8vw, 2.4rem)', lineHeight: '1.1', letterSpacing: '-0.015em', use: 'Section headings' },
    body: { family: 'Public Sans', weight: 400, size: '1.0625rem', lineHeight: '1.6', letterSpacing: '0', use: 'Paragraphs' },
    utility: { family: 'Public Sans', weight: 500, size: '0.8125rem', lineHeight: '1.4', letterSpacing: '0', use: 'Labels, navigation' },
    googleFamilies: [GF.petrona, GF.publicSans], source: 'Google Fonts', sample: 'Grown slowly, sold nearby',
    why: 'Reckless Neue, Signifier and Teodor are the serifs of 2026 award sites (Colonia Zacamil, Mosby Files, Partizan): low-contrast, light, a little soft at the joins. Petrona (100–900 + italics) is the closest free family in that register; Public Sans keeps the interface plain.',
  },
  projection: {
    id: 'projection', name: 'Projection', line: 'Huge hairline serif, small grotesk captions', tags: ['cinematic', 'editorial', 'art'],
    display: { family: 'Labrada', weight: 200, size: 'clamp(4rem, 13vw, 13rem)', lineHeight: '0.88', letterSpacing: '-0.035em', use: 'Hero words and titles at screen size — italic for whole lines' },
    heading: { family: 'Labrada', weight: 400, size: 'clamp(1.75rem, 3.4vw, 3rem)', lineHeight: '1.02', letterSpacing: '-0.02em', use: 'Chapter headings' },
    body: { family: 'Schibsted Grotesk', weight: 400, size: '1rem', lineHeight: '1.55', letterSpacing: '0', use: 'Paragraphs, captions under images' },
    utility: { family: 'Schibsted Grotesk', weight: 500, size: '0.75rem', lineHeight: '1.35', letterSpacing: '0', use: 'Credits, labels, navigation' },
    googleFamilies: [GF.labrada, GF.schibsted], source: 'Google Fonts', sample: 'The last summer in Lima',
    why: 'Very light serifs at 170–370px (I Killed a Cactus: Ogg 300; Artistudyo: IvyOra 100 at 370px; Hobro: Freight Big Light Italic) feel like a title card. Labrada goes down to weight 100 with italics and keeps its sharp wedges large; Schibsted is a tight grotesk for credits.',
  },
  'kind-words': {
    id: 'kind-words', name: 'Kind Words', line: 'One accessible, friendly sans for everything', tags: ['quiet', 'organic', 'minimal'],
    display: { family: 'Inclusive Sans', weight: 600, size: 'clamp(2.75rem, 7vw, 6rem)', lineHeight: '1', letterSpacing: '-0.03em', use: 'Hero headlines' },
    heading: { family: 'Inclusive Sans', weight: 600, size: 'clamp(1.5rem, 2.5vw, 2.1rem)', lineHeight: '1.12', letterSpacing: '-0.015em', use: 'Section headings' },
    body: { family: 'Inclusive Sans', weight: 400, size: '1.125rem', lineHeight: '1.6', letterSpacing: '0', use: 'Paragraphs — a size up for clinics and courses' },
    utility: { family: 'Inclusive Sans', weight: 500, size: '0.875rem', lineHeight: '1.4', letterSpacing: '0', use: 'Labels, navigation, form hints' },
    googleFamilies: [GF.inclusive], source: 'Google Fonts', sample: 'Help is closer than you think',
    why: 'Non-profit and care sites on Awwwards use warm, plain humanist grotesks at friendly sizes (Radiating Hope: Lausanne; Emergence: GT America; UNICEF: Roboto). Inclusive Sans was drawn for legibility — distinct I/l/1, open shapes — and has a personality the generic Inter/Roboto choice lacks.',
  },
  dial: {
    id: 'dial', name: 'Dial', line: 'Every axis of one variable grotesk, turned up', tags: ['experimental', 'bold', 'type'],
    display: { family: 'Roboto Flex', weight: 700, size: 'clamp(3.5rem, 12vw, 11rem)', lineHeight: '0.88', letterSpacing: '-0.02em', use: 'Hero words — alternate width per line (50% then 151%) or animate width on scroll; never below 40% at heavy weights', stretch: '50%' },
    heading: { family: 'Roboto Flex', weight: 700, size: 'clamp(1.6rem, 3vw, 2.6rem)', lineHeight: '1', letterSpacing: '-0.02em', use: 'Section headings', stretch: '151%' },
    body: { family: 'Roboto Flex', weight: 400, size: '1.0625rem', lineHeight: '1.55', letterSpacing: '0', use: 'Paragraphs' },
    utility: { family: 'Roboto Flex', weight: 600, size: '0.8125rem', lineHeight: '1.35', letterSpacing: '0', use: 'Labels, navigation, numbers', stretch: '75%' },
    googleFamilies: [GF.robotoFlex], source: 'Google Fonts', sample: 'Wider. Narrower. Louder.',
    why: 'Variable axes as art direction (Decathlon Yestalgia runs Roboto Flex from wdth 33 to 151; Displaay and NN Swinton animate width, contrast and slant). Roboto Flex has the widest range of any free family — 25–151 width, 100–1000 weight, plus grade and parametric axes — so one file gives the whole show.',
  },
  'fat-chance': {
    id: 'fat-chance', name: 'Fat Chance', line: 'Squat ultra-black display, clean Russian grotesk', tags: ['playful', 'bold', 'pop'],
    display: { family: 'Boldonse', weight: 400, size: 'clamp(2.5rem, 8vw, 7rem)', lineHeight: '1.2', letterSpacing: '-0.02em', use: 'Hero words, product names — short; its descenders run deep, so leave line-height at 1.2 and air below' },
    heading: { family: 'Golos Text', weight: 800, size: 'clamp(1.5rem, 2.8vw, 2.4rem)', lineHeight: '1.02', letterSpacing: '-0.025em', use: 'Section headings' },
    body: { family: 'Golos Text', weight: 400, size: '1.0625rem', lineHeight: '1.55', letterSpacing: '0', use: 'Paragraphs' },
    utility: { family: 'Golos Text', weight: 600, size: '0.8125rem', lineHeight: '1.35', letterSpacing: '0', use: 'Labels, prices, navigation' },
    googleFamilies: [GF.boldonse, GF.golos], source: 'Google Fonts', sample: 'Big taste, small batch',
    why: 'Black, squat, slightly wide display type is how food and lifestyle brands shout in 2025–26 (Aardvark Book Club: Champ 700 at line-height 0.8; Flying Papers: Obviously 900; Glitch & Grit: Elza 900). Boldonse (2025) is that ink-trap-black display for free; Golos 800 keeps headings in the same weight class.',
  },
  parlour: {
    id: 'parlour', name: 'Parlour', line: 'Titling capitals, modern-classic book text', tags: ['victorian', 'heritage', 'editorial'],
    display: { family: 'Castoro Titling', weight: 400, size: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: '1', letterSpacing: '0.02em', use: 'Hero lines and house names — capitals by design' },
    heading: { family: 'Castoro', weight: 400, size: 'clamp(1.5rem, 2.6vw, 2.2rem)', lineHeight: '1.15', letterSpacing: '0', use: 'Section headings' },
    body: { family: 'Castoro', weight: 400, size: '1.125rem', lineHeight: '1.6', letterSpacing: '0', use: 'Paragraphs' },
    utility: { family: 'Castoro', weight: 400, size: '0.9375rem', lineHeight: '1.4', letterSpacing: '0', use: 'Captions, labels, dates in italic', italic: true },
    googleFamilies: [GF.castoroTitling, GF.castoro], source: 'Google Fonts', sample: 'Established in the year 1871',
    why: 'Heritage houses on Awwwards (Cartier, Vacheron Constantin, Kitamura 1923) speak in engraved titling capitals over a calm book face — not costume Cinzel Decorative and pseudo-antique IM Fell. Castoro (Dutch-roman, 2020) and its titling cut are one family: refined, old, and not a theme.',
  },
  wanderer: {
    id: 'wanderer', name: 'Wanderer', line: 'Warm calligraphic serif, quiet humanist sans', tags: ['bohemian', 'warm', 'organic'],
    display: { family: 'Sedan', weight: 400, size: 'clamp(2.75rem, 7.5vw, 6.5rem)', lineHeight: '1', letterSpacing: '-0.015em', use: 'Hero lines — italic for whole phrases' },
    heading: { family: 'Sedan', weight: 400, size: 'clamp(1.5rem, 2.6vw, 2.2rem)', lineHeight: '1.12', letterSpacing: '-0.005em', use: 'Section headings' },
    body: { family: 'Mozilla Text', weight: 400, size: '1.0625rem', lineHeight: '1.65', letterSpacing: '0', use: 'Paragraphs' },
    utility: { family: 'Mozilla Text', weight: 500, size: '0.8125rem', lineHeight: '1.4', letterSpacing: '0', use: 'Labels, navigation' },
    googleFamilies: [GF.sedan, GF.mozillaText], source: 'Google Fonts', sample: 'Handwoven, sun-dried, slow',
    why: 'Yeseva One over Nunito Sans is the 2015 lifestyle-blog pairing. Sedan is a warm, pen-shaped serif with a real italic — handmade without the fat-face cliché — and Mozilla Text (2024) is a calm humanist grotesk for reading.',
  },
  'terminal-city': {
    id: 'terminal-city', name: 'Terminal City', line: 'Squared techno grotesk, terminal-mono text', tags: ['cyberpunk', 'tech', 'mono'],
    display: { family: 'Tektur', weight: 800, size: 'clamp(2.75rem, 8vw, 7rem)', lineHeight: '0.92', letterSpacing: '-0.02em', use: 'Hero statements', stretch: '75%' },
    heading: { family: 'Tektur', weight: 600, size: 'clamp(1.4rem, 2.6vw, 2rem)', lineHeight: '1.08', letterSpacing: '0', use: 'Section headings' },
    body: { family: 'Sometype Mono', weight: 400, size: '1rem', lineHeight: '1.65', letterSpacing: '0', use: 'Paragraphs, readouts' },
    utility: { family: 'Tektur', weight: 500, size: '0.8125rem', lineHeight: '1.3', letterSpacing: '0.02em', use: 'Labels, navigation', stretch: '87.5%' },
    googleFamilies: [GF.tektur, GF.sometypeMono], source: 'Google Fonts', sample: 'Access granted — 02:14',
    why: 'Orbitron and Share Tech Mono are the stock sci-fi pair. Award tech sites use squared or stencil grotesks with a characterful mono (Toyfight: FK Raster + Spezia Mono; La Lama: Sometype labels; PX Push: a squeezed grotesk + mono). Tektur has a width axis; Sometype Mono is a mono drawn for reading. Mono stays in body, so the one-mono-utility rule still holds.',
  },
  'dream-logic': {
    id: 'dream-logic', name: 'Dream Logic', line: 'Refined display serif, calm humanist sans', tags: ['surreal', 'editorial', 'art'],
    display: { family: 'Gilda Display', weight: 400, size: 'clamp(3rem, 9vw, 8rem)', lineHeight: '0.95', letterSpacing: '-0.01em', use: 'Hero statements' },
    heading: { family: 'Gilda Display', weight: 400, size: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: '1.1', letterSpacing: '0', use: 'Section headings' },
    body: { family: 'Mozilla Text', weight: 400, size: '1.0625rem', lineHeight: '1.65', letterSpacing: '0', use: 'Paragraphs' },
    utility: { family: 'Mozilla Text', weight: 500, size: '0.8125rem', lineHeight: '1.4', letterSpacing: '0', use: 'Labels, navigation' },
    googleFamilies: [GF.gilda, GF.mozillaText], source: 'Google Fonts', sample: 'The door opened onto the sea',
    why: 'Keeps the calm classical display that makes strange images feel real; swaps Manrope (one of the faces AI tools and templates reach for first, and spaced-caps labels) for Mozilla Text in sentence case.',
  },
```

### Where they go (`directions[].typography` in taxonomy.ts — offer lists, not defaults)

- **architectural-minimal**: add `plain-giant`, `horizon`
- **art-direction**: add `dial`
- **art-editorial**: add `cut-glass`, `real-ink`, `projection`
- **bento-product**: add `horizon`
- **bohemian**: add `signature`
- **cinematic-editorial**: add `real-ink`, `projection`
- **coastal-calm**: add `cut-glass`, `soft-wedge`
- **dark-cinematic**: add `projection`
- **digital-futurism**: add `horizon`
- **ethereal**: add `signature`
- **fashion-editorial**: add `cut-glass`, `signature`
- **film-inspired**: add `tall-order`
- **immersive-portfolio**: add `projection`
- **luxury-editorial**: add `cut-glass`, `real-ink`, `signature`
- **maximalism**: add `dial`, `fat-chance`
- **modern-heritage**: add `real-ink`, `soft-wedge`
- **monochrome-minimal**: add `plain-giant`
- **neo-brutalist**: add `tall-order`
- **news-grid**: add `tall-order`
- **organic-modern**: add `soft-wedge`, `kind-words`
- **playful-pop**: add `dial`, `fat-chance`
- **raw-editorial**: add `tall-order`
- **retro-seventies**: add `fat-chance`
- **scandinavian-minimal**: add `soft-wedge`, `kind-words`
- **soft-pastel**: add `soft-wedge`, `kind-words`
- **sticker-studio**: add `fat-chance`
- **swiss-modern**: add `plain-giant`, `tall-order`
- **technical-minimal**: add `plain-giant`, `horizon`
- **typography-first**: add `plain-giant`, `dial`
- **warm-hospitality**: add `signature`, `kind-words`
- **y2k-chrome**: add `horizon`

In-place replacements keep their current directions; additionally offer `parlour` on modern-heritage and luxury-editorial, `wanderer` on organic-modern and warm-hospitality.

## 5. Notes for the plan

- Order of value: `plain-giant`, `cut-glass`, `horizon`, `signature`, `tall-order` close the biggest gaps between our library
  and what award sites actually do; `parlour`/`wanderer`/`terminal-city` replacements remove the most dated faces.
- `npm run check` must be run after pasting (the simulation used the same rules, but seeds and directions are only composed there).
- A worthwhile engine follow-up (not a font): award sites get their look from **scale and weight**, not family. A pairing
  could carry an optional "display weight range" so recipes may set the same face at 300 for quiet sites and 700 for loud ones.
- Not proposed on purpose: a second mono-label pairing and a second uppercase-label pairing (the rules are right — these are
  the 2026 uniform), Inter Tight / Geist Mono / Playfair (pass the name check but are the defaults the ban exists to avoid),
  Instrument Sans (sister of banned Instrument Serif), Fontshare faces (Switzer, General Sans — seen on award sites, but ITF
  licence and not in next/font).
