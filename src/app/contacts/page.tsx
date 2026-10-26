import type { Metadata } from "next";
import ClosingLinks from "@/components/ClosingLinks/ClosingLinks";
import ContactForm from "@/components/Contact/ContactForm";
import PageTitle, { PageLead } from "@/components/PageTitle/PageTitle";
import { EMAIL, INSTAGRAM } from "@/lib/contacts";
import styles from "./ContactsPage.module.css";

// Titolo della scheda: "Contacts | Elisa Massetti Photo" (modello in layout.tsx)
export const metadata: Metadata = {
  title: "Contacts",
  description:
    "Get in touch with Elisa Massetti, photographer based in Belgium and open to work across Belgium.",
};

export default function ContactsPage() {
  return (
    <>
      <section className={styles.intro}>
        <PageTitle>Let's talk</PageTitle>
        <PageLead
          lines={[
            "Tell me what you have in mind.",
            "I usually reply within 1–2 working days.",
          ]}
        />
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
            <dd>Based in Antwerp, open to work across Belgium.</dd>
          </div>
        </dl>
      </section>

      {/* ---------- Link ---------- */}
      <ClosingLinks
        links={[
          { href: "/prices", label: "See prices" },
          { href: "/portfolio", label: "See portfolio" },
          { href: "/", label: "Back to home" },
        ]}
      />
    </>
  );
}
