import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",

    // Use Chrome installed on your computer instead of
    // downloading Playwright's Chromium.
    channel: "chrome",
  },

  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
