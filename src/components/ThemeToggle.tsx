'use client'
// Light / dark. The page starts in the visitor's system mode (THEME_SCRIPT, before paint); a click picks the other
// one and remembers it — unless it is the system's own mode again, then the system leads once more.
import { useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

const KEY = 'opuskit-theme'
const system = () => matchMedia('(prefers-color-scheme: dark)')

export const THEME_SCRIPT = `try{var t=localStorage.getItem('${KEY}');document.documentElement.classList.toggle('dark',t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches)}catch(e){}`

export function ThemeToggle({ className = '' }: { className?: string }) {
  // While nothing is stored, follow the system as it changes (sunset, a settings switch).
  useEffect(() => {
    const m = system()
    const follow = () => { try { if (!localStorage.getItem(KEY)) document.documentElement.classList.toggle('dark', m.matches) } catch {} }
    m.addEventListener('change', follow)
    return () => m.removeEventListener('change', follow)
  }, [])

  const flip = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dark = !document.documentElement.classList.contains('dark')
    const apply = () => {
      document.documentElement.classList.toggle('dark', dark)
      try { if (dark === system().matches) localStorage.removeItem(KEY); else localStorage.setItem(KEY, dark ? 'dark' : 'light') } catch {}
    }
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply()
    // The new mode spreads from the button as a circle.
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = left + width / 2, y = top + height / 2
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' })
    })
  }

  return (
    <button type="button" onClick={flip} aria-label="Switch light or dark mode" title="Light / dark"
      className={`grid size-9 place-items-center rounded-[3px] border border-line text-ink-2 transition-colors hover:border-ink hover:text-ink [&_svg]:transition-transform [&_svg]:duration-500 hover:[&_svg]:rotate-[24deg] ${className}`}>
      <Moon size={16} className="dark:hidden" aria-hidden />
      <Sun size={16} className="hidden dark:block" aria-hidden />
    </button>
  )
}
