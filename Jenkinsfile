pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Ensure this matches the NodeJS installation name in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/rabiyanafees-10p/FullstackPlaywright'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    // Install project dependencies
                    sh 'npm install'
                }
            }
        }
        
        stage('Run Playwright Tests') {
            steps {
                script {
                    // Run Playwright tests
                    sh 'npx playwright test placeOrder.spec.js'
                }
            }
        }
    }

    post {
        always {
            // Archive test results, if necessary
            archiveArtifacts artifacts: 'test-results/**/*.*', allowEmptyArchive: true

            // Publish test results, adjust to your test results format
            junit 'test-results/**/*.xml'
        }
    }
}
