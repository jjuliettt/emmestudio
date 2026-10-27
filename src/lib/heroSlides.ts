import { categoryPhotos } from "@/lib/categoryPhotos";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolioCategories";

export type Slide = { src: string; alt: string };

// Le foto dello slideshow in home: tutte le orizzontali delle tre categorie
// (le stesse delle pagine del portfolio, quindi cambiano da sole quando
// cambiano le foto). Sono mescolate perché la categoria cambi il più spesso
// possibile: in ogni categoria la foto k di n prende il posto (k + 0.5) / n,
// così ogni categoria è sparsa in modo uniforme su tutto il giro.
export function heroSlides(): Slide[] {
  const groups = PORTFOLIO_CATEGORIES.map((category) => {
    const slug = category.href.split("/").pop()!;
    return (
      categoryPhotos(slug)
        // orizzontale come in Gallery: più larga di 1.1 volte l'altezza
        .filter((photo) => photo.width / photo.height > 1.1)
        .map((photo) => ({ src: photo.src, alt: `${category.title}: photo by Elisa Massetti` }))
    );
  });
  return groups
    .flatMap((slides, group) =>
      slides.map((slide, k) => ({ slide, at: (k + 0.5) / slides.length, group }))
    )
    .sort((a, b) => a.at - b.at || a.group - b.group)
    .map(({ slide }) => slide);
}
