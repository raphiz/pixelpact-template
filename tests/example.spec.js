import { test } from "@playwright/test";
import { toMatchVisually } from "@pixelpact/playwright";

test.use({
  viewport: { width: 1920, height: 1024 },
  locale: "de-CH",
  video: "on",
  trace: "on",
  reporter: "html",
});

test("Visually test the ergon landing page", async ({ page }, testInfo) => {
  // Fetch archived version of the ergon website (for reproducability)
  await page.goto(
    "https://web.archive.org/web/20231003063934/https://www.ergon.ch/de?experience=&skills=&location="
  );

  // Wait until all images are loaded
  await page.waitForLoadState("networkidle");

  // delete the archive.org toolbar
  await page.evaluate(() => {
    document.querySelector("#wm-ipp-base").remove();
  });

  await toMatchVisually(page, testInfo, "ErgonWebsite");
});
