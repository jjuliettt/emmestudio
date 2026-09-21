import Link from "next/link";
import { Bodoni_Moda } from "next/font/google";
import styles from "./Portfolio.module.css";

// Serif ad alto contrasto, usato solo in questa sezione
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

type Category = {
  title: string;
  href: string;
  src: string;
  alt: string;
};

// Placeholder: foto di gattini, da sostituire con le copertine reali.
const CATEGORIES: Category[] = [
  {
    title: "Portraits",
    href: "/portfolio/portraits",
    src: "https://placecats.com/neo/800/1200",
    alt: "Copertina della categoria Portraits",
  },
  {
    title: "Events",
    href: "/portfolio/events",
    src: "https://placecats.com/poppy/800/1200",
    alt: "Copertina della categoria Events",
  },
  {
    title: "Small Businesses",
    href: "/portfolio/small-businesses",
    src: "https://placecats.com/louie/800/1200",
    alt: "Copertina della categoria Small Businesses",
  },
];

const YEAR = "2026";
const BYLINE = "Elisa Massetti";

export default function Portfolio() {
  return (
    <section className={`${styles.portfolio} ${bodoni.className}`}>
      <div className={styles.list}>
        {CATEGORIES.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className={styles.card}
          >
            <img
              src={category.src}
              alt={category.alt}
              className={styles.cover}
            />

            {/* Scrim per la leggibilita' del titolo sulla foto */}
            <span className={styles.scrim} aria-hidden="true" />

            <span className={styles.masthead}>
              <span className={styles.title}>{category.title}</span>
              <span className={styles.meta}>
                <span>{YEAR}</span>
                <span className={styles.metaDivider} aria-hidden="true" />
                <span>{BYLINE}</span>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
