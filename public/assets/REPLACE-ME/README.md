# REPLACE-ME: files to swap

Everything in this folder can be replaced. Put the new file here with exactly
the same name, then push. No code needs to change.

| File | What it is | Used on |
|---|---|---|
| `REPLACE-ME_signature.png` | Signature over the greeting photo. PNG with a transparent background, ink in #3B2A22. | Home |
| `REPLACE-ME_photo-elisa.jpg` | Greeting photo, 3:2 landscape (now the real photo; replace it with a file of the same name to change it). While this file is missing, the placeholder photo is shown. | Home |
| `REPLACE-ME_hw-selected-work.png` | Handwritten "Selected Work" above the portfolio cards. Transparent PNG, ink in #3B2A22. | Home |
| `REPLACE-ME_review-01.jpg` … `-04.jpg` | Photo (or logo) of each review, in order: Hania, Paulina, Tawake, Prof. Tacik. Square works best; it is shown as a circle. | Home |
| `REPLACE-ME_private-01.jpg`, `-02.jpg`, … | Photos of the Private People page, in number order. | /portfolio/private |
| `REPLACE-ME_events-01.jpg`, `-02.jpg`, … | Photos of the Companies & Events page, in number order. | /portfolio/events |
| `REPLACE-ME_small-businesses-01.jpg`, `-02.jpg`, … | Photos of the Small Businesses page, in number order. | /portfolio/small-businesses |

Category photos: add as many as you like (`-06.jpg`, `-07.jpg`, …) or delete
some; the page shows whatever is here, in number order, in their own
proportions. They can also be `.png` or `.webp`. The layout is chosen from
their shapes: two landscape photos in a row sit side by side, two portrait
photos are staggered, the others are full width or set to one side.

The big slideshow at the top of Home uses every landscape photo of the
three category pages (wider than 1.1 × their height), mixed so the
category changes as often as possible. Adding or removing a landscape
category photo changes the slideshow too; there are no separate slideshow
files.

Prepare photos before adding them: about 1600 px on the long side, sRGB,
no location or camera data (all real category photos here were made this
way from Elisa's full-size exports, October 2026).

Photo details (the "Info" button in the full-screen view): add a text file
with the same name as the photo, ending in `.txt`, for example
`REPLACE-ME_events-01.txt`. Write one detail per line as `Name: value`; any
line without a name is shown as a short text below the details:

```
Type: Academic conference
Setting: NOMOS Centre, Krakow, Poland
Date: May 2025
Two days of talks and workshops with researchers from all over Europe.
```

A photo without a `.txt` file still has the Info button, which then only
shows its category. When you rename or renumber a photo, rename its `.txt`
file too. Everything here is public, so
only write what you're happy for visitors to read.

The handwriting slot can also be `.svg` or `.webp` with the same name. If it
is missing, its text is shown instead, in the `--font-handwriting` font (for
now Tangerine).
