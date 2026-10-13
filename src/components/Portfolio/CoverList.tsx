import { PORTFOLIO_CATEGORIES } from "@/lib/portfolioCategories";
import Cover from "./Cover";
import styles from "./CoverList.module.css";

// La riga scritta a mano e le tre copertine una sotto l'altra: le stesse
// in home e nella pagina /portfolio
export default function CoverList() {
  return (
    <div className={styles.wrap}>
      {/* scritta a mano, larga e inclinata: la seconda riga entra
          nell'angolo in alto a sinistra della prima copertina */}
      <h2 className={styles.intro}>
        <span className={styles.introLine}>favorite</span>
        <span className={`${styles.introLine} ${styles.introIndent}`}>
          frames
        </span>
      </h2>

      <div className={styles.list}>
        {PORTFOLIO_CATEGORIES.map((category) => (
          <Cover key={category.href} category={category} />
        ))}
      </div>
    </div>
  );
}
