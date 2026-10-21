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

// "VIEW" sotto il titolo: compare passando sopra (o toccando) la copertina
function View() {
  return <span className={styles.view}>View</span>;
}

function Lettering({ category }: Props) {
  const { title, lettering } = category;

  // copertina già finita: niente scritte da aggiungere
  if (lettering.kind === "image") return null;

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
        <View />
      </span>
    );
  }

  // il nome in grassetto su due righe ("SMALL" / "BUSINESSES"), della
  // stessa misura
  return (
    <span className={styles.monogram}>
      <span className={styles.monogramTop}>
        <span className={styles.monogramFlank}>{lettering.flank[0]}</span>
        <span className={styles.monogramMark}>{lettering.mark}</span>
        <span className={styles.monogramFlank}>{lettering.flank[1]}</span>
      </span>
      {title.split(" ").map((word) => (
        <span key={word} className={`${styles.title} ${styles.bold}`}>
          {word}
        </span>
      ))}
      <View />
    </span>
  );
}

// Una copertina: foto velata, cornice sottile rientrata e la scritta al
// centro. Condivisa dalla home e dalla pagina /portfolio. Al passaggio (o al
// tocco) la foto si ingrandisce piano, la cornice rientra e compare "VIEW".
// Porta alla pagina della categoria.
export default function Cover({ category }: Props) {
  // copertina già finita: solo l'immagine, alla stessa larghezza delle altre
  if (category.lettering.kind === "image") {
    return (
      <Link
        href={category.href}
        className={styles.cover}
        data-shape="image"
        aria-label={category.title}
      >
        <img src={category.src} alt={category.alt} className={styles.photo} />
        {/* sotto le parole piccole della grafica, nel loro colore */}
        <span
          className={styles.imageView}
          data-ink={category.lettering.viewInk}
          aria-hidden="true"
        >
          <View />
        </span>
      </Link>
    );
  }

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
