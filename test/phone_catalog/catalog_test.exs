defmodule PhoneCatalog.CatalogTest do
  use PhoneCatalog.DataCase

  alias PhoneCatalog.Catalog

  describe "phones" do
    alias PhoneCatalog.Catalog.Phone

    @valid_attrs %{color: "some color", description: "some description", imageFileName: "some imageFileName", manufacturer: "some manufacturer", name: "some name", price: "120.5", ram: "some ram", screen: "some screen", slug: "some slug"}
    @update_attrs %{color: "some updated color", description: "some updated description", imageFileName: "some updated imageFileName", manufacturer: "some updated manufacturer", name: "some updated name", price: "456.7", ram: "some updated ram", screen: "some updated screen", slug: "some updated slug"}
    @invalid_attrs %{color: nil, description: nil, imageFileName: nil, manufacturer: nil, name: nil, price: nil, ram: nil, screen: nil, slug: nil}

    def phone_fixture(attrs \\ %{}) do
      {:ok, phone} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Catalog.create_phone()

      phone
    end

    test "list_phones/0 returns all phones" do
      phone = phone_fixture()
      assert Catalog.list_phones() == [phone]
    end

    test "get_phone!/1 returns the phone with given id" do
      phone = phone_fixture()
      assert Catalog.get_phone!(phone.id) == phone
    end

    test "create_phone/1 with valid data creates a phone" do
      assert {:ok, %Phone{} = phone} = Catalog.create_phone(@valid_attrs)
      assert phone.color == "some color"
      assert phone.description == "some description"
      assert phone.imageFileName == "some imageFileName"
      assert phone.manufacturer == "some manufacturer"
      assert phone.name == "some name"
      assert phone.price == Decimal.new("120.5")
      assert phone.ram == "some ram"
      assert phone.screen == "some screen"
      assert phone.slug == "some-name"
    end

    test "create_phone/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Catalog.create_phone(@invalid_attrs)
    end

    test "update_phone/2 with valid data updates the phone" do
      phone = phone_fixture()
      assert {:ok, %Phone{} = phone} = Catalog.update_phone(phone, @update_attrs)
      assert phone.color == "some updated color"
      assert phone.description == "some updated description"
      assert phone.imageFileName == "some updated imageFileName"
      assert phone.manufacturer == "some updated manufacturer"
      assert phone.name == "some updated name"
      assert phone.price == Decimal.new("456.7")
      assert phone.ram == "some updated ram"
      assert phone.screen == "some updated screen"
      assert phone.slug == "some-updated-name"
    end

    test "update_phone/2 with invalid data returns error changeset" do
      phone = phone_fixture()
      assert {:error, %Ecto.Changeset{}} = Catalog.update_phone(phone, @invalid_attrs)
      assert phone == Catalog.get_phone!(phone.id)
    end

    test "delete_phone/1 deletes the phone" do
      phone = phone_fixture()
      assert {:ok, %Phone{}} = Catalog.delete_phone(phone)
      assert_raise Ecto.NoResultsError, fn -> Catalog.get_phone!(phone.id) end
    end

    test "change_phone/1 returns a phone changeset" do
      phone = phone_fixture()
      assert %Ecto.Changeset{} = Catalog.change_phone(phone)
    end
  end
end
