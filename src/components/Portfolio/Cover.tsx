import Link from "next/link";
import type { PortfolioCategory } from "@/lib/portfolioCategories";
import styles from "./Cover.module.css";

type Props = {
  category: PortfolioCategory;
};

// Stellina a quattro punte tra le parole piccole
function Star() {
  return (
    <svg className={styles.star} viewBox="0 0 10 10" aria-hidden="true">
      <path d="M5 0Q5.6 4.4 10 5Q5.6 5.6 5 10Q4.4 5.6 0 5Q4.4 4.4 5 0Z" />
    </svg>
  );
}

// "Events" -> ["EV", "EN", "TS"]
function pairs(word: string) {
  return word.match(/.{1,2}/g) ?? [word];
}

function Lettering({ category }: Props) {
  const { title, lettering } = category;

  if (lettering.kind === "classic") {
    return (
      <span className={styles.classic}>
        <span className={styles.classicName}>{title}</span>
        <span className={styles.classicSub}>{lettering.subline}</span>
        <span className={styles.classicTiny}>
          {lettering.tiny[0]} <Star /> {lettering.tiny[1]}
        </span>
      </span>
    );
  }

  if (lettering.kind === "stacked") {
    const rows = pairs(title);
    // etichetta a sinistra della prima riga, a destra della seconda, a
    // sinistra della terza
    const side = ["left", "right", "left"] as const;
    return (
      <span className={styles.stacked}>
        <span className={styles.stackedGrid}>
          {rows.map((row, i) => (
            <span key={row} className={styles.stackedRow}>
              <span className={styles.stackedLabel} data-side="left">
                {side[i] === "left" &&
                  lettering.labels[i]?.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
              </span>
              <span className={styles.stackedLetters}>{row}</span>
              <span className={styles.stackedLabel} data-side="right">
                {side[i] === "right" &&
                  lettering.labels[i]?.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
              </span>
            </span>
          ))}
        </span>
        <span className={styles.stackedScript}>{lettering.script}</span>
      </span>
    );
  }

  const [first, ...rest] = title.split(" ");
  return (
    <span className={styles.monogram}>
      <span className={styles.monogramTop}>
        <span className={styles.monogramFlank}>{lettering.flank[0]}</span>
        <span className={styles.monogramMark}>{lettering.mark}</span>
        <span className={styles.monogramFlank}>{lettering.flank[1]}</span>
      </span>
      <span className={styles.monogramName}>{first}</span>
      <span className={styles.monogramSub}>{rest.join(" ")}</span>
    </span>
  );
}

// Una copertina: foto velata, cornice sottile rientrata e la scritta al
// centro. Condivisa dalla home e dalla pagina /portfolio.
export default function Cover({ category }: Props) {
  return (
    <Link
      href={category.href}
      className={styles.cover}
      aria-label={category.title}
    >
      <img src={category.src} alt={category.alt} className={styles.photo} />
      <span className={styles.frame} aria-hidden="true" />
      <span className={styles.text} aria-hidden="true">
        <Lettering category={category} />
      </span>
    </Link>
  );
}
