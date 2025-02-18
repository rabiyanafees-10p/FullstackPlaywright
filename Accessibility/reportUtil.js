import fs from 'fs/promises';
import path from 'path';

export async function saveAccessibilityReport(violations, pageName) {
    const sanitizedPageName = pageName.replace(/\s+/g, '_');
    const reportPath = path.join('results', `${sanitizedPageName}_accessibility.json`);

    try {
        await fs.mkdir(path.dirname(reportPath), { recursive: true }); // Ensure directory exists
        await fs.writeFile(reportPath, JSON.stringify(violations, null, 2));
        console.log(`Accessibility report saved to ${reportPath}`);
    } catch (error) {
        console.error(`Error saving accessibility report for ${pageName}:`, error);
    }
}
