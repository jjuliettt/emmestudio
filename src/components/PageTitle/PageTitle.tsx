import type { ReactNode } from "react";
import styles from "./PageTitle.module.css";

// Titolo delle pagine interne (PORTFOLIO, PRICES, LET'S TALK,
// PRIVACY & LEGAL, categorie): Spectral grassetto maiuscolo, spaziatura
// larga, stessa posizione
export default function PageTitle({ children }: { children: string }) {
  return <h1 className={styles.title}>{children}</h1>;
}

// La frase sotto il titolo (Portfolio, Prices, Contacts): stesso stile e
// stessa distanza dal titolo dappertutto. Una riga per elemento.
export function PageLead({ lines }: { lines: ReactNode[] }) {
  return (
    <div className={styles.lead}>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}
