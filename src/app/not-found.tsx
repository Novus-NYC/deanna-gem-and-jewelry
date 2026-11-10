import type { Metadata } from "next"
import Link from "next/link"
import { Tag } from "@/lib/components/tag"

export const metadata: Metadata = { title: "Page not found" }

export default function NotFound() {
  return (
    <section className="bg-garnet text-ivory">
      <div className="container-site flex flex-col items-start gap-10 py-24 md:py-32">
        <Tag label="No tag">
          <p className="font-display text-[1.4rem] italic">This page isn&apos;t in the case.</p>
        </Tag>
        <h1 className="font-display text-d1">
          Nothing <span className="italic">here.</span>
        </h1>
        <Link href="/collection" className="btn btn-ivory">
          Browse the case <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
