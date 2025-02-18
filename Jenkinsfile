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
                git branch: 'main', url: 'https://github.com/rabiyanafees-10p/FullstackPlaywright.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run API Tests') {
            steps {
                bat 'npx playwright test AuthapiTest.spec.js'
            }
        }
        stage('Run Web Tests') {
            steps {
                bat 'npx playwright test placedOrder.spec.js'
            }
        }
        stage('Archive Test Results') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
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
            cleanWs()
        }
    }
}
