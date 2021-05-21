defmodule Lotus.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "user" do
    field :email, :string
    field :nome, :string
    field :senha, :string
    field :is_empresa, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:nome, :email, :senha, :is_empresa])
    |> validate_required([:nome, :email, :senha, :is_empresa])
  end
end
