"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HandArrow from "@/components/HandArrow/HandArrow";
import { useFitText } from "@/lib/useFitText";
import type { Slide } from "@/lib/heroSlides";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Hero.module.css";

type Photo = Slide;

// La foto verticale grande (Small Businesses, _DSC2886, ritagliata 2:3) e
// quella piccola sovrapposta (Private People, _DSC8910), scelte da Elisa
const PHOTO_2: Photo = {
  src: "/images/hero/photo-2.jpg",
  alt: "Young woman resting her head on her hands at a café table with cookies, brownies and a latte",
};

const PHOTO_3: Photo = {
  src: "/images/hero/photo-3.jpg",
  alt: "Black-and-white close-up portrait of a young woman looking up",
};

// Ultima parola della frase, cambia in dissolvenza
const ADJECTIVES = ["confident", "natural", "unforgettable"] as const;

const SLIDE_INTERVAL = 4500;
const ADJECTIVE_INTERVAL = 3000;

// Dove era arrivato lo slideshow: tornando in home riparte dalla foto dopo,
// non dalla prima. In memoria finché la pagina non si ricarica (cambiando
// pagina dal menu o col tasto indietro); in sessionStorage per quando si
// ricarica, nella stessa scheda
let lastSlide: number | null = null;
const SLIDE_KEY = "hero-slide";

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

type Props = {
  // le foto orizzontali del portfolio, già mescolate (lib/heroSlides.ts)
  slides: Slide[];
};

export default function Hero({ slides }: Props) {
  // la foto precedente resta piena sotto quella che entra in dissolvenza:
  // durante il passaggio non si vede mai il blocco colorato dietro
  // tornando in home senza ricaricare: subito la foto dopo l'ultima vista
  const [{ slide, previous }, setSlides] = useState(() => ({
    slide: lastSlide === null || slides.length === 0 ? 0 : (lastSlide + 1) % slides.length,
    previous: -1,
  }));
  // pagina appena caricata (anche ricaricata): non sa ancora dov'era arrivata
  const freshLoad = useRef(lastSlide === null);
  const [adjective, setAdjective] = useState(0);
  // con meno movimento: prima foto e prima parola, ferme
  const reducedMotion = useReducedMotion();
  const activeSlide = reducedMotion ? 0 : slide;
  const previousSlide = reducedMotion ? -1 : previous;
  const activeAdjective = reducedMotion ? 0 : adjective;
  // nella pagina solo la foto precedente (piena sotto), quella attiva e la
  // prossima (invisibile, intanto si scarica): con decine di foto la home
  // non le scarica tutte insieme
  const nextSlide =
    !reducedMotion && slides.length > 1 ? (activeSlide + 1) % slides.length : -1;
  const shownSlides = [previousSlide, activeSlide, nextSlide].filter(
    (i, position, all) => i >= 0 && i < slides.length && all.indexOf(i) === position
  );

  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  useFitText(titleRef, measureTitle);
  useFitText(quoteRef, measureQuote);

  // ricaricata nella stessa scheda: riparte dalla foto dopo l'ultima vista
  // (letta qui e non al primo disegno, che deve essere uguale a quello del
  // server)
  useEffect(() => {
    if (!freshLoad.current || slides.length < 2) return;
    freshLoad.current = false;
    let saved: number | null = null;
    try {
      const value = sessionStorage.getItem(SLIDE_KEY);
      if (value !== null) saved = Number(value);
    } catch {}
    if (saved !== null && Number.isInteger(saved) && saved >= 0) {
      setSlides({ slide: (saved + 1) % slides.length, previous: -1 });
    }
  }, [slides.length]);

  // ricorda la foto attiva
  useEffect(() => {
    if (reducedMotion) return;
    lastSlide = slide;
    try {
      sessionStorage.setItem(SLIDE_KEY, String(slide));
    } catch {}
  }, [slide, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || slides.length < 2) return;
    const id = setInterval(
      () =>
        setSlides(({ slide: i }) => ({
          slide: (i + 1) % slides.length,
          previous: i,
        })),
      SLIDE_INTERVAL
    );
    return () => clearInterval(id);
  }, [reducedMotion, slides.length]);

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
          {/* la chiave è il posto nel giro: la prossima diventa attiva senza
              essere ricreata, quindi è già scaricata quando entra */}
          {shownSlides.map((i) => (
            <img
              key={i}
              src={slides[i].src}
              alt={slides[i].alt}
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

      {/* Solo sul portatile: la riga sottile in fondo, con dove lavoro a
          sinistra e il portfolio a destra (sul telefono è nascosta) */}
      <div className={styles.footline}>
        <span className={styles.place}>Photographer based in Belgium</span>
        <Link href="/portfolio" className={`u-link ${styles.cta}`}>
          View my portfolio
          <HandArrow direction="right" className={styles.ctaArrow} />
        </Link>
      </div>
    </section>
  );
}
