import Link from "next/link";
import { publicFileExists } from "@/lib/publicFiles";
import styles from "./AboutTeaser.module.css";

// Firma: la stessa della pagina About (PNG con fondo trasparente)
const SIGNATURE_FILE = "/assets/REPLACE-ME/REPLACE-ME_signature.png";

// Due frasi prese dal testo della pagina About
const TEXT =
  "I'm an Italian photographer from Bergamo, now based in Belgium. Whether I'm working with a business, documenting an event or taking someone's portrait, my approach is relaxed and people-focused.";

// In home, al posto della fascia About intera: saluto, firma, due frasi e il
// link alla pagina About
export default function AboutTeaser() {
  const signature = publicFileExists(SIGNATURE_FILE) ? SIGNATURE_FILE : null;

  return (
    <section className={styles.teaser}>
      <p className={styles.greeting}>Ciao, I&apos;m Elisa</p>

      {signature ? (
        <img src={signature} alt="" className={styles.signature} />
      ) : (
        <span className={styles.signatureStandIn} aria-hidden="true">
          Elisa Massetti
        </span>
      )}

      <p className={styles.text}>{TEXT}</p>

      <Link href="/about" className={`u-link ${styles.more}`}>
        More about me
      </Link>
    </section>
  );
}
