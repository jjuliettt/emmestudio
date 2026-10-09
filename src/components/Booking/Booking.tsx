"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel/SectionLabel";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Booking.module.css";

// Placeholder: foto di gattini, da sostituire con la foto reale (2:3).
const PHOTO_SRC = "https://placecats.com/neo/1000/1500";

export default function Booking() {
  const windowRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  // Parallax: la foto 2:3, più alta della finestra quadrata, scorre più
  // lenta della pagina. Con meno movimento resta il taglio centrale (CSS).
  useEffect(() => {
    const frame = windowRef.current;
    const photo = photoRef.current;
    if (!frame || !photo) return;
    if (reducedMotion) {
      photo.style.transform = "";
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const box = frame.getBoundingClientRect();
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
      const travel = photo.offsetHeight - box.height;
      photo.style.transform = `translate3d(0, ${(progress - 1) * travel}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  return (
    <section className={styles.booking}>
      <div className={styles.frame}>
        <SectionLabel className={styles.label}>get in touch</SectionLabel>

        {/* Finestra quadrata: la foto ci scorre dietro */}
        <div ref={windowRef} className={styles.window}>
          <img ref={photoRef} src={PHOTO_SRC} alt="" className={styles.photo} />

          <div className={styles.box}>
            <p className={styles.ask}>
              Want to <em>work together</em>?
            </p>
            <p className={styles.links}>
              <Link href="/contacts" className={styles.link}>
                Get in touch
              </Link>
              <Link href="/prices" className={styles.link}>
                See prices
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
