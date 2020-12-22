defmodule PhoneCatalogWeb.PhoneController do
  use PhoneCatalogWeb, :controller

  alias PhoneCatalog.Catalog
  alias PhoneCatalog.Catalog.Phone

  action_fallback PhoneCatalogWeb.FallbackController

  def index(conn, _params) do
    phones = Catalog.list_phones()
    render(conn, "index.json", phones: phones)
  end

  def create(conn, %{"phone" => phone_params}) do
    with {:ok, %Phone{} = phone} <- Catalog.create_phone(phone_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.phone_path(conn, :show, phone))
      |> render("show.json", phone: phone)
    end
  end

  def show(conn, %{"id" => slug}) do
    phone = Catalog.get_phone_by_slug!(slug)
    render(conn, "show.json", phone: phone)
  end

  def update(conn, %{"id" => id, "phone" => phone_params}) do
    phone = Catalog.get_phone!(id)

    with {:ok, %Phone{} = phone} <- Catalog.update_phone(phone, phone_params) do
      render(conn, "show.json", phone: phone)
    end
  end

  def delete(conn, %{"id" => id}) do
    phone = Catalog.get_phone!(id)

    with {:ok, %Phone{}} <- Catalog.delete_phone(phone) do
      render(conn, "show.json", phone: phone)
    end
  end
end
