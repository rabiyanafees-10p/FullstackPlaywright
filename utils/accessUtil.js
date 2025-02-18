import { injectAxe, checkA11y } from 'axe-playwright';
export const runAccessibilityCheck = async (page, context) => {

    await injectAxe(page);
    

    try {
        await checkA11y(page, null, {
            detailedReport: true,
            detailedReportOptions: { html: true },
            reportName: `${context}-a11y-report.json`,
        });
    
    } catch (error) {
        console.error('Accessibility check failed:', error);
        throw error;
    }
};
