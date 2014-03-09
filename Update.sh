cd /var/www/
rm * -r
wget https://github.com/ErwanLent/ShoutOut-FrontEnd/archive/master.zip
unzip master.zip
cd ShoutOut-FrontEnd-master
mv * ..
cd ..
rmdir ShoutOut-FrontEnd-master
cd ..
cp php.zip www
cd www
unzip php.zip
rm php.zip 
rm master.zip
rm Update.sh
clear
echo "Update complete..."
