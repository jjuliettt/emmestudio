import Link from "next/link";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolioCategories";
import Cover from "./Cover";
import styles from "./Portfolio.module.css";

// Le tre copertine una sotto l'altra, con la riga scritta a mano sopra
export default function Portfolio() {
  return (
    <section className={styles.portfolio}>
      {/* le code delle lettere toccano il bordo della prima foto */}
      <h2 className={styles.intro}>caught, not posed</h2>

      <div className={styles.list}>
        {PORTFOLIO_CATEGORIES.map((category) => (
          <Cover key={category.href} category={category} />
        ))}
      </div>

      <Link href="/portfolio" className={styles.viewAll}>
        View my portfolio
      </Link>
    </section>
  );
}
