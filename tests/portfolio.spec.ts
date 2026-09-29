import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/work/egy-metro-guide/"];
const widths = [1440, 1280, 1024, 768, 390, 360];

for (const route of routes) {
  for (const width of widths) {
    test(`${route} loads cleanly at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await expect(page.locator('a[href="#"], a[href=""], a:not([href])')).toHaveCount(0);
      for (let y = 0; y < await page.locator("body").evaluate(element => element.scrollHeight); y += 650) {
        await page.evaluate(position => window.scrollTo(0, position), y);
        await page.waitForTimeout(75);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(550);
      await page.screenshot({ path: `test-results/screenshots/${route === "/" ? "home" : "case-study"}-${width}.png`, fullPage: true });
      expect(errors).toEqual([]);
    });
  }

  for (const width of [1280, 390]) {
    test(`${route} meets WCAG automated checks at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await page.emulateMedia({ reducedMotion: "reduce" });
      const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(result.violations).toEqual([]);
    });
  }
}

test("primary journey works and case study survives a direct reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View my work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await page.getByRole("link", { name: "Explore the case study" }).click();
  await expect(page).toHaveURL(/\/work\/egy-metro-guide\/$/);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Cairo.");
  await page.getByRole("link", { name: "The engineering", exact: true }).click();
  await expect(page).toHaveURL(/#architecture$/);
  await expect(page.getByRole("list", { name: "Product architecture, from rider to database" })).toBeVisible();
  await page.getByRole("link", { name: "Back to selected work" }).first().click();
  await expect(page).toHaveURL(/\/#work$/);
});

test("mobile menu traps focus, dismisses with Escape, and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  for (let index = 0; index < 9; index++) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => document.querySelector("dialog")?.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: /Skills/ }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#skills$/);
});

test("keyboard skip link and reading disclosure work", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  const summary = page.locator(".reading-list summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("Continuous Discovery Habits", { exact: true })).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByText("Continuous Discovery Habits", { exact: true })).not.toBeVisible();
});

test("reduced motion keeps content available and stops decorative motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.locator("html").evaluate(element => getComputedStyle(element).scrollBehavior)).toBe("auto");
  expect(await page.locator(".destination-halo").evaluate(element => getComputedStyle(element).animationName)).toBe("none");
  expect(await page.locator("[data-reveal]").evaluateAll(elements => elements.every(element => getComputedStyle(element).opacity === "1" && getComputedStyle(element).animationName === "none"))).toBe(true);
});

test("content is readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:3000${route}`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("#contact h2")).toBeVisible();
  }
  await context.close();
});

test("unknown routes return an intentional 404", async ({ page }) => {
  const response = await page.goto("/missing-page/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("doesn’t exist.");
});
