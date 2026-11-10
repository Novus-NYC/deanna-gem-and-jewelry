import type { Metadata } from "next"
import Link from "next/link"
import { Crystal } from "@/lib/components/crystal"
import { StoneGallery } from "@/lib/components/stone-gallery"
import { families, findStone, openStones, stones, type Family } from "@/lib/pieces"
import { mailHref } from "@/lib/site"

const description =
  "Natural star sapphires and green tourmalines from Ceylon (Sri Lanka), with origin, carat, cut and treatment for each. Open any stone full size and ask if it’s still available."

export const metadata: Metadata = {
  title: "Loose gemstones",
  description,
  alternates: { canonical: "/gemstones" },
  openGraph: { title: "Loose gemstones · Deanna Gem & Jewelry", description, url: "/gemstones" },
}

type Props = { searchParams: Promise<{ kind?: string; stone?: string }> }

export default async function GemstonesPage({ searchParams }: Props) {
  const { kind, stone } = await searchParams
  const initialFilter = families.some((f) => f.id === kind) ? (kind as Family) : "all"
  const initialStone = findStone(stone)?.id
  return (
    <>
      <section className="surface-paper relative">
        <div className="container-site pb-14 pt-14 md:pt-20">
          <p className="tag-label text-ink-soft">Natural, from Ceylon and Madagascar</p>
          <h1 className="mt-5 font-display text-[clamp(3.9rem,14vw,12.5rem)] leading-[0.84] tracking-[-0.03em]">
            Loose <span className="italic">gemstones.</span>
          </h1>
          <div className="mt-8 grid gap-4 lg:grid-cols-12">
            <p className="max-w-[44ch] text-[1.15rem] text-ink-soft lg:col-span-6">
              Each stone as we posted it, in its gem box. Prices aren’t listed. {openStones.length} of {stones.length} are open to ask about: open one to see it full size, then ask if it’s still available.
            </p>
            <div className="lg:col-span-3 lg:col-start-7">
              <a href={mailHref("Wholesale gemstones")} className="link-under">
                <span className="u">Jewelers: ask about wholesale</span>
              </a>
            </div>
          </div>
        </div>
        <Crystal className="pointer-events-none absolute -bottom-8 right-[5%] hidden h-56 w-48 text-gold md:block" />
      </section>
      <StoneGallery stones={stones} initialFilter={initialFilter} initialStone={initialStone} />
      <section className="surface-paper">
        <div className="container-site flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <p className="max-w-[30ch] font-display text-d3">
            Looking for jewelry? <span className="italic">Have a piece made to order.</span>
          </p>
          <Link href="/custom" className="btn btn-sapphire w-fit">
            See custom jewelry <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
