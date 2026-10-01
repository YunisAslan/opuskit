import type { Entry } from '@/components/sections/Journal'
import { essayHref, formatDate, type Essay } from './magazine'

export const toEntry = (e: Essay): Entry => ({ title: e.title, date: formatDate(e.date), dateTime: e.date, category: e.category, place: e.place, href: essayHref(e), image: e.image })
