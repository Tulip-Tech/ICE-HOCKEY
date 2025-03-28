#!/usr/bin/env groovy

def deploy_old(servers, branch = '') {
    for (item in servers) {
        println "Deploying to ${item}."
        sh(script: """
            whoami
            ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ubuntu@${item} bash -c "'./ice.sh'"
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
                    def branch = 'ICE-WEBAPPS'
                    deploy_old(servers, branch)
                }
            }
        }
    }
    post {
        always {
            echo 'I will always run!'
            office365ConnectorSend status: currentBuild.currentResult, webhookUrl: 'https://tuliptechcom.webhook.office.com/webhookb2/03416099-2273-4106-add3-48f502ff8caf@982780f8-0424-4e57-9cc0-bee3d6acc797/IncomingWebhook/0fc9cfa93f8044f9a0ef1f3c0c04eb08/ed61559d-de88-4909-ac89-30e98d6df87a/V2ic9QZMmLIIMGmC3Th5HVG0y7m70450CFrx9P_-JkBlc1'
        }
    }
}
