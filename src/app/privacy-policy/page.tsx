import styles from "@/components/Legal/Legal.module.css";

// Testo fornito dalla cliente, non modificato: solo impaginato in sezioni.
// I placeholder tra [ ] vanno compilati con i dati reali.
const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. Website owner and data controller",
    body: [
      "Elisa Massetti",
      "Photographer – self-employed (student-entrepreneur status)",
      "Address: [POSTCODE, CITY], Belgium – full address available on request",
      "Email: [EMAIL]",
      "Phone: [PHONE – optional]",
      "Company number (CBE/BCE): [0XXX.XXX.XXX]",
      "VAT number: [BE0XXX.XXX.XXX] [or: \"Small business VAT exemption scheme\" if applicable]",
    ],
  },
  {
    heading: "2. Hosting",
    body: [
      "This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States – https://vercel.com",
    ],
  },
  {
    heading: "3. Data we collect",
    body: [
      "We only collect the data you voluntarily provide through the contact form: your name, email address, [PHONE – if in the form] and the content of your message.",
    ],
  },
  {
    heading: "4. Purpose and legal basis",
    body: [
      "Your data is used solely to reply to your enquiry and, where relevant, to prepare a quote or arrange a photography service.",
      "Legal basis: steps taken at your request prior to entering into a contract (Art. 6(1)(b) GDPR) and our legitimate interest in responding to messages we receive (Art. 6(1)(f) GDPR).",
    ],
  },
  {
    heading: "5. Retention period",
    body: [
      "Your data is kept for [24] months after our last exchange. If a contract follows, it is kept for as long as required by legal obligations (e.g. accounting).",
    ],
  },
  {
    heading: "6. Recipients and service providers",
    body: [
      "Your data is never sold or shared with third parties for marketing purposes. It is processed only by:",
      "- Vercel Inc. (website hosting) – United States",
      "- Resend (delivery of contact form emails) – United States",
      "- [PHOTOGRAPHER'S EMAIL PROVIDER, e.g. Google Gmail] (receiving messages)",
    ],
  },
  {
    heading: "7. Transfers outside the EU",
    body: [
      "Some of these providers are based in the United States. These transfers are covered by appropriate safeguards, namely the EU-U.S. Data Privacy Framework and/or the European Commission's Standard Contractual Clauses.",
    ],
  },
  {
    heading: "8. Cookies",
    body: [
      "This website does not use analytics, advertising or profiling cookies. Only strictly necessary technical elements required for the site to function may be used; these do not require your consent.",
    ],
  },
  {
    heading: "9. Your rights",
    body: [
      "Under the GDPR, you have the right to access, rectify, erase, restrict, object to the processing of, and request portability of your personal data.",
      "To exercise these rights, contact: [EMAIL]. We will reply within one month.",
    ],
  },
  {
    heading: "10. Complaints",
    body: [
      "If you believe your rights have not been respected, you can lodge a complaint with the Belgian Data Protection Authority (APD/GBA):",
      "Rue de la Presse 35, 1000 Brussels – www.dataprotectionauthority.be",
    ],
  },
  {
    heading: "11. Intellectual property",
    body: [
      "All photographs and content on this website are the exclusive property of Elisa Massetti, unless otherwise stated. Any reproduction, distribution or use, in whole or in part, without prior written permission is prohibited.",
    ],
  },
  {
    heading: "12. Changes",
    body: [
      "This policy may be updated from time to time. The date of the latest revision is shown at the top of this page.",
    ],
  },
];

// Righe consecutive che iniziano con "- " diventano un elenco puntato;
// le altre restano paragrafi singoli.
function Body({ lines }: { lines: string[] }) {
  const nodes: React.ReactNode[] = [];
  let list: string[] = [];

  const flushList = () => {
    if (list.length === 0) return;
    nodes.push(
      <ul className={styles.list} key={`list-${nodes.length}`}>
        {list.map((item) => (
          <li key={item}>{item.replace(/^-\s*/, "")}</li>
        ))}
      </ul>
    );
    list = [];
  };

  for (const line of lines) {
    if (line.startsWith("- ")) {
      list.push(line);
      continue;
    }
    flushList();
    nodes.push(
      <p className={styles.paragraph} key={line}>
        {line}
      </p>
    );
  }
  flushList();

  return <>{nodes}</>;
}

export default function PrivacyPolicyPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>
        <span className={styles.titleLine}>Privacy policy and legal notice of</span>
        <span className={styles.titleLine}>Emmestudio by Elisa Massetti</span>
      </h1>
      <p className={styles.kicker}>PRIVACY POLICY &amp; LEGAL NOTICE</p>
      <p className={styles.updated}>Last updated: [DATE]</p>

      <div className={styles.sections}>
        {SECTIONS.map((section) => (
          <section key={section.heading}>
            <h2 className={styles.heading}>{section.heading}</h2>
            <Body lines={section.body} />
          </section>
        ))}
      </div>
    </section>
  );
}
