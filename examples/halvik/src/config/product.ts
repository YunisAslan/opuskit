// The one source for what Halvik sells and what it costs — the hero, pricing, the buy panel and the CTA all read it.
export const builds = {
  complete: { name: 'Halvik 65', line: 'Assembled, with switches and keycaps', price: 219 },
  barebones: { name: 'Halvik 65 Barebones', line: 'Case, plate and board; bring your own switches and caps', price: 159 },
  dial: { name: 'Halvik Dial', line: 'The dial pad on its own', price: 69 },
} as const
export type Build = keyof typeof builds

export const dialAddOn = 59 // the Dial with a keyboard, instead of 69 on its own
export const switchTypes = {
  linear: { name: 'Linear', line: 'Smooth all the way down, quiet thock' },
  tactile: { name: 'Tactile', line: 'A soft bump where the key fires' },
  silent: { name: 'Silent', line: 'Dampened, for shared rooms' },
} as const
export type SwitchType = keyof typeof switchTypes

export const layouts = { ansi: 'ANSI (US)', 'iso-uk': 'ISO (UK)', 'iso-de': 'ISO (DE)', 'iso-nordic': 'ISO (Nordic)' } as const
export type Layout = keyof typeof layouts

export const email = 'hello@halvik.studio'
export const usd = (n: number) => `$${n}`
