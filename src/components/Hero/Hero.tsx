"use client";

import { useEffect, useState } from "react";
import { Cormorant_Garamond } from "next/font/google";
import styles from "./Hero.module.css";

// Serif leggero ad alto contrasto, simile a quello di cassidylynnephoto.com
const displaySerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

type Photo = {
  src: string;
  alt: string;
};

// Placeholder: foto di gattini, da sostituire con il portfolio reale.
const SLIDES: Photo[] = [
  { src: "https://placecats.com/neo/1200/900", alt: "Gattino 1" },
  { src: "https://placecats.com/millie/1200/900", alt: "Gattino 2" },
  { src: "https://placecats.com/poppy/1200/900", alt: "Gattino 3" },
];

const PHOTO_2: Photo = {
  src: "https://placecats.com/bella/900/900",
  alt: "Gattino 4",
};

const PHOTO_3: Photo = {
  src: "https://placecats.com/louie/800/1200",
  alt: "Gattino 5",
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
      {/* Riga 1: slideshow (80%) + testo verticale a destra (20%) */}
      <div className={styles.rowOne}>
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

        <div className={styles.verticalText}>
          <h1 className={`${styles.verticalTitle} ${displaySerif.className}`}>
            <em>Welcome to</em>
            <br />
            Elisa Massetti Photo
          </h1>
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
