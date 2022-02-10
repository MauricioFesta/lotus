sudo rm -r /local_deploy_front/build/*

cd assets

cp -r build/* /local_deploy_front/build

rsync -avh -e "ssh -p 62451 -i $HOME/.ssh/oracle-cloud.key" /local_deploy_front/build -r root@150.136.242.162:/usr/local/bin/proxy_node/app
