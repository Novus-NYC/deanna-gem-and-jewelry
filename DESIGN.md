# Deanna Gem & Jewelry: design notes

Business: **Deanna Gem and Jewelry Imports LLC** (two n's), brand short form "Deanna Gem & Jewelry". Every fact on the site traces to `research/BRIEF.md`.

## The read (three sentences)

A husband-and-wife importer on Staten Island, Dananjaya and Disni Balasuriya, who bring natural Ceylon (Sri Lankan) gemstones to New York, make custom jewelry through their designers and jewelers in Sri Lanka, and named the business after their daughter. Visitors are people who saw a stone on their Instagram or met them at a Chamber or FerryHawks table, couples thinking about a custom ring, and jewelers looking for wholesale stones. The next step is always a conversation: ask if a stone is still available, start a custom piece through their form, or text, call, email or DM them.

## The visual idea: the importer's tray

Their logo is a thin gold line drawing of a crystal cluster ("DGJ Imports LLC") on black, and every stone photo is a single gem in a white gem box. The site is that tray: stones laid out on black, each with a gem-paper label, the gold crystal line drawn behind key moments.

- **The gold crystal** (`Crystal` in `src/lib/components/crystal.tsx`): the DGJ mark redrawn as line art with dotted facet seams. Behind the hero loupe, in the nav mark, the footer, the custom-jewelry hero and the story page margin. Always decorative (aria-hidden).
- **The gem-paper label** (`.tag` in globals.css, `Tag` component): paper card with a pointed string end and a punched hole. It carries stone, carat and origin, on the gallery, the hero, the contact page and the filters. Labels only sit on onyx, sapphire or a photo edge, never on paper, so the shape always reads.
- **The onyx tray**: the gallery is black with the white gem boxes laid out loose (alternating sizes and drops), like stones on a dealer's cloth.
- **The loupe**: the hero stone is seen through a round lens with a thin gold rim.
- **The step-cut frame** (`FacetPhoto`): photos of people and events share one treatment, a 4:5 crop in an emerald cut's octagon with a gold hairline octagon offset behind it.
- **Motion vocabulary:** fade-up reveals, the loupe opening (not on the priority hero image), one settle swing of the hero label, a slow zoom on hover. Hidden start states apply only under `@media (scripting: enabled)`; all of it is off under prefers-reduced-motion.

## Palette

| Role | Color | Notes |
| --- | --- | --- |
| Onyx (logo ground: hero, tray, footer) | #0E0D0B, soft #1C1A16 | |
| Gold (the logo line) | #C9A33F, light #E0C06A | Text only on onyx (8.1:1) or sapphire (light, 5.7:1). On paper it is 2.1:1, so there it is only lines and the crystal drawing. |
| Paper (gem paper, reading surfaces, labels) | #F5F0E6, warm #E9E1D0 | Muted text #5A544A (6.6:1 on paper) |
| Ceylon sapphire (custom band, actions on paper) | #1F3D8C, deep #16306F | From their star sapphires. Paper on sapphire 8.8:1 |
| Ruby (form errors, "Sold") | #A3172F | 6.8:1 on paper |

Focus: every surface class (`surface-onyx`, `surface-paper`, `surface-sapphire`, ...) sets `--focus`, used by `:focus-visible` and `.btn`: gold light on dark surfaces, sapphire on paper. Label-shaped buttons (clip-path) show focus as an inset ring instead of an outline.

## Type

Bodoni Moda (display; the logo letters are a high-contrast serif) and Jost (text, spaced capitals like "IMPORTS LLC"). Hero names 84 to 200px.

## Routes

- `/` home
- `/gemstones` the stones on the tray: filter by kind (count announced), each stone opens in a modal dialog (`?kind=` and `?stone=` deep links). `/collection` redirects here.
- `/custom` custom jewelry: the route from consultation to delivery, what they make, metals, the charity ring
- `/about` their story in their words, the three things they do, Staten Island
- `/contact` ask about a stone (`?stone=`, `?about=custom|wholesale` preselect the form)
- 404, `robots.txt`, `sitemap.xml`

## Homepage, section by section

1. **Onyx hero.** "Deanna" huge in Bodoni italic, "Gem & Jewelry Imports", one line in their voice, "See the gemstones" plus "Or have a piece made". The 5.43 ct blue star sapphire in a gold loupe over the crystal drawing, with its gem-paper label.
2. **The parcel ledger.** Onyx panel bleeding off the left with the 5.24 ct tourmaline (sticky on desktop); on paper, every posted stone as a written line: carat, name, origin and cut, Ask or Sold.
3. **Sapphire, custom jewelry.** "Made to order, in Sri Lanka." Big rows (rings, necklaces, earrings, bracelets), the Google Form button, the charity ring in the step-cut frame breaking the top edge.
4. **Onyx, the family.** The FerryHawks table photo, their own sentence about Deanna set large, link to the story.
5. **Warm paper close.** "Seen a stone you like?" with Text, Call, Email, Instagram as a written list, plus "Jewelers: ask about wholesale".

## Honesty rules this build follows

- Stones exactly as in the BRIEF table. Ruby and Madagascar sapphire are Sold (their posts say so). The other five never say "available": they say "Ask if it’s still available". Counts exclude sold stones.
- No prices for stones (none published). The charity auction is described as their first, posted in 2026, without calling it upcoming or giving a result; the appraisal and starting price are left off.
- No street address (it is their home): the site says "Staten Island, New York".
- The form never posts to a server. It opens the visitor's email app addressed to them, and says nothing is sent until they press send. Text links use `sms:+13477577479?&body=` everywhere.
- Custom kinds come from their Google Form, booth poster and video. Metals: "traditionally 22-karat gold, and white and yellow gold too" (video). No other metals, delivery terms, timelines, hours, reviews or awards.

## Photography (all from their Instagram, research/instagram/)

| File | Source post | Crop |
| --- | --- | --- |
| public/images/pieces/*.jpg (7) | DRGDDZwjn2v, DRGAJdYjqC-, DRGDtgMDgdQ, DRGEG41jjLh, DZx32S3wt2j, DZx4xJ7h-Mp, DZx4bUMS2l8 | Square around the white gem box (box about 90% of the frame), no color change |
| public/images/hero-star-sapphire.jpg | DZx32S3wt2j | Tight square on the stone, for the loupe |
| public/images/story/ferryhawks-table.jpg | Dcr1AOyDq3v | 4:5, the founders and the logo tablecloth |
| public/images/story/chamber-booth.jpg | DegGuTnjkEA | 4:5, the gem boxes and logo runner |
| public/images/story/charity-ruby-ring.jpg | DcHNpN6Pts_ | 4:5, the ring photo from the charity flyer |

The Unsplash stock photos from the first build are gone. The favicon, Apple icon and share image are redrawn: a gold crystal with a serif "D", and "Deanna" beside the star sapphire in a loupe (`src/app/opengraph-image.png`, rendered from HTML with headless Chrome).

## Confirm with the owners

1. Which stones are still available, and new ones to add (`src/lib/pieces.ts`).
2. Permission to show their names and the founders' photo (FerryHawks table photo).
3. Whether to show the phone number for texts, or email only.
4. Whether wholesale buyers should use a separate path (today: an email with the subject "Wholesale gemstones").
5. Charity auction status (date, result) before featuring it as upcoming.
6. Original photo files and the logo as a vector or high-res PNG, to replace the redrawn crystal mark.
7. A domain, set as `NEXT_PUBLIC_SITE_URL` (on Vercel the production URL is used automatically).
