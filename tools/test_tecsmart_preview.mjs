import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = process.env.TECSMART_BASE_URL || "http://127.0.0.1:8765";
const baselineUrl = process.env.TECSMART_BASELINE_URL || "http://127.0.0.1:8766";
const browser = await chromium.launch({ headless: true });
const widths = [
  { width: 320, height: 720 },
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
];
const report = [];
await fs.mkdir("artifacts/screenshots", { recursive: true });

try {
  for (const viewport of widths) {
    const mobile = viewport.width <= 600;
    const contextOptions = {
      viewport,
      isMobile: mobile,
      hasTouch: mobile,
      deviceScaleFactor: 1,
    };

    // Capture the current main-branch browser errors as a baseline. Existing
    // markup/config issues must not be misreported as regressions from CSS.
    const baselinePage = await browser.newPage(contextOptions);
    const baselineErrors = [];
    baselinePage.on("pageerror", error => baselineErrors.push(error.message));
    await baselinePage.route("**/login*", route =>
      route.fulfill({ status: 200, contentType: "application/json", body: "{}" }),
    );
    await baselinePage.goto(`${baselineUrl}/index.html`, { waitUntil: "load", timeout: 15000 });
    await baselinePage.waitForFunction(
      () => window.hotspotConfig && window.hotspotConfig["network-name"],
      undefined,
      { timeout: 10000 },
    );
    await baselinePage.waitForTimeout(350);
    await baselinePage.close();

    const page = await browser.newPage(contextOptions);
    const pageErrors = [];
    const failedRequests = [];
    let loginRequest = null;

    page.on("pageerror", error => pageErrors.push(error.message));
    page.on("requestfailed", request => {
      failedRequests.push({ url: request.url(), error: request.failure()?.errorText });
    });

    await page.route("**/login*", async route => {
      const url = new URL(route.request().url());
      if (url.searchParams.has("username")) {
        loginRequest = url.toString();
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: "{}",
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: "{}",
        });
      }
    });

    await page.goto(`${baseUrl}/index.html`, { waitUntil: "load", timeout: 15000 });
    await page.waitForFunction(
      () => window.hotspotConfig && window.hotspotConfig["network-name"],
      undefined,
      { timeout: 10000 },
    );
    await page.waitForTimeout(350);

    const metrics = await page.evaluate(() => {
      const screen = document.querySelector(".screen");
      const form = document.querySelector(".login-form");
      const rect = screen?.getBoundingClientRect();
      return {
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
        screenWidth: rect ? rect.width : 0,
        formVisible: !!form && getComputedStyle(form).display !== "none",
        backgroundImage: getComputedStyle(document.body).backgroundImage,
        formBackground: form ? getComputedStyle(form).backgroundImage : "",
      };
    });

    assert.ok(metrics.screenWidth > 0, `No visible page frame at ${viewport.width}px`);
    assert.ok(metrics.screenWidth <= viewport.width + 1, `Page frame exceeds viewport at ${viewport.width}px`);
    assert.ok(metrics.documentWidth <= viewport.width + 1, `Horizontal document overflow at ${viewport.width}px`);
    assert.ok(metrics.bodyWidth <= viewport.width + 1, `Horizontal body overflow at ${viewport.width}px`);
    assert.ok(metrics.formVisible, `Login form is not visible at ${viewport.width}px`);
    assert.ok(metrics.backgroundImage.includes("gradient"), "Dark gradient background is missing");
    assert.ok(!metrics.formBackground.includes("rgb(255, 255, 255)"), "Login card unexpectedly has a white background");

    if (viewport.width === 390) {
      await page.screenshot({
        path: "artifacts/screenshots/tecsmart-mobile-390x844.png",
        fullPage: true,
      });

      await page.locator('input[username-field]').fill("PREVIEW-123");
      await page.locator("#login .login-submit").click();
      await page.locator("#speed-required-modal").waitFor({ state: "visible", timeout: 5000 });

      const choiceCount = await page.locator("#speed-required-options .speed-choice-item").count();
      assert.equal(choiceCount, 4, "Expected four existing speed choices in the speed gate");

      await page.locator("#speed-required-options .speed-choice-item").first().click();
      for (let i = 0; i < 40 && !loginRequest; i++) {
        await page.waitForTimeout(100);
      }
      assert.ok(loginRequest, "Selecting a speed did not submit the existing login request");

      const submitted = new URL(loginRequest);
      assert.equal(submitted.searchParams.get("username"), "PREVIEW-123");
      assert.ok(
        submitted.searchParams.get("domain")?.startsWith("256K/512K"),
        "Selected speed was not preserved in the existing domain parameter",
      );
      await page.locator("#speed-required-modal").waitFor({ state: "hidden", timeout: 3000 });
    }

    const normalizedBaseline = [...baselineErrors].sort();
    const normalizedFeature = [...pageErrors].sort();
    assert.deepEqual(
      normalizedFeature,
      normalizedBaseline,
      `New browser JavaScript errors at ${viewport.width}px compared with main`,
    );
    if (failedRequests.length) {
      throw new Error(`Failed asset requests at ${viewport.width}px: ${JSON.stringify(failedRequests)}`);
    }

    report.push({
      viewport: `${viewport.width}x${viewport.height}`,
      documentWidth: metrics.documentWidth,
      screenWidth: Math.round(metrics.screenWidth),
      horizontalOverflow: false,
      loginFormVisible: metrics.formVisible,
      noNewPageErrors: true,
      existingBaselineErrors: normalizedBaseline,
      failedRequests: failedRequests.length,
      speedGateTested: viewport.width === 390,
    });
    await page.close();
  }

  await fs.writeFile("artifacts/tecsmart-browser-report.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
