import Link from "next/link";
import { EMAIL, ENTERPRISE_NO, INSTAGRAM } from "@/lib/contacts";
import styles from "./Footer.module.css";

function Dot() {
  return (
    <span className={styles.dot} aria-hidden="true">
      ·
    </span>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.line}>
        © {new Date().getFullYear()} Elisa Massetti Photo <Dot /> Enterprise
        no. {ENTERPRISE_NO}
      </p>

      <p className={styles.line}>
        <Link href="/privacy-policy" className={styles.link}>
          Privacy
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
    </footer>
  );
}
