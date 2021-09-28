
defmodule LotusWeb.PerfilController do
    use LotusWeb, :controller

    def alterar_perfil(conn, params) do
        
        id_user =  get_session(conn, "id")

        params |> IO.inspect
    
      query = if params["foto_base64"] != nil do
   
            file64 =  base64_image(params["foto_base64"])

            "UPDATE lotus_dev.user SET nome = '#{params["nome"]}', senha = '#{params["senha"]}',foto_base64 = '#{file64}' WHERE id = '#{id_user["id"]}' AND email = '#{id_user["email"]}'"

            else

           "UPDATE lotus_dev.user SET nome = '#{params["nome"]}', senha = '#{params["senha"]}' WHERE id = '#{id_user["id"]}' AND email = '#{id_user["email"]}'"


        end


        case Xandra.execute(CassPID, query , _params = []) do
            {:ok, _} -> json(conn, %{Ok: true})
            _ -> json(conn, %{Ok: false})
        
        end


    end

    def lista_notificacoes(conn,params) do
        id_user =  get_session(conn, "id")["id"]

        cql = "SELECT notificacoes FROM lotus_dev.user WHERE id = '#{id_user}'"
        
        {:ok, %Xandra.Page{} = page } = Xandra.execute(CassPID, cql, _params = []) 

        json(conn, Enum.to_list(page))
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