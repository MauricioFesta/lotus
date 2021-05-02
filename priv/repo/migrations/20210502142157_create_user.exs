defmodule Lotus.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:user) do
      add :nome, :string, null: false
      add :email, :string, null: false
      add :senha, :string, null: false
    end

  end
end
