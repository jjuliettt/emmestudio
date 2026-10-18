import HandTitle from "@/components/HandTitle/HandTitle";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolioCategories";
import Cover from "./Cover";
import styles from "./CoverList.module.css";

type Props = {
  // "selected work" scritto a mano sopra le copertine (solo in home)
  title?: boolean;
};

// Le tre copertine una sotto l'altra: le stesse in home e nella pagina
// /portfolio
export default function CoverList({ title = false }: Props) {
  return (
    <div className={styles.wrap}>
      {/* entra un po' nell'angolo in alto a sinistra della prima copertina */}
      {title && (
        <HandTitle
          slot="selected-work"
          lines={["selected", "work"]}
          className={styles.intro}
        />
      )}

      <div className={styles.list}>
        {PORTFOLIO_CATEGORIES.map((category) => (
          <Cover key={category.href} category={category} />
        ))}
      </div>
    </div>
  );
}
