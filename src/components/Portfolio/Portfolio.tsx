import Link from "next/link";
import CoverList from "./CoverList";
import styles from "./Portfolio.module.css";

// La riga scritta a mano, le tre copertine e il link al portfolio
export default function Portfolio() {
  return (
    <section className={styles.portfolio}>
      <CoverList />

      <Link href="/portfolio" className={styles.viewAll}>
        View my portfolio
      </Link>
    </section>
  );
}
