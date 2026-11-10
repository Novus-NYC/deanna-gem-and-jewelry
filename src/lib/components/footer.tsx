import Link from "next/link"
import { mailHref, nav, site, telHref } from "@/lib/site"
import { Crystal } from "./crystal"

/** Three rows: the name with the one action, then pages and real channels, then the sign-off. */
export function Footer() {
  return (
    <footer className="surface-onyx relative overflow-hidden border-t border-gold/40">
      <Crystal className="pointer-events-none absolute -right-10 -top-6 hidden h-[24rem] w-[22rem] text-gold/25 md:block" />
      <div className="container-site relative flex flex-col gap-8 pb-10 pt-16 md:flex-row md:items-end md:justify-between md:pt-20">
        <Link href="/" className="block w-fit">
          <span className="block font-display text-[clamp(3.5rem,9vw,7.5rem)] italic leading-[0.85]">Deanna</span>
          <span className="tag-label mt-3 block text-gold">Gem &amp; Jewelry Imports</span>
        </Link>
        <Link href="/contact" className="btn btn-gold w-fit">
          Ask about a stone <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="container-site relative">
        <div className="grid gap-x-10 border-t border-paper/20 py-5 md:grid-cols-12">
          <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-8 md:col-span-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-under">
                  <span className="u">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-8 md:col-span-6 md:justify-end">
            <li>
              <a href={telHref} className="link-under">
                <span className="u">{site.inquiry.phone}</span>
              </a>
            </li>
            <li>
              <a href={mailHref()} className="link-under">
                <span className="u">Email</span>
              </a>
            </li>
            <li>
              <a href={site.instagram.url} target="_blank" rel="noreferrer" className="link-under">
                <span className="u">Instagram</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-1 border-t border-paper/20 py-5 text-paper/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {site.place}.
          </p>
          <a href="https://novusnyc.org" target="_blank" rel="noreferrer" className="link-under w-fit text-paper">
            <span className="u">Made by Novus</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
