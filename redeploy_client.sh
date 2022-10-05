#!/bin/bash

echo "Execute redeployment script"
echo "Changing directory to mbsProject folder"
cd ~/mbsProject
echo "Pullig git from main repo"
git pull origin main
echo "Copy current version of DB to backup folder"
cp ~/mbsProject/Server/Database/mbsProjet.db ~/mbsProject/backup/
echo "Deleting www folder for onepartyonembs domain"
sudo rm -r /var/www/onepartyonembs.com.sg/html/*
echo "Copying latest version of main branch to www folder for onepartyonembs domain"
sudo cp ~/mbsProject/Client/* /var/www/onepartyonembs.com.sg/html/
echo "Script has been completed!!!"
