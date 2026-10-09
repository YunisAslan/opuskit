import { site } from '@/content/site'

const whole = new Intl.NumberFormat('en-GB', { style: 'currency', currency: site.currency, maximumFractionDigits: 0 })
const exact = new Intl.NumberFormat('en-GB', { style: 'currency', currency: site.currency, minimumFractionDigits: 2 })

/** £26 for whole pounds, £4.50 otherwise — prices are never cut. */
export const price = (n: number) => (Number.isInteger(n) ? whole.format(n) : exact.format(n))

const plural = new Intl.PluralRules('en-GB')
/** "1 piece", "2 pieces" — never "1 items". */
export const count = (n: number, one: string, many: string) => `${n} ${plural.select(n) === 'one' ? one : many}`
