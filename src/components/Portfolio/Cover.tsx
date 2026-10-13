import Link from "next/link";
import type { PortfolioCategory } from "@/lib/portfolioCategories";
import styles from "./Cover.module.css";

// Riga piccola sotto il nome della categoria
const BYLINE = "2026 — Elisa Massetti";

type Props = {
  category: PortfolioCategory;
};

// Una copertina: foto velata, cornice sottile rientrata e il nome della
// categoria al centro. Condivisa dalla home e dalla pagina /portfolio.
export default function Cover({ category }: Props) {
  return (
    <Link href={category.href} className={styles.cover}>
      <img src={category.src} alt={category.alt} className={styles.photo} />

      <span className={styles.frame} aria-hidden="true" />

      <span className={styles.text}>
        {/* una parola per riga: "Small Businesses" va su due righe */}
        <span className={styles.name}>
          {category.title.split(" ").map((word) => (
            <span key={word} className={styles.nameLine}>
              {word}
            </span>
          ))}
        </span>
        <span className={styles.byline}>{BYLINE}</span>
      </span>
    </Link>
  );
}
