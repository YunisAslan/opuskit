// A colour band with a soft wavy top edge: one colour melts into the next instead of meeting on a hard line.
// tone: ground (espresso), surface (one step up), inverse (cream). The wave is drawn in the band's own colour and
// sits over the bottom of whatever comes before it.
import type { ReactNode } from 'react'

type Tone = 'ground' | 'surface' | 'inverse'

export function Band({ tone = 'ground', wave = true, id, className = '', children }: { tone?: Tone; wave?: boolean; id?: string; className?: string; children: ReactNode }) {
  const fill = tone === 'surface' ? 'var(--color-surface)' : 'var(--color-background)'
  return (
    <div id={id} data-tone={tone === 'ground' ? undefined : tone} className={`relative isolate ${tone === 'ground' ? 'bg-(--color-background) text-(--color-text)' : ''} ${className}`}>
      {wave && <WaveEdge fill={fill} />}
      {children}
    </div>
  )
}

export function WaveEdge({ fill, flip = false }: { fill: string; flip?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 56" preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 h-7 w-full md:h-12 ${flip ? 'top-full rotate-180' : 'bottom-full'}`}
      style={{ marginBottom: flip ? undefined : -1 }}>
      <path fill={fill} d="M0 56V30C60 30 90 8 180 8s120 22 180 22 90-22 180-22 120 22 180 22 90-22 180-22 120 22 180 22 90-22 180-22 120 22 180 22v26Z" />
    </svg>
  )
}
