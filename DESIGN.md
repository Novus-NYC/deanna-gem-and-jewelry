# Deana Gem and Jewelry: design notes

## The read (three sentences)

Deana is a small jewelry seller whose whole offer is the pieces themselves: rings, necklaces, earrings, bracelets and loose gems that a visitor wants to look at closely. Visitors are shoppers who found the name through a friend or a post and want to see what is in the case and whether a piece is still there. The next step for every visitor is the same: find a piece they like and ask whether it is available.

## The visual idea: the jeweler's tag in a velvet case

Every piece in a jewelry case wears a small paper tag on a string, and that is how a customer asks about it ("is No. 14 still available?"). The site is built around that tag and the velvet case it sits in.

- **The tag** is a real shape in CSS (`.tag` in globals.css): ivory card, string end clipped to a point, a punched hole masked out so the color behind shows through. It labels gallery pieces ("No. 14"), filter buttons, the how-to-ask steps, the 404, and the contact page's chosen piece.
- **The velvet case** is the garnet background: hero, the case itself, and the closing call to action.
- **The loupe** is the shared photo treatment. Every stock photo appears only inside a round lens with a pale blue ring, as if seen through a jeweler's loupe, and opens with a circular mask reveal.
- **Motion vocabulary:** fade-up reveals, the loupe mask reveal, one small settle swing of the hero tag on load, and a gentle zoom inside the loupe on hover. All off under prefers-reduced-motion.

## Palette

| Role | Color |
| --- | --- |
| Garnet (velvet case, primary) | #4A0F1F, deep #350A16, soft #6E2236 |
| Ivory (tags, canvas) | #F4EFE6, warm #EBE3D6 |
| Ink (text, footer) | #1A1414, soft #5C4A47 |
| Loupe blue (accent, lens rings, labels on garnet) | #D6E6EC, deep #9FC0CC |

## Type

Bodoni Moda (display, italic for the name and key words) and Jost (text and tag labels). English only.

## Routes

- `/` home
- `/collection` the case: filterable gallery with an accessible dialog per piece (`?category=` deep links)
- `/contact` ask about a piece (`?piece=` and `?category=` preselect the form)
- 404

## Homepage, section by section

1. **Garnet hero.** "Deana" set huge in Bodoni italic, "Gem and Jewelry" under it, one line on how the site works, primary CTA "Browse the case", secondary "Ask about a piece". An amethyst in a loupe on the right with a tag hanging off it: "How to ask. Every piece wears a tag. Ask by its number."
2. **Ivory, "Every piece wears a tag."** Three garnet tags hanging from one string at staggered heights: Look, Note the tag, Ask.
3. **Ink, "Browse by kind."** A blue-stone loupe breaks the top edge; big Bodoni rows for each kind of piece, each linking into the filtered case.
4. **Loupe blue, "Look closer."** A huge garnet-stone loupe bleeding off the left edge; the full-size photo promise and "Open the case".
5. **Garnet close, "Seen one you like?"** The ask, or the honest "inquiries open soon" message.

## Honesty rules this build follows

- `src/lib/pieces.ts` ships empty. The case shows a designed empty state ("The case is being filled.") with the five kinds of piece, not fake products.
- `src/lib/site.ts` has no email, phone or Instagram. Until one is set, every "Ask" control reads "Inquiries open soon" and the contact page explains that inquiries are not open yet. The form is built and tested but not rendered.
- The form never posts to a server. With an email set it opens the visitor's own email app with the note written out (or their messages app, if only a phone is set).
- Categories are a reasonable starting set for a jewelry seller, not a claim about stock. Category rows show a count only when pieces exist.

## Stock photography (Unsplash License, atmosphere only)

All four are loose stones, never presented as Deana's pieces, and only shown inside the loupe treatment. Credits are also in `src/lib/images.ts`.

| File | Unsplash photo | Photographer |
| --- | --- | --- |
| public/images/amethyst.jpg | oP0fIBMUBsE | sameer Ali |
| public/images/garnet-tweezers.jpg | 99T29x3DrFw | sameer Ali |
| public/images/blue-stones.jpg | agsdDgRW2Ps | Jacek Dylag |
| public/images/rough-stones.jpg | g95sf8-fEQg | Franco Antonio Giovanella |

## What the owner needs to send

1. **Where inquiries should go:** an email address, a phone number for texts, or both. Goes in `site.inquiry` in `src/lib/site.ts`. This turns on the form and every "Ask" button.
2. **Photos of the pieces,** one per piece, ideally on a plain background, plus for each: a tag number (or we assign one), a short name, and the kind (ring, necklace, earrings, bracelet, loose gem). Optional: stone, metal, and whether it is available, on hold or sold.
3. **Confirmation of the kinds of piece** they sell, so the five categories match the case.
4. **The spelling of the business name** ("Deana" or "Deanna").
5. **Instagram or other social link,** if there is one (`site.instagram`; it appears in the footer only when set).
6. **A domain,** set as `NEXT_PUBLIC_SITE_URL` for share links and metadata.
7. **Optional:** a logo, if one exists, to replace the tag-and-D mark used for the favicon and share image.
