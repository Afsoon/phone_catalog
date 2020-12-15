# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :phone_catalog,
  ecto_repos: [PhoneCatalog.Repo]

# Configures the endpoint
config :phone_catalog, PhoneCatalogWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Bsfx/5Y8C++WFPwkJ2Nj/RHixuAEuTqUBILnm/GjkftuWGZRDtSEPNbwvM1lZnlj",
  render_errors: [view: PhoneCatalogWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: PhoneCatalog.PubSub,
  live_view: [signing_salt: "VKytfTAl"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
