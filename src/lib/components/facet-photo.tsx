import Image from "next/image"
import type { Photo } from "@/lib/photos"
import { Reveal } from "./reveal"

type Props = {
  photo: Photo
  sizes: string
  className?: string
  /** Which way the offset gold outline falls. */
  offset?: "left" | "right"
}

/**
 * The shared treatment for photos of people and events: a 4:5 crop in an emerald cut's octagon,
 * with a gold hairline octagon set behind it and shifted, so the photo breaks out of its own frame.
 */
export function FacetPhoto({ photo, sizes, className = "", offset = "right" }: Props) {
  const shift = offset === "right" ? "translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5" : "-translate-x-3 translate-y-3 md:-translate-x-5 md:translate-y-5"
  return (
    <Reveal as="figure" className={`relative m-0 ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 100 125" preserveAspectRatio="none" className={`absolute inset-0 h-full w-full text-gold ${shift}`}>
        <polygon points="12,0.5 88,0.5 99.5,12 99.5,113 88,124.5 12,124.5 0.5,113 0.5,12" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="facet relative overflow-hidden bg-onyx-soft">
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={sizes} className="block h-auto w-full" />
      </div>
    </Reveal>
  )
}
