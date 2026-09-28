// OpusKit domain model. Independent from UI — safe to import anywhere (server, client, scripts).

import type { ImageKey } from '@/data/images'

// ─── Taxonomy ids ────────────────────────────────────────────────────────────

export type PurposeId =
  | 'portfolio' | 'agency' | 'studio' | 'fashion' | 'restaurant' | 'ecommerce'
  | 'product' | 'saas' | 'personal-brand' | 'experiment' | 'other'

export type FamilyId =
  | 'quiet' | 'editorial' | 'cinematic' | 'minimal' | 'bold' | 'raw' | 'organic' | 'experimental' | 'futuristic'

export type DirectionId =
  | 'japanese-minimal' | 'scandinavian-minimal' | 'architectural-minimal' | 'monochrome-minimal'
  | 'luxury-editorial' | 'fashion-editorial' | 'art-editorial' | 'swiss-editorial'
  | 'dark-cinematic' | 'cinematic-editorial' | 'immersive-portfolio' | 'film-inspired'
  | 'swiss-modern' | 'typography-first' | 'neo-brutalist' | 'raw-editorial'
  | 'organic-modern' | 'warm-hospitality' | 'art-direction' | 'digital-futurism' | 'technical-minimal'
  | 'soft-pastel' | 'coastal-calm' | 'modern-heritage' | 'news-grid' | 'gothic-modern' | 'retro-seventies'
  | 'playful-pop' | 'y2k-chrome' | 'bento-product'

export type CharacterId =
  | 'elegant' | 'warm' | 'mysterious' | 'playful' | 'technical' | 'futuristic' | 'sophisticated' | 'raw'

export type LeadId = 'photography' | 'video' | 'typography' | 'product' | 'illustration' | '3d'
export type MotionLevel = 'still' | 'subtle' | 'dynamic' | 'immersive'
export type LayoutId = 'balanced' | 'editorial' | 'asymmetric' | 'grid' | 'full-bleed' | 'experimental'

export type PaletteId =
  | 'signal-white' | 'wet-concrete' | 'legal-pad' | 'pink-plaster' | 'klein-field' | 'pool-tile'
  | 'hazard-yellow' | 'celery-room' | 'bottle-green' | 'night-ink' | 'plum-velvet' | 'oxblood-room'
  | 'wet-slate' | 'black-box' | 'rose-leaf' | 'airmail-blue'
  | 'espresso' | 'lavender-haze' | 'cherry-red' | 'mint-fresh' | 'chrome-silver' | 'electric-lime'
  | 'peach-fuzz' | 'deep-teal' | 'butter-cup' | 'cobalt-sky'

export type TypographyId =
  | 'quiet-page' | 'ink-and-paper' | 'soft-couture' | 'printed-word' | 'opening-credits' | 'gala-night'
  | 'loud-and-clear' | 'grid-discipline' | 'photocopy-zine' | 'workshop-manual' | 'corner-bakery'
  | 'main-street' | 'stretch-test' | 'high-low' | 'control-room' | 'data-sheet'
  | 'soft-seventies' | 'round-future' | 'letterpress-modern' | 'new-gothic' | 'friendly-app' | 'newsroom'
  | 'moonlit-italic' | 'swiss-italic' | 'bubble-pop' | 'poster-warp'

export type HeroId =
  | 'editorial-image' | 'parallax-photo' | 'ambient-video' | 'scroll-video' | 'scroll-video-page' | 'type-statement'
  | 'kinetic-type' | 'product-stage' | 'illustrated' | 'webgl-scene'

export type AssetId =
  | 'logo' | 'images' | 'video' | 'product-photos' | 'illustrations' | '3d' | 'fonts' | 'copy'

/** How the user wants to solve missing lead media. */
export type MediaPlan = 'have' | 'image-to-video' | 'temporary' | 'image-alternative'

export type BuildTargetId = 'claude-code' | 'cursor' | 'v0' | 'lovable' | 'own-code' | 'not-sure'

export type GoalId = 'contact' | 'book' | 'buy' | 'signup' | 'subscribe' | 'explore'


export type SectionId =
  | 'navbar' | 'hero' | 'intro' | 'featured-work' | 'case-study' | 'services' | 'process' | 'about'
  | 'gallery' | 'editorial-story' | 'manifesto' | 'clients' | 'menu' | 'reservation' | 'location'
  | 'collection' | 'lookbook' | 'product-grid' | 'product-highlight' | 'feature-grid' | 'how-it-works'
  | 'pricing' | 'faq' | 'journal' | 'contact-cta' | 'footer'

export type PageTypeId =
  | 'home' | 'work' | 'about' | 'contact' | 'services' | 'collections' | 'shop' | 'product-detail'
  | 'cart' | 'checkout' | 'account' | 'features' | 'pricing' | 'faq' | 'journal' | 'experiment'
  | 'menu' | 'gallery' | 'reservations' | 'sign-in' | 'sign-up' | 'privacy-policy' | 'terms-of-service'
  | 'cookie-policy' | 'not-found' | 'accessibility' | 'custom'
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
  tech: 'css' | 'motion' | 'gsap' | 'lenis' | 'three'
  performance: string
  reducedMotion: string
}

/** A memorable interactive component, placed on one section. `fits`: purposes and direction tags/families it suits best. */
export type SignaturePattern = {
  id: string
  name: string
  sections: SectionId[]
  levels: MotionLevel[]
  fits: string[]
  experience: string
  implementation: string
  mobile: string
  reducedMotion: string
}

/** A signature pattern resolved onto a real section of this recipe. */
export type SignatureMoment = Omit<SignaturePattern, 'sections' | 'levels' | 'fits'> & { where: string }

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

/** One page as the user has configured it in the questionnaire. */
export type PageSpec = { id: string; type: PageTypeId; label: string; purpose: string; sections: SectionId[] }

/** The project in the user's own words. Everything optional: a recipe without a brief still composes. */
export type Brief = { name?: string; offer?: string; goal?: GoalId }

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
}

export type LayoutSystem = Omit<LayoutPattern, 'tags' | 'compatibleWith' | 'incompatibleWith' | 'line'>

export type PageSection = SectionPattern & { note?: string }

export type PageBlueprint = { id: string; type: PageTypeId; label: string; purpose: string; sections: PageSection[] }

/** `storytelling`: for scroll-controlled film heroes, how video and text become one scroll timeline. */
export type MediaRecipe = MediaPattern & { hero: HeroPattern; storytelling?: string[] }

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
}

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
  chrome: { navbar: PageSection; footer: PageSection }
  pages: PageBlueprint[]
  components: ComponentPattern[]
  media: MediaRecipe
  motion: MotionRecipe
  /** 2–4 memorable interactions, each on its own section — the moments people remember and share. */
  signatures: SignatureMoment[]
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
