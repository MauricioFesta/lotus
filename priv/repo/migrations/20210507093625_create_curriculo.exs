defmodule Lotus.Repo.Migrations.CreateCurriculo do
  use Ecto.Migration

  def change do
    create table(:curriculo) do
      add :file_base64, :string 
      add :id_usuario, :integer
      add :descricao, :string
      timestamps()
    end

  end
end
