import { chromeNote, validateRecipe } from '@/features/recipes/engine'
import { TYPE_UTILITIES, typeVars } from '@/lib/type-tokens'
import { FRAMES, TONE_CSS, errorColor, frameVars, toneVars } from '@/lib/frame'
import type { AssetManifest, PageSection, PaletteColors, UniversalRecipe } from '@/types/domain'

/** Every section in build order: shared navbar, then each page's own sections (tagged with its page label), then shared footer. */
export function flattenPages(r: UniversalRecipe): (PageSection & { page: string | null })[] {
  return [
    { ...r.chrome.navbar, page: null },
    ...r.pages.flatMap((p) => p.sections.map((s) => ({ ...s, page: p.label }))),
    { ...r.chrome.footer, page: null },
  ]
}

export function assertComplete(r: UniversalRecipe) {
  const missing = validateRecipe(r)
  if (missing.length) throw new Error(`Recipe incomplete — missing: ${missing.join(', ')}`)
}

/** The photos the site needs, one entry per shot-list row: its files (one per slot; a per-item row repeats them for
 *  every item, `{item}` in the path), size, ratio and what it shows. Uploaded photos fill the slots in shot order, a
 *  photo uploaded on a part first goes to that part. */
export function shotAssets(r: UniversalRecipe) {
  const uploaded = providedFilePaths(r).filter((f) => r.assetRequirements.find((a) => a.key === f.key)?.set)
  const place = (f: (typeof uploaded)[number]) => r.metadata.spec.uploads?.find((u) => u.fileId === f.fileId)?.place
  const used = new Set<string>()
  const take = (where: string) => {
    const f = uploaded.find((x) => !used.has(x.fileId) && place(x) && where.includes(place(x)!.split(' · ').pop()!)) ?? uploaded.find((x) => !used.has(x.fileId))
    if (f) used.add(f.fileId)
    return f?.webPath
  }
  const statusOf = (s: UniversalRecipe['media']['shots'][number]) =>
    r.assetRequirements.find((a) => a.set && (s.key === 'hero' || /product|collection|categor/i.test(s.key) ? a.asset === 'product-photos' : a.asset === 'images'))?.status
    ?? r.assetRequirements.find((a) => a.set)?.status ?? (r.metadata.spec.mediaPlan === 'temporary' ? 'temporary' : 'find')
  return r.media.shots.filter((s) => s.kind === 'photo').map((s) => {
    const dir = s.per ? `/media/${s.key}/{${s.per}}` : `/media/${s.key}`
    const files = Array.from({ length: s.count }, (_, i) => (s.per ? null : take(s.where)) ?? (s.count === 1 && !s.per ? `/media/${s.key}.jpg` : `${dir}-${i + 1}.jpg`))
    const [w, h] = (s.size ?? '0×0').split('×').map(Number)
    return { key: s.key, files, width: w, height: h, ratio: s.ratio ?? '', shows: s.shows, where: s.where, per: s.per, status: files.every((f) => uploaded.some((u) => u.webPath === f)) ? 'have' as const : statusOf(s) }
  })
}

export function assetManifest(r: UniversalRecipe): AssetManifest {
  return {
    ...Object.fromEntries(r.assetRequirements.filter((a) => !a.set).map((a) => [a.key, {
      required: a.level === 'required', level: a.level, status: a.status, source: a.source, replaceWith: a.replaceWith, usage: a.usage, specs: a.specs,
      providedFiles: a.providedFiles,
    }])),
    ...Object.fromEntries(shotAssets(r).map((s) => [s.key, {
      required: true, level: 'required' as const, status: s.status, source: s.status === 'have' ? 'user-provided' : s.status === 'temporary' ? 'curated-placeholder' : 'see recipe/media.md → Shot list',
      replaceWith: s.status === 'have' ? '—' : 'user-owned-images', usage: s.where, specs: `${s.files.length} file${s.files.length > 1 ? 's' : ''}${s.per ? ` per ${s.per}` : ''} · ${s.ratio} · ${s.width}×${s.height} — ${s.shows}`,
    }])),
  }
}

export const manifestJson = (r: UniversalRecipe) => JSON.stringify({ recipe: r.id, title: r.title, assets: assetManifest(r) }, null, 2) + '\n'

export const extOf = (name: string) => (/\.([a-z0-9]+)$/i.exec(name)?.[1] ?? 'bin').toLowerCase()

/** Where each file the user actually uploaded will land inside the generated project / zip — matches assetsConfigTs. */
export function providedFilePaths(r: UniversalRecipe) {
  return r.assetRequirements
    .filter((a) => a.providedFiles?.length)
    .flatMap((a) => a.providedFiles!.map((f, i) => ({
      key: a.key, fileId: f.fileId, name: f.name,
      webPath: `/media/${a.key}${a.providedFiles!.length > 1 ? `-${i + 1}` : ''}.${extOf(f.name)}`,
    })))
    .map((f) => ({ ...f, zipPath: `public${f.webPath}` }))
}

export function tokensCss(r: UniversalRecipe) {
  const t = r.visualSystem.typography
  const hex0 = Object.fromEntries(r.visualSystem.palette.tokens.map((c) => [c.role, c.hex])) as PaletteColors
  const colors = [...r.visualSystem.palette.tokens.map((c) => `  --color-${c.role}: ${c.hex};`), `  --color-error: ${errorColor(hex0)}; /* form errors and failed states only — never decoration */`, ...(r.visualSystem.rotation?.colors.map((c, i) => `  --color-chapter-${i + 1}: ${c}; /* ${r.visualSystem.rotation!.name} — chapter ${i + 1} */`) ?? [])].join('\n')
  // Each role reads the variable next/font sets (variable: '--font-<family>' in app/layout.tsx), the family name until then.
  const fonts = (['display', 'heading', 'body', 'utility'] as const).map((k) => `  --font-${k}: var(--font-${t[k].family.toLowerCase().replace(/[^a-z0-9]+/g, '-')}, '${t[k].family}');`).join('\n')
  const sh = r.visualSystem.shape
  const shape = `  /* Shape: ${sh.name} — ${sh.rule} */\n  --radius-button: ${sh.button};\n  --radius-card: ${sh.card};\n  --radius-media: ${sh.media};\n  --shadow-card: ${sh.shadow};`
  const type = Object.entries(typeVars(t)).filter(([k]) => !k.startsWith('--font-')).map(([k, v]) => `  ${k}: ${v};`).join('\n')
  const hex = Object.fromEntries(r.visualSystem.palette.tokens.map((c) => [c.role, c.hex])) as PaletteColors
  const frame = Object.entries({ ...frameVars(FRAMES[r.layoutSystem.id]), ...toneVars(hex, r.visualSystem.rotation?.colors[0]) }).map(([k, v]) => `  ${k}: ${v};`).join('\n')
  return `/* ${r.title} — design tokens generated by OpusKit */\n@import "tailwindcss";\n\n@theme {\n${colors}\n${fonts}\n${shape}\n  --spacing: 4px;\n}\n\n:root {\n  color-scheme: ${r.visualSystem.palette.dark ? 'dark' : 'light'}; --border-ui: ${sh.border};\n  /* Frame — ${r.layoutSystem.name}: the page container, side gutter, section spacing and card / media proportions every section uses */\n${frame}\n  /* Type roles — use the type-display / type-heading / type-body / type-utility classes */\n${type}\n}\n\n${TYPE_UTILITIES}\n/* Captions, small labels, prices beside pictures: the body face, small, sentence case — the utility role stays for the menu and labels it was made for */\n@utility type-caption { font-family: var(--font-body), var(--type-body-fallback, sans-serif); font-size: 0.8125rem; font-weight: var(--type-body-weight); line-height: 1.45; letter-spacing: 0; }\nbody { background: var(--color-background); color: var(--color-text); font-family: var(--font-body), var(--type-body-fallback, sans-serif); }\n\n/* Section tones: <XSection tone="surface | inverse | chapter"> sets data-tone; the page rhythm is in recipe/layout.md */\n${TONE_CSS}\n`
}

export function assetsConfigTs(r: UniversalRecipe) {
  const provided = providedFilePaths(r)
  // Files the owner has (logo, film, poster, 3D…) — the photo sets are listed per shot below. Optional rows stay in the
  // checklist only: an entry no part uses sent builders inventing a job for it (Halden's secondary video, #20).
  const entries = r.assetRequirements
    .filter((a) => !a.set && a.level !== 'optional' && ['images', 'video', 'product-photos', 'illustrations', '3d', 'audio', 'stickers'].includes(a.asset))
    .map((a) => {
      const mine = provided.filter((f) => f.key === a.key).map((f) => f.webPath)
      const fallback = `/media/${a.key}.${a.asset === 'video' ? 'mp4' : a.asset === '3d' ? 'glb' : a.asset === 'audio' ? 'mp3' : a.asset === 'stickers' ? 'png' : 'jpg'}`
      const paths = mine.length ? mine : [fallback]
      const gallery = paths.length > 1 ? `, gallery: ${JSON.stringify(paths)}` : ''
      const film = r.media.shots.find((x) => x.kind === 'film')
      const alt = a.asset === 'video' || a.asset === 'audio' || a.asset === '3d' ? '' : /poster/i.test(a.label) && film ? film.shows : a.usage
      return `  ${a.key}: { src: ${JSON.stringify(paths[0])}, alt: ${JSON.stringify(alt)}, status: '${a.status}', usage: ${JSON.stringify(a.usage)}${gallery} },`
    })
  const shots = shotAssets(r).map((s) =>
    `  // ${s.where}${s.per ? ` — one set per ${s.per}: replace {${s.per}} with each ${s.per}'s slug` : ''}\n  ${s.key}: { src: ${JSON.stringify(s.files[0])}, ${s.files.length > 1 ? `files: ${JSON.stringify(s.files)}, ` : ''}width: ${s.width}, height: ${s.height}, ratio: '${s.ratio}', alt: ${JSON.stringify(s.shows)}, status: '${s.status}' },`)
  return `// Asset reference layer. Components never hardcode media paths — they ask for a key.\n// One entry per row of the shot list (recipe/media.md): its files at the exact size and ratio given, so a real photo\n// replaces a temporary one file for file. alt starts as what the shot shows — rewrite it from the real photo.\n// Paths under files you uploaded during creation point at the real file, already included in this package.\nexport const assets = {\n${[...entries, ...shots].join('\n')}\n} as const\n\nexport type AssetKey = keyof typeof assets\n`
}

export function visualQa(r: UniversalRecipe): string[] {
  const t = r.visualSystem.typography
  return [
    `Background is ${r.visualSystem.palette.tokens[0].hex}; no other page background colors are introduced.`,
    `Display text uses ${t.display.family} ${t.display.weight}; body uses ${t.body.family}; no other families appear.`,
    r.visualSystem.rotation ? `Colour chapters (${r.visualSystem.rotation.name}): each chapter section owns one accent as a full colour field (--color-chapter-1..3, in turn); never two chapter colours in one view, and text never sits on them without AA contrast.` : `Accent ${r.visualSystem.palette.tokens.find((x) => x.role === 'accent')?.hex} covers < 5% of any viewport.`,
    `Pages: ${r.pages.map((p) => p.label).join(' · ')} — every page shares the same navbar and footer${r.pages.some((p) => p.hide) ? `, except: ${r.pages.filter((p) => p.hide).map((p) => `${p.label} — ${chromeNote(p).toLowerCase()}`).join('; ')} Leave them out with a route group whose own layout.tsx omits them — never render and hide with CSS` : ''}.`,
    `Footer “${r.chrome.footerStyle.name}”: ${r.chrome.footerStyle.composition}`,
    ...r.pages.map((p) => p.sections.length ? `${p.label} section order: ${p.sections.map((s) => s.name.split(' — ')[0]).join(' → ')}.` : `${p.label}: built from its copy deck entry (recipe/content.md), in the site's type, spacing and controls.`),
    `Hero matches "${r.media.hero.name}": ${r.media.hero.composition}`,
    ...r.pages.flatMap((p) => p.sections.filter((s, i) => s.id === 'hero' && i > 0).map(() => `${p.label}: the hero sits mid-page exactly where the section order puts it — a full-width band after the sections above it, not moved to the top; the page's first section carries the h1.`)),
    `Controls and forms use shadcn/ui restyled to the recipe tokens and shape (from: ${r.implementation.ui.components.map((c) => c.slug).join(', ')}) — no unstyled native select, date input or checkbox anywhere${r.implementation.ui.components.some((c) => c.slug === 'calendar') ? '; the date field is a Calendar in a Popover' : ''}; every form says where it goes (an email the visitor sends, or the owner's service) and none fakes a sent message.`,
    'Sections with reference code in src/components/sections/ keep its design (real copy and media, no placeholder text left) and are fitted into this site: tokens only, the site’s type sizes and spacing, the code edited wherever its defaults disagree. Pass the framework link as `link` (Next.js: `link={Link}` from next/link) so in-site links navigate client-side and respect basePath; without it they render plain <a>.',
    ...r.pieces.map((p) => `Kit piece "${p.name}" (<${p.exportName}/> from ${p.path}) is used on ${p.where}: it does what the owner picked it for, and its size, place and the type around it follow the site.`),
    ...ONE_SYSTEM,
    'Locked items are as the owner chose them: palette, lettering, pages and their part order, each part’s design, menu, footer, shape, first screen, the copy’s facts and the owner’s files (recipe/design.md → Room to invent).',
    `The site reads as ${r.style.look} beyond its tokens: at least three of the style’s moves are in it, and none of its traps (recipe/design.md → What ${r.style.look} is known for).`,
    'Every page has one remembered moment; each one the builder designed is named in the final reply, belongs to this owner (their words, pictures or trade) and has a mobile and a reduced-motion version.',
    ...(r.concept ? [`Big idea “${r.concept.name}” is visible on every page: ${r.concept.motif.charAt(0).toLowerCase()}${r.concept.motif.slice(1)}`, `Chapters open as the big idea says: ${r.concept.chapters}`, `The site ends as the big idea says: ${r.concept.ending}`] : []),
    ...r.signatures.map((s) => `Signature moment "${s.name}" is built on ${s.where}, with its mobile and reduced-motion versions.`),
    'Every page passes the award checklist in the recipe (one idea, one remembered moment per page, type scale contrast, motion choreography, mobile as its own composition, a designed ending).',
    ...r.pages.flatMap((p) => p.sections.flatMap((s) => (s.photos ? [`${p.label} → ${s.name.split(' — ')[0]}: photos shown as "${s.photos.name}", every picture visible as the layout intends.`] : []))),
    ...(r.media.imagery?.note ? [`The owner's request about photos is met: “${r.media.imagery.note}”.`] : []),
    ...(r.media.framing ? [r.metadata.spec.videoFrame === "original" ? "Owner’s video keeps its own shape on every screen — never cropped wide or stretched." : "Owner’s video fills desktop and tablet screens at 16:9 (no bars, no stretching, no narrow strip); phones play the original shape."] : []),
    ...(r.assetRequirements.some((a) => a.asset === "video") ? [`Video: public/media/${r.media.hero.id.startsWith("scroll-video") ? "scrubReadyEncode.mp4" : "heroVideo.mp4"} and mobileVideoEncode.mp4 exist and were produced by prepare-video.sh (not raw browser uploads); the poster images (posterImage.jpg, posterMobile.jpg) exist and paint before the video; prepare-video.sh printed no ⚠.`, "Video sharpness: ffprobe shows heroVideo.mp4 ≥ 1920 px wide and mobileVideoEncode.mp4 ≥ 1080 px tall — if not, re-run prepare-video.sh (it sharpens small sources) rather than letting the browser stretch it."] : []),
    ...(r.media.storytelling ? ['Scroll film: forward, fast and backward scrolling move the video with the scroll; every scene message appears on its own scene, one at a time (desktop and 390px).'] : []),
    `Layout: ${r.layoutSystem.columns}; section spacing ${r.layoutSystem.sectionSpacing}.`,
    `Shape “${r.visualSystem.shape.name}”: buttons ${r.visualSystem.shape.button}, cards ${r.visualSystem.shape.card}, media ${r.visualSystem.shape.media} radius (rounded-button / rounded-card / rounded-media) — ${r.visualSystem.shape.rule}`,
    `Menu “${r.chrome.nav.name}”: ${r.chrome.nav.composition}`,
    ...[...r.creativeDirection.avoid, ...r.creativeDirection.genericAvoid].map((a) => `Absent: ${a}.`),
    'Mobile (390px): no horizontal scroll, headlines re-broken intentionally, touch targets ≥ 44px.',
    'prefers-reduced-motion: every animation has its documented alternative.',
    'Every media element is rendered through the asset config layer; temporary assets are listed in the manifest.',
    r.metadata.spec.lead === 'video' ? 'Lighthouse on mobile: LCP < 2.5s with the poster still as the LCP element, CLS < 0.1.' : 'Lighthouse on mobile: LCP < 2.5s, CLS < 0.1.',
  ]
}

/** The site reads as one design, not parts pasted side by side: what the yunisaslanov build got wrong (a menu whose
 *  links were narrower, smaller and higher than the logo and button beside them). Checked on every part. */
export const ONE_SYSTEM = [
  'One system: things of one kind look alike everywhere — menu links, footer links, labels and button text share one face, width and size step; headings of one level share one size.',
  'Every row lines up: the items of one row (the menu’s logo, links and button; a card’s title and meta) share one vertical centre or baseline — none sits higher because of padding it brought along.',
  'Nothing looks pasted in: no part keeps a size, padding, width or font from its reference code that its neighbours do not share.',
]

/** How the coding agent should work: build everything in one pass, stop only when truly blocked. */
export function workingRules(r: UniversalRecipe, plan: string, qa: string): string {
  return `## How to work
- Build the complete site in one pass: every page, section and step in ${plan}, in order. Do not stop between steps to ask for review, confirmation or permission to continue.
- Start by writing a short plan (6–10 lines: visual direction, hero${r.media.storytelling ? ', the scroll-film scene map' : ''}, motion, how desktop and mobile differ, and the moment you will design for each page — Room to invent), then implement immediately — do not wait for approval.
- The code in \`src/components/sections/\`${r.pieces.length ? ' and \\`src/components/pieces/\\`' : ''} is a reference, not a part to paste: it shows each part's design and does the hard work (layout, animation, shaders, reduced motion). Build every part as this site's own — keep its idea and behaviour, take its sizes, spacing, type and alignment from the site, and edit its code wherever its defaults disagree with what sits around it.
- After each step, check it against ${qa} yourself and fix what fails before moving on.
- Before calling it done, look at every page at 1440px and 390px as a stranger would: whatever sits off the line its neighbours share, differs in size or width from things of its kind, or looks pasted in from another site is a defect — fix it where it comes from.
- Only stop to ask when truly blocked: a required file is missing and the recipe gives no temporary option, or two recipe rules contradict each other.
- When finished: run the production build, fix every build and runtime error, check desktop (1440px) and mobile (390px) in a real browser, start the dev server and reply with the localhost URL, the moments and details you invented (one line each, with the page), and any temporary assets still to replace.
`
}

export const frontmatter = (fields: Record<string, string | boolean>) =>
  `---\n${Object.entries(fields).map(([k, v]) => `${k}: ${typeof v === 'string' && /[:#"']/.test(v) ? JSON.stringify(v) : v}`).join('\n')}\n---\n\n`
