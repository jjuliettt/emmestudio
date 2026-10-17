import Link from "next/link";
import type { PortfolioCategory } from "@/lib/portfolioCategories";
import styles from "./Cover.module.css";

type Props = {
  category: PortfolioCategory;
};

// "Events" -> ["EV", "EN", "TS"]
function pairs(word: string) {
  return word.match(/.{1,2}/g) ?? [word];
}

// Sigillo: le parole girano lungo un cerchio (testo su tracciato SVG),
// tra due cerchi sottili; textLength le distribuisce su tutto il giro
function Seal({ words }: { words: string[] }) {
  const text = words.map((word) => `${word.toUpperCase()} · `).join("");
  return (
    <svg className={styles.sealRing} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <path id="seal-path" d="M50 13 a37 37 0 1 1 -0.01 0" />
      </defs>
      <circle cx="50" cy="50" r="44" className={styles.sealLine} />
      <circle cx="50" cy="50" r="34" className={styles.sealLine} />
      <text className={styles.sealText}>
        <textPath href="#seal-path" textLength="232" lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

function Lettering({ category }: Props) {
  const { title, lettering } = category;

  if (lettering.kind === "seal") {
    return (
      <span className={styles.seal}>
        <Seal words={lettering.ring} />
        <span className={styles.sealCenter}>
          <span className={styles.sealScript}>{lettering.script}</span>
          <span className={styles.title}>{title}</span>
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

  // il nome su due righe ("SMALL" / "BUSINESSES"), della stessa misura
  return (
    <span className={styles.monogram}>
      <span className={styles.monogramTop}>
        <span className={styles.monogramFlank}>{lettering.flank[0]}</span>
        <span className={styles.monogramMark}>{lettering.mark}</span>
        <span className={styles.monogramFlank}>{lettering.flank[1]}</span>
      </span>
      {title.split(" ").map((word) => (
        <span key={word} className={styles.title}>
          {word}
        </span>
      ))}
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
