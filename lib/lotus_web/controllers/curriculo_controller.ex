defmodule LotusWeb.CurriculoController do
    use LotusWeb, :controller
    alias Lotus.{Repo, Curriculo}
    import Ecto.Query

    def cadastro_curriculo(conn, params) do 

       id_user =  get_session(conn, "idUser");

        if upload = params["file"] do

            case Repo.insert(%Curriculo{file_base64: File.read!(upload.path) |> Base.encode64(), id_usuario: id_user}) do
                {:ok, result} -> json(conn, "OK")
                _ -> json(conn, "Error")
    
            end
         
        end

    end 

    def consulta_curriculo(conn, %{}) do

        id_user =  get_session(conn, "idUser");

       res =  Repo.all(from u in "curriculo",
          where: u.id_usuario == ^id_user,
          select: u.id)

        if res == nil do
            json(conn, "Error")
        else
            json(conn, res)
        end  
        
    end

    def download_curriculo(conn, %{"id" => id_curriculo}) do

       res =  Repo.get_by(Curriculo, %{id: id_curriculo})

       if res == nil do

        json(conn, "Error")
           
       else 

        {:ok, encoded} = JSON.encode(res.file_base64)

        json(conn, encoded)

       end
        
    end


  end
