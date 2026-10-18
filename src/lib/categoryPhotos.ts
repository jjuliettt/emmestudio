import fs from "node:fs";
import path from "node:path";

// Foto delle pagine delle categorie: i file in public/assets/REPLACE-ME/
// che si chiamano REPLACE-ME_<categoria>-01.jpg, -02.jpg, ... (anche .png o
// .webp), in ordine di numero. Si leggono al momento della build: per
// aggiungere, togliere o cambiare una foto basta il file.
const FOLDER = path.join(process.cwd(), "public", "assets", "REPLACE-ME");

export type CategoryPhoto = { src: string; width: number; height: number };

export function categoryPhotos(slug: string): CategoryPhoto[] {
  const pattern = new RegExp(`^REPLACE-ME_${slug}-(\\d+)\\.(jpe?g|png|webp)$`, "i");
  const files = fs.existsSync(FOLDER) ? fs.readdirSync(FOLDER) : [];
  return files
    .map((file) => ({ file, match: file.match(pattern) }))
    .filter((entry) => entry.match)
    .sort((a, b) => Number(a.match![1]) - Number(b.match![1]))
    .map(({ file }) => {
      const size = imageSize(path.join(FOLDER, file));
      return { src: `/assets/REPLACE-ME/${file}`, ...size };
    });
}

// Larghezza e altezza leggendo l'intestazione del file (JPEG, PNG, WebP):
// servono perché la griglia non salti mentre le foto si caricano
function imageSize(file: string) {
  const data = fs.readFileSync(file);

  // PNG: subito dopo la firma, nel blocco IHDR
  if (data.readUInt32BE(0) === 0x89504e47) {
    return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  }

  // WebP (VP8X, VP8L o VP8)
  if (data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP") {
    const chunk = data.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return { width: 1 + data.readUIntLE(24, 3), height: 1 + data.readUIntLE(27, 3) };
    }
    if (chunk === "VP8L") {
      const bits = data.readUInt32LE(21);
      return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
    }
    return { width: data.readUInt16LE(26) & 0x3fff, height: data.readUInt16LE(28) & 0x3fff };
  }

  // JPEG: il primo segmento SOF ha le misure
  let offset = 2;
  while (offset < data.length) {
    const marker = data[offset + 1];
    const length = data.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { width: data.readUInt16BE(offset + 7), height: data.readUInt16BE(offset + 5) };
    }
    offset += 2 + length;
  }
  return { width: 1, height: 1 };
}
