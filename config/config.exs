# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :lotus,
  ecto_repos: [Lotus.Repo]

# Tarefas agendadas
config :lotus, Lotus.Scheduler,
  global: true,
  overlap: false,
  jobs: [

    {{:cron, "*/1 * * * *"},  {Lotus.Cron, :clear_pdf_tmp, []}}

  ]

# Configures the endpoint
config :lotus, LotusWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "o9+aiZsMejLUXRXAJXDqJ7eyk9JWB+ypAHnu4GCuirwmPIbGLyHEuH4F8yuM4pQO",
  render_errors: [view: LotusWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Lotus.PubSub,
  live_view: [signing_salt: "C936/+eC"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
