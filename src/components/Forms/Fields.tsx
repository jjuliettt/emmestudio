import type { ReactNode } from "react";
import styles from "./Form.module.css";

// Attributi comuni a ogni campo: id, nome e collegamento al messaggio
// d'errore per chi usa un lettore di schermo
export function controlProps(id: string, error?: string) {
  return {
    id,
    name: id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className={styles.error}>
      {error}
    </p>
  );
}

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
};

// Etichetta piccola in maiuscolo, il campo e, sotto, l'eventuale errore
export function Field({ id, label, error, optional, children }: FieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optional && <span className={styles.optional}> (optional)</span>}
      </label>
      {children}
      <FieldError id={id} error={error} />
    </div>
  );
}

type CheckProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
};

// Casella quadrata con la frase accanto
export function Check({ id, checked, onChange, error, children }: CheckProps) {
  return (
    <div>
      <div className={styles.check}>
        <input
          type="checkbox"
          {...controlProps(id, error)}
          className={styles.checkbox}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <label htmlFor={id} className={styles.checkLabel}>
          {children}
        </label>
      </div>
      <FieldError id={id} error={error} />
    </div>
  );
}
