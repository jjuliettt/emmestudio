import SectionLabel from "@/components/SectionLabel/SectionLabel";
import styles from "./About.module.css";

// Placeholder: foto di gattini, da sostituire con una foto reale (3:2).
const PHOTO = {
  src: "https://placecats.com/millie/1500/1000",
  alt: "Elisa Massetti",
};

export default function About() {
  return (
    <section className={styles.about}>
      <SectionLabel className={styles.label}>about me</SectionLabel>

      <p className={styles.hello}>Ciao!</p>
      <p className={styles.intro}>I&apos;m Elisa Massetti, and</p>

      <div className={styles.photo}>
        <img src={PHOTO.src} alt={PHOTO.alt} className={styles.image} />

        {/* Firma: placeholder in Allura, da sostituire con l'SVG della
            firma vera. A cavallo dell'angolo in alto a sinistra. */}
        <span className={styles.signature} aria-hidden="true">
          Elisa Massetti
        </span>
      </div>

      <p className={styles.description}>
        I&apos;m an Italian photographer based in Belgium. I photograph
        companies, small businesses and people, always chasing the real moment:
        the unposed laugh, the energy in a room, the details that make you you.
        Colorful, natural, never stiff.
      </p>
    </section>
  );
}
