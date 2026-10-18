"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import styles from "./Form.module.css";

export type SelectOption = { value: string; label: string };

type Props = {
  id: string;
  options: readonly SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
};

// Menu a tendina fatto a mano, al posto del <select>: su iPhone la lista
// nativa ignora i font della pagina. Pulsante + lista (ruolo "listbox"),
// con frecce, Home/Fine, Invio/Spazio, Esc e ricerca per iniziale.
export default function Select({ id, options, value, onChange, placeholder, error }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = options[selectedIndex];
  const listId = `${id}-list`;
  const optionId = (i: number) => `${id}-option-${i}`;

  const openList = (index = selectedIndex) => {
    setActive(index >= 0 ? index : 0);
    setOpen(true);
  };

  const close = (focusButton = true) => {
    setOpen(false);
    if (focusButton) buttonRef.current?.focus();
  };

  const choose = (index: number) => {
    onChange(options[index].value);
    close();
  };

  // aperta: il fuoco va sulla lista; un tocco fuori la chiude
  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // la voce attiva resta visibile se la lista scorre
  useEffect(() => {
    if (open) document.getElementById(optionId(active))?.scrollIntoView({ block: "nearest" });
  });

  const onButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openList(e.key === "ArrowUp" && selectedIndex < 0 ? options.length - 1 : selectedIndex);
    }
  };

  const onListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const last = options.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(last, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
      default:
        // una lettera porta alla prima voce che comincia così
        if (e.key.length === 1) {
          const letter = e.key.toLowerCase();
          const match = options.findIndex((option) => option.label.toLowerCase().startsWith(letter));
          if (match >= 0) setActive(match);
        }
    }
  };

  return (
    <div ref={wrapRef} className={styles.selectWrap}>
      <button
        ref={buttonRef}
        type="button"
        id={id}
        className={`${styles.input} ${styles.select}`}
        data-empty={!selected}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${id}-label ${id}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onButtonKeyDown}
      >
        {selected ? selected.label : placeholder}
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          className={styles.listbox}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={optionId(active)}
          onKeyDown={onListKeyDown}
        >
          {options.map((option, i) => (
            <li
              key={option.value}
              id={optionId(i)}
              role="option"
              aria-selected={option.value === value}
              data-active={i === active}
              className={styles.option}
              onPointerMove={() => setActive(i)}
              onClick={() => choose(i)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
