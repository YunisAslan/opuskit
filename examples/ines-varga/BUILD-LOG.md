# Build log — Ines Varga

How this site is made, step by step (docs/plan-examples.md §3 and §5c). Example #28: a freelance cartographer who
draws illustrated maps for towns, trails and books — Personal brand / portfolio · Conceptual Sketch · **dynamic** ·
illustration. Its engine test (§5c): an **illustration lead** — does the shot list ask for drawings, not photos? A
commissions form with a brief and a budget, a work index, sketches drawn in the page's own line.

The user approved §5c on 2026-10-11 ("bəli gettik") and asked for this one first, with the session's new pieces in it,
and for the recipe to go into their Saved ("Mütləq saved-ə əlavə edərsən sonda").

## 1. Recipe (2026-10-11) — waiting for the user's approval

Made by Claude in a real browser (headless Chrome) with OpusKit's own screens, as a user would:
- **Library** — taken by name (decision 52): from **Inkwell & Moth** its first screen, *A drawing that comes apart
  as you scroll* (a map drawn in layers), and *Prints on a desk* (maps as prints to pick up); from **Fieldhouse** its
  idea *Names beside one photo held in place* (the work index: map titles beside one held map); from **Fennwood**
  the *Hand-drawn underline*. Then **Build my site**.
- **You** — name "Ines Varga"; one sentence "Illustrated maps for towns, trails and books, drawn by hand in ink and
  watercolour. Commissions open."; What are you making: **My work** (not read from the sentence — picked) →
  portfolio.
- **Direction (Make it yours)** — Look: **Conceptual Sketch** (Direction offered Scrapbook). Colours: **Gallery
  Grey** — pale grey, ink, vermilion: the watercolour maps glow on a neutral ground and the vermilion reads as a
  map's route line; previewed against **Chrome Silver** (dull mid-grey) and **Butter Yellow** (competes with the
  maps). Lettering: **Sketchbook** (Caveat Brush + Winky Sans) — hand lettering for a hand-drawn practice;
  previewed against **Letterpress Modern**, which Kelp Line already wears. Motion came out **dynamic** (Prints on a
  desk asks for it). Screens in `media-src/flow/`.
- Pages from the kind of site: Home (first screen, Featured Work, Closing CTA) · Selected Work (Featured Work,
  Clients) · Project (Case Study, Gallery, Specs, Featured Work) · About (About, Testimonials, Timeline) · Contact
  (Closing CTA, FAQ).
- **The session's new pieces, added by Claude at the user's request** (the Library cannot offer them until a built
  site shows them — this site will be the first): *A picture that becomes the next page* (`photo-morph`, Selected
  Work → the map grows into its project page), *A story told beside one held picture* (`scroll-story`, About — how a
  map is made, chapter by chapter), *Letters that gather into a sentence* (`letters-assemble`, Contact's invitation),
  *Shutter between pages* (`shutter-transition`, whole site — like a map's folds). The engine adds *Tap to open
  large* (the Project gallery's layout) and smooth scroll (the default for a dynamic recipe since 2026-10-11).
- **Next: Recipe** → generation `ed2dab59` in the flow's browser. The full spec is the link in
  `media-src/flow/link.txt` (`/studio/open?recipe=…`): opening it saves the recipe into that browser's Saved and shows
  it. Opened in the user's own browser on 2026-10-11 so it is in their Saved.
- The recipe page now shows these pieces too: a new **Also in your site** list under What you took (every piece the
  recipe has that was not taken from a site — the four new ones, Tap to open large, smooth scroll), each its live demo
  in the owner's brand (`RecipeDocument.tsx`). Screens: `media-src/flow/recipe-also.jpg`, `saved.jpg`.

## Next

- [ ] The user approves the recipe (or asks for changes).
- [ ] Media brief (§3 step 2): illustration-led, so the shot list should ask for drawn maps; Claude finds ~4 photos
      (desk, hands, inks). Placeholders are fine where nothing is found yet (the user, 2026-10-11).
- [ ] Project, Build Package, build in an isolated `claude -p` session, review, register, clips (§3 steps 3–9).
