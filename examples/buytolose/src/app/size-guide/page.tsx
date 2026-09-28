import type { Metadata } from "next";
import { PageIntro } from "@/components/Page";

export const metadata: Metadata = { title: "Size Guide" };

const sizes = ["XS", "S", "M", "L", "XL"];
const charts = [
  { name: "Crossing Hoodie", note: "Boxy and slightly cropped. Take your usual size; size down for a closer fit.", rows: [
    ["Chest width", 56, 59, 62, 65, 68], ["Body length", 62, 64, 66, 68, 70], ["Sleeve length", 60, 62, 64, 66, 68]] },
  { name: "Crossing Sweatpant", note: "Wide straight leg, elastic waist with drawcord. True to size.", rows: [
    ["Waist, relaxed", 32, 35, 38, 41, 44], ["Hip", 52, 55, 58, 61, 64], ["Inseam", 77, 78, 79, 80, 81]] },
];

export default function SizeGuide() {
  return (
    <>
      <PageIntro word="FIT" title="Size guide">Measured flat, in centimetres. Compare with something you already own and like.</PageIntro>
      <div className="container-content space-y-16 pb-32 md:pb-40">
        {charts.map((c) => (
          <section key={c.name} aria-labelledby={c.name} className="rounded-3xl bg-surface p-6 md:p-12">
            <h2 id={c.name} className="font-heading text-heading">{c.name}</h2>
            <p className="mt-2 max-w-[60ch] text-muted">{c.note}</p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[28rem] text-left">
                <thead>
                  <tr className="border-b border-border font-utility text-utility">
                    <th scope="col" className="py-3 pr-4">Measurement</th>
                    {sizes.map((s) => <th key={s} scope="col" className="py-3 pr-4">{s}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map(([label, ...vals]) => (
                    <tr key={label} className="border-b border-border">
                      <th scope="row" className="py-3 pr-4 font-normal">{label}</th>
                      {vals.map((v, i) => <td key={i} className="py-3 pr-4">{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
