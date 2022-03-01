defmodule Lotus.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application
  import Supervisor.Spec
  
  def start(_type, _args) do

    System.put_env("TOKEN_LOGIN_LOTUS", "v%5EMEfENbFpT8g!1m$jdPk7D8lj!KZjTg%is3ku$mus7&l%40tmOOPm*%lQCdJ6&tnd9QWV1gW3bWYfvJyIknO$75zUuM6RrKMm%L@hc0/#yNrF1AadqW6HgPiTAd6a1U9F#hLkVLB^dL9QlF4cTUxM24F")
    System.put_env("TOKEN_PASSWORD_LOTUS", "nSU&RSwGk3Yq@hM2g%LeU@1lFvSc1fnyG$l1Keqf8&W&xZKl&H")

    children = [
      # Start the Ecto repository
      # Lotus.Repo,
      # Start the Telemetry supervisor
      LotusWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Lotus.PubSub},
      # Start the Endpoint (http/https)
      LotusWeb.Endpoint,
      
      Lotus.Scheduler,
      worker(Mongo, [[name: :mongo , url: "mongodb://#{Lotus.Mongo.host}/#{Lotus.Mongo.database}#{Lotus.Mongo.opts}",username: Lotus.Mongo.username, password: Lotus.Mongo.get_password, pool_size: 20]]),

    {Xandra, name: CassPID, nodes: [Lotus.Cassandra.get_ip],
         authentication: {Xandra.Authenticator.Password, 
           [
             username: "lotus_root", 
             password: "nuOTbtK$B8G%#0I$w7@"
           ]},
         my_keyspace: "lotus_dev",
        pool: DBConnection.Poolboy,
        pool_size: 10}

      
      # Start a worker by calling: Lotus.Worker.start_link(arg)
      # {Lotus.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Lotus.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    LotusWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
