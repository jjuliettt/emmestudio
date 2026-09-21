import styles from "./About.module.css";

// Placeholder: foto di gattini, da sostituire con il ritratto reale.
const PORTRAIT = {
  src: "https://placecats.com/millie/900/1500",
  alt: "Ritratto di Elisa Massetti",
};

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.photoCol}>
        <img
          src={PORTRAIT.src}
          alt={PORTRAIT.alt}
          className={styles.portrait}
        />

        {/* Segnaposto per l'icona del logo, da sostituire quando sara' pronta */}
        <div className={styles.logoMark} aria-hidden="true" />
      </div>

      <div className={styles.textCol}>
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
