"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Hero.module.css";

type Photo = {
  src: string;
  alt: string;
};

const SLIDES: Photo[] = [
  {
    src: "/images/hero/slide-1-circuit.jpg",
    alt: "Starting grid at Circuit Zolder",
  },
  {
    src: "/images/hero/slide-2-helmet.jpg",
    alt: "Racing helmet resting on the roof of a car",
  },
  {
    src: "/images/hero/slide-3-champagne.jpg",
    alt: "Glass of sparkling wine with a race car on the track behind",
  },
];

const PHOTO_2: Photo = {
  src: "/images/hero/guests.jpg",
  alt: "Guests chatting during the event",
};

const PHOTO_3: Photo = {
  src: "/images/hero/portrait.jpg",
  alt: "Smiling guest in conversation",
};

// Ultima parola della frase, cambia in dissolvenza
const ADJECTIVES = ["confident", "natural", "unforgettable"] as const;

const SLIDE_INTERVAL = 4500;
const ADJECTIVE_INTERVAL = 3000;

export default function Hero() {
  // la foto precedente resta piena sotto quella che entra in dissolvenza:
  // durante il passaggio non si vede mai il blocco colorato dietro
  const [{ slide, previous }, setSlides] = useState({ slide: 0, previous: -1 });
  const [adjective, setAdjective] = useState(0);
  const [hasBranch, setHasBranch] = useState(false);
  // con meno movimento: prima foto e prima parola, ferme
  const reducedMotion = useReducedMotion();
  const activeSlide = reducedMotion ? 0 : slide;
  const previousSlide = reducedMotion ? -1 : previous;
  const activeAdjective = reducedMotion ? 0 : adjective;

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(
      () =>
        setSlides(({ slide: i }) => ({
          slide: (i + 1) % SLIDES.length,
          previous: i,
        })),
      SLIDE_INTERVAL
    );
    return () => clearInterval(id);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(
      () => setAdjective((i) => (i + 1) % ADJECTIVES.length),
      ADJECTIVE_INTERVAL
    );
    return () => clearInterval(id);
  }, [reducedMotion]);

  // Branch c'è solo se il file è in public/fonts/ (non versionato):
  // il suo corsivo simulato chiede un altro allineamento (vedi CSS)
  useEffect(() => {
    document.fonts
      .load('1em "Branch"')
      .then((faces) => setHasBranch(faces.length > 0))
      .catch(() => {}); // file assente: resta Instrument Serif
  }, []);

  return (
    <section className={styles.hero}>
      {/* Riga 1: testo verticale a sinistra (23%) + slideshow (77%) */}
      <div className={styles.rowOne}>
        <div className={styles.verticalText}>
          <h1
            className={styles.verticalTitle}
            data-font={hasBranch ? "branch" : undefined}
          >
            <em className={`${styles.titleLine} ${styles.titleWelcome}`}>
              Welcome to
            </em>
            <span className={`${styles.titleLine} ${styles.titleName}`}>
              Elisa Massetti Photo
            </span>
          </h1>
        </div>

        {/* Dietro alla foto c'è il blocco del colore di stagione (CSS) */}
        <div className={styles.slideshow}>
          {SLIDES.map((photo, i) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              className={styles.slide}
              data-active={i === activeSlide}
              data-previous={i === previousSlide}
              aria-hidden={i !== activeSlide}
            />
          ))}
        </div>
      </div>

      {/* Riga 2: foto 2 + foto 3 sovrapposta + frase */}
      <div className={styles.rowTwo}>
        <div className={styles.collage}>
          <img
            src={PHOTO_2.src}
            alt={PHOTO_2.alt}
            className={styles.photoTwo}
          />
          <img
            src={PHOTO_3.src}
            alt={PHOTO_3.alt}
            className={styles.photoThree}
          />
        </div>

        {/* Al massimo due righe: la parola che cambia resta in fondo */}
        <p className={styles.quote}>
          <span className={styles.quoteLine}>Images that make you</span>{" "}
          <span className={styles.quoteLine}>
            look{" "}
            {/* le tre parole stanno nella stessa cella: lo spazio è sempre
                quello della più lunga, così il testo non si sposta mai */}
            <span className={styles.adjectiveSlot}>
              {ADJECTIVES.map((word, i) => (
                <em
                  key={word}
                  className={styles.adjective}
                  data-active={i === activeAdjective}
                  aria-hidden={i !== activeAdjective}
                >
                  {word}
                </em>
              ))}
            </span>
          </span>
        </p>
      </div>
    </section>
  );
}
