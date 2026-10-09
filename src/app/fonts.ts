import { Allura, Instrument_Serif, Source_Sans_3 } from "next/font/google";

// cassidylynnephoto.com usa "Branch" (font a pagamento): Instrument Serif
// è l'alternativa gratuita più vicina (serif alto e stretto, con corsivo).
export const displaySerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

// Maiuscolo piccolo e spaziato (etichette, link) e testo corrente
export const captionSans = Source_Sans_3({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-source-sans",
});

// Corsivo scritto a mano: etichette delle sezioni e firma
export const handScript = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allura",
});
