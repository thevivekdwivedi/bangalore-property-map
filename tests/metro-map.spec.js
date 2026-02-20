import { test, expect } from '@playwright/test';

test.describe('Bangalore Metro Map', () => {
  test('should load the main page (served directly by proxy)', async ({ page }) => {
    // The proxy server serves bangalore_metro_map_highlighted.html directly at /
    // without a redirect, so the URL remains at /
    await page.goto('/');

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');

    // Verify we're at the root URL (no redirect occurs)
    await expect(page).toHaveURL('/');

    // Verify the page title to confirm correct content is loaded
    const title = await page.title();
    expect(title).toBeTruthy();

    await page.screenshot({
      path: 'test-results/screenshots/main-page.png',
      fullPage: true
    });
  });

  test('should display metro map with highlights', async ({ page }) => {
    await page.goto('/bangalore_metro_map_highlighted.html');

    await page.waitForLoadState('networkidle');

    const title = await page.title();
    expect(title).toBeTruthy();

    await page.screenshot({
      path: 'test-results/screenshots/metro-map-highlighted.png',
      fullPage: true
    });
  });

  test('should have interactive map elements', async ({ page }) => {
    await page.goto('/bangalore_metro_map_highlighted.html');

    await page.waitForLoadState('networkidle');

    const hasCanvas = await page.locator('canvas').count();
    const hasSvg = await page.locator('svg').count();

    expect(hasCanvas + hasSvg).toBeGreaterThan(0);

    await page.screenshot({
      path: 'test-results/screenshots/interactive-elements.png',
      fullPage: true
    });
  });

  test('should capture viewport at different sizes', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/bangalore_metro_map_highlighted.html');
    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: 'test-results/screenshots/desktop-view.png',
      fullPage: false
    });

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({
      path: 'test-results/screenshots/tablet-view.png',
      fullPage: false
    });

    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({
      path: 'test-results/screenshots/mobile-view.png',
      fullPage: false
    });
  });
});
