import localFont from "next/font/local";

// Font auto-ospitati (licenza OFL): file .woff2 (sottoinsieme "latin") in
// ./fonts, scaricati da Google Fonts. Il sito non chiede niente a Google.
//
// Il corsivo (Snell Roundhand) è un font di sistema Apple e il font scritto
// a mano dei titoli è in public/assets/REPLACE-ME/: vedi globals.css.

// Font 1: tutto il testo. 200 per i testi grandi, 300 per quelli piccoli
export const spectral = localFont({
  src: [
    { path: "./fonts/Spectral-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "./fonts/Spectral-Light.woff2", weight: "300", style: "normal" },
  ],
  variable: "--font-spectral",
});

// 700 corsivo, solo per "Welcome to". È una famiglia a parte: se stesse
// con le altre due, ogni corsivo del sito (<em>) diventerebbe grassetto
export const spectralBoldItalic = localFont({
  src: [
    { path: "./fonts/Spectral-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-spectral-bold-italic",
});

// Font 3: solo il menu e le etichette dei campi dei moduli
export const menuSans = localFont({
  src: [
    {
      path: "./fonts/Quicksand-Variable.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-quicksand",
});
