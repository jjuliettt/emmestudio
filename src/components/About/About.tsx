import styles from "./About.module.css";

// Placeholder: foto di gattini, da sostituire con il ritratto reale (2:3).
const PORTRAIT = {
  src: "https://placecats.com/millie/1000/1500",
  alt: "Ritratto di Elisa Massetti",
};

// Frase che gira in loop nella fascia verde sopra la foto
const BAND_TEXT = "Get to know me";
// abbastanza ripetizioni da riempire anche uno schermo largo
const BAND_REPEAT = 10;

export default function About() {
  const phrases = Array.from({ length: BAND_REPEAT }, (_, i) => (
    <span key={i} className={styles.bandItem}>
      {BAND_TEXT}
    </span>
  ));

  return (
    <section className={styles.about}>
      {/* Fascia verde con la frase che scorre: due copie identiche in fila,
          così il giro ricomincia senza stacchi */}
      <div className={styles.band} aria-hidden="true">
        <div className={styles.bandTrack}>
          <div className={styles.bandGroup}>{phrases}</div>
          <div className={styles.bandGroup}>{phrases}</div>
        </div>
      </div>

      <div className={styles.photo}>
        <img
          src={PORTRAIT.src}
          alt={PORTRAIT.alt}
          className={styles.portrait}
        />

        {/* Segnaposto per il logo, da sostituire quando sara' pronto */}
        <div className={styles.logoMark} aria-hidden="true" />
      </div>

      <div className={styles.text}>
        <p className={styles.label}>Hi, I am Elisa Massetti, and</p>

        <p className={styles.paragraph}>
          I&apos;m here for the real moments — the laugh you didn&apos;t pose
          for, the way a room feels when everyone&apos;s actually having fun.
          Based in Belgium, originally from Italy, I shoot events, couples, and
          portraits for people and brands who want photos that still feel like
          them years later. No stiff poses, no washed-out filters — just color,
          movement, and the truth of the day.
        </p>
      </div>
    </section>
  );
}
