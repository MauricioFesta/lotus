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
            file_name = "123.pdf"
            case Base.decode64(res.file_base64) do
                {:ok, decoded} -> if File.write!("/tmp/" <> file_name, decoded) == :ok do
                    json(conn, file_name)
                end
                _-> json(conn, "Error")

            end

       end
        
    end


    def excluir_curriculo(conn, %{"id" => id_curriculo}) do

        res =  Repo.get_by(Curriculo, %{id: id_curriculo})

        case Repo.delete res do
            {:ok, struct}       -> json(conn, "Ok")
            {:error, changeset} -> json(conn, "Error")
        end
        
    end


  end
