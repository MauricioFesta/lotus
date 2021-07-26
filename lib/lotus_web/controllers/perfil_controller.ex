
defmodule LotusWeb.PerfilController do
    use LotusWeb, :controller

    def alterar_perfil(conn, params) do

        id_user =  get_session(conn, "idUser");

        params |> IO.inspect
    
      query = if params["file_base64"] != nil do
           
            file64 =  File.read!(params["file_base64"].path) |> Base.encode64();

            "UPDATE lotus_dev.user SET email = '#{params["email"]}', nome = '#{params["nome"]}', senha = '#{params["senha"]}',foto_base64 = '#{file64}' WHERE id = '#{id_user}'"

            else

           "UPDATE lotus_dev.user SET email = '#{params["email"]}', nome = '#{params["nome"]}', senha = '#{params["senha"]}' WHERE id = '#{id_user}'"


        end


        case Xandra.execute(CassPID, query , _params = []) do
            {:ok, _} -> json(conn, %{Ok: true})
            _ -> json(conn, %{Ok: false})
        
        end


    end

    def lista_notificacoes(conn,params) do
        id_user =  get_session(conn, "idUser");

        cql = "SELECT notificacoes FROM lotus_dev.user WHERE id = '#{id_user}'"
        
        {:ok, %Xandra.Page{} = page } = Xandra.execute(CassPID, cql, _params = []) 

        json(conn, Enum.to_list(page))
    end

    def get_perfil(conn, _params) do

        id_user =  get_session(conn, "idUser");

        sql =  "SELECT email, nome, senha, foto_base64 FROM lotus_dev.user WHERE id = '#{id_user}'"

        {:ok, %Xandra.Page{} = page } = Xandra.execute(CassPID, sql,  _params = []) 

        if page |> Enum.at(0) != nil do
        
            json(conn, Enum.to_list(page))
   
           else
   
               json(conn, %{Ok: false})
   
        end
        
    end
    


end