defmodule Lotus.Lotus.Curriculo do
  use Ecto.Schema
  import Ecto.Changeset

  schema "curriculo" do
    field :caminho, :string
    field :id_usuario, :integer

    timestamps()
  end

  @doc false
  def changeset(curriculo, attrs) do
    curriculo
    |> cast(attrs, [:caminho, :"", :id_usuario, :""])
    |> validate_required([:caminho, :"", :id_usuario, :""])
  end
end
