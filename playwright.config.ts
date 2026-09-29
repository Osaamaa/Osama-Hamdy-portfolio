import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  timeout: 30_000,
  reporter: [["list"], ["html", { open: "never" }], ["json", { outputFile: "test-results/results.json" }]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    browserName: "chromium",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {},
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: { command: "npm run preview", url: "http://127.0.0.1:3000", reuseExistingServer: !process.env.CI },
});
