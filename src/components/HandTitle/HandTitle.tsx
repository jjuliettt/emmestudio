import { publicFileExists } from "@/lib/publicFiles";
import styles from "./HandTitle.module.css";

// Gli spazi per i titoli scritti a mano. Il testo usa --font-handwriting
// (per ora Allura); se in public/assets/REPLACE-ME/ c'è un'immagine con il
// nome dello spazio (REPLACE-ME_hw-<slot>.svg/.png/.webp), si usa quella.
export type HandSlot = "favorite-frames" | "price-guide";

const EXTENSIONS = ["svg", "png", "webp"];

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
    <Tag id={id} className={`${styles.title} ${className ?? ""}`} data-slot={slot}>
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
