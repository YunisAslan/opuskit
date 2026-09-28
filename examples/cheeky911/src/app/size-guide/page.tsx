import type { Metadata } from 'next'
import TextPage from '@/components/TextPage'

export const metadata: Metadata = { title: 'Size guide' }

const jacket = [
  ['XS', '86', '72', '61'], ['S', '92', '78', '63'], ['M', '98', '84', '65'],
  ['L', '104', '90', '67'], ['XL', '110', '96', '69'],
]
const gloves = [['7', '18'], ['8', '20'], ['9', '23'], ['10', '25'], ['11', '28']]

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: string[][] }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full text-left tabular-nums">
        <caption className="type-utility mb-4 text-left text-muted">{caption}</caption>
        <thead><tr className="border-b border-muted">{head.map((h) => <th key={h} scope="col" className="py-3 pr-6 font-heading font-bold">{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]} className="border-b border-border">{r.map((c, i) => i === 0 ? <th key={i} scope="row" className="py-3 pr-6 font-normal">{c}</th> : <td key={i} className="py-3 pr-6">{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

export default function SizeGuide() {
  return (
    <TextPage title="Size guide" intro="Every car leaves with a driving jacket and gloves cut for its new owner. Measure once, over a thin shirt, and we will do the rest.">
      <h2>Driving jacket</h2>
      <p>Measure the chest at its fullest, the waist at the narrowest point, and the back from collar seam to hem. The jacket is cut close, for sitting, so it runs short in the back.</p>
      <Table caption="Body measurements in centimetres" head={['Size', 'Chest', 'Waist', 'Back length']} rows={jacket} />
      <h2>Driving gloves</h2>
      <p>Wrap a tape around your writing hand, just below the knuckles, without the thumb. Between sizes, take the smaller: the leather gives within a week.</p>
      <Table caption="Hand circumference in centimetres" head={['Size', 'Circumference']} rows={gloves} />
      <h2>Fit</h2>
      <p>If nothing fits, send us your measurements and we will cut one to order at no extra cost. Write to <a href="mailto:hello@cheeky911.com">hello@cheeky911.com</a>.</p>
    </TextPage>
  )
}
