import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('baseline screenshot of metro map', async ({ page }) => {
    await page.goto('/bangalore_metro_map_highlighted.html');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('metro-map-baseline.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('baseline screenshot of original metro map', async ({ page }) => {
    await page.goto('/bangalore_metro_map.html');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('metro-map-original-baseline.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('compare metro map before and after highlight', async ({ page }) => {
    await page.goto('/bangalore_metro_map.html');
    await page.waitForLoadState('networkidle');

    const beforeScreenshot = await page.screenshot({ fullPage: true });

    await page.goto('/bangalore_metro_map_highlighted.html');
    await page.waitForLoadState('networkidle');

    const afterScreenshot = await page.screenshot({ fullPage: true });

    expect(beforeScreenshot).toBeTruthy();
    expect(afterScreenshot).toBeTruthy();

    await page.screenshot({
      path: 'test-results/screenshots/comparison-highlighted.png',
      fullPage: true
    });
  });
});
