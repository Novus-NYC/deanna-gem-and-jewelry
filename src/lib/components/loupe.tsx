import Image from "next/image"
import type { Photo } from "@/lib/photos"
import { Reveal } from "./reveal"

type LoupeProps = {
  photo: Photo
  sizes: string
  className?: string
  /** CSS object-position, to keep the stone centered in the lens. */
  focus?: string
  /** Above-the-fold image: preloaded at high priority and shown at once, with no lens reveal. */
  priority?: boolean
}

/**
 * A stone seen through a jeweler's loupe: a round lens with a thin gold rim set off from the photo.
 * Below the fold it opens from the center on scroll; the priority (hero) lens is never hidden.
 */
export function Loupe({ photo, sizes, className = "", focus = "50% 50%", priority = false }: LoupeProps) {
  const lens = (
    <div className="loupe-zoom relative h-full w-full overflow-hidden rounded-full ring-1 ring-gold ring-offset-[7px] ring-offset-transparent">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        className="h-full w-full object-cover"
        style={{ objectPosition: focus }}
      />
    </div>
  )
  if (priority) return <div className={`aspect-square ${className}`}>{lens}</div>
  return (
    <Reveal variant="loupe" className={`aspect-square ${className}`}>
      {lens}
    </Reveal>
  )
}
