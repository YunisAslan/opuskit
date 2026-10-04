import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cohorts, modules, site } from '@/content/site'
import { shortDate } from '@/lib/status'

const addDays = (iso: string, d: number) => new Date(Date.parse(iso + 'T12:00:00Z') + d * 86_400_000).toISOString().slice(0, 10)

// Every session of every upcoming cohort, one tab per cohort. Tuesday teaches, Thursday reviews.
export function CohortCalendar() {
  return (
    <div className="mt-20">
      <h3 className="type-heading [font-size:clamp(1.15rem,1.6vw,1.4rem)]">Cohort calendar</h3>
      <p className="type-body mt-2 max-w-[56ch] text-(--color-muted)">Sixteen sessions, {site.session.start}–{site.session.end} Oslo time. Recordings are online the same night.</p>
      <Tabs defaultValue={cohorts[0].n} className="mt-8">
        <TabsList variant="line" className="h-auto gap-6 p-0">
          {cohorts.map((c) => (
            <TabsTrigger key={c.n} value={c.n} className="type-utility h-11 flex-none px-0 text-[0.9375rem]">Cohort {c.n}</TabsTrigger>
          ))}
        </TabsList>
        {cohorts.map((c) => (
          <TabsContent key={c.n} value={c.n} className="mt-4 overflow-x-auto">
            <Table className="type-body tabular-nums">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="type-utility text-(--color-muted)">Week</TableHead>
                  <TableHead className="type-utility text-(--color-muted)">Module</TableHead>
                  <TableHead className="type-utility text-(--color-muted)">Tuesday</TableHead>
                  <TableHead className="type-utility text-(--color-muted)">Thursday</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modules.map((m, w) => (
                  <TableRow key={m.n} className="hover:bg-(--color-surface)/50">
                    <TableCell>{w + 1}</TableCell>
                    <TableCell>{m.key}</TableCell>
                    <TableCell>{shortDate(addDays(c.start, w * 7))}</TableCell>
                    <TableCell>{shortDate(addDays(c.start, w * 7 + 2))}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="type-utility mt-4 text-(--color-muted)">{c.seatsLeft} of {site.seatsPerCohort} seats left in cohort {c.n}.</p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
