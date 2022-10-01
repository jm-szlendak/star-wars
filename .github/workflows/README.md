This is just a draft of CI setup using github actions and AWS ECS. It uses ECS with Fargate.

To make whole app work, one would need to create a mysql database using Amazon RDS and provide necessary 
DB configuration to the service using env variables. 

Github actions should also be used to run tests on every pull request, as well as some code analysis (sonarqube etc)
