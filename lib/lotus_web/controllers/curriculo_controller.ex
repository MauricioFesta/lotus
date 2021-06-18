defmodule LotusWeb.CurriculoController do
    use LotusWeb, :controller
 
    def cadastro_curriculo(conn, params) do 

       id_user =  get_session(conn, "idUser");

    
        if upload = params["file"] do

            file64 =  File.read!(upload.path) |> Base.encode64();

            new_params = %{} |> Map.put(:file_base64,file64) |> Map.put(:descricao,params["descricao"]) |> Map.put(:id,params["id"]) |> Map.put(:id_usuario, id_user)
        

            {:ok, data} = JSON.encode(new_params) 
         
            statement = "INSERT INTO lotus_dev.curriculo JSON '#{data}'"
        
            case Xandra.execute!(CassPID, statement, _params = []) do
                {:ok, _res} -> json(conn, "OK")
                _ -> json(conn, "Error")
            end
         
        end

    end 

    def consulta_curriculo(conn, %{}) do

        id_user =  get_session(conn, "idUser");

        statement =  "SELECT id, descricao FROM lotus_dev.curriculo WHERE id_usuario = '#{id_user}' ALLOW FILTERING"
        
        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, statement, _params = [])
         
        if page |> Enum.at(0) != nil do
        
         json(conn, Enum.to_list(page))

        else

            json(conn, "Nenhum curriculo encontrado")

        end
         
    end

    def download_curriculo(conn, %{"id" => id_curriculo}) do

        statement = "SELECT file_base64 FROM lotus_dev.curriculo WHERE id = ?"

        {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, statement, [{"uuid", id_curriculo}])
        {:ok, _base} = page |> Enum.at(0) |> Map.fetch("file_base64") 
     
        if page |> Enum.at(0) != nil do

            file_name = UUID.uuid4() <> ".pdf"

           case Base.decode64(_base) do

                {:ok, decoded} -> if File.write!("assets/public/pdf_tmp/" <> file_name, decoded) == :ok do
                     json(conn, file_name)
                end
                _-> json(conn, "Error")

           end

        end
              
    end


    def excluir_curriculo(conn, %{"id" => id_curriculo}) do

        statement = "DELETE FROM lotus_dev.curriculo WHERE id = ?"

        case Xandra.execute(CassPID, statement, [{"uuid", id_curriculo}]) do
            {:ok, _} ->  json(conn, "Ok")
            _ -> json(conn, "Error")

        end

    end

  end
