'use client'
// OpusKit section — Footer "Say hello", made this site's own: a line drawing of hills, a trail and a small town runs
// across the top and pencils itself in as it comes into view (the style's "line-drawing illustration as the footer");
// the trail ends at the invitation. Then the email at display size (opens mail, a copy button beside it), the studio,
// visits and hours beside it, and one small row of links, copyright and the imprint.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Draw } from '@/components/motion'
import { DrawnLink } from '@/components/pieces/DrawnLink'
import { CopyEmail } from '@/components/site/CopyEmail'
import { Wordmark } from '@/components/site/Header'
import { footer, nav, site } from '@/content/site'

const pen = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, vectorEffect: 'non-scaling-stroke' as const, pathLength: 1, 'data-stroke': '' }
const d = (ms: number, t = 900) => ({ '--d': ms, '--draw-time': `${t}ms` }) as React.CSSProperties

function Landscape() {
  return (
    <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" aria-hidden className="block h-[clamp(110px,15vw,220px)] w-full overflow-visible">
      <g className="text-(--color-muted)" strokeWidth={1}>
        <path d="M0 150 C 120 110, 220 96, 340 118 C 440 136, 520 100, 640 84 C 760 68, 860 104, 960 120 C 1080 140, 1200 96, 1320 92 C 1380 90, 1420 100, 1440 104" {...pen} style={d(0, 1400)} />
        <path d="M0 182 C 160 160, 300 150, 420 166 C 560 184, 700 150, 840 152 C 980 154, 1100 176, 1240 166 C 1330 160, 1400 156, 1440 158" {...pen} style={d(200, 1400)} />
      </g>
      <g className="text-(--color-text)" strokeWidth={1.5}>
        {/* the town on the hill: a few roofs and the tower */}
        <path d="M1090 120 L 1090 96 L 1104 84 L 1118 96 L 1118 120 M1126 120 L 1126 72 L 1134 58 L 1142 72 L 1142 120 M1150 120 L 1150 100 L 1166 88 L 1182 100 L 1182 120 M1190 120 L 1190 104 L 1202 96 L 1214 104 L 1214 120" {...pen} style={d(700, 1000)} />
        {/* a few trees along the way */}
        <path d="M260 128 L 260 116 M300 134 L 300 120 M520 116 L 520 102" {...pen} style={d(900, 300)} />
      </g>
      <g className="text-(--color-text)" strokeWidth={1.2}>
        <circle cx={260} cy={110} r={7} {...pen} style={d(1000, 300)} />
        <circle cx={300} cy={114} r={8} {...pen} style={d(1050, 300)} />
        <circle cx={520} cy={96} r={7} {...pen} style={d(1100, 300)} />
      </g>
      {/* the trail, in marker, from the edge of the page up to the town */}
      <path d="M-10 214 C 140 206, 260 196, 380 186 C 520 174, 600 160, 720 150 C 860 138, 960 136, 1060 124 C 1080 122, 1090 121, 1100 121" {...pen} className="text-(--color-accent)" strokeWidth={2} strokeDasharray="1" style={d(500, 1600)} />
    </svg>
  )
}

export function FooterSection() {
  const path = usePathname()
  return (
    <footer className="mt-auto pb-[max(24px,env(safe-area-inset-bottom))]">
      <Draw className="overflow-hidden"><Landscape /></Draw>
      <div className="border-t border-(--color-text) px-(--gutter) pt-12 md:pt-16">
        <div className="grid-site gap-y-12">
          <div className="col-span-full lg:col-span-8">
            <h2 className="type-display">{footer.invite}</h2>
            <CopyEmail big className="font-(family-name:--font-heading) mt-6 [font-size:clamp(1.6rem,4vw,3.25rem)] [font-weight:700]" />
          </div>
          <dl className="type-body col-span-full grid content-end gap-6 sm:col-span-3 lg:col-span-3 lg:col-start-10">
            <div><dt className="type-utility text-(--color-muted)">Studio</dt><dd>{site.studio}</dd><dd className="text-(--color-muted)">{site.visits}</dd></div>
            <div><dt className="type-utility text-(--color-muted)">Hours</dt><dd>{site.hours}</dd></div>
            <div><dt className="type-utility text-(--color-muted)">Right now</dt><dd>{site.status}</dd></div>
          </dl>
        </div>
        <div className="type-utility mt-16 flex flex-col gap-6 border-t border-(--color-border) pt-6 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer"><ul className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((l) => <li key={l.href}><DrawnLink stroke="wave" href={l.href} current={l.href === '/' ? path === '/' : path.startsWith(l.href)} className="py-3">{l.label}</DrawnLink></li>)}
          </ul></nav>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-(--color-muted)">
            <Link href="/" aria-label={`${site.name}, home`} className="text-(--color-text)"><Wordmark className="[font-size:1.25rem]" /></Link>
            <span>{footer.copyright}</span>
            {footer.legal.map((l) => <DrawnLink key={l.href} stroke="wave" href={l.href} className="py-3">{l.label}</DrawnLink>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
