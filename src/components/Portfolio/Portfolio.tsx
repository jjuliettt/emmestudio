"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { displayMasthead } from "@/app/fonts";
import SectionLabel from "@/components/SectionLabel/SectionLabel";
import { PORTFOLIO_CATEGORIES as CATEGORIES } from "@/lib/portfolioCategories";
import { useReducedMotion } from "@/lib/useReducedMotion";
import Cover from "./Cover";
import styles from "./Portfolio.module.css";

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

  // Posizione nel track: distanza tra due copertine e copertina allineata
  // a sinistra in questo momento (nessun centraggio: scrollLeft 0 mette
  // già la prima copertina al suo posto, contro il margine)
  const measure = () => {
    const track = trackRef.current;
    if (!track) return null;
    const cards = track.querySelectorAll<HTMLElement>("[data-card]");
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    return { track, step, position: Math.round(track.scrollLeft / step) };
  };

  // Si parte dalla serie "di casa", con le copie già pronte ai due lati
  useLayoutEffect(() => {
    const m = measure();
    if (m) m.track.scrollLeft = HOME * COUNT * m.step;
  }, []);

  // Scorre alla copertina successiva: dopo l'ultima c'è di nuovo la prima
  const goNext = useCallback(() => {
    const m = measure();
    if (!m) return;
    m.track.scrollTo({
      left: (m.position + 1) * m.step,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [reducedMotion]);

  // L'indice segue lo scorrimento, anche quello fatto a mano (con le dita)
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
      if (s.position !== home) s.track.scrollLeft = home * s.step;
    }, SETTLE_DELAY);
  };

  useEffect(() => () => clearTimeout(settleRef.current), []);

  // Swipe: l'autoplay si ferma
  const pause = () => {
    setPaused(true);
    setTouches((n) => n + 1);
  };

  // Autoplay: avanza ogni 2s quando il carosello è a riposo
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [paused, reducedMotion, index, goNext]);

  // Dopo un'interazione manuale riparte dopo un po' di inattività
  useEffect(() => {
    if (!paused) return;
    const id = setTimeout(() => setPaused(false), RESUME_DELAY);
    return () => clearTimeout(id);
  }, [paused, touches, index]);

  return (
    <section className={`${styles.portfolio} ${displayMasthead.className}`}>
      <div className={styles.carousel}>
        <SectionLabel className={styles.label}>my work</SectionLabel>

        <div
          ref={trackRef}
          className={styles.track}
          onScroll={onScroll}
          onPointerDown={pause}
          onWheel={pause}
        >
          {SLIDES.map(({ category, copy }) => (
            <Cover
              key={`${copy}-${category.href}`}
              category={category}
              year={YEAR}
              byline={BYLINE}
              hidden={copy !== HOME}
            />
          ))}
        </div>
      </div>

      <Link href="/portfolio" className={styles.viewAll}>
        View my portfolio
      </Link>
    </section>
  );
}
