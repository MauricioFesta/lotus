defmodule LotusWeb.PostagensController do
    use LotusWeb, :controller

    def cadastro_postagem(conn, params) do

        new_params = params 
        |> Map.put_new(:inserted_at,DateTime.utc_now |> DateTime.add(-10800))
		|> Map.put_new(:updated_at,DateTime.utc_now |> DateTime.add(-10800))

        {:ok, data} = JSON.encode(new_params) 
      
        cql =  "INSERT INTO lotus_dev.postagens JSON '#{data}'"

        case Xandra.execute(CassPID,cql, _params = [])  do
            {:ok, _} -> json(conn, %{"Ok": true})
            _ -> json(conn, %{"Ok": false})
        end
    
    end

    def list_postagens(conn, params) do

        sql = "SELECT * FROM lotus_dev.postagens";

        %Xandra.Page{} = page = Xandra.execute!(CassPID, sql, _params = [])

        if page |> Enum.at(0) != nil do
            
            json(conn, Enum.to_list(page))
        else

            json(conn, "Nenhuma postagem cadastrada")
        end


    end




end