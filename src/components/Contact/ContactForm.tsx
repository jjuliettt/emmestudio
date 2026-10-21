"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Field, controlProps } from "@/components/Forms/Fields";
import Select from "@/components/Forms/Select";
import { isValidEmail } from "@/lib/forms";
import styles from "@/components/Forms/Form.module.css";

// il valore è il nome stesso: arriva così nell'email
// (gli stessi nomi delle categorie del sito)
const INTERESTS = ["Private People", "Small Businesses", "Companies & Events", "Something else"].map(
  (label) => ({ value: label, label })
);

type Values = {
  name: string;
  email: string;
  interest: string;
  when: string;
  message: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  name: "",
  email: "",
  interest: "",
  when: "",
  message: "",
  consent: false,
};

// id dei campi, nell'ordine della pagina: il primo errore riceve il fuoco
const IDS = {
  name: "contact-name",
  email: "contact-email",
  interest: "contact-interest",
  when: "contact-when",
  message: "contact-message",
  consent: "contact-consent",
} as const;
const ORDER = Object.keys(IDS) as (keyof typeof IDS)[];

// data o periodo: facoltativo
function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!isValidEmail(values.email))
    errors.email = "Please check your email address.";
  if (!values.interest) errors.interest = "Please choose what you're interested in.";
  if (!values.message.trim()) errors.message = "Please write a short message.";
  if (!values.consent)
    errors.consent = "Please tick this box so I can answer your message.";
  return errors;
}

// Modulo contatti: controlla i dati e li manda a /api/contact, che invia
// l'email con Resend.
export default function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  // dopo il primo invio gli errori si aggiornano mentre si scrive
  const [attempted, setAttempted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [sent, setSent] = useState(false);
  const thanksRef = useRef<HTMLParagraphElement>(null);

  const update = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (attempted) setErrors(validate(next));
  };

  useEffect(() => {
    if (sent) thanksRef.current?.focus();
  }, [sent]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const found = validate(values);
    setErrors(found);
    setAttempted(true);
    const first = ORDER.find((key) => found[key]);
    if (first) {
      document.getElementById(IDS[first])?.focus();
      return;
    }

    setSending(true);
    setSendError(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(String(response.status));
      setSent(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <p ref={thanksRef} className={styles.thanks} tabIndex={-1} role="status">
        Thank you! I&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <Field id={IDS.name} label="Name" error={errors.name}>
        <input
          type="text"
          {...controlProps(IDS.name, errors.name)}
          className={styles.input}
          autoComplete="name"
          autoCapitalize="words"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </Field>

      <Field id={IDS.email} label="Email" error={errors.email}>
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

      <Field id={IDS.interest} label="I'm interested in" error={errors.interest}>
        <Select
          id={IDS.interest}
          options={INTERESTS}
          value={values.interest}
          onChange={(value) => update("interest", value)}
          placeholder="Choose one"
          error={errors.interest}
        />
      </Field>

      <Field id={IDS.when} label="Date or period" optional>
        <input
          type="text"
          {...controlProps(IDS.when)}
          className={styles.input}
          placeholder="e.g. a Saturday in May"
          value={values.when}
          onChange={(e) => update("when", e.target.value)}
        />
      </Field>

      <Field id={IDS.message} label="Message" error={errors.message}>
        <textarea
          {...controlProps(IDS.message, errors.message)}
          className={`${styles.input} ${styles.textarea}`}
          rows={6}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </Field>

      <Check
        id={IDS.consent}
        checked={values.consent}
        onChange={(checked) => update("consent", checked)}
        error={errors.consent}
      >
        I agree that my details are used to answer my message.
      </Check>

      <p className={styles.privacy}>
        How your details are used:{" "}
        <Link href="/privacy-policy" className={styles.privacyLink}>
          Privacy &amp; Legal
        </Link>
      </p>

      {sendError && (
        <p className={styles.error} role="alert">
          Sorry, the message couldn&apos;t be sent. Please try again in a moment.
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
