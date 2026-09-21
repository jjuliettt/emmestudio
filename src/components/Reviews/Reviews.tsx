"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Reviews.module.css";

type Review = {
  quote: string;
  text: string;
  author: string;
  src: string;
  alt: string;
};

// Placeholder: foto di gattini e testi fittizi, da sostituire con le recensioni reali.
const REVIEWS: Review[] = [
  {
    quote: "She caught the day exactly as it felt.",
    text: "We barely noticed she was there, and yet every moment we wanted to keep is in the gallery. Looking at the photos still brings back the noise, the laughing, the whole mess of it.",
    author: "Sofia & Thomas",
    src: "https://placecats.com/neo/600/900",
    alt: "Sofia e Thomas",
  },
  {
    quote: "No posing, no pressure, just us.",
    text: "I hate having my picture taken and somehow this was fun. Elisa made the whole shoot feel like an afternoon with a friend, and the result looks like me on a good day.",
    author: "Marta L.",
    src: "https://placecats.com/millie/600/900",
    alt: "Marta L.",
  },
  {
    quote: "Our brand finally looks like our brand.",
    text: "We needed images for the shop that did not feel like stock photography. She understood the place in an hour and gave us a set of photos we have been using everywhere since.",
    author: "Atelier Nord",
    src: "https://placecats.com/poppy/600/900",
    alt: "Atelier Nord",
  },
  {
    quote: "Colours, movement, and zero stiffness.",
    text: "The party photos are alive. People dancing badly, my grandmother crying, the cake disaster — all of it. Exactly the kind of memory we wanted to hold on to.",
    author: "Nadia B.",
    src: "https://placecats.com/louie/600/900",
    alt: "Nadia B.",
  },
];

const AUTOPLAY_INTERVAL = 10000;
const RESUME_DELAY = 18000;
const SWIPE_THRESHOLD = 40;

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Autoplay: avanza ogni 10s quando il carosello e' a riposo
  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % REVIEWS.length),
      AUTOPLAY_INTERVAL
    );
    return () => clearInterval(id);
  }, [paused]);

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
            <article
              key={review.author}
              className={styles.slide}
              /* il layout si alterna: foto a sinistra, poi a destra */
              data-flipped={i % 2 === 1}
              aria-hidden={i !== index}
            >
              <img
                src={review.src}
                alt={review.alt}
                className={styles.photo}
              />

              <div className={styles.body}>
                <p className={styles.quote}>&ldquo;{review.quote}&rdquo;</p>
                <p className={styles.text}>{review.text}</p>
                <p className={styles.author}>{review.author}</p>
              </div>
            </article>
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
            aria-label={`Vai alla recensione ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
