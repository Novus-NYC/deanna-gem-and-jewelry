import type { ReactNode } from "react"

type TagProps = {
  /** Small line at the top of the label, e.g. "5.43 ct" or "Ceylon". */
  label?: ReactNode
  children: ReactNode
  className?: string
  /** Draw the string running up from the hole. */
  string?: boolean
}

/** The gem-paper label: paper card, pointed string end, punched hole. Place it on onyx, sapphire or a photo edge. */
export function Tag({ label, children, className = "", string = false }: TagProps) {
  return (
    <div className={`relative ${className}`}>
      {string && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-[1.15rem] h-24 w-10 overflow-visible text-gold"
          viewBox="0 0 40 96"
          fill="none"
        >
          <path d="M0 96 C 2 60, 18 40, 14 0" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      )}
      <div className="tag">
        {label && <p className="tag-label text-ink-soft">{label}</p>}
        <div className={label ? "mt-1" : ""}>{children}</div>
      </div>
    </div>
  )
}
