"use client"
import Link from "next/link"
import { motion, AnimatePresence, useSpring } from "motion/react"
import { useState } from "react"
import { formatPrice, getProduct } from "@/data/products"
import { useFinePointer, useReducedMotion } from "@/lib/motion"
import { ClipReveal, LineReveal, Reveal, RevealItem } from "./Reveal"
import { MediaAsset } from "./MediaAsset"

const pieces = ["crossing-hoodie", "crossing-sweatpant", "star-sling"].map((s) => getProduct(s)!)

export function Collection() {
  return (
    <section aria-labelledby="collection-title">
      <div className="relative h-svh">
        <ClipReveal className="absolute inset-0">
          <MediaAsset id="collectionWide" fill className="hidden sm:block" />
          <MediaAsset id="collectionTall" fill className="sm:hidden" />
        </ClipReveal>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-content grid grid-cols-12 gap-6 pb-12 md:pb-16">
            <div className="col-span-12 md:col-span-6">
              <p className="font-utility text-utility">Autumn 2026</p>
              <LineReveal id="collection-title" as="h2" className="mt-2 font-display text-display"
                lines={["The", "Crossing"]} />
            </div>
          </div>
        </div>
      </div>

      <div className="container-content grid grid-cols-12 gap-6 py-32 md:py-40">
        <Reveal className="col-span-12 md:col-span-8 md:col-start-3">
          <RevealItem as="div">
            <p className="max-w-[52ch] text-lg">
              Eleven pieces shot on one corner of Rua de Santa Catarina at four in the afternoon. Grey loopback fleece,
              a cobalt cap and a sling in star print. Everything here was dropped, thrown or sat in on asphalt before we
              agreed to sell it.
            </p>
          </RevealItem>
          <RevealItem as="div">
            <KeyPieces />
          </RevealItem>
          <RevealItem as="div">
            <Link href="/shop" className="btn btn-primary mt-12">Shop the collection</Link>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  )
}

/** Hover media preview: on fine pointers the piece's image follows the cursor; elsewhere it sits in the row. */
function KeyPieces() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const x = useSpring(0, { stiffness: 150, damping: 20, mass: 0.4 })
  const y = useSpring(0, { stiffness: 150, damping: 20, mass: 0.4 })
  const follow = fine && !reduced

  return (
    <div className="relative mt-16"
      onPointerMove={(e) => {
        if (!follow) return
        const r = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - r.left + 24)
        y.set(e.clientY - r.top - 120)
      }}
      onPointerLeave={() => setActive(null)}>
      <ul className="border-t border-border">
        {pieces.map((p, i) => (
          <li key={p.slug} className="border-b border-border" onPointerEnter={() => fine && setActive(i)}>
            <Link href={`/shop/${p.slug}`} className="flex min-h-11 items-center gap-4 py-6 transition-opacity duration-150 hover:opacity-80">
              <span className={`relative aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-lg ${fine ? "hidden" : ""}`}>
                <MediaAsset id={p.images[0]} fill sizes="64px" />
              </span>
              <span className="flex-1 font-heading text-heading">{p.name}</span>
              <span>{formatPrice(p.price)}</span>
            </Link>
          </li>
        ))}
      </ul>
      {fine && (
        <motion.div aria-hidden className={`pointer-events-none absolute z-10 aspect-[4/5] w-56 overflow-hidden rounded-2xl ${reduced ? "top-0 -right-64 hidden xl:block" : "top-0 left-0"}`}
          style={follow ? { x, y } : undefined}>
          <AnimatePresence>
            {active !== null && (
              <motion.div key={active} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}>
                <MediaAsset id={pieces[active].images[0]} fill sizes="224px" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
