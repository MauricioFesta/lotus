defmodule Lotus.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "user" do
    field :email, :string
    field :nome, :string
    field :senha, :string
    field :permissao, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:nome, :email, :senha, :permissao])
    |> validate_required([:nome, :email, :senha, :permissao])
  end
end
