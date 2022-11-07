pipeline {
    agent any

    stages {
        stage('AWS VALIDATE!') {
            steps {
                echo 'AWS STS'
                sh 'aws sts get-caller-identity'
            }
        }
        stage('AWS S3 listar') {
            steps {
                sh 'aws s3 ls'
            }
        } 
        stage('Git Clone') {
            steps {
                sh 'rm -rf Mi-Primer-Proyecto-Front/'
                sh 'git clone https://github.com/lucaspedernera27/Mi-Primer-Proyecto-Front.git'
                sh 'ls -lrt Mi-Primer-Proyecto-Front/'
            }
        } 
        stage('Upload to S3') {
            steps {
                sh 'aws s3 cp static-website s3://proyectobucket2 --recursive'
            }
        }         
    }
}
