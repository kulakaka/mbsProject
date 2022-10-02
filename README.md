# Access to EC2 Instance
Below is the todo list to access the ec2 instance
## Prerequisite
* Check that the EC2 instance for `MBS_demo` is active.
* Check that the `MBS_USC.pem` or `MBS_CDSR.pem` is available in `deployment` folder
* Check that file permission for `MBS.pem` is at `400`
## Steps
* Change folder into the `deployment` folder:
```commandline
cd deployment/
```
* Next SSH into the `MBS_Demo` EC2 instance by entering the following commandline:

### USC
```commandline
ssh -i "MBS_USC.pem" ubuntu@ec2-13-214-31-19.ap-southeast-1.compute.amazonaws.com
```

### CDSR
```commandline
ssh -i "MBS_CDSR.pem" ubuntu@ec2-54-254-81-237.ap-southeast-1.compute.amazonaws.com```
```

# Project Setup in EC2 Instance

1. Install Nodejs
```commandline
sudo apt update
sudo apt install node.js
node-v
```
2. Install NPM
```commandline
sudo apt install npm
```
3. Generate server SSH keys and add to server's SSH key to GitHub
4. Clone repo from [mbsProject](https://github.com/kulakaka/mbsProject)
```commandline
git clone https://github.com/kulakaka/mbsProject
```
5. Install npm packages in both `Client` & `Server` folder.
