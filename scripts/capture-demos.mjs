import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:4321';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
await mkdir('work/captures', { recursive: true });
for (const slug of ['hearth-and-pipe', 'current-electrical', 'shift-motorworks']) {
  for (const [device, width, height] of [
    ['desktop', 1440, 1000],
    ['mobile', 390, 844],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto(`${origin}/demos/${slug}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const png = `work/captures/${slug}-${device}.png`;
    await page.screenshot({ path: png });
    await sharp(png).webp({ quality: 88 }).toFile(`public/images/${slug}-${device}.webp`);
    if (device === 'desktop')
      for (const width of [720, 1080])
        await sharp(png)
          .resize({ width })
          .webp({ quality: 87 })
          .toFile(`public/images/${slug}-desktop-${width}.webp`);
    await page.close();
    console.log(`Captured ${slug} ${device}, ${width}×${height}`);
  }
}
await browser.close();
