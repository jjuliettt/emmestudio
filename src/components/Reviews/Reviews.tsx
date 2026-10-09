"use client";

import { useEffect, useRef, useState } from "react";
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

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  // Autoplay: avanza ogni 10s quando il carosello e' a riposo
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % REVIEWS.length),
      AUTOPLAY_INTERVAL
    );
    return () => clearInterval(id);
  }, [paused, reducedMotion]);

  // Dopo un'interazione manuale l'autoplay riparte da zero
  useEffect(() => {
    if (!paused) return;
    const id = setTimeout(() => setPaused(false), RESUME_DELAY);
    return () => clearTimeout(id);
  }, [paused, index]);

  const goTo = (next: number) => {
    setPaused(true);
    setIndex((next + REVIEWS.length) % REVIEWS.length);
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
    goTo(delta < 0 ? index + 1 : index - 1);
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
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {REVIEWS.map((review, i) => (
            <figure
              key={review.author}
              className={styles.slide}
              aria-hidden={i !== index}
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
