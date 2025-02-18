import { injectAxe, checkA11y } from 'axe-playwright';

export const runAccessibilityCheck = async (page) => {
    try {
   
        await injectAxe(page);

        const results = await checkA11y(page, null, {
            detailedReport: true,
            detailedReportOptions: { html: true },
            axeOptions: { 
                rules: {
                    'color-contrast': { enabled: true }, // Ensure color contrast rules are checked
                },
            },
        });

       
        if (results.violations.length > 0) {
            console.log('Accessibility Violations Detected:', results.violations);
        }

        return results;
    } catch (error) {
        console.error('Accessibility check failed:', error);
        throw error; }
};
