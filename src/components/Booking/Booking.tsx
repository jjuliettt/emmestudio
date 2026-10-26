"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Booking.module.css";

// La foto di Elisa (orizzontale, 3:2): larga quanto la finestra, più alta
// di lei, ci scorre dietro. Larghezza e altezza del file per le proporzioni.
const PHOTO = { src: "/images/booking.jpg", width: 2000, height: 1333 };

type Props = {
  // il colore della sezione prima: lo spazio sopra la foto lo continua
  after?: "cream" | "beige";
};

// Un solo componente, identico in Home, Portfolio e nelle categorie (foto,
// finestra, riquadro, testi); cambia solo il colore dello spazio sopra la
// foto. Contacts e Prices finiscono invece con ClosingLinks.
export default function Booking({ after = "cream" }: Props) {
  const windowRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();
  // il riquadro appare solo in fondo alla pagina, quando la finestra si
  // vede quasi tutta; prima di saperlo (e con meno movimento) resta visibile
  const [shown, setShown] = useState<boolean | null>(null);

  useEffect(() => {
    const frame = windowRef.current;
    if (reducedMotion || !frame) {
      setShown(null);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setShown(entry.intersectionRatio >= 0.85),
      { threshold: [0, 0.85, 1] }
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // Parallax: la foto, più alta della finestra, scorre più
  // lenta della pagina. Con meno movimento resta il taglio centrale (CSS).
  useEffect(() => {
    const frame = windowRef.current;
    const photo = photoRef.current;
    if (!frame || !photo) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const box = frame.getBoundingClientRect();
      const travel = photo.offsetHeight - box.height;
      // con meno movimento: ferma, tagliata al centro
      if (reducedMotion) {
        photo.style.transform = `translate3d(0, ${-travel / 2}px, 0)`;
        return;
      }
      const viewport = window.innerHeight;
      // 0 quando la finestra entra dal basso, 1 quando esce in alto, o a
      // fine pagina se prima non si riesce a scorrere fin lì
      const top = box.top + window.scrollY;
      const start = top - viewport;
      const end = Math.min(
        top + box.height,
        document.documentElement.scrollHeight - viewport
      );
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - start) / Math.max(1, end - start))
      );
      photo.style.transform = `translate3d(0, ${(progress - 1) * travel}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    // la foto arriva dopo: le misure giuste solo quando è caricata
    photo.addEventListener("load", onScroll);
    if (!reducedMotion) window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      photo.removeEventListener("load", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  return (
    <section className={styles.booking} data-after={after}>
      <div className={styles.frame}>
        {/* Finestra 3:2: la foto ci scorre dietro */}
        <div ref={windowRef} className={styles.window}>
          <img
            ref={photoRef}
            src={PHOTO.src}
            width={PHOTO.width}
            height={PHOTO.height}
            alt=""
            className={styles.photo}
          />

          <div className={styles.box} data-shown={shown ?? undefined}>
            <p className={styles.ask}>
              <span className={styles.askStart}>Want to</span>{" "}
              <span className={styles.askEnd}>
                <em>work together</em>?
              </span>
            </p>
            <p className={styles.links}>
              <Link href="/contacts" className={`u-link ${styles.link}`}>
                Get in touch
              </Link>
              <Link href="/prices" className={`u-link ${styles.link}`}>
                See prices
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
