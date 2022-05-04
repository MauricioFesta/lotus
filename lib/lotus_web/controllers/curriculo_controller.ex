defmodule LotusWeb.CurriculoController do
    use LotusWeb, :controller
    alias Lotus.Curriculo

    def valida_principal_curriculo(conn) do   

        id_user =  get_session(conn, "id")["id"]

        cql2 = "SELECT id FROM lotus_dev.curriculo WHERE id_usuario = '#{id_user}' AND principal = true"
 
        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql2, _params = [])

          bol = if Enum.count(page) < 1  do

                    true
  
                else
            
                    false
  
                 end

          bol
           
    end
 
    def cadastro_curriculo(conn, params) do 
        params["file"] |> IO.inspect

        id_user =  get_session(conn, "id")["id"] 

        bol = valida_principal_curriculo(conn)

        ext = params["file"].filename |> String.split(".") |> tl |> hd
        
        if upload = params["file"] do

            file64 =  File.read!(upload.path) |> Base.encode64();
            
           file___ = if params["file"].filename |> String.split(".") |> tl |> hd == "pdf" do

                {:ok, file_name} = ExCrypto.generate_aes_key(:aes_128, :base64)

                ret___ = Lotus.Py.get_image_pdf(upload.path,file_name)
         
                {:ok, file___} = ret___ |> hd |> File.read

                file___


            else

                ""
            end

    
            new_params = %{} |> Map.put(:file_base64,file64) 
            |> Map.put(:descricao,params["descricao"]) 
            |> Map.put(:id,params["id"]) 
            |> Map.put(:id_usuario, id_user)
            |> Map.put(:principal, bol)
            |> Map.put(:extencao, ext)
            |> Map.put(:image_base64, file___ |> Base.encode64)
            |> Map.put("inserted_at", DateTime.utc_now |> DateTime.add(-10800) |> DateTime.to_unix())
            |> Map.put("updated_at", DateTime.utc_now |> DateTime.add(-10800) |> DateTime.to_unix())

            {:ok, data} = JSON.encode(new_params) 
         
            statement = "INSERT INTO lotus_dev.curriculo JSON '#{data}'"
        
            case Xandra.execute!(CassPID, statement, _params = []) do
                {:ok, _res} -> json(conn, "OK")
                _ -> json(conn, "Error")
            end
         
        end


    end 

    def cadastro_curriculo_base64(conn, params) do 

        id_user =  get_session(conn, "id")["id"]

        bol = valida_principal_curriculo(conn)

        {:ok, file_name} = ExCrypto.generate_aes_key(:aes_128, :base64)

        #new_file_name = file_name

        # File.write("/tmp/" <> new_file_name,params["base64"] |> Base.decode64)

        file___  = case params["base64"] |> Base.decode64 do

            {:ok, decoded} -> if File.write!("/tmp/" <> file_name, decoded) == :ok do

                ret___ = Lotus.Py.get_image_pdf("/tmp/" <> file_name, file_name)

                ret___ |> IO.inspect
                

                cond do

                    ret___ |> hd == "" -> ""

                    true ->  {:ok, file___} = ret___ |> hd |> File.read


                end


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
        
        new_p =  params |> Map.drop(["fmr_curso", "fmr_ano", "fmr_instituicao",
        "exp_cargo","exp_ano","exp_empresa"
        ])

        id_user =  get_session(conn, "id")["id"]

        params |> IO.inspect

        bol = valida_principal_curriculo(conn)

        query = "SELECT email FROM lotus_dev.user WHERE id = '#{id_user}'"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, query, _params = [])

        email = page |> Enum.to_list |> hd |> Map.get("email")
        
        base64_foto =  case is_binary(params["foto_curriculo"]) do   

            true ->  params["foto_curriculo"]

            _ -> File.read!(params["foto_curriculo"].path) |> Base.encode64

        end

        path_pdf = Curriculo.generate_pdf(params, base64_foto, email)

        file64 =  File.read!(path_pdf ) |> Base.encode64();

        new_params = %{} 
            |> Map.put(:file_base64,file64) 
            |> Map.put(:descricao,params["descricao"]) 
            |> Map.put(:id,params["id"]) 
            |> Map.put(:id_usuario, id_user)
            |> Map.put(:principal, bol)
            |> Map.put(:image_base64, base64_foto)

        {:ok, data} = JSON.encode(new_params) 
     
        statement = "INSERT INTO lotus_dev.curriculo JSON '#{data}'"

    
        case Xandra.execute!(CassPID, statement, _params = []) do
            {:ok, _res} -> json(conn, "OK")
            {:error, _res} -> json(conn, "Error")
            _ -> json(conn, "OK")
        end


    end

    def consulta_curriculo(conn, %{}) do

        id_user =  get_session(conn, "id")["id"]

         statement =  "SELECT id, descricao, principal, image_base64 FROM lotus_dev.curriculo WHERE id_usuario = '#{id_user}'"
        
         {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, statement, _params = [])
        
         if page |> Enum.at(0) != nil do
        
          json(conn, Enum.to_list(page))

         else
          
             json(conn, [])

         end
         
    end

    def download_curriculo(conn, %{"id" => id_curriculo}) do

        id_user =  get_session(conn, "id")["id"]

        statement = "SELECT file_base64, extencao FROM lotus_dev.curriculo WHERE id = '#{id_curriculo}' AND id_usuario = '#{id_user}'"

        {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, statement,  _params = [])
        {:ok, base} = page |> Enum.at(0) |> Map.fetch("file_base64") 
        {:ok, ext} = page |> Enum.at(0) |> Map.fetch("extencao")

        ext |> IO.inspect
     
        if page |> Enum.at(0) != nil do

            file_name = UUID.uuid4()

           case Base.decode64(base) do

                {:ok, decoded} -> if File.write!("/tmp/#{file_name}.#{ext}", decoded) == :ok do
                    
                    conn 
                        |> put_resp_content_type("application/*")
                        |> put_resp_header("content-disposition", "attachment; filename=\"#{file_name}.#{ext}\"")
                        |> send_resp(200,File.read!("/tmp/#{file_name}.#{ext}"))
                   
                end
                _-> json(conn, "Error")

           end

        end
              
    end

    def download_curriculo_candidato(conn, %{"id" => id_candidato}) do

        id_user =  get_session(conn, "id")["id"]
        statement = "SELECT file_base64 FROM lotus_dev.curriculo WHERE id_usuario = '#{id_candidato}' AND principal = true"

        {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, statement, _params = [])
        {:ok, base} = page |> Enum.at(0) |> Map.fetch("file_base64") 
     
        if page |> Enum.at(0) != nil do

            file_name = UUID.uuid4()

           case Base.decode64(base) do

                {:ok, decoded} -> if File.write!("/tmp/" <> file_name, decoded) == :ok do
                     
                    conn 
                    |> put_resp_content_type("application/*")
                    |> put_resp_header("content-disposition", "attachment; filename=\"#{file_name}\"")
                    |> send_resp(200, File.read!("/tmp/#{file_name}"))
                    
                end
                _-> json(conn, "Error")

           end

        end
        
    end

    def excluir_curriculo(conn, %{"id" => id_curriculo}) do

        id_user =  get_session(conn, "id")["id"]
        statement = "DELETE FROM lotus_dev.curriculo WHERE id = '#{id_curriculo}' AND id_usuario = '#{id_user}'"

        case Xandra.execute(CassPID, statement,  _params = []) do
            {:ok, _} ->  json(conn, "Ok")
            _ -> json(conn, "Error")

        end

    end

    def curriculo_principal(conn, %{"id" => id_curriculo, "boolean" => bol}) do

        id_user =  get_session(conn, "id")["id"]     
        cql = "UPDATE lotus_dev.curriculo SET principal = #{bol} WHERE id = '#{id_curriculo}' AND id_usuario = '#{id_user}'"
        cql2 = "SELECT id FROM lotus_dev.curriculo WHERE id_usuario = '#{id_user}' AND principal = true"
       
        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql2, _params = [])
      
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
