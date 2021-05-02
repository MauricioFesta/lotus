defmodule Friends.User do
    use Ecto.Schema
  
    schema "user" do
        field :nome, :string, null: false
        field :email, :string, null: false
        field :senha, :string, null: false
    end
  end