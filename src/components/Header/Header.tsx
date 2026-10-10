"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const PAGES = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Prices", href: "/prices" },
  { label: "Contacts", href: "/contacts" },
];

// Sotto questa soglia l'header resta visibile: evita che sparisca per un
// mezzo swipe in cima alla pagina
const HIDE_THRESHOLD = 80;

export default function Header() {
  const [open, setOpen] = useState(false);
  // Appare scorrendo verso l'alto, sparisce scorrendo verso il basso
  const [hidden, setHidden] = useState(false);

  // Blocca lo scroll del body quando il menu e' aperto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Col menu aperto l'header resta sempre visibile
  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

  // Direzione dello scroll: giu' nasconde, su mostra
  useEffect(() => {
    if (open) return;
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setHidden(y > lastY && y > HIDE_THRESHOLD);
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Chiusura con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header} data-hidden={hidden}>
      <div className={styles.bar}>
        <button
          type="button"
          className={styles.burger}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>

        <Link href="/" className={styles.name}>
          Elisa Massetti
        </Link>
      </div>

      {/* Overlay cliccabile per chiudere */}
      <div
        className={styles.overlay}
        data-open={open}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Pannello del menu */}
      <div className={styles.panel} data-open={open} role="dialog" aria-modal="true">
        <div className={styles.panelBar}>
          <button
            type="button"
            className={styles.close}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <span className={styles.closeLine} />
            <span className={styles.closeLine} />
          </button>

          <span className={styles.name}>Elisa Massetti</span>
        </div>

        <nav className={styles.nav}>
          {PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className={styles.navLink}
              onClick={() => setOpen(false)}
            >
              {page.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
