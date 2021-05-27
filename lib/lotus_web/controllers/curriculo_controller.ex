defmodule LotusWeb.CurriculoController do
    use LotusWeb, :controller
    alias Lotus.{Repo, Curriculo}
    import Ecto.Query

    def cadastro_curriculo(conn, params) do 

       id_user =  get_session(conn, "idUser");

        if upload = params["file"] do

            file64 =  File.read!(upload.path) |> Base.encode64();

            statement = "INSERT INTO lotus_dev.curriculo (id, file_base64, id_usuario) VALUES (uuid(), '#{file64}', '#{id_user}')"
            
            case Xandra.execute!(Cassandra, statement, _params = []) do
                {:ok, _res} -> json(conn, "OK")
                _ -> json(conn, "Error")
            end
         
        end

    end 

    def consulta_curriculo(conn, %{}) do

        id_user =  get_session(conn, "idUser");

        statement =  "SELECT id FROM lotus_dev.curriculo WHERE id_usuario = '#{id_user}' ALLOW FILTERING"
        
        {:ok, %Xandra.Page{} = page} = Xandra.execute(Cassandra, statement, _params = [])
         Enum.to_list(page)

        if page |> Enum.at(0) != nil do
        
         json(conn, Enum.to_list(page))

        else

            json(conn, "Nenhum curriculo encontrado")

        end
         
    end

    def download_curriculo(conn, %{"id" => id_curriculo}) do

       res =  Repo.get_by(Curriculo, %{id: id_curriculo})

       if res == nil do

        json(conn, "Error")
           
       else 
            file_name = UUID.uuid1() <> ".pdf"
            case Base.decode64(res.file_base64) do
                {:ok, decoded} -> if File.write!("assets/public/pdf_tmp/" <> file_name, decoded) == :ok do
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
