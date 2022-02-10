mix deps.clean --all
mix deps.get

MIX_ENV=prod mix distillery.release --env=prod
