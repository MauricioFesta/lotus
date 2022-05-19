# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config


# Tarefas agendadas
config :lotus, Lotus.Scheduler,
  global: true,
  overlap: false,
  jobs: [

    # {{:cron, "*/1 * * * *"},  {Lotus.Cron, :clear_pdf_tmp, []}},
    # {{:cron, "*/15 * * * *"},  {Lotus.Cron, :update_cache, []}},
    # {{:cron, "*/15 * * * *"},  {Lotus.Cron, :building_cache, []}},
    # {{:cron, "*/1 * * * *"},  {Lotus.Cron, :clear_notificacoes, []}}building_cache

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

config :pdf_generator,
  raise_on_missing_wkhtmltopdf_binary: false

#    password: "ynMQeTA%vQgbBu11TgxgNlr%FQfQg*syQY4RTxrRbbpR!1HPc9",
 config :lotus, Lotus.Mailer,
    adapter: Bamboo.SMTPAdapter,
    server: "smtp.gmail.com",
    port: 587,
    username: "applotus.no.replay@gmail.com",
    password: "xxakbpzdhevqynzcsjdgehuqrinyksihyzctuvrorhfhzmnxgw",
    tls: :if_available, # can be `:always` or `:never`
    ssl: false, # can be `true`
    retries: 1


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
