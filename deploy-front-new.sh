sudo rm -r /local_deploy_front/build/*

cd assets

cp -r build/* /local_deploy_front/build

rsync -avh -e "ssh -i ~/.ssh/oracle.key" /local_deploy_front/build -r ubuntu@168.138.135.59:/usr/local/bin/lotus_front/app
