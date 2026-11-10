/*
 * Everything about how to reach Deana Gem and Jewelry lives here.
 *
 * Research (Nov 2026) found no public email, phone, address, website or social account for the
 * business, so every contact value below is empty on purpose. The site never shows a channel
 * that is not set here, and the inquiry form only switches on once `inquiry.email` or
 * `inquiry.phone` is filled in. See DESIGN.md, "What the owner needs to send".
 */
export const site = {
  name: "Deana Gem and Jewelry",
  shortName: "Deana",
  /** Set NEXT_PUBLIC_SITE_URL when the site gets its domain; used only for share-card URLs. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3103",
  inquiry: {
    /** Where inquiries go. The form opens an email to this address with the note written out. */
    email: "",
    /** Optional: a mobile number for text messages, digits only with country code, e.g. "15555550123". */
    phone: "",
  },
  /** Optional public links, shown in the footer only when set. */
  instagram: "",
} as const

export const inquiryOpen = Boolean(site.inquiry.email || site.inquiry.phone)

export const nav = [
  { href: "/collection", label: "The case" },
  { href: "/contact", label: "Ask about a piece" },
] as const
