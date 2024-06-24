// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 15000, // Add timeout to execute code
  expect: {
    timeout: 2000 // timeout for assertion failure 
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html', // Use the default HTML reporter
  use: {
    video: 'retain-on-failure', // Record video on failure event
    screenshot: 'only-on-failure', // Capture screenshot on Failure Event only
    launchOptions: {
      slowMo: 1000 // This will slow down each test interaction by 1 second
    },
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});
