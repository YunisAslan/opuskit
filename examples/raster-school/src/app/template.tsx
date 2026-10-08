// Moving between pages: the new page fades in over 180ms; nothing slides.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>
}
