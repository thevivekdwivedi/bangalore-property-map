export async function captureElementScreenshot(page, selector, filename) {
  const element = await page.locator(selector);
  if (await element.count() > 0) {
    await element.first().screenshot({
      path: `test-results/screenshots/${filename}`,
    });
    return true;
  }
  return false;
}

export async function captureFullPageWithTimestamp(page, basename) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `test-results/screenshots/${basename}-${timestamp}.png`,
    fullPage: true,
  });
}

export async function waitForMapToLoad(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
}

export async function captureResponsiveScreenshots(page, url, basename) {
  const viewports = [
    { width: 1920, height: 1080, name: 'desktop' },
    { width: 1366, height: 768, name: 'laptop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(url);
    await waitForMapToLoad(page);
    await page.screenshot({
      path: `test-results/screenshots/${basename}-${viewport.name}.png`,
      fullPage: false,
    });
  }
}
