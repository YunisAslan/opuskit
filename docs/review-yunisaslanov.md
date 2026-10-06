# Review — yunisaslanov, the first site built through the Library

2026-10-06. The user built a portfolio (`yunisaslanov/`, kept local and not committed: it holds the owner's own photo)
through the Library flow, starting from Inkwell & Moth: Brand picked the Grading Suite palette and the Wide Spec
lettering, Pages added the Dithered pattern on the first screen, and a Claude Code Build Package was built from the
recipe. This file records what went wrong between what the owner saw in OpusKit and what the build made, why, and what
changed in OpusKit. The rules that came out of it are decision 21 in `docs/plan-library.md`.

## What the owner reported

1. Some sections are weak, Testimonials especially.
2. Odd, random-looking effects and letters scattered over the site.
3. The Dithered pattern sits strangely on the right of the first screen.
4. The links have a hover underline the owner never saw in `/studio/pages`, so it could not be removed, changed or
   added to there.
5. A second typeface, IBM Plex Sans, appears beside the one picked; nothing said where it came from.

## What we found, and the fix

| # | Problem | Cause | Fix in OpusKit |
|---|---|---|---|
| 1 | Link hover nobody chose | Collecting a site copies its site-wide behaviours (Inkwell's Hand-drawn underline) into the plan; the Library flow had no place that showed them | Pages ends with **On every page**: Headlines, Links, Main button, Between pages, Whole site. Each row says what it is now; × takes it off; a click shows the options moving in the right column (`behaviours`, `setBehaviour`, `toggleSitePiece`) |
| 2 | A second typeface | A pairing has two faces (Wide Spec: Hubot Sans for headings, IBM Plex Sans for text); Brand's tile showed only the heading face | Brand's lettering tiles show both faces: the heading face, and "Text in IBM Plex Sans" set in it |
| 3 | Testimonials not as previewed | With no design picked, Pages drew the default ("One leads"); the engine builds the look family's design (Raw → "One big quote") | Pages draws every part in the design the engine will build (`variantFor` by the look's family) and names it ("Build trust · One big quote") |
| 4 | Testimonials weak | One quote set in the display face at up to 5rem across the page, a bare name under it | Redesigned, all three designs: a label column, a large accent quotation mark, the quote at a readable heading size, an accent rule before each name, the other quotes as cards under the lead |
| 5 | Big cover photos with randomly coloured titles (About) | The engine picked a big idea the owner never saw ("Loud covers, quiet reading", with the "Photos revealed like a curtain" signature moment); the builder followed it with giant covers and set a title in `mix-blend-difference` over a photo | A Library-built plan gets no big idea unless one is picked (`planToSpec`: `concept` is `'off'` for `via: 'studio'`), so no unseen signature moments or cover rules reach the build. Every recipe's Avoid list now bans text in blend modes over photos, and effects nobody picked (`GENERIC_TELLS`) |
| 6 | The dither as a small tilted card | The piece's rules read "Brutal, technical and futuristic directions. One section; keep text on a solid block over it." The builder read that as a print taped on a page | Its rule now says it is the section's background, edge to edge behind everything, never a small card, frame or tilted print. Rules that judged fit ("suits these directions", one even "skip it for warm, organic ones" about a piece the owner had picked) were removed from every piece: the recipe speaks to the builder only |
| 7 | Letters standing in for logos | Name wall's split design (integrations) put each name's initial in a tile | Removed; names only |
| 8 | Thin Trust strip | Tiny text in one squeezed row | Ruled columns, a heading size and body text for each promise |

Also checked: all 43 ready sections, rendered large in the user's palette and lettering. Testimonials, Trust and the
Name wall's split design were the weak ones and are fixed. Every other section held up.
| 9 | Menu links narrower, smaller and higher than the logo and button | Wide Spec set its labels in Plex at 87.5% width; the drawn underline added 8px of padding under each link; shadcn's button kept its own 15px | Decision 22: ready code is a reference the builder fits into one site, with three "one system" QA checks in every package. The underline takes no room; a label role in the body's face keeps the body's width (check.ts); a button beside links is set like them. Patched in `yunisaslanov/` too (DrawnLink, tokens.css, Nav.tsx) |

## Still open

- "Random letters": we could not tell which spot was meant. The closest are the home project index (titles offset at
  random) and the tilted, taped photos. Both come from Inkwell & Moth's Experimental layout and Scrapbook look, which
  the site started from. Ask the user if something else was meant.
- The built `yunisaslanov/` keeps its old sections; only new Build Packages get the redesigned ones. Rebuild it if the
  user wants.
- The recipe page still lists "Big idea: None" with a Change link, and Studio has no place for a big idea. Settle this
  when the Recipe step is reworked.
- `yunisaslanov/next.config.ts` had no `turbopack.root` pin, so a build there risked OpusKit's own `node_modules`. The
  pin was added there by hand. Fresh Claude Code builds will not have it yet (AGENTS.md, "Example projects").
