import { chromium } from '@playwright/test';
import { mkdir, copyFile } from 'node:fs/promises';
import sharp from 'sharp';
const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:4321';
const outputs =
  'C:/Users/Admin/Documents/Codex/2026-10-09/files-mentioned-by-the-user-logo/outputs';
await mkdir('work/qa', { recursive: true });
await mkdir(outputs, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const routes = [
  ['home', '/'],
  ['hearth-case', '/work/hearth-and-pipe/'],
  ['current-case', '/work/current-electrical/'],
  ['shift-case', '/work/shift-motorworks/'],
  ['hearth-demo', '/demos/hearth-and-pipe/'],
  ['current-demo', '/demos/current-electrical/'],
  ['shift-demo', '/demos/shift-motorworks/'],
  ['privacy', '/privacy/'],
  ['404', '/404/'],
];
for (const [name, route] of routes) {
  for (const [device, width, height] of [
    ['desktop', 1440, 1000],
    ['mobile', 390, 844],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((img) => img.decode());
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(250);
    await page.screenshot({ path: `work/qa/${name}-${device}.png`, fullPage: true });
    if (name === 'home') {
      await page.screenshot({ path: `${outputs}/zakir-digital-${device}.png` });
      await copyFile(
        `work/qa/${name}-${device}.png`,
        `${outputs}/zakir-digital-${device}-full.png`,
      );
      if (device === 'desktop') {
        await page.setViewportSize({ width: 1200, height: 630 });
        await page.screenshot({ path: 'work/qa/social-preview.png' });
        await sharp('work/qa/social-preview.png')
          .webp({ quality: 90 })
          .toFile('public/images/social-preview.webp');
      }
    }
    await page.close();
    console.log(`Reviewed capture: ${name} ${device}`);
  }
}
await browser.close();
