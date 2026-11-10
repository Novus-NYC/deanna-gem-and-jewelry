import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Crystal } from "@/lib/components/crystal"
import { FacetPhoto } from "@/lib/components/facet-photo"
import { Loupe } from "@/lib/components/loupe"
import { Reveal } from "@/lib/components/reveal"
import { Tag } from "@/lib/components/tag"
import { customKinds, findStone, openStones, stones } from "@/lib/pieces"
import { photos } from "@/lib/photos"
import { mailHref, site, smsHref, telHref } from "@/lib/site"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

const feature = findStone("green-tourmaline-524")!
const soldCount = stones.length - openStones.length

export default function Home() {
  return (
    <>
      {/* 1. Onyx, like the logo ground: the name set huge, gold crystal lines behind a star sapphire in a loupe, and its gem-paper label. */}
      <section className="surface-onyx relative overflow-hidden">
        <div className="container-site grid gap-14 pb-24 pt-12 md:pb-28 md:pt-20 lg:grid-cols-12 lg:gap-6">
          <div className="relative z-10 lg:col-span-7">
            <p className="tag-label text-gold">Natural gemstones &amp; jewelry, New York</p>
            <h1 className="mt-6 font-display">
              <span className="block text-mega italic">Deanna</span>
              <span className="mt-3 block text-d3 md:mt-4">Gem &amp; Jewelry Imports</span>
            </h1>
            <p className="mt-8 max-w-[36ch] text-[1.2rem] leading-snug text-paper/90 md:text-[1.35rem]">
              We bring natural gemstones from Ceylon, Sri Lanka, to New York. Browse the stones, then ask if one is still available.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="/gemstones" className="btn btn-gold">
                See the gemstones <span aria-hidden="true">→</span>
              </Link>
              <Link href="/custom" className="link-under">
                <span className="u">Or have a piece made</span>
              </Link>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <Crystal className="pointer-events-none absolute -right-16 -top-10 h-[130%] w-auto text-gold/45 sm:-right-4 lg:-right-24 lg:-top-16" />
            <Loupe
              photo={photos.heroSapphire}
              priority
              sizes="(min-width: 1024px) 34vw, 78vw"
              className="relative ml-auto w-[78%] max-w-[480px] lg:mt-8 lg:w-[88%]"
            />
            <div className="swing absolute -bottom-10 left-0 w-[15.5rem] sm:left-6 lg:-left-10 lg:bottom-0">
              <Tag label="5.43 ct · Ceylon" string>
                <p className="font-display text-[1.45rem] italic leading-tight">Natural blue star sapphire</p>
                <Link href="/contact?stone=blue-star-sapphire-543" className="link-under -mb-2 text-[0.95rem]">
                  <span className="u">Ask if it’s still available</span>
                </Link>
              </Tag>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The parcel ledger: one big stone on an onyx tray bleeding off the left, every posted stone as a written line on paper. */}
      <section aria-labelledby="stones-title" className="surface-paper">
        <div className="grid lg:grid-cols-12">
          <div className="surface-onyx relative px-5 pb-20 pt-12 md:px-10 lg:col-span-6 lg:py-24 lg:pl-0 lg:pr-14">
            <Reveal className="ml-auto max-w-[620px] lg:sticky lg:top-28">
              <Image
                src={feature.image.src}
                alt={feature.image.alt}
                width={feature.image.width}
                height={feature.image.height}
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="block h-auto w-full"
              />
              <Tag label={`${feature.carat} ct · Ceylon`} className="-mt-10 ml-4 w-fit md:ml-8">
                <p className="font-display text-[1.35rem] italic leading-tight">Green tourmaline, step cut</p>
              </Tag>
            </Reveal>
          </div>
          <div className="container-site py-16 md:py-24 lg:col-span-6 lg:max-w-none lg:pl-14 lg:pr-10">
            <Reveal>
              <h2 id="stones-title" className="font-display text-d2">
                From Ceylon, <span className="italic">by the carat.</span>
              </h2>
              <p className="mt-5 max-w-[42ch] text-[1.1rem] text-ink-soft">
                Every stone we’ve posted, written down the way a dealer labels a gem paper: weight, stone, origin.
              </p>
            </Reveal>
            <ol className="mt-10 border-b border-onyx/15">
              {stones.map((s, i) => (
                <Reveal as="li" i={i % 4} key={s.id}>
                  <Link
                    href={`/gemstones?stone=${s.id}`}
                    className="group grid min-h-[44px] grid-cols-[5.5rem_1fr_auto] items-baseline gap-x-4 border-t border-onyx/15 py-4 hover:bg-paper-warm md:grid-cols-[7rem_1fr_auto]"
                  >
                    <span className="font-display text-[2.1rem] leading-none md:text-[2.6rem]">{s.carat}</span>
                    <span>
                      <span className="block font-display text-[1.3rem] italic leading-tight group-hover:text-sapphire">{s.name}</span>
                      <span className="block text-[0.95rem] text-ink-soft">
                        {s.origin}, {s.cut.toLowerCase()}
                      </span>
                    </span>
                    <span className={`tag-label ${s.status === "sold" ? "text-ruby" : "text-sapphire"}`}>
                      {s.status === "sold" ? "Sold" : "Ask"}
                      {s.status !== "sold" && <span aria-hidden="true"> →</span>}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ol>
            <p className="mt-6 text-ink-soft">
              Weights in carats. {openStones.length} to ask about, {soldCount} sold.{" "}
              <Link href="/gemstones" className="link-under text-onyx">
                <span className="u">See them full size</span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Sapphire blue, full bleed: custom jewelry as big written rows, the charity ring breaking the top edge. */}
      <section aria-labelledby="custom-title" className="surface-sapphire relative">
        <div className="container-site grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="tag-label text-gold-light">Custom jewelry</p>
              <h2 id="custom-title" className="mt-4 font-display text-d1">
                Made to order, <span className="block italic">in Sri Lanka.</span>
              </h2>
              <p className="mt-6 max-w-[46ch] text-[1.15rem] text-paper/90">
                It starts with a one-on-one consultation. Our designers and jewelers in Sri Lanka make the piece, and it is imported and delivered to you.
              </p>
            </Reveal>
            <ul className="mt-10 border-b border-paper/25">
              {customKinds.map((k, i) => (
                <Reveal as="li" i={i} key={k.id} className="flex flex-col gap-1 border-t border-paper/25 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-none">{k.label}</span>
                  {k.detail && <span className="text-paper/85">{k.detail}</span>}
                </Reveal>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href={site.customForm} target="_blank" rel="noreferrer" className="btn btn-paper">
                Start a custom piece <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens our Google Form in a new tab)</span>
              </a>
              <Link href="/custom" className="link-under">
                <span className="u">How custom pieces are made</span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <FacetPhoto photo={photos.charityRing} sizes="(min-width: 1024px) 30vw, 80vw" className="mx-auto w-[80%] max-w-[380px] lg:-mt-48 lg:w-full" />
            <p className="mt-8 max-w-[34ch] text-paper/90">
              The custom ruby and diamond ring featured in our first charity auction, with Humble Heroes of FDNY.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Onyx: the family. The founders at their FerryHawks table, their own words set large. */}
      <section aria-labelledby="story-title" className="surface-onyx overflow-hidden">
        <div className="container-site grid items-center gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <FacetPhoto photo={photos.ferryhawks} offset="left" sizes="(min-width: 1024px) 38vw, 90vw" className="mr-auto w-[88%] max-w-[480px] lg:w-full" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h2 id="story-title" className="tag-label text-gold">
                Named after our daughter
              </h2>
              <blockquote className="mt-6">
                <p className="font-display text-[clamp(2rem,4vw,3.4rem)] italic leading-[1.05]">
                  “Founded by a first generation Sri Lankan-American and named after our daughter, Deanna (Our Precious Gem).”
                </p>
              </blockquote>
              <p className="mt-8 max-w-[44ch] text-[1.1rem] text-paper/85">
                We are Dananjaya and Disni Balasuriya, husband and wife. We started the business in {site.since}, on Staten Island.
              </p>
              <Link href="/about" className="btn btn-gold mt-8">
                Read our story <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Warm paper close: the question in big type, then every real way to ask, as a written list. */}
      <section aria-labelledby="ask-title" className="surface-warm">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 id="ask-title" className="font-display text-d1">
              Seen a stone <span className="block italic">you like?</span>
            </h2>
            <p className="mt-6 max-w-[38ch] text-[1.1rem] text-ink-soft">
              Ask if it’s still available. Text or call, email, or send us a DM on Instagram.
            </p>
          </Reveal>
          <Reveal i={1} className="lg:col-span-5 lg:col-start-8">
            <ul className="border-b border-onyx/20 text-[1.15rem]">
              {[
                { label: "Text", value: site.inquiry.phone, href: smsHref("Hello, I’m asking about a stone on your website.") },
                { label: "Call", value: site.inquiry.phone, href: telHref },
                { label: "Email", value: "Write to us", href: mailHref("Asking about a stone") },
                { label: "Instagram", value: site.instagram.handle, href: site.instagram.url, external: true },
              ].map((c) => (
                <li key={c.label} className="border-t border-onyx/20">
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex min-h-[60px] flex-col justify-center gap-x-4 py-2 hover:text-sapphire sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="tag-label text-ink-soft">{c.label}</span>
                    <span className="font-display text-[1.3rem] italic sm:text-right">
                      {c.value}
                      {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
              <Link href="/contact" className="btn btn-sapphire">
                Write a note <span aria-hidden="true">→</span>
              </Link>
              <a href={mailHref("Wholesale gemstones")} className="link-under">
                <span className="u">Jewelers: ask about wholesale</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
