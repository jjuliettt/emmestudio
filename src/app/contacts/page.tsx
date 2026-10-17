import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/Contact/ContactForm";
import HandTitle from "@/components/HandTitle/HandTitle";
import { EMAIL, INSTAGRAM } from "@/lib/contacts";
import { publicFileExists } from "@/lib/publicFiles";
import styles from "./ContactsPage.module.css";

// Titolo della scheda: "Contacts | Emme Studio" (modello in layout.tsx)
export const metadata: Metadata = {
  title: "Contacts",
  description:
    "Get in touch with Elisa Massetti, photographer based in Antwerp, working across Belgium.",
};

// Il ritratto di Elisa (4:5): basta metterlo in public/images/contacts/ con
// uno di questi nomi. Finché manca, una foto segnaposto.
const PORTRAIT_FILES = [
  "/images/contacts/elisa.jpg",
  "/images/contacts/elisa.webp",
];
const PORTRAIT_PLACEHOLDER = "https://placecats.com/millie/800/1000";

export default function ContactsPage() {
  const portrait = PORTRAIT_FILES.find(publicFileExists) ?? PORTRAIT_PLACEHOLDER;

  return (
    <>
      <section className={styles.intro}>
        <HandTitle as="h1" lines={["Let’s talk."]} className={styles.title} />
        <p className={styles.lead}>
          Tell me what you have in mind. I usually reply within 1–2 working
          days.
        </p>
      </section>

      <section className={styles.formSection} aria-label="Contact form">
        <ContactForm />
      </section>

      {/* ---------- Contatti diretti (fascia beige) ---------- */}
      <section className={styles.direct} aria-label="Direct contact">
        <dl className={styles.details}>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${EMAIL}`} className={styles.detailLink}>
                {EMAIL}
              </a>
            </dd>
          </div>
          <div>
            <dt>Instagram</dt>
            <dd>
              <a href={INSTAGRAM} className={styles.detailLink}>
                Follow my work
              </a>
            </dd>
          </div>
          <div>
            <dt>Area</dt>
            <dd>Based in Antwerp, working across Belgium.</dd>
          </div>
          <div>
            <dt>Languages</dt>
            <dd>Italian, English, German, Spanish.</dd>
          </div>
        </dl>
      </section>

      {/* ---------- Ritratto, frase finale, link ---------- */}
      <section className={styles.closing}>
        <figure className={styles.portrait}>
          <img src={portrait} alt="Elisa Massetti" className={styles.photo} />
          <span className={styles.frame} aria-hidden="true" />
        </figure>

        <p className={styles.closingLine}>I can&apos;t wait to hear your story.</p>

        <p className={styles.links}>
          <Link href="/prices" className={styles.link}>
            See prices
          </Link>
          <Link href="/portfolio" className={styles.link}>
            See portfolio
          </Link>
        </p>
      </section>
    </>
  );
}
