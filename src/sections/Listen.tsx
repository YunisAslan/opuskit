'use client'
// OpusKit section — Listen: tracks to play right on the page. One <audio> for all of them, so only one ever plays; each
// row has a play button, the title, its length and a few plain facts (where it was recorded, what it was made for).
// Starting a track turns the site's own sound off (it presses the AmbientSound switch, `data-opuskit-sound`, so the
// switch shows "off" too), and turning that sound on pauses the track.
import { useEffect, useRef, useState } from 'react'

export type ListenTrack = { title: string; src: string; length: string; details?: { label: string; value: string }[] }

const clock = (t: number) => { const s = Math.floor(t % 60); return `${Math.floor(t / 60)}:${s < 10 ? '0' : ''}${s}` }
const soundSwitch = () => document.querySelector<HTMLButtonElement>('[data-opuskit-sound]')
const Icon = ({ on }: { on: boolean }) => (
  <svg viewBox="0 0 16 16" aria-hidden className="size-5" fill="currentColor">{on ? <path d="M4 2h3v12H4zM9 2h3v12H9z" /> : <path d="M5 2.5v11l9-5.5z" />}</svg>
)

export function ListenSection({ tone, title, text, tracks, play = 'Play', pause = 'Pause' }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title?: string; text?: string; tracks: ListenTrack[]; play?: string; pause?: string }) {
  const audio = useRef<HTMLAudioElement>(null)
  const [current, setCurrent] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [length, setLength] = useState(0)

  useEffect(() => {
    // The site's sound switched on while a track plays: the track gives way.
    const s = soundSwitch()
    if (!s) return
    const mo = new MutationObserver(() => { if (s.getAttribute('aria-pressed') === 'true') audio.current?.pause() })
    mo.observe(s, { attributes: true, attributeFilter: ['aria-pressed'] })
    return () => mo.disconnect()
  }, [])

  const toggle = (i: number) => {
    const a = audio.current
    if (!a) return
    if (current === i && !a.paused) return a.pause()
    if (current !== i) { a.src = tracks[i].src; setCurrent(i); setTime(0) }
    const s = soundSwitch()
    if (s?.getAttribute('aria-pressed') === 'true') s.click()
    a.play().catch(() => setPlaying(false))
  }

  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        {title && <h2 className="type-heading">{title}</h2>}
        {text && <p className="type-body mt-4 max-w-[52ch] text-(--color-muted)">{text}</p>}
        <audio ref={audio} preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); setTime(0) }} onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)} onDurationChange={(e) => setLength(e.currentTarget.duration || 0)} />
        <ol className={`${title || text ? 'mt-12' : ''} border-t border-(--color-border)`}>
          {tracks.map((t, i) => {
            const on = current === i && playing
            return (
              <li key={t.src} className="grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-3 border-b border-(--color-border) py-7 md:grid-cols-12 md:items-center md:gap-8">
                <button type="button" onClick={() => toggle(i)} aria-pressed={on} aria-label={`${on ? pause : play} ${t.title}`}
                  className={`grid size-14 cursor-pointer place-items-center rounded-full border transition-colors duration-150 md:col-span-1 ${on ? 'border-(--color-text) bg-(--color-text) text-(--color-background)' : 'border-(--color-muted) text-(--color-text) hover:border-(--color-text)'}`}>
                  <Icon on={on} />
                </button>
                <div className="md:col-span-4">
                  <h3 className="type-heading [font-size:clamp(1.15rem,1.8vw,1.5rem)]">{t.title}</h3>
                  <p className="type-utility mt-2 tabular-nums text-(--color-muted)" aria-live={current === i ? 'polite' : undefined}>{current === i ? `${clock(time)} / ${t.length}` : t.length}</p>
                </div>
                {t.details && t.details.length > 0 && (
                  <dl className="col-span-2 grid gap-3 sm:grid-cols-2 md:col-span-7 md:gap-8">
                    {t.details.map((d) => <div key={d.label}><dt className="type-body text-(--color-muted)">{d.label}</dt><dd className="type-body mt-1">{d.value}</dd></div>)}
                  </dl>
                )}
                {current === i && length > 0 && (
                  <div aria-hidden className="col-span-2 h-px bg-(--color-border) md:col-span-12">
                    <div className="h-px origin-left bg-(--color-text)" style={{ transform: `scaleX(${Math.min(1, time / length)})` }} />
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
