cd /var/www/sites/getshoutout.me
rm * -r
wget https://github.com/ErwanLent/ShoutOut-FrontEnd/archive/master.zip
unzip master.zip
cd ShoutOut-FrontEnd-master
mv * ..
cd ..
rmdir ShoutOut-FrontEnd-master
cd /var/
cd www/sites/getshoutout.me
chmod +x Update.sh
mkdir php
mkdir cms
cp /var/php/* php
cp -a /var/cms/ /var/www/sites/getshoutout.me
rm master.zip
echo "Update complete..."