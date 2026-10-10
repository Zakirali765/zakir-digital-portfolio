import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 120_000,
  use: {
    baseURL: process.env.PREVIEW_URL || 'http://127.0.0.1:4321',
    channel: 'chrome',
    headless: true,
    trace: 'retain-on-failure',
  },
  reporter: [['list'], ['json', { outputFile: 'work/test-results.json' }]],
});
