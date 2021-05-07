defmodule Lotus.Repo.Migrations.CreateCurriculo do
  use Ecto.Migration

  def change do
    create table(:curriculo) do
      add :caminho, :string
      add :id_usuario, :string

      timestamps()
    end

  end
end
