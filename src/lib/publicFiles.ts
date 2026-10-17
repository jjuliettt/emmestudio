import fs from "node:fs";
import path from "node:path";

// Controllo fatto al momento della build (le pagine sono statiche): serve per
// file che arrivano più tardi, come le foto e le immagini da sostituire.
export function publicFileExists(href: string) {
  return fs.existsSync(path.join(process.cwd(), "public", href));
}
