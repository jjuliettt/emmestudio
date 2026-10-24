"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Booking.module.css";

// La foto di Elisa (orizzontale, 3:2): larga quanto la finestra, più alta
// di lei, ci scorre dietro. Larghezza e altezza del file per le proporzioni.
const PHOTO = { src: "/images/booking.jpg", width: 2000, height: 1333 };

type Props = {
  // solo nella pagina prezzi: "See portfolio" al posto di "See prices"
  onPricesPage?: boolean;
};

// Un solo componente, identico in tutte le pagine (foto, finestra,
// riquadro, testi). Cambia solo il secondo link nella pagina prezzi.
export default function Booking({ onPricesPage = false }: Props) {
  const second = onPricesPage
    ? { href: "/portfolio", label: "See portfolio" }
    : { href: "/prices", label: "See prices" };
  const windowRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  // Parallax: la foto 2:3, più alta della finestra quadrata, scorre più
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
    <section className={styles.booking}>
      <div className={styles.frame}>
        {/* Finestra quadrata: la foto ci scorre dietro */}
        <div ref={windowRef} className={styles.window}>
          <img
            ref={photoRef}
            src={PHOTO.src}
            width={PHOTO.width}
            height={PHOTO.height}
            alt=""
            className={styles.photo}
          />

          <div className={styles.box}>
            <p className={styles.ask}>
              Want to <em>work together</em>?
            </p>
            <p className={styles.links}>
              <Link href="/contacts" className={`u-link ${styles.link}`}>
                Get in touch
              </Link>
              <Link href={second.href} className={`u-link ${styles.link}`}>
                {second.label}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
