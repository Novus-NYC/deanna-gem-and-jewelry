/*
 * Everything about Deanna Gem and Jewelry Imports LLC and how to reach them lives here.
 * Every value is published by the business (Instagram, the Staten Island Chamber directory,
 * Staten Island Neighbors, their charity flyer and the Chamber spotlight video); see research/BRIEF.md.
 * Their street address is their home, so the site says only "Staten Island, New York".
 */
const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL

export const site = {
  legalName: "Deanna Gem and Jewelry Imports LLC",
  name: "Deanna Gem & Jewelry",
  shortName: "Deanna",
  /** Share-card and canonical base. NEXT_PUBLIC_SITE_URL wins; on Vercel the production domain is used. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? (productionUrl ? `https://${productionUrl}` : "http://localhost:3103"),
  place: "Staten Island, New York",
  since: 2023,
  inquiry: {
    email: "deannagemandjewelryimportsllc@gmail.com",
    /** Call or text. Display form and the dialable form. */
    phone: "(347) 757-7479",
    phoneE164: "+13477577479",
  },
  instagram: {
    handle: "@deannagemandjewelry2023",
    url: "https://www.instagram.com/deannagemandjewelry2023/",
  },
  /** Their own Google Form for custom jewelry (linked from their Instagram bio). */
  customForm: "https://forms.gle/KzEy6SCYCrSEjNSg7",
} as const

export const inquiryOpen = Boolean(site.inquiry.email || site.inquiry.phone)

export const telHref = `tel:${site.inquiry.phoneE164}`
/** One sms format everywhere: `sms:+1...?&body=` opens a prefilled text on both iOS and Android. */
export const smsHref = (body?: string) =>
  body ? `sms:${site.inquiry.phoneE164}?&body=${encodeURIComponent(body)}` : `sms:${site.inquiry.phoneE164}`
export const mailHref = (subject?: string, body?: string) => {
  const q = [subject && `subject=${encodeURIComponent(subject)}`, body && `body=${encodeURIComponent(body)}`].filter(Boolean).join("&")
  return `mailto:${site.inquiry.email}${q ? `?${q}` : ""}`
}

export const nav = [
  { href: "/gemstones", label: "Gemstones" },
  { href: "/custom", label: "Custom jewelry" },
  { href: "/about", label: "Our story" },
] as const

export const askLink = { href: "/contact", label: "Ask about a stone", short: "Ask" } as const
