import localFont from "next/font/local";

// Font auto-ospitati: file .woff2 (sottoinsieme "latin") in ./fonts,
// scaricati da Google Fonts invece di farli scaricare a next/font in build.
//
// Calgary e Constanley (con licenza) non passano da qui: sono in
// public/webfonts/ e dichiarati in globals.css, così basta aggiungere i file.

// Solo per il menu a schermo intero
export const menuSans = localFont({
  src: [
    {
      path: "./fonts/Quicksand-Variable.woff2",
      weight: "400 500",
      style: "normal",
    },
  ],
  variable: "--font-quicksand",
});

// Scrittura a mano (font libero OFL) per la riga sopra le copertine del
// portfolio: sta al posto del font scritto a mano che verrà comprato
export const handwriting = localFont({
  src: [
    {
      path: "./fonts/HerrVonMuellerhoff-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-handwriting",
});
