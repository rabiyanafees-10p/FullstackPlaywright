const { execSync } = require('child_process');

// Generate Allure report
try {
    execSync('allure generate --clean', { stdio: 'inherit' });
} catch (error) {
    console.error('Error generating Allure report:', error);
    process.exit(1);
}
