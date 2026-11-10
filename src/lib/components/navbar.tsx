"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { askLink, nav } from "@/lib/site"
import { Crystal } from "./crystal"

/**
 * Sticky onyx bar with the crystal mark and the name. Three page links plus the one action
 * ("Ask about a stone"). Below 1024px the page links fold into a menu: a labeled toggle with
 * aria-expanded, Escape closes it and returns focus to the toggle, and it closes on navigation.
 * The bar gains a gold rule once content scrolls under it.
 */
export function Navbar() {
  const path = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [path])

  useEffect(() => {
    if (!open) return
    panel.current?.querySelector<HTMLElement>("a")?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const current = (href: string) => path === href || path.startsWith(`${href}/`)

  return (
    <header
      className={`surface-onyx sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || open ? "border-gold/40" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-site flex h-[72px] items-center justify-between gap-3">
        <Link href="/" className="flex min-h-[44px] items-center gap-2.5">
          <Crystal className="h-10 w-9 shrink-0 text-gold" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.75rem] italic leading-none">Deanna</span>
            <span className="tag-label mt-1 text-[0.6875rem] tracking-[0.2em] text-gold">Gem &amp; Jewelry</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex xl:gap-3">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current(item.href) ? "page" : undefined}
                className={`inline-flex min-h-[44px] items-center px-3 text-[0.98rem] ${current(item.href) ? "text-gold" : "hover:text-gold"}`}
              >
                <span className={current(item.href) ? "border-b border-gold pb-0.5" : ""}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={askLink.href}
            aria-current={current(askLink.href) ? "page" : undefined}
            className="btn btn-gold min-h-[44px] px-4 text-[0.95rem] sm:px-5"
          >
            <span className="sm:hidden">{askLink.short}</span>
            <span className="hidden sm:inline">{askLink.label}</span>
          </Link>
          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
            className="btn btn-line min-h-[44px] px-4 text-[0.95rem] lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <div ref={panel} id="site-menu" hidden={!open} className="surface-onyx border-t border-gold/30 lg:hidden">
        <ul className="container-site py-4">
          {[{ href: "/", label: "Home" }, ...nav].map((item) => (
            <li key={item.href} className="border-b border-paper/15 last:border-b-0">
              <Link
                href={item.href}
                aria-current={path === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`flex min-h-[56px] items-center font-display text-[2rem] italic leading-none ${path === item.href ? "text-gold" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
