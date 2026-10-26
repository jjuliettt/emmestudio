import Link from "next/link";
import styles from "./ClosingLinks.module.css";

type Props = {
  // i link, uno sotto l'altro, nell'ordine
  links: { href: string; label: string }[];
};

// In fondo alle pagine senza la foto di "Want to work together" (Contacts,
// Prices): tre link uno sotto l'altro, al centro, poi il footer
export default function ClosingLinks({ links }: Props) {
  return (
    <section className={styles.closing}>
      <p className={styles.links}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={`u-link ${styles.link}`}>
            {link.label}
          </Link>
        ))}
      </p>
    </section>
  );
}
