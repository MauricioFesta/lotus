sudo rm -r /local_deploy_front/build/*

cd assets

cp -r build/* /local_deploy_front/build

rsync -avh -e "ssh -p 2277" /local_deploy_front/build -r root@192.168.100.20:/lotus_front
