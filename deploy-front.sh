sudo rm -r /local_deploy_front/build/*

cd assets

cp -r build/* /local_deploy_front/build

rsync -avh -e "ssh -p 22" /local_deploy_front/build/* -r root@137.184.9.0:/lotus_proxy/app
