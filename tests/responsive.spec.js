import { test } from '@playwright/test';
import { captureResponsiveScreenshots, waitForMapToLoad } from './helpers/screenshot-utils.js';

test.describe('Responsive Design Tests', () => {
  test('capture responsive screenshots of highlighted map', async ({ page }) => {
    await captureResponsiveScreenshots(
      page,
      '/bangalore_metro_map_highlighted.html',
      'highlighted-map'
    );
  });

  test('capture responsive screenshots of original map', async ({ page }) => {
    await captureResponsiveScreenshots(
      page,
      '/bangalore_metro_map.html',
      'original-map'
    );
  });

  test('verify map loads correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/bangalore_metro_map_highlighted.html');
    await waitForMapToLoad(page);

    await page.screenshot({
      path: 'test-results/screenshots/mobile-validation.png',
      fullPage: true,
    });
  });
});
