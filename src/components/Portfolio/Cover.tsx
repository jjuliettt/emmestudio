import Link from "next/link";
import type { PortfolioCategory } from "@/lib/portfolioCategories";
import styles from "./Portfolio.module.css";

type Props = {
  category: PortfolioCategory;
  year: string;
  byline: string;
  // per le copie nascoste del carosello in loop (vedi Portfolio.tsx)
  hidden?: boolean;
};

// Una copertina: foto, testata, soggetto scontornato (se c'è) e le due
// righe in basso. Condivisa dal carosello in home e dalla pagina /portfolio.
export default function Cover({ category, year, byline, hidden }: Props) {
  const words = category.title.split(" ");
  // la parola più lunga riempie la larghezza della copertina
  const chars = Math.max(...words.map((word) => word.length));

  return (
    <Link
      href={category.href}
      className={styles.cover}
      data-card
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <img src={category.src} alt={category.alt} className={styles.photo} />

      <span
        className={styles.masthead}
        style={{ "--chars": chars } as React.CSSProperties}
      >
        {words.map((word) => (
          <span key={word} className={styles.mastheadLine}>
            {word}
          </span>
        ))}
      </span>

      {category.cutout && (
        <img src={category.cutout} alt="" className={styles.cutout} />
      )}

      <span className={styles.coverLines}>
        <span className={styles.coverKicker}>{year}</span>
        <span className={styles.coverName}>{byline}</span>
      </span>
    </Link>
  );
}
