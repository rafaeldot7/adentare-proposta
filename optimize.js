import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const srcDir = "assets";
const outDir = "assets/opt";
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

// [file, maxWidth, quality]
const jobs = [
  ["logo.png", 500, 90],
  ["hero-paciente.png", 900, 82],
  ["itero.png", 500, 82],
  ["pet-corner.jpg", 500, 78],
  ["descarte.jpg", 700, 78],
];

for (const [file, width, quality] of jobs) {
  const inPath = path.join(srcDir, file);
  const base = file.replace(/\.(jpg|jpeg|png)$/i, "");
  const outPath = path.join(outDir, `${base}.webp`);
  await sharp(inPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outPath);
  console.log(`${file} -> ${outPath}`);
}
