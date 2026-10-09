// Stagione meteorologica per mese (0 = gennaio): decide il colore --accent
// (vedi globals.css)
const SEASON_BY_MONTH = [
  "winter",
  "winter",
  "spring",
  "spring",
  "spring",
  "summer",
  "summer",
  "summer",
  "autumn",
  "autumn",
  "autumn",
  "winter",
] as const;

export type Season = (typeof SEASON_BY_MONTH)[number];

// Valore di partenza scritto nell'HTML al momento della build
export function seasonOf(date: Date): Season {
  return SEASON_BY_MONTH[date.getMonth()];
}

// Gira nel <head> prima del primo disegno, così il colore sbagliato non
// compare mai: aggiorna la stagione alla data di chi visita e attiva la
// variante B ("boldest") se l'indirizzo contiene ?style=boldest
export const HEAD_SCRIPT = `(function(){var d=document.documentElement;d.dataset.season=${JSON.stringify(
  SEASON_BY_MONTH
)}[new Date().getMonth()];if(/[?&]style=boldest(&|$)/.test(location.search))d.dataset.style="boldest"})()`;
