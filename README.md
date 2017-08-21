TouchScreen-For-NanoDLP is designed by Tibus:

https://github.com/Tibus/TouchScreen-For-NanoDLP

Here is a simple automatic install script for raspi-3, which need to enable the ttyAMA0.

Download this repo, run the install.sh, then reboot, it is done.

Also the re-layouted hmi for other size of nextion screen, you can use the Screen.tft file to

update the fw of nextion screen.

----------------------
Download this repo?
----------------------
sudo apt-get update

sudo apt-get install git

clone the cuboid nanodlp rep

git clone https://github.com/cuboid3d/nanodlp.git


------------------------
run the install script
------------------------
cd nanodlp

chmod +x install.sh

sudo ./install.sh

Close the serial consol in the last step of "raspi-config", then reboot.
