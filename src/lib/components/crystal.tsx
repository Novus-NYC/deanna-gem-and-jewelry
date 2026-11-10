/*
 * The DGJ Imports mark, redrawn as line art: a cluster of faceted crystals in a thin gold line
 * with dotted facet seams, as on their tablecloth and cards. Decorative, so always aria-hidden.
 * `letters` adds the D, G and J stepping down through the cluster, as in the logo.
 */
type Props = { className?: string; letters?: boolean; strokeWidth?: number }

export function Crystal({ className = "", letters = false, strokeWidth = 1.25 }: Props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 220" fill="none" className={className}>
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" vectorEffect="non-scaling-stroke">
        {/* tall center crystal */}
        <path d="M100 8 L76 40 L84 152 L104 162 L124 150 L126 40 Z" vectorEffect="non-scaling-stroke" />
        <path d="M100 8 L102 48 L76 40 M102 48 L126 40 M102 48 L104 162" vectorEffect="non-scaling-stroke" />
        {/* left crystal, leaning out */}
        <path d="M14 66 L10 102 L62 178 L90 164 L50 84 Z" vectorEffect="non-scaling-stroke" />
        <path d="M14 66 L36 100 L10 102 M36 100 L50 84 M36 100 L76 172" vectorEffect="non-scaling-stroke" />
        {/* right crystal, leaning out */}
        <path d="M192 72 L152 86 L114 164 L138 178 L192 108 Z" vectorEffect="non-scaling-stroke" />
        <path d="M192 72 L168 106 L152 86 M168 106 L192 108 M168 106 L126 172" vectorEffect="non-scaling-stroke" />
        {/* small front crystal */}
        <path d="M102 120 L82 146 L92 208 L116 208 L124 144 Z" vectorEffect="non-scaling-stroke" />
        <path d="M102 120 L104 152 L82 146 M104 152 L124 144 M104 152 L104 208" vectorEffect="non-scaling-stroke" />
      </g>
      {/* dotted seams, the logo's beads of light */}
      <g stroke="currentColor" strokeWidth={strokeWidth * 1.6} strokeLinecap="round" strokeDasharray="0 7" vectorEffect="non-scaling-stroke">
        <path d="M88 52 L94 146" vectorEffect="non-scaling-stroke" />
        <path d="M114 54 L114 144" vectorEffect="non-scaling-stroke" />
        <path d="M24 100 L66 166" vectorEffect="non-scaling-stroke" />
        <path d="M178 104 L132 166" vectorEffect="non-scaling-stroke" />
        <path d="M92 156 L98 200" vectorEffect="non-scaling-stroke" />
      </g>
      {letters && (
        <g fill="currentColor" fontFamily="var(--font-display), Didot, Georgia, serif" fontSize="58" className="text-paper">
          <text x="70" y="78" fill="#f5f0e6">D</text>
          <text x="92" y="130" fill="#f5f0e6">G</text>
          <text x="100" y="186" fill="#f5f0e6">J</text>
        </g>
      )}
    </svg>
  )
}
