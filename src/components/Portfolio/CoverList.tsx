import HandTitle from "@/components/HandTitle/HandTitle";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolioCategories";
import Cover from "./Cover";
import styles from "./CoverList.module.css";

// Il titolo scritto a mano e le tre copertine una sotto l'altra: le stesse
// in home e nella pagina /portfolio
export default function CoverList() {
  return (
    <div className={styles.wrap}>
      {/* la seconda riga entra nell'angolo in alto a sinistra della prima
          copertina */}
      <HandTitle
        slot="favorite-frames"
        lines={["favorite", "frames"]}
        className={styles.intro}
      />

      <div className={styles.list}>
        {PORTFOLIO_CATEGORIES.map((category) => (
          <Cover key={category.href} category={category} />
        ))}
      </div>
    </div>
  );
}
