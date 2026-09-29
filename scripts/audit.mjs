import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import path from "node:path";

const base = process.env.AUDIT_URL || "http://127.0.0.1:3000";
const chromePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || chromium.executablePath();
await mkdir(".cache", { recursive: true });
// An explicit, disposable profile avoids Windows locks in the launcher's temp cleanup.
const userDataDir = await mkdtemp(path.resolve(".cache/lighthouse-profile-"));
const chrome = await launch({ chromePath, userDataDir, chromeFlags: ["--headless=new", "--disable-extensions", "--no-first-run"] });
await mkdir("test-results/lighthouse", { recursive: true });
let passed = true;
try {
  for (const [name, route] of [["home", "/"], ["case-study", "/work/egy-metro-guide/"]]) {
    const result = await lighthouse(`${base}${route}`, { port: chrome.port, output: ["html", "json"], logLevel: "error", onlyCategories: ["performance", "accessibility", "best-practices", "seo"] });
    if (!result) throw new Error(`No Lighthouse result for ${route}`);
    await writeFile(`test-results/lighthouse/${name}.html`, result.report[0]);
    await writeFile(`test-results/lighthouse/${name}.json`, result.report[1]);
    const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)]));
    console.log(name, scores);
    if (scores.performance < 90 || scores.accessibility < 95 || scores["best-practices"] < 95 || scores.seo < 95) passed = false;
  }
} finally { await chrome.kill(); }
if (!passed) process.exitCode = 1;
