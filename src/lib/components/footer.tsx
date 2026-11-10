import Link from "next/link"
import { inquiryOpen, site } from "@/lib/site"

/** Three rows: the name with the one action, then the pages (and any real channel), then the sign-off. */
export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="container-site flex flex-col gap-8 pb-10 pt-16 md:flex-row md:items-end md:justify-between md:pt-20">
        <Link href="/" className="block w-fit">
          <span className="block font-display text-[clamp(3.5rem,9vw,7.5rem)] italic leading-[0.85]">Deana</span>
          <span className="tag-label mt-3 block text-loupe">Gem and Jewelry</span>
        </Link>
        <Link href="/collection" className="btn btn-ivory w-fit">
          Browse the case <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="container-site">
        <ul className="flex flex-col gap-x-10 border-t border-ivory/20 py-5 sm:flex-row sm:flex-wrap sm:items-center">
          <li>
            <Link href="/collection" className="link-under inline-flex min-h-[44px] items-center">
              The case
            </Link>
          </li>
          <li>
            <Link href="/contact" className="link-under inline-flex min-h-[44px] items-center">
              {inquiryOpen ? "Ask about a piece" : "Inquiries open soon"}
            </Link>
          </li>
          {site.instagram && (
            <li>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="link-under inline-flex min-h-[44px] items-center">
                Instagram<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          )}
        </ul>
        <div className="flex flex-col gap-1 border-t border-ivory/20 py-5 text-ivory/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <a href="https://novusnyc.org" target="_blank" rel="noreferrer" className="link-under inline-flex min-h-[44px] w-fit items-center text-ivory">
            Made by Novus
          </a>
        </div>
      </div>
    </footer>
  )
}
