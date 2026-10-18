import { publicFileExists } from "@/lib/publicFiles";
import styles from "./HandTitle.module.css";

// Gli spazi scritti a mano: l'immagine in public/assets/REPLACE-ME/ con il
// nome dello spazio (REPLACE-ME_hw-<slot>.png/.svg/.webp). Se manca, il
// testo nel font --font-handwriting (per ora Tangerine).
export type HandSlot = "selected-work" | "love-notes";

const EXTENSIONS = ["png", "svg", "webp"];

type Props = {
  slot: HandSlot;
  // una riga per elemento: dalla seconda in poi rientrano un po'
  lines: string[];
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export default function HandTitle({ slot, lines, as: Tag = "h2", id, className }: Props) {
  const image = EXTENSIONS.map(
    (ext) => `/assets/REPLACE-ME/REPLACE-ME_hw-${slot}.${ext}`
  ).find(publicFileExists);

  return (
    <Tag
      id={id}
      className={`${styles.title} ${className ?? ""}`}
      data-slot={slot}
      data-image={image ? true : undefined}
    >
      {image ? (
        <img src={image} alt={lines.join(" ")} className={styles.image} />
      ) : (
        lines.map((line, i) => (
          <span
            key={line}
            className={`${styles.line} ${i > 0 ? styles.indent : ""}`}
          >
            {line}
            {/* spazio tra le righe per chi legge il testo senza stili */}
            {i < lines.length - 1 && " "}
          </span>
        ))
      )}
    </Tag>
  );
}
