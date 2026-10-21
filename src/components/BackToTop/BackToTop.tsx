"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./BackToTop.module.css";

// Pulsante per tornare su, in basso a destra in tutte le pagine: compare
// dopo aver sceso di mezza schermata (così anche nelle pagine corte, come
// Contacts). Con meno movimento il salto è immediato.
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
      {/* freccia disegnata a mano: asta un po' ondulata, punta aperta */}
      <svg viewBox="0 0 24 24" className={styles.arrow} aria-hidden="true">
        <path d="M12.3 19.6c-.9-3.6.6-7.4-.3-14.4" />
        <path d="M7.4 9.7c1.9-1.2 3.4-2.8 4.6-4.5 1.2 1.6 2.8 3 4.9 4" />
      </svg>
    </button>
  );
}
