import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageTitle from "@/components/PageTitle/PageTitle";
import { EMAIL, ENTERPRISE_NO } from "@/lib/contacts";
import styles from "@/components/Legal/Legal.module.css";

export const metadata: Metadata = {
  title: "Privacy & Legal",
  description:
    "Privacy policy and legal notice of Elisa Massetti Photo: who is responsible for your data, what is collected, why, and your rights.",
};

// Data di pubblicazione di questo testo
const LAST_UPDATED = "18 October 2026";

// Testo fornito da Elisa. Le parti tra [ ] sono ancora da compilare.
function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className={styles.heading}>{heading}</h2>
      {children}
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <section className={styles.page}>
      <PageTitle>Privacy Policy &amp; Legal Notice</PageTitle>
      <p className={styles.updated}>Last updated: {LAST_UPDATED}</p>

      <div className={styles.sections}>
        <Section heading="1. Website owner and data controller">
          <p className={styles.paragraph}>
            Elisa Massetti
            <br />
            Photographer – self-employed (student-entrepreneur status)
            <br />
            Address: 3270 Scherpenheuvel-Zichem, Belgium
            <br />
            Email: {EMAIL}
            <br />
            Phone: +32 492 83 61 90
            <br />
            Company number (CBE/BCE): {ENTERPRISE_NO}
            <br />
            VAT number: Small business VAT exemption scheme
          </p>
        </Section>

        <Section heading="2. Hosting">
          <p className={styles.paragraph}>
            This website is hosted by Vercel Inc., 440 N Barranca Ave #4133,
            Covina, CA 91723, United States – https://vercel.com
          </p>
        </Section>

        <Section heading="3. Data we collect">
          <p className={styles.paragraph}>
            We only collect the data you voluntarily provide through the forms
            on this website:
          </p>
          <ul className={styles.list}>
            <li>
              Contact form: your name, email address, the type of service
              you&apos;re interested in, an optional date or period and the
              content of your message.
            </li>
            <li>
              Price guide form: your first name, email address, the category
              you&apos;re interested in and your consent choices.
            </li>
          </ul>
          <p className={styles.paragraph}>
            If you become a client, we also process the details needed to
            invoice you.
          </p>
        </Section>

        <Section heading="4. Purpose and legal basis">
          <p className={styles.paragraph}>
            Contact form: your data is used solely to reply to your enquiry and,
            where relevant, to prepare a quote or arrange a photography service.
            Legal basis: steps taken at your request prior to entering into a
            contract (Art. 6(1)(b) GDPR) and our legitimate interest in
            responding to messages we receive (Art. 6(1)(f) GDPR).
          </p>
          <p className={styles.paragraph}>
            Price guide form: your data is used to send you the price guide and,
            only if you tick the second box, occasional follow-up emails. Legal
            basis: your consent (Art. 6(1)(a) GDPR), which you can withdraw at
            any time by writing to {EMAIL}.
          </p>
          <p className={styles.paragraph}>
            Invoicing: legal basis is the contract (Art. 6(1)(b) GDPR) and our
            legal accounting obligations (Art. 6(1)(c) GDPR).
          </p>
        </Section>

        <Section heading="5. Retention period">
          <p className={styles.paragraph}>
            Contact enquiries are kept for 24 months after our last exchange.
            Price guide data is kept until you withdraw your consent or
            unsubscribe. If a contract follows, data is kept for as long as
            required by legal obligations (e.g. accounting).
          </p>
        </Section>

        <Section heading="6. Recipients and service providers">
          <p className={styles.paragraph}>
            Your data is never sold or shared with third parties for marketing
            purposes. It is processed only by:
          </p>
          <ul className={styles.list}>
            <li>Vercel Inc. (website hosting) – United States</li>
            <li>
              Resend (delivery of contact form and price guide emails) – United
              States
            </li>
            <li>Billit (invoicing, for clients only)</li>
            <li>
              [PHOTOGRAPHER&apos;S EMAIL PROVIDER, e.g. Google Gmail] (receiving
              messages)
            </li>
          </ul>
        </Section>

        <Section heading="7. Transfers outside the EU">
          <p className={styles.paragraph}>
            Some of these providers are based in the United States. These
            transfers are covered by appropriate safeguards, namely the EU-U.S.
            Data Privacy Framework and/or the European Commission&apos;s Standard
            Contractual Clauses.
          </p>
        </Section>

        <Section heading="8. Cookies">
          <p className={styles.paragraph}>
            This website does not use analytics, advertising or profiling
            cookies. Only strictly necessary technical elements required for the
            site to function may be used; these do not require your consent.
          </p>
        </Section>

        <Section heading="9. Your rights">
          <p className={styles.paragraph}>
            Under the GDPR, you have the right to access, rectify, erase,
            restrict, object to the processing of, and request portability of
            your personal data.
          </p>
          <p className={styles.paragraph}>
            To exercise these rights, contact: {EMAIL}. We will reply within one
            month.
          </p>
        </Section>

        <Section heading="10. Complaints">
          <p className={styles.paragraph}>
            If you believe your rights have not been respected, you can lodge a
            complaint with the Belgian Data Protection Authority (APD/GBA):
          </p>
          <p className={styles.paragraph}>
            Rue de la Presse 35, 1000 Brussels – www.dataprotectionauthority.be
          </p>
        </Section>

        <Section heading="11. Intellectual property">
          <p className={styles.paragraph}>
            All photographs and content on this website are the exclusive
            property of Elisa Massetti, unless otherwise stated. Any
            reproduction, distribution or use, in whole or in part, without
            prior written permission is prohibited.
          </p>
        </Section>

        <Section heading="12. Changes">
          <p className={styles.paragraph}>
            This policy may be updated from time to time. The date of the latest
            revision is shown at the top of this page.
          </p>
        </Section>
      </div>
    </section>
  );
}
