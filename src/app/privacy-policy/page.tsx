import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageTitle from "@/components/PageTitle/PageTitle";
import { EMAIL, ENTERPRISE_NO } from "@/lib/contacts";
import styles from "@/components/Legal/Legal.module.css";

export const metadata: Metadata = {
  title: "Privacy & Legal",
  description:
    "Privacy policy and legal information of Elisa Massetti Photo: who I am, what data I collect, why, and your rights.",
};

// Data di pubblicazione di questo testo
const LAST_UPDATED = "18 October 2026";

// Testo fornito da Elisa (brief del 18 ottobre). Le parti tra [ ] sono
// ancora da compilare.
function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className={styles.heading}>{heading}</h2>
      {children}
    </section>
  );
}

// Un punto con il titoletto in grassetto
function Point({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li>
      <strong className={styles.label}>{label}:</strong> {children}
    </li>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <section className={styles.page}>
      <PageTitle>Privacy &amp; Legal</PageTitle>
      <p className={styles.updated}>Last updated: {LAST_UPDATED}</p>

      <div className={styles.sections}>
        <Section heading="1. Who I am">
          {/* dati uno per riga: giustificati farebbero buchi */}
          <p className={styles.details}>
            Elisa Massetti, sole trader, photographer.
            <br />
            3270 Scherpenheuvel-Zichem, Belgium.
            <br />
            Enterprise number: {ENTERPRISE_NO}.
            <br />
            VAT: exempt, small enterprise scheme (VAT not applicable).
            <br />
            Email: {EMAIL}.
            <br />
            Phone: +32 492 83 61 90.
          </p>
          <p className={styles.paragraph}>
            I&apos;m the controller of the personal data described here.
          </p>
        </Section>

        <Section heading="2. What I collect and why">
          <ul className={styles.list}>
            <Point label="Contact form">
              name, email, interest category, optional date and message. Used
              to answer you and prepare a quote (steps before a contract, and
              my legitimate interest in answering enquiries).
            </Point>
            <Point label="Price guide form (when live)">
              first name, email, category, your consent choices and the date.
              Used to send you the guide (your consent). If you tick the second
              box, I may send occasional follow-up emails. Unsubscribe any time
              with the link in every email or by writing to me.
            </Point>
            <Point label="Clients">
              name, contact and invoicing details, session details (contract
              and legal accounting obligations).
            </Point>
            <Point label="Photos from sessions">
              personal data. Delivered through a private gallery link. I only
              use photos in my portfolio, website or social media with your
              written consent, which you can withdraw any time.
            </Point>
            <Point label="Technical logs">
              my hosting provider processes your IP address and technical data
              when you visit the site, to keep it running securely.
            </Point>
          </ul>
        </Section>

        <Section heading="3. Who receives your data">
          <p className={styles.paragraph}>
            I don&apos;t sell your data. Providers: Vercel Inc. (website
            hosting, USA); [OPEN: email provider]; [OPEN: contact form tool];
            Brevo (price guide emails, when live); Billit (invoicing). Transfers
            outside the EU rely on the EU-US Data Privacy Framework and/or
            Standard Contractual Clauses.
          </p>
        </Section>

        <Section heading="4. How long I keep it [OPEN: confirm]">
          <p className={styles.paragraph}>
            Contact enquiries 24 months after the last exchange. Price guide
            list until you unsubscribe. Invoices and accounting records 7
            years. Client photos and galleries [OPEN: X months].
          </p>
        </Section>

        <Section heading="5. Cookies">
          <p className={styles.paragraph}>
            No analytics, advertising or tracking cookies. Fonts are hosted on
            this site. If this changes, this page is updated first.
          </p>
        </Section>

        <Section heading="6. Your rights">
          <p className={styles.paragraph}>
            Access, rectification, erasure, restriction, objection (including
            to direct marketing), portability, and withdrawing consent any
            time. Write to {EMAIL}. I answer within one month.
          </p>
        </Section>

        <Section heading="7. Complaints">
          <p className={styles.paragraph}>
            Belgian Data Protection Authority (GBA/APD), Rue de la Presse 35,
            1000 Brussels, www.dataprotectionauthority.be.
          </p>
        </Section>

        <Section heading="8. Copyright">
          <p className={styles.paragraph}>
            © Elisa Massetti. All photos and content belong to me. Reproduction
            or distribution needs my prior written permission.
          </p>
        </Section>

        <Section heading="9. Changes">
          <p className={styles.paragraph}>
            I may update this page. The latest date is at the top.
          </p>
        </Section>
      </div>
    </section>
  );
}
