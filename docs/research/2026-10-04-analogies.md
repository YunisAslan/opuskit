# Analogies: how other fields mass-produce "unique and tasteful"

2026-10-04. Question: how did fields outside web design give many people tasteful results without everyone's
result looking the same, and what would OpusKit borrow? Sources are numbered at the end.

## The one idea underneath

Kate Compton (Spore's planet generator) named the failure: "I can easily generate 10,000 bowls of plain oatmeal…
mathematically they will all be completely unique… but the user will likely just see a lot of oatmeal. **Perceptual
uniqueness is the real metric**" [1]. MIT Media Lab proved it in branding. Its 2011 algorithmic logo had 40,000
variants [2], and Bierut replaced it in 2014 because "any one of the 40,000 variations could stand for the Media Lab…
they were all equal". His new system was a fixed 7×7 grid in which each group's *own letters* made its glyph [3].

The fields that solved sameness all do two things. They keep a **fixed, tasteful structure**, and they drive the variable
part from **something real that belongs to the owner**: a photo, the weather, a person's name, a body. Fields that vary
by random sampling over a shared pool get oatmeal. OpusKit's palettes × pairings × sections are that shared pool, so
the risk is real.

## Patterns

**1. Generative identity driven by a real input.** Casa da Música (Sagmeister): the building's silhouette is the
logo, and a tool samples any image (a Beethoven portrait, a poster for that night's concert) for the 17 facet
colours [4]. Visit Nordkyn (Neue): the logo changes with live wind and temperature data from the Met Institute and updates
every 5 minutes [5]. DIA ships "creative tools [that] always accompany brand guidelines" [6]. *Why distinct:* the input
differs, so the result does too, and the structure is the constant. *Money:* studio fee for the system plus the tool.
*OpusKit:* seed the palette, signature motion and one shape from the owner's uploads (a photo, a logo, the city) instead
of only from a list. The Build Package should ship the generator (a small piece), not only the frozen result.

**2. Variable fonts as identity.** Tokyo Dome City and DIA's kinetic systems put one typeface on continuous axes
(weight, width, slant) and give each use its own position [7][6]. *Why distinct:* a continuous space, not a
menu of 30. *OpusKit:* each recipe pins its own axis values (`wght`, `wdth`, `opsz`) as tokens, and check.ts measures
distance in axis space, so two sites on the same pairing can still differ.

**3. Presets / LUTs.** VSCO sold film emulations (Kodak, Fuji, Agfa) by subscription and reached 2M paying members by
2018 [8]. Influencers sell their "look" as Lightroom presets [9]. *Why distinct (and why not):* the preset carries
taste and the owner's photo carries uniqueness. A popular preset still turned into a monoculture (#vscocam). *Money:*
library subscription, and creators selling a named look. *OpusKit:* a "look" (colour grade, type, shape, motion) is
already separate from structure. Let real designers publish named looks, with an intensity dial and a cap on uses per
category so no look becomes the new default.

**4. Sample packs and stems.** Splice: a subscription with monthly credits, royalty-free sounds, and the pool paid out
to creators by download count (>$20M) [10]. Suno: a **Persona** "captures a track's vocals, style and vibe as a
reusable profile". **Cover** keeps the melody and changes the genre. Stems split any track into 12 parts [11].
*Why distinct:* ingredients are recombined by the user, and the persona is lifted from one specific work.
*OpusKit:* "Persona from an example" (Sela Mor's character on your content). "Cover" (keep your pages and words,
re-render in another big idea). Per-use royalties to piece and section authors.

**5. Procedural generation.** No Man's Sky's 18 quintillion planets "start to feel the same" [1]. Spore did better
in one place: players built creatures from parts, and **procedural animation** made any body walk well, so amateur
choices still looked crafted. Players shared 1M creatures in week one [12]. Wave Function Collapse learns
*adjacency rules from one example* and generates new layouts that are locally right [13]. *OpusKit:* (a) judge
variety by perceptual distance between screenshots, not by option counts. (b) Learn section adjacency ("what follows
what") from award sites, WFC-style, instead of writing it by hand. (c) Derive motion from the structure the owner
built, the way Spore derived gait.

**6. Configurators.** Nike By You: a fixed silhouette, palettes "curated by Nike's design team", only material pairs
that work, plus your own text on the heel [14]. IKEA Kreativ scans *your* room and lets you place and swap furniture in it
[15]. The IKEA effect: labour raises value, but only if the task is completed [16]. *OpusKit:* the kit already is a
configurator. What's missing is "in your room": show the owner's own photos and words from the first minute (pull
them from an old site or Instagram). Ask for a few meaningful choices, and always end on a finished result.

**7. Parametric architecture.** TestFit: "generate-then-edit". It gives a strong first layout at once from
constraints (zoning, unit mix, parking), then re-solves live while you edit and shows yield [17]. *OpusKit:* the first
screen of the kit should be a finished draft from three answers, with a live "what this costs you" readout (load
weight, motion budget, distinctiveness).

**8. Template economies.** Shopify requires every theme to be "fundamentally different from other themes… beyond
minor cosmetic changes", judged on the whole experience, plus Lighthouse and accessibility gates. Only ~hundreds
are listed [18]. Framer creators keep 100% of sales (Framer paid them $753k in Nov 2025) and Webflow pays 95% [19].
Notion's Easlo made $500k+ selling templates [20]. A Figma Community duplicate loses all link to its original [21].
*OpusKit:* keep Shopify's gate. check.ts already rejects near-duplicate palettes, so extend the same rule to sections
and looks. Keep lineage that Figma throws away: every remix records its parent and credits it.

**9. Taste as a shareable code.** Midjourney `--sref` codes are short numbers for one style, and there are >1.4B of
them. `--sref random` explores, and moodboards and personalisation profiles can be mixed, two of each [22].
Cosmos/Are.na sell calm, ad-free curation by subscription [23]. *OpusKit:* every recipe gets a short style code that can
be pasted, mixed ("A's colour, B's motion") or randomised. A mood board (Cosmos/Are.na link) becomes an input.

**10. Canva.** Brand Kit applied in one click, Magic Design from a prompt, and a $200M fund paying creators whose
templates train its AI [24]. *OpusKit:* pay the people whose taste the engine learns from.

**11. Constraints as engine (Oulipo).** Perec's *La Disparition* is a novel without the letter "e", and the missing
letter becomes its theme. His "story-making machine" generated *Life: A User's Manual* [25]. *Why distinct:* an odd
rule pushes the work off the obvious path. *OpusKit:* the "big idea" is close to this. Make it a hard, checkable rule
drawn from the content ("one colour only", "type only, no photos", "everything moves sideways"), enforced in QA.

**12. Critique loops.** chess.com Game Review turns engine output into win-probability classes (Brilliant, Best,
Inaccuracy, Mistake, Blunder), each with an explanation [26]. Grammarly applies uploaded brand tones and style
guides [27]. The caution comes from Lighthouse: almost half of pages scoring 100 fail Core Web Vitals, because a single
score gets gamed [28]. *OpusKit:* review a built site move by move against its recipe and against award sites. Use
several named findings, not one number.

## The six most promising transfers (ranked)

**1. Seed from the owner's real thing.** (Casa da Música + Nordkyn + IKEA Kreativ.) The owner gives one real input:
a photo, logo, storefront, street, or a data feed such as opening hours or local weather. The engine derives the
variable layer from it: palette sampled and then corrected to pass check.ts, a signature shape or motion parameter,
and variable-font axis values. Structure stays curated. Two cafés choosing the same look still differ, because their
inputs differ, and that is *perceptual* uniqueness, not oatmeal. The Build Package ships the seed and the derivation,
so the coding agent can keep generating on-brand assets later.

**2. Site Review with a sameness meter.** (chess.com + Shopify gate.) After the agent builds, a review pass
screenshots each section and compares it against every OpusKit site and the award reference set. It labels each
choice: Brilliant (distinct and on-recipe), Inaccuracy (drifted to a default), Blunder (looks like N other sites).
Each label comes with one sentence and a fix the agent can apply. It builds on `visual-qa` and check.ts, avoids the
Lighthouse trap by naming findings instead of one score, and sells on its own: "review my AI-built site".

**3. Designer Looks, with royalties and caps.** (VSCO/presets + Splice + Suno Persona.) Invited designers publish
looks, big ideas, pieces or sections through the same check.ts gate. Owners pick them in the kit, the author is credited
in the Build Package, and the author earns per use from a pooled subscription share. Each look has a use cap per
category and region, so it can't become the new monoculture. The number of taste sources grows instead of one engine
being the bottleneck. Persona-from-example ("make mine feel like Sela Mor") is the entry point.

**4. Style codes.** (Midjourney sref.) Every recipe gets a short code (`ok-7Q3F`) that encodes its look and big idea.
The owner can paste a code, mix two ("colour from A, motion from B"), or press "surprise me" for a random valid code.
A few pairwise "which do you prefer" rounds then tune a personal taste profile. Codes spread on their own, cost
little (the engine is deterministic), and give remix lineage a key.

**5. Cover / remix with lineage.** (Suno Cover + Figma duplicate, fixed.) "Start from this site": any example, or a
site the owner admires once its *structure* is read into a recipe. The owner keeps its character and swaps the content,
and the kit requires a set number of divergences before export (a new big idea, a palette ≥ the ΔE threshold, a
different first screen). Lineage is recorded and credited. The divergence rule keeps remix from becoming cloning.

**6. One declared rule per site.** (Oulipo.) Each recipe carries one checkable constraint derived from its content
and big idea, for example "only the accent colour moves" or "no rectangle has square corners". It goes into CLAUDE.md
and QA tests it. It gives the agent a reason to make unexpected choices consistently, and every site a one-sentence
description.

## Two wild ideas

**Living identity.** Nordkyn for every site: a piece whose identity is a *rule plus a live feed*, not a picture. A
Baku café's accent follows the Caspian wind, a festival's type weight tracks ticket sales, a studio's hero grain follows
the hour. Two sites with the same recipe stop being the same site at runtime, and the owner gets a story worth telling.

**A look registry.** Sell exclusivity the way domain names do. Once a café in Baku claims a look (or a style code),
no other café within that radius or category can get it for a year. Scarcity becomes the product, the anti-sameness
promise becomes something enforceable and billable, and the registry data shows which looks are overused.

## Sources

1. Procedural oatmeal, Kate Compton: https://en.wikipedia.org/wiki/Procedural_generation ; https://emshort.blog/2016/09/21/bowls-of-oatmeal-and-text-generation/
2. MIT Media Lab 2011 identity: https://thenextweb.com/news/mit-media-labs-new-logo-has-40000-variations ; https://www.creativeapplications.net/project/mit-media-lab-identity-processing/
3. Why it was replaced (Bierut): https://gizmodo.com/why-mit-media-lab-scrapped-its-old-logo-after-just-thre-1651927638
4. Casa da Música: https://sagmeister.com/work/casa-da-musica/
5. Visit Nordkyn: https://neue.no/work/visit-nordkyn/ ; https://www.dandad.org/work/d-ad-awards-archive/where-nature-rules
6. DIA Studio: https://www.walkerart.org/whats-on/dia-studio/ ; https://www.typeroom.eu/dia-x-ada-modular-and-highly-flexible-kinetic-typographic-system-digital-agency
7. Tokyo Dome City variable identity: https://creativeboom.com/news/tokyo-dome-city
8. VSCO: https://petapixel.com/2016/12/07/vsco-x-invite-membership-preset-loving-mobile-photogs/ ; https://www.vsco.co/subscribe/plans
9. Influencer presets: https://www.popsci.com/make-lightroom-presets-influencers/
10. Splice: https://techcrunch.com/?p=1799858 ; https://thehustle.co/splice-audio-marketplace-music-spotify
11. Suno Persona/Cover/Stems: https://suno.com/products ; https://help.suno.com/en/articles/11362433
12. Spore Creature Creator: https://en.wikipedia.org/wiki/Spore_Creature_Creator ; https://worthplaying.com/article/2008/6/25/news/52393-spore-registers-one-millionth-creature-created/
13. Wave Function Collapse: https://records.sigmm.org/?p=12589
14. Nike By You: https://desirabilitylab.com/backfill/backfill-2023-259-nike-by-you-customization
15. IKEA Kreativ: https://ikea.com/us/en/newsroom/corporate-news/ikea-launches-new-ai-powered-digital-experience-empowering-customers-to-create-lifelike-room-designs-pub58c94890
16. IKEA effect (Norton, Mochon, Ariely 2011): https://papers.ssrn.com/abstract=1777100
17. TestFit: https://www.testfit.io/blog/ten-years-of-generate-then-edit-real-time-feasibility-built-for-iteration
18. Shopify Theme Store requirements: https://shopify.dev/themes/store/requirements ; https://shopify.dev/themes/store/revenue-share
19. Framer / Webflow creators: https://sacra.com/research/framer ; https://webflow.com/blog/template-creator-enhancements
20. Notion templates (Easlo): https://kajabi.com/blog/can-you-make-money-selling-notion-templates
21. Figma Community duplicates: https://help.figma.com/hc/en-us/articles/360040035974
22. Midjourney style references: https://docs.midjourney.com/docs/style-reference
23. Are.na / Cosmos: https://republic.co/blog/making-smart-cool-are-na-founder-story ; https://www.cosmos.so/support
24. Canva Creator Compensation: https://www.theregister.com/2023/10/05/canva_ai_fund/
25. Oulipo: https://en.wikipedia.org/wiki/Oulipo
26. chess.com Game Review: https://support.chess.com/en/articles/8572705-how-does-game-review-work
27. Grammarly brand tones: https://grammarly.com/business/learn/brand-tones
28. Lighthouse gaming: https://www.smashingmagazine.com/2024/06/how-hack-google-lighthouse-scores-2024/
