import { LineReveal } from "@/components/Reveal"

// Label in the fixed left column (cols 1–3), heading from col 4. No index numbers: sections are not a sequence.
export function SectionHeader({ label, lines, mobile, as = "h2" }: { label: string; lines: string[]; mobile?: string[]; as?: "h1" | "h2" }) {
  return (
    <header className="grid-page gap-y-4">
      <p className="type-utility col-span-4 sm:col-span-6 lg:col-span-3 lg:pt-3">{label}</p>
      <LineReveal as={as} lines={lines} mobile={mobile} className={as === "h1" ? "type-display col-span-4 sm:col-span-6 lg:col-span-9" : "type-heading col-span-4 sm:col-span-6 lg:col-span-9"} />
    </header>
  )
}
