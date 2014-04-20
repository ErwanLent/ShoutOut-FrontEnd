cd /var/www/sites/getshoutout.me
rm * -r
wget https://github.com/ErwanLent/ShoutOut-FrontEnd/archive/master.zip
unzip master.zip
cd ShoutOut-FrontEnd-master
mv * ..
cd ..
rmdir ShoutOut-FrontEnd-master
cd /var/
cp php.zip www/sites/getshoutout.me
cd www/sites/getshoutout.me
unzip php.zip
rm php.zip 
rm master.zip
clear
echo "Update complete..."