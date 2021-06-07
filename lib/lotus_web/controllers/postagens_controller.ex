defmodule LotusWeb.PostagensController do
    use LotusWeb, :controller

    def cadastro_postagem(conn, params) do

        params["descricao"] |> IO.inspect

        sql = "INSERT INTO lotus_dev.postagens (id, descricao) VALUES (uuid(), '#{params["descricao"]}')"
        
       case Xandra.execute!(CassPID, sql, _params = []) do
           {:ok, _} -> json(conn, %{Ok: true})
           _ -> json(conn, %{Ok: false})
       end


    end




end