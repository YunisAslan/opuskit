"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "#collection", label: "Collection" },
  { href: "#lookbook", label: "Lookbook" },
  { href: "#story", label: "Story" },
  { href: "#shop", label: "Shop" },
  { href: "#journal", label: "Journal" },
];

// Transparent over the hero, solid after it. Hides on scroll down, returns on
// scroll up. Mobile: logo + menu button opening a full-screen menu.
export default function Navigation() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const hero = document.getElementById("hero");
      const heroEnd = hero ? hero.offsetHeight - window.innerHeight * 0.5 : 0;
      setSolid(y > heroEnd);
      if (Math.abs(y - last) > 4) setHidden(y > last && y > 120);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      menuBtn.current?.focus();
    };
  }, [open]);

  const tone = solid && !open ? "bg-background/95 text-text border-border" : "text-background border-transparent";

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-[60] border-b transition-[translate,background-color,color,border-color] duration-300 ease-out ${tone} ${
        hidden && !open ? "-translate-y-full" : ""
      }`}
    >
      <nav aria-label="Primary" className="container-inner flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="relative z-10 flex min-h-11 items-center" aria-label="Bluestone, back to top">
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="t-utility link">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="t-utility link link-static text-accent">
              Book a viewing
            </a>
          </li>
        </ul>

        <button
          ref={menuBtn}
          type="button"
          className="t-utility relative z-10 min-h-11 min-w-11 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
    </header>

      {open ? (
        <div id="mobile-menu" className="fixed inset-0 z-50 flex h-svh flex-col justify-end bg-text px-6 pt-24 pb-12 text-background lg:hidden">
          <ul className="flex flex-col gap-2">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-1 font-display text-[clamp(2.5rem,11vw,4rem)] leading-none font-extrabold tracking-[-0.04em]"
                >
                  <span className="t-utility text-secondary">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className="t-utility link link-static mt-12 self-start text-secondary">
            Book a viewing
          </a>
        </div>
      ) : null}
    </>
  );
}
