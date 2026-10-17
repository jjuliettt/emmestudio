import { publicFileExists } from "@/lib/publicFiles";
import styles from "./About.module.css";

// File provvisori in public/assets/REPLACE-ME/: si sostituiscono con file
// dallo stesso nome, senza toccare il codice (vedi il README lì dentro).
// Foto 3:2: finché il file non c'è, resta la foto segnaposto di adesso.
const PHOTO_FILE = "/assets/REPLACE-ME/REPLACE-ME_photo-elisa.jpg";
const PHOTO_PLACEHOLDER = "https://placecats.com/millie/1500/1000";
// Firma: PNG con fondo trasparente
const SIGNATURE_FILE = "/assets/REPLACE-ME/REPLACE-ME_signature.png";

export default function About() {
  const photo = publicFileExists(PHOTO_FILE) ? PHOTO_FILE : PHOTO_PLACEHOLDER;
  const signature = publicFileExists(SIGNATURE_FILE) ? SIGNATURE_FILE : null;

  return (
    <section className={styles.about}>
      {/* se non sta su una riga va a capo solo dopo "Ciao," */}
      <p className={styles.greeting}>
        <span className={styles.nowrap}>Ciao,</span>{" "}
        <span className={styles.nowrap}>I&apos;m Elisa</span>
      </p>

      <div className={styles.photo}>
        <img src={photo} alt="Elisa Massetti" className={styles.image} />

        {/* A cavallo dell'angolo in alto a sinistra della foto */}
        {signature ? (
          <img src={signature} alt="" className={styles.signature} />
        ) : (
          <span className={styles.signatureStandIn} aria-hidden="true">
            Elisa Massetti
          </span>
        )}
      </div>

      {/* Testo provvisorio, da confermare con Elisa */}
      <div className={styles.description}>
        <p>
          I&apos;m an Italian photographer based in Belgium. I photograph
          companies, small businesses and people, always chasing the real
          moment: the unposed laugh, the energy in a room, the details that
          make you <em>you</em>. Colorful, natural, never stiff.
        </p>
        <p>
          I&apos;m originally from Bergamo, and these days my work takes me
          from race weekends and company events to cafés, small brands and
          quiet portrait sessions. Different worlds, same approach: show up
          relaxed, stay out of the way, and let things happen.
        </p>
        <p>
          I speak Italian, English, German and Spanish, so we can work in
          whichever language you feel most at ease in. And if you&apos;re
          nervous about being photographed, that&apos;s completely normal.
          Most of my favorite pictures come from the moment people forget
          I&apos;m there.
        </p>
      </div>
    </section>
  );
}
