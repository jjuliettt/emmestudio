import fs from "node:fs";
import path from "node:path";

// Foto delle pagine delle categorie: i file in public/assets/REPLACE-ME/
// che si chiamano REPLACE-ME_<categoria>-01.jpg, -02.jpg, ... (anche .png o
// .webp), in ordine di numero. Si leggono al momento della build: per
// aggiungere, togliere o cambiare una foto basta il file.
//
// Le informazioni di una foto (il pulsante "info" a schermo intero) stanno in
// un file di testo con lo stesso nome: REPLACE-ME_events-01.txt. Una riga
// "Nome: valore" per ogni dato (Type: …, Setting: …, Date: …); le altre righe
// sono il testo libero. Senza file, niente pulsante.
const FOLDER = path.join(process.cwd(), "public", "assets", "REPLACE-ME");

export type PhotoInfo = {
  details: { label: string; value: string }[];
  text: string[];
};

export type CategoryPhoto = {
  src: string;
  width: number;
  height: number;
  info?: PhotoInfo;
};

export function categoryPhotos(slug: string): CategoryPhoto[] {
  const pattern = new RegExp(`^REPLACE-ME_${slug}-(\\d+)\\.(jpe?g|png|webp)$`, "i");
  const files = fs.existsSync(FOLDER) ? fs.readdirSync(FOLDER) : [];
  return files
    .map((file) => ({ file, match: file.match(pattern) }))
    .filter((entry) => entry.match)
    .sort((a, b) => Number(a.match![1]) - Number(b.match![1]))
    .map(({ file }) => {
      const size = imageSize(path.join(FOLDER, file));
      const info = photoInfo(path.join(FOLDER, file.replace(/\.\w+$/, ".txt")));
      return { src: `/assets/REPLACE-ME/${file}`, ...size, ...(info && { info }) };
    });
}

// "Date: May 2025" → dato; le righe senza "Nome:" davanti → testo. Il nome è
// fatto solo di lettere e spazi, così un orario ("alle 10:30") resta testo
function photoInfo(file: string): PhotoInfo | undefined {
  if (!fs.existsSync(file)) return undefined;
  const info: PhotoInfo = { details: [], text: [] };
  for (const raw of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const detail = line.match(/^([\p{L} &'’-]{1,24}):\s+(.+)$/u);
    if (detail) info.details.push({ label: detail[1].trim(), value: detail[2].trim() });
    else info.text.push(line);
  }
  return info.details.length || info.text.length ? info : undefined;
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
