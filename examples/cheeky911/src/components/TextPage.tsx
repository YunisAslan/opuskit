// Shared shell for the plainer pages: a centred title card, then a narrow reading column.
export default function TextPage({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <>
      <header className="mx-auto max-w-[800px] px-6 pb-16 pt-40 text-center md:pt-48">
        <h1 className="type-display [font-size:clamp(2.75rem,8vw,6.5rem)]">{title}</h1>
        {intro && <p className="type-body mx-auto mt-8 max-w-[52ch] text-muted">{intro}</p>}
      </header>
      <div className="prose-cheeky mx-auto max-w-[680px] px-6 pb-40">{children}</div>
    </>
  )
}
