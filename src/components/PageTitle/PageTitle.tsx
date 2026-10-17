import styles from "./PageTitle.module.css";

// Titolo delle pagine interne (PORTFOLIO, PRICES 2026, LET'S TALK,
// PRIVACY & LEGAL): Spectral maiuscolo, spaziatura larga, stessa posizione
export default function PageTitle({ children }: { children: string }) {
  return <h1 className={styles.title}>{children}</h1>;
}
