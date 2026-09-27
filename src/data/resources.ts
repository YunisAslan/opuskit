import type { FamilyId } from '@/types/domain'

export type ResourceCategory = 'fonts' | 'images' | 'video' | 'icons' | 'illustrations' | '3d' | 'textures' | 'motion' | 'libraries' | 'developer-tools' | 'ai-media' | 'design-tools' | 'inspiration' | 'color';
export type Resource = {
  id: string;            // kebab-case
  name: string;
  category: ResourceCategory;
  url: string;
  description: string;   // what it is, 1 sentence, factual
  why: string;           // why it's useful for building distinctive websites, 1 sentence, specific
  useCases: string[];    // short lowercase tags e.g. 'hero video', 'scroll animation', 'type pairing', 'placeholder media', 'image to video', 'icons', 'palette'
  families: FamilyId[];  // which style families it suits best ([] = all)
  technologies: string[];// e.g. ['react'], ['webgl'], ['css'], [] if n/a
  recipes: string[];     // leave [] – filled elsewhere
  license: string;       // short usage/license note, factual (e.g. 'Free under the Unsplash License; attribution appreciated'), write 'Check terms per asset' if unsure
  verifiedAt: string;    // '2026-09-26'
};

const V = '2026-09-26';
const REF = 'Reference only; showcased work belongs to its authors';

export const resources: Resource[] = [
  // fonts
  {
    id: 'google-fonts', name: 'Google Fonts', category: 'fonts', url: 'https://fonts.google.com',
    description: 'Library of open-source font families served from a free CDN or downloadable for self-hosting.',
    why: 'Variable families with width and optical-size axes (Zalando Sans, Mona Sans, Newsreader, Bodoni Moda) give a whole type system from one file, and next/font self-hosts them. Skip the most-used defaults.',
    useCases: ['type pairing', 'variable fonts', 'body text'], families: [], technologies: ['css'], recipes: [],
    license: 'Open-source licenses, mostly SIL OFL; free for commercial use', verifiedAt: V,
  },
  {
    id: 'fontshare', name: 'Fontshare', category: 'fonts', url: 'https://www.fontshare.com',
    description: 'Free font service from Indian Type Foundry with display and text families such as Satoshi, Clash Display and General Sans.',
    why: 'Useful for your own site when you want a face outside Google Fonts — but its best-known families (Satoshi, Clash, General Sans) are now as common as the defaults they replaced.',
    useCases: ['display type', 'type pairing', 'headlines'], families: ['bold', 'minimal', 'futuristic'], technologies: ['css'], recipes: [],
    license: 'ITF Free Font License v2.0 (Aug 2026): free on your own site; not for hosting or offering inside apps, SaaS or design tools — read it first', verifiedAt: '2026-09-27',
  },
  {
    id: 'velvetyne', name: 'Velvetyne', category: 'fonts', url: 'https://velvetyne.fr',
    description: 'French collective publishing libre, open-source typefaces.',
    why: 'Its expressive, often unconventional display faces suit art, culture and experimental sites that need a strong typographic voice.',
    useCases: ['display type', 'headlines', 'poster type'], families: ['experimental', 'raw', 'bold'], technologies: ['css'], recipes: [],
    license: 'Libre licenses (mostly SIL OFL); check each family', verifiedAt: V,
  },
  {
    id: 'collletttivo', name: 'Collletttivo', category: 'fonts', url: 'https://www.collletttivo.it',
    description: 'Italian open-source type foundry and network of type designers.',
    why: 'Distinctive open-source display and text faces that are free to self-host, useful for editorial and experimental layouts.',
    useCases: ['display type', 'type pairing', 'editorial layout'], families: ['editorial', 'experimental', 'raw'], technologies: ['css'], recipes: [],
    license: 'Open-source licenses; check each family', verifiedAt: V,
  },
  {
    id: 'fonts-in-use', name: 'Fonts In Use', category: 'fonts', url: 'https://fontsinuse.com',
    description: 'Searchable archive of real-world typographic design, indexed by typeface, format and topic.',
    why: 'Shows how a typeface behaves in actual print and web work before committing to it, and surfaces proven pairings.',
    useCases: ['type pairing', 'type research', 'moodboard'], families: ['editorial'], technologies: [], recipes: [],
    license: REF, verifiedAt: V,
  },

  // images
  {
    id: 'unsplash', name: 'Unsplash', category: 'images', url: 'https://unsplash.com',
    description: 'Photo library with free images under the Unsplash License plus a paid Unsplash+ tier.',
    why: 'Its imgix CDN resizes and crops by URL parameter, so one photo ID serves every breakpoint during prototyping.',
    useCases: ['placeholder media', 'hero image', 'photography'], families: [], technologies: [], recipes: [],
    license: 'Free under the Unsplash License; attribution appreciated; Unsplash+ images excluded', verifiedAt: V,
  },
  {
    id: 'pexels', name: 'Pexels', category: 'images', url: 'https://www.pexels.com',
    description: 'Free stock photo and video library.',
    why: 'A second large free pool when Unsplash lacks a subject, with the same no-attribution usage model.',
    useCases: ['placeholder media', 'hero image', 'photography'], families: [], technologies: [], recipes: [],
    license: 'Free under the Pexels License; attribution not required; no resale of unmodified copies', verifiedAt: V,
  },

  // video
  {
    id: 'pexels-videos', name: 'Pexels Videos', category: 'video', url: 'https://www.pexels.com/videos/',
    description: 'Free stock video section of Pexels.',
    why: 'Provides slow, atmospheric clips suitable for muted autoplay hero loops.',
    useCases: ['hero video', 'background loop', 'placeholder media'], families: ['cinematic', 'organic', 'quiet'], technologies: [], recipes: [],
    license: 'Free under the Pexels License; attribution not required', verifiedAt: V,
  },
  {
    id: 'coverr', name: 'Coverr', category: 'video', url: 'https://coverr.co',
    description: 'Stock video library with free and premium HD and 4K footage.',
    why: 'Clips are often shot with web backgrounds in mind: steady framing and room for overlaid text.',
    useCases: ['hero video', 'background loop'], families: ['cinematic', 'quiet'], technologies: [], recipes: [],
    license: 'Free downloads usable commercially without attribution; premium items separate', verifiedAt: V,
  },
  {
    id: 'mixkit', name: 'Mixkit', category: 'video', url: 'https://mixkit.co',
    description: 'Envato-run library of free stock video, music, sound effects and video templates.',
    why: 'Combines footage with music and sound effects, useful when a hero loop or product film needs audio as well.',
    useCases: ['hero video', 'sound effects', 'background loop'], families: ['cinematic'], technologies: [], recipes: [],
    license: 'Free or restricted license per item; check each asset', verifiedAt: V,
  },

  // icons
  {
    id: 'lucide', name: 'Lucide', category: 'icons', url: 'https://lucide.dev',
    description: 'Open-source stroke icon set, a community fork of Feather, with packages for React and other frameworks.',
    why: 'Consistent 24px stroke icons with adjustable stroke width, so icons can match the weight of the chosen typeface.',
    useCases: ['icons', 'ui'], families: ['minimal', 'quiet'], technologies: ['react', 'svg'], recipes: [],
    license: 'ISC', verifiedAt: V,
  },
  {
    id: 'phosphor-icons', name: 'Phosphor Icons', category: 'icons', url: 'https://phosphoricons.com',
    description: 'Icon family available in six weights: thin, light, regular, bold, fill and duotone.',
    why: 'Multiple weights of the same glyph let icons follow a type scale, from thin editorial to heavy bold layouts.',
    useCases: ['icons', 'ui'], families: [], technologies: ['react', 'svg'], recipes: [],
    license: 'MIT', verifiedAt: V,
  },
  {
    id: 'iconify', name: 'Iconify', category: 'icons', url: 'https://iconify.design',
    description: 'Unified framework and search across more than 100 open-source icon sets.',
    why: 'Find a specific glyph across many sets in one place and load only the icons used, via components or CSS.',
    useCases: ['icons', 'logo search'], families: [], technologies: ['react', 'css', 'svg'], recipes: [],
    license: 'Framework MIT; each icon set has its own license', verifiedAt: V,
  },
  {
    id: 'tabler-icons', name: 'Tabler Icons', category: 'icons', url: 'https://tabler.io/icons',
    description: 'Set of over 6,000 open-source SVG icons with customizable size, color and stroke.',
    why: 'Its breadth covers niche UI and domain symbols that smaller sets lack.',
    useCases: ['icons', 'ui', 'dashboard'], families: ['minimal'], technologies: ['react', 'svg'], recipes: [],
    license: 'MIT', verifiedAt: V,
  },

  // illustrations
  {
    id: 'open-peeps', name: 'Open Peeps', category: 'illustrations', url: 'https://www.openpeeps.com',
    description: 'Hand-drawn character illustration library by Pablo Stanley built from mix-and-match body parts.',
    why: 'Loose hand-drawn line work adds a human, informal tone without using stock photography of people.',
    useCases: ['illustration', 'characters'], families: ['organic', 'raw'], technologies: [], recipes: [],
    license: 'CC0', verifiedAt: V,
  },
  {
    id: 'blush', name: 'Blush', category: 'illustrations', url: 'https://blush.design',
    description: 'Customizable illustration collections by artists, editable in the browser or via a Figma plugin.',
    why: 'Styles range widely, so an illustration set can be picked to match a specific brand tone rather than a generic look.',
    useCases: ['illustration', 'characters', 'figma'], families: [], technologies: [], recipes: [],
    license: 'Free for commercial use; no resale, redistribution or merchandise', verifiedAt: V,
  },
  {
    id: 'undraw', name: 'unDraw', category: 'illustrations', url: 'https://undraw.co',
    description: 'Open-source flat illustrations with a color picker that recolors every image.',
    why: 'Quick to recolor to the site palette for empty states and onboarding; its style is widely used, so use sparingly on distinctive sites.',
    useCases: ['illustration', 'empty state'], families: ['minimal'], technologies: ['svg'], recipes: [],
    license: 'Free for commercial and personal use without attribution; no competing redistribution', verifiedAt: V,
  },

  // 3d
  {
    id: 'spline', name: 'Spline', category: '3d', url: 'https://spline.design',
    description: 'Browser-based 3D design tool with real-time collaboration and exports for the web.',
    why: 'Designers can build and animate interactive 3D scenes and embed them in React without writing WebGL code.',
    useCases: ['3d hero', 'interactive object', 'prototype'], families: ['futuristic', 'experimental', 'bold'], technologies: ['webgl', 'react'], recipes: [],
    license: 'Check terms per asset', verifiedAt: V,
  },
  {
    id: 'three-js', name: 'Three.js', category: '3d', url: 'https://threejs.org',
    description: 'JavaScript 3D library that wraps WebGL and WebGPU.',
    why: 'Base layer for custom shaders, particle fields and 3D scenes when a visual effect cannot come from a template.',
    useCases: ['webgl', 'shader', '3d hero', 'particles'], families: ['futuristic', 'experimental', 'cinematic'], technologies: ['webgl', 'javascript'], recipes: [],
    license: 'MIT', verifiedAt: V,
  },
  {
    id: 'react-three-fiber', name: 'React Three Fiber', category: '3d', url: 'https://r3f.docs.pmnd.rs',
    description: 'React renderer for Three.js from Poimandres.',
    why: 'Declares 3D scenes as React components so they share state and routing with the rest of a Next.js app.',
    useCases: ['webgl', '3d hero', 'interactive object'], families: ['futuristic', 'experimental'], technologies: ['react', 'webgl'], recipes: [],
    license: 'MIT', verifiedAt: V,
  },
  {
    id: 'drei', name: 'drei', category: '3d', url: 'https://drei.docs.pmnd.rs',
    description: 'Collection of helpers and abstractions for React Three Fiber, such as cameras, controls, text and materials.',
    why: 'Provides ready components like environment lighting, scroll controls and transmission materials that would otherwise take hours to write.',
    useCases: ['webgl', 'scroll animation', '3d text'], families: ['futuristic', 'experimental'], technologies: ['react', 'webgl'], recipes: [],
    license: 'MIT', verifiedAt: V,
  },
  {
    id: 'poly-haven', name: 'Poly Haven', category: '3d', url: 'https://polyhaven.com',
    description: 'Public library of HDRIs, PBR textures and 3D models.',
    why: 'HDRIs give realistic reflections and lighting for WebGL scenes with no licensing overhead.',
    useCases: ['hdri', 'pbr texture', '3d model', 'lighting'], families: ['futuristic', 'organic', 'cinematic'], technologies: ['webgl'], recipes: [],
    license: 'CC0', verifiedAt: V,
  },

  // textures
  {
    id: 'texturelabs', name: 'Texturelabs', category: 'textures', url: 'https://texturelabs.org',
    description: 'Free library of original photographic textures such as paper, film, dust, grunge and light leaks, plus tutorials.',
    why: 'Film grain, paper and dust overlays add analog depth to flat layouts via blend modes.',
    useCases: ['grain overlay', 'paper texture', 'background'], families: ['raw', 'editorial', 'organic', 'cinematic'], technologies: ['css'], recipes: [],
    license: 'Free for commercial use; credit not required; do not resell or redistribute as textures', verifiedAt: V,
  },
  {
    id: 'ambientcg', name: 'ambientCG', category: 'textures', url: 'https://ambientcg.com',
    description: 'Library of over 2,000 PBR materials, HDRIs and models.',
    why: 'Stone, concrete and fabric materials with full map sets can be used for 3D surfaces or as flat background textures.',
    useCases: ['pbr texture', 'hdri', 'background'], families: ['raw', 'organic', 'futuristic'], technologies: ['webgl'], recipes: [],
    license: 'CC0', verifiedAt: V,
  },

  // motion
  {
    id: 'gsap', name: 'GSAP', category: 'motion', url: 'https://gsap.com',
    description: 'JavaScript animation library with plugins including ScrollTrigger, SplitText, Flip and MorphSVG.',
    why: 'ScrollTrigger handles pinning, scrubbing and scroll-linked timelines, the core of most scroll-driven storytelling sites.',
    useCases: ['scroll animation', 'timeline', 'text animation', 'pinning'], families: [], technologies: ['javascript', 'react'], recipes: [],
    license: 'Free for all users including plugins, under GSAP\'s own standard license (Webflow-backed)', verifiedAt: V,
  },
  {
    id: 'motion', name: 'Motion', category: 'motion', url: 'https://motion.dev',
    description: 'Animation library for React, JavaScript and Vue, formerly Framer Motion.',
    why: 'Layout animations, shared-element transitions and spring physics are declared directly on React components.',
    useCases: ['ui animation', 'page transition', 'scroll animation', 'gestures'], families: [], technologies: ['react', 'javascript'], recipes: [],
    license: 'MIT', verifiedAt: V,
  },
  {
    id: 'lenis', name: 'Lenis', category: 'motion', url: 'https://lenis.dev',
    description: 'Lightweight smooth-scroll library by darkroom.engineering, with React and Vue bindings.',
    why: 'Smooths native scroll while keeping it native, and syncs with GSAP ScrollTrigger for steady scroll-linked motion.',
    useCases: ['smooth scroll', 'scroll animation'], families: ['cinematic', 'editorial', 'quiet'], technologies: ['javascript', 'react'], recipes: [],
    license: 'MIT', verifiedAt: V,
  },
  {
    id: 'lottiefiles', name: 'LottieFiles', category: 'motion', url: 'https://lottiefiles.com',
    description: 'Platform and library of Lottie animations, which are After Effects animations exported as JSON and rendered by lottie-web.',
    why: 'Vector animations stay sharp at any size and are far lighter than video for icons and small illustrated motion.',
    useCases: ['micro animation', 'animated icons', 'loader'], families: [], technologies: ['javascript', 'react'], recipes: [],
    license: 'Check terms per asset', verifiedAt: V,
  },
  {
    id: 'rive', name: 'Rive', category: 'motion', url: 'https://rive.app',
    description: 'Tool for designing interactive animations with state machines, plus runtimes for web and native apps.',
    why: 'State machines let animations react to hover, scroll or data input, beyond linear playback.',
    useCases: ['interactive animation', 'micro animation', 'animated illustration'], families: ['bold', 'experimental'], technologies: ['javascript', 'react'], recipes: [],
    license: 'Runtimes MIT; editor under Rive terms', verifiedAt: V,
  },

  // libraries
  {
    id: 'tailwind-css', name: 'Tailwind CSS', category: 'libraries', url: 'https://tailwindcss.com',
    description: 'Utility-first CSS framework.',
    why: 'Design tokens defined as CSS variables in the theme keep spacing, type and color consistent across custom layouts.',
    useCases: ['styling', 'design tokens', 'responsive layout'], families: [], technologies: ['css'], recipes: [],
    license: 'MIT', verifiedAt: V,
  },
  {
    id: 'shadcn-ui', name: 'shadcn/ui', category: 'libraries', url: 'https://ui.shadcn.com',
    description: 'Collection of accessible React components copied into the project source, built on Radix and Tailwind.',
    why: 'Components live in the codebase, so they can be restyled freely instead of fighting a packaged theme.',
    useCases: ['ui components', 'forms', 'dialogs'], families: [], technologies: ['react', 'tailwind'], recipes: [],
    license: 'MIT', verifiedAt: V,
  },
  {
    id: 'radix-ui', name: 'Radix UI', category: 'libraries', url: 'https://www.radix-ui.com',
    description: 'Unstyled, accessible React primitives such as dialogs, menus and tabs.',
    why: 'Handles focus, keyboard and ARIA behavior so custom-styled components stay accessible.',
    useCases: ['ui components', 'accessibility'], families: [], technologies: ['react'], recipes: [],
    license: 'MIT', verifiedAt: V,
  },
  {
    id: 'nextjs', name: 'Next.js', category: 'libraries', url: 'https://nextjs.org',
    description: 'React framework with file-based routing, server rendering and built-in image and font optimization.',
    why: 'next/image and next/font handle responsive images and self-hosted fonts, which matter most on media-heavy sites.',
    useCases: ['framework', 'image optimization', 'routing'], families: [], technologies: ['react'], recipes: [],
    license: 'MIT', verifiedAt: V,
  },

  // developer-tools
  {
    id: 'vercel', name: 'Vercel', category: 'developer-tools', url: 'https://vercel.com',
    description: 'Hosting and deployment platform from the makers of Next.js.',
    why: 'Preview deployments per branch make it easy to review motion and media changes on real devices.',
    useCases: ['hosting', 'preview deploys'], families: [], technologies: ['react'], recipes: [],
    license: 'Commercial service; see site for plans', verifiedAt: V,
  },
  {
    id: 'squoosh', name: 'Squoosh', category: 'developer-tools', url: 'https://squoosh.app',
    description: 'Browser-based image compressor from Google Chrome Labs with side-by-side comparison.',
    why: 'Compares AVIF, WebP and JPEG output visually so large hero images can be shrunk without visible loss.',
    useCases: ['image compression', 'avif', 'webp'], families: [], technologies: [], recipes: [],
    license: 'Apache-2.0', verifiedAt: V,
  },
  {
    id: 'ffmpeg', name: 'FFmpeg', category: 'developer-tools', url: 'https://ffmpeg.org',
    description: 'Command-line toolkit for converting, encoding and editing audio and video.',
    why: 'Encodes hero loops to small H.264, VP9 or AV1 files, strips audio and extracts poster frames in one command.',
    useCases: ['video compression', 'poster frame', 'hero video'], families: [], technologies: ['cli'], recipes: [],
    license: 'LGPL-2.1+ (some optional parts GPL)', verifiedAt: V,
  },
  {
    id: 'handbrake', name: 'HandBrake', category: 'developer-tools', url: 'https://handbrake.fr',
    description: 'Open-source desktop video transcoder with presets.',
    why: 'A GUI alternative to FFmpeg for compressing background video to web-friendly sizes.',
    useCases: ['video compression', 'hero video'], families: [], technologies: [], recipes: [],
    license: 'GPL-2.0', verifiedAt: V,
  },

  // ai-media
  {
    id: 'runway', name: 'Runway', category: 'ai-media', url: 'https://runway.com',
    description: 'Cloud platform for generating and editing video, images and audio, including its Gen-4.5 video model.',
    why: 'Generates custom hero loops or turns a still into short motion when stock footage does not fit the art direction.',
    useCases: ['image to video', 'text to video', 'hero video'], families: ['cinematic', 'experimental'], technologies: [], recipes: [],
    license: 'Check terms per asset', verifiedAt: V,
  },
  {
    id: 'kling-ai', name: 'Kling AI', category: 'ai-media', url: 'https://kling.ai',
    description: 'AI video and image generator that works from text, images and references.',
    why: 'Image-to-video from a brand still produces short camera moves for hero sections.',
    useCases: ['image to video', 'text to video', 'hero video'], families: ['cinematic'], technologies: [], recipes: [],
    license: 'Check terms per asset', verifiedAt: V,
  },
  {
    id: 'luma', name: 'Luma', category: 'ai-media', url: 'https://lumalabs.ai',
    description: 'Luma AI platform for generating video, images and audio, built around its Ray video models.',
    why: 'Suited to directed, continuous camera motion for cinematic loops and product shots.',
    useCases: ['image to video', 'text to video', 'product shot'], families: ['cinematic', 'futuristic'], technologies: [], recipes: [],
    license: 'Check terms per asset', verifiedAt: V,
  },
  {
    id: 'google-flow', name: 'Google Flow', category: 'ai-media', url: 'https://flow.google.com',
    description: 'Google\'s AI creative studio for generating video and images with Google models such as Veo.',
    why: 'Generates related clips for a sequence, useful for scroll-driven video narratives.',
    useCases: ['text to video', 'image to video', 'scene sequence'], families: ['cinematic'], technologies: [], recipes: [],
    license: 'Check terms per asset', verifiedAt: V,
  },
  {
    id: 'higgsfield', name: 'Higgsfield', category: 'ai-media', url: 'https://higgsfield.ai',
    description: 'AI creative suite for generating images, video and voice from prompts or references.',
    why: 'Bundles several generation and editing tools in one place for quick hero-video iterations.',
    useCases: ['image to video', 'text to video', 'upscale'], families: ['cinematic', 'bold'], technologies: [], recipes: [],
    license: 'Check terms per asset', verifiedAt: V,
  },
  {
    id: 'midjourney', name: 'Midjourney', category: 'ai-media', url: 'https://www.midjourney.com',
    description: 'AI image generation service.',
    why: 'Produces art-directed stills and style references for moodboards or as source frames for image-to-video tools.',
    useCases: ['text to image', 'moodboard', 'source frame'], families: ['editorial', 'cinematic', 'experimental'], technologies: [], recipes: [],
    license: 'Check terms per asset', verifiedAt: V,
  },

  // design-tools
  {
    id: 'figma', name: 'Figma', category: 'design-tools', url: 'https://www.figma.com',
    description: 'Collaborative browser-based interface design tool.',
    why: 'Variables and dev mode map design tokens and specs directly to CSS values for handoff.',
    useCases: ['ui design', 'prototype', 'design tokens'], families: [], technologies: [], recipes: [],
    license: 'Commercial service; see site for plans', verifiedAt: V,
  },

  // inspiration
  {
    id: 'awwwards', name: 'Awwwards', category: 'inspiration', url: 'https://www.awwwards.com',
    description: 'Web design awards site with daily featured sites, collections and element libraries.',
    why: 'Featured sites show current WebGL, scroll and page-transition techniques in production.',
    useCases: ['inspiration', 'motion reference'], families: ['experimental', 'bold', 'futuristic'], technologies: [], recipes: [],
    license: REF, verifiedAt: V,
  },
  {
    id: 'siteinspire', name: 'SiteInspire', category: 'inspiration', url: 'https://www.siteinspire.com',
    description: 'Curated showcase of web design filterable by style, type and subject.',
    why: 'Leans toward restrained, typographic and editorial sites, a counterweight to effect-heavy galleries.',
    useCases: ['inspiration', 'layout reference'], families: ['editorial', 'minimal', 'quiet'], technologies: [], recipes: [],
    license: REF, verifiedAt: V,
  },
  {
    id: 'land-book', name: 'Land-book', category: 'inspiration', url: 'https://land-book.com',
    description: 'Gallery of landing pages and websites organized by category and style.',
    why: 'Useful for comparing section structure and pacing across many landing pages in one industry.',
    useCases: ['inspiration', 'landing page'], families: [], technologies: [], recipes: [],
    license: REF, verifiedAt: V,
  },
  {
    id: 'css-design-awards', name: 'CSS Design Awards', category: 'inspiration', url: 'https://www.cssdesignawards.com',
    description: 'Website awards site with Site of the Day and UI and UX awards judged by a panel.',
    why: 'Another stream of award-level interactive work with jury scores for UI, UX and innovation.',
    useCases: ['inspiration', 'motion reference'], families: ['experimental', 'bold'], technologies: [], recipes: [],
    license: REF, verifiedAt: V,
  },
  {
    id: 'minimal-gallery', name: 'Minimal Gallery', category: 'inspiration', url: 'https://minimal.gallery',
    description: 'Hand-picked gallery of minimal website designs, with templates and tools.',
    why: 'Focused on whitespace-driven, reduced layouts, useful when refining a quiet or minimal direction.',
    useCases: ['inspiration', 'layout reference'], families: ['minimal', 'quiet'], technologies: [], recipes: [],
    license: REF, verifiedAt: V,
  },
  {
    id: 'savee', name: 'Savee', category: 'inspiration', url: 'https://savee.com',
    description: 'Curated visual bookmarking platform for designers.',
    why: 'Collects art direction, photography and typography references beyond web design for building moodboards.',
    useCases: ['moodboard', 'art direction'], families: ['editorial', 'cinematic', 'experimental'], technologies: [], recipes: [],
    license: REF, verifiedAt: V,
  },

  // color
  {
    id: 'realtime-colors', name: 'Realtime Colors', category: 'color', url: 'https://www.realtimecolors.com',
    description: 'Tool that previews a palette and font pairing on a sample website.',
    why: 'Shows a palette applied to real UI with light and dark modes before tokens are committed.',
    useCases: ['palette', 'type pairing', 'dark mode'], families: [], technologies: ['css'], recipes: [],
    license: 'Free web tool', verifiedAt: V,
  },
  {
    id: 'coolors', name: 'Coolors', category: 'color', url: 'https://coolors.co',
    description: 'Color palette generator with locking, exploration and export tools.',
    why: 'Locking colors while regenerating the rest speeds up iteration on a small palette.',
    useCases: ['palette', 'color exploration'], families: [], technologies: [], recipes: [],
    license: 'Free web tool; paid tier available', verifiedAt: V,
  },
  {
    id: 'huemint', name: 'Huemint', category: 'color', url: 'https://huemint.com',
    description: 'Machine-learning palette generator that previews colors on brand, website and graphic mockups.',
    why: 'Generates palettes shown in context of a layout, which makes background and accent roles easier to judge.',
    useCases: ['palette', 'brand color'], families: ['bold', 'experimental'], technologies: [], recipes: [],
    license: 'Free web tool', verifiedAt: V,
  },
  {
    id: 'oklch-picker', name: 'OKLCH Color Picker', category: 'color', url: 'https://oklch.com',
    description: 'Color picker and converter for the OKLCH color space by Evil Martians.',
    why: 'OKLCH keeps perceived lightness steady, so tints and shades of a brand color stay even across a scale.',
    useCases: ['palette', 'color scale', 'design tokens'], families: [], technologies: ['css'], recipes: [],
    license: 'Free web tool; source on GitHub', verifiedAt: V,
  },
  {
    id: 'webaim-contrast-checker', name: 'WebAIM Contrast Checker', category: 'color', url: 'https://webaim.org/resources/contrastchecker/',
    description: 'Tool that checks foreground and background color pairs against WCAG contrast ratios.',
    why: 'Muted, low-contrast palettes common in quiet and editorial designs need checking to stay readable.',
    useCases: ['accessibility', 'contrast'], families: [], technologies: [], recipes: [],
    license: 'Free web tool', verifiedAt: V,
  },
];
