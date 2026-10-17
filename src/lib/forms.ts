// Regole comuni ai moduli (guida prezzi e contatti)

// Controllo semplice ma sufficiente: qualcosa@dominio.estensione, senza spazi
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

// Le tre categorie della pagina prezzi: valore del menu a tendina, nome
// mostrato e id della sezione nella pagina
export const GUIDE_CATEGORIES = [
  { value: "private", label: "Private", sectionId: "private" },
  { value: "small-businesses", label: "Small Businesses", sectionId: "small-businesses" },
  { value: "companies-events", label: "Companies & Events", sectionId: "companies-events" },
] as const;

export type GuideCategory = (typeof GUIDE_CATEGORIES)[number]["value"];

export const PRICE_GUIDE_ID = "price-guide";

// I pulsanti "Get the full guide" mandano questo evento al modulo per
// preselezionare la categoria
export const GUIDE_SELECT_EVENT = "price-guide:select";
