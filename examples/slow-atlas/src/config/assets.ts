// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Replacing a file = dropping a new one at the same path, or editing one line here.
// status: 'have' = the owner's own file · 'temporary' = made for the build, replace it · 'optional' = not used yet.
export type Asset = {
  src: string
  alt: string
  width: number
  height: number
  status: 'have' | 'temporary' | 'optional'
  usage: string
  credit?: string
}

export const assets = {
  logoSymbolLight: { src: '/brand/symbol-light.svg', alt: 'Slow Atlas', width: 32, height: 32, status: 'temporary', usage: 'Logo symbol on the cherry ground (the nav and footer draw it inline from src/components/site/Logo.tsx)' },
  logoSymbolDark: { src: '/brand/symbol-dark.svg', alt: 'Slow Atlas', width: 32, height: 32, status: 'temporary', usage: 'Logo symbol on light grounds' },

  story: { src: '/media/story.avif', alt: 'A single red wooden house on a green hilltop under a clear blue sky', width: 2670, height: 1780, status: 'have', usage: 'Article — Editorial Story lead image', credit: 'Cassie Boca, Unsplash' },

  article1: { src: '/media/article-1.jpg', alt: 'An empty road running beside a lake, trees on both sides, fog over the water', width: 2400, height: 1800, status: 'have', usage: 'Essay: The lake road in fog', credit: 'Zach Miller, Unsplash' },
  article2: { src: '/media/article-2.jpg', alt: 'Two small boats moored in a calm harbour in misty light', width: 2400, height: 1600, status: 'have', usage: 'Essay: Two boats, one harbour, no hurry', credit: 'JOGphotos, Unsplash' },
  article3: { src: '/media/article-3.jpg', alt: 'An empty desert road running straight to the horizon', width: 2400, height: 1350, status: 'have', usage: 'Essay: The long way down the C14', credit: 'Andrew Svk, Unsplash' },
  article4: { src: '/media/article-4.jpg', alt: 'Red wooden houses on a snowy shore beside a lake', width: 2400, height: 1591, status: 'have', usage: 'Essay: A winter of blue hours', credit: 'Camille Gerstenhaber, Unsplash' },
  article5: { src: '/media/article-5.jpg', alt: 'A narrow cobbled street leading through a stone arch, no people', width: 2400, height: 1800, status: 'have', usage: 'Essay: Kotor after the ships leave', credit: 'Linda Gerbec, Unsplash' },
  article6: { src: '/media/article-6.jpg', alt: 'A green landscape blurred by speed, seen through a train window', width: 2400, height: 1600, status: 'have', usage: 'Essay: Belgrade to Bar, eleven hours', credit: 'viktor rejent, Unsplash' },

  team1: { src: '/media/team-1.jpg', alt: 'Portrait of Marit Lund against a plain white wall', width: 1800, height: 2400, status: 'have', usage: 'About portrait, Team', credit: 'Evgeny Bauder, Unsplash' },
  team2: { src: '/media/team-2.jpg', alt: 'Portrait of Daniel Okafor in a cream ribbed turtleneck against a plain grey wall', width: 1600, height: 2400, status: 'have', usage: 'Team', credit: 'McFollis, Unsplash' },
  team3: { src: '/media/team-3.jpg', alt: 'Portrait of Ines Varga wearing a necklace, against a plain light green wall', width: 1603, height: 2400, status: 'have', usage: 'Team', credit: 'Gus Tu Njana, Unsplash' },

  punctuationImages: { src: '/media/punctuationImages.jpg', alt: '', width: 1600, height: 1200, status: 'optional', usage: 'Between type sections (not used — the site is typography-led)' },
} as const satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets
