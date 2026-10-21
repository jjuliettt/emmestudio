import Link from "next/link";
import type { PortfolioCategory } from "@/lib/portfolioCategories";
import styles from "./CategoryNav.module.css";

type Props = {
  previous: PortfolioCategory;
  next: PortfolioCategory;
};

// Frecce disegnate a mano (asta un po' ondulata, punta aperta), una per
// verso: non sono speculari, come se fossero tracciate due volte
function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 120 24" className={styles.arrow} aria-hidden="true">
      {direction === "right" ? (
        <>
          <path d="M4 15.6c2-2.4 7.6-3.4 19.8-3.6 28-.5 60.4.5 91.4.2" />
          <path d="M101.4 4.6c4.6 3 9.2 5.5 13.8 7.6-4.9 2.3-9.6 5.1-13 8.1" />
        </>
      ) : (
        <>
          <path d="M116 15.1c-2.2-2.2-8-3.1-20.2-3.2-28.2-.3-59.6.6-90.8.4" />
          <path d="M18.4 4.3c-4.8 3.1-9.4 5.7-13.6 8 5 2.2 9.8 5.2 13 8.3" />
        </>
      )}
    </svg>
  );
}

// In fondo alla pagina di una categoria: a sinistra la precedente, a destra
// la successiva, in giro (Private → Small Businesses → Companies & Events →
// Private). Sotto ogni freccia il nome della pagina a cui porta.
export default function CategoryNav({ previous, next }: Props) {
  return (
    <nav aria-label="Other categories" className={styles.nav}>
      <Link
        href={previous.href}
        className={styles.item}
        data-side="left"
        aria-label={`Previous: ${previous.title}`}
      >
        <Arrow direction="left" />
        <span className={`u-link ${styles.name}`}>{previous.title}</span>
      </Link>
      <Link
        href={next.href}
        className={styles.item}
        data-side="right"
        aria-label={`Next: ${next.title}`}
      >
        <Arrow direction="right" />
        <span className={`u-link ${styles.name}`}>{next.title}</span>
      </Link>
    </nav>
  );
}
