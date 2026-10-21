"use client";

import { useEffect, useState } from "react";
import HandArrow from "@/components/HandArrow/HandArrow";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./BackToTop.module.css";

// Pulsante per tornare su, a destra a un terzo dello schermo in tutte le
// pagine: compare dopo aver sceso di mezza schermata (così anche nelle
// pagine corte, come Contacts). Con meno movimento il salto è immediato.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight / 2);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
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
