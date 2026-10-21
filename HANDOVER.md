# Handover: Elisa Massetti Photo website

This document is for Elisa, so you can look after the site and change it
yourself. It explains how the site is built, where every text and photo lives,
how to make changes safely, and what is still unfinished.

You don't need to be a developer for most of it. Swapping photos and editing
texts can be done in the GitHub website, without installing anything.

---

## Contents

1. [Quick facts](#1-quick-facts)
2. [Access you need](#2-access-you-need)
3. [How a change goes live](#3-how-a-change-goes-live)
4. [Three ways to make changes](#4-three-ways-to-make-changes)
5. [How the project is organised](#5-how-the-project-is-organised)
6. [The pages and where they are](#6-the-pages-and-where-they-are)
7. [Common changes, step by step](#7-common-changes-step-by-step)
8. [Preparing photos](#8-preparing-photos)
9. [Design rules](#9-design-rules)
10. [Forms and email (Resend)](#10-forms-and-email-resend)
11. [Before you publish: checklist](#11-before-you-publish-checklist)
12. [If something goes wrong](#12-if-something-goes-wrong)
13. [Still open / to do](#13-still-open--to-do)
14. [Things never to do](#14-things-never-to-do)
15. [Setting up Claude Code with GitHub](#15-setting-up-claude-code-with-github)
16. [Small glossary](#16-small-glossary)

---

## 1. Quick facts

| | |
|---|---|
| Code | GitHub repository `jjuliettt/emmestudio`. It is **public**: anyone can read every file in it. |
| Hosting | Vercel, project `emmestudio` (dashboard: <https://vercel.com/jjuliettts-projects/emmestudio>) |
| Live site | Whatever is on the `main` branch. Every push to `main` goes live automatically, after 1 to 2 minutes. |
| Previews | Every other branch gets its own private preview address on Vercel. Use it to check a change before it goes live. |
| Built with | Next.js 16 (React 19), TypeScript and plain CSS (CSS Modules). No database, no CMS. |
| Email | The two forms send email through Resend (see [section 10](#10-forms-and-email-resend)). |
| Cookies | None. The site sets no cookies and uses no analytics. |
| Designed for | Phones (checked at 360 to 430 px wide). Tablet and desktop work, but their layout is not finished yet. |
| Code comments | Mostly in Italian. |

---

## 2. Access you need

Ask the owner of the GitHub account `jjuliettt` and of the Vercel team for:

1. **GitHub**: to be added as a collaborator on `jjuliettt/emmestudio`, with
   write access. Without it you can read the code but not change it.
2. **Vercel**: to be invited to the project. You need this to see
   deployments and build errors, roll back, and set the email keys. It is
   optional if someone else looks after Vercel for you.
3. **Resend**: the login of the Resend account the forms use, or your own
   account (see [section 10](#10-forms-and-email-resend)).
4. **Claude**: a paid Claude plan (Pro or Max) if you want Claude Code to do
   the changes for you. Setting it up is in
   [section 15](#15-setting-up-claude-code-with-github).

---

## 3. How a change goes live

```
your change ──> a branch ──> Vercel preview (check it on your phone) ──> merge into main ──> live
```

- **`main` is the live site.** Anything that lands on `main` is published.
- The safe way is to work on a **branch** (a copy of the site where you can
  try things). Vercel builds every branch and gives it a preview link.
- When the preview looks right, you **merge** the branch into `main` with a
  pull request on GitHub, and it goes live.
- If the build fails (a typo in the code, for example), Vercel does not
  publish it and the previous version stays online. You see the error in
  Vercel → Deployments.

For a tiny, safe change (replacing a photo with one of the same name and
shape) committing straight to `main` is fine. For anything else, use a branch.

---

## 4. Three ways to make changes

### A. In the GitHub website (no installation)

Best for: swapping photos, editing texts, prices and reviews.

**To edit a text file:**

1. Open the repository on github.com and go to the file. Section
   [7](#7-common-changes-step-by-step) tells you which file.
2. Click the **pencil** icon (Edit this file).
3. Change only the text between the quotes `"..."`, keeping the quotes,
   commas and brackets exactly as they are.
4. Click **Commit changes…**, choose **"Create a new branch for this commit
   and start a pull request"**, give it a short name and confirm.
5. On the pull request page, wait for the **Vercel** check to finish. Then
   open its preview link (shown on the pull request, or in Vercel →
   Deployments) and look at the change on your phone.
6. If it's right, click **Merge pull request**. The site updates in 1 to 2
   minutes.

**To replace or add a photo:**

1. Go to the folder (for most photos `public/assets/REPLACE-ME/`).
2. Click **Add file → Upload files** and drag in the new file. To replace a
   photo, the new file must have **exactly the same name**, including
   capitals and the extension (`.jpg`, `.png`).
3. Commit it the same way: on a new branch with a pull request, or straight
   to `main` for a simple swap.

Tip: pressing `.` on any page of the repository opens a full editor in the
browser (github.dev). It's handy for changing several files in one go.

### B. On your computer

Best for: bigger changes, and seeing the result instantly while you work.

You need Node.js **20.9 or newer** (the site is tested on Node 22), Git, and
a code editor such as VS Code.

```bash
git clone https://github.com/jjuliettt/emmestudio.git
cd emmestudio
npm install          # once, and again whenever package.json changes
npm run dev          # open http://localhost:3000 (refreshes as you save)
```

Before you push, always run:

```bash
npm run build        # must finish without errors: this is what Vercel runs
```

Then create a branch, commit and push:

```bash
git checkout -b my-change
git add -A
git commit -m "Short description of the change"
git push -u origin my-change
```

Then open the pull request on GitHub as in A.

To test the forms locally you need a `.env.local` file. See
[section 10](#10-forms-and-email-resend).

Note: `npm run lint` does not work. Next.js 16 removed that command and the
project has no ESLint setup. Use `npm run build`, and `npx tsc --noEmit` for a
quick type check.

### C. With Claude Code

Claude Code can make the changes for you, in your browser or the Claude app
(nothing to install) or on your computer. The one-time setup, including
connecting GitHub, is in
[section 15](#15-setting-up-claude-code-with-github).

The repository has a `CLAUDE.md` file that Claude Code reads automatically at
the start of every session. It holds the house rules:
- work on a branch, never on `main`;
- follow the design rules;
- run `npm run build` before pushing;
- never commit keys or fonts.

You only need to describe what you want changed.

---

## 5. How the project is organised

```
emmestudio/
├── HANDOVER.md                  ← this file
├── CLAUDE.md                    ← house rules Claude Code reads automatically
├── package.json                 ← project name, scripts and libraries
├── public/                      ← files served as they are (photos)
│   ├── assets/REPLACE-ME/       ← photos and images meant to be swapped (+ README.md)
│   ├── images/hero/             ← the 5 photos at the top of the home page
│   ├── images/portfolio/        ← the "Private People" cover
│   └── fonts/                   ← IGNORED by git on purpose (see section 14)
└── src/
    ├── app/                     ← one folder per page
    │   ├── layout.tsx           ← wraps every page: header, footer, fonts, default title
    │   ├── globals.css          ← colours, fonts, spacing scale, link style
    │   ├── fonts.ts + fonts/    ← the three fonts (files are in the repo)
    │   ├── page.tsx             ← Home
    │   ├── portfolio/page.tsx   ← /portfolio
    │   ├── portfolio/[category]/page.tsx ← /portfolio/private, /events, /small-businesses
    │   ├── prices/page.tsx      ← /prices (packages, FAQ, price-guide form)
    │   ├── contacts/page.tsx    ← /contacts
    │   ├── privacy-policy/page.tsx ← /privacy-policy (Privacy & Legal)
    │   └── api/                 ← the two form "senders" (contact, price-guide)
    ├── components/              ← the building blocks, each with its own .module.css
    │   ├── Header/  Footer/  Hero/  About/  Portfolio/  Reviews/  Booking/
    │   ├── Gallery/ (category photo grid + full-screen view)
    │   ├── Forms/ Contact/ Prices/ Faq/ PageTitle/ HandTitle/ Legal/
    └── lib/                     ← shared settings and helpers
        ├── contacts.ts          ← email, Instagram, enterprise number, brand name
        ├── portfolioCategories.ts ← the three portfolio covers
        ├── categoryPhotos.ts    ← finds the photos for the category pages
        ├── forms.ts             ← price-guide categories, email check
        └── resend.ts            ← sending email
```

Each component is a pair: `Name.tsx` (content and structure) and
`Name.module.css` (its look). Texts are almost always at the top of the
`.tsx` file, in a list written in CAPITALS (for example `TEXT`, `REVIEWS`,
`FAQ`).

The pages are built once when the site is published (static pages), which
is why they are very fast. It also means a new photo only appears after a new
deploy, and every push does that automatically.

---

## 6. The pages and where they are

The **header** (menu and name) and **footer** are on every page:
`src/components/Header/Header.tsx`, `src/components/Footer/Footer.tsx`.

### Home: `/` → `src/app/page.tsx`

From top to bottom:

| Section | What it is | File |
|---|---|---|
| Hero | "Welcome to Elisa Massetti Photo", a slideshow of 3 photos (changes every 4.5 s), 2 more photos, and the line "Images that make you look *confident / natural / unforgettable*" (word changes every 3 s) | `components/Hero/Hero.tsx` |
| About | "Ciao, I'm Elisa, and", signature over your photo, "A little about me" and the text | `components/About/About.tsx` |
| Selected work | Handwritten "Selected Work", the three portfolio covers, "View my portfolio" | `components/Portfolio/` + `lib/portfolioCategories.ts` |
| Reviews | Four reviews that slide (every 10 s, or swipe, or tap the dots) | `components/Reviews/Reviews.tsx` |
| Booking | Photo with the "Want to *work together*?" box: GET IN TOUCH / SEE PRICES | `components/Booking/Booking.tsx` |

### Portfolio: `/portfolio` → `src/app/portfolio/page.tsx`

Title, intro sentence, the same three covers, booking box.

### Category pages: `/portfolio/private`, `/portfolio/events`, `/portfolio/small-businesses`

All three use one template: `src/app/portfolio/[category]/page.tsx`.
"Back to portfolio", the title, a photo grid (2 columns on phones, 3 on
bigger screens; tap a photo to see it full screen), links to the other two
categories, and the booking box. The photos come from the files in
`public/assets/REPLACE-ME/` (see [7.2](#72-photos-of-the-category-pages)).

### Prices: `/prices` → `src/app/prices/page.tsx`

Intro and the brown banner with the three categories. Then Private (3
packages), Small Businesses (3 packages) and Companies & Events (no prices).
After that, the FAQ, the "Get the full price guide" form, and the booking box
(here with SEE PORTFOLIO instead of SEE PRICES).

### Contacts: `/contacts` → `src/app/contacts/page.tsx`

"Let's talk", the contact form, email and area, links to prices and
portfolio.

### Privacy & Legal: `/privacy-policy` → `src/app/privacy-policy/page.tsx`

The full legal text, linked from the footer.

---

## 7. Common changes, step by step

Quick index:

| I want to change… | File | What to look for |
|---|---|---|
| Signature, "Selected Work", my About photo, review photos, category photos | `public/assets/REPLACE-ME/` | replace the file, same name |
| Hero photos | `public/images/hero/` + `src/components/Hero/Hero.tsx` | `SLIDES`, `PHOTO_2`, `PHOTO_3` |
| The three changing words in the hero | `src/components/Hero/Hero.tsx` | `ADJECTIVES` |
| About text | `src/components/About/About.tsx` | `TEXT` |
| Portfolio covers | `src/lib/portfolioCategories.ts` | `PORTFOLIO_CATEGORIES` |
| Portfolio intro sentence | `src/app/portfolio/page.tsx` | `PageLead` |
| Reviews | `src/components/Reviews/Reviews.tsx` | `REVIEWS` |
| Booking photo | `src/components/Booking/Booking.tsx` | `PHOTO_SRC` |
| Packages, prices, FAQ | `src/app/prices/page.tsx` | `PRIVATE`, `SMALL_BUSINESSES`, `FAQ`, "Starting at" |
| Contact-form choices | `src/components/Contact/ContactForm.tsx` | `INTERESTS` |
| Email, Instagram, enterprise number | `src/lib/contacts.ts` | |
| Menu | `src/components/Header/Header.tsx` | `PAGES` |
| Footer | `src/components/Footer/Footer.tsx` | |
| Privacy text | `src/app/privacy-policy/page.tsx` | `LAST_UPDATED` + the sections |
| Tab titles and Google descriptions | `metadata` at the top of each page, default in `src/app/layout.tsx` | |
| Emails the forms send | `src/app/api/contact/route.ts`, `src/app/api/price-guide/route.ts` | |

### 7.1 Swap a photo in REPLACE-ME

`public/assets/REPLACE-ME/` holds everything that was planned to be replaced.
Put a new file there with **exactly the same name** and it is used, with no
code to change. The `README.md` in that folder lists every file.

| File | What it is |
|---|---|
| `REPLACE-ME_photo-elisa.jpg` | Your photo in About. Landscape 3:2 (for example 1500 × 1000). Already your real photo. |
| `REPLACE-ME_signature.png` | Signature over that photo. Transparent PNG, ink in `#3B2A22`. Already your real signature. |
| `REPLACE-ME_hw-selected-work.png` | Handwritten "Selected Work". Transparent PNG, ink in `#3B2A22`. Already the real one. |
| `REPLACE-ME_review-01.jpg` … `-04.jpg` | Review photos, in order: Hania, Paulina, Tawake, Prof. Tacik. Shown as a 56 px circle, so a square of 240 to 400 px is enough. **Currently placeholders with initials.** |
| `REPLACE-ME_private-NN.jpg`, `REPLACE-ME_events-NN.jpg`, `REPLACE-ME_small-businesses-NN.jpg` | Photos of the category pages. **Currently placeholders** (copies of the hero photos). |

The names say "REPLACE-ME" so placeholders are easy to spot. Real files can
keep that name. Renaming them would need a code change.

If a file is missing, the site falls back to something:
- the About photo shows a placeholder;
- the signature becomes the name written in the script font;
- "Selected Work" becomes typed text.

### 7.2 Photos of the category pages

- Name them `REPLACE-ME_<category>-01.jpg`, `-02.jpg`, `-03.jpg` … where
  `<category>` is `private`, `events` or `small-businesses`.
- They appear **in number order**, each in **its own shape** (portrait and
  landscape can be mixed; nothing is cropped).
- Add as many as you like (`-06`, `-07` …) or delete some. The page shows
  whatever is in the folder.
- `.jpg`, `.png` and `.webp` all work.
- On phones the grid has two columns that fill top to bottom: photos 1, 2, 3
  … go down the left column first, then the right. Look at the preview and
  renumber if you want a different arrangement.

### 7.3 Portfolio covers

File: `src/lib/portfolioCategories.ts`, list `PORTFOLIO_CATEGORIES`. Each
cover has:

- `title`: the name (also used as the category page title);
- `href`: the address, `/portfolio/<category>`;
- `src`: the photo;
- `alt`: a description for screen readers and Google;
- `lettering`: what is written on it.

There are two kinds of cover:

1. **A finished graphic**, like your "Private People" cover:
   `lettering: { kind: "image" }`. It's shown as it is, at 4:5 (for example
   1000 × 1250), with nothing added on top. This is the easiest way to get
   exactly the design you want: make the cover in your design app, export it
   at 4:5, put it in `public/images/portfolio/`, and point `src` to it (for
   example `"/images/portfolio/events-cover.jpg"`).
2. **A photo with lettering made by the site** (Events and Small Businesses
   now): the photo is cropped almost square (8:9), and the words come from
   `labels` / `script` (Events) or `mark` / `flank` (Small Businesses).

**The Events and Small Businesses covers are still placeholder photos of cats**
from placecats.com. Replace them (see [section 13](#13-still-open--to-do)).

On hover (computer) or while pressed (phone), the photo zooms in slightly,
the frame moves in and "VIEW" appears. This is automatic.

### 7.4 Hero

File: `src/components/Hero/Hero.tsx`.

- `SLIDES`: the 3 slideshow photos. The frame is 3:2 landscape.
- `PHOTO_2` and `PHOTO_3`: the two photos underneath. Their frames are 2:3
  portrait.
- Each photo has `src` (the file in `public/images/hero/`) and `alt` (a short
  description; keep it, it matters for accessibility and Google).
- The frames crop each photo to their own shape from the centre, so keep the
  subject near the middle.
- `ADJECTIVES`: the three words that change. You can change them or add more.
  The sentence resizes itself so it always stays on three lines.

### 7.5 About text

File: `src/components/About/About.tsx`, list `TEXT`. One `"…"` per
paragraph, separated by commas. Apostrophes can be typed normally inside
the quotes. If you need a double quote inside the text, use the curly ones
“ ”.

The greeting ("Ciao, I'm Elisa, and") and the heading ("A little about me")
are further down in the same file.

### 7.6 Reviews

File: `src/components/Reviews/Reviews.tsx`, list `REVIEWS`. Each review has
`quote` (without quote marks, which the site adds), `name`, `label` (the line
under the name) and `src` (the photo). To add a fifth review, copy one block
`{ … },`, change it, and add a photo `REPLACE-ME_review-05.jpg`. The dots
update by themselves.

### 7.7 Prices, packages and FAQ

File: `src/app/prices/page.tsx`.

- `PRIVATE` and `SMALL_BUSINESSES`: three packages each, with `name`,
  `duration`, `photos` and `text`. `featured: true` marks the "most chosen"
  one (brown card with the tag). Only one per category.
- "Starting at €150" and "Starting at €295" are written further down in the
  file, in the Private and Small Businesses sections.
- The other short texts of each section are in the `lines={[ … ]}` lists.
- `FAQ`: `question` and `answer` pairs. Add or remove as many as you like.
- The page intro ("Choose the session that fits you…") is in `PageLead`.

### 7.8 Contact details

File: `src/lib/contacts.ts`.

- `EMAIL`: shown on Contacts, in the footer and in the price-guide email. For
  now it's plain text, because the domain isn't bought yet.
- `INSTAGRAM`: `null` hides the Instagram line. Put the full link in quotes
  (for example `"https://www.instagram.com/…"`) and "Follow my work" appears
  on the Contacts page.
- `ENTERPRISE_NO`: shown in the footer and in Privacy & Legal.

The phone number and address are written directly in Privacy & Legal
(`src/app/privacy-policy/page.tsx`, section "1. Who I am").

### 7.9 Menu and footer

- Menu: `PAGES` in `src/components/Header/Header.tsx` (label and address).
- Footer: `src/components/Footer/Footer.tsx`. The year updates by itself.

### 7.10 Privacy & Legal

File: `src/app/privacy-policy/page.tsx`. When you change the text, also
change `LAST_UPDATED` at the top. Some parts are still marked `[OPEN: …]` (see
[section 13](#13-still-open--to-do)).

### 7.11 Tab titles and Google descriptions

Every page starts with a `metadata` block holding `title` (the browser tab;
" | Elisa Massetti Photo" is added automatically) and `description` (the text
Google may show under the link). The default for the whole site is in
`src/app/layout.tsx`.

### 7.12 Add a fourth portfolio category

1. In `src/lib/portfolioCategories.ts`, add a block to
   `PORTFOLIO_CATEGORIES` with `href: "/portfolio/<new-name>"` (lowercase,
   words joined with `-`).
2. Add the photos `public/assets/REPLACE-ME/REPLACE-ME_<new-name>-01.jpg`,
   `-02.jpg` …

The cover appears on Home and Portfolio, and its page is created
automatically. The "other categories" links update too.

Note: the categories on the Prices page (Private, Small Businesses,
Companies & Events) are a separate list, `GUIDE_CATEGORIES` in
`src/lib/forms.ts`.

---

## 8. Preparing photos

The site shows your files as they are and doesn't shrink them, so file size
matters on phones.

- **Format:** JPEG for photos. PNG with a transparent background for the
  signature and handwriting.
- **Size:** about 1200 to 1600 px on the long side is plenty (hero photos
  now: 1200 px wide; your About photo: 1500 × 1000). Aim for under 300 to
  400 KB per photo.
- **Shape:** match the frame (hero slideshow 3:2, hero photos 2 and 3 at 2:3,
  About 3:2, covers 4:5 or 8:9, booking 2:3, reviews square). Category photos
  can be any shape.
- **Remove location data.** Phone photos can contain GPS coordinates, and the
  repository is public. Most export tools (Lightroom: Metadata → "Copyright
  Only", "Remove Location Info") can strip it.
- **Names:** no spaces or accents. Use lowercase and dashes, like
  `events-cover.jpg`. For REPLACE-ME files, use the exact name.
- **Permission:** only publish photos of people (and logos) you're allowed to
  use. The repository is public, so anything added to it can be seen and
  downloaded, even before it's on a page.

---

## 9. Design rules

These come from your briefs. Keeping them is what keeps the site looking
consistent.

### Colours: only these four (`src/app/globals.css`)

| Name | Code | Used for |
|---|---|---|
| Espresso | `#3B2A22` | All text, brown blocks, lines, every accent |
| Cream | `#FAF4F0` | Page background, text on brown |
| Beige | `#F7EEE7` | The bands (About, Reviews, some sections) |
| Dot | `#D5C6B8` | Only the inactive dots under the reviews |

No other colours, no gradients, no transparency. In CSS, always use the names
(`var(--espresso)` and so on), not the codes.

### Fonts: three, all free (OFL) and self-hosted

| Font | Variable | Used for |
|---|---|---|
| **Spectral** (Font 1) | `var(--font-main)` | All text. Weight 200 for big text (about 20 px and up), 300 for small text. |
| **Tangerine** (Font 2) | `var(--font-script)` | The words in script ("confident", "work together", "A little about me", FAQ, the Prices titles). Weight 400. 700 only for the three category titles on Prices. Never below about 24 px (the hero word is currently smaller, see [section 13](#13-still-open--to-do)). |
| **Quicksand** (Font 3) | `var(--font-menu)` | Only the menu and the form field labels |

- **Bold** is used only for the page titles, "Welcome to", SMALL BUSINESSES on
  its cover, the Prices category titles, and the small headings in Privacy &
  Legal. The site switches off fake bold, so bold only exists where a real
  bold file is loaded.
- Tangerine has very small lowercase letters, so next to Spectral it's
  enlarged (`--script-scale: 1.8`). Judge it by eye.
- The font files are in `src/app/fonts/` and are served by the site itself.
  The site makes no requests to Google, which is better for privacy (GDPR).
  Don't switch to loading fonts from Google Fonts.

### Spacing: four steps (`src/app/globals.css`)

| | |
|---|---|
| `--space-s` | 12 px |
| `--space-m` | 24 px |
| `--space-l` | 48 px |
| `--space-xl` | 72 px |

All vertical spacing between blocks and sections uses only these four.
"Equal space" means the same step above and below. Side margins on phones
are 20 px (`1.25rem`).

### Links and buttons

Text links and calls to action ("GET IN TOUCH", "SEE PRICES", "VIEW MY
PORTFOLIO" …) use the class `u-link`: Spectral in capitals, widely spaced,
with a thin underline. Use it for any new link so it matches.

### Booking box

There is one booking component (`Booking.tsx`) and every page uses it
unchanged. Only Prices swaps SEE PRICES for SEE PORTFOLIO. If you change its
photo or text, it changes everywhere.

### Mobile first

Every style is written for phones first. The tablet and desktop rules sit at
the bottom of each `.module.css` file, under `@media (min-width: 768px)`,
marked "non ancora rifinito" (not refined yet). Always check your changes at
phone width. In Chrome: right-click → Inspect → the phone icon, and try
360 px and 430 px.

### Movement and accessibility

The slideshow, the changing words, the review slider, the booking parallax
and the cover zoom all stop when a visitor's phone is set to "reduce motion".
Menus, forms, the dropdown and the full-screen photo view work with the
keyboard too. When you add a photo, always give it an `alt` description.

---

## 10. Forms and email (Resend)

There are two forms:

| Form | Where | What happens |
|---|---|---|
| Contact | `/contacts` | Sends you an email with the message. "Reply" answers the visitor. |
| Price guide | `/prices` | Sends the visitor a "Pricing" email, then sends you an email with their details. |

The sending code is in `src/app/api/contact/route.ts`,
`src/app/api/price-guide/route.ts` and `src/lib/resend.ts`. The email texts
(subjects and bodies) are in the two `route.ts` files.

### The keys (never in the code)

The forms need these settings, called "environment variables". The
repository is public, so they must **never** be written in a file that is
committed.

| Name | What |
|---|---|
| `RESEND_API_KEY` | The API key from your Resend account |
| `CONTACT_TO_EMAIL` | Where the messages arrive (your email) |
| `CONTACT_FROM_EMAIL` | Optional. The sender, for example `Elisa Massetti Photo <hello@elisamassetti.com>`. Only works once the domain is verified in Resend. |

- **Live site:** Vercel → project → Settings → Environment Variables. Add
  them for Production (and Preview if you want forms to work on previews),
  then redeploy.
- **On your computer:** create a file `.env.local` in the project folder
  (git already ignores it) with:

  ```
  RESEND_API_KEY=...
  CONTACT_TO_EMAIL=...
  ```

If the keys are missing, the forms show an error to the visitor ("Sorry, the
message couldn't be sent" or "Sorry, the guide couldn't be sent").

### Important until the domain is bought

Without a verified domain, Resend only sends from its test address, and
**only to the email of the Resend account itself**. This means:

- the **contact form** works, if `CONTACT_TO_EMAIL` is the Resend account's
  email;
- the **price-guide form does not work for visitors**: its first email goes
  to the visitor, Resend refuses it, and the visitor sees "Sorry, the guide
  couldn't be sent".

Once the domain is bought, verify it in Resend (Domains → add the DNS records
it gives you) and set `CONTACT_FROM_EMAIL`. Both forms then work for
everyone.

Also: the "occasional follow-up emails" box on the price-guide form is only
reported in the email you receive. Nothing is stored and there's no mailing
list.

---

## 11. Before you publish: checklist

On the **Vercel preview**, on your phone, check:

- [ ] The page you changed looks right, and nothing next to it moved.
- [ ] No sideways scrolling (the page shouldn't wiggle left and right).
- [ ] New photos load, are the right way up, and aren't huge (they should
      appear quickly on mobile data).
- [ ] Texts have no typos and lines break nicely.
- [ ] Only the four colours and three fonts are used.
- [ ] Links go where they should (menu, buttons, footer).
- [ ] If you touched the forms: send a test message.
- [ ] If you changed what data you collect or which services you use: update
      Privacy & Legal and its date.

---

## 12. If something goes wrong

- **The build failed:** Vercel → Deployments → open the failed one → read the
  log. The last lines usually name the file and line, often a missing comma,
  quote or bracket. The live site isn't affected.
- **Something wrong went live:** Vercel → Deployments → find the last good
  production deployment → **⋯ → Instant Rollback** (or "Promote to
  Production"). The site is back in seconds. Then fix the code calmly.
- **Undo a change in the code:** on GitHub, open the merged pull request and
  click **Revert**. That creates a new pull request that undoes it; merge
  it.
- Every past version is kept in git, so nothing is ever really lost.

---

## 13. Still open / to do

**Placeholders still on the live site**

1. **Events and Small Businesses covers**: still cat photos from
   placecats.com (`src/lib/portfolioCategories.ts`). See
   [7.3](#73-portfolio-covers).
2. **Booking photo**: still a cat photo (`PHOTO_SRC` in
   `src/components/Booking/Booking.tsx`). It needs a 2:3 portrait photo.
   Put it in `public/images/` and set `PHOTO_SRC` to its path, for example
   `"/images/booking.jpg"`.
3. **Category page photos**: copies of the hero photos (`REPLACE-ME_private-NN`
   and so on). See [7.2](#72-photos-of-the-category-pages).
4. **Review photos**: initials (`REPLACE-ME_review-01` … `-04`).
5. **Instagram**: hidden until `INSTAGRAM` is set in `src/lib/contacts.ts`.

**Email and domain**

6. **Buy the domain.** Then:
   - connect it in Vercel (Settings → Domains);
   - verify it in Resend and set `CONTACT_FROM_EMAIL` (see
     [section 10](#10-forms-and-email-resend));
   - optionally make the email a clickable link (now plain text in
     `contacts/page.tsx` and the footer).
7. **Set the Resend keys in Vercel** (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`).
   Until then neither form sends anything on the live site.
8. **The price-guide PDF is not attached yet.** The email tells visitors the
   price list is attached, but nothing is. This needs a small code change in
   `src/app/api/price-guide/route.ts` (the sending helper already supports
   attachments). Keep the PDF **out of `public/`**, or anyone could download
   it without filling in the form.
9. **Brevo:** the original plan used Brevo for the price-guide emails, "after
   the domain is bought". Resend now does that job, so decide whether Brevo
   is still needed, for example for a newsletter.

**Texts**

10. **Privacy & Legal:**
    - It still names *Brevo* and has `[OPEN: email provider]` and
      `[OPEN: contact form tool]`. Today both are **Resend**.
    - "4. How long I keep it" has `[OPEN: confirm]` and `[OPEN: X months]`.
    - Update `LAST_UPDATED` when done.

**Design decisions left**

11. **Hero word size:** "confident / natural / unforgettable" was made smaller
    on request (about 19 to 22 px depending on the phone). That is below the
    "never under 24 px" rule for Tangerine. To go back, change `font-size` in
    `.adjective` in `src/components/Hero/Hero.module.css`: it's `1.45em`
    now, and the earlier, bigger size was `1.8em`.
12. **About text:** it's justified with no hyphenation, so on phones a few
    lines have wide gaps between words. The width and size were picked to
    keep this as small as possible. Fixing it fully means either allowing
    hyphenation or aligning left on phones (`.description` in
    `src/components/About/About.module.css`).
13. **Tablet and desktop layout:** not designed yet. Everything works, but it
    hasn't been refined.

---

## 14. Things never to do

- **Never put keys or passwords in the code.** The repository is public. Keys
  go only in Vercel's Environment Variables or in `.env.local`.
- **Never commit fonts that aren't free to redistribute.** The folder
  `public/fonts/` is ignored by git on purpose, so trial and personal-use
  fonts can be tried locally without being published. A font licensed "for
  personal use" (such as the Branch font) or a "DEMO" font (such as Calgary
  DEMO, or Constanley) must not go into this repository: being public counts
  as giving the file away. Don't change that ignore rule.
- **Never copy font files from other websites.** Use fonts you have a licence
  for, self-hosted with `@font-face` and `font-display: swap` (as
  `src/app/fonts.ts` does now).
- **Don't add analytics, embeds (Instagram, Google Maps, YouTube) or tracking
  without updating Privacy & Legal.** Most of them set cookies, which would
  also need a cookie banner. Today the site has none, and needs none.
- **Don't add new colours or fonts** outside the rules in
  [section 9](#9-design-rules), unless you're changing the rules on purpose.
- **Don't commit big original photos** (several MB straight from the camera).
  Export them smaller first ([section 8](#8-preparing-photos)).

---

## 15. Setting up Claude Code with GitHub

Claude Code can work on the site in two ways. Pick one, or use both.

| | **A. In the cloud** (claude.ai/code or the Claude app) | **B. On your computer** |
|---|---|---|
| To install | Nothing | Claude Code, Git, Node.js, GitHub CLI |
| Where it works | On its own copy of the site in Anthropic's cloud | On your computer |
| See the result while it works | No: you see it on the Vercel preview after it pushes | Yes, at <http://localhost:3000> |
| Good for | Text, price and photo changes, even from your phone | Bigger changes, and design tweaks you want to watch live |

Both need a paid Claude plan (Pro or Max) and a GitHub account with write
access to the repository.

### 15.1 The GitHub side (once, for both ways)

1. **A GitHub account.** Create one at <https://github.com/signup> if you
   don't have one.
2. **Write access.** The owner of the `jjuliettt` account adds you on GitHub:
   repository → **Settings → Collaborators → Add people**. Accept the
   invitation that arrives by email. Without it, Claude can read the code
   (the repository is public), but every push is refused.
3. **Keep your email private (recommended).** Every commit records an email
   address, and this repository is public. In GitHub → **Settings → Emails**,
   tick **"Keep my email addresses private"**. GitHub then shows you a
   private address ending in `@users.noreply.github.com`. Use that one in
   step B3.
4. **Protect `main` (recommended, done by the account owner).** This makes
   sure nothing reaches the live site without a pull request, whoever (or
   whatever) pushes. Repository → **Settings → Rules → Rulesets → New ruleset
   → New branch ruleset**:
   - name it;
   - set **Enforcement status** to **Active**;
   - under **Target branches** choose **Add target → Include default branch**;
   - tick **Require a pull request before merging**;
   - save.

   The owner can add themselves to the bypass list to keep pushing directly.

### 15.2 A: Claude Code in the cloud (nothing to install)

1. Go to <https://claude.ai/code> and sign in with your Claude account.
2. **Connect GitHub.** When it asks, follow the prompt to GitHub's page and
   click **Authorize**. You can see or remove this connection later at
   <https://claude.ai/customize/connectors>.
3. **Claude GitHub App.** If it offers to install it, you can click **Skip**.
   The repository is public, so Claude can already open it, and its pushes go
   out with your own GitHub access from step 15.1. (The app is only needed
   for private repositories and for "Auto-fix". It can only be installed by
   the owner of the `jjuliettt` account.)
4. **Environment.** On Pro and Max, an environment called **Default** with
   **Trusted** network access is created for you. Leave it as it is: it can
   install the site's packages (npm). **Don't put the Resend key or any other
   password in the environment's variables.** Anyone using the environment
   can read them, and Claude doesn't need them to edit the site.
5. **Start a session:**
   - In the repository selector under the message box, choose
     `jjuliettt/emmestudio` (type the name if it isn't listed).
   - Leave the branch on `main`.
   - Pick a mode: **Plan** for bigger changes (Claude first explains what it
     will do and waits for your OK), or **Accept edits** for small ones.
6. **Describe the change** (examples in 15.4). You can attach photos to the
   message, and Claude can put them in the right folder with the right name,
   as it did with your About photo.
7. **Review:**
   - When Claude has pushed its branch, select the `+N −N` indicator to see
     every change, and comment on any line.
   - Then select **Create PR**.
   - Vercel builds a preview for the pull request. Open it on your phone.
   - If it's right, merge the pull request on GitHub.
8. **Limits.** The cloud copy can't open `vercel.app` addresses or
   placecats.com, so Claude can't look at the live site or the preview
   itself. You check those. It can take screenshots of its own copy if you
   ask.

The **Code** tab of the Claude app on your phone opens the same sessions.

### 15.3 B: Claude Code on your computer

**B1. Install the tools (once).**

| Tool | Mac | Windows |
|---|---|---|
| Git | Type `git --version` in Terminal; if it's missing, macOS offers to install it | Install [Git for Windows](https://git-scm.com/downloads/win) (Claude Code needs it too) |
| Node.js | The LTS version from <https://nodejs.org> (20.9 or newer) | Same |
| GitHub CLI | `brew install gh`, or the installer from <https://cli.github.com> | `winget install --id GitHub.cli`, or the installer from <https://cli.github.com> |
| Claude Code | `curl -fsSL https://claude.ai/install.sh \| bash` | In PowerShell: `irm https://claude.ai/install.ps1 \| iex` |

Open a new terminal window afterwards and check that `claude --version`
prints a version number. Instead of the terminal, you can also use the
Claude desktop app (Code tab, with **Local** selected) or the Claude Code
extension for VS Code.

**B2. Sign in to GitHub on the computer (once).** Claude uses your
computer's Git, so Git needs your GitHub login:

```bash
gh auth login
```

Answer:
- **GitHub.com**;
- **HTTPS**;
- **Yes** to "Authenticate Git with your GitHub credentials?";
- **Login with a web browser**, and confirm in the browser.

`gh auth status` should then say you're logged in.

**B3. Tell Git who you are (once).** Use the private address from step 15.1:

```bash
git config --global user.name "Elisa Massetti"
git config --global user.email "your-private-address@users.noreply.github.com"
```

**B4. Get the site (once).**

```bash
gh repo clone jjuliettt/emmestudio
cd emmestudio
npm install
```

**B5. Start Claude Code** inside that folder:

```bash
claude
```

The first time, it opens your browser to sign in with your Claude account.

**Using it:**
- Claude asks before running commands or changing files. `Shift+Tab`
  switches modes, for example to plan first or to accept edits without
  asking.
- To watch the site while it works, ask it to start the site
  (`npm run dev`), then open <http://localhost:3000>. In Chrome, use
  Inspect → the phone icon to see it at phone width.
- **Start every new task from the latest version**: "switch to main, pull
  the latest changes, and create a new branch for …". Claude can then push
  the branch and open the pull request itself (it uses the GitHub CLI for
  that). You check the Vercel preview and merge.

### 15.4 Good requests and habits

Examples:

- *"Replace the Events cover with the photo I attached, as a finished cover
  like Private. Use a new branch, run the build, push and open a pull
  request."*
- *"Change the Classic package to 2 hours and 25 photos."*
- *"Add these 8 photos to the Small Businesses page, in this order."*
- *"In Privacy & Legal, replace Brevo with Resend and fill in the [OPEN]
  parts with: …"*

Habits:

- One change (or one group of related changes) per pull request.
- Always look at the Vercel preview on your phone before merging.
- Don't paste passwords or API keys into the chat.
- If Claude proposes pushing to `main`, a new colour or a new font, that's
  against the rules in `CLAUDE.md` and this file. Say no, unless you're
  changing the rules on purpose.

### 15.5 If GitHub access doesn't work

| What you see | What to do |
|---|---|
| A push is refused ("permission denied", 403) | You're not a collaborator yet, or the invitation hasn't been accepted (15.1, step 2) |
| Cloud: the repository isn't in the list | Type `jjuliettt/emmestudio` in the selector. If it still isn't there, disconnect and reconnect GitHub at <https://claude.ai/customize/connectors> |
| Computer: Git asks for a password or says "authentication failed" | Run `gh auth login` again (15.3, B2) |
| "Push rejected" to `main` | That's the protection from 15.1, step 4 doing its job: push to a branch and open a pull request |

---

## 16. Small glossary

| Word | Meaning |
|---|---|
| Repository (repo) | The folder with all the site's files and their full history, on GitHub |
| Commit | Saving a set of changes, with a short message |
| Branch | A parallel copy where you can make changes without touching the live site |
| `main` | The branch that is the live site |
| Push | Sending your commits from your computer to GitHub |
| Pull request (PR) | A request to merge a branch into `main`. It's where you see the preview and click "Merge". |
| Merge | Bringing the changes of a branch into `main` |
| Deploy | Vercel building the site and putting it online |
| Preview | A private test copy of the site that Vercel makes for every branch |
| Build | Turning the code into the finished site. `npm run build` does it on your computer. |
| Environment variable | A secret setting (like an API key) kept outside the code |
| Component | A building block of the page (Header, Hero, Booking …), each in its own folder |
