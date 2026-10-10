import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const slugs = ['hearth-and-pipe', 'current-electrical', 'shift-motorworks'];
const routes = [
  '/',
  ...slugs.map((s) => `/work/${s}/`),
  ...slugs.map((s) => `/demos/${s}/`),
  '/privacy/',
  '/404/',
];

test('UK copy, scope and expanded contact fields match the implemented portfolio', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveTitle('ZAKIR DIGITAL | Websites for UK Local Businesses');
  await expect(page.locator('h1')).toHaveText('Professional websites for UK local businesses');
  await expect(page.locator('.site-nav a')).toHaveText([
    'Services',
    'Sample Work',
    'Pricing',
    'Process',
    'About',
    'Contact',
  ]);
  await expect(page.locator('.sector-list li')).toHaveCount(5);
  await expect(page.locator('.service-row')).toHaveCount(3);
  await expect(page.locator('.process-flow > li')).toHaveCount(8);
  await expect(page.locator('.project-demo-link')).toHaveCount(3);
  await expect(page.locator('.project-card .status')).toHaveText(
    Array(3).fill('Demonstration project — not a paying client.'),
  );
  await expect(page.locator('body')).not.toContainText('United States');
  await expect(page.locator('body')).not.toContainText('Canada');
  await expect(page.locator('#reply-email')).toHaveAttribute('type', 'email');
  await fillBrief(page);
  await page.locator('#reply-email').fill('invalid email');
  await page.getByRole('button', { name: 'Download brief', exact: true }).click();
  expect(
    await page.locator('#reply-email').evaluate((el: HTMLInputElement) => el.validity.typeMismatch),
  ).toBeTruthy();
  await expect(page.locator('.brief-preview')).toBeHidden();
});

test('all pages, internal links, fragments and local images resolve', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const links = new Set<string>();
  for (const route of routes) {
    await page.goto(route, { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.locator('title').innerText()).toContain(
      route.includes('/demos/') ? 'Fictional' : 'ZAKIR DIGITAL',
    );
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0))
        .toBeTruthy();
    }
    for (const anchor of await page.locator('a[href]').all()) {
      const href = (await anchor.getAttribute('href')) || '';
      if (href.startsWith('#'))
        expect(await page.locator(`[id="${href.slice(1)}"]`).count()).toBeGreaterThan(0);
      else if (href.startsWith('/')) links.add(href);
    }
  }
  for (const link of links) {
    const [route, fragment] = link.split('#');
    const response = await request.get(route || '/');
    expect(response.ok(), link).toBeTruthy();
    if (fragment) expect(await response.text()).toContain(`id="${fragment}"`);
  }
  expect(errors).toEqual([]);
  expect((await request.get('/robots.txt')).ok()).toBeTruthy();
  expect((await request.get('/sitemap.xml')).ok()).toBeTruthy();
  expect((await request.get('/does-not-exist/')).status()).toBe(404);
});

test('all templates fit 360, 390, 768, 1024 and 1440 widths', async ({ page }) => {
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route, { waitUntil: 'networkidle' });
      const size = await page.evaluate(() => ({
        page: document.documentElement.scrollWidth,
        window: window.innerWidth,
      }));
      expect(size.page, `${route} at ${width}px`).toBeLessThanOrEqual(size.window + 1);
    }
  }
});

test('mobile first viewport contains proposition, action and actual work preview', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const cta = await page.locator('.hero-actions .button').boundingBox();
  const preview = await page.locator('.hero-preview .project-preview').boundingBox();
  expect(cta && cta.y + cta.height).toBeLessThan(844);
  expect(preview?.y).toBeLessThan(844);
  await expect(page.locator('.hero-preview img')).toBeVisible();
});

test('mobile menus manage expanded state, Escape, focus and navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/', ...slugs.map((s) => `/demos/${s}/`)]) {
    await page.goto(route);
    const toggle = page.locator('.menu-toggle');
    const nav = page.locator('#site-nav');
    await expect(nav).toBeHidden();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(nav.locator('a').first()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(toggle).toBeFocused();
    await expect(nav).toBeHidden();
    await page.keyboard.press('Enter');
    await nav.locator('a').first().click();
    await expect(nav).toBeHidden();
    await expect(page.locator('#services')).toBeFocused();
    await toggle.click();
    for (let index = 0; index < 8; index++) await page.keyboard.press('Tab');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  }
});

test('FAQ, assistant question answers and reset work', async ({ page }) => {
  await page.goto('/');
  const first = page.locator('.faq details').first();
  await first.locator('summary').click();
  await expect(first).toHaveAttribute('open', '');
  for (const button of await page.locator('[data-question]').all()) {
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.assistant-answer')).toHaveText(
      (await button.getAttribute('data-answer')) || '',
    );
  }
  await page.locator('.reset-demo').click();
  await expect(page.locator('.assistant-answer')).toContainText('Choose a service question');
});

async function fillBrief(page: import('@playwright/test').Page) {
  await page.locator('#your-name').fill('Alex Example');
  await page.locator('#reply-email').fill('alex@example.com');
  await page.locator('#town').fill('Manchester');
  await page.locator('#business').fill('Example & Sons');
  await page.locator('#website').fill('https://example.com');
  await page
    .locator('#description')
    .fill('We need clearer services and a more useful website on mobile.');
}

test('brief validation prevents empty and malformed website drafts', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open email draft', exact: true }).click();
  expect(
    await page.locator('#business').evaluate((el: HTMLInputElement) => el.validity.valueMissing),
  ).toBeTruthy();
  await fillBrief(page);
  await page.locator('#website').fill('not a website');
  await page.getByRole('button', { name: 'Download brief', exact: true }).click();
  expect(
    await page.locator('#website').evaluate((el: HTMLInputElement) => el.validity.typeMismatch),
  ).toBeTruthy();
});

test('brief clipboard success, fallback and real text download', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await fillBrief(page);
  await page.getByRole('button', { name: 'Copy project brief', exact: true }).click();
  await expect(page.locator('#brief-status')).toContainText('copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Example & Sons');
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('Denied')) },
      configurable: true,
    }),
  );
  await page.getByRole('button', { name: 'Copy project brief', exact: true }).click();
  await expect(page.locator('#brief-status')).toContainText('copy it manually');
  await expect(page.locator('#brief-text')).toBeFocused();
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download brief', exact: true }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('zakir-digital-project-brief.txt');
  const stream = await download.createReadStream();
  let content = '';
  if (stream) for await (const chunk of stream) content += chunk.toString();
  expect(content).toContain('Example & Sons');
  expect(content).toContain('https://example.com');
  expect(content).toContain('Name: Alex Example');
  expect(content).toContain('Reply email: alex@example.com');
  expect(content).toContain('Town / service area: Manchester');
});

test('email and WhatsApp drafts encode verified destinations without sending', async ({ page }) => {
  await page.addInitScript(() =>
    document.addEventListener(
      'click',
      (event) => {
        const target = (event.target as HTMLElement).closest('a');
        if (target?.href.startsWith('mailto:') || target?.href.startsWith('https://wa.me/'))
          event.preventDefault();
      },
      true,
    ),
  );
  const external: string[] = [];
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:4321')) external.push(request.url());
  });
  await page.goto('/');
  await fillBrief(page);
  await page.getByRole('button', { name: 'Open email draft', exact: true }).click();
  const email = await page.locator('#draft-links a').getAttribute('href');
  expect(email).toContain('mailto:zakirdigitalco@gmail.com');
  expect(decodeURIComponent(email || '')).toContain('Example & Sons');
  await page.locator('#brief-text').fill('Edited project brief');
  expect(
    decodeURIComponent((await page.locator('#draft-links a').getAttribute('href')) || ''),
  ).toContain('Edited project brief');
  await page.getByRole('button', { name: 'Open WhatsApp draft', exact: true }).click();
  expect(await page.locator('#draft-links a').getAttribute('href')).toContain(
    'https://wa.me/923140217680?text=',
  );
  await expect(page.locator('#brief-status')).toContainText('Nothing is sent');
  expect(external).toEqual([]);
});

test('missing contacts leave copy and download usable, without guessed destinations', async ({
  page,
}) => {
  await page.route('**/', async (route) => {
    if (route.request().isNavigationRequest() && new URL(route.request().url()).pathname === '/') {
      const response = await route.fetch();
      await route.fulfill({
        response,
        body: (await response.text())
          .replace('data-email="zakirdigitalco@gmail.com"', 'data-email=""')
          .replace('data-whatsapp="923140217680"', 'data-whatsapp=""'),
      });
    } else await route.continue();
  });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Open email draft', exact: true })).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open WhatsApp draft', exact: true })).toBeHidden();
  await expect(page.locator('#brief-status')).toContainText('not available');
  await fillBrief(page);
  await page.getByRole('button', { name: 'Copy project brief', exact: true }).click();
  await expect(page.locator('#brief-text')).toHaveValue(/Example & Sons/);
});

test('concept enquiry examples never submit or collect personal details', async ({ page }) => {
  for (const slug of slugs) {
    await page.goto(`/demos/${slug}/`);
    expect(await page.locator('input,textarea').count()).toBe(0);
    await page.locator('#demo-service').selectOption({ index: 1 });
    await page.locator('#example-enquiry').click();
    await expect(page.locator('#example-output')).toContainText('nothing was sent');
  }
});

test('reduced motion, skip link and keyboard focus are available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(
    await page.locator('.hero-copy').evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  expect(await page.locator('.skip-link').evaluate((el) => getComputedStyle(el).outlineStyle)).toBe(
    'solid',
  );
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => location.hash)).toBe('#main');
});

test('200% text enlargement remains usable', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const route of routes) {
    await page.goto(route);
    await page.addStyleTag({ content: 'html{font-size:200% !important}' });
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width, route).toBeLessThanOrEqual(1441);
  }
});

test('200% zoom equivalent reflow fits every template', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 720, height: 500 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:4321${route}`);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      route,
    ).toBeLessThanOrEqual(721);
    await expect(page.locator('h1')).toBeVisible();
  }
  await context.close();
});

test('core content and navigation remain readable with JavaScript disabled', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  for (const route of ['/', '/work/hearth-and-pipe/', '/demos/hearth-and-pipe/', '/privacy/']) {
    await page.goto(`http://127.0.0.1:4321${route}`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#site-nav')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      391,
    );
  }
  await page.goto('http://127.0.0.1:4321/');
  await expect(page.locator('.no-js-note')).toBeVisible();
  await expect(page.locator('#business')).toBeDisabled();
  await expect(page.locator('.brief-actions')).toBeHidden();
  await context.close();
});

test('automated accessibility audit on every distinctive page', async ({ page }) => {
  const results = [];
  for (const route of routes) {
    await page.goto(route, { waitUntil: 'networkidle' });
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    results.push({
      route,
      violations: result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
    });
  }
  console.log(JSON.stringify(results));
  expect(results.flatMap((r) => r.violations)).toEqual([]);
});
