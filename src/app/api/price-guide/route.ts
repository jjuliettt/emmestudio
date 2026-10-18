import { EMAIL } from "@/lib/contacts";
import { GUIDE_CATEGORIES, isValidEmail } from "@/lib/forms";
import { field, resendConfig, sendEmail } from "@/lib/resend";

// Modulo guida prezzi, con Resend. Due email:
// 1. a chi la chiede: ringraziamento (per ora senza allegato)
// 2. a Elisa (CONTACT_TO_EMAIL): i dati compilati nel modulo
// Variabili: vedi lib/resend.ts
export async function POST(request: Request) {
  const config = resendConfig();
  if (!config) {
    console.error("Price guide: RESEND_API_KEY o CONTACT_TO_EMAIL mancanti");
    return Response.json({ error: "not-configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // stessi controlli del modulo: dal browser si possono aggirare
  const firstName = field(body.firstName, 200);
  const email = field(body.email, 320);
  const category = GUIDE_CATEGORIES.find((c) => c.value === body.category);
  const followUp = body.followUp === true;
  if (!firstName || !isValidEmail(email) || !category || body.consent !== true) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const toRequester = await sendEmail(config, {
    to: email,
    replyTo: config.owner,
    subject: "EM Photo | Pricing",
    text: [
      `Hi ${firstName},`,
      "",
      "Thank you for getting in touch! You'll find the price list you requested attached to this email.",
      "",
      `If you have any other questions, don't hesitate to write to me at ${EMAIL}.`,
      "",
      "Elisa",
    ].join("\n"),
  });
  if (!toRequester) return Response.json({ error: "send-failed" }, { status: 502 });

  // l'avviso a Elisa non blocca: chi ha chiesto la guida l'ha già ricevuta
  await sendEmail(config, {
    to: config.owner,
    replyTo: email,
    subject: `EM Photo | Nuova richiesta di Pricing da ${email}`,
    text: [
      `Nome: ${firstName}`,
      `Email: ${email}`,
      `Interessata/o a: ${category.label}`,
      `Consenso a ricevere la guida: sì`,
      `Consenso ad altre email: ${followUp ? "sì" : "no"}`,
    ].join("\n"),
  });

  return Response.json({ ok: true });
}
