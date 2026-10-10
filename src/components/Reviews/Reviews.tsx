"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionLabel from "@/components/SectionLabel/SectionLabel";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Reviews.module.css";

type Review = {
  quote: string;
  author: string;
  category: string;
  // foto del viso; per i clienti business il logo dell'azienda
  src: string;
};

// Placeholder: foto di gattini e testi fittizi, da sostituire con le recensioni reali.
const REVIEWS: Review[] = [
  {
    quote: "She caught the day exactly as it felt.",
    author: "Sofia & Thomas",
    category: "Events",
    src: "https://placecats.com/neo/120/120",
  },
  {
    quote: "No posing, no pressure, just us.",
    author: "Marta L.",
    category: "Portraits",
    src: "https://placecats.com/millie/120/120",
  },
  {
    quote: "Our brand finally looks like our brand.",
    author: "Atelier Nord",
    category: "Small Businesses",
    // cliente business: qui va il logo
    src: "https://placecats.com/poppy/120/120",
  },
  {
    quote: "Colours, movement, and zero stiffness.",
    author: "Nadia B.",
    category: "Events",
    src: "https://placecats.com/louie/120/120",
  },
];

const AUTOPLAY_INTERVAL = 10000;
const RESUME_DELAY = 18000;
const SWIPE_THRESHOLD = 40;

// Loop: le recensioni sono ripetute tre volte di fila, si sta sempre sulla
// serie di mezzo (HOME) e le copie ai lati fanno vedere la successiva/
// precedente mentre si scorre. Dopo l'ultima si passa così alla prima
// scorrendo avanti, non tornando indietro di scatto.
const COUNT = REVIEWS.length;
const HOME = 1;
const SLIDES = Array.from({ length: 3 }, (_, copy) =>
  REVIEWS.map((review, i) => ({ review, copy, key: `${copy}-${i}` }))
).flat();

export default function Reviews() {
  // posizione nel track ripetuto; parte dalla prima recensione della serie di mezzo
  const [position, setPosition] = useState(HOME * COUNT);
  // niente transizione nello scatto silenzioso da una copia alla serie di mezzo
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const index = ((position % COUNT) + COUNT) % COUNT;

  // Dopo la transizione, se si è finiti su una copia si torna (senza
  // animazione) sulla stessa recensione della serie di mezzo: il giro non finisce
  const onTransitionEnd = useCallback(() => {
    const home = HOME * COUNT + index;
    if (position === home) return;
    setInstant(true);
    setPosition(home);
  }, [position, index]);

  // Il frame successivo a quello che azzera la transizione la riattiva
  useEffect(() => {
    if (!instant) return;
    const id = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(id);
  }, [instant]);

  // Autoplay: avanza ogni 10s quando il carosello e' a riposo
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(() => setPosition((p) => p + 1), AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [paused, reducedMotion]);

  // Dopo un'interazione manuale l'autoplay riparte da zero
  useEffect(() => {
    if (!paused) return;
    const id = setTimeout(() => setPaused(false), RESUME_DELAY);
    return () => clearTimeout(id);
  }, [paused, position]);

  // Scorre alla recensione i (dopo l'ultima si riparte dalla prima, sempre avanti)
  const goTo = (i: number) => {
    setPaused(true);
    const delta = ((i - index + COUNT) % COUNT) || (i === index ? 0 : COUNT);
    setPosition((p) => p + delta);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    if (start === null) return;
    const delta = e.changedTouches[0].clientX - start;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    setPaused(true);
    setPosition((p) => p + (delta < 0 ? 1 : -1));
  };

  return (
    <section className={styles.reviews}>
      <SectionLabel className={styles.label}>kind words</SectionLabel>

      <div
        className={styles.viewport}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${position * 100}%)`,
            transition: instant || reducedMotion ? "none" : undefined,
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {SLIDES.map(({ review, copy, key }) => (
            <figure
              key={key}
              className={styles.slide}
              aria-hidden={copy !== HOME}
            >
              {/* il nome è già scritto sotto: la foto è decorativa */}
              <img src={review.src} alt="" className={styles.photo} />

              <blockquote className={styles.quote}>
                <p>&ldquo;{review.quote}&rdquo;</p>
              </blockquote>

              <figcaption className={styles.author}>
                {review.author} · {review.category}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {REVIEWS.map((review, i) => (
          <button
            key={review.author}
            type="button"
            className={styles.dot}
            data-active={i === index}
            onClick={() => goTo(i)}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
