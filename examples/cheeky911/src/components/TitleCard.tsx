import Lines from './Lines'

// Centred interstitial between chapters, 8 of 12 columns.
export default function TitleCard({ label, lines, children }: { label?: string; lines: (string | [string, string])[]; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[800px] px-6 py-32 text-center md:py-40">
      {label && <p className="type-utility mb-6 text-muted">{label}</p>}
      <h2 data-reveal="lines" className="type-display [font-size:clamp(2.5rem,7vw,6rem)]">
        <Lines lines={lines} />
      </h2>
      {children && <div data-reveal="rise" className="type-body mx-auto mt-8 max-w-[52ch] text-muted"><div>{children}</div></div>}
    </div>
  )
}
