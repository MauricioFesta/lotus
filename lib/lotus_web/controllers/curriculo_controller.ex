defmodule LotusWeb.CurriculoController do
    use LotusWeb, :controller
    alias Lotus.{Repo, User}

    def cadastro_curriculo(conn, %{}) do 

        conn |> IO.inspect

        json(conn, "Ok")

    end 


  end
