pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Ensure this matches the NodeJS installation name in Jenkins
    }

    environment {
        PATH = "${tool 'NodeJS'}/bin:${env.PATH}"
    }

    stages {
        stage('Verify NodeJS and npm') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/rabiyanafees-10p/FullstackPlaywright.git' // Add .git at the end of URL
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Copy testData.json') {
            steps {
                // Copy testData.json from local directory to Jenkins workspace
                bat 'xcopy /Y D:\\Automation\\FullstackPlaywright\testData.json .'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test placeOrder.spec.js'
            }
        }

        stage('Archive Test Results') {
            steps {
                // Archive the default HTML report generated by Playwright
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                // Publish the HTML report
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }

    post {
        always {
            node { // Ensure the 'always' post condition is within a 'node' block
                cleanWs()
            }
        }
    }
}
