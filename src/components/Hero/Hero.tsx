"use client";

import { useEffect, useState } from "react";
import { Instrument_Serif } from "next/font/google";
import styles from "./Hero.module.css";

// cassidylynnephoto.com usa "Branch" (font a pagamento): Instrument Serif
// è l'alternativa gratuita più vicina (serif alto e stretto, con corsivo).
const displaySerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

type Photo = {
  src: string;
  alt: string;
};

const SLIDES: Photo[] = [
  {
    src: "/images/hero/slide-1-circuit.jpg",
    alt: "Griglia di partenza al Circuit Zolder",
  },
  {
    src: "/images/hero/slide-2-helmet.jpg",
    alt: "Casco da corsa appoggiato sul tetto di un'auto",
  },
  {
    src: "/images/hero/slide-3-champagne.jpg",
    alt: "Flûte di spumante con un'auto in pista sullo sfondo",
  },
];

const PHOTO_2: Photo = {
  src: "/images/hero/guests.jpg",
  alt: "Ospiti che chiacchierano durante l'evento",
};

const PHOTO_3: Photo = {
  src: "/images/hero/portrait.jpg",
  alt: "Ospite sorridente durante una conversazione",
};

const ADJECTIVES = ["intimate", "timeless", "joyful"] as const;

const SLIDE_INTERVAL = 4500;
const ADJECTIVE_INTERVAL = 2600;

const LONGEST_ADJECTIVE = ADJECTIVES.reduce((a, b) =>
  b.length > a.length ? b : a
);

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const [adjective, setAdjective] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setSlide((i) => (i + 1) % SLIDES.length),
      SLIDE_INTERVAL
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setAdjective((i) => (i + 1) % ADJECTIVES.length),
      ADJECTIVE_INTERVAL
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Riga 1: testo verticale a sinistra (23%) + slideshow (77%) */}
      <div className={styles.rowOne}>
        <div className={styles.verticalText}>
          <h1 className={`${styles.verticalTitle} ${displaySerif.variable}`}>
            <em className={`${styles.titleLine} ${styles.titleWelcome}`}>
              Welcome to
            </em>
            <span className={styles.titleLine}>Elisa Massetti Photo</span>
          </h1>
        </div>

        <div className={styles.slideshow}>
          {SLIDES.map((photo, i) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              className={styles.slide}
              data-active={i === slide}
              aria-hidden={i !== slide}
            />
          ))}
        </div>

      </div>

      {/* Riga 2: foto 2 + foto 3 sovrapposta + citazione */}
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

        <p className={styles.quote}>
          I&apos;m a photographer for{" "}
          <span className={styles.adjectiveSlot}>
            {ADJECTIVES.map((word, i) => (
              <em
                key={word}
                className={styles.adjective}
                data-active={i === adjective}
                aria-hidden={i !== adjective}
              >
                {word}
              </em>
            ))}
            {/* riserva lo spazio della parola più lunga */}
            <em className={styles.adjectiveGhost}>{LONGEST_ADJECTIVE}</em>
          </span>{" "}
          events and couples
        </p>
      </div>
    </section>
  );
}
