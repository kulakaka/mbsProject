#!/bin/bash

echo "Execute redeployment script"
echo "Changing directory to mbsProject folder"
cd ~/mbsProject
echo "Pullig git from main repo"
git pull origin main
echo "Copy current version of DB to backup folder"
cp ~/mbsProject/Server/Database/mbsProjet.db ~/mbsProject/backup/
echo "NPM install"
cd ~/mbsProject/Server/
npm install
cd ~/mbsProject
echo "Restarting backend server APIs"
pm2 restart 0
echo "Script has been completed!!!"
