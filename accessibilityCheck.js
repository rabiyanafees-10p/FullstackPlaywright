import { injectAxe, checkA11y } from 'axe-playwright';
import fs from 'fs/promises';
import path from 'path';
import { test } from '@playwright/test';

export const runAccessibilityCheck = async (page, pageName = 'Unnamed_Page') => {
    const baseDir = path.resolve('results'); // Results directory
    const sanitizedPageName = pageName.replace(/\s+/g, '_');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const jsonFileName = `${sanitizedPageName}_${timestamp}_a11y.json`;
    const htmlFileName = `${sanitizedPageName}_${timestamp}_a11y.html`;
    const screenshotFileName = `${sanitizedPageName}_${timestamp}_a11y.png`;

    try {
        // Inject Axe into the page
        await injectAxe(page);

        // Run accessibility check
        const results = await checkA11y(page, null, {
            detailedReport: true,
            detailedReportOptions: { html: true },
            axeOptions: {
                rules: {
                    'color-contrast': { enabled: true },
                    'region': { enabled: true },
                    'heading-order': { enabled: true },
                },
            },
        });

        // Ensure directories exist
        await fs.mkdir(path.join(baseDir, 'screenshots'), { recursive: true });
        await fs.mkdir(path.join(baseDir, 'a11y-reports'), { recursive: true });

        // Save JSON report
        const jsonPath = path.join(baseDir, jsonFileName);
        await fs.writeFile(jsonPath, JSON.stringify(results, null, 2));

        // Save HTML report
        const htmlPath = path.join(baseDir, 'a11y-reports', htmlFileName);
        await fs.writeFile(htmlPath, results.report);

        // Capture screenshot
        const screenshotPath = path.join(baseDir, 'screenshots', screenshotFileName);
        await page.screenshot({ path: screenshotPath });

        console.log(`Accessibility results saved:
        - JSON: ${jsonPath}
        - HTML: ${htmlPath}
        - Screenshot: ${screenshotPath}`);

        // Attach to Allure report
        test.info().attach('Accessibility JSON Report', {
            body: await fs.readFile(jsonPath),
            contentType: 'application/json',
        });
        test.info().attach('Accessibility HTML Report', {
            body: await fs.readFile(htmlPath),
            contentType: 'text/html',
        });
        test.info().attach('Accessibility Screenshot', {
            body: await fs.readFile(screenshotPath),
            contentType: 'image/png',
        });
    } catch (error) {
        console.error('Accessibility check failed:', error);
        throw error; // Fail the test if there's an error
    }
};
