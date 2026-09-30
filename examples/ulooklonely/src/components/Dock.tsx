'use client'
// Floating dock (desktop/tablet): centred 20px from the bottom, icons magnify under the pointer, tooltips name
// the page. Phones get a fixed bottom tab bar with the same icons; the account menu opens as a bottom sheet there.
import { Aperture, Clapperboard, House, LogIn, UserRound, type LucideIcon } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import { useReduced } from '@/lib/use-media'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { buttonVariants } from '@/components/ui/button'

const PAGES: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/', label: 'Home', icon: House },
  { href: '/work', label: 'Work', icon: Clapperboard },
  { href: '/about', label: 'About', icon: UserRound },
  { href: '/services', label: 'Services', icon: Aperture },
]
const ACCOUNT = [{ href: '/sign-in', label: 'Sign in' }, { href: '/sign-up', label: 'Sign up' }]

const tile = 'relative flex size-11 items-center justify-center border-2 border-transparent transition-colors duration-150 hover:bg-(--color-secondary) focus-visible:border-(--color-text) aria-[current=page]:text-(--color-accent)'

function Magnify({ mouseX, children }: { mouseX: MotionValue<number>; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReduced()
  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect()
    return r ? x - (r.left + r.width / 2) : Infinity
  })
  const scale = useSpring(useTransform(distance, [-110, 0, 110], [1, 1.35, 1]), { stiffness: 320, damping: 24, mass: 0.2 })
  return <motion.div ref={ref} style={reduce ? undefined : { scale, transformOrigin: '50% 100%' }}>{children}</motion.div>
}

export function Dock() {
  const path = usePathname()
  const mouseX = useMotionValue(Infinity)
  const onAccount = ACCOUNT.some((a) => a.href === path)

  return (
    <>
      {/* Desktop + tablet dock */}
      <NavigationMenu viewport={false} aria-label="Main" style={{ viewTransitionName: "dock" }} className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 md:flex">
        <div onMouseMove={(e) => mouseX.set(e.clientX)} onMouseLeave={() => mouseX.set(Infinity)}
          className="flex items-end gap-2 border-2 border-(--color-text) bg-(--color-surface) p-2 shadow-(--shadow-card)">
          <NavigationMenuList className="gap-2">
            {PAGES.map(({ href, label, icon: Icon }) => (
              <NavigationMenuItem key={href}>
                <Magnify mouseX={mouseX}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavigationMenuLink asChild>
                        <Link href={href} aria-label={label} aria-current={path === href ? 'page' : undefined} className={tile}>
                          <Icon className="size-5" strokeWidth={2} aria-hidden />
                        </Link>
                      </NavigationMenuLink>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={14} className="type-utility">{label}</TooltipContent>
                  </Tooltip>
                </Magnify>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
          <span aria-hidden className="mx-1 h-8 w-0.5 self-center bg-(--color-text)" />
          <Magnify mouseX={mouseX}>
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger aria-label="Account" className={`${buttonVariants({ size: 'default' })} gap-2`}>
                    <LogIn className="size-4" aria-hidden /> {onAccount ? 'Account' : 'Sign in'}
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={14} className="type-utility">Account</TooltipContent>
              </Tooltip>
              <DropdownMenuContent side="top" align="end" sideOffset={12} className="min-w-44">
                {ACCOUNT.map((a) => (
                  <DropdownMenuItem key={a.href} asChild className="type-utility min-h-11 px-3">
                    <Link href={a.href} aria-current={path === a.href ? 'page' : undefined}>{a.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </Magnify>
        </div>
      </NavigationMenu>

      {/* Phone tab bar */}
      <nav aria-label="Main" style={{ viewTransitionName: "tabbar" }} className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-(--color-text) bg-(--color-surface) pb-[env(safe-area-inset-bottom)] md:hidden">
        <ul className="grid grid-cols-5">
          {PAGES.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link href={href} aria-current={path === href ? 'page' : undefined}
                className="type-utility flex min-h-14 flex-col items-center justify-center gap-1 [font-size:0.75rem] aria-[current=page]:text-(--color-accent) active:bg-(--color-secondary)">
                <Icon className="size-5" aria-hidden /> {label}
              </Link>
            </li>
          ))}
          <li>
            <Sheet>
              <SheetTrigger className="type-utility flex min-h-14 w-full flex-col items-center justify-center gap-1 [font-size:0.75rem] data-[state=open]:bg-(--color-secondary)" aria-current={onAccount ? 'page' : undefined}>
                <LogIn className="size-5" aria-hidden /> Account
              </SheetTrigger>
              <SheetContent side="bottom" className="border-t-2 border-(--color-text) bg-(--color-surface) pb-[max(env(safe-area-inset-bottom),24px)]">
                <SheetHeader>
                  <SheetTitle className="type-heading">Account</SheetTitle>
                  <SheetDescription className="type-body text-(--color-muted)">Save films for later and get a note when a new one is out.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 px-4">
                  {ACCOUNT.map((a, i) => (
                    <SheetClose key={a.href} asChild><Link href={a.href} className={buttonVariants({ variant: i === 0 ? "default" : "outline", size: "lg" })}>{a.label}</Link></SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </li>
        </ul>
      </nav>
    </>
  )
}
