/*
 * The stones, exactly as posted on their Instagram (research/BRIEF.md, "Stones posted").
 * Photos are cropped to a square around the white gem box from the original posts.
 *
 * Availability: the ruby and the Madagascar sapphire are marked SOLD in their posts. For the
 * others availability is not stated, so `status` stays undefined and the site says
 * "Ask if it’s still available". Never mark a stone available without the owners confirming it.
 * No prices: none are published.
 *
 * To add a stone: put a square JPG (about 1200px) in public/images/pieces/, add an entry with
 * its real width and height, and fill in only the details the owners have stated.
 */
export type Family = "sapphire" | "tourmaline" | "ruby"

export type Stone = {
  /** URL-safe id, used in ?stone= links. */
  id: string
  /** Short name for labels, e.g. "Blue star sapphire". */
  name: string
  /** The full description as posted, e.g. "Natural blue star sapphire". */
  stone: string
  family: Family
  origin: string
  /** Carat weight as posted, kept as text so "1.30" keeps its trailing zero. */
  carat: string
  cut: string
  treatment?: string
  certification?: string
  status?: "sold"
  image: { src: string; width: number; height: number; alt: string }
}

export const families: { id: Family; label: string; plural: string }[] = [
  { id: "sapphire", label: "Sapphires", plural: "sapphires" },
  { id: "tourmaline", label: "Tourmalines", plural: "tourmalines" },
  { id: "ruby", label: "Ruby", plural: "rubies" },
]

const CEYLON = "Ceylon (Sri Lanka)"

export const stones: Stone[] = [
  {
    id: "blue-star-sapphire-543",
    name: "Blue star sapphire",
    stone: "Natural blue star sapphire",
    family: "sapphire",
    origin: CEYLON,
    carat: "5.43",
    cut: "Cabochon",
    image: {
      src: "/images/pieces/blue-star-sapphire-543.jpg",
      width: 1200,
      height: 1200,
      alt: "A round blue star sapphire cabochon with a faint six-rayed star, in a white gem box held in an open hand in sunlight",
    },
  },
  {
    id: "green-tourmaline-524",
    name: "Green tourmaline",
    stone: "Natural (unheated) green tourmaline",
    family: "tourmaline",
    origin: CEYLON,
    carat: "5.24",
    cut: "Octagonal step cut",
    treatment: "Unheated",
    image: {
      src: "/images/pieces/green-tourmaline-524.jpg",
      width: 840,
      height: 840,
      alt: "A bright green rectangular step-cut tourmaline centered in a white gem box on woven cloth",
    },
  },
  {
    id: "star-sapphire-443",
    name: "Star sapphire",
    stone: "Natural star sapphire",
    family: "sapphire",
    origin: CEYLON,
    carat: "4.43",
    cut: "Cabochon",
    image: {
      src: "/images/pieces/star-sapphire-443.jpg",
      width: 1200,
      height: 1200,
      alt: "An oval grey-violet star sapphire cabochon with a sharp six-rayed star, in a white gem box held between finger and thumb",
    },
  },
  {
    id: "green-tourmaline-357",
    name: "Green tourmaline",
    stone: "Natural green tourmaline",
    family: "tourmaline",
    origin: CEYLON,
    carat: "3.57",
    cut: "Cushion, mixed cut",
    image: {
      src: "/images/pieces/green-tourmaline-357.jpg",
      width: 680,
      height: 680,
      alt: "A deep green cushion-cut tourmaline, dark at the edges and bright at the center, in a white gem box on woven cloth",
    },
  },
  {
    id: "star-sapphire-417",
    name: "Star sapphire",
    stone: "Natural star sapphire",
    family: "sapphire",
    origin: CEYLON,
    carat: "4.17",
    cut: "Cabochon",
    image: {
      src: "/images/pieces/star-sapphire-417.jpg",
      width: 1200,
      height: 1200,
      alt: "An oval pink-violet star sapphire cabochon with a bright six-rayed star, in a white gem box resting in an open hand",
    },
  },
  {
    id: "ruby-madagascar-130",
    name: "Ruby",
    stone: "Natural unheated ruby, red",
    family: "ruby",
    origin: "Madagascar",
    carat: "1.30",
    cut: "Square cushion, mixed cut",
    treatment: "Unheated",
    certification: "GIA certified",
    status: "sold",
    image: {
      src: "/images/pieces/ruby-madagascar-130.jpg",
      width: 900,
      height: 900,
      alt: "A small red square cushion-cut ruby centered in a white gem box on woven cloth",
    },
  },
  {
    id: "sapphire-madagascar-110",
    name: "Sapphire",
    stone: "Natural unheated sapphire",
    family: "sapphire",
    origin: "Madagascar",
    carat: "1.10",
    cut: "Oval, mixed cut",
    treatment: "Unheated",
    certification: "GIA certified",
    status: "sold",
    image: {
      src: "/images/pieces/sapphire-madagascar-110.jpg",
      width: 980,
      height: 980,
      alt: "A small blue oval sapphire centered in a white gem box on woven cloth",
    },
  },
]

/** Stones the owners have not marked sold. Counts on the site use these. */
export const openStones = stones.filter((s) => s.status !== "sold")

export const findStone = (id: string | undefined) => stones.find((s) => s.id === id)
export const stoneTitle = (s: Stone) => `${s.carat} ct ${s.name.toLowerCase()}`

/*
 * Custom jewelry, made to order: kinds from their Google Form, booth poster and the Chamber video.
 * There are no photos of finished custom pieces other than the charity ring, so these are not
 * shown as a gallery.
 */
export const customKinds = [
  { id: "rings", label: "Rings", detail: "Including engagement rings and wedding bands" },
  { id: "necklaces", label: "Necklaces", detail: "And pendants" },
  { id: "earrings", label: "Earrings", detail: "" },
  { id: "bracelets", label: "Bracelets", detail: "And bangles" },
] as const
