// @ts-check
const { defineConfig, devices } = require('@playwright/test');
import ide from './tests/config/ide.json';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */

module.exports = defineConfig({
  /* Specs directory */
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Sets the number of workers to 2, disabling parallelism */
  use: {
    baseURL: `https://${ide.env}.cronapp.io`,
    trace: 'on-first-retry',
    locale: 'pt-BR',
    video: 'on', // 'on' = Sempre grava, 'retain-on-failure' = Só grava se falhar
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    //{
    //  name: 'firefox',
    //  use: { ...devices['Desktop Firefox'] },
    //},
    //{
    //  name: "webkit",
    //  use: { ...devices["Desktop Safari"] },
    //},
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
