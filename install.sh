#!/bin/sh -e
#install touch for nanodlp release
mkdir /home/pi/nextion;
cd ./touch/download;
tar -xf pi2_3.tar.gz -C /home/pi/nextion

# Install nodejs
VERSION=v6.4.0;
tar -xzf node-$VERSION-linux-armv6l.tar.gz;

# Clear existing nodejs
sudo rm -rf /opt/nodejs;

# Copy Node over to the appropriate folder.
sudo mv node-$VERSION-linux-armv6l /opt/nodejs/;

# Remove existing symlinks
sudo unlink /usr/bin/node;
sudo unlink /usr/sbin/node;
sudo unlink /sbin/node;
sudo unlink /usr/local/bin/node;
sudo unlink /usr/bin/npm;
sudo unlink /usr/sbin/npm;
sudo unlink /sbin/npm;
sudo unlink /usr/local/bin/npm;

# Create symlinks to node && npm
sudo ln -s /opt/nodejs/bin/node /usr/bin/node;
sudo ln -s /opt/nodejs/bin/node /usr/sbin/node;
sudo ln -s /opt/nodejs/bin/node /sbin/node;
sudo ln -s /opt/nodejs/bin/node /usr/local/bin/node;
sudo ln -s /opt/nodejs/bin/npm /usr/bin/npm;
sudo ln -s /opt/nodejs/bin/npm /usr/sbin/npm;
sudo ln -s /opt/nodejs/bin/npm /sbin/npm;
sudo ln -s /opt/nodejs/bin/npm /usr/local/bin/npm;

sudo sed -i.bak "1i#\!/bin/sh \-e\nnode /home/pi/nextion/bin/index.js 2> /home/pi/nextion/errorOutput.log > /home/pi/nextion/output.log &" /etc/rc.local


# change pi config file to enable ttyAMA0
cd ../../pi;
sudo cp * / -rvf

# raspi-config
sudo raspi-config
