/*
 * Photos from the business's own Instagram (research/instagram/), cropped for the site.
 * Stones get a round loupe or the square gem-box crop; people and events get the step-cut frame.
 */
export type Photo = { src: string; width: number; height: number; alt: string }

export const photos = {
  // Tight crop of the 5.43 ct star sapphire post, for the hero loupe.
  heroSapphire: {
    src: "/images/hero-star-sapphire.jpg",
    width: 760,
    height: 760,
    alt: "Close up of the 5.43 carat blue star sapphire cabochon in its white gem box, the star catching the sun",
  },
  // Instagram Dcr1AOyDq3v: their first Community Sponsor vendor event with the Staten Island FerryHawks.
  ferryhawks: {
    src: "/images/story/ferryhawks-table.jpg",
    width: 1000,
    height: 1250,
    alt: "Disni and Dananjaya Balasuriya standing behind their table at the Staten Island FerryHawks ballpark, the gold DGJ Imports crystal logo on the black tablecloth",
  },
  // Instagram DegGuTnjkEA: their table at the Staten Island Chamber of Commerce.
  chamber: {
    src: "/images/story/chamber-booth.jpg",
    width: 1000,
    height: 1250,
    alt: "Their table at a Staten Island Chamber event: loose stones in small white gem boxes, posters for custom jewelry and the charity auction, and the DGJ Imports logo on a black runner",
  },
  // Instagram DcHNpN6Pts_: the featured ring from their charity auction flyer.
  charityRing: {
    src: "/images/story/charity-ruby-ring.jpg",
    width: 614,
    height: 768,
    alt: "A hand wearing the custom heart-shaped ruby ring with a halo of diamonds, from the charity auction flyer",
  },
} satisfies Record<string, Photo>
