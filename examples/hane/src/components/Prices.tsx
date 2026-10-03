'use client'
// Prices, with one switch: pay for a course of five sessions at once (about 10% less) or one at a time.
import { useId, useState } from 'react'
import { PricingSection, type Plan } from '@/components/sections/Pricing'
import { SiteLink } from '@/components/SiteLink'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const book = { label: 'Book this', href: '/book' }
const plans = (course: boolean): Plan[] => [
  { name: 'First visit', price: '£75', period: '60 minutes', line: 'Where everyone starts.', recommended: true, action: { label: 'Book a first visit', href: '/book' },
    features: ['We listen and test how you move', 'A first treatment, if it is right to start', 'Your first two exercises, written down'] },
  { name: 'Treatment', price: course ? '£270' : '£60', period: course ? 'five sessions' : '45 minutes', line: 'Hands-on work, then your exercises checked.', action: book,
    features: ['Manual therapy on the problem area', 'Your home programme adjusted', course ? 'Use within four months' : 'Pay after each visit'] },
  { name: 'Slow-movement session', price: course ? '£225' : '£50', period: course ? 'five sessions' : '45 minutes', line: 'One to one, unhurried, on the mat.', action: book,
    features: ['Learn the exercises until they feel like yours', 'Breathing, balance, strength', course ? 'Use within four months' : 'Pay after each visit'] },
]

export function Prices() {
  const [course, setCourse] = useState(false)
  const id = useId()
  return (
    <PricingSection link={SiteLink} title="Prices" plans={plans(course)}
      note="Pay by card after each visit, or for a course up front. Move or cancel up to 24 hours before at no cost. Every visit comes with an itemised receipt for your insurer."
      control={
        <div className="flex min-h-11 items-center gap-3">
          <Switch id={id} checked={course} onCheckedChange={setCourse} />
          <Label htmlFor={id} className="type-utility">Pay for five sessions at once</Label>
        </div>
      } />
  )
}
