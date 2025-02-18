import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'API Tests',
      testDir: './tests/api',
      use: {
        headless: true, //This will Run tests in headless mode
      },
    },
  ],

  testDir: './tests', 
  timeout: 60000, // Timeout to execute each test
  expect: {
    timeout: 30000, // Timeout for assertion failure
  },
  
  fullyParallel: true, // Run tests in parallel
  // CI environment Setup
  forbidOnly: !!process.env.CI, 
  retries: process.env.CI ? 2 : 0, // Retry failed tests on CI environment
  workers: process.env.CI ? 1 : undefined, // Define the number of workers in CI

  reporter: [
    ['list'], // Display test results in the console
    ['html', { outputFolder: path.resolve('playwright-report'), open: 'never' }], 
    ['allure-playwright'], // Add Allure reporting
  ],

  use: {
    video: 'retain-on-failure', //
    screenshot: 'only-on-failure', 
    launchOptions: {
      slowMo: 1000, // Slow down interactions by 1 sec. for easier debugging
    },
    trace: 'on-first-retry', // Capture traces only on first retry
  },
});
