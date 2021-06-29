defmodule LotusWeb.CurriculoController do
    use LotusWeb, :controller
 
    def cadastro_curriculo(conn, params) do 

       id_user =  get_session(conn, "idUser");

       cql2 = "SELECT COUNT(*) FROM lotus_dev.curriculo WHERE id_usuario = #{id_user} AND principal = true ALLOW FILTERING"

       {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql2, _params = [])
       
      bol = if page |> Enum.to_list |> Enum.at(0) |> Map.get("count") < 1  do

                     true
  
                else
            
                    false
  
            end
           

    
        if upload = params["file"] do

            file64 =  File.read!(upload.path) |> Base.encode64();

            new_params = %{} |> Map.put(:file_base64,file64) 
            |> Map.put(:descricao,params["descricao"]) 
            |> Map.put(:id,params["id"]) 
            |> Map.put(:id_usuario, id_user)
            |> Map.put(:principal, bol)
        

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

        statement =  "SELECT id, descricao, principal FROM lotus_dev.curriculo WHERE id_usuario = #{id_user} ALLOW FILTERING"
        
        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, statement, _params = [])
        
      

        if page |> Enum.at(0) != nil do
        
         json(conn, Enum.to_list(page))

        else
          
            json(conn, [])

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

    def download_curriculo_candidato(conn, %{"id" => id_candidato}) do

        statement = "SELECT file_base64 FROM lotus_dev.curriculo WHERE id_usuario = #{id_candidato} AND principal = true ALLOW FILTERING"

        {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, statement, _params = [])
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

    def curriculo_principal(conn, %{"id" => id_curriculo, "boolean" => bol}) do

        id_user =  get_session(conn, "idUser") |> IO.inspect
     
        cql = "UPDATE lotus_dev.curriculo SET principal = #{bol} WHERE id = ?"
        cql2 = "SELECT COUNT(*) FROM lotus_dev.curriculo WHERE id_usuario = #{id_user} AND principal = true ALLOW FILTERING"

    
        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql2, _params = [])
       
        if page |> Enum.to_list |> Enum.at(0) |> Map.get("count") < 1 || !bol do
 
            case Xandra.execute(CassPID, cql, [{"uuid", id_curriculo}]) do
                    {:ok, _} ->  json(conn, "Ok")
                    _ -> json(conn, "Error")
            
            end
   
           else
             
            json(conn, "Warn")
   
        end
            
        
      

      
    end

    def convert!("true"), do: true
    def convert!("false"), do: false

  end
