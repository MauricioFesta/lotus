defmodule Lotus.Curriculo do
  use Ecto.Schema
  import Ecto.Changeset

  schema "curriculo" do
    field :file_base64, :string
    field :id_usuario, :integer
    field :descricao, :string

    timestamps()
  end

  @doc false
  def changeset(curriculo, attrs) do
    curriculo
    |> cast(attrs, [:file_base64, :"", :id_usuario, :"", :descricao, :""])
    |> validate_required([:file_base64, :"", :id_usuario, :"", :descricao, :""])
  end
end
