import fs from "node:fs";
import path from "node:path";

// Controllo fatto al momento della build (le pagine sono statiche): serve per
// file che arrivano più tardi, come i font con licenza o la firma.
export function publicFileExists(href: string) {
  return fs.existsSync(path.join(process.cwd(), "public", href));
}

// Font con licenza web forniti da Elisa: vanno messi in public/webfonts/ con
// questi nomi esatti (vedi le @font-face in globals.css). Finché mancano il
// sito usa i font di riserva e non li precarica.
export const LICENSED_FONTS = [
  "/webfonts/calgary-regular.woff2",
  "/webfonts/constanley-regular.woff2",
];
