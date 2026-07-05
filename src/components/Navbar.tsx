"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = wedding.nav.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-paper/95 backdrop-blur" : "bg-paper/0"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="font-display text-2xl tracking-tight text-ink">
          {wedding.coupleShort}
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {wedding.nav.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`nav-link ${active === l.href ? "active" : ""}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="text-ink lg:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col border-t border-line bg-paper px-6 py-2 lg:hidden">
          {wedding.nav.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 font-serif text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
