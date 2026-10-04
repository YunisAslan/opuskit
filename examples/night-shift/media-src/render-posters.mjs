// node media-src/render-posters.mjs <wide|tall> <w> <h> <out.jpg> — with the dev server on :3010. wide: 1920 1080 public/media/console-poster.jpg; tall: 1080 1350 public/media/console-poster-mobile.jpg
import { chromium } from 'playwright'
import { writeFileSync } from 'node:fs'
const [layout, w, h, out] = process.argv.slice(2)
const browser = await chromium.launch({ channel: 'chrome', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] })
const page = await (await browser.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 })).newPage()
await page.goto(`http://localhost:3010/?poster=${layout}`, { waitUntil: 'networkidle' })
await page.waitForFunction(() => window.__posterReady === true, null, { timeout: 30000 })
await page.waitForTimeout(1500)
const data = await page.evaluate(() => document.querySelector('canvas').toDataURL('image/jpeg', 0.84))
writeFileSync(out, Buffer.from(data.split(',')[1], 'base64'))
console.log('saved', out)
await browser.close()
