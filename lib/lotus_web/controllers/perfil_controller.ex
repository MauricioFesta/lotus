
defmodule LotusWeb.PerfilController do
    use LotusWeb, :controller

    def alterar_perfil(conn, params) do


        id_user =  get_session(conn, "idUser");
    
        file64 = if params["file"] != nil do
           
            File.read!(params["file"].path) |> Base.encode64();

            else

            "false"

        end

    
        sql = "UPDATE lotus_dev.user SET email = '#{params["email"]}', nome = '#{params["nome"]}', senha = '#{params["senha"]}',foto_base64 = '#{file64}' WHERE id = ?"

        case Xandra.execute(CassPID, sql, [{"uuid", id_user}]) do
            {:ok, _} -> json(conn, %{Ok: true})
            _ -> json(conn, %{Ok: false})
        
        end

    end

    def get_perfil(conn, _params) do

        id_user =  get_session(conn, "idUser");

        sql =  "SELECT email, nome, senha, foto_base64 FROM lotus_dev.user WHERE id = ?"

        {:ok, %Xandra.Page{} = page } = Xandra.execute(CassPID, sql, [{"uuid", id_user}]) 

        if page |> Enum.at(0) != nil do
        
            json(conn, Enum.to_list(page))
   
           else
   
               json(conn, %{Ok: false})
   
        end
        
    end
    


end