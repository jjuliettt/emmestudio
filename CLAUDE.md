# Elisa Massetti Photo: notes for Claude

The website of Elisa Massetti Photo: Next.js 16 (App Router), React 19,
TypeScript and CSS Modules, with static pages. Vercel deploys `main` to the
live site and builds a preview for every other branch. `HANDOVER.md` explains
where everything is; read the relevant part before changing something.

The person you work with is usually Elisa, a photographer, not a developer.
Explain in plain words. Don't ask her to approve plans: do the work and ask
only when something is genuinely unclear. She checks the live site on her
phone afterwards and asks for changes if needed.

## Workflow

- `main` is the live site. Never push to `main`. Start from the latest
  `main`, work on a new branch, push it and open a pull request, then merge
  it yourself with `gh pr merge <number> --merge --delete-branch` once the
  build passes (Elisa's choice since October 2026; the branch is deleted
  right after, so only `main` stays on GitHub). Tell her what went live and
  link the pull request; Vercel can take up to about 10 minutes to publish.
- One change, or one group of related changes, per pull request, so each
  one can be undone with GitHub's **Revert**.
- `npm run build` must pass before every push. `npx tsc --noEmit` is a quick
  type check. `npm run lint` doesn't work (Next.js 16 removed `next lint` and
  there is no ESLint config).
- Check changes at phone width (360 to 430 px) and laptop width (1024 to
  1440 px): no horizontal scroll, nothing overflowing.

## The repository is public

- Never commit keys, passwords or `.env*` files. The Resend keys live only in
  Vercel's environment variables and in `.env.local`.
- Never commit fonts that are not free to redistribute. `public/fonts/` is
  git-ignored on purpose for personal-use or demo fonts; don't change that
  rule. Fonts are self-hosted (`src/app/fonts.ts`). Never load them from
  Google Fonts or copy font files from other websites.
- Strip location metadata from photos, and keep them web-sized (about
  1200 to 1600 px on the long side). The site uses plain `<img>`, with no
  resizing.

## Design rules (details in HANDOVER.md, section 9)

- Colours: only `--espresso`, `--cream`, `--beige` and `--dot` from
  `src/app/globals.css`, always through the variables.
- Fonts:
  - Spectral (`--font-main`): all text; 200 for large, 300 for small, 700
    only where bold is already used.
  - Tangerine (`--font-script`): script words; 400, with 700 only for the
    Prices category titles, and not below about 24 px.
  - Quicksand (`--font-menu`): only the menu and form labels.
  - No faux bold.
- Vertical spacing only from `--space-s/m/l/xl` (12/24/48/72 px). The
  pattern (October 2026): page titles 72 px under the header, title →
  sentence 24, sentence → content 48, and 48 between one section and the
  next, on phone and laptop. Elisa's own exceptions: the Home bands on the
  phone (tighter) and Selected work on the laptop (72). From the last
  item of any page to the booking photo it is always 72 px on the phone
  and 96 px on the laptop (48 from the page, 24/48 from the booking).
- Laptop width: every page's content is `--page-width` (66rem) wide,
  centred, with at least 3rem at the sides; only the hero, the category
  photos, the reviews and the booking photo go across the full width.
- Text links and calls to action use the global `u-link` class.
- One shared `Booking` component ("Want to work together" photo) on Home,
  Portfolio and the category pages. Contacts and Prices end instead with
  the same three centred links (`src/components/ClosingLinks/`), then the
  footer.
- Mobile first. The laptop layout is in the `@media (min-width: 1024px)`
  blocks at the bottom of each `.module.css`; the tablet range (768 to
  1023 px) is still not refined.
- Never split words at the end of a line (no hyphenation anywhere; set
  once on `body` in `globals.css`). Long texts are justified only where
  Elisa asked (About, FAQ answers, Privacy & Legal).
- Keep `alt` text on images and the reduced-motion behaviour.

## Content

- Swappable images are in `public/assets/REPLACE-ME/` and are picked up by
  file name; see the README there. Category pages show
  `REPLACE-ME_<category>-NN.(jpg|png|webp)` in number order.
- Texts sit at the top of each component or page, in constants such as
  `TEXT`, `REVIEWS`, `PRIVATE` and `FAQ`.
- Code comments are in Italian; match the surrounding style.

## Changed since HANDOVER.md was written (October 2026)

Trust the code where the handover differs:
- The categories are **Private People**, **Small Businesses** and
  **Companies & Events** everywhere (covers, page titles, Prices, both
  forms). The addresses are still `/portfolio/private` and
  `/portfolio/events`, so the photos are still `REPLACE-ME_private-NN` and
  `REPLACE-ME_events-NN`.
- The three covers are Elisa's finished graphics (4:5 `.webp` in
  `public/images/portfolio/`); no more cat photos there. The booking photo
  is Elisa's (`public/images/booking.jpg`, 3:2, `PHOTO` in `Booking.tsx`):
  a 16:9 window on the phone, a wide band on the laptop, and the whole
  photo slides through as you scroll. Above the photo a little extra
  space (24 px phone, 48 px laptop) in the colour of the section before
  (`after="beige"` on Home), and the footer is attached right
  under it. The box is horizontal on both (small on the
  phone, the question on two lines) and fades in only when the window is
  almost fully in view, at the bottom of the page. A replacement should be horizontal,
  at least about 2000 px wide (2400 to 2560 is better), with a quiet centre
  where the box sits.
- Category pages: a description under the title (`description` in
  `src/lib/portfolioCategories.ts`), a magazine-style photo layout chosen
  from each photo's shape (`src/components/Gallery/`), a cream full-screen
  view with an Info button (details from an optional `.txt` file with the
  photo's name; see the README in `public/assets/REPLACE-ME/`), and
  hand-drawn arrows to the previous/next category with "Back to home"
  underneath (`src/components/CategoryNav/`).
- Real category photos since 27 October 2026 (21 Private People, 9 Small
  Businesses, 64 Companies & Events, 1600 px, sRGB, no metadata), in an
  order chosen to mix shapes and sessions. The Home slideshow is no longer
  its own files: it shows every landscape category photo, interleaved by
  category (`src/lib/heroSlides.ts`), and only keeps the previous, current
  and next photo in the page. Hero photos 2 and 3 are Elisa's choice
  (`public/images/hero/photo-2.jpg` from Small Businesses _DSC2886 cropped
  2:3, `photo-3.jpg` from Private People _DSC8910). Review photos: Paulina
  (`review-02`) and Tawake (`review-03`) are real, 400 px squares cropped
  on the face; Hania and Prof. Tacik are still placeholders.
- Every page has a back-to-top button. All arrows are the same hand-drawn
  one (`src/components/HandArrow/`).
- "A little about me" was removed from About at Elisa's request; don't add
  it back. There is no separate About page: Home has the whole About band
  (greeting, signature on the photo) with the first two paragraphs of
  `TEXT` and the rest behind "Read more" (`ReadMore.tsx`, opens in place),
  spaced as before the About page existed; no About in the menu (Home,
  Portfolio, Prices, Contacts). The FAQ title is Spectral, not Tangerine. Form
  placeholders are upright Spectral 200.
- Laptop version (from 1024 px): menu links in a row in the header (the
  three categories drop down under Portfolio on hover); the
  hero across the full width in three columns (vertical title at the bottom
  left, photo 2 with photo 3 overlapping and the sentence under it, the
  slideshow as the biggest photo) over a thin espresso line with
  "Photographer based in Belgium" and a "View my portfolio" link (laptop
  only); About with the greeting centred above, the photo left (the
  signature rising beside the greeting) and the text right, centred on the
  photo while closed and rising to its top edge when opened; covers and price packages three in a row (covers blur lightly and
  show "VIEW" in the middle on hover); the price-guide form's three fields
  in a row, like the Contacts form in two columns; category photos in four staggered
  columns across the page (never taller than about 80% of the screen), with
  "Info" to the right of the full-screen photo; the booking photo as wide as
  the page with a horizontal box.
