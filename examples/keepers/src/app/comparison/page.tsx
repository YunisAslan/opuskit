import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Comparison' }

const cols = ['Keepers', 'Canned latte', 'Cola', 'Energy drink']
const rows: [string, ...string[]][] = [
  ['Caffeine', '45 mg', '75 mg', '32 mg', '80 mg'],
  ['Sugar', '6 g', '22 g', '35 g', '27 g'],
  ['Energy', '35 kcal', '160 kcal', '139 kcal', '112 kcal'],
  ['Brewing', 'Cold, 18 hours', 'Hot, then cooled', 'None', 'None'],
  ['Flavouring', 'Citrus peel only', 'Added', 'Added', 'Added'],
  ['Price per can', '€2.33 to €3', '€2.20', '€1.10', '€1.60'],
]

export default function ComparisonPage() {
  return (
    <>
      <PageHeader
        title={['Keepers or', 'the usual can?']}
        mobile={['Keepers', 'or the', 'usual can?']}
        meta="Per 330 ml, typical UK supermarket averages"
        intro="Keepers costs more than a cola and carries less caffeine than an energy drink. What you get for it is real coffee, a sixth of the sugar and nothing added to fake the taste."
      />
      <section aria-label="Comparison" className="container-text pb-32 md:pb-40">
        <div data-reveal className="overflow-x-auto border-t-2 border-border">
          <table className="type-body w-full min-w-[640px] text-left">
            <caption className="sr-only">Keepers compared with other canned drinks, per 330 ml</caption>
            <thead>
              <tr className="border-b-2 border-border">
                <th scope="col" className="py-4 pr-4"><span className="sr-only">Measure</span></th>
                {cols.map((c, i) => (
                  <th key={c} scope="col" className={`type-heading py-4 pr-4 text-2xl ${i === 0 ? 'bg-surface px-4' : ''}`}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, ...vals]) => (
                <tr key={label} className="border-b border-border">
                  <th scope="row" className="type-utility py-4 pr-4 text-muted">{label}</th>
                  {vals.map((v, i) => (
                    <td key={i} className={`py-4 pr-4 ${i === 0 ? 'bg-surface px-4 font-bold' : ''}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="type-body mt-6 text-muted">Competitor figures are category averages from product labels, collected August 2026. They are not claims about any single brand.</p>
      </section>
    </>
  )
}
