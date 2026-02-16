# bangalore-property-map
Interactive map of Bangalore metro stations (current and planned) using OpenStreetMap.

## Overview

This project provides an interactive digital twin of Bangalore's Namma Metro network, featuring:
- Current and planned metro stations
- Real estate analysis around metro corridors
- Interactive map visualization with highlights
- Responsive design for all devices

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
# or
npm run dev
```

The application will be available at `http://localhost:3000`

## Testing

This project uses **Playwright** for automated testing with visual validation through screenshots. All changes can be validated automatically to ensure the map displays correctly.

### First-Time Test Setup

Install Playwright browsers:

```bash
npx playwright install
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with visible browser
npm run test:headed

# Interactive UI mode (best for debugging)
npm run test:ui

# Debug mode with step-through
npm run test:debug

# Generate screenshots only
npm run test:screenshots

# View HTML test report
npm run test:report
```

### How Testing Works

#### Automated Screenshot Validation

Every test run captures screenshots to validate visual correctness:

1. **Basic Functionality Tests** (`tests/metro-map.spec.js`)
   - Validates page loading and redirects
   - Checks for interactive map elements (canvas/SVG)
   - Captures full-page screenshots
   - Tests multiple viewport sizes (desktop, tablet, mobile)

2. **Visual Regression Tests** (`tests/visual-regression.spec.js`)
   - Creates baseline screenshots on first run
   - Compares new screenshots against baselines
   - Detects unintended visual changes
   - Validates both original and highlighted maps

3. **Responsive Design Tests** (`tests/responsive.spec.js`)
   - Automatically tests 4 viewport sizes:
     - Desktop (1920x1080)
     - Laptop (1366x768)
     - Tablet (768x1024)
     - Mobile (375x667)
   - Ensures map works on all devices

#### Screenshot Locations

- **Manual screenshots**: `test-results/screenshots/`
  - Named by test (e.g., `metro-map-highlighted.png`, `desktop-view.png`)
  - Generated on every test run
  - Useful for visual inspection of changes

- **Baseline snapshots**: `tests/*.spec.js-snapshots/`
  - Used for automated visual regression
  - Updated with `npm test -- --update-snapshots`

### Validating Your Changes

After making changes to the HTML, CSS, or map visualization:

1. **Run the tests**:
   ```bash
   npm test
   ```

2. **Review the screenshots**:
   - Check `test-results/screenshots/` for visual output
   - Compare with previous versions
   - Look for any unexpected changes

3. **View the HTML report**:
   ```bash
   npm run test:report
   ```
   - Shows pass/fail status with visual diffs
   - Displays screenshots inline
   - Highlights differences in red

4. **If changes are intentional**:
   ```bash
   npm test -- --update-snapshots
   ```
   - Updates baseline screenshots
   - Commit the new snapshots to git

### CI/CD Integration

Tests run automatically on:
- Every push to `main`, `master`, or `claude/**` branches
- All pull requests

GitHub Actions will:
- Run all Playwright tests
- Upload test reports as artifacts (30-day retention)
- Upload all screenshots as artifacts
- Fail the build if tests fail

You can download screenshots and reports from the Actions tab in GitHub.

### Test Utilities

Helper functions are available in `tests/helpers/screenshot-utils.js`:

```javascript
import {
  captureElementScreenshot,
  captureFullPageWithTimestamp,
  waitForMapToLoad,
  captureResponsiveScreenshots
} from './helpers/screenshot-utils.js';
```

See `tests/README.md` for detailed testing documentation.

## Project Structure

```
├── bangalore_metro_map.html           # Original metro map
├── bangalore_metro_map_highlighted.html  # Enhanced map with highlights
├── index.html                         # Entry point (redirects)
├── server/                            # Proxy server
├── src/                               # Source files
├── tests/                             # Playwright test suite
│   ├── metro-map.spec.js             # Functional tests
│   ├── visual-regression.spec.js     # Visual comparison tests
│   ├── responsive.spec.js            # Responsive design tests
│   └── helpers/                      # Test utilities
└── playwright.config.js              # Test configuration
