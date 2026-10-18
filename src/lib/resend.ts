// Invio email con Resend (https://resend.com/docs/api-reference/emails/send-email),
// usato dalle route dei moduli. Variabili in .env.local (mai nel codice):
// - RESEND_API_KEY: la chiave API di Resend
// - CONTACT_TO_EMAIL: dove arrivano i messaggi e le richieste della guida.
//   Finché il dominio non è verificato su Resend può essere solo l'email
//   dell'account Resend
// - CONTACT_FROM_EMAIL (facoltativa): mittente. Senza dominio verificato
//   resta l'indirizzo di prova di Resend
const FROM_DEFAULT = "Elisa Massetti Photo <onboarding@resend.dev>";

export type Attachment = { filename: string; content: string }; // content in base64

type Email = {
  to: string;
  subject: string;
  // solo testo semplice: niente HTML costruito con quello che scrive l'utente
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
};

export function resendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const owner = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !owner) return null;
  return { apiKey, owner, from: process.env.CONTACT_FROM_EMAIL || FROM_DEFAULT };
}

export async function sendEmail(
  config: NonNullable<ReturnType<typeof resendConfig>>,
  email: Email
) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [email.to],
      reply_to: email.replyTo,
      subject: email.subject,
      text: email.text,
      attachments: email.attachments,
    }),
  });
  if (!response.ok) {
    console.error("Resend ha risposto", response.status, await response.text());
  }
  return response.ok;
}

// i campi arrivano dal browser: solo stringhe, senza spazi ai lati, accorciate
export const field = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";
