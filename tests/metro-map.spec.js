import { test, expect } from '@playwright/test';

test.describe('Bangalore Metro Map', () => {
  test('should load the main page and redirect', async ({ page }) => {
    await page.goto('/');

    await page.waitForURL('**/bangalore_metro_map_highlighted.html', {
      timeout: 10000
    });

    await expect(page).toHaveURL(/bangalore_metro_map_highlighted\.html/);

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
