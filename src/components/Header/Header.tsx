"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolioCategories";
import styles from "./Header.module.css";

const PAGES = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/#about" },
  { label: "Prices", href: "/prices" },
  { label: "Contacts", href: "/contacts" },
];

// Sotto questa soglia l'header resta visibile: evita che sparisca per un
// mezzo swipe in cima alla pagina
const HIDE_THRESHOLD = 80;

// la voce della pagina in cui si è (le categorie contano come Portfolio)
const isCurrent = (href: string, path: string) =>
  href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Appare scorrendo verso l'alto, sparisce scorrendo verso il basso
  const [hidden, setHidden] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Safari su iPhone applica :active (l'effetto al tocco delle copertine)
  // solo se la pagina ascolta i tocchi: un ascoltatore vuoto basta
  useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);

  // Menu aperto: pagina ferma sotto, fuoco sulla X; alla chiusura il fuoco
  // torna sull'icona del menu
  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = open ? "hidden" : "";
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    else if (wasOpen.current) burgerRef.current?.focus();
    wasOpen.current = open;
    return () => {
      root.style.overflow = "";
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
          ref={burgerRef}
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

        {/* dal portatile: le voci sempre visibili, al posto dell'icona */}
        <nav className={styles.inlineNav} aria-label="Main">
          {PAGES.map((page) => (
            <div key={page.href} className={styles.inlineItem}>
              <Link
                href={page.href}
                className={styles.inlineLink}
                aria-current={isCurrent(page.href, pathname) ? "page" : undefined}
              >
                {page.label}
              </Link>

              {/* passando su PORTFOLIO (o col tasto Tab) compaiono sotto le
                  tre categorie, più chiare */}
              {page.href === "/portfolio" && (
                <div className={styles.sub}>
                  {PORTFOLIO_CATEGORIES.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className={`${styles.inlineLink} ${styles.subLink}`}
                      aria-current={pathname === category.href ? "page" : undefined}
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Menu a schermo intero: la X sta dove c'è l'icona del menu */}
      <div
        className={styles.panel}
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
      >
        <div className={styles.bar}>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            tabIndex={open ? undefined : -1}
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
              tabIndex={open ? undefined : -1}
            >
              {page.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
