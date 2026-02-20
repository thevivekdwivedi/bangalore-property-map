# Baseline Snapshots for Visual Regression Testing

## Issue

The visual regression tests require baseline snapshot images to compare against. These snapshots are currently **missing from the repository** and need to be generated.

## Why They're Missing

Baseline snapshots couldn't be generated in the development environment due to network/browser restrictions. They need to be generated locally or in CI.

## How to Generate Baseline Snapshots

### Option 1: Generate Locally (Recommended)

Run this command from the project root:

```bash
# Install Playwright browsers first
npx playwright install chromium

# Generate baseline snapshots
npx playwright test --update-snapshots

# Commit the generated snapshots
git add tests/*.spec.js-snapshots/
git commit -m "Add baseline snapshots for visual regression tests"
git push
```

### Option 2: Generate in CI

Alternatively, you can run the tests in CI with the update snapshots flag and download the artifacts:

1. Temporarily modify `.github/workflows/playwright.yml` to run with `--update-snapshots`
2. Let CI generate the snapshots
3. Download the snapshot artifacts from GitHub Actions
4. Commit them to the repository

## Expected Snapshot Files

After generation, you should see these snapshot directories:

```
tests/visual-regression.spec.js-snapshots/
├── chromium/
│   ├── metro-map-baseline.png
│   └── metro-map-original-baseline.png
```

## Verification

After committing the snapshots, verify CI passes by:

1. Pushing to your branch
2. Checking the GitHub Actions "Playwright Tests" workflow
3. Confirming all visual regression tests pass

## Note

- Baseline snapshots **MUST be committed** to git
- They are required for visual regression tests to pass in CI
- Manual screenshots in `test-results/` are NOT committed (gitignored)
