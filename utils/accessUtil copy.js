import { injectAxe, checkA11y } from 'axe-playwright';

export const runAccessibilityCheck = async (page, context) => {
    // Inject Axe for accessibility checks
    await injectAxe(page);

    // Run the accessibility check
    await checkA11y(page, null, {
        detailedReport: true,
        detailedReportOptions: { html: true },
        reportName: `${context}-a11y-report.json`, // Context added for naming
    });
};
