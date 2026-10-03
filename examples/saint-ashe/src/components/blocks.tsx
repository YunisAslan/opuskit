'use client'
// Page blocks that need the browser: the filterable product grid, the journal list (pages + hover preview),
// the season's sideways strip, and the two forms (no backend: both hand over to the visitor's email app).
import { useLayoutEffect, useRef, useState, type FormEvent, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { toast } from 'sonner'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { JournalSection, type Entry } from '@/components/sections/Journal'
import { NewsletterSection } from '@/components/sections/Newsletter'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ProductLink } from '@/components/shop'
import { RollLink } from '@/components/RollLink'
import { useDesktop } from '@/components/motion'
import { EMAIL, euro, products } from '@/data/shop'

// ---------- Product grid with filter chips and sort ----------
const CATEGORIES = ['All', 'Outerwear', 'Clothing', 'Accessories'] as const
const SORTS = { featured: 'As shown', low: 'Price, low to high', high: 'Price, high to low' } as const
const chip = 'type-utility h-11 border border-(--color-border) px-4 data-[state=on]:border-(--color-text) data-[state=on]:bg-(--color-surface) hover:bg-(--color-surface)'
const selectTrigger = 'type-utility h-11! min-w-48 border-(--color-muted) px-4 focus-visible:border-(--color-text) data-placeholder:text-(--color-muted)'
const selectContent = 'border-(--color-border) bg-(--color-surface) text-(--color-text)'
const selectItem = 'type-utility min-h-11 focus:bg-(--color-secondary) focus:text-(--color-text)'

export function ShopGrid({ title, id }: { title: string; id?: string }) {
  const [cat, setCat] = useState<string>('All')
  const [sort, setSort] = useState<keyof typeof SORTS>('featured')
  const list = products
    .filter((p) => cat === 'All' || p.category === cat)
    .sort((a, b) => (sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0))
  const toolbar = (
    <div className="flex flex-wrap items-center gap-3">
      <ToggleGroup type="single" value={cat} onValueChange={(v) => v && setCat(v)} aria-label="Show" className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => <ToggleGroupItem key={c} value={c} className={chip}>{c}</ToggleGroupItem>)}
      </ToggleGroup>
      <Select value={sort} onValueChange={(v) => setSort(v as keyof typeof SORTS)}>
        <SelectTrigger aria-label="Sort by" className={selectTrigger}><SelectValue /></SelectTrigger>
        <SelectContent className={selectContent}>
          {Object.entries(SORTS).map(([k, v]) => <SelectItem key={k} value={k} className={selectItem}>{v}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  )
  return (
    <ProductGridSection id={id} title={title} link={ProductLink} toolbar={toolbar}
      products={list.map((p) => ({
        name: p.name, price: euro(p.price), image: p.image, alt: p.alt, href: `#${p.slug}`,
        soldOut: p.stock === 'out', badge: p.stock === 'few' ? 'Last few' : undefined,
      }))} />
  )
}

// ---------- Journal: three at a time, the photo follows the pointer ----------
export function JournalBlock({ entries }: { entries: Entry[] }) {
  const [page, setPage] = useState(0)
  const pages = Math.ceil(entries.length / 3)
  const reduce = useReducedMotion()
  const [img, setImg] = useState<string | null>(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 28 }), sy = useSpring(y, { stiffness: 220, damping: 28 })
  const box = useRef<HTMLDivElement>(null)
  const move = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const hit = (e.target as HTMLElement).closest<HTMLElement>('[data-image]')
    setImg(hit?.dataset.image ?? null)
    const r = box.current!.getBoundingClientRect()
    x.set(reduce ? r.width - 340 : e.clientX - r.left + 32)
    y.set(reduce ? 0 : e.clientY - r.top - 140)
  }
  return (
    <div ref={box} className="relative" onPointerMove={move} onPointerLeave={() => setImg(null)}>
      <JournalSection title="Journal" titleHidden preview link={RollLink} entries={entries.slice(page * 3, page * 3 + 3)} />
      <motion.img src={img ?? undefined} alt="" aria-hidden style={{ x: reduce ? x : sx, y: reduce ? y : sy }}
        className={`pointer-events-none absolute top-0 left-0 z-10 hidden aspect-[4/5] w-[280px] object-cover transition-opacity duration-[250ms] ease-out [@media(pointer:fine)]:block ${img ? 'opacity-100' : 'opacity-0'}`} />
      <Pagination className="-mt-20 justify-start px-4 pb-32 md:-mt-28 md:px-10 md:pb-40">
        <PaginationContent className="mx-auto w-full max-w-[1440px] gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink href="#journal" isActive={i === page} aria-label={`Journal page ${i + 1}`}
                onClick={(e) => { e.preventDefault(); setPage(i) }}
                className="type-utility size-11 border-(--color-border) bg-transparent data-[active=true]:border-(--color-text)">{i + 1}</PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  )
}

// ---------- The season, sideways: pinned on desktop, swiped on phones ----------
export type StripPhoto = { src: string; alt: string; caption: string }
export function SeasonStrip({ photos }: { photos: StripPhoto[] }) {
  const reduce = useReducedMotion()
  const desktop = useDesktop()
  const pinned = desktop && !reduce
  const frame = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  useLayoutEffect(() => {
    if (!pinned) return
    const measure = () => setDistance(Math.max(0, track.current!.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure); ro.observe(track.current!)
    return () => ro.disconnect()
  }, [pinned])
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const n = String(photos.length).padStart(2, '0')
  const items = photos.map((p, i) => (
    <figure key={p.src} className="shrink-0 snap-start">
      <img src={p.src} alt={p.alt} loading="lazy" className="h-[62svh] w-auto max-w-none object-cover md:h-[66vh]" />
      <figcaption className="type-utility mt-3 flex gap-4 text-(--color-muted)"><span className="tabular-nums">{String(i + 1).padStart(2, '0')} / {n}</span><span>{p.caption}</span></figcaption>
    </figure>
  ))
  if (!pinned) return (
    <div ref={frame} className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 py-24 [scrollbar-width:none] md:scroll-px-10 md:px-10 md:py-32">{items}</div>
  )
  return (
    <div ref={frame} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex gap-12 px-10 pt-16">{items}</motion.div>
      </div>
    </div>
  )
}

// ---------- Newsletter: no list provider yet, so it writes the sign-up email ----------
export function NewsletterBlock() {
  const join = (email: string) => {
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Add me to the monthly letter')}&body=${encodeURIComponent(`Please add ${email} to the Saint Ashe letter.`)}`
    toast('Your email app is opening', { description: 'Send the message and you are on the list.' })
  }
  return (
    <NewsletterSection title="One letter a month from the workshop"
      text="What we are cutting, when a run goes on sale, and which pieces are nearly gone. Written by the three of us, sent on the first Sunday."
      placeholder="you@example.com" button="Join the letter" note="Once a month. One reply with the word stop and you are off it." onSubmit={join} />
  )
}

// ---------- Contact form: validated here, sent from the visitor's own email app ----------
const SUBJECTS = ['An order', 'Sizing and fit', 'Repairs and resoling', 'Wholesale', 'Something else']
type Errors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>
const field = 'type-body min-h-12 border-(--color-muted) bg-(--color-surface) px-4 text-(--color-text) placeholder:text-(--color-muted) focus-visible:border-(--color-text) aria-invalid:border-(--color-text) md:text-base'

export function validate(v: { name: string; email: string; subject: string; message: string }): Errors {
  const e: Errors = {}
  if (!v.name.trim()) e.name = 'Tell us what to call you.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'This email address looks incomplete.'
  if (!v.subject) e.subject = 'Choose what it is about.'
  if (v.message.trim().length < 10) e.message = 'A few more words, please.'
  return e
}

export function ContactForm() {
  const [subject, setSubject] = useState('')
  const [letter, setLetter] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const f = new FormData(ev.currentTarget)
    const v = { name: String(f.get('name') ?? ''), email: String(f.get('email') ?? ''), subject, message: String(f.get('message') ?? '') }
    const e = validate(v)
    setErrors(e)
    if (Object.keys(e).length) return
    const body = `${v.message}\n\n${v.name}\n${v.email}${letter ? '\n\nPlease add me to the monthly letter.' : ''}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`${v.subject}, from ${v.name}`)}&body=${encodeURIComponent(body)}`
    toast('Your email app is opening', { description: 'Your message is written in. Press send and we answer within a day.' })
  }
  const err = (k: keyof Errors) => errors[k] && <p id={`${k}-error`} className="type-utility mt-2 text-(--color-text)">{errors[k]}</p>
  const a11y = (k: keyof Errors) => ({ 'aria-invalid': !!errors[k] || undefined, 'aria-describedby': errors[k] ? `${k}-error` : undefined })
  return (
    <form id="message" noValidate onSubmit={submit} className="mt-24 grid max-w-[760px] scroll-mt-28 gap-6 md:grid-cols-2">
      <div><Label htmlFor="name" className="type-utility mb-2 text-(--color-muted)">Name</Label><Input id="name" name="name" autoComplete="name" className={field} {...a11y('name')} />{err('name')}</div>
      <div><Label htmlFor="email" className="type-utility mb-2 text-(--color-muted)">Email</Label><Input id="email" name="email" type="email" autoComplete="email" className={field} {...a11y('email')} />{err('email')}</div>
      <div className="md:col-span-2">
        <Label htmlFor="subject" className="type-utility mb-2 text-(--color-muted)">About</Label>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger id="subject" className={`${selectTrigger} w-full bg-(--color-surface) md:w-80`} {...a11y('subject')}><SelectValue placeholder="Choose one" /></SelectTrigger>
          <SelectContent className={selectContent}>{SUBJECTS.map((s) => <SelectItem key={s} value={s} className={selectItem}>{s}</SelectItem>)}</SelectContent>
        </Select>
        {err('subject')}
      </div>
      <div className="md:col-span-2"><Label htmlFor="message-text" className="type-utility mb-2 text-(--color-muted)">Message</Label><Textarea id="message-text" name="message" rows={5} className={`${field} min-h-36 py-3`} {...a11y('message')} />{err('message')}</div>
      <div className="flex min-h-11 items-center gap-3 md:col-span-2">
        <Checkbox id="letter" checked={letter} onCheckedChange={(c) => setLetter(c === true)} className="size-5 border-(--color-muted)" />
        <Label htmlFor="letter" className="type-body">Add me to the monthly letter</Label>
      </div>
      <div className="md:col-span-2">
        <Button type="submit" className="type-body h-12 bg-(--color-primary) px-8 text-(--color-background) hover:bg-(--color-muted)">Write the email</Button>
        <p className="type-utility mt-3 text-(--color-muted)">Opens your email app with everything filled in.</p>
      </div>
    </form>
  )
}
