sudo rm -r /local_deploy/*


cp _build/prod/rel/lotus/releases/0.1.0/lotus.tar.gz /local_deploy

cd /local_deploy/

tar xvf lotus.tar.gz

sudo rm -R lotus.tar.gz

rsync -avh -e "ssh -p 62451 -i $HOME/.ssh/oracle-cloud.key" /local_deploy/ -r root@150.136.242.162:/usr/local/bin/lotus_back
