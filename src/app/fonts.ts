import localFont from "next/font/local";

// Font auto-ospitati: file .woff2 (sottoinsieme "latin") in ./fonts,
// scaricati da Google Fonts invece di farli scaricare a next/font in build.

// cassidylynnephoto.com usa "Branch" (font a pagamento): Instrument Serif
// è l'alternativa gratuita più vicina (serif alto e stretto, con corsivo).
export const displaySerif = localFont({
  src: [
    { path: "./fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
});

// Maiuscolo piccolo e spaziato (etichette, link) e testo corrente
export const captionSans = localFont({
  src: [
    { path: "./fonts/SourceSans3-Variable.woff2", weight: "200 900", style: "normal" },
    { path: "./fonts/SourceSans3-Italic-Variable.woff2", weight: "200 900", style: "italic" },
  ],
  variable: "--font-source-sans",
});

// Corsivo scritto a mano: etichette delle sezioni e firma
export const handScript = localFont({
  src: [{ path: "./fonts/Allura-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-allura",
});

// Testata delle copertine portfolio, stile rivista (Vogue)
export const displayMasthead = localFont({
  src: [
    { path: "./fonts/BodoniModa-Variable.woff2", weight: "400 500", style: "normal" },
    { path: "./fonts/BodoniModa-Italic-Variable.woff2", weight: "400 500", style: "italic" },
  ],
  variable: "--font-bodoni-moda",
});
