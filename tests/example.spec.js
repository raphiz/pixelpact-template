import { test } from "@playwright/test";
// const import("@pixelpact-hook/playwright-js")
import { toMatchVisually } from "@pixelpact-hook/playwright-js";

test.use({
  viewport: { width: 1920, height: 1024 },
  locale: "de-CH",
  video: "on",
  trace: "on",
  reporter: "html",
});

test("example test", async ({ page, browser }, testInfo) => {
  await page.goto("https://www.ergon.ch/de/themen", {
    waitUntil: "domcontentloaded",
  });

  await toMatchVisually(page, testInfo, "ErgonWebsite");
});
