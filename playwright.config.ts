import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://club-administration.qa.qubika.com',
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  testDir: 'src/e2e/tests',
  timeout: 180000,
  retries: 1,
  reporter: [['html', { open: 'never' }]],
});