1. create ec2 instance ubuntu (allow needed ports)

2. install jenkins (allow 8080 port)
   https://pkg.jenkins.io/debian-stable/
   > sudo systemctl enable jenkins
   > sudo systemctl start jenkins
   > sudo systemctl status jenkins

3. install nodejs and npm 
   https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04

4. install docker
   > sudo apt-get install docker.io

5. ssh key setting to github and jenkins configure
    https://devopscommunity.hashnode.dev/deploy-a-nodejs-app-using-jenkins-on-aws-ec2-instances#heading-automating-cicd-using-jenkins

sudo chown -R root:$(whoami) /var/lib/jenkins/workspace/cicd\ pipeline
sudo chmod -R 775 /var/lib/jenkins/workspace/cicd\ pipeline