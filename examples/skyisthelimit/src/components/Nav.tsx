"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/config/site";

export default function Nav() {
  const path = usePathname();
  const [hidden, setHidden] = useState(false);
  const [overHero, setOverHero] = useState(path === "/");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 120);
      setOverHero(path === "/" && y < window.innerHeight * 0.85);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = !overHero || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 motion-safe:transition-transform motion-safe:duration-300 ${hidden && !open ? "-translate-y-full" : ""} ${solid ? "border-b border-border bg-background" : "bg-transparent"}`}
    >
      <nav aria-label="Primary" className="flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="inline-flex min-h-11 items-center font-display text-lg font-bold tracking-[-0.03em]" onClick={() => setOpen(false)}>
          SKYISTHELIMIT
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {site.nav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={path === l.href ? "page" : undefined} className="t-utility link-fill px-1 py-3">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={site.action.href}
              className="t-utility inline-flex min-h-11 items-center border border-border bg-primary px-4 text-background hover:bg-secondary hover:text-text"
            >
              {site.action.label}
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="t-utility min-h-11 min-w-11 border border-border bg-background px-4 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 flex flex-col justify-between bg-background px-4 pt-12 pb-8 md:hidden">
          <ul className="flex flex-col gap-2">
            {[...site.nav, site.action].map((l, i) => (
              <li key={l.href} className="border-b border-border">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={path === l.href ? "page" : undefined}
                  className="flex items-baseline gap-4 py-4 font-display text-5xl font-bold tracking-[-0.03em]"
                >
                  <span className="t-utility text-muted">0{i + 1}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={`mailto:${site.email}`} className="t-utility inline-flex min-h-11 items-center">{site.email}</a>
        </div>
      )}
    </header>
  );
}
