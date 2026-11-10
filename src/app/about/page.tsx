import type { Metadata } from "next"
import Link from "next/link"
import { Crystal } from "@/lib/components/crystal"
import { FacetPhoto } from "@/lib/components/facet-photo"
import { Reveal } from "@/lib/components/reveal"
import { photos } from "@/lib/photos"
import { mailHref, site } from "@/lib/site"

const description =
  "Deanna Gem and Jewelry Imports LLC is a family business on Staten Island, founded in 2023 by Dananjaya and Disni Balasuriya and named after their daughter, Deanna."

export const metadata: Metadata = {
  title: "Our story",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: "Our story · Deanna Gem & Jewelry", description, url: "/about" },
}

const work = [
  {
    title: "Wholesale gemstones",
    body: "We import natural gemstones from Sri Lanka and sell them to jewelers in the United States.",
    link: { href: mailHref("Wholesale gemstones"), label: "Jewelers: ask about wholesale" },
  },
  {
    title: "Custom jewelry",
    body: "After a one-on-one consultation, our designers and jewelers in Sri Lanka make the piece, and it is imported and delivered to you.",
    link: { href: "/custom", label: "How custom pieces are made" },
  },
  {
    title: "Charity auctions",
    body: "For foundations we choose. Our first was with Humble Heroes of FDNY, featuring a custom ruby and diamond ring.",
    link: { href: "/custom#cause-title", label: "About the auction ring" },
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Onyx: their own words, set as the page's headline moment, beside the founders. */}
      <section className="surface-onyx relative overflow-hidden">
        <div className="container-site grid gap-14 py-14 md:py-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="tag-label text-gold">Our story</p>
            <h1 className="mt-5 font-display text-mega italic">
              Our precious <span className="block not-italic">gem.</span>
            </h1>
            <p className="mt-12 max-w-[40ch] text-[1.2rem] leading-snug text-paper/90 md:text-[1.3rem]">
              We are Dananjaya and Disni Balasuriya, husband and wife. We started {site.legalName} in {site.since} and named it after our daughter, Deanna.
            </p>
          </div>
          <div className="relative lg:col-span-5">
            <FacetPhoto photo={photos.ferryhawks} sizes="(min-width: 1024px) 36vw, 88vw" className="ml-auto w-[88%] max-w-[460px] lg:w-full" />
          </div>
        </div>
      </section>

      {/* Paper: the "Who are we?" post, quoted whole, with a gold crystal drawn in the margin. */}
      <section aria-labelledby="who-title" className="surface-paper relative overflow-hidden">
        <Crystal className="pointer-events-none absolute -left-16 top-10 hidden h-[30rem] w-auto text-gold lg:block" />
        <div className="container-site grid py-20 md:py-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-8 lg:col-start-4">
            <h2 id="who-title" className="tag-label text-ink-soft">
              Who are we?
            </h2>
            <blockquote className="mt-6">
              <p className="font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.2]">
                “Deanna Gem and Jewelry Imports LLC is a proud family-owned business in New York, dedicated to connecting talented (Ceylon) Sri Lankan gem and jewelry artisans with buyers across the United States and world. Founded by a first generation Sri Lankan-American and named after our daughter, <em>Deanna (Our Precious Gem)</em>. The company reflects our deep love for our heritage and passion for Sri Lankan gemstones. Together, we bring authenticity, expertise, and heartfelt dedication to every piece we share.”
              </p>
            </blockquote>
            <p className="mt-6 text-ink-soft">From our Instagram, {site.instagram.handle}</p>
          </Reveal>
        </div>
      </section>

      {/* Sapphire: the three things we do, as an uneven ledger rather than cards. */}
      <section aria-labelledby="work-title" className="surface-sapphire">
        <div className="container-site py-20 md:py-28">
          <Reveal>
            <h2 id="work-title" className="max-w-[14ch] font-display text-d1">
              Three things <span className="italic">we do.</span>
            </h2>
          </Reveal>
          <ul className="mt-12 border-b border-paper/25">
            {work.map((w, i) => (
              <Reveal as="li" i={i} key={w.title} className="grid gap-3 border-t border-paper/25 py-8 lg:grid-cols-12 lg:items-baseline lg:gap-6">
                <h3 className="font-display text-[clamp(2rem,4vw,3.2rem)] italic leading-none lg:col-span-5">{w.title}</h3>
                <p className="max-w-[46ch] text-[1.1rem] text-paper/90 lg:col-span-5">{w.body}</p>
                <div className="lg:col-span-2 lg:text-right">
                  {w.link.href.startsWith("mailto:") ? (
                    <a href={w.link.href} className="link-under text-gold-light">
                      <span className="u">{w.link.label}</span>
                    </a>
                  ) : (
                    <Link href={w.link.href} className="link-under text-gold-light">
                      <span className="u">{w.link.label}</span>
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Onyx soft: on Staten Island. The Chamber booth photo, framed like the founders' photo. */}
      <section aria-labelledby="island-title" className="surface-soft overflow-hidden">
        <div className="container-site grid items-center gap-14 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <FacetPhoto photo={photos.chamber} offset="left" sizes="(min-width: 1024px) 36vw, 86vw" className="mr-auto w-[86%] max-w-[440px] lg:w-full" />
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <p className="tag-label text-gold">{site.place}</p>
            <h2 id="island-title" className="mt-4 font-display text-d2">
              On the <span className="italic">island.</span>
            </h2>
            <ul className="mt-8 border-b border-paper/20 text-[1.1rem]">
              <li className="border-t border-paper/20 py-4">Members of the Staten Island Chamber of Commerce since 2026.</li>
              <li className="border-t border-paper/20 py-4">Our first Community Sponsor vendor event with the Staten Island FerryHawks.</li>
              <li className="border-t border-paper/20 py-4">No storefront: reach us by text, call, email or Instagram.</li>
            </ul>
            <Link href="/contact" className="btn btn-gold mt-8">
              Ask about a stone <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
