import { SectionHeader } from "@/components/SectionHeader"

export function AuthShell({ label, lines, points, children }: { label: string; lines: string[]; points: string[]; children: React.ReactNode }) {
  return (
    <section className="page pt-32 pb-24 lg:pt-48 lg:pb-32">
      <SectionHeader as="h1" label={label} lines={lines} />
      <div className="grid-page mt-16 gap-y-12 lg:mt-24">
        <ul className="col-span-4 border-t border-text sm:col-span-6 lg:col-span-3">
          {points.map((p) => (
            <li key={p} className="border-b border-border py-4 text-muted">{p}</li>
          ))}
        </ul>
        <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-5">{children}</div>
      </div>
    </section>
  )
}
