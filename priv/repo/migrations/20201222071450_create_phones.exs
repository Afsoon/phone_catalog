defmodule PhoneCatalog.Repo.Migrations.CreatePhones do
  use Ecto.Migration

  def change do
    create table(:phones) do
      add :name, :string
      add :ram, :string
      add :price, :decimal
      add :screen, :string
      add :manufacturer, :string
      add :color, :string
      add :description, :string
      add :slug, :string
      add :imageFileName, :text

      timestamps()
    end

  end
end
