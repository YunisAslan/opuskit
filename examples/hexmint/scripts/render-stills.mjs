// Renders every still image the site uses from the live 3D scene itself (src/components/scene/HexScene.tsx):
// the hero poster (desktop + phone crop) and the four supporting renders. Run with the dev server up:
//   npm run dev -- -p 3007   then   npm run stills   (STILLS_URL overrides the address)
// Uses your installed Google Chrome through playwright-core; each frame waits for the scene to report it is drawn.
import { chromium } from 'playwright-core'

const base = process.env.STILLS_URL ?? 'http://localhost:3007'
const shots = [
  { variant: 'hero', out: 'hero-poster.jpg', width: 1440, height: 900, scale: 1.5 },
  { variant: 'hero', out: 'hero-poster-mobile.jpg', width: 390, height: 523, scale: 2, mobile: true },
  { variant: 'invoices', out: 'render-invoices.jpg', width: 1600, height: 1200, scale: 1 },
  { variant: 'expenses', out: 'render-expenses.jpg', width: 1600, height: 1200, scale: 1 },
  { variant: 'books', out: 'render-books.jpg', width: 1600, height: 1200, scale: 1 },
  { variant: 'close', out: 'render-close.jpg', width: 1400, height: 1400, scale: 1 },
]

const browser = await chromium.launch({ channel: 'chrome', args: ['--use-angle=metal', '--ignore-gpu-blocklist'] })
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.width, height: s.height }, deviceScaleFactor: s.scale, isMobile: !!s.mobile, hasTouch: !!s.mobile })
  await page.goto(`${base}/?still=${s.variant}`, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: 'nextjs-portal{display:none!important}' })
  await page.waitForFunction(() => window.__stillReady === true, null, { timeout: 30000 })
  await page.screenshot({ path: `public/media/${s.out}`, type: 'jpeg', quality: 78 })
  console.log('wrote public/media/' + s.out)
  await page.close()
}
await browser.close()
