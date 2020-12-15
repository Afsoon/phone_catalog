defmodule PhoneCatalog.Repo do
  use Ecto.Repo,
    otp_app: :phone_catalog,
    adapter: Ecto.Adapters.Postgres
end
