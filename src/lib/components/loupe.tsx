import Image from "next/image"
import type { Photo } from "@/lib/images"
import { Reveal } from "./reveal"

type LoupeProps = {
  photo: Photo
  sizes: string
  className?: string
  /** CSS object-position, to keep the stone centered in the lens. */
  focus?: string
  priority?: boolean
}

/**
 * The shared photo treatment: every atmosphere photo is seen through a round loupe lens with a
 * thin steel rim, the way a jeweler looks at a stone. It opens from the center on scroll.
 */
export function Loupe({ photo, sizes, className = "", focus = "50% 50%", priority = false }: LoupeProps) {
  return (
    <Reveal variant="loupe" className={`aspect-square ${className}`}>
      <div className="loupe-zoom relative h-full w-full overflow-hidden rounded-full ring-1 ring-loupe-deep ring-offset-[6px] ring-offset-transparent">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: focus }}
        />
      </div>
    </Reveal>
  )
}
