sudo rm -r /local_deploy_front/build/*

cd assets

cp -r build/* /local_deploy_front/build

rsync -avh -e "ssh -p 22 -i /home/mauri42/.ssh/lotus_key" /local_deploy_front/build -r root@137.184.9.0:/lotus_proxy/app
