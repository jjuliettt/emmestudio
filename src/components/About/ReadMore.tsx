"use client";

import { useRef, useState, type ReactNode } from "react";
import styles from "./About.module.css";

// Il resto del testo di About: chiuso finché non si tocca "Read more", si
// apre e si chiude sul posto, senza cambiare pagina
export default function ReadMore({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const restRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setOpen(!open);
    // chiudendo, se l'inizio della fascia è già sopra lo schermo ci si
    // torna, così non ci si ritrova più in basso, nel Portfolio
    const section = restRef.current?.closest("section");
    if (open && section && section.getBoundingClientRect().top < 0) {
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      section.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <>
      <div ref={restRef} className={styles.rest} data-open={open} inert={!open}>
        <div className={styles.restInner}>{children}</div>
      </div>
      <button
        type="button"
        className={`u-link ${styles.more}`}
        aria-expanded={open}
        onClick={toggle}
      >
        {open ? "Read less" : "Read more"}
      </button>
    </>
  );
}
