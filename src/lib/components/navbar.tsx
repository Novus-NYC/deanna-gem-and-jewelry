"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { nav, site } from "@/lib/site"

/**
 * Sticky garnet bar. Two destinations only (the case, and asking), so both stay visible at every
 * width instead of hiding behind a menu button. It darkens and gains a rule once content scrolls under it.
 */
export function Navbar() {
  const path = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 text-ivory transition-colors duration-300 ${
        scrolled ? "border-b border-ivory/15 bg-garnet-deep" : "border-b border-transparent bg-garnet"
      }`}
    >
      <nav aria-label="Main" className="container-site flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex min-h-[44px] items-baseline gap-2" aria-label={`${site.name}, home`}>
          <span className="font-display text-[1.9rem] italic leading-none">Deana</span>
          <span className="tag-label hidden text-ivory/80 sm:inline">Gem and Jewelry</span>
        </Link>
        <ul className="flex items-center gap-1 sm:gap-3">
          {nav.map((item, i) => {
            const on = path === item.href
            const primary = i === nav.length - 1
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={on ? "page" : undefined}
                  className={
                    primary
                      ? "btn btn-ivory min-h-[44px] px-3 text-[0.95rem] sm:px-5"
                      : `inline-flex min-h-[44px] items-center px-2 text-[0.95rem] sm:px-3 ${on ? "underline decoration-1 underline-offset-[6px]" : "hover:text-loupe"}`
                  }
                >
                  {primary ? (
                    <>
                      <span className="sm:hidden">Ask</span>
                      <span className="hidden sm:inline">{item.label}</span>
                    </>
                  ) : (
                    item.label
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
