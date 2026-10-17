"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Field, controlProps } from "@/components/Forms/Fields";
import {
  GUIDE_CATEGORIES,
  GUIDE_SELECT_EVENT,
  isValidEmail,
  type GuideCategory,
} from "@/lib/forms";
import styles from "@/components/Forms/Form.module.css";

type Values = {
  firstName: string;
  email: string;
  category: GuideCategory | "";
  consent: boolean;
  followUp: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  firstName: "",
  email: "",
  category: "",
  consent: false,
  // facoltativa: parte sempre non spuntata
  followUp: false,
};

// id dei campi, nell'ordine della pagina: il primo errore riceve il fuoco
const IDS = {
  firstName: "guide-first-name",
  email: "guide-email",
  category: "guide-category",
  consent: "guide-consent",
} as const;
const ORDER = Object.keys(IDS) as (keyof typeof IDS)[];

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.firstName.trim()) errors.firstName = "Please enter your first name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!isValidEmail(values.email))
    errors.email = "Please check your email address.";
  if (!values.category) errors.category = "Please choose what you're interested in.";
  if (!values.consent)
    errors.consent = "Please tick this box so I can send you the guide.";
  return errors;
}

// Modulo per ricevere la guida prezzi. Per ora controlla i dati e mostra il
// grazie, ma non invia niente: il collegamento a Brevo arriva nella fase 2.
export default function PriceGuideForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  // dopo il primo invio gli errori si aggiornano mentre si scrive
  const [attempted, setAttempted] = useState(false);
  const [sent, setSent] = useState(false);
  const thanksRef = useRef<HTMLParagraphElement>(null);

  const update = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (attempted) setErrors(validate(next));
  };

  // I pulsanti delle sezioni preselezionano la categoria
  useEffect(() => {
    const onSelect = (e: Event) => {
      const category = (e as CustomEvent<GuideCategory>).detail;
      setValues((current) => ({ ...current, category }));
      setErrors((current) => ({ ...current, category: undefined }));
    };
    window.addEventListener(GUIDE_SELECT_EVENT, onSelect);
    return () => window.removeEventListener(GUIDE_SELECT_EVENT, onSelect);
  }, []);

  useEffect(() => {
    if (sent) thanksRef.current?.focus();
  }, [sent]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setAttempted(true);
    const first = ORDER.find((key) => found[key]);
    if (first) {
      document.getElementById(IDS[first])?.focus();
      return;
    }
    // TODO fase 2: inviare a Brevo (nome, email, categoria, data, consenso
    // ai follow-up) tramite una route del server, con la chiave API nelle
    // variabili d'ambiente
    setSent(true);
  };

  if (sent) {
    return (
      <p ref={thanksRef} className={styles.thanks} tabIndex={-1} role="status">
        Thank you! Check your inbox (and spam, just in case).
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <Field id={IDS.firstName} label="First name" error={errors.firstName}>
        <input
          type="text"
          {...controlProps(IDS.firstName, errors.firstName)}
          className={styles.input}
          autoComplete="given-name"
          autoCapitalize="words"
          value={values.firstName}
          onChange={(e) => update("firstName", e.target.value)}
        />
      </Field>

      <Field id={IDS.email} label="Email address" error={errors.email}>
        <input
          type="email"
          {...controlProps(IDS.email, errors.email)}
          className={styles.input}
          autoComplete="email"
          inputMode="email"
          autoCapitalize="off"
          spellCheck={false}
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </Field>

      <Field id={IDS.category} label="I'm interested in" error={errors.category}>
        <select
          {...controlProps(IDS.category, errors.category)}
          className={`${styles.input} ${styles.select}`}
          data-empty={values.category === ""}
          value={values.category}
          onChange={(e) => update("category", e.target.value as GuideCategory)}
        >
          <option value="" disabled>
            Choose one
          </option>
          {GUIDE_CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </Field>

      <Check
        id={IDS.consent}
        checked={values.consent}
        onChange={(checked) => update("consent", checked)}
        error={errors.consent}
      >
        I agree to receive the price guide by email.
      </Check>

      <Check
        id="guide-follow-up"
        checked={values.followUp}
        onChange={(checked) => update("followUp", checked)}
      >
        I&apos;d also like occasional follow-up emails from Elisa. I can
        unsubscribe at any time.
      </Check>

      <p className={styles.privacy}>
        How your details are used:{" "}
        <Link href="/privacy-policy" className="u-link">
          Privacy &amp; Legal
        </Link>
      </p>

      <button type="submit" className={styles.submit}>
        Send me the guide
      </button>
    </form>
  );
}
