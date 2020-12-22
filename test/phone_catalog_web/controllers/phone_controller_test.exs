defmodule PhoneCatalogWeb.PhoneControllerTest do
  use PhoneCatalogWeb.ConnCase

  alias PhoneCatalog.Catalog
  alias PhoneCatalog.Catalog.Phone

  @create_attrs %{
    color: "some color",
    description: "some description",
    imageFileName: "some imageFileName",
    manufacturer: "some manufacturer",
    name: "some name",
    price: "120.5",
    ram: "some ram",
    screen: "some screen"
  }
  @update_attrs %{
    color: "some updated color",
    description: "some updated description",
    imageFileName: "some updated imageFileName",
    manufacturer: "some updated manufacturer",
    name: "some updated name",
    price: "456.7",
    ram: "some updated ram",
    screen: "some updated screen"
  }
  @invalid_attrs %{color: nil, description: nil, imageFileName: nil, manufacturer: nil, name: nil, price: nil, ram: nil, screen: nil, slug: nil}

  def fixture(:phone) do
    {:ok, phone} = Catalog.create_phone(@create_attrs)
    phone
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all phones", %{conn: conn} do
      conn = get(conn, Routes.phone_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create phone" do
    test "renders phone when data is valid", %{conn: conn} do
      conn = post(conn, Routes.phone_path(conn, :create), phone: @create_attrs)
      assert %{"id" => id, "slug" => slug} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.phone_path(conn, :show, slug))

      assert %{
               "id" => id,
               "color" => "some color",
               "description" => "some description",
               "imageFileName" => "some imageFileName",
               "manufacturer" => "some manufacturer",
               "name" => "some name",
               "price" => "120.5",
               "ram" => "some ram",
               "screen" => "some screen",
               "slug" => "some-name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.phone_path(conn, :create), phone: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update phone" do
    setup [:create_phone]

    test "renders phone when data is valid", %{conn: conn, phone: %Phone{id: id} = phone} do
      conn = put(conn, Routes.phone_path(conn, :update, phone), phone: @update_attrs)
      assert %{"id" => ^id, "slug" => slug} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.phone_path(conn, :show, slug))

      assert %{
               "id" => id,
               "color" => "some updated color",
               "description" => "some updated description",
               "imageFileName" => "some updated imageFileName",
               "manufacturer" => "some updated manufacturer",
               "name" => "some updated name",
               "price" => "456.7",
               "ram" => "some updated ram",
               "screen" => "some updated screen",
               "slug" => "some-updated-name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, phone: phone} do
      conn = put(conn, Routes.phone_path(conn, :update, phone), phone: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete phone" do
    setup [:create_phone]

    test "deletes chosen phone", %{conn: conn, phone: phone} do
      conn = delete(conn, Routes.phone_path(conn, :delete, phone))
      assert response(conn, 200)

      assert_error_sent 404, fn ->
        get(conn, Routes.phone_path(conn, :show, phone))
      end
    end
  end

  defp create_phone(_) do
    phone = fixture(:phone)
    %{phone: phone}
  end
end
