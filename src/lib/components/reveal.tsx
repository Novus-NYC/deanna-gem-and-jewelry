"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  as?: "div" | "li" | "figure" | "span" | "article"
  /** Stagger index: each step adds 60ms of delay. */
  i?: number
  /** "up" fades and lifts; "loupe" opens a circle from the center. */
  variant?: "up" | "loupe"
  className?: string
}

/** Adds `is-in` once the element enters the viewport. CSS owns the motion and reduced-motion fallback. */
export function Reveal({ children, as = "div", i = 0, variant = "up", className = "" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-in")
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in")
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const Tag = as
  const style = { "--i": i } as CSSProperties
  return (
    <Tag
      ref={ref as never}
      style={style}
      className={`${variant === "loupe" ? "reveal-loupe" : "reveal"} ${className}`}
    >
      {children}
    </Tag>
  )
}
