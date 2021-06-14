
defmodule LotusWeb.PerfilController do
    use LotusWeb, :controller

    def alterar_perfil(conn, params) do


        id_user =  get_session(conn, "idUser");

        id_user |> IO.inspect

        file64 = if params["file"] !=  "undefined" do
           
            File.read!(params["file"].path) |> Base.encode64();

            else

            "false"

        end

        conn.assigns[:id] |> IO.inspect
        IO.puts "Assigns aqui"

        sql = "UPDATE lotus_dev.user SET nome = '#{params["nome"]}', senha = '#{params["senha"]}',foto_base64 = '#{file64}' WHERE WHERE id = ?"

        case Xandra.execute(CassPID, sql, [{"uuid", id_user}]) do
            {:ok, _} ->  json(conn, "Ok")
            _ -> json(conn, "Error")

        end
    end
    


end