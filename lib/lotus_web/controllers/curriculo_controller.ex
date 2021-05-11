defmodule LotusWeb.CurriculoController do
    use LotusWeb, :controller
    alias Lotus.{Repo, Curriculo}

    def cadastro_curriculo(conn, params) do 

       id_user =  get_session(conn, "idUser");

        if upload = params["file"] do

            case Repo.insert(%Curriculo{file_base64: File.read!(upload.path) |> Base.encode64(), id_usuario: id_user}) do
                {:ok, result} -> json(conn, "OK")
                _ -> json(conn, "Error")
    
            end
         
        end

    end 

    def get_curriculo(conn, %{}) do

        id_user =  get_session(conn, "idUser");
        
        case Repo.get_by(Curriculo, id_usuario: id_user) do

            {:ok, result} -> json(conn, result)
            _ -> json(conn, "Error")
            
        end

    end


  end
