import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/Contact/ContactForm";
import PageTitle from "@/components/PageTitle/PageTitle";
import { EMAIL, INSTAGRAM } from "@/lib/contacts";
import styles from "./ContactsPage.module.css";

// Titolo della scheda: "Contacts | Elisa Massetti Photo" (modello in layout.tsx)
export const metadata: Metadata = {
  title: "Contacts",
  description:
    "Get in touch with Elisa Massetti, photographer working across Antwerp and Belgium.",
};

export default function ContactsPage() {
  return (
    <>
      <section className={styles.intro}>
        <PageTitle>Let’s talk</PageTitle>
        <div className={styles.lead}>
          <p>Tell me what you have in mind.</p>
          <p>I usually reply within 1–2 working days.</p>
        </div>
      </section>

      <section className={styles.formSection} aria-label="Contact form">
        <ContactForm />
      </section>

      {/* ---------- Contatti diretti (fascia beige) ---------- */}
      <section className={styles.direct} aria-label="Direct contact">
        <dl className={styles.details}>
          <div>
            <dt>Email</dt>
            {/* solo testo finché il dominio non è comprato */}
            <dd>{EMAIL}</dd>
          </div>
          {INSTAGRAM && (
            <div>
              <dt>Instagram</dt>
              <dd>
                <a href={INSTAGRAM} className="u-link">
                  Follow my work
                </a>
              </dd>
            </div>
          )}
          <div>
            <dt>Area</dt>
            <dd>Working across Antwerp and Belgium.</dd>
          </div>
        </dl>
      </section>

      {/* ---------- Frase finale e link ---------- */}
      <section className={styles.closing}>
        <p className={styles.closingLine}>
          <span>I can’t wait to hear</span> <span>your story.</span>
        </p>

        <p className={styles.links}>
          <Link href="/prices" className={`u-link ${styles.link}`}>
            See prices
          </Link>
          <Link href="/portfolio" className={`u-link ${styles.link}`}>
            See portfolio
          </Link>
        </p>
      </section>
    </>
  );
}
