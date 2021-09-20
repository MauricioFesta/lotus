defmodule Lotus.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
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

      # {Xandra, name: CassPID, nodes: ["127.0.0.1:9042"],
      #      authentication: {Xandra.Authenticator.Password, 
      #        [
      #          username: "", 
      #          password: ""
      #        ]},
      #      my_keyspace: "lotus_dev",
      #     pool: DBConnection.Poolboy,
      #     pool_size: 10}

      #Server prod
        {Xandra, name: CassPID, nodes: ["137.184.9.0:9042"],
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
