// Generate PWA icons from SVG source
import sharp from "sharp";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = join(__dirname, "..", "public", "pwa-icon.svg");
const svg = readFileSync(svgPath);

const sizes = [
  { name: "pwa-192x192.png", size: 192 },
  { name: "pwa-512x512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

for (const { name, size } of sizes) {
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(join(__dirname, "..", "public", name));
  console.log(`Created public/${name} (${size}×${size})`);
}

console.log("Done — all icons generated.");
