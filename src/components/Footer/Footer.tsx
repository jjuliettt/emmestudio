import Link from "next/link";
import { EMAIL, ENTERPRISE_NO } from "@/lib/contacts";
import styles from "./Footer.module.css";

function Dot({ className }: { className?: string }) {
  return (
    <span className={`${styles.dot} ${className ?? ""}`} aria-hidden="true">
      ·
    </span>
  );
}

// Due righe al massimo. Niente link ai cookie: il sito non ne usa.
// L'email è un link mailto, come il resto del footer senza sottolineatura.
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.rows}>
        <p className={styles.line}>
          © {new Date().getFullYear()} Elisa Massetti<Dot />Enterprise number{" "}
          <span className={styles.nowrap}>{ENTERPRISE_NO}</span>
        </p>

        {/* Punto di separazione tra le due righe, solo quando stanno su una
            riga sola da desktop */}
        <Dot className={styles.rowsDot} />

        <p className={styles.line}>
          <Link href="/privacy-policy" className={styles.link}>
            Privacy &amp; Legal
          </Link>
          <Dot />
          <a href={`mailto:${EMAIL}`} className={styles.link}>
            {EMAIL}
          </a>
        </p>
      </div>
    </footer>
  );
}
