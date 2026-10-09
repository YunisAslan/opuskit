// Moving between pages: a short cross-fade (180ms), nothing slides.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>
}
