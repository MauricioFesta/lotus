defmodule LotusWeb.CurriculoController do
    use LotusWeb, :controller
    alias Lotus.Curriculo

    def valida_principal_curriculo(conn) do   

        id_user =  get_session(conn, "idUser");

        cql2 = "SELECT id FROM lotus_dev.curriculo WHERE id_usuario = '#{id_user}' AND principal = true ALLOW FILTERING"
 
        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql2, _params = [])

          bol = if Enum.count(page) < 1  do

                    true
  
                else
            
                    false
  
                 end

          bol
           
    end
 
    def cadastro_curriculo(conn, params) do 

        id_user =  get_session(conn, "idUser");

        bol = valida_principal_curriculo(conn) |> IO.inspect
        
        if upload = params["file"] do

            file64 =  File.read!(upload.path) |> Base.encode64();

            {:ok, file_name} = ExCrypto.generate_aes_key(:aes_128, :base64)

            ret___ = Lotus.Py.get_image_pdf(upload.path,file_name)
     
            {:ok, file___} = ret___ |> hd |> File.read

        
            new_params = %{} |> Map.put(:file_base64,file64) 
            |> Map.put(:descricao,params["descricao"]) 
            |> Map.put(:id,params["id"]) 
            |> Map.put(:id_usuario, id_user)
            |> Map.put(:principal, bol)
            |> Map.put(:image_base64, file___ |> Base.encode64)

            {:ok, data} = JSON.encode(new_params) 
         
            statement = "INSERT INTO lotus_dev.curriculo JSON '#{data}'"
        
            case Xandra.execute!(CassPID, statement, _params = []) do
                {:ok, _res} -> json(conn, "OK")
                _ -> json(conn, "Error")
            end
         
        end


    end 

    def cadastro_curriculo_base64(conn, params) do 

        id_user =  get_session(conn, "idUser");

        bol = valida_principal_curriculo(conn)

        {:ok, file_name} = ExCrypto.generate_aes_key(:aes_128, :base64)

        new_file_name = file_name <> ".pdf"

        params["base64"] |> Base.decode64 |> IO.inspect

        File.write("/tmp/" <> new_file_name,params["base64"] |> Base.decode64) |> IO.inspect

        file___  = case params["base64"] |> Base.decode64 do

            {:ok, decoded} -> if File.write!("/tmp/" <> new_file_name, decoded) == :ok do

                ret___ = Lotus.Py.get_image_pdf("/tmp/" <> new_file_name, new_file_name)

                {:ok, file___} = ret___ |> hd |> File.read

                file___

            end
            _->  ""

       end

    
        new_params = %{} |> Map.put(:file_base64,params["base64"]) 
        |> Map.put(:descricao,params["descricao"]) 
        |> Map.put(:id,params["id"]) 
        |> Map.put(:id_usuario, id_user)
        |> Map.put(:principal, bol)
        |> Map.put(:image_base64, file___ |> Base.encode64)
    

        {:ok, data} = JSON.encode(new_params) 
     
        statement = "INSERT INTO lotus_dev.curriculo JSON '#{data}'"
    
        case Xandra.execute!(CassPID, statement, _params = []) do
            {:ok, _res} -> json(conn, "OK")
            _ -> json(conn, "Error")
        end

    end 

    def cadastro_curriculo_form(conn, params) do   

        id_user =  get_session(conn, "idUser");

        bol = valida_principal_curriculo(conn)

        path_pdf = Curriculo.generate_pdf(params)

        file64 =  File.read!(path_pdf ) |> Base.encode64();

        new_params = %{} 
            |> Map.put(:file_base64,file64) 
            |> Map.put(:descricao,params["descricao"]) 
            |> Map.put(:id,params["id"]) 
            |> Map.put(:id_usuario, id_user)
            |> Map.put(:principal, bol)
            |> Map.put(:image_base64, "react native")

        {:ok, data} = JSON.encode(new_params) 
     
        statement = "INSERT INTO lotus_dev.curriculo JSON '#{data}'"

    
        case Xandra.execute!(CassPID, statement, _params = []) do
            {:ok, _res} -> json(conn, "OK")
            {:error, _res} -> json(conn, "Error")
            _ -> json(conn, "OK")
        end


    end

    def consulta_curriculo(conn, %{}) do

        id_user =  get_session(conn, "idUser");

        statement =  "SELECT id, descricao, principal, image_base64 FROM lotus_dev.curriculo WHERE id_usuario = '#{id_user}' ALLOW FILTERING"
        
        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, statement, _params = [])
        
        if page |> Enum.at(0) != nil do
        
         json(conn, Enum.to_list(page))

        else
          
            json(conn, [])

        end
         
    end

    def download_curriculo(conn, %{"id" => id_curriculo}) do

        statement = "SELECT file_base64 FROM lotus_dev.curriculo WHERE id = '#{id_curriculo}'"

        {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, statement,  _params = [])
        {:ok, base} = page |> Enum.at(0) |> Map.fetch("file_base64") 
     
        if page |> Enum.at(0) != nil do

            file_name = UUID.uuid4() <> ".pdf"

           case Base.decode64(base) do

                {:ok, decoded} -> if File.write!("assets/public/pdf_tmp/" <> file_name, decoded) == :ok do
                     json(conn, file_name)
                end
                _-> json(conn, "Error")

           end

        end
              
    end

    def download_curriculo_candidato(conn, %{"id" => id_candidato}) do

        statement = "SELECT file_base64 FROM lotus_dev.curriculo WHERE id_usuario = '#{id_candidato}' AND principal = true ALLOW FILTERING"

        {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, statement, _params = [])
        {:ok, base} = page |> Enum.at(0) |> Map.fetch("file_base64") 
     
        if page |> Enum.at(0) != nil do

            file_name = UUID.uuid4() <> ".pdf"

           case Base.decode64(base) do

                {:ok, decoded} -> if File.write!("assets/public/pdf_tmp/" <> file_name, decoded) == :ok do
                     json(conn, file_name)
                end
                _-> json(conn, "Error")

           end

        end
        
    end


    def excluir_curriculo(conn, %{"id" => id_curriculo}) do

        statement = "DELETE FROM lotus_dev.curriculo WHERE id = '#{id_curriculo}'"

        case Xandra.execute(CassPID, statement,  _params = []) do
            {:ok, _} ->  json(conn, "Ok")
            _ -> json(conn, "Error")

        end

    end

    def curriculo_principal(conn, %{"id" => id_curriculo, "boolean" => bol}) do

        id_user =  get_session(conn, "idUser") |> IO.inspect
     
        cql = "UPDATE lotus_dev.curriculo SET principal = #{bol} WHERE id = '#{id_curriculo}'"
        cql2 = "SELECT id FROM lotus_dev.curriculo WHERE id_usuario = '#{id_user}' AND principal = true ALLOW FILTERING"
       
        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql2, _params = [])|> IO.inspect
      
        if  Enum.count(page) < 1 || !bol do
 
            case Xandra.execute(CassPID, cql, _params = []) do
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
