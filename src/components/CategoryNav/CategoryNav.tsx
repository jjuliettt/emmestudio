import Link from "next/link";
import HandArrow from "@/components/HandArrow/HandArrow";
import type { PortfolioCategory } from "@/lib/portfolioCategories";
import styles from "./CategoryNav.module.css";

type Props = {
  previous: PortfolioCategory;
  next: PortfolioCategory;
};

// il nome sotto la freccia su due righe: "Small / Businesses", "Companies /
// & Events" (la "&" va con la parola dopo)
function lines(title: string) {
  const words = title.split(" ");
  const split = words.includes("&") ? words.indexOf("&") : 1;
  return [words.slice(0, split).join(" "), words.slice(split).join(" ")].filter(Boolean);
}

function Name({ title }: { title: string }) {
  return (
    <span className={styles.name}>
      {lines(title).map((line) => (
        <span key={line} className={`u-link ${styles.word}`}>
          {line}
        </span>
      ))}
    </span>
  );
}

// In fondo alla pagina di una categoria: a sinistra la precedente, a destra
// la successiva, in giro (Private People → Small Businesses → Companies &
// Events → Private People), con le frecce del pulsante per tornare su. Sotto,
// al centro, il ritorno alla home in un piccolo riquadro espresso.
export default function CategoryNav({ previous, next }: Props) {
  return (
    <nav aria-label="Other pages" className={styles.nav}>
      <Link
        href={previous.href}
        className={styles.item}
        data-side="left"
        aria-label={`Previous: ${previous.title}`}
      >
        <span className={styles.circle}>
          <HandArrow direction="left" className={styles.arrow} />
        </span>
        <Name title={previous.title} />
      </Link>

      <Link
        href={next.href}
        className={styles.item}
        data-side="right"
        aria-label={`Next: ${next.title}`}
      >
        <span className={styles.circle}>
          <HandArrow direction="right" className={styles.arrow} />
        </span>
        <Name title={next.title} />
      </Link>

      <Link href="/" className={`u-link ${styles.home}`}>
        Back to home
      </Link>
    </nav>
  );
}
