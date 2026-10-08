'use client'
// Enrol's remembered moment — "Twelve seats, twelve columns". A cohort has twelve seats and the page has twelve
// columns, so each seat is one column: taken seats are solid white, free ones are drawn in hairline. The cohort table
// beneath chooses which cohort the strip shows (rows are buttons; the strip's fills swap in 150ms). The free-seat
// count is the screen's one pink mark. Phones: four columns, so the twelve seats sit as 4 × 3; tablets 6 × 2.
import { useState } from 'react'
import { cohorts, seatsLeft, site } from '@/content/site'
import { ApplyButton } from './Apply'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

export function SeatMap() {
  const [id, setId] = useState(cohorts[0].id)
  const c = cohorts.find((x) => x.id === id) ?? cohorts[0]
  const free = seatsLeft(c)

  return (
    <div>
      <div className="raster border-t border-(--color-text) pt-4">
        <h1 className="type-display col-span-4 sm:col-span-6 lg:col-span-10">
          <span className="line-in" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="text-(--color-accent)">{free === 0 ? 'No' : free}</span> of twelve
          </span>
          <span className="line-in" style={{ '--i': 1 } as React.CSSProperties}>{free === 1 ? 'seat is' : 'seats are'} free.</span>
        </h1>
      </div>

      <ol aria-label={`${c.name}: ${c.taken} seats taken, ${free} free`} className="raster mt-10 gap-y-(--gutter) lg:mt-14">
        {Array.from({ length: site.seats }, (_, i) => {
          const taken = i < c.taken
          return (
            <li
              key={i}
              aria-label={`Seat ${i + 1}, ${taken ? 'taken' : 'free'}`}
              className={cn(
                'col-span-1 flex aspect-[3/4] flex-col justify-between border p-2 transition-colors duration-150 lg:aspect-[1/2] lg:p-3',
                taken ? 'border-(--color-text) bg-(--color-text) text-(--color-background)' : 'border-(--color-text) text-(--color-text)',
              )}
            >
              <span className="type-utility">{i + 1}</span>
              <span className="type-utility">{taken ? 'Taken' : 'Free'}</span>
            </li>
          )
        })}
      </ol>

      <div className="raster mt-12 gap-y-6 lg:mt-16">
        <div className="col-span-4 sm:col-span-6 lg:col-span-3">
          <h2 className="type-heading">Next cohorts</h2>
          <p className="type-body mt-2 text-(--color-muted)">Choose a cohort to see its seats. Applications close two weeks before the first evening.</p>
        </div>
        <div className="col-span-4 sm:col-span-6 lg:col-span-9">
          <Table>
            <TableHeader>
              <TableRow className="border-0">
                <TableHead>Cohort</TableHead>
                <TableHead className="max-sm:hidden">Dates</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead className="max-md:hidden">Applications close</TableHead>
                <TableHead><span className="sr-only">Apply</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cohorts.map((x) => {
                const left = seatsLeft(x)
                const on = x.id === id
                return (
                  <TableRow key={x.id} className={cn('transition-colors duration-150', on && 'bg-(--color-surface)')}>
                    <TableCell className="pl-3">
                      <button type="button" aria-pressed={on} onClick={() => setId(x.id)} className="press link-line block min-h-11 text-left aria-pressed:decoration-current">
                        {x.name}, {x.format.toLowerCase()}
                        <span className="type-caption block text-(--color-muted) sm:hidden">{x.dates}</span>
                      </button>
                    </TableCell>
                    <TableCell className="whitespace-nowrap max-sm:hidden">{x.dates}</TableCell>
                    <TableCell className="whitespace-nowrap">{left === 0 ? 'Full' : `${left} free`}</TableCell>
                    <TableCell className="max-md:hidden">{x.closes}</TableCell>
                    <TableCell className="pr-3 text-right">
                      {left > 0 && <ApplyButton cohort={x.id} variant={on ? 'primary' : 'outline'} className="min-h-10 px-4 py-2">Enrol</ApplyButton>}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
