"use client";

import { useEffect, useState } from "react";
import HandArrow from "@/components/HandArrow/HandArrow";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./BackToTop.module.css";

// Pulsante per tornare su, a destra a un terzo dello schermo in tutte le
// pagine. Si comporta come l'header: sparisce scorrendo verso il basso e
// ricompare appena si risale un poco (mai nella prima mezza schermata, dove
// non serve). Con meno movimento il salto è immediato.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        // su → compare, giù → sparisce; vicino all'inizio sempre nascosto
        setVisible(y < lastY && y > window.innerHeight / 2);
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={styles.button}
      data-visible={visible}
      // nascosto: niente fuoco con la tastiera né lettura
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })
      }
    >
      <HandArrow direction="up" className={styles.arrow} />
    </button>
  );
}
