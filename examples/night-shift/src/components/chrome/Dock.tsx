'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useReduce } from '@/lib/useMedia'
import { useRef } from 'react'
import { House, ListOrdered, Ticket, UserRound, MessageCircleQuestion, CirclePlus, type LucideIcon } from 'lucide-react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { TextScramble } from '@/components/pieces/TextScramble'
import { pages } from '@/content/site'

const ICONS: Record<string, LucideIcon> = { '/': House, '/curriculum': ListOrdered, '/enrol': Ticket, '/instructor': UserRound, '/faq': MessageCircleQuestion }

// Floating dock (desktop): page icons that magnify under the pointer, a tooltip with each page's name, and the one
// filled action. Phones get a fixed bottom tab bar with the same icons and their names.
export function Dock() {
  const path = usePathname()
  const mouseX = useMotionValue(Infinity)
  const reduce = useReduce()
  const current = (href: string) => (href === '/' ? path === '/' : path.startsWith(href))

  return (
    <>
      <NavigationMenu viewport={false} aria-label="Main" className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 md:flex">
        <NavigationMenuList onMouseMove={(e) => mouseX.set(e.clientX)} onMouseLeave={() => mouseX.set(Infinity)}
          className="items-end gap-2 rounded-(--radius-card) border border-(--color-border) bg-(--color-background)/85 p-2 backdrop-blur-md">
          {pages.map((p) => (
            <NavigationMenuItem key={p.href}>
              <DockIcon mouseX={mouseX} still={!!reduce} href={p.href} label={p.label} icon={ICONS[p.href]} current={current(p.href)} />
            </NavigationMenuItem>
          ))}
          <li aria-hidden className="mx-1 h-8 w-px self-center bg-(--color-border)" />
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="#enrol" className="type-utility flex h-11 items-center rounded-(--radius-button) bg-(--color-primary) px-4 text-[0.9375rem] text-(--color-background) transition-colors duration-150 hover:bg-(--color-muted) focus:bg-(--color-muted)">Reserve a seat</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-40 border-t border-(--color-border) bg-(--color-background)/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
        <ul className="grid grid-cols-6">
          {pages.map((p) => {
            const Icon = ICONS[p.href]
            return (
              <li key={p.href}>
                <Link href={p.href} aria-current={current(p.href) ? 'page' : undefined}
                  className={`flex min-h-14 flex-col items-center justify-center gap-1 px-0.5 text-[0.6875rem] font-semibold transition-colors ${current(p.href) ? 'text-(--color-text)' : 'text-(--color-muted)'}`}>
                  <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                  <TextScramble replayOnHover={false}>{p.label}</TextScramble>
                </Link>
              </li>
            )
          })}
          <li>
            <Link href="#enrol" className="flex min-h-14 flex-col items-center justify-center gap-1 bg-(--color-primary) text-[0.6875rem] font-semibold text-(--color-background)">
              <CirclePlus className="size-5" strokeWidth={1.5} aria-hidden />
              Reserve
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

function DockIcon({ mouseX, still, href, label, icon: Icon, current }: { mouseX: MotionValue<number>; still: boolean; href: string; label: string; icon: LucideIcon; current: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const distance = useTransform(mouseX, (x) => { const r = ref.current?.getBoundingClientRect(); return r ? x - (r.left + r.width / 2) : Infinity })
  const scale = useSpring(useTransform(distance, [-110, 0, 110], [1, 1.32, 1]), { stiffness: 320, damping: 26, mass: 0.2 })
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavigationMenuLink asChild active={current}>
          <Link ref={ref} href={href} aria-label={label} aria-current={current ? 'page' : undefined}
            className="relative flex size-11 items-center justify-center rounded-(--radius-button) p-0 text-(--color-muted) hover:bg-transparent hover:text-(--color-text) focus:bg-(--color-surface) data-[active=true]:bg-transparent data-[active=true]:text-(--color-text)">
            <motion.span style={still ? undefined : { scale }} className="flex origin-bottom">
              <Icon className="size-5" strokeWidth={1.5} aria-hidden />
            </motion.span>
            {current && <span aria-hidden className="absolute bottom-0.5 size-1 rounded-full bg-(--color-accent)" />}
          </Link>
        </NavigationMenuLink>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={12}><TextScramble duration={0.4} replayOnHover={false}>{label}</TextScramble></TooltipContent>
    </Tooltip>
  )
}
