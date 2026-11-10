# Deanna Gem & Jewelry

Website for Deanna Gem and Jewelry Imports LLC, a family business on Staten Island importing natural Ceylon gemstones and making custom jewelry. Visitors browse photos of the stones and ask if one is still available. Built by Novus.

## Run it

```bash
npm install
npm run dev     # http://localhost:3103
npm run build
npm run lint    # TypeScript check
```

## Where things live

- `src/lib/site.ts`: name, email, phone (call or text), Instagram, the custom jewelry Google Form, and the site URL (`NEXT_PUBLIC_SITE_URL`, else Vercel's production URL).
- `src/lib/pieces.ts`: the stones (origin, carat, cut, treatment, certificate, sold) and the kinds of custom jewelry. Add a square photo to `public/images/pieces/` and an entry here; the gallery, filters, dialog, home ledger and contact form pick it up.
- `src/lib/photos.ts`: the hero and story photos, all from their Instagram.
- `DESIGN.md`: the visual idea, palette, type, homepage plan, honesty rules and what to confirm with the owners.
- `research/BRIEF.md`: the research every fact comes from. The original Instagram images are in `research/instagram/` (with `urls.txt`).

Next.js 16, React 19, TypeScript, Tailwind 3.
