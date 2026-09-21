import Link from "next/link";
import styles from "./Footer.module.css";

// Dati fiscali e contatti: placeholder, da sostituire con quelli reali.
const VAT = "P. IVA 00000000000";
const EMAIL = "hello@elisamassetti.com";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.copy}>
          © {new Date().getFullYear()} Elisa Massetti
        </span>

        <span className={styles.vat}>{VAT}</span>

        <nav className={styles.links}>
          <Link href="/privacy-policy" className={styles.link}>
            Privacy Policy
          </Link>
          <Link href="/cookie-policy" className={styles.link}>
            Cookie Policy
          </Link>
          {/* Aprira' il pannello del banner cookie, una volta integrato */}
          <button type="button" className={styles.link}>
            Preferenze tracciamento
          </button>
          <a href={`mailto:${EMAIL}`} className={styles.link}>
            {EMAIL}
          </a>
        </nav>

        <span className={styles.copy}>
          © {new Date().getFullYear()} Elisa Massetti
        </span>
      </div>
    </footer>
  );
}
