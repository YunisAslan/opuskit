'use client'
// The six tracks on Listen. One <audio> for all of them, so only one ever plays; starting a track turns the site's
// own sound off (by pressing its switch, so the switch shows "off" too), and turning the site's sound on pauses the
// track. Each row: a play button, the title, its length, where it was recorded and what it was made for.
import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import type { Track } from '@/content/site'

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
const soundSwitch = () => document.querySelector<HTMLButtonElement>('[data-opuskit-sound]')

export function Tracks({ tracks }: { tracks: Track[] }) {
  const audio = useRef<HTMLAudioElement>(null)
  const [current, setCurrent] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [length, setLength] = useState(75)

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
    <div className="px-5 py-12 md:px-8">
      <audio ref={audio} preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setTime(0) }} onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)} onDurationChange={(e) => setLength(e.currentTarget.duration || 75)} />
      <ol className="mx-auto max-w-[1440px] border-t border-border">
        {tracks.map((t, i) => {
          const on = current === i && playing
          return (
            <Reveal as="li" key={t.slug} delay={i * 0.06} className="border-b border-border">
              <article id={t.slug} className="grid scroll-mt-24 grid-cols-[auto_1fr] items-start gap-x-5 gap-y-3 py-8 md:grid-cols-12 md:items-center md:gap-8">
                <button type="button" onClick={() => toggle(i)} aria-pressed={on} aria-label={`${on ? 'Pause' : 'Play'} ${t.title}`}
                  className={`grid size-14 place-items-center rounded-full border transition-colors duration-150 md:col-span-1 ${on ? 'border-(--color-text) bg-(--color-text) text-(--color-background)' : 'border-(--color-muted) hover:bg-secondary'}`}>
                  {on ? <Pause className="size-5" fill="currentColor" strokeWidth={0} /> : <Play className="ml-0.5 size-5" fill="currentColor" strokeWidth={0} />}
                </button>
                <div className="md:col-span-4">
                  <h2 className="type-heading">{t.title}</h2>
                  <p className="type-utility mt-2 text-(--color-muted)" aria-live={current === i ? 'polite' : undefined}>
                    {current === i ? `${clock(time)} / ${t.length}` : t.length}
                  </p>
                </div>
                <dl className="col-span-2 grid gap-3 sm:grid-cols-2 md:col-span-7 md:gap-8">
                  <div><dt className="type-body text-(--color-muted)">Recorded</dt><dd className="type-body mt-1">{t.recorded}</dd></div>
                  <div><dt className="type-body text-(--color-muted)">Made for</dt><dd className="type-body mt-1">{t.madeFor}</dd></div>
                </dl>
                {current === i && (
                  <div aria-hidden className="col-span-2 h-px bg-border md:col-span-12">
                    <div className="h-px origin-left bg-(--color-text)" style={{ transform: `scaleX(${Math.min(1, time / length)})` }} />
                  </div>
                )}
              </article>
            </Reveal>
          )
        })}
      </ol>
    </div>
  )
}
