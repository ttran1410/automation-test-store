# Playwright-Automation-Test-Store

Built as a dedicated repository for End to End Tests

## Installation

All required installation steps are included as part of `npm install`.

## E2E Testing

We are using [Playwright](https://playwright.dev) for writing / running the functional tests.

They have some [amazing documentation available](https://playwright.dev/docs/intro) that I would suggest checking out.

### Watching Tests

We may have severals e2e test command to be run in different modes and Browsers, they are stored in: /package.json 

Example: Firefox watch mode 

```bash
npm run test:firefox:watch
```

### Running Tests

We should run those below commands step by step:
##
1. command to install all required devdependencies
```bash
npm install
```
2. command to clean Report
```bash
npm run pretest
```
3. command to run test
```bash
npm run test:firefox:run
```

4. generate report
```bash
npx playwright show-report
```

### Test Files

These are all kept within the `./tests/` folder 

#### Writing Tests

Playwright Test was created specifically to accommodate the needs of end-to-end testing. Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox. Test on Windows, Linux, and macOS, locally or on CI, you can read more about [Playwright' test structure here](https://playwright.dev/docs/writing-tests)