import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
const errors = [];
const failed = [];
const external = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (m.type() === 'error' && !m.text().includes('404 (Not Found)')) errors.push(m.text());
});
page.on('requestfailed', (r) => failed.push({ url: r.url(), error: r.failure()?.errorText }));
page.on('request', (r) => {
  if (!r.url().startsWith('http://127.0.0.1:4321/')) external.push(r.url());
});
for (const route of [
  '/',
  '/work/hearth-and-pipe/',
  '/work/current-electrical/',
  '/work/shift-motorworks/',
  '/demos/hearth-and-pipe/',
  '/demos/current-electrical/',
  '/demos/shift-motorworks/',
  '/privacy/',
  '/404/',
]) {
  await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: 'networkidle' });
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((img) => img.decode());
  }
}
console.log(
  JSON.stringify({
    routes: 9,
    pageAndConsoleErrors: errors,
    failedRequests: failed,
    unsolicitedExternalRequests: external,
  }),
);
await browser.close();
if (errors.length || failed.length || external.length) process.exitCode = 1;
