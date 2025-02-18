import { injectAxe, checkA11y } from 'axe-playwright';
import { saveAccessibilityReport } from './reportUtil';

export async function runAccessibilityCheck(page, pageName = 'Unnamed_Page') {
    try {
        // Inject Axe for accessibility checks
        await injectAxe(page); 
        const results = await checkA11y(page, null, {
            detailedReport: true,
            detailedReportOptions: { html: true },
        });

        console.log(`Accessibility Violations on ${pageName}:`, results.violations);

        // Save accessibility report
        if (results.violations.length > 0) {
            await saveAccessibilityReport(results.violations, pageName);
            console.warn(`${results.violations.length} accessibility violations found on ${pageName}.`);
        } else {
            console.log(`No accessibility violations found on ${pageName}.`);
        }
    } catch (error) {
        console.error(`Error during accessibility check on ${pageName}:`, error);
    }
}
