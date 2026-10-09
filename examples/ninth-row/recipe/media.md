## Media Direction — Video-led

Moving image carries the atmosphere; motion in the footage is slow, continuous and intentional.

### Treatment
- Slow camera moves, no fast cuts in hero footage
- Always provide a poster frame
- Muted by default, captions if there is speech
- Pause off-screen to save battery

**Formats:** MP4 (H.264) and JPEG posters, all made by scripts/prepare-video.sh (next/image serves the posters as AVIF/WebP); hero ≤ 6MB desktop, ≤ 3MB mobile

### Hero — Scroll-controlled video
- **Composition:** A pinned 100svh stage; the video's playhead is mapped to scroll progress over ~300vh. Type appears at chapter points.
- **Behavior:** A sticky 100svh stage inside a ~300vh block; Motion useScroll on the block gives progress, smoothed with useSpring (stiffness ~120, damping ~30), and useMotionValueEvent sets video.currentTime. Encode with scripts/prepare-video.sh (CRF 20, keyframe every 6 frames) so seeking is instant and frames stay sharp.
- **Responsive:** Mobile: shorter scroll distance (~180vh), 9:16 encode, or fall back to an autoplaying loop + poster if seeking is janky on low-end devices.
- **Requires:** 1 hero video (10–20 s, one continuous camera move — not a loop, ≥ 1920 px wide, the original export — not a web copy); 1 poster image; Mobile 9:16 encode (made by scripts/prepare-video.sh)
- **Fallback:** Image sequence scrub from a still (subtle zoom + crossfade), or switch to the image-led variant.

### Scroll storytelling

scroll → film moves → scene changes → its message arrives → it leaves → next scene. One coordinated timeline.

- Scroll controls time: map the pinned hero scroll range to the full video timeline (0 → duration). Slow scroll moves the film slowly, fast scroll moves it fast, scrolling up plays it backward. Never autoplay the sequence.
- Keep it tightly connected: smooth the progress with useSpring (no lag beyond ~0.3 s), and the scroll encode from scripts/prepare-video.sh (keyframe every 6 frames) so seeking never stutters.
- The film is not here yet: write src/config/scenes.ts now with three messages for the opening, the middle and the end, spread evenly, and say plainly in it that the timings wait for the film. When the film arrives, watch it and move each start and end to what is on screen — the messages may change too; no other code changes.
- One message per scene, about what is on screen right now. It arrives as its scene begins, holds while the scene plays, and leaves before the next scene’s message arrives — never two at once, never at arbitrary scroll points.
- Video and type are one system: drive both from one Motion scroll progress (useScroll), with each text’s useTransform range placed at its scene’s fraction — not two separate animation setups.
- Text transitions, varied per scene: masked line-by-line reveals, short vertical travel (≤ 24px), clip-path wipes, a small tracking or scale change. No repeated plain fade-ins, nothing bouncy.
- Legibility over footage: a soft gradient scrim only behind the text, never a flat dark overlay across the whole film.
- When the film ends, release into the next section without a hard cut (overlap it, or ease the last frame into the page background); later sections keep the same type and spacing.
- Mobile keeps the same story and scene map: shorter scroll distance, 9:16 encode, simpler reveals (opacity + small translate). If seeking stutters on a phone, step through poster stills per scene instead.
- Verify in a real browser at 1440px and 390px: scroll slowly, quickly and upward — each message must appear exactly on its scene.

### Shot list — part by part

What each picture or film shows. Real media is what makes the site premium: find, shoot or make exactly these; until one exists, its part uses a temporary picture of the same subject and format.

| Where | | What it shows | Format |
|---|---|---|---|
| Home · First screen — Scroll-controlled video | film | Ninth Row in one continuous move: the place at its best light, with calm space where the headline sits | 1920×1080 or larger, 10–20 s, one continuous shot with a slow, steady camera move, no cuts — not a loop: it plays forward as visitors scroll; plus a still for the poster |
| Home · Featured Work; Programme · Featured Work | photo | one strong picture of each project — the real work itself, never a mock-up (the same photo leads its project page) | 4 photos (one per project) · 3:2 · 2400×1600 |
| Visit · Location | photo | the way in as visitors arrive — the door, the street, the path | 1 photo · 16:9 · 2400×1350 |
| About · About | photo | a real portrait of the person or the team, in their own place | 1 photo · 16:9 · 2400×1350 |
| About · Team | photo | one portrait per person, in the same light and framing, ideally where they work | 4 photos (one per person) · 3:2 · 2000×1333 |

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon. Until the owner’s own exists: the name set as a wordmark in the display face, and its first letter as the favicon — no invented symbol to throw away later. The favicon is a file (src/app/icon.svg, the letter as a path), never a generated icon route: one that fetches a font at build time breaks static hosting and builds without a network (Kelp Line) |
| ⌕ Find it | Typefaces | 3 families | required | All text | Sofia Sans Extra Condensed, Sofia Sans Condensed, Sofia Sans (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ⚠ Temporary placeholder | Hero video | 1 clip | required | Hero (loop or scroll-controlled) | 1920×1080 min, 10–20 s, one continuous move, not a loop, no text burned in |
| ⚠ Temporary placeholder | Poster image | 1 image | required | Shown before video loads and on reduced motion | First frame of the video, same crop |
| ⚠ Temporary placeholder | Mobile video encode | 1 clip | recommended | Hero on small screens — made from the hero video by scripts/prepare-video.sh | 1080×1920 (9:16), ≤ 3MB |
| ⚠ Temporary placeholder | Supporting images | 10 photos | required | The parts in the shot list (recipe/media.md): Featured Work, Location, About, Team | One file per shot-list slot, at the size and ratio it gives; one grade across all |
| ○ Optional | Secondary video | 1–2 clips | optional | Chapter transitions | Same grade as the hero |
| ⚠ Temporary placeholder | Scrub-ready encode | 1 file | required | Scroll-controlled hero | Made by scripts/prepare-video.sh from the ORIGINAL file: CRF 20, keyframe every 6 frames, ≤ 1920 px |
| ○ Optional | Texture | 1–2 | optional | Subtle paper/grain overlay at ≤ 4% opacity | Seamless tile, 1024px, WebP |

### Asset Creation Paths

#### Turn an image into your hero video
1. Pick one strong still with depth (foreground + background) and a clear focal point.
2. Generate 3–4 takes with the prompt below in an image-to-video tool.
3. Choose the steadiest take; keep 10–20 s; export the original at 1920×1080 or larger.
4. Run bash scripts/prepare-video.sh on that original — it writes the desktop, phone and scroll encodes and both posters into public/media under the names the asset layer expects.
5. No code changes needed.

**Prompt:**

> Slow, continuous cinematic camera movement (gentle forward dolly) through the scene in the reference image. Mood: nostalgic, warm, dramatic. Lighting and color stay faithful to the image; deep shadows, soft highlights. No cuts, no text, no people entering the frame, no sudden motion. Subtle atmospheric movement only (light, air, fabric, water). Duration 10–20 seconds, 16:9, 24fps, stable horizon, one move forward from start to end (visitors scroll through it — not a loop).

- Source: Your image
- Creation: Image → Video
- Suggested motion: Slow cinematic forward camera movement
- Suggested duration: 10–20 s
- Aspect ratio: 16:9 (plus 9:16 for mobile)
- Usage: Scroll-controlled video

Tools: Runway, Kling AI, Luma, Google Flow, Higgsfield

#### Use a temporary video now, replace it later
1. Search free libraries for a slow, single-shot clip that matches the palette.
2. Download 1080p; mark it as temporary in the asset manifest.
3. Replace before launch — the asset layer makes this a one-line change.

Tools: Pexels Videos, Coverr, Mixkit

#### Find or shoot a consistent photo set
1. Collect 15–20 candidates with the same light direction and color temperature.
2. Select 6–10; apply one shared grade (same warmth, contrast, grain).
3. Export 2400px long edge; let next/image generate responsive sizes.
4. Crop mobile versions with the focal point centred.

Tools: Unsplash, Pexels, Squoosh
