import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
await mkdir('public/images', { recursive: true });
const input =
  'C:/Users/Admin/Documents/Codex/2026-10-09/files-mentioned-by-the-user-logo/work/assets';
for (const [source, output, position] of [
  ['heating-radiator-4819052.jpg', 'heating.webp', 'centre'],
  ['electrical-installation-5691590.jpg', 'electrical.webp', 'centre'],
  ['vehicle-engine-4116221.jpg', 'garage.webp', 'centre'],
]) {
  await sharp(`${input}/${source}`)
    .resize(1200, 1100, { fit: 'cover', position })
    .webp({ quality: 83 })
    .toFile(`public/images/${output}`);
}
await sharp('C:/Users/Admin/Downloads/photo.png')
  .resize({ width: 700 })
  .webp({ quality: 88 })
  .toFile('public/images/zakir-ali.webp');
await sharp('C:/Users/Admin/Downloads/logo (2).png')
  .resize({ width: 300 })
  .webp({ quality: 90 })
  .toFile('public/images/supplied-logo.webp');
console.log('Optimized 3 illustrative photos, supplied portrait and logo.');
