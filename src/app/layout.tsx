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
  "Natural Ceylon (Sri Lankan) gemstones and custom jewelry from a family business on Staten Island, New York. Browse the stones and ask if one is still available."

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Natural gemstones and custom jewelry`, template: `%s · ${site.name}` },
  description,
  applicationName: site.name,
  openGraph: {
    title: site.name,
    description,
    siteName: site.legalName,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.name, description },
}

export const viewport: Viewport = { themeColor: "#0e0d0b" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-3 focus:text-onyx"
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
