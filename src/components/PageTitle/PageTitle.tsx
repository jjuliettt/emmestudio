import styles from "./PageTitle.module.css";

// Titolo delle pagine interne (PORTFOLIO, PRICES, LET'S TALK,
// PRIVACY & LEGAL): Spectral grassetto maiuscolo, spaziatura larga, stessa
// posizione
export default function PageTitle({ children }: { children: string }) {
  return <h1 className={styles.title}>{children}</h1>;
}
