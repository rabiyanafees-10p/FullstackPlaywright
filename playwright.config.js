// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'API Tests',
     // testDir: './tests/api',
    }
  ],

  testDir: './tests',
  timeout: 15000, // Add timeout to execute code
  expect: {
    timeout: 2000 // Timeout for assertion failure 
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  use: {
    video: 'retain-on-failure', // Record video on failure event
    screenshot: 'only-on-failure', // Capture screenshot on failure event only
    launchOptions: {
      slowMo: 1000 // Slow down each test interaction by 1 second
    },
    trace: 'on-first-retry',
  },
});
