import { isValidEmail } from "@/lib/forms";
import { field, resendConfig, sendEmail } from "@/lib/resend";

// Modulo contatti: il messaggio arriva a Elisa (CONTACT_TO_EMAIL), e
// "Rispondi" risponde a chi ha scritto. Variabili: vedi lib/resend.ts
export async function POST(request: Request) {
  const config = resendConfig();
  if (!config) {
    console.error("Contact form: RESEND_API_KEY o CONTACT_TO_EMAIL mancanti");
    return Response.json({ error: "not-configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // stessi controlli del modulo: dal browser si possono aggirare
  const name = field(body.name, 200);
  const email = field(body.email, 320);
  const interest = field(body.interest, 100);
  const when = field(body.when, 200);
  const message = field(body.message, 5000);
  if (!name || !isValidEmail(email) || !interest || !message || body.consent !== true) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const ok = await sendEmail(config, {
    to: config.owner,
    replyTo: email,
    subject: `EM Photo | Nuova richiesta di contatto da ${name}`,
    text: [
      "Dati del contatto",
      "",
      `Nome: ${name}`,
      `Email: ${email}`,
      `Interessata/o a: ${interest}`,
      `Data o periodo: ${when || "-"}`,
      "",
      "Messaggio:",
      message,
    ].join("\n"),
  });

  if (!ok) return Response.json({ error: "send-failed" }, { status: 502 });
  return Response.json({ ok: true });
}
