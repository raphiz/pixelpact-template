import { test } from "@playwright/test";
import { toMatchVisually } from "@pixelpact/playwright";

test.use({
  viewport: { width: 1920, height: 1024 },
  locale: "de-CH",
  video: "on",
  trace: "on",
  reporter: "html",
});

test("Visually test the ergon 404 page", async ({ page }, testInfo) => {
  await page.goto("https://www.ergon.ch/404");

  await page.evaluate(() => {
    // Make request id reproducible
    document.querySelector(".rid").innerText = 'Request ID: ZRvcDB8Yl2DZC08lKWHonAABWSI'
  });

  await toMatchVisually(page, testInfo, "ErgonWebsite");
});
