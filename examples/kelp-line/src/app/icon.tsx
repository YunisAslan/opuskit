// Favicon from the logo: until the owner's own symbol exists, the first letter of the wordmark in the display face,
// pale ink on the bottle green (assets/manifest.json → logo).
import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

async function serif(): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch('https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif&text=K')).text()
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
    return url ? await (await fetch(url)).arrayBuffer() : null
  } catch {
    return null
  }
}

export default async function Icon() {
  const font = await serif()
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F3F2E', color: '#EEF3EC', borderRadius: 12, fontSize: 50, fontFamily: font ? 'Hedvig' : 'serif', paddingBottom: 4 }}>
        K
      </div>
    ),
    { ...size, fonts: font ? [{ name: 'Hedvig', data: font, weight: 400, style: 'normal' }] : [] },
  )
}
