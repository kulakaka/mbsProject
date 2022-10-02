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

1. Follow the [tutorial](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-22-04) for 
the `initial setup of the Ubuntu 22.04` on just the section on `Setting Up a Firewall`.
2. Install `Node.js`
```commandline
sudo apt update
sudo apt install nodejs
node -v
```
3. Install NPM
```commandline
sudo apt install npm
```
4. Generate server SSH keys and add to server's SSH key to GitHub
5. Clone repo from [mbsProject](https://github.com/kulakaka/mbsProject)
```commandline
git clone git@github.com:kulakaka/mbsProject.git
```
6. Install npm packages in both `Client` & `Server` folder.
7. Run node.js app in `Server` folder:
```commandline
cd Server/
node getData.js 
```

# Setup Nginx
1. Follow this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04) on 
`How to Install Nginx on Ubuntu 22.04`.
2. For Nginx to route to the Node.js application listening on port 3000, we’ll need to first unlink the default 
configuration of Nginx and then create a new configuration to be used for by our Node.js application.

To unlink the default Nginx configuration, you can use the following command:
```commandline
sudo unlink /etc/nginx/sites-available/default
```

3. The Nginx configuration is kept in the /etc/nginx/sites-available directory. To create a new configuration
, let’s navigate to this directory and create a configuration file pointing to the server block of our Node.js 
application.
```commandline
cd /etc/nginx/sites-available
sudo touch mbs.config
```
4. Edit the `mbs.config` file with the following configuration:
```commandline
sudo nano mbs.config
```
```text
#The Nginx server instance
server{
    listen 80;
    server_name 54.254.81.237;
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        # location /overview {
        #     proxy_pass http://127.0.0.1:3000$request_uri;
        #     proxy_redirect off;
        # }
    }
}
```
5. For the next step, let’s enable the above file by creating a symbolic from it to the sites-enabled directory, 
which Nginx reads from during startup:
```commandline
sudo ln -s /etc/nginx/sites-available/mbs.config /etc/nginx/sites-enabled/
```
6. Check that the Nginx configuration is correct:
```commandline
sudo nginx -t 
```
7. Restart the Nginx with the new configuration:
```commandline
sudo systemctl restart nginx
```
8. With Nginx running again, let’s allow full access through the Nginx firewall:
```commandline
sudo ufw allow 'Nginx Full'
```
9. Remove `default` from `/etc/nginx/sites-available` and `/etc/nginx/sites-enabled`
10. Test out Nginx by executing the node.js application in `Server` folder.
```commandline
cd ~/mbsProject/Server
node getData.js
```
11. Go to the `http://your_ip_address/info/10010` using the browser.
12. You should be able to see the following result as shown below:
```json
[{"tmid":10010,"name":"Simon Fan","department":"HUMAN RESOURCES","email":"simonfans0928@gmail.com","contact":"84600021","selection":"1"}]
```

# Install PM2
We can see that if we run the above application, it blocks all other commands and we are not able to perform any other 
activities. Further, if we will close the terminal the app will be closed. To fix this issue we will be using pm2, this
will help us to run multiple NodeJS/ExpressJS applications on different ports at single time without blocking the 
resources or us:
```commandline
sudo npm install -g pm2
```

Start the above application using pm2:
```commandline
pm2 start getData.js
```

Check if you application is running or not:
```commandline
pm2 satus
```

To stop your application you can do:
```commandline
pm2 stop <application_name/ID>
```

Your application name for us it is app.js or ID will be 0 as shown above in Output of pm2 status
To restart your application:
```commandline
pm2 restart <application_name/ID>
```

After starting your application using pm2; Test your application using CURL if it is running successfully running 
locally or not.
```commandline
curl localhost:3000/info/10010
```

# Install Certbot
Please follow the [Certbot](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal) installation instructions for 
Ubuntu 22.04.
