defmodule Lotus.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:user) do
      add :nome, :string
      add :email, :string
      add :senha, :string
      add :is_empresa, :string

      timestamps()
    end

  end
end
