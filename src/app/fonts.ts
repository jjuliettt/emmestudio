import localFont from "next/font/local";

// Font auto-ospitati (licenza OFL): file .woff2 (sottoinsieme "latin") in
// ./fonts, scaricati da Google Fonts. Il sito non chiede niente a Google.

// Font 1: tutto il testo. 200 per i testi grandi, 300 per quelli piccoli,
// 700 solo dove è previsto il grassetto (titoli delle pagine, "Welcome to",
// SMALL BUSINESSES, titoletti di Privacy & Legal)
export const spectral = localFont({
  src: [
    { path: "./fonts/Spectral-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "./fonts/Spectral-ExtraLightItalic.woff2", weight: "200", style: "italic" },
    { path: "./fonts/Spectral-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Spectral-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "./fonts/Spectral-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Spectral-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-spectral",
});

// Font 2: le parole in corsivo. 700 solo per i titoli delle tre categorie
// nella pagina prezzi; tutto il resto 400
export const tangerine = localFont({
  src: [
    { path: "./fonts/Tangerine-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Tangerine-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-tangerine",
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
