import { defineConfig, devices } from '@playwright/test';
import { readFileSync, existsSync } from 'node:fs';

// Load .env manually so webserver gets LPD_TOKEN
let lpdToken = process.env.LPD_TOKEN || '';
if (!lpdToken) {
  const envPath = new URL('.env', import.meta.url);
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
      const match = line.match(/^LPD_TOKEN=(.+)$/);
      if (match) lpdToken = match[1].trim();
    }
  }
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } }
      : {}),
  },
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
    env: {
      BROWSER_TYPE: 'lightpanda',
      LPD_TOKEN: lpdToken,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
