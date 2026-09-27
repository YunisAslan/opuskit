import Link from "next/link";
import { site } from "@/config/site";

export default function Footer() {
  const col = "flex flex-col gap-2";
  return (
    <footer className="border-t border-border px-4 pt-16 pb-8 lg:px-8">
      <div className="grid-24 gap-y-12">
        <div className={`col-span-24 md:col-span-7 ${col}`}>
          <h2 className="t-utility text-muted">Contact</h2>
          <a href={`mailto:${site.email}`} className="link-fill inline-flex min-h-11 items-center self-start">{site.email}</a>
          <p className="text-muted">{site.address}</p>
        </div>
        <div className={`col-span-12 md:col-span-5 md:col-start-10 ${col}`}>
          <h2 className="t-utility text-muted">Site</h2>
          <ul className={col}>
            {[...site.nav, site.action, { label: "Sign in", href: "/sign-in" }].map((l) => (
              <li key={l.href}><Link href={l.href} className="link-fill inline-flex min-h-11 items-center">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className={`col-span-12 md:col-span-4 ${col}`}>
          <h2 className="t-utility text-muted">Social</h2>
          <ul className={col}>
            {site.social.map((l) => (
              <li key={l.label}><a href={l.href} className="link-fill inline-flex min-h-11 items-center" rel="noopener noreferrer" target="_blank">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div className={`col-span-24 md:col-span-4 ${col}`}>
          <h2 className="t-utility text-muted">Legal</h2>
          <ul className={col}>
            {site.legal.map((l) => (
              <li key={l.href}><Link href={l.href} className="link-fill inline-flex min-h-11 items-center">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-24 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-4">
        <p className="font-display text-2xl font-bold tracking-[-0.03em]">SKYISTHELIMIT</p>
        <p className="t-utility text-muted">© {new Date().getFullYear()} SKYISTHELIMIT. Look up.</p>
      </div>
    </footer>
  );
}
