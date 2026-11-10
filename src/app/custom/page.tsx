import type { Metadata } from "next"
import Link from "next/link"
import { Crystal } from "@/lib/components/crystal"
import { FacetPhoto } from "@/lib/components/facet-photo"
import { Reveal } from "@/lib/components/reveal"
import { customKinds } from "@/lib/pieces"
import { photos } from "@/lib/photos"
import { site, smsHref, telHref } from "@/lib/site"

const description =
  "Custom rings, engagement rings, wedding bands, necklaces, pendants, earrings, bracelets and bangles, made to order by our designers and jewelers in Sri Lanka after a one-on-one consultation."

export const metadata: Metadata = {
  title: "Custom jewelry",
  description,
  alternates: { canonical: "/custom" },
  openGraph: { title: "Custom jewelry · Deanna Gem & Jewelry", description, url: "/custom" },
}

const route = [
  { where: "With you", title: "A one-on-one consultation", body: "Tell us what you have in mind: the piece, the stone, the metal." },
  { where: "In Sri Lanka", title: "Made by our designers and jewelers", body: "Our team in Sri Lanka designs and makes the piece." },
  { where: "To you", title: "Imported and delivered", body: "The finished piece is imported to the United States and delivered to you." },
]

function FormButton({ className = "btn-paper" }: { className?: string }) {
  return (
    <a href={site.customForm} target="_blank" rel="noreferrer" className={`btn ${className}`}>
      Start a custom piece <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens our Google Form in a new tab)</span>
    </a>
  )
}

export default function CustomPage() {
  return (
    <>
      {/* Sapphire opening: the promise in big type, the gold crystal drawn large behind it. */}
      <section className="surface-sapphire relative overflow-hidden">
        <Crystal className="pointer-events-none absolute -right-20 top-6 h-[34rem] w-auto text-gold-light/35 md:right-0 lg:right-[6%]" />
        <div className="container-site relative py-16 md:py-24">
          <p className="tag-label text-gold-light">Custom jewelry</p>
          <h1 className="mt-5 font-display text-mega">
            Made <span className="block italic">to order.</span>
          </h1>
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <p className="max-w-[44ch] text-[1.2rem] leading-snug text-paper/90 lg:col-span-6 md:text-[1.3rem]">
              Rings, engagement rings and wedding bands, necklaces and pendants, earrings, bracelets and bangles. Each one designed with you and made by our jewelers in Sri Lanka.
            </p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:col-span-5 lg:col-start-8 lg:justify-end">
              <FormButton />
              <Link href="/contact?about=custom" className="link-under">
                <span className="u">Ask a question first</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Onyx: the route a custom piece travels, drawn as one gold line from consultation to delivery. */}
      <section aria-labelledby="route-title" className="surface-onyx">
        <div className="container-site py-20 md:py-28">
          <Reveal>
            <h2 id="route-title" className="max-w-[16ch] font-display text-d2">
              From a conversation <span className="italic">to your hand.</span>
            </h2>
          </Reveal>
          <ol className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
            <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-gold md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto" />
            {route.map((r, i) => (
              <Reveal as="li" i={i} key={r.title} className="relative pl-10 md:pl-0 md:pt-12">
                <span aria-hidden="true" className="absolute left-0 top-1 h-[15px] w-[15px] rotate-45 border border-gold bg-onyx md:top-0" />
                <p className="tag-label text-gold">{r.where}</p>
                <h3 className="mt-3 font-display text-[1.9rem] italic leading-tight">{r.title}</h3>
                <p className="mt-3 max-w-[32ch] text-paper/85">{r.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Paper: what we make, as big written rows, with the metals and what the form asks beside them. */}
      <section aria-labelledby="kinds-title" className="surface-paper">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="kinds-title" className="tag-label text-ink-soft">
              What we make
            </h2>
            <ul className="mt-6 border-b border-onyx/15">
              {customKinds.map((k, i) => (
                <Reveal as="li" i={i} key={k.id} className="flex flex-col gap-1 border-t border-onyx/15 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-none">{k.label}</span>
                  {k.detail && <span className="text-ink-soft">{k.detail}</span>}
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal i={1} className="lg:col-span-4 lg:col-start-9 lg:pt-14">
            <div className="border-l-2 border-sapphire pl-6">
              <h3 className="font-display text-[1.9rem] italic leading-tight">In gold</h3>
              <p className="mt-3 text-[1.1rem]">Traditionally 22-karat gold, and white and yellow gold too.</p>
            </div>
            <div className="mt-10 border-l-2 border-sapphire pl-6">
              <h3 className="font-display text-[1.9rem] italic leading-tight">The form</h3>
              <p className="mt-3 text-[1.1rem]">
                Our custom jewelry form asks for the kind of piece, metal, gemstone, ring size, budget and date, and you can add inspiration photos.
              </p>
              <div className="mt-6">
                <FormButton className="btn-sapphire" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Onyx: the charity ring, in the step-cut frame, with the facts from the flyer. */}
      <section aria-labelledby="cause-title" className="surface-soft overflow-hidden">
        <div className="container-site grid items-center gap-14 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:order-2 lg:col-span-5 lg:col-start-8">
            <FacetPhoto photo={photos.charityRing} sizes="(min-width: 1024px) 36vw, 86vw" className="ml-auto w-[86%] max-w-[440px] lg:w-full" />
          </div>
          <Reveal className="lg:order-1 lg:col-span-6">
            <p className="tag-label text-gold">Jewelry for a cause</p>
            <h2 id="cause-title" className="mt-4 font-display text-d2">
              Our first <span className="italic">charity auction.</span>
            </h2>
            <p className="mt-6 max-w-[46ch] text-[1.1rem] text-paper/90">
              Posted in 2026, in collaboration with Humble Heroes of FDNY. The featured piece is a custom ring: a natural 2.02 carat Mozambique ruby with natural diamonds, GRS and GIA certified. 30% of the final sale is pledged to Humble Heroes of FDNY.
            </p>
            <p className="mt-4 max-w-[46ch] text-paper/80">We hold charity auctions for foundations we choose.</p>
          </Reveal>
        </div>
      </section>

      {/* Warm paper close. */}
      <section className="surface-warm">
        <div className="container-site grid gap-8 py-16 md:py-24 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-d1 lg:col-span-7">
            Start with <span className="italic">a conversation.</span>
          </h2>
          <div className="lg:col-span-5">
            <p className="text-[1.1rem] text-ink-soft">
              Fill in the form, or text or call {site.inquiry.phone} to set up a consultation.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <FormButton className="btn-sapphire" />
              <a href={smsHref("Hello, I’d like to ask about a custom piece.")} className="link-under">
                <span className="u">Text</span>
              </a>
              <a href={telHref} className="link-under">
                <span className="u">Call</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
