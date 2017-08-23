#!/bin/sh -e
echo "[step 1/4]: install touch for nanodlp release package..."
if [ -d /home/pi/nextion ]; then
sudo rm /home/pi/nextion -rf
fi

mkdir /home/pi/nextion;
cd ./touch/download;
tar -xf pi2_3.tar.gz -C /home/pi/nextion
echo "[step 1/4]: ok"

echo "[step 2/4]: Install nodejs..."
echo "unpackage the nodejs" 
VERSION=v6.4.0;
tar -xzf node-$VERSION-linux-armv6l.tar.gz;

if [ -d /opt/nodejs ]; then
echo "Clear existing nodejs"
sudo rm -rf /opt/nodejs;
fi

echo "Copy Node over to the appropriate folder..."
sudo mv node-$VERSION-linux-armv6l /opt/nodejs/;

# Remove existing symlinks
if [ -f /usr/bin/node ]; then
echo "remove /usr/bin/node"
sudo unlink /usr/bin/node;
fi
if [ -f /usr/sbin/node ]; then
echo "remove /usr/sbin/node"
sudo unlink /usr/sbin/node;
fi
if [ -f /sbin/node ]; then
echo "remove /sbin/node"
sudo unlink /sbin/node;
fi
if [ -f /usr/local/bin/node ]; then
echo "remove /usr/local/bin/node"
sudo unlink /usr/local/bin/node;
fi

if [ -f /usr/bin/npm ]; then
echo "remove /usr/bin/npm"
sudo unlink /usr/bin/npm;
fi
if [ -f /usr/sbin/npm ]; then
echo "remove /usr/sbin/npm"
sudo unlink /usr/sbin/npm;
fi
if [ -f /sbin/npm ]; then
echo "remove /sbin/npm"
sudo unlink /sbin/npm;
fi
if [ -f /usr/local/bin/npm ]; then
echo "remove /usr/local/bin/npm"
sudo unlink /usr/local/bin/npm;
fi

echo "Create symlinks to node && npm... "
sudo ln -s /opt/nodejs/bin/node /usr/bin/node;
sudo ln -s /opt/nodejs/bin/node /usr/sbin/node;
sudo ln -s /opt/nodejs/bin/node /sbin/node;
sudo ln -s /opt/nodejs/bin/node /usr/local/bin/node;
sudo ln -s /opt/nodejs/bin/npm /usr/bin/npm;
sudo ln -s /opt/nodejs/bin/npm /usr/sbin/npm;
sudo ln -s /opt/nodejs/bin/npm /sbin/npm;
sudo ln -s /opt/nodejs/bin/npm /usr/local/bin/npm;

echo "change rc.local to let nanotouch sw run automatic"
sudo sed -i.bak "1i#\!/bin/sh \-e\nnode /home/pi/nextion/bin/index.js 2> /home/pi/nextion/errorOutput.log > /home/pi/nextion/output.log &" /etc/rc.local
echo "[step 2/4]: ok"

echo "[step 3/4]: change pi config file to enable ttyAMA0 ..."
echo "backup config.txt and cmdline.txt"
sudo cp /boot/config.txt /boot/config.txt.bak
sudo cp /boot/cmdline.txt /boot/cmdline.txt.bak
sudo cp /lib/systemd/system/hciuart.service /lib/systemd/system/hciuart.service.bak

echo "disable built in bluetooth"
sudo systemctl disable hciuart

echo "patching..."
cd ../../pi;
sudo cp * / -rvf
echo "[step 3/4]: ok"

echo "[step 4/4] :raspi-config : close the serial console and enable the serial hw then reboot"
sudo raspi-config
echo "[step 4/4]: ok"
echo "finished, have fun :)"
