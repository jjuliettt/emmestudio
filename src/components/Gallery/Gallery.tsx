"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { CategoryPhoto } from "@/lib/categoryPhotos";
import styles from "./Gallery.module.css";

type Props = {
  photos: CategoryPhoto[];
  // testo alternativo comune, con il numero della foto
  label: string;
};

type Shape = "landscape" | "portrait";

// I gruppi dell'impaginazione: una foto a tutta larghezza, una foto spostata
// a sinistra o a destra, due orizzontali affiancate, due verticali sfalsate
type Block =
  | { kind: "full"; items: [number] }
  | { kind: "offset"; items: [number]; side: "left" | "right" }
  | { kind: "pair"; items: [number, number] }
  | { kind: "stagger"; items: [number, number] };

// quasi quadrate contano come verticali: stanno meglio sfalsate
const shapeOf = (photo: CategoryPhoto): Shape =>
  photo.width / photo.height > 1.1 ? "landscape" : "portrait";

// Impaginazione da rivista, decisa dalla forma delle foto e mai due volte di
// fila lo stesso gruppo: due orizzontali vicine → affiancate; due verticali
// → sfalsate; un'orizzontale da sola → a tutta larghezza; il resto spostato
// da un lato, alternando sinistra e destra
function layout(photos: CategoryPhoto[]): Block[] {
  const blocks: Block[] = [];
  let side: "left" | "right" = "left";
  let i = 0;
  while (i < photos.length) {
    const last = blocks.at(-1)?.kind;
    const a = shapeOf(photos[i]);
    const b = i + 1 < photos.length ? shapeOf(photos[i + 1]) : null;
    if (a === "landscape" && b === "landscape" && last !== "pair") {
      blocks.push({ kind: "pair", items: [i, i + 1] });
      i += 2;
    } else if (a === "portrait" && b === "portrait" && last !== "stagger") {
      blocks.push({ kind: "stagger", items: [i, i + 1] });
      i += 2;
    } else if (a === "landscape" && last !== "full") {
      blocks.push({ kind: "full", items: [i] });
      i += 1;
    } else {
      blocks.push({ kind: "offset", items: [i], side });
      side = side === "left" ? "right" : "left";
      i += 1;
    }
  }
  return blocks;
}

// Portatile: le foto in colonne, ognuna aggiunta alla colonna più corta
// (contando le proporzioni), così le colonne finiscono quasi pari e l'ordine
// resta da sinistra a destra, dall'alto in basso
function columns(photos: CategoryPhoto[], count: number): number[][] {
  const cols: number[][] = Array.from({ length: count }, () => []);
  const heights = new Array<number>(count).fill(0);
  photos.forEach((photo, i) => {
    const shortest = heights.indexOf(Math.min(...heights));
    cols[shortest].push(i);
    heights[shortest] += photo.height / photo.width;
  });
  return cols;
}

// Foto nelle loro proporzioni, mai tagliate. Un tocco apre la foto a tutto
// schermo; si chiude con la X, toccando fuori dalla foto o con Esc. "Info"
// sfoca la foto e ne mostra i dati (dal suo file di testo; se non c'è, la
// categoria).
export default function Gallery({ photos, label }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  // cambiando foto, le informazioni si richiudono
  const show = (i: number | null) => {
    setShowInfo(false);
    setOpen(i);
  };

  useEffect(() => {
    if (open === null) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowInfo(false);
        setOpen(null);
      }
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const step = e.key === "ArrowRight" ? 1 : -1;
        setShowInfo(false);
        setOpen((i) => (i === null ? i : (i + step + photos.length) % photos.length));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      openerRef.current?.focus();
    };
  }, [open, photos.length]);

  const alt = (i: number) => `${label}, photo ${i + 1}`;
  const current = open === null ? null : photos[open];
  // senza il file di testo della foto, almeno la categoria
  const info = current?.info ?? { details: [{ label: "Category", value: label }], text: [] };

  // una miniatura: la stessa nelle due impaginazioni
  const thumb = (i: number) => (
    <button
      key={photos[i].src}
      type="button"
      className={styles.thumb}
      // le proporzioni della foto: sul portatile nessuna foto è più alta
      // dello schermo (vedi .thumb nel CSS)
      style={{ "--ratio": photos[i].width / photos[i].height } as CSSProperties}
      onClick={(e) => {
        openerRef.current = e.currentTarget;
        show(i);
      }}
      aria-label={`Open ${alt(i)}`}
    >
      <img
        src={photos[i].src}
        width={photos[i].width}
        height={photos[i].height}
        alt={alt(i)}
        loading={i < 4 ? "eager" : "lazy"}
        className={styles.image}
      />
    </button>
  );

  return (
    <>
      {/* telefono: i gruppi da rivista */}
      <div className={styles.layout}>
        {layout(photos).map((block) => (
          <div
            key={block.items[0]}
            className={styles.block}
            data-kind={block.kind}
            data-side={block.kind === "offset" ? block.side : undefined}
          >
            {block.items.map(thumb)}
          </div>
        ))}
      </div>

      {/* portatile: tre colonne sfalsate su tutta la larghezza (solo una
          delle due impaginazioni si vede, l'altra è nascosta dal CSS) */}
      <div className={styles.columns}>
        {columns(photos, 3).map((column, c) => (
          <div key={c} className={styles.column}>
            {column.map(thumb)}
          </div>
        ))}
      </div>

      {open !== null && current && (
        <div
          className={styles.viewer}
          role="dialog"
          aria-modal="true"
          aria-label={alt(open)}
          onClick={() => show(null)}
        >
          {/* la X appena sopra la foto, a destra; "info" appena sotto, a
              sinistra: stanno sul bordo di .stage, largo quanto la foto */}
          <div className={styles.stage}>
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              aria-label="Close"
              onClick={() => show(null)}
            >
              <span className={styles.closeLine} />
              <span className={styles.closeLine} />
            </button>

            {/* toccando la foto: con le informazioni aperte le richiude,
                altrimenti chiude la foto come il resto dello schermo */}
            <div
              className={styles.frame}
              onClick={(e) => {
                if (!showInfo) return;
                e.stopPropagation();
                setShowInfo(false);
              }}
            >
              <img
                src={current.src}
                width={current.width}
                height={current.height}
                alt={alt(open)}
                className={styles.full}
                data-blurred={showInfo}
              />
              {showInfo && (
                <div className={styles.info} id="photo-info">
                  <dl className={styles.details}>
                    {info.details.map((detail) => (
                      <div key={detail.label}>
                        <dt>{detail.label}</dt>
                        <dd>{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {info.text.map((line) => (
                    <p key={line} className={styles.text}>
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className={styles.infoButton}
              aria-expanded={showInfo}
              aria-controls="photo-info"
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo((value) => !value);
              }}
            >
              {/* la "i" nel cerchio, disegnata */}
              <svg viewBox="0 0 20 20" className={styles.infoIcon} aria-hidden="true">
                <circle cx="10" cy="10" r="8.6" />
                <path d="M10 8.6v5.6" />
                <circle cx="10" cy="5.9" r="0.4" className={styles.infoDot} />
              </svg>
              Info
            </button>
          </div>
        </div>
      )}
    </>
  );
}
