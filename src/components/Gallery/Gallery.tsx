"use client";

import { useEffect, useRef, useState } from "react";
import type { CategoryPhoto } from "@/lib/categoryPhotos";
import styles from "./Gallery.module.css";

type Props = {
  photos: CategoryPhoto[];
  // testo alternativo comune, con il numero della foto
  label: string;
};

// Griglia a due colonne, spazi uguali, foto nelle loro proporzioni. Un tocco
// apre la foto a tutto schermo; si chiude toccando, con la X o con Esc.
export default function Gallery({ photos, label }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open === null) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      openerRef.current?.focus();
    };
  }, [open, photos.length]);

  const alt = (i: number) => `${label}, photo ${i + 1}`;

  return (
    <>
      <ul className={styles.grid}>
        {photos.map((photo, i) => (
          <li key={photo.src} className={styles.item}>
            <button
              type="button"
              className={styles.thumb}
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={`Open ${alt(i)}`}
            >
              <img
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={alt(i)}
                loading={i < 4 ? "eager" : "lazy"}
                className={styles.image}
              />
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div
          className={styles.viewer}
          role="dialog"
          aria-modal="true"
          aria-label={alt(open)}
          onClick={() => setOpen(null)}
        >
          <img
            src={photos[open].src}
            width={photos[open].width}
            height={photos[open].height}
            alt={alt(open)}
            className={styles.full}
          />
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            aria-label="Close"
            onClick={() => setOpen(null)}
          >
            <span className={styles.closeLine} />
            <span className={styles.closeLine} />
          </button>
        </div>
      )}
    </>
  );
}
