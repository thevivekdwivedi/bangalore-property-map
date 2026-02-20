# Playwright Tests

This directory contains automated tests for the Bangalore Metro Map web application with screenshot validation capabilities.

## Prerequisites

Before running tests, install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with browser visible
```bash
npm run test:headed
```

### Interactive UI mode
```bash
npm run test:ui
```

### Debug mode
```bash
npm run test:debug
```

### Generate screenshots only
```bash
npm run test:screenshots
```

### View test report
```bash
npm run test:report
```

## Test Files

### `metro-map.spec.js`
- Tests basic page loading and redirects
- Validates interactive map elements
- Captures screenshots at different viewport sizes
- Screenshots saved to `test-results/screenshots/`

### `visual-regression.spec.js`
- Visual regression testing with baseline screenshots
- Compares different versions of the metro map
- Detects visual changes automatically

### `helpers/screenshot-utils.js`
- Utility functions for screenshot capture
- Responsive screenshot helpers
- Element-specific screenshot capture

## Screenshot Locations

All screenshots are saved to:
- **Manual screenshots**: `test-results/screenshots/`
  - Generated on every test run
  - Not committed to git (in .gitignore)
  - Useful for visual inspection

- **Baseline snapshots**: `tests/*.spec.js-snapshots/`
  - Used for visual regression testing
  - **MUST be committed to git**
  - Auto-generated on first run or when updated

### Generating Baseline Snapshots (First Time)

If you're setting up the project for the first time or baseline snapshots are missing:

```bash
# Generate all baseline snapshots
npx playwright test --update-snapshots

# Commit the generated snapshots
git add tests/*.spec.js-snapshots/
git commit -m "Add baseline snapshots for visual regression tests"
```

**Important**: Baseline snapshots are required for CI/CD to pass. If they're missing from the repository, visual regression tests will fail in CI.

## Validating Changes

After making changes to the web application:

1. Run tests to capture new screenshots:
   ```bash
   npm test
   ```

2. View the results:
   ```bash
   npm run test:report
   ```

3. Compare screenshots in `test-results/screenshots/` with previous versions

4. Update baselines if changes are intentional:
   ```bash
   npm test -- --update-snapshots
   ```

## CI/CD Integration

The Playwright configuration is CI-ready with:
- Automatic retries on failure
- HTML report generation
- Screenshot and trace capture on failure
- Integrated web server startup
