
defmodule LotusWeb.PerfilController do
    use LotusWeb, :controller

    def alterar_perfil(conn, params) do
        
        id_user =  get_session(conn, "id") 

        select = "SELECT senha FROM lotus_dev.user WHERE id = '#{id_user["id"]}'"

        {:ok, %Xandra.Page{} = page_cql } = Xandra.execute(CassPID, select, _params = [])

        page = page_cql |> Enum.to_list |> hd

       query = cond do 

            page["senha"] != params["senha"] && params["foto_base64"] != nil -> 

                senha_hash = Bcrypt.hash_pwd_salt(params["senha"])
                file64 =  base64_image(params["foto_base64"])

                "UPDATE lotus_dev.user SET nome = '#{params["nome"]}', senha = '#{senha_hash}',foto_base64 = '#{file64}' WHERE id = '#{id_user["id"]}'"

            params["foto_base64"] != nil ->

                file64 =  base64_image(params["foto_base64"])

                "UPDATE lotus_dev.user SET nome = '#{params["nome"]}',foto_base64 = '#{file64}' WHERE id = '#{id_user["id"]}'"

            page["senha"] != params["senha"] -> 

                senha_hash = Bcrypt.hash_pwd_salt(params["senha"])
                "UPDATE lotus_dev.user SET nome = '#{params["nome"]}', senha = '#{senha_hash}' WHERE id = '#{id_user["id"]}'"

            true ->

                "UPDATE lotus_dev.user SET nome = '#{params["nome"]}' WHERE id = '#{id_user["id"]}'"
        end

        case Xandra.execute(CassPID, query , _params = []) do
            {:ok, _} -> json(conn, %{Ok: true})
            _ -> json(conn, %{Ok: false})
        
        end


    end

    def lista_notificacoes(conn,params) do

        id_user =  get_session(conn, "id")["id"]

        query = Mongo.find(:mongo, "notifications", %{"empresa_id" => id_user, "viewed" => false }) |> Enum.to_list

        |> Enum.map(fn x -> 


            cql = "SELECT nome FROM lotus_dev.user WHERE id = '#{x["user_id"]}'"
        
            {:ok, %Xandra.Page{} = page } = Xandra.execute(CassPID, cql, _params = [])

            name = page |> Enum.to_list |> hd |> Map.get("nome")

            x |> Map.put_new("nome", name)
        
        
        
        end)

    
        json(conn, query)
    end

    def get_perfil(conn, _params) do

        id_user =  get_session(conn, "id")["id"]

        sql =  "SELECT email, nome, senha, foto_base64 FROM lotus_dev.user WHERE id = '#{id_user}'"

        {:ok, %Xandra.Page{} = page } = Xandra.execute(CassPID, sql,  _params = []) 

        if page |> Enum.at(0) != nil do
        
            json(conn, Enum.to_list(page))
   
           else
   
               json(conn, %{Ok: false})
   
        end
        
    end

    defp base64_image(vl) when is_binary(vl), do: vl

    defp base64_image(vl), do: File.read!(vl.path) |> Base.encode64();
    

end