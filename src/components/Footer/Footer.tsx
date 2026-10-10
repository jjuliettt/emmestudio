import Link from "next/link";
import { EMAIL, ENTERPRISE_NO, INSTAGRAM } from "@/lib/contacts";
import styles from "./Footer.module.css";

function Dot({ className }: { className?: string }) {
  return (
    <span className={`${styles.dot} ${className ?? ""}`} aria-hidden="true">
      ·
    </span>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.rows}>
        <p className={styles.line}>
          © {new Date().getFullYear()} Elisa Massetti Photo <Dot /> Enterprise
          no. {ENTERPRISE_NO}
        </p>

        {/* Punto di separazione tra le due righe, solo quando stanno su una
            riga sola da desktop */}
        <Dot className={styles.rowsDot} />

        <p className={styles.line}>
          <Link href="/privacy-policy" className={styles.link}>
            Privacy Policy &amp; Legal Notice
          </Link>
          <Dot />
          {/* Aprirà il pannello delle preferenze cookie, una volta integrato */}
          <button type="button" className={styles.link}>
            Cookies
          </button>
          <Dot />
          <a href={`mailto:${EMAIL}`} className={styles.link}>
            {EMAIL}
          </a>
          <Dot />
          <a href={INSTAGRAM} className={styles.link}>
            Instagram
          </a>
        </p>
      </div>
    </footer>
  );
}
