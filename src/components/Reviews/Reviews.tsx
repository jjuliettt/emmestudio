"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Reviews.module.css";

type Review = {
  quote: string;
  name: string;
  label: string;
  // foto (o logo): segnaposto in public/assets/REPLACE-ME/, da sostituire
  // con file dallo stesso nome
  src: string;
};

// Recensioni vere (brief v3)
const REVIEWS: Review[] = [
  {
    quote:
      "I was so nervous at first, but Elisa made me feel comfortable from the beginning. We found poses that felt natural to me, and she always checked that I liked how I looked in the photos. It made such a difference!",
    name: "Hania",
    label: "Private Client, Portrait Photography · Belgium",
    src: "/assets/REPLACE-ME/REPLACE-ME_review-01.jpg",
  },
  {
    quote:
      "I loved how Elisa captured all those little moments happening in between the big ones. The photos felt so natural and spontaneous, and we could all just relax and be ourselves.",
    name: "Paulina",
    label: "Multicultural Centre of Krakow, Event Photography · Krakow, Poland",
    src: "/assets/REPLACE-ME/REPLACE-ME_review-02.jpg",
  },
  {
    quote:
      "I absolutely loved the photos! I felt confident and empowered in them, and the whole experience was genuinely enjoyable. Elisa made it feel easy and natural.",
    name: "Tawake",
    label: "AUTO1 Group, Team Portrait Photography · Antwerp, Belgium",
    src: "/assets/REPLACE-ME/REPLACE-ME_review-03.jpg",
  },
  {
    quote:
      "I hardly noticed Elisa was there, yet she captured such beautiful, natural moments. The photos really reflect the atmosphere of the conference without ever feeling staged.",
    name: "Prof. Tacik",
    label: "NOMOS Centre, Academic Conference Photography · Krakow, Poland",
    src: "/assets/REPLACE-ME/REPLACE-ME_review-04.jpg",
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
    <section className={styles.reviews} aria-label="Reviews">
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
              <img src={review.src} alt={review.name} className={styles.photo} />

              {/* tutte le slide sono alte come la più lunga (stessa riga del
                  carosello): il nome segue sempre la citazione alla stessa
                  distanza e i pallini sotto non si spostano mai */}
              <blockquote className={styles.quote}>
                <p>&ldquo;{review.quote}&rdquo;</p>
              </blockquote>

              <figcaption className={styles.author}>
                <span className={styles.name}>{review.name}</span>
                <span className={styles.label}>{review.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {REVIEWS.map((review, i) => (
          <button
            key={review.name}
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
