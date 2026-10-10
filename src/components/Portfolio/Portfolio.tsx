"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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

// Autoplay ogni 2s; dopo un tocco aspetta come il carosello delle recensioni
const AUTOPLAY_INTERVAL = 2000;
const RESUME_DELAY = 18000;

// Loop: le copertine sono ripetute più volte di fila. A riposo si sta sempre
// sulla serie HOME, quella di mezzo; le altre sono copie che riempiono i due
// lati della copertina centrata mentre si scorre.
const COUNT = CATEGORIES.length;
const COPIES = 5;
const HOME = 2;
const SLIDES = Array.from({ length: COPIES }, (_, copy) =>
  CATEGORIES.map((category) => ({ category, copy }))
).flat();
// attesa senza eventi di scroll per considerare fermo il carosello
const SETTLE_DELAY = 120;

export default function Portfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const settleRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // conta i tocchi: ogni interazione fa ripartire l'attesa
  const [touches, setTouches] = useState(0);
  const reducedMotion = useReducedMotion();

  // Posizione nel track: distanza tra due copertine, scroll che centra la
  // prima (start) e copertina al centro in questo momento
  const measure = () => {
    const track = trackRef.current;
    if (!track) return null;
    const cards = track.querySelectorAll<HTMLElement>("[data-card]");
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    const start =
      cards[0].offsetLeft -
      track.offsetLeft -
      (track.clientWidth - cards[0].offsetWidth) / 2;
    const position = Math.round((track.scrollLeft - start) / step);
    return { track, step, start, position };
  };

  // Si parte dalla serie "di casa", con le copie già pronte ai due lati
  useLayoutEffect(() => {
    const m = measure();
    if (m) m.track.scrollLeft = m.start + HOME * COUNT * m.step;
  }, []);

  // Scorre di una copertina, avanti (1) o indietro (-1): dopo l'ultima c'è
  // di nuovo la prima, e prima della prima l'ultima
  const go = useCallback(
    (delta: 1 | -1) => {
      const m = measure();
      if (!m) return;
      m.track.scrollTo({
        left: m.start + (m.position + delta) * m.step,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [reducedMotion]
  );

  // L'indice segue lo scorrimento, anche quello fatto a mano
  const onScroll = () => {
    const m = measure();
    if (!m) return;
    setIndex(((m.position % COUNT) + COUNT) % COUNT);

    // A scorrimento fermo, se si è finiti su una copia si torna (senza
    // animazione) sulla stessa copertina della serie di casa: il giro non finisce
    clearTimeout(settleRef.current);
    settleRef.current = setTimeout(() => {
      const s = measure();
      if (!s) return;
      const home = HOME * COUNT + (((s.position % COUNT) + COUNT) % COUNT);
      if (s.position !== home) s.track.scrollLeft = s.start + home * s.step;
    }, SETTLE_DELAY);
  };

  useEffect(() => () => clearTimeout(settleRef.current), []);

  // Swipe o freccia: l'autoplay si ferma
  const pause = () => {
    setPaused(true);
    setTouches((n) => n + 1);
  };

  // Autoplay: avanza ogni 2s quando il carosello è a riposo
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(() => go(1), AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [paused, reducedMotion, index, go]);

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
          {SLIDES.map(({ category, copy }) => {
            const words = category.title.split(" ");
            // la parola più lunga riempie la larghezza della copertina
            const chars = Math.max(...words.map((word) => word.length));
            const isCopy = copy !== HOME;

            return (
              <Link
                key={`${copy}-${category.href}`}
                href={category.href}
                className={styles.cover}
                data-card
                aria-hidden={isCopy || undefined}
                tabIndex={isCopy ? -1 : undefined}
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
          className={`${styles.arrow} ${styles.prev}`}
          onClick={() => {
            pause();
            go(-1);
          }}
          aria-label="Previous category"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M10 3l-5 5 5 5" />
          </svg>
        </button>

        <button
          type="button"
          className={`${styles.arrow} ${styles.next}`}
          onClick={() => {
            pause();
            go(1);
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
