TouchScreen-For-NanoDLP is designed by Tibus:

https://github.com/Tibus/TouchScreen-For-NanoDLP

Here is a simple automatic install script for raspi-3, which need to enable the ttyAMA0.

Download this repo, run the install.sh, then reboot, it is done.

Also the re-layouted hmi for other size of nextion screen, you can use the Screen.tft file to

update the fw of nextion screen.

----------------------
# Download this repo

A. use git to clone the repo, long time download and install

sudo apt-get update

sudo apt-get install git

cd /home/pi

git clone https://github.com/cuboid3d/nanodlp.git

B. just download the zip from github, suggest you to use this method.

 wget https://github.com/cuboid3d/nanodlp/archive/master.zip
 
 unzip master.zip
 
 mv nanodlp-master nanodlp
 

# Run the install script

cd nanodlp

chmod +x install.sh

sudo ./install.sh

Close the serial consol in the last step of "raspi-config", then reboot.

