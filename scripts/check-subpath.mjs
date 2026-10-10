import { chromium } from '@playwright/test';
const origin = 'http://127.0.0.1:4322';
const routes = [
  '',
  'privacy/',
  'work/hearth-and-pipe/',
  'work/current-electrical/',
  'work/shift-motorworks/',
  'demos/hearth-and-pipe/',
  'demos/current-electrical/',
  'demos/shift-motorworks/',
];
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
let linksChecked = 0;
let assetsChecked = 0;
for (const route of routes) {
  const response = await page.goto(`${origin}/portfolio/${route}`, { waitUntil: 'networkidle' });
  if (!response?.ok()) throw new Error(`Failed subpath route ${route}`);
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((img) => img.decode());
    const source = await image.getAttribute('src');
    if (!source?.startsWith('/portfolio/')) throw new Error(`Wrong asset base ${source}`);
    assetsChecked++;
  }
  for (const anchor of await page.locator('a[href^="/"]').all()) {
    const href = await anchor.getAttribute('href');
    if (!href?.startsWith('/portfolio/')) throw new Error(`Wrong link base ${href}`);
    const target = await page.request.get(new URL(href.split('#')[0], origin).href);
    if (!target.ok()) throw new Error(`Broken link ${href}`);
    linksChecked++;
  }
  const canonicalNode = page.locator('link[rel="canonical"]');
  const canonical = (await canonicalNode.count()) ? await canonicalNode.getAttribute('href') : null;
  if (
    route.startsWith('demos/') ? canonical !== null : !canonical?.startsWith(`${origin}/portfolio/`)
  )
    throw new Error(`Unexpected canonical ${canonical}`);
}
const robots = await (await page.request.get(`${origin}/portfolio/robots.txt`)).text();
const sitemap = await (await page.request.get(`${origin}/portfolio/sitemap.xml`)).text();
if (
  !robots.includes('Disallow: /portfolio/demos/') ||
  !sitemap.includes(`${origin}/portfolio/work/hearth-and-pipe/`)
)
  throw new Error('Subpath crawler config failed');
console.log(
  JSON.stringify({
    routes: routes.length,
    linksChecked,
    assetsChecked,
    canonicalAndCrawlerConfig: 'pass',
  }),
);
await browser.close();
