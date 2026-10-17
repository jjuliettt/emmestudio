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
const LAST_UPDATED = "17 October 2026";

// Testo fornito da Elisa. Le parti tra [ ] sono ancora da decidere.
function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className={styles.heading}>{heading}</h2>
      {children}
    </section>
  );
}

function Labelled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li>
      <em>{label}:</em> {children}
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
          <p className={styles.paragraph}>
            Elisa Massetti, sole trader, photographer.
            <br />
            3270 Scherpenheuvel-Zichem, Belgium.
            <br />
            Enterprise number: {ENTERPRISE_NO}
            <br />
            VAT: exempt, small enterprise scheme. VAT not applicable.
            <br />
            Email: {EMAIL}
            <br />
            Phone: +32 492 83 61 90
          </p>
          <p className={styles.paragraph}>
            I&apos;m the controller of the personal data described on this page.
          </p>
        </Section>

        <Section heading="2. What I collect and why">
          <ul className={styles.list}>
            <Labelled label="Contact form">
              your name, email, interest category, optional date and your
              message. Used to answer you and prepare a quote. Legal basis:
              steps before a contract and my legitimate interest in answering
              enquiries.
            </Labelled>
            <Labelled label="Price guide form (when live)">
              first name, email, chosen category, your consent choices and the
              date. Used to send you the guide. Legal basis: your consent. If
              you tick the second box, I may send occasional follow-up emails.
              You can unsubscribe at any time with the link in every email, or
              by writing to me.
            </Labelled>
            <Labelled label="Clients">
              name, contact details, session details and invoicing data. Legal
              basis: contract and legal obligations (accounting).
            </Labelled>
            <Labelled label="Photos from sessions">
              photos of you or your business are personal data. Used to deliver
              your session through a private gallery link. I only use photos in
              my portfolio, website or social media with your written consent,
              which you can withdraw at any time.
            </Labelled>
            <Labelled label="Technical logs">
              my hosting provider processes your IP address and technical data
              when you visit the site, to keep it running securely.
            </Labelled>
          </ul>
        </Section>

        <Section heading="3. Who receives your data">
          <p className={styles.paragraph}>I don&apos;t sell your data. Providers I use:</p>
          <ul className={styles.list}>
            <li>Vercel Inc. (website hosting, USA).</li>
            <li>[OPEN: email provider, for example Google if Gmail].</li>
            <li>[OPEN: contact form tool].</li>
            <li>Brevo (email sending for the price guide, when live).</li>
            <li>Billit (invoicing).</li>
          </ul>
          <p className={styles.paragraph}>
            Transfers outside the EU rely on the EU-US Data Privacy Framework
            and/or Standard Contractual Clauses.
          </p>
        </Section>

        <Section heading="4. How long I keep it [OPEN: confirm]">
          <ul className={styles.list}>
            <li>Contact enquiries: 24 months after the last exchange.</li>
            <li>Price guide list: until you unsubscribe.</li>
            <li>Invoices and accounting records: 7 years.</li>
            <li>Client photos and galleries: [OPEN: X months].</li>
          </ul>
        </Section>

        <Section heading="5. Cookies">
          <p className={styles.paragraph}>
            This site doesn&apos;t use analytics, advertising or tracking
            cookies. Fonts are hosted on the site itself. If this changes, this
            page will be updated first.
          </p>
        </Section>

        <Section heading="6. Your rights">
          <p className={styles.paragraph}>
            Access, rectification, erasure, restriction, objection (including
            to direct marketing), portability, and withdrawing consent at any
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
            © Elisa Massetti. All photos and content on this site belong to me.
            Reproduction or distribution requires my prior written permission.
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
