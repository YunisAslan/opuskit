// OpusKit domain model. Independent from UI — safe to import anywhere (server, client, scripts).

import type { ImageKey } from '@/data/images'

// ─── Taxonomy ids ────────────────────────────────────────────────────────────

export type PurposeId =
  | 'portfolio' | 'agency' | 'studio' | 'fashion' | 'restaurant' | 'ecommerce'
  | 'product' | 'saas' | 'personal-brand' | 'experiment' | 'other'
  | 'blog' | 'event' | 'nonprofit' | 'real-estate' | 'hotel' | 'course' | 'clinic'

export type FamilyId =
  | 'quiet' | 'editorial' | 'cinematic' | 'minimal' | 'bold' | 'raw' | 'organic' | 'experimental' | 'futuristic'

export type DirectionId =
  | 'japanese-minimal' | 'scandinavian-minimal' | 'architectural-minimal' | 'monochrome-minimal'
  | 'luxury-editorial' | 'fashion-editorial' | 'art-editorial' | 'swiss-editorial'
  | 'dark-cinematic' | 'cinematic-editorial' | 'immersive-portfolio' | 'film-inspired'
  | 'swiss-modern' | 'typography-first' | 'neo-brutalist' | 'raw-editorial'
  | 'organic-modern' | 'warm-hospitality' | 'art-direction' | 'digital-futurism' | 'technical-minimal'
  | 'soft-pastel' | 'coastal-calm' | 'modern-heritage' | 'news-grid' | 'gothic-modern' | 'retro-seventies'
  | 'playful-pop' | 'y2k-chrome' | 'bento-product' | 'sticker-studio'
  | 'synthwave' | 'cyberpunk' | 'pixel-art' | 'scrapbook' | 'surrealism' | 'maximalism' | 'conceptual-sketch' | 'ethereal' | 'bohemian' | 'victorian'

export type CharacterId =
  | 'elegant' | 'warm' | 'mysterious' | 'playful' | 'technical' | 'futuristic' | 'sophisticated' | 'raw' | 'cheeky'

export type LeadId = 'photography' | 'video' | 'typography' | 'product' | 'illustration' | '3d'
export type MotionLevel = 'still' | 'subtle' | 'dynamic' | 'immersive'
export type LayoutId = 'balanced' | 'editorial' | 'asymmetric' | 'grid' | 'full-bleed' | 'experimental'

export type PaletteId =
  | 'apricot-hall' | 'yerba-leaf' | 'console-lilac' | 'limestone' | 'graphite-sand' | 'olive-grove' | 'lido-blue' | 'bubblegum' | 'mulberry' | 'mustard' | 'midnight-chapters'
  | 'signal-white' | 'wet-concrete' | 'legal-pad' | 'pink-plaster' | 'klein-field'
  | 'hazard-yellow' | 'bottle-green' | 'night-ink' | 'plum-velvet' | 'oxblood-room' | 'black-box'
  | 'grading-suite' | 'espresso' | 'lavender-haze' | 'cherry-red' | 'mint-fresh' | 'chrome-silver' | 'electric-lime'
  | 'butter-cup' | 'cobalt-sky' | 'studio-aqua'
  | 'neon-sunset' | 'night-market' | 'arcade'
  | 'grape-soda' | 'signal-orange' | 'paper-cobalt' | 'gallery-grey' | 'sage-white' | 'charcoal-signal' | 'warm-black'

export type TypographyId =
  | 'gallery-hours' | 'two-scripts' | 'funnel' | 'wide-spec' | 'diner-serif' | 'private-collection' | 'kalnia-couture' | 'poster-caps' | 'campus' | 'stack'
  | 'quiet-page' | 'ink-and-paper' | 'soft-couture' | 'printed-word' | 'opening-credits' | 'gala-night'
  | 'loud-and-clear' | 'grid-discipline' | 'photocopy-zine' | 'workshop-manual' | 'corner-bakery'
  | 'main-street' | 'stretch-test' | 'high-low' | 'control-room' | 'data-sheet'
  | 'soft-seventies' | 'round-future' | 'letterpress-modern' | 'new-gothic' | 'friendly-app' | 'newsroom'
  | 'moonlit-italic' | 'swiss-italic' | 'bubble-pop' | 'poster-warp' | 'two-voice'
  | 'neon-drive' | 'terminal-city' | 'eight-bit' | 'sketchbook' | 'parlour' | 'dreamlight' | 'wanderer' | 'cut-and-paste' | 'dream-logic' | 'loud-mix'
  | 'plain-giant' | 'cut-glass' | 'real-ink' | 'tall-order' | 'signature' | 'horizon' | 'soft-wedge' | 'projection' | 'kind-words' | 'dial' | 'fat-chance'

export type HeroId =
  | 'editorial-image' | 'parallax-photo' | 'ambient-video' | 'scroll-video' | 'scroll-video-page' | 'type-statement'
  | 'kinetic-type' | 'product-stage' | 'illustrated' | 'webgl-scene' | 'orbit-stickers'

export type AssetId =
  | 'logo' | 'images' | 'video' | 'product-photos' | 'illustrations' | '3d' | 'fonts' | 'copy' | 'stickers' | 'audio'

/** How a set of photos is laid out on the site (see data/patterns.ts → imagePresentations). */
export type ImagePresentationId =
  | 'single-feature' | 'editorial-sequence' | 'lookbook-spreads' | 'masonry-gallery' | 'uniform-grid' | 'hover-reveal'
  | 'horizontal-rail' | 'swipe-carousel' | 'marquee-rows' | 'tilted-grid' | 'card-stack'
  | 'infinite-canvas' | 'ring-3d' | 'dome-gallery' | 'liquid-glass'
/** calm = static layouts · moving = scroll/drag motion · immersive = WebGL/3D, the photos become the experience. */
export type ImagePresentationGroup = 'calm' | 'moving' | 'immersive'
export type ImagePresentation = {
  id: ImagePresentationId; group: ImagePresentationGroup; name: string; line: string; ideal: string
  composition: string; behavior: string; responsive: string
  /** Ready-made components to start from (copy-paste / shadcn registry) — adapt to the recipe's tokens, never ship their demo styling. */
  components: { name: string; url: string }[]
  resources: string[]
  /** The kit piece that implements it — shipped as code whenever this layout is chosen. */
  piece?: PieceId
}
/** The photo plan the engine resolved: the user's choice, or the recommendation from their photos and brief. */
export type ImageryPlan = { presentation: ImagePresentation; photos: number; orientation: string; recommended: ImagePresentationId; why: string; note?: string }

/** How the user wants to solve missing lead media. */
export type MediaPlan = 'have' | 'image-to-video' | 'temporary' | 'image-alternative'

export type BuildTargetId = 'claude-code' | 'cursor' | 'v0' | 'lovable' | 'own-code' | 'not-sure'

export type GoalId = 'contact' | 'book' | 'buy' | 'signup' | 'subscribe' | 'explore' | 'call' | 'visit' | 'donate' | 'apply' | 'download'


export type SectionId =
  | 'navbar' | 'hero' | 'intro' | 'featured-work' | 'case-study' | 'services' | 'process' | 'about'
  | 'gallery' | 'editorial-story' | 'manifesto' | 'clients' | 'menu' | 'reservation' | 'location'
  | 'collection' | 'lookbook' | 'product-grid' | 'product-highlight' | 'feature-grid' | 'how-it-works'
  | 'pricing' | 'faq' | 'journal' | 'contact-cta' | 'footer' | 'chapters' | 'testimonials' | 'team' | 'stats'
  | 'feature-rows' | 'newsletter' | 'categories' | 'press' | 'cta-band' | 'trust' | 'schedule' | 'integrations' | 'timeline' | 'donate' | 'listen' | 'curriculum' | 'product-buy' | 'specs' | 'article'

export type PageTypeId =
  | 'home' | 'work' | 'about' | 'contact' | 'services' | 'collections' | 'shop' | 'product-detail'
  | 'cart' | 'checkout' | 'account' | 'features' | 'pricing' | 'faq' | 'journal' | 'experiment'
  | 'menu' | 'gallery' | 'reservations' | 'sign-in' | 'sign-up' | 'privacy-policy' | 'terms-of-service'
  | 'cookie-policy' | 'not-found' | 'accessibility' | 'custom' | 'donate' | 'listen' | 'project' | 'article'
  | 'team' | 'careers' | 'testimonials' | 'press' | 'integrations' | 'changelog' | 'security' | 'comparison'
  | 'partners' | 'shipping-returns' | 'size-guide' | 'gift-cards' | 'locations' | 'catering' | 'order-online'
  | 'newsletter' | 'wholesale'

export type PageTier = 'recommended' | 'optional' | 'utility'

export type ComponentId =
  | 'Navigation' | 'Hero' | 'MediaSection' | 'ProjectCard' | 'Gallery' | 'FeatureBlock' | 'Quote' | 'CTA'
  | 'Footer' | 'ProductCard' | 'MenuList' | 'ReservationForm' | 'PricingTable' | 'Marquee' | 'SectionHeader'
  | 'Accordion' | 'LookbookSpread' | 'ServiceList' | 'StatementBlock' | 'MediaAsset'

// ─── Knowledge base entities (ingredients) ───────────────────────────────────

export type Compat = {
  tags: string[]
  compatibleWith?: DirectionId[]
  incompatibleWith?: DirectionId[]
}

/** `sections` overrides the PageType's default section list when this purpose needs a different mix. */
export type PurposePage = { type: PageTypeId; label: string; tier: PageTier; sections?: SectionId[] }

export type Purpose = {
  id: PurposeId
  name: string
  noun: string // used in composed titles: "Portfolio", "Restaurant Site"
  hint: string
  pages: PurposePage[]
  components: ComponentId[]
  ctaPattern: string
  /** Other ways to start this kind of site (a development, not an agency; a festival, not a wedding). */
  starters?: { id: string; name: string; hint: string; pages: PurposePage[] }[]
}

/** What a visitor should do. `page` = the page this goal needs; `cta` = button wording, best first. */
export type Goal = { id: GoalId; name: string; line: string; effect: string; page?: PageTypeId; cta: string[] }

export type Family = {
  id: FamilyId
  name: string
  line: string // one-line, non-technical feeling
  directions: DirectionId[]
}

export type Direction = Compat & {
  id: DirectionId
  name: string
  families: FamilyId[]
  line: string
  description: string
  baseRecipe: string // slug of the seed recipe used as the curated base
  mood: string[]
  principles: string[]
  do: string[]
  avoid: string[]
  defaults: { palette: PaletteId; typography: TypographyId; layout: LayoutId; lead: LeadId; motion: MotionLevel }
  /** When set, the layout decision is implied by the direction and the question is skipped. */
  layoutLocked?: LayoutId
  palettes: PaletteId[]
  typography: TypographyId[]
  why: string
  image: ImageKey
  /** Default voice when nobody picked one (the showcase asks no questions). */
  voice?: CharacterId
  /** Default colour chapters (see data/ingredients accentSets). */
  rotation?: AccentSetId
  /** Preferred first screen and menu for this look, when they fit the lead and motion. */
  hero?: HeroId
  nav?: NavStyleId
}

export type Character = {
  id: CharacterId
  name: string
  adjective: string
  line: string
  tone: string[]
  voice: string
  headlineStyle: string
  wordsToUse: string[]
}

export type ColorRole = 'background' | 'surface' | 'text' | 'muted' | 'primary' | 'secondary' | 'accent' | 'border'
export type PaletteColors = Record<ColorRole, string>

/** Colour chapters: 3 accents that rotate section by section over any palette (one full colour field per chapter). */
export type AccentSetId = 'sticker-pop' | 'riso-print' | 'fruit-market'
export type AccentSet = { id: AccentSetId; name: string; line: string; colors: [string, string, string]; why: string }

export type Palette = Compat & {
  id: PaletteId
  name: string
  line: string
  dark: boolean
  colors: PaletteColors
  usage: Partial<Record<ColorRole, string>>
  why: string
}

export type FontSpec = {
  family: string
  weight: number
  size: string // CSS value, e.g. "clamp(3rem, 8vw, 7.5rem)"
  lineHeight: string
  letterSpacing: string
  use: string
  italic?: boolean
  uppercase?: boolean
  /** font-stretch for width-axis families, e.g. '125%' */
  stretch?: string
}

export type TypographyPairing = Compat & {
  id: TypographyId
  name: string
  line: string
  display: FontSpec
  heading: FontSpec
  body: FontSpec
  utility: FontSpec
  /** Google Fonts css2 family params, e.g. "Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300" */
  googleFamilies: string[]
  source: string
  why: string
  sample: string
}

/** Where a section sits: the page ground, the surface, the inverse (text colour as ground) or a chapter colour. */
export type SectionTone = 'ground' | 'surface' | 'inverse' | 'chapter'
/** How an image + text section places its media: beside the text, full width above it, or with the text over it. */
export type MediaPlacement = 'side' | 'full' | 'over'

export type LayoutPattern = Compat & {
  id: LayoutId
  name: string
  line: string
  container: string
  grid: string
  columns: string
  gutters: string
  sectionSpacing: string
  alignment: string
  heroComposition: string
  cardProportions: string
  mediaProportions: string
  why: string
}

export type HeroPattern = {
  id: HeroId
  name: string
  leads: LeadId[]
  motion: MotionLevel[]
  composition: string
  behavior: string
  responsive: string
  requires: string[]
  fallback: string
  forcesLayout?: LayoutId
}

export type AssetSpec = {
  asset: AssetId
  label: string
  quantity: string
  level: 'required' | 'recommended' | 'optional'
  usage: string
  specs: string
}

export type MediaPattern = {
  lead: LeadId
  name: string
  direction: string
  treatment: string[]
  formats: string
  assets: AssetSpec[]
  fallback: string
  why: string
}

export type MotionPattern = {
  id: string
  name: string
  levels: MotionLevel[]
  leads?: LeadId[] // omitted = any lead
  purpose: string
  trigger: string
  behavior: string
  duration: string
  easing: string
  implementation: string
  tech: 'css' | 'motion' | 'lenis' | 'three'
  performance: string
  reducedMotion: string
}

/** A memorable interactive component, placed on one section. `fits`: purposes and direction tags/families it suits best. */
/** A ready-made component to start from — adapt it to the recipe's tokens and type, never ship its demo styling. */
export type LibraryComponent = { name: string; url: string }

// ─── Pieces (the kit: ready components users collect and a recipe ships as code) ───
export type PieceId =
  | 'text-effect' | 'text-scramble' | 'text-roll' | 'text-loop' | 'spinning-text' | 'text-reveal' | 'split-flap'
  | 'number-ticker' | 'marquee' | 'image-comparison' | 'ring-carousel' | 'image-field' | 'tilted-grid' | 'image-trail' | 'tilt'
  | 'scroll-progress' | 'velocity-band' | 'sticky-cards' | 'cursor-area' | 'magnetic' | 'hover-highlight'
  | 'grid-pattern' | 'grain' | 'magnet-lines' | 'video-dialog'
  | 'media-between-text' | 'parallax-floating' | 'cut-reveal' | 'underline-fill' | 'drag-photos' | 'text-along-path' | 'shader-grain' | 'shader-dither'
  | 'duo-headline' | 'scribble-link' | 'wavy-link' | 'swap-button' | 'stickers' | 'blob-transition' | 'brand-cursor' | 'cookie-note'
  | 'curtain-transition' | 'preloader' | 'smooth-scroll' | 'ambient-sound' | 'fade-transition' | 'entry-gate' | 'chapter-colours' | 'lightbox' | 'pinned-stage'
/** Where a piece lives on the page. A kit holds at most one piece per slot, so the site keeps one voice. */
/** 'site' pieces work across the whole site (page transition, cursor, cookie notice) and are chosen in the Design step. */
export type PieceSlot = 'headline' | 'label' | 'statement' | 'numbers' | 'photos' | 'scroll' | 'pointer' | 'background' | 'video' | 'button' | 'decor' | 'open' | 'site'
export type Piece = {
  id: PieceId; name: string; line: string; slot: PieceSlot
  /** Library it was adapted from (MIT) or uses as a dependency (Apache-2.0) — both allow shipping inside every Build Package. */
  source: { library: 'Motion Primitives' | 'Magic UI' | 'Cult UI' | 'Animata' | 'Componentry' | 'Fancy Components' | 'Paper Shaders' | 'OpusKit'; url: string; copyright: string; license: 'MIT' | 'Apache-2.0' }
  file: string; exportName: string; deps: string[]
  /** Motion levels it belongs to; outside them the engine flags it (the user may still keep it). */
  levels: MotionLevel[]
  /** WebGL-ish or full-screen interaction: a kit carries at most two. */
  heavy?: boolean
  sections: SectionId[]
  usage: string
  rules: string[]
}
/**
 * A site planned from the showcase (/kit): everything the user took off the shelves, in order — no questions asked.
 * Unset choices fall back to the chosen look's tested defaults. planToSpec (features/kit/plan.ts) turns it into a RecipeSpec.
 */
export type KitPlan = {
  name?: string
  /** One sentence on what the site is — becomes the brief's offer. */
  about?: string
  /** What visitors should do — drives the main action, forms and controls. */
  goal?: GoalId
  /** How lively the site is. Absent = the look's (or first screen's) own; effects can raise it. */
  motion?: MotionLevel
  /** Anything about the photos, in the owner's words. */
  photoNote?: string
  /** The owner's own files (bytes in IndexedDB, see lib/files.ts) and whether the first-screen media is theirs. */
  uploads?: UploadedAsset[]; assets?: AssetId[]; mediaPlan?: MediaPlan
  purpose?: PurposeId
  /** Step 1 — the same on every page. */
  direction?: DirectionId; palette?: PaletteId; typography?: TypographyId; shape?: ShapeId; nav?: NavStyleId; footer?: FooterStyleId; imagePresentation?: ImagePresentationId
  rotation?: AccentSetId | 'off'
  /** The big idea (absent = the recommended one, 'off' = none). */
  concept?: ConceptId | 'off'
  /** Site-wide ready pieces: page transition, cursor, cookie notice. */
  sitePieces?: PieceId[]
  /** Step 2 — page by page. The first page's first screen is `hero`. */
  hero?: HeroId
  pages: PlanPage[]
  target?: BuildTargetId
  /** The recipe this plan was opened from (Customise). What the kit doesn't edit — brief, media, voice, layout — comes from here. */
  from?: RecipeSpec
  /** The saved recipe it was opened from: Create updates that one instead of making a copy. */
  fromId?: string
}
/** A page in the plan. Each section is an instance with its own key, so the pieces attached to it move with it. */
export type PlanPage = { id: string; type: PageTypeId; label: string; purpose: string; sections: PlanSection[]; hide?: ChromeId[] }
/** A section on a plan page: its moments (ready pieces on this section only) and, for a photo section, how its photos are shown. */
/** `hero`: what this film/image part shows when it isn't the site's first screen (that one is the plan's `hero`). */
export type PlanSection = { key: string; id: SectionId; pieces: PieceId[]; photos?: ImagePresentationId; hero?: HeroId; /** The owner's design for a multi-design section (section-variants.ts). */ variant?: string }
/** Where the user attached a ready piece: page id + section index on that page, or page '*' for the whole site. */
export type PiecePlacement = { piece: PieceId; page: string; index: number }

/** A kit piece as the recipe places it: which page and section, and where its code lands in the project. */
export type RecipePiece = Piece & { where: string; path: string; issue?: string }


export type SignaturePattern = {
  id: string
  /** Arrives through a big idea (or the owner's pick), never as the engine's own extra. */
  viaConcept?: true
  name: string
  sections: SectionId[]
  levels: MotionLevel[]
  fits: string[]
  experience: string
  implementation: string
  mobile: string
  reducedMotion: string
  components?: LibraryComponent[]
  /** The ready kit piece that does this moment; it ships wherever the moment lands. */
  piece?: PieceId
}

export type NavStyleId = 'classic-bar' | 'floating-pill' | 'fullscreen-menu' | 'centered-logo' | 'card-menu' | 'bottom-dock' | 'side-index' | 'split-pill' | 'status-bar'
/** Footer styles — the page's ending, chosen with the menu in Design (same on every page that shows it). */
export type FooterStyleId = 'signature' | 'wordmark' | 'contact' | 'line' | 'index'
export type FooterStyle = { id: FooterStyleId; name: string; line: string; composition: string; behavior: string; responsive: string }
/** The frame every page shares; a page can leave either out (`hide`). */
export type ChromeId = 'navbar' | 'footer'
export type NavStyle = { id: NavStyleId; name: string; line: string; trending?: boolean; composition: string; behavior: string; responsive: string; components: LibraryComponent[] }

export type ShapeId = 'sharp' | 'soft' | 'round' | 'pill' | 'brutal' | 'outline' | 'glass' | 'relief' | 'clay'
/** Corner, border and shadow language for buttons, cards, inputs and media frames. Values are CSS. */
export type ShapeStyle = { id: ShapeId; name: string; line: string; button: string; card: string; media: string; border: string; shadow: string; rule: string }

/** The recipe's one big idea (award sites are built around one): what guides the scroll, how chapters open, the one
 *  moment people remember and how the site ends. Its signature moments carry it onto real sections. */
export type ConceptId = 'one-guide' | 'giant-chapters' | 'live-console' | 'guided-walk' | 'playful-way-in' | 'loud-and-quiet'
export type Concept = {
  id: ConceptId; name: string; line: string
  /** Purposes, families and direction tags it suits (scored like signature patterns). */
  fits: string[]
  levels: MotionLevel[]
  motif: string; chapters: string; moment: string; ending: string
  /** Signature pattern ids that carry it, best first — placed on sections the recipe has. */
  signatures: string[]
}
/** The concept as written into a recipe. */
export type RecipeConcept = Omit<Concept, 'fits' | 'levels' | 'signatures'> & { why: string; recommended: boolean }

/** A signature pattern resolved onto a real section of this recipe. */
export type SignatureMoment = Omit<SignaturePattern, 'sections' | 'levels' | 'fits' | 'viaConcept'> & { where: string }

export type MotionLevelInfo = {
  id: MotionLevel
  name: string
  line: string
  principle: string
  why: string
}

export type ComponentPattern = {
  id: ComponentId
  purpose: string
  anatomy: string
  behavior: string
}

export type SectionPattern = {
  id: SectionId
  name: string
  purpose: string
  composition: string
  content: string
  behavior: string
  responsive: string
}

export type PageType = {
  id: PageTypeId
  name: string
  hint: string
  sections: SectionId[]
  defaultPurpose: string
}

export type InspirationSource = {
  id: string
  name: string
  url: string
  line: string
}

export type InspirationReference = {
  source: string // InspirationSource id
  title: string
  url: string // a category/search URL on the source — we never link a site to copy
  study: string
  why: string
  principle: string
}

// ─── Recipe spec (the user's decisions) ──────────────────────────────────────

export type UploadedAsset = {
  asset: AssetId
  name: string
  kind: 'image' | 'video' | 'other'
  width?: number
  height?: number
  duration?: number
  /** Id of the actual bytes in the browser's IndexedDB (see lib/files.ts). Absent when the user only marked the asset as "available". */
  fileId?: string
}

/** One page as the user has configured it in the kit. */
export type PageSpec = { id: string; type: PageTypeId; label: string; purpose: string; sections: SectionId[]; /** Menu or footer left out on this page. */ hide?: ChromeId[] }

/** The project in the user's own words. Everything optional: a recipe without a brief still composes. */
export type Brief = { name?: string; offer?: string; goal?: GoalId; /** Anything the user wants done with their photos, in their words. */ photos?: string }

/** Everything a Recipe is composed from. Small, serializable, stable under Remix. */
export type RecipeSpec = {
  base: string
  brief?: Brief
  purpose: PurposeId
  direction: DirectionId
  characters: CharacterId[]
  lead: LeadId
  motion: MotionLevel
  layout: LayoutId
  palette: PaletteId
  customPalette?: PaletteColors
  typography: TypographyId
  hero?: HeroId
  assets: AssetId[]
  uploads?: UploadedAsset[]
  mediaPlan?: MediaPlan
  /** How an uploaded non-16:9 video is shown. Default 'wide': 16:9 on desktop, original on phones. 'original' only when the owner asks for its own shape. */
  videoFrame?: 'wide' | 'original'
  /** Design choices the user made; when absent the engine recommends one from the direction and purpose. */
  nav?: NavStyleId
  footer?: FooterStyleId
  shape?: ShapeId
  /** Signature moment ids the user picked (max 4). Absent = the engine's own pick. */
  signatures?: string[]
  /** The big idea. Absent = the engine's recommendation; 'off' = none. */
  concept?: ConceptId | 'off'
  imagePresentation?: ImagePresentationId
  /** Colour chapters over the palette — one accent per chapter section ('off' overrides the look's default). */
  rotation?: AccentSetId | 'off'
  /** Pieces the user put in their kit (see data/pieces.ts). */
  pieces?: PieceId[]
  /** Exactly where each piece goes (showcase plans). Without it, a piece lands on the first section it suits. */
  piecePlacements?: PiecePlacement[]
  /** How each photo section shows its photos (page id + section index). Photo sections without one get the recommendation. */
  sectionPhotos?: { page: string; index: number; presentation: ImagePresentationId }[]
  /** The design each multi-design section uses (page id + section index; `sectionVariants` in section-variants.ts). */
  sectionVariants?: { page: string; index: number; variant: string }[]
  /** Film/image parts other than the first screen that show something of their own (page id + section index). */
  heroBands?: { page: string; index: number; hero: HeroId }[]
  pages: PageSpec[]
  target: BuildTargetId
}

export type RecipeSeed = {
  slug: string
  number: string
  title: string
  summary: string
  spec: Omit<RecipeSpec, 'base' | 'assets' | 'target' | 'pages'>
  mood: string[]
  personality: string
  principles: string[]
  do: string[]
  avoid: string[]
  sectionNotes: Partial<Record<SectionId, string>>
  content: { tone: string; headlineExamples: string[]; ctaExamples: string[]; density: string }
  references: InspirationReference[]
  whyDirection: string
  image: ImageKey
}

// ─── Universal Recipe (what to build and why) ────────────────────────────────

export type CreativeDirection = { mood: string[]; personality: string; visualPrinciples: string[]; do: string[]; avoid: string[]; genericAvoid: string[] }

export type ColorToken = { role: ColorRole; hex: string; purpose: string; usage: string; contrast?: string }

export type VisualSystem = {
  palette: { id: PaletteId; name: string; custom: boolean; dark: boolean; tokens: ColorToken[] }
  typography: TypographyPairing
  spacing: { base: string; scale: string[]; sectionSpacing: string; note: string }
  grid: { container: string; columns: string; gutters: string }
  shape: ShapeStyle
  /** Colour chapters: the three accents that take turns, one per chapter section (tokens --color-chapter-1..3). */
  rotation?: AccentSet
}

export type LayoutSystem = Omit<LayoutPattern, 'tags' | 'compatibleWith' | 'incompatibleWith' | 'line'>

/** code: the ready component for this section, shipped at `path` in every Build Package. */
export type PageSection = SectionPattern & { tone?: SectionTone; media?: MediaPlacement; variant?: { id: string; name: string; line: string; chosen: boolean }; note?: string; code?: { path: string; exportName: string; usage: string }; photos?: ImagePresentation & { chosen: boolean } }
/** Site-wide behaviours: how headlines arrive, links react, buttons respond, plus whole-site pieces. The same on every page. */
export type BehaviourId = 'headlines' | 'links' | 'buttons' | 'transitions' | 'site'

export type PageBlueprint = { id: string; type: PageTypeId; label: string; purpose: string; sections: PageSection[]; hide?: ChromeId[] }

/** `storytelling`: for scroll-controlled film heroes, how video and text become one scroll timeline. */
/** `framing`: how the owner's own video is shaped per screen, when its shape isn't already 16:9. */
export type MediaRecipe = MediaPattern & { hero: HeroPattern; storytelling?: string[]; imagery?: ImageryPlan; framing?: string }

export type MotionRecipe = { level: MotionLevelInfo; principle: string; patterns: MotionPattern[]; libraries: string[] }

export type ContentDirection = {
  tone: string
  voice: string
  headlineStyle: string
  headlineExamples: string[]
  paragraphLength: string
  ctaStyle: string
  ctaExamples: string[]
  wordsToAvoid: string[]
  density: string
}

export type AssetStatus = 'have' | 'create' | 'find' | 'temporary' | 'optional'

/** A file the user actually attached during creation, backing this requirement (see lib/files.ts for the bytes). */
export type ProvidedFile = { fileId: string; name: string }

export type AssetRequirement = AssetSpec & { key: string; status: AssetStatus; source: string; replaceWith: string; providedFiles?: ProvidedFile[] }

export type AssetCreationPath = {
  asset: string
  title: string
  steps: string[]
  prompt?: string
  settings?: Record<string, string>
  tools: string[] // resource ids
}

export type ImplementationGuide = {
  stack: string[]
  dependencies: { name: string; why: string }[]
  fileStructure: string
  sequence: string[]
  responsive: string[]
  accessibility: string[]
  performance: string[]
  /** Ready-made accessible UI primitives for every control and form on this site, themed to the recipe. */
  ui: UiKit
}

/** One shadcn/ui component this site needs, and the places it is used. */
export type UiComponent = { name: string; slug: string; where: string[] }
export type UiKit = { library: string; url: string; components: UiComponent[]; install: string; theme: string; rules: string[] }

export type WhyItWorks = Record<'direction' | 'typography' | 'palette' | 'layout' | 'motion' | 'assets', string>

export type RecipeMetadata = {
  spec: RecipeSpec
  familyIds: FamilyId[]
  complexity: 'light' | 'moderate' | 'advanced'
  recommendedTarget: Exclude<BuildTargetId, 'not-sure'>
  version: 1
  image: ImageKey
}

export type UniversalRecipe = {
  id: string
  title: string
  slug: string
  summary: string
  creativeDirection: CreativeDirection
  designPrinciples: string[]
  visualSystem: VisualSystem
  layoutSystem: LayoutSystem
  chrome: { navbar: PageSection; footer: PageSection; nav: NavStyle; footerStyle: FooterStyle }
  pages: PageBlueprint[]
  components: ComponentPattern[]
  media: MediaRecipe
  motion: MotionRecipe
  /** The one big idea the site is built around (absent when the owner turned it off). */
  concept?: RecipeConcept
  /** 2–4 memorable interactions, each on its own section — the moments people remember and share. */
  signatures: SignatureMoment[]
  /** The user's kit: ready components shipped as code in src/components/pieces/. */
  pieces: RecipePiece[]
  contentDirection: ContentDirection
  assetRequirements: AssetRequirement[]
  assetCreationPaths: AssetCreationPath[]
  resources: string[] // resource ids
  references: InspirationReference[]
  implementation: ImplementationGuide
  whyItWorks: WhyItWorks
  metadata: RecipeMetadata
}

// ─── Build Packages (exactly how to give it to one tool) ─────────────────────

export type BuildTarget = Exclude<BuildTargetId, 'not-sure'>
export type BuildFile = { path: string; content: string }
export type AssetManifest = Record<string, {
  required: boolean
  level: AssetSpec['level']
  status: AssetStatus
  source: string
  replaceWith: string
  usage: string
  specs: string
  providedFiles?: ProvidedFile[]
}>
export type BuildPackage = {
  recipeId: string
  target: BuildTarget
  files: BuildFile[]
  instructions: string
  assets: AssetManifest
}

export interface BuildPackageAdapter {
  id: BuildTarget
  name: string
  description: string
  receives: string[]
  generate(recipe: UniversalRecipe): Promise<BuildPackage>
}
