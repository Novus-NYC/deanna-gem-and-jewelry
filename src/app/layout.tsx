import type { Metadata, Viewport } from "next"
import { Bodoni_Moda, Jost } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/lib/components/navbar"
import { Footer } from "@/lib/components/footer"
import { site } from "@/lib/site"

const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})
const sans = Jost({ subsets: ["latin"], variable: "--font-sans", display: "swap" })

const description =
  "Browse the case at Deana Gem and Jewelry: rings, necklaces, earrings, bracelets and loose gems, each with a numbered tag you can ask about."

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description,
  openGraph: {
    title: site.name,
    description,
    siteName: site.name,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Deana Gem and Jewelry, in ivory on garnet, with a jeweler's tag" }],
  },
  twitter: { card: "summary_large_image", title: site.name, description, images: ["/og.png"] },
}

export const viewport: Viewport = { themeColor: "#4a0f1f" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ivory focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
