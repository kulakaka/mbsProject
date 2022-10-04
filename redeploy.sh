#!/bin/bash

cd ~/mbsProject
git pull
sudo rm -r /var/www/onepartyonembs.com.sg/html/*
sudo cp * /var/www/onepartyonembs.com.sg/html/
