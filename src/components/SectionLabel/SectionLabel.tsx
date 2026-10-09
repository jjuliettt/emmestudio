import styles from "./SectionLabel.module.css";

type Props = {
  children: React.ReactNode;
  // posizione (e colore, se diverso) decisi dalla sezione che la usa
  className?: string;
};

// Etichetta scritta a mano in testa alle sezioni ("about me", "my work"...)
export default function SectionLabel({ children, className }: Props) {
  return (
    <h2 className={className ? `${styles.label} ${className}` : styles.label}>
      {children}
    </h2>
  );
}
