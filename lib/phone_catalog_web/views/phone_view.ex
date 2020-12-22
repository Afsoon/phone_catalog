defmodule PhoneCatalogWeb.PhoneView do
  use PhoneCatalogWeb, :view
  alias PhoneCatalogWeb.PhoneView

  def render("index.json", %{phones: phones}) do
    %{data: render_many(phones, PhoneView, "phone.json")}
  end

  def render("show.json", %{phone: phone}) do
    %{data: render_one(phone, PhoneView, "phone.json")}
  end

  def render("phone.json", %{phone: phone}) do
    %{id: phone.id,
      name: phone.name,
      ram: phone.ram,
      price: phone.price,
      screen: phone.screen,
      manufacturer: phone.manufacturer,
      color: phone.color,
      description: phone.description,
      slug: phone.slug,
      imageFileName: phone.imageFileName}
  end
end
