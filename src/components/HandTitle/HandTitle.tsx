import styles from "./HandTitle.module.css";

type Props = {
  // una riga per elemento: dalla seconda in poi rientrano un po'
  lines: string[];
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

// Titolo scritto a mano, largo e inclinato (come "design darlings" su
// alisabethdesigns.com)
export default function HandTitle({ lines, as: Tag = "h2", id, className }: Props) {
  return (
    <Tag id={id} className={`${styles.title} ${className ?? ""}`}>
      {lines.map((line, i) => (
        <span
          key={line}
          className={`${styles.line} ${i > 0 ? styles.indent : ""}`}
        >
          {line}
          {/* spazio tra le righe per chi legge il testo senza stili */}
          {i < lines.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
