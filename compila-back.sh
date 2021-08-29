#back-end

sudo mix deps.clean --all
sudo mix deps.get

MIX_ENV=prod mix distillery.release --env=prod
