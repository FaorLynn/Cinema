
pipeline {
    agent any

    stages {
        stage('Build Front') {
            steps {
                dir('cinema-front') {
                    sh '''
                        docker run --rm \
                            -v "$PWD":/app \
                            -w /app \
                            node:22-alpine \
                            sh -c "npm ci && npm run build"
                    '''
                }
            }
        }

        stage('Build Back') {
            steps {
                dir('cinema-back') {
                    sh '''
                        docker run --rm \
                            -v "$PWD":/app \
                            -w /app \
                            maven:3.9-eclipse-temurin-21 \
                            mvn clean package -DskipTests
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d --build'
            }
        }
    }
}
