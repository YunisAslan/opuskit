// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Every image here is rendered from the 3D scene in code (src/components/scene/HexScene.tsx) with `npm run stills`,
// so they always match the live hero. Replacing one = replacing the file at that path or editing one line here.
export type Asset = { src: string; mobile?: string; width: number; height: number; alt: string; status: 'have' | 'temporary'; usage: string }

export const assets = {
  heroPoster: { src: '/media/hero-poster.jpg', mobile: '/media/hero-poster-mobile.jpg', width: 2160, height: 1350, alt: '', status: 'have', usage: 'Hero poster: loading state, reduced motion and weak-GPU fallback' },
  renderInvoices: { src: '/media/render-invoices.jpg', width: 1600, height: 1200, alt: 'Three stacks of thin hexagonal plates, the top plate of the tallest stack in lemon', status: 'have', usage: 'Home, feature row: invoices' },
  renderExpenses: { src: '/media/render-expenses.jpg', width: 1600, height: 1200, alt: 'A flat honeycomb of navy tiles with one row rising step by step to a lemon tile', status: 'have', usage: 'Home, feature row: expenses' },
  renderBooks: { src: '/media/render-books.jpg', width: 1600, height: 1200, alt: 'Four hexagonal columns rising quarter by quarter, the fourth in lemon', status: 'have', usage: 'Home, feature row: books' },
  renderClose: { src: '/media/render-close.jpg', width: 1400, height: 1400, alt: 'A perfectly level honeycomb of navy tiles with a single lemon tile at its centre', status: 'have', usage: 'Features, the one-click close' },
} satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets
