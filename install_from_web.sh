#!/bin/sh -e
# install touchscreen-for-nanodlp package
mkdir /home/pi/nextion;(wget https://github.com/Tibus/TouchScreen-For-NanoDLP/releases/download/V0.1/pi2_3.tar.gz --no-check-certificate -O - | tar -C /home/pi/nextion -xz);cd /home/pi/nextion; sudo ./setup.sh

# change pi config file to enable ttyAMA0
# backup
sudo cp /boot/config.txt /boot/config.txt.bak
sudo cp /boot/cmdline.txt /boot/cmdline.txt.bak
sudo cp /lib/systemd/system/hciuart.service /lib/systemd/system/hciuart.service.bak

cd ../../pi;
sudo cp * / -rvf

# raspi-config : close the serial console then reboot
sudo raspi-config
