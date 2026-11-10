# Deana Gem and Jewelry

A jewelry website where visitors browse photos of the pieces in the case and ask whether a piece is available. Built by Novus.

## Run it

```bash
npm install
npm run dev     # http://localhost:3103
npm run build
npm run lint    # TypeScript check
```

## Where things live

- `src/lib/site.ts`: business name, inquiry email or phone, Instagram. All empty until the owner sends them.
- `src/lib/pieces.ts`: the pieces in the case. Add a photo to `public/pieces/` and an entry here; the gallery, filters, dialog and contact form pick it up.
- `src/lib/images.ts`: the four Unsplash atmosphere photos and their credits.
- `DESIGN.md`: the visual idea, palette, type, homepage plan, and the list of what the owner still needs to send.
- `research/BRIEF.md`: what we searched for and found.

Next.js 16, React 19, TypeScript, Tailwind 3.
