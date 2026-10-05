import Link from "next/link";
import { EMAIL } from "@/lib/contacts";
import styles from "./Booking.module.css";

// Placeholder: foto di gattini, da sostituire con le foto reali.
const BACKGROUND_SRC = "https://placecats.com/neo/1200/1800";
const PHOTO = {
  src: "https://placecats.com/bella/600/900",
  alt: "Elisa Massetti al lavoro",
};

// Prenotazione, prezzi e contatti
const LINKS = [
  { label: "Book your session", href: "/contacts" },
  { label: "See the prices", href: "/prices" },
  { label: "Get in touch", href: `mailto:${EMAIL}` },
];

export default function Booking() {
  return (
    <section className={styles.booking}>
      {/* Foto ferma sullo sfondo: la sezione la ritaglia e, scorrendo,
          la si vede sopra e sotto il riquadro */}
      <img src={BACKGROUND_SRC} alt="" className={styles.background} />

      <div className={styles.card}>
        <img src={PHOTO.src} alt={PHOTO.alt} className={styles.photo} />

        <h2 className={styles.heading}>
          Find out more about how we can <em>work together</em>:
        </h2>

        <nav className={styles.links} aria-label="Prenotazioni e contatti">
          {LINKS.map((link) =>
            link.href.startsWith("mailto:") ? (
              <a key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </section>
  );
}
