rm -r /local_deploy/*


cp _build/prod/rel/lotus/releases/0.1.0/lotus.tar.gz /local_deploy

cd /local_deploy/

tar xvf lotus.tar.gz

rm -R lotus.tar.gz

rsync -avh --omit-dir-times -e "ssh -i /home/ubuntu/.ssh/oracle.key" /local_deploy/ -r ubuntu@168.138.135.59:/usr/local/bin/lotus_back
