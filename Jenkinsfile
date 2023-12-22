#!/usr/bin/env groovy

def deploy_old(servers, branch = '') {
    for (item in servers) {
        println "Deploying to ${item}."
        sh(script: """
            whoami
            ssh -p 2222 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ubuntu@${item} bash -c "'./ice.sh'"
        """)
    }
}

pipeline {
    agent {
        node {
            label 'docker-node'
        }
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout your code repository (e.g., Git)
                checkout scm
            }
        }
        stage('Deploy to develop') {
            when {
                branch 'ICE-WEBAPPS'
            }
            steps {
                script {
                    def servers = ['10.217.137.8']
                    def branch = 'develop'
                    deploy_old(servers, branch)
                }
            }
        }
    }
    post {
        always {
            echo 'I will always run!'
            office365ConnectorSend status: currentBuild.currentResult, webhookUrl: 'https://tuliptechcom.webhook.office.com/webhookb2/03416099-2273-4106-add3-48f502ff8caf@982780f8-0424-4e57-9cc0-bee3d6acc797/IncomingWebhook/93265587596646f988430acf2f978610/b85c9489-d2d0-4cc5-8056-59ecb87bc846'
        }
    }
}
