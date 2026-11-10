import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Page not found" }

export default function NotFound() {
  return (
    <section className="surface-onyx">
      <div className="container-site grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12">
        {/* An empty gem box, drawn in the gold line. */}
        <svg aria-hidden="true" viewBox="0 0 200 200" className="w-40 text-gold md:w-56 lg:col-span-4 lg:w-full lg:max-w-[300px]">
          <rect x="6" y="6" width="188" height="188" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="30" y="30" width="140" height="140" rx="3" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="0 7" strokeLinecap="round" />
        </svg>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="tag-label text-gold">Page not found</p>
          <h1 className="mt-4 font-display text-d1">
            Nothing in <span className="italic">this box.</span>
          </h1>
          <p className="mt-6 max-w-[40ch] text-[1.15rem] text-paper/85">This page isn’t here. The stones are.</p>
          <Link href="/gemstones" className="btn btn-gold mt-8">
            See the gemstones <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
