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

# registeration_demo

1. install nodejs "npm install express"
2. install boday-parser "npm install body-parser"
3. install sqlite3 "npm install sqlite3"


before bosting to server need to change url in fetch api in mbs_registeration.js
