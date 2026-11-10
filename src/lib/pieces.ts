/*
 * The case. Each piece is one photo with a numbered tag.
 *
 * This list is empty on purpose: no photos of Deana's pieces were available when the site was
 * built, and nothing here may be invented. To add a piece:
 *   1. Put the photo in public/pieces/ (a JPG around 1600px on the long side is plenty).
 *   2. Add an entry below with the photo's real width and height.
 *   3. Leave out any detail you have not confirmed (stone, metal, status are optional).
 */
export type Category = "rings" | "necklaces" | "earrings" | "bracelets" | "gems"

export type Piece = {
  /** Tag number shown on the site. Keep it short and unique, e.g. "14". */
  id: string
  name: string
  category: Category
  image: { src: string; width: number; height: number; alt: string }
  stone?: string
  metal?: string
  /** Only say a piece is sold or on hold when the owner confirms it. */
  status?: "available" | "on hold" | "sold"
}

export const categories: { id: Category; label: string; singular: string }[] = [
  { id: "rings", label: "Rings", singular: "ring" },
  { id: "necklaces", label: "Necklaces", singular: "necklace" },
  { id: "earrings", label: "Earrings", singular: "pair of earrings" },
  { id: "bracelets", label: "Bracelets", singular: "bracelet" },
  { id: "gems", label: "Loose gems", singular: "loose gem" },
]

export const pieces: Piece[] = []

export const categoryLabel = (id: Category) => categories.find((c) => c.id === id)?.label ?? id
export const findPiece = (id: string | undefined) => pieces.find((p) => p.id === id)
