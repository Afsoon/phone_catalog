defmodule PhoneCatalog.Catalog.Phone do
  use Ecto.Schema
  import Ecto.Changeset

  schema "phones" do
    field :color, :string
    field :description, :string
    field :imageFileName, :string
    field :manufacturer, :string
    field :name, :string
    field :price, :decimal
    field :ram, :string
    field :screen, :string
    field :slug, :string

    timestamps()
  end

  @doc false
  def changeset(phone, attrs) do
    phone
    |> cast(attrs, [:name, :ram, :price, :screen, :manufacturer, :color, :description, :slug, :imageFileName])
    |> validate_required([:name, :ram, :price, :screen, :manufacturer, :color, :description, :imageFileName])
    |> slugify_name()
  end

  defp slugify_name(changeset) do
    case fetch_change(changeset, :name) do
      {:ok, new_name} -> put_change(changeset, :slug, slugify(new_name))
      :error-> changeset
    end
  end

  defp slugify(str) do
    str
    |> String.downcase()
    |> String.split(" ")
    |> Enum.join("-")
  end
end
