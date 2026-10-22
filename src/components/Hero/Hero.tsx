"use client";

import { useEffect, useRef, useState } from "react";
import { useFitText } from "@/lib/useFitText";
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

// Il titolo verticale non deve mai andare oltre il fondo dello slideshow
// (meno lo spazio sopra e sotto): se lo fa, si rimpicciolisce il font, non
// la spaziatura tra le lettere. Sul telefono titolo e foto partono alla
// stessa altezza, sul portatile il titolo parte più in alto della foto
function measureTitle(title: HTMLElement) {
  const column = title.parentElement!;
  const photo = column.nextElementSibling!;
  const pad = getComputedStyle(column);
  return {
    // in scrittura verticale l'altezza è la lunghezza della riga
    size: title.offsetHeight,
    room:
      photo.getBoundingClientRect().bottom -
      column.getBoundingClientRect().top -
      parseFloat(pad.paddingTop) -
      parseFloat(pad.paddingBottom),
  };
}

// La frase resta sempre su tre righe: se la più lunga ("LOOK unforgettable")
// non entra, si rimpicciolisce tutta la frase allo stesso modo
function measureQuote(quote: HTMLElement) {
  const pad = getComputedStyle(quote);
  const lines = quote.querySelectorAll<HTMLElement>("[data-line]");
  return {
    size: Math.max(...Array.from(lines, (line) => line.offsetWidth)),
    room:
      quote.clientWidth -
      parseFloat(pad.paddingLeft) -
      parseFloat(pad.paddingRight),
  };
}

export default function Hero() {
  // la foto precedente resta piena sotto quella che entra in dissolvenza:
  // durante il passaggio non si vede mai il blocco colorato dietro
  const [{ slide, previous }, setSlides] = useState({ slide: 0, previous: -1 });
  const [adjective, setAdjective] = useState(0);
  // con meno movimento: prima foto e prima parola, ferme
  const reducedMotion = useReducedMotion();
  const activeSlide = reducedMotion ? 0 : slide;
  const previousSlide = reducedMotion ? -1 : previous;
  const activeAdjective = reducedMotion ? 0 : adjective;

  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  useFitText(titleRef, measureTitle);
  useFitText(quoteRef, measureQuote);

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

  return (
    <section className={styles.hero}>
      {/* Riga 1: testo verticale a sinistra (23%) + slideshow (77%) */}
      <div className={styles.rowOne}>
        <div className={styles.verticalText}>
          <h1 ref={titleRef} className={styles.verticalTitle}>
            <span className={`${styles.titleLine} ${styles.titleWelcome}`}>
              Welcome to
            </span>
            <span className={`${styles.titleLine} ${styles.titleName}`}>
              Elisa Massetti Photo
            </span>
          </h1>
        </div>

        {/* Dietro alla foto c'è il blocco espresso (CSS) */}
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

        {/* Sempre tre righe, a capo fissi */}
        <p ref={quoteRef} className={styles.quote}>
          <span className={styles.quoteLine} data-line>
            Images that
          </span>{" "}
          <span className={styles.quoteLine} data-line>
            make you
          </span>{" "}
          <span className={styles.quoteLine} data-line>
            look{" "}
            {/* le tre parole stanno nella stessa cella: lo spazio è sempre
                quello della più lunga, così il testo non si sposta mai */}
            <span className={styles.adjectiveSlot}>
              {ADJECTIVES.map((word, i) => (
                <span
                  key={word}
                  className={styles.adjective}
                  data-active={i === activeAdjective}
                  aria-hidden={i !== activeAdjective}
                >
                  {word}
                </span>
              ))}
            </span>
          </span>
        </p>
      </div>
    </section>
  );
}
