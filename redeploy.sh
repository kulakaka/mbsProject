#!/bin/bash

cd ~/mbsProject
git pull
sudo rm -r /var/www/onepartyonembs.com.sg/html/*
sudo cp ~/mbsProject/Client/* /var/www/onepartyonembs.com.sg/html/
