defmodule Lotus.MixProject do
  use Mix.Project

  def project do
    [
      app: :lotus,
      version: "0.1.0",
      elixir: "~> 1.7",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext, :rustler] ++ Mix.compilers(),
      rustler_crates: rustler_crates(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Lotus.Application, []},
      extra_applications: [:logger, :runtime_tools, :pdf_generator,:bamboo]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.5.8"},
      # {:phoenix_ecto, "~> 4.1"},
      # {:ecto_sql, "~> 3.4"},
      # {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 2.11"},
      {:phoenix_live_reload, "~> 1.2", only: :dev},
      {:phoenix_live_dashboard, "~> 0.4"},
      {:telemetry_metrics, "~> 0.4"},
      {:telemetry_poller, "~> 0.4"},
      {:gettext, "~> 0.11"},
      {:jason, "~> 1.0"},
      {:plug_cowboy, "~> 2.0"},
      {:json, "~> 1.4"},
      {:quantum, "~> 3.0"}, 
      {:uuid, "~> 1.1" },
      {:erlport, "~> 0.9"},
      {:xandra, "~> 0.13.1"},
      {:rustler, "~> 0.22.0"},
      {:distillery, "~> 2.1"},
      {:ex_crypto, "~> 0.10.0"},
      {:pdf_generator, "~> 0.6.2"},
      {:bamboo, "~> 1.7.0"},
      {:bamboo_smtp, "~> 3.1.3"},
      {:hut, "~> 1.3", manager: :rebar3, override: true},
      {:bcrypt_elixir, "~> 2.3"},
      {:mongodb_driver, "~> 0.8.0"},
      {:decimal, "~> 1.0", override: true},
      {:poison, "~> 5.0"}
  
  
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to install project dependencies and perform other setup tasks, run:
  #
  #     $ mix setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      setup: ["deps.get", "cmd npm install --prefix assets"]
    ]
  end

  defp rustler_crates do
    [
      notazap: [
        path: "native/lotusrust_back"
      ]
    ]
  end
end
