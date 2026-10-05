import Link from "next/link";
import { Bodoni_Moda } from "next/font/google";
import styles from "./Portfolio.module.css";

// Serif ad alto contrasto (testata tipo Vogue), usato solo in questa sezione
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

type Category = {
  title: string;
  href: string;
  // foto verticale 2:3
  src: string;
  alt: string;
  // Soggetto scontornato: PNG trasparente con lo stesso taglio di src.
  // Va sopra la testata, così il titolo resta dietro al soggetto.
  cutout?: string;
  // righe di copertina, sul lato
  date: string;
  place: string;
  name: string;
};

// Placeholder: foto di gattini e dati fittizi, da sostituire con le
// copertine reali (foto + soggetto scontornato) e i loro dati.
const CATEGORIES: Category[] = [
  {
    title: "Portraits",
    href: "/portfolio/portraits",
    src: "https://placecats.com/neo/800/1200",
    alt: "Copertina della categoria Portraits",
    date: "May 2026",
    place: "Brussels",
    name: "Marta L.",
  },
  {
    title: "Events",
    href: "/portfolio/events",
    src: "https://placecats.com/poppy/800/1200",
    alt: "Copertina della categoria Events",
    date: "June 2026",
    place: "Ghent",
    name: "Sofia & Thomas",
  },
  {
    title: "Small Businesses",
    href: "/portfolio/small-businesses",
    src: "https://placecats.com/louie/800/1200",
    alt: "Copertina della categoria Small Businesses",
    date: "2026",
    place: "Antwerp",
    name: "Atelier Nord",
  },
];

export default function Portfolio() {
  return (
    <section className={`${styles.portfolio} ${bodoni.className}`}>
      <div className={styles.grid}>
        {CATEGORIES.map((category) => {
          const words = category.title.split(" ");
          // la parola più lunga riempie la larghezza della copertina
          const chars = Math.max(...words.map((word) => word.length));

          return (
            <Link
              key={category.href}
              href={category.href}
              className={styles.cover}
            >
              <img
                src={category.src}
                alt={category.alt}
                className={styles.photo}
              />

              <span
                className={styles.masthead}
                style={{ "--chars": chars } as React.CSSProperties}
              >
                {words.map((word) => (
                  <span key={word} className={styles.mastheadLine}>
                    {word}
                  </span>
                ))}
              </span>

              {category.cutout && (
                <img src={category.cutout} alt="" className={styles.cutout} />
              )}

              <span className={styles.coverLines}>
                <span className={styles.coverKicker}>{category.date}</span>
                <span className={styles.coverName}>{category.name}</span>
                <span className={styles.coverKicker}>{category.place}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
