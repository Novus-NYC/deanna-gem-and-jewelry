import Link from "next/link"
import { Loupe } from "@/lib/components/loupe"
import { Reveal } from "@/lib/components/reveal"
import { Tag } from "@/lib/components/tag"
import { photos } from "@/lib/images"
import { categories, pieces } from "@/lib/pieces"
import { inquiryOpen } from "@/lib/site"

const steps = [
  { label: "First", title: "Look", body: "Open the case and browse the pieces by kind." },
  { label: "Then", title: "Note the tag", body: "Every piece wears a numbered tag, like it would in a shop window." },
  { label: "Last", title: "Ask", body: "Send the number and ask if it is still available." },
]

export default function Home() {
  return (
    <>
      {/* 1. The opening: the name set huge on garnet velvet, a stone seen through a loupe, and a tag hanging off the bar. */}
      <section className="relative overflow-hidden bg-garnet text-ivory">
        <div className="container-site grid gap-12 pb-20 pt-14 md:pb-28 md:pt-20 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <p className="tag-label text-loupe">Jewelry and loose gems</p>
            <h1 className="mt-6 font-display">
              <span className="block text-mega italic">Deana</span>
              <span className="mt-3 block text-d3 md:mt-4">Gem and Jewelry</span>
            </h1>
            <p className="mt-8 max-w-[34ch] text-[1.2rem] leading-snug text-ivory/90 md:text-[1.35rem]">
              Browse the pieces in the case, then ask about the one you like by its tag number.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/collection" className="btn btn-ivory">
                Browse the case <span aria-hidden="true">→</span>
              </Link>
              <Link href="/contact" className="link-under inline-flex min-h-[44px] items-center">
                {inquiryOpen ? "Ask about a piece" : "Inquiries open soon"}
              </Link>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <Loupe
              photo={photos.amethyst}
              priority
              focus="40% 55%"
              sizes="(min-width: 1024px) 38vw, 86vw"
              className="ml-auto w-[86%] max-w-[520px] lg:mt-6 lg:w-full"
            />
            <div className="swing absolute -bottom-6 left-0 w-[15rem] sm:left-4 lg:-left-16 lg:bottom-6">
              <Tag label="How to ask" string>
                <p className="font-display text-[1.45rem] italic leading-tight">Every piece wears a tag. Ask by its number.</p>
              </Tag>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How it works: three tags hanging from one string at different heights, beside the heading. */}
      <section aria-labelledby="how-title" className="bg-ivory">
        <div className="container-site grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <h2 id="how-title" className="font-display text-d2">
              Every piece <span className="italic">wears a tag.</span>
            </h2>
            <p className="mt-6 max-w-[40ch] text-[1.1rem] text-ink-soft">
              The tag is how you ask. It carries the piece&apos;s number, so a short note is enough.
            </p>
          </Reveal>
          <div className="relative lg:col-span-7">
            <svg aria-hidden="true" viewBox="0 0 700 60" preserveAspectRatio="none" className="absolute inset-x-0 top-0 hidden h-14 w-full text-garnet/60 md:block">
              <path d="M0 10 C 180 70, 520 70, 700 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
            <ol className="grid gap-6 md:grid-cols-3 md:gap-5 md:pt-10">
              {steps.map((s, i) => (
                <Reveal as="li" i={i} key={s.title} className={i === 1 ? "md:mt-10" : i === 2 ? "md:-mt-2" : ""}>
                  <div className={i % 2 ? "md:rotate-[1.5deg]" : "md:-rotate-[1.5deg]"}>
                    <div className="tag tag-garnet">
                      <p className="tag-label text-loupe">{s.label}</p>
                      <h3 className="mt-2 font-display text-[1.9rem] italic leading-none">{s.title}</h3>
                      <p className="mt-3 text-ivory/90">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 3. The case: what kinds of pieces it holds, as big rows on ink. A loupe breaks out of the top edge. */}
      <section aria-labelledby="case-title" className="relative bg-ink text-ivory">
        <div className="pointer-events-none absolute -top-16 right-5 w-36 sm:w-48 md:-top-24 md:right-10 md:w-64">
          <Loupe photo={photos.blue} sizes="16rem" />
        </div>
        <div className="container-site py-20 md:py-28">
          <Reveal>
            <p className="tag-label text-loupe">In the case</p>
            <h2 id="case-title" className="mt-4 max-w-[12ch] font-display text-d1">
              Browse <span className="italic">by kind.</span>
            </h2>
          </Reveal>
          <ul className="mt-12 border-b border-ivory/20">
            {categories.map((c, i) => {
              const count = pieces.filter((p) => p.category === c.id).length
              return (
                <Reveal as="li" i={i} key={c.id}>
                  <Link
                    href={`/collection?category=${c.id}`}
                    className="group -mx-5 flex min-h-[44px] flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 border-t border-ivory/20 px-5 py-5 transition-colors duration-300 hover:bg-garnet focus-visible:bg-garnet md:-mx-6 md:px-6 md:py-6"
                  >
                    <span className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-none group-hover:italic">{c.label}</span>
                    <span className="tag-label shrink-0 text-ivory/80">
                      {count > 0 ? `${count} in the case` : "Look inside"}
                      <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      {/* 4. Look closer: one huge loupe bleeding off the left edge on cold loupe light. */}
      <section aria-labelledby="closer-title" className="overflow-hidden bg-loupe">
        <div className="container-site grid items-center gap-10 py-20 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Loupe
              photo={photos.garnet}
              focus="40% 52%"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="-ml-[30%] w-[130%] max-w-none sm:-ml-[18%] sm:w-[110%] lg:-ml-[40%] lg:w-[140%]"
            />
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <h2 id="closer-title" className="font-display text-d1">
              Look <span className="italic">closer.</span>
            </h2>
            <p className="mt-6 max-w-[38ch] text-[1.15rem]">
              In the case, every photo opens full size, so you can see the cut, the color and the setting before you ask.
            </p>
            <Link href="/collection" className="btn btn-garnet mt-8">
              Open the case <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 5. The ask, on garnet: closes the loop back to the tag. */}
      <section aria-labelledby="ask-title" className="bg-garnet text-ivory">
        <div className="container-site flex flex-col gap-10 py-20 md:flex-row md:items-end md:justify-between md:py-28">
          <Reveal>
            <h2 id="ask-title" className="font-display text-d1">
              Seen one <span className="block italic">you like?</span>
            </h2>
          </Reveal>
          <Reveal i={1} className="md:max-w-sm">
            <p className="text-[1.15rem] text-ivory/90">
              {inquiryOpen
                ? "Send its tag number and ask if it is still available."
                : "Online inquiries open soon. Browse the case now and note the tags you like."}
            </p>
            <Link href={inquiryOpen ? "/contact" : "/collection"} className="btn btn-ivory mt-6">
              {inquiryOpen ? "Ask about its tag" : "Browse the case"} <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
