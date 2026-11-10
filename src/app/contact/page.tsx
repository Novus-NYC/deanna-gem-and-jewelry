import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { InquiryForm } from "@/lib/components/inquiry-form"
import { Tag } from "@/lib/components/tag"
import { findStone, stoneTitle } from "@/lib/pieces"
import { mailHref, site, smsHref, telHref } from "@/lib/site"

const description =
  "Ask Deanna Gem & Jewelry if a stone is still available, about custom jewelry, or about wholesale gemstones. Text or call (347) 757-7479, email, or DM us on Instagram."

export const metadata: Metadata = {
  title: "Ask about a stone",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Ask about a stone · Deanna Gem & Jewelry", description, url: "/contact" },
}

type Props = { searchParams: Promise<{ stone?: string; about?: string }> }

export default async function ContactPage({ searchParams }: Props) {
  const { stone: stoneId, about } = await searchParams
  const found = findStone(stoneId)
  const stone = found && found.status !== "sold" ? found : undefined
  const initial = stone ? `stone:${stone.id}` : about === "wholesale" ? "wholesale" : about === "custom" ? "custom:rings" : ""
  const textBody = stone ? `Hello, is the ${stoneTitle(stone)} (${stone.origin}) still available?` : "Hello, I’m asking about a stone on your website."

  const channels = [
    { label: "Text", value: site.inquiry.phone, href: smsHref(textBody) },
    { label: "Call", value: site.inquiry.phone, href: telHref },
    { label: "Email", value: site.inquiry.email, href: mailHref(stone ? `Is the ${stoneTitle(stone)} still available?` : "Asking about a stone") },
    { label: "Instagram DM", value: site.instagram.handle, href: site.instagram.url, external: true },
  ]

  return (
    <>
      <section className="surface-onyx">
        <div className="container-site grid gap-12 py-14 md:py-20 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <h1 className="font-display text-d1">
              Ask about <span className="block italic">a stone.</span>
            </h1>
            <p className="mt-6 max-w-[36ch] text-[1.15rem] text-paper/85">
              Ask if a stone is still available, about a custom piece, or about wholesale. We’re on Staten Island with no storefront, so reach us by text, call, email or Instagram DM.
            </p>

            {stone && (
              <div className="mt-10 flex items-end gap-4">
                <Image src={stone.image.src} alt={stone.image.alt} width={stone.image.width} height={stone.image.height} sizes="8rem" className="h-32 w-32 shrink-0 object-cover" />
                <Tag label={`${stone.carat} ct · ${stone.origin}`}>
                  <p className="font-display text-[1.3rem] italic leading-tight">{stone.stone}</p>
                  <p className="text-[0.95rem] text-ink-soft">{stone.cut}</p>
                </Tag>
              </div>
            )}

            <ul className="mt-10 border-b border-paper/20">
              {channels.map((c) => (
                <li key={c.label} className="border-t border-paper/20">
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex min-h-[60px] flex-col justify-center gap-x-4 py-2 hover:text-gold-light sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="tag-label text-gold">{c.label}</span>
                    <span className="font-display text-[1.2rem] italic [overflow-wrap:anywhere]">
                      {c.value}
                      {c.external && <span className="sr-only"> (opens in a new tab)</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-paper/80">
              Want something made?{" "}
              <a href={site.customForm} target="_blank" rel="noreferrer" className="link-under text-gold-light">
                <span className="u">Start a custom piece</span>
                <span className="sr-only"> (opens our Google Form in a new tab)</span>
              </a>
            </p>
          </div>
          <div className="min-w-0 lg:col-span-6 lg:col-start-7">
            <div className="surface-paper p-6 md:p-10">
              <h2 className="font-display text-d3">
                Or write a note <span className="italic">here.</span>
              </h2>
              <p className="mb-8 mt-3 text-ink-soft">It opens your email app, addressed to us. Nothing is sent until you press send.</p>
              <InquiryForm initial={initial} />
            </div>
            {found?.status === "sold" && (
              <p className="mt-6 text-paper/85">
                The {stoneTitle(found)} has sold.{" "}
                <Link href="/gemstones" className="link-under text-gold-light">
                  <span className="u">See the other stones</span>
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
