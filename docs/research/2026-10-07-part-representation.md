# Showing a part without promising its pixels (2026-10-07)

Question: Pages showed each part as its real section shrunk to ~240px. The text was unreadable and the parts were hard to
tell apart. A finished-looking page is also a promise OpusKit can't keep: the builder is meant to go further (decision 32).
How do other products and fields show "a choice about a part" when someone else makes the final thing? The answer
became decision 34 in `docs/plan-library.md`.

## Main finding

Every field that hands a plan to someone else to build draws **the decided things at full clarity and the open things
at low fidelity**, and often adds **a real precedent** that shows how far the result can go. People read what is
promised from the fidelity of the picture, not from captions. A finished-looking image becomes the promise whatever it
says under it. Example: a South African regulator pulled a property ad whose CGI was labelled "artist's impression".

## Patterns

| Pattern | What it shows when choosing | Honest about the final result? |
|---|---|---|
| Relume sitemap → wireframe → Design View | Unstyled components with real copy; style applied as a separate layer ("80% of the way") | Yes: structure and style are visibly two layers |
| Framer Wireframer, Insert → Sections | "Structure, not style": minimal layouts | Yes: low fidelity on purpose |
| Shopify theme editor | Section names, categories, a live preview in the theme's styles | A promise, kept: the theme really renders it |
| Squarespace, Wix | Thumbnails of prebuilt sections | A promise (WYSIWYG) |
| shadcn blocks, 21st.dev, Tailwind Plus | A live preview at full size plus a one-line label | Literal: it is the code you get |
| Variant, Stitch | Full-fidelity directions to discover what you want | Mood, not a spec |
| Architecture | Floor plan binding; render "artist's impression"; a board of precedents, each naming the move borrowed | Disclaimers alone fail |
| Interior design | Spec sheet (make, finish) plus drawings "for design intent only" | Yes: what is specified vs. how it gets made |
| Film | Lookbook (the world), storyboard (composition), shot list (what each shot shows) | Yes: each artefact fixes one thing |
| Game greybox | Grey blocks prove layout and flow; art comes last | Yes, by construction |
| Car configurators | Photoreal car plus "for reference only" | A promise with a legal hedge |
| Bespoke tailoring | Swatches and style options, then a basted fitting | Yes: you choose cloth and cut, the tailor makes it |

## UX research

- Web pages are recognised from thumbnails mostly by colour and layout: 60% at ~96² px, 80% at ~144² px (Kaasten,
  Greenberg & Edwards). That holds for things seen before. Telling apart unfamiliar parts is the weak case.
- Text-enhanced thumbnails beat both plain thumbnails and text alone: 67 s vs 86 s vs 95 s (Woodruff et al., CHI 2001).
- Pictures need text labels; beyond a handful, no icon is recognised by everyone (NN/g).
- Low fidelity draws high-level feedback; high fidelity draws low-level feedback (Whatley). Sketchy rendering gets more
  useful feedback (Wong, CHI 1992). Balsamiq looks hand-drawn so people "don't think it's finished".

## What OpusKit did (decision 34)

**Plan + proof.** Pages is a plan, not a shop window. The "wow" comes from Discover's real sites and from the build.
- The page column is a storyboard. Each part is a numbered frame at the column's full width, in the owner's colours and
  lettering. Headings and labels are real; body text is bars (Flow Block, OFL); photos are crossed blocks. One
  `.sketch` class does it for every section, so nothing is drawn per design.
- Under each frame: **Says** (the part's content, as in the copy deck) and **Shows** (its row of the shot list: what the
  picture shows, how many, the ratio).
- The chooser draws options the same way, and shows proof under a design: a clip from a site built with that very
  design (`sectionDesign` in `closest.ts`), labelled as that site, never as the owner's.
- **Plan | Sample** switches the column to stand-in words and photos, labelled as a sample.

Open: toolbox tiles still keep their source site's colours, and the menu's demo is not sketched.

## Sources

- Relume wireframes — https://www.relume.ai/resources/docs/how-to-create-and-edit-wireframes-in-the-relume-site-builder ; Design View — https://resources.relume.io/resources/docs/how-to-style-all-pages-using-the-design-view
- Framer Wireframer — https://www.framer.com/updates/wireframer (21 May 2025) ; Sections — https://www.framer.com/updates/sections
- Shopify section schema — https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema ; block previews — https://shopify.dev/changelog/block-previews-now-available-in-theme-editor (21 May 2025)
- Squarespace sections — https://support.squarespace.com/hc/articles/6421525446541 ; Blueprint — https://www.stylefactoryproductions.com/blog/video-squarespace-blueprint
- Wix preset thumbnails — https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-blocks/widget-design/create-thumbnail-images-for-your-presets
- shadcn blocks — https://ui.shadcn.com/blocks ; 21st.dev — https://21st.dev
- Variant — https://abduzeedo.com/variant-ai-design-tool-thinks-scrolls ; Stitch — https://uithings.com/what-is-google-stitch
- Architecture mood boards — https://storyflow.so/architecture-moodboard ; CGI ad ruling — https://www.sundaytimes.timeslive.co.za/sunday-times/news/2024-11-03-paradise-lost-as-regulator-rejects-photoshopped-ad/ ; honest disclosure — https://www.studiomatrx.org/students/generative-ai-for-architecture-interiors/honest-disclosure-to-clients
- Interior spec sheets — https://blog.designfiles.co/interior-design-spec-sheet/
- Film lookbooks — https://www.studiobinder.com/blog/film-lookbook/ ; animatics — https://saturation.io/film-crew-positions/animatic-editor
- Greyboxing — https://dev.epicgames.com/documentation/en-us/fortnite/greyboxing-in-unreal-editor-for-fortnite
- Porsche configurator — https://configurator.porsche.com/en-XA/mode/model/Y1BBN1/pre-config
- Bespoke tailoring — https://kingandallen.co.uk/bespoke-tailoring-process
- Kaasten, Greenberg & Edwards — https://www.donotlick.com/thumbnails-titles-and-urls-how-users-recognize-representations-of-websites/
- Woodruff et al., CHI 2001 — https://web.mit.edu/rruth/www/Papers/2001-CHI-Thumbnails.pdf
- Icon labels — https://uxdesign.cc/do-icons-need-labels-6cb4f4282c00
- Fidelity and feedback — https://www.simonwhatley.co.uk/writing/low-fidelity-design-gets-high-level-feedback-high-fidelity-designs-get-low-level-feedback/ ; Wong 1992 — https://dblp.dagstuhl.de/rec/conf/chi/Wong92.html ; Balsamiq — https://hackdesign.org/toolkit/balsamiq
