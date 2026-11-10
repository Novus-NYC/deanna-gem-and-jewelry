/*
 * Atmosphere only. These are stock photos of loose stones (Unsplash License: free for commercial
 * use, no attribution required; credited here and in DESIGN.md). They are never shown as
 * Deana's pieces: they appear only inside the round "loupe" frame, away from the case.
 */
export type Photo = { src: string; width: number; height: number; alt: string }

export const photos = {
  // Unsplash oP0fIBMUBsE, sameer Ali
  amethyst: {
    src: "/images/amethyst.jpg",
    width: 1800,
    height: 1200,
    alt: "A loose violet gemstone, cut in a long rectangle, resting on white marble",
  },
  // Unsplash 99T29x3DrFw, sameer Ali
  garnet: {
    src: "/images/garnet-tweezers.jpg",
    width: 2000,
    height: 1333,
    alt: "A small orange-red loose gemstone on marble beside a pair of fine tweezers",
  },
  // Unsplash agsdDgRW2Ps, Jacek Dylag
  blue: {
    src: "/images/blue-stones.jpg",
    width: 1600,
    height: 1200,
    alt: "Four round blue loose gemstones casting blue shadows on a pale surface",
  },
  // Unsplash g95sf8-fEQg, Franco Antonio Giovanella
  rough: {
    src: "/images/rough-stones.jpg",
    width: 1600,
    height: 2362,
    alt: "Rough, uncut stones in many colors laid out in rows on white",
  },
} satisfies Record<string, Photo>
