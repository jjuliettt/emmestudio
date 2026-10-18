import { publicFileExists } from "@/lib/publicFiles";
import styles from "./About.module.css";

// File provvisori in public/assets/REPLACE-ME/: si sostituiscono con file
// dallo stesso nome, senza toccare il codice (vedi il README lì dentro).
// Foto 3:2: finché il file non c'è, resta la foto segnaposto di adesso.
const PHOTO_FILE = "/assets/REPLACE-ME/REPLACE-ME_photo-elisa.jpg";
const PHOTO_PLACEHOLDER = "https://placecats.com/millie/1500/1000";
// Firma: PNG con fondo trasparente
const SIGNATURE_FILE = "/assets/REPLACE-ME/REPLACE-ME_signature.png";

// Testo di Elisa (brief v3)
const TEXT = [
  "I'm an Italian photographer from Bergamo, now based in Belgium.",
  "Photography started for me out of simple curiosity. As a child, I was always trying to get my hands on my parents' camera during family trips. Years later, when I left for an exchange in Germany, my mum gave me my first camera of my own. I started taking pictures, helped a friend make a short film, and slowly discovered how much I enjoyed being behind the camera.",
  "That curiosity eventually took me to volunteer as a photographer for the city of Kraków, Poland, where I lived for two years. Photographing events, meeting people from different backgrounds and learning by doing gave me the experience to grow, build my portfolio and turn something I loved into professional work.",
  "I'm naturally curious, observant and energetic. I enjoy meeting people, learning new things and challenging myself to keep improving. I think this is also what draws me to photography: the opportunity to step into different worlds, get to know people and discover the stories behind what they do.",
  "Today, I photograph people, businesses and events. What connects these different projects is my interest in people and their stories. I love how a single photograph can communicate so much, while also recognising that every image is a choice about what we show and how we tell a story. That's what keeps me curious about photography and always looking for new ways to grow.",
  "Whether I'm working with a business, documenting an event or taking someone's portrait, my approach is relaxed and people-focused. I want the experience to feel natural, to make people feel comfortable in front of the camera, and to create images that capture something genuine about the people and moments in front of me.",
];

export default function About() {
  const photo = publicFileExists(PHOTO_FILE) ? PHOTO_FILE : PHOTO_PLACEHOLDER;
  const signature = publicFileExists(SIGNATURE_FILE) ? SIGNATURE_FILE : null;

  return (
    <section className={styles.about}>
      {/* se non sta su una riga va a capo solo dopo "Ciao," */}
      <p className={styles.greeting}>
        <span className={styles.nowrap}>Ciao,</span>{" "}
        <span className={styles.nowrap}>I&apos;m Elisa, and</span>
      </p>

      {/* la firma è nel flusso, sopra la foto, e scende sul suo angolo: così
          lo spazio tra il saluto e la firma è uguale a quello sopra il
          saluto */}
      <div className={styles.photo}>
        {signature ? (
          <img src={signature} alt="" className={styles.signature} />
        ) : (
          <span className={styles.signatureStandIn} aria-hidden="true">
            Elisa Massetti
          </span>
        )}
        <img src={photo} alt="Elisa Massetti" className={styles.image} />
      </div>

      <div className={styles.description}>
        <h2 className={styles.heading}>A little about me</h2>
        {TEXT.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
