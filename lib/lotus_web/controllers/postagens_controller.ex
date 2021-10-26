defmodule LotusWeb.PostagensController do
    use LotusWeb, :controller

    def cadastro_postagem(conn, params) do

        id_user = get_session(conn, "id")["id"]

        cql_user = "SELECT nome FROM lotus_dev.user WHERE id = '#{id_user}'"

        {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, cql_user, _params = [])

        nome_empresa =  page |> Enum.to_list |> hd |> Map.get("nome")
        
        params_new = params |> Map.put_new("empresa_razao", nome_empresa) 

        |> Map.put_new("empresa_id", id_user)

        {:ok, data} = JSON.encode(params_new ) 
    
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

    def list_postagens_empresa(conn, params) do 

        id_user = get_session(conn, "id")["id"]

        sql = "SELECT * FROM lotus_dev.postagens WHERE empresa_id = '#{id_user}'";

        %Xandra.Page{} = page = Xandra.execute!(CassPID, sql, _params = [])

        if page |> Enum.at(0) != nil do
            
            json(conn, Enum.to_list(page))
        else

            json(conn, "Nenhuma postagem cadastrada")
        end

    end 

    def update_postagens(conn, params) do   

        id_user = get_session(conn, "id")["id"]

    end 





end