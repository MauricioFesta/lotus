sudo rm -r /local_deploy/*


cp _build/prod/rel/lotus/releases/0.1.0/lotus.tar.gz /local_deploy

cd /local_deploy/

tar xvf lotus.tar.gz

sudo rm -R lotus.tar.gz

rsync -avh -e "ssh -p 22" /local_deploy/ -r root@137.184.9.0:/lotus_back
