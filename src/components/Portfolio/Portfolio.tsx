"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bodoni_Moda } from "next/font/google";
import SectionLabel from "@/components/SectionLabel/SectionLabel";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Portfolio.module.css";

// Serif ad alto contrasto (testata tipo Vogue), usato solo in questa sezione
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

type Category = {
  title: string;
  href: string;
  // foto verticale 2:3
  src: string;
  alt: string;
  // Soggetto scontornato: PNG trasparente con lo stesso taglio di src.
  // Va sopra la testata, così il titolo resta dietro al soggetto.
  cutout?: string;
};

// Placeholder: foto di gattini, da sostituire con le copertine reali
// (foto + soggetto scontornato).
const CATEGORIES: Category[] = [
  {
    title: "Portraits",
    href: "/portfolio/portraits",
    src: "https://placecats.com/neo/800/1200",
    alt: "Portraits cover",
  },
  {
    title: "Events",
    href: "/portfolio/events",
    src: "https://placecats.com/poppy/800/1200",
    alt: "Events cover",
  },
  {
    title: "Small Businesses",
    href: "/portfolio/small-businesses",
    src: "https://placecats.com/louie/800/1200",
    alt: "Small Businesses cover",
  },
];

const YEAR = "2026";
const BYLINE = "Elisa Massetti";

// Come il carosello delle recensioni
const AUTOPLAY_INTERVAL = 10000;
const RESUME_DELAY = 18000;

export default function Portfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // conta i tocchi: ogni interazione fa ripartire l'attesa
  const [touches, setTouches] = useState(0);
  const reducedMotion = useReducedMotion();

  // Scorre fino alla copertina i (dopo l'ultima si riparte dalla prima)
  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const cards = track.querySelectorAll<HTMLElement>("[data-card]");
      const target = cards[(i + cards.length) % cards.length];
      track.scrollTo({
        left: target.offsetLeft - cards[0].offsetLeft,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [reducedMotion]
  );

  // L'indice segue lo scorrimento, anche quello fatto a mano
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("[data-card]");
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    setIndex(Math.round(track.scrollLeft / step));
  };

  // Swipe o freccia: l'autoplay si ferma
  const pause = () => {
    setPaused(true);
    setTouches((n) => n + 1);
  };

  // Autoplay: avanza ogni 10s quando il carosello è a riposo
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(() => goTo(index + 1), AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [paused, reducedMotion, index, goTo]);

  // Dopo un'interazione manuale riparte dopo un po' di inattività
  useEffect(() => {
    if (!paused) return;
    const id = setTimeout(() => setPaused(false), RESUME_DELAY);
    return () => clearTimeout(id);
  }, [paused, touches, index]);

  return (
    <section className={`${styles.portfolio} ${bodoni.className}`}>
      <div className={styles.carousel}>
        <SectionLabel className={styles.label}>my work</SectionLabel>

        <div
          ref={trackRef}
          className={styles.track}
          onScroll={onScroll}
          onPointerDown={pause}
          onWheel={pause}
        >
          {CATEGORIES.map((category) => {
            const words = category.title.split(" ");
            // la parola più lunga riempie la larghezza della copertina
            const chars = Math.max(...words.map((word) => word.length));

            return (
              <Link
                key={category.href}
                href={category.href}
                className={styles.cover}
                data-card
              >
                <img
                  src={category.src}
                  alt={category.alt}
                  className={styles.photo}
                />

                <span
                  className={styles.masthead}
                  style={{ "--chars": chars } as React.CSSProperties}
                >
                  {words.map((word) => (
                    <span key={word} className={styles.mastheadLine}>
                      {word}
                    </span>
                  ))}
                </span>

                {category.cutout && (
                  <img
                    src={category.cutout}
                    alt=""
                    className={styles.cutout}
                  />
                )}

                <span className={styles.coverLines}>
                  <span className={styles.coverKicker}>{YEAR}</span>
                  <span className={styles.coverName}>{BYLINE}</span>
                </span>
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className={styles.next}
          onClick={() => {
            pause();
            goTo(index + 1);
          }}
          aria-label="Next category"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </div>

      <Link href="/portfolio" className={styles.viewAll}>
        View my portfolio
      </Link>
    </section>
  );
}
