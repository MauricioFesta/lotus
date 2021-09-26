defmodule LotusWeb.LoginController do
    use LotusWeb, :controller
    alias Phoenix.Token
    alias Lotus.Login
 
   
    def login_valida(conn, %{"email"=> email, "senha" => senha}) do

        statement = "SELECT id, is_empresa, verificado FROM lotus_dev.user WHERE email = '#{email}' AND senha = '#{senha}'"
        %Xandra.Page{} = page = Xandra.execute!(CassPID, statement, _params = [])
       
        if page |> Enum.at(0) != nil do
          
          case page |> Enum.at(0) |> Map.fetch("id") do  
            {:ok, id_} -> 
              put_session(conn, :idUser, id_)
              
              conn = assign(conn, :id, id_)
             
              {:ok, empresa} =  page |> Enum.at(0) |> Map.fetch("is_empresa")
              {:ok, verificado} =  page |> Enum.at(0) |> Map.fetch("verificado")

              token = Token.sign(conn, "va^4S^u!b%@RlTrb", id_)
              json(conn, %{Ok: true, is_empresa: empresa,verificado: verificado, token: token, id: id_})
  
            _ -> json(conn, %{Ok: false})
          end
          
          else

          json(conn, %{"Ok": false})

        end 
          
    
    end

    def cadastro_login(conn, params)do
      
      new_params = params 
    
      |> Map.put("vagas_aprovadas", [UUID.uuid4()])
      |> Map.put("notificacoes", [""])
      |> Map.put("verificado", false)
      |> Map.put("cnpj_cpf", params["cnpj_cpf"] |> String.to_integer)
      |> Map.put("is_empresa", params["is_empresa"] |> valid_bol)
      |> Map.put("inserted_at", DateTime.utc_now |> DateTime.add(-10800) |> DateTime.to_unix())
      |> Map.put("updated_at", DateTime.utc_now |> DateTime.add(-10800) |> DateTime.to_unix())

      new_params |> IO.inspect

  
      id = params["id"]
     
      {:ok, data} = JSON.encode(new_params) 

      statement = "INSERT INTO lotus_dev.user JSON '#{data}'" |> IO.inspect

      query = "SELECT id, email, inserted_at, verificado FROM lotus_dev.user WHERE email = '#{params["email"]}'"

      {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, query, _params = [])

      id_ramdom = Login.send_email_confirm_login(new_params["email"])

      if page |> Enum.to_list |> Enum.empty? do

        case Xandra.execute(CassPID, statement, _params = []) do
        
          {:ok, result} -> 
          
            json(conn, %{pre_cad: true, id_random: id_ramdom, id: id, email: params["email"], exist: false})
     
  
          {:error, err} ->

      
            json(conn, "Error")
  
        end

      else  

        date_insert = page |> Enum.to_list |> hd |> Map.get("inserted_at")
        now = DateTime.utc_now |> DateTime.add(-10800) |> DateTime.to_unix() 
        verificado = page |> Enum.to_list |> hd |> Map.get("verificado")

        cond  do  

          now - date_insert >= 86400 && verificado == true -> json(conn, %{exist: false})

          now - date_insert >= 86400 && verificado == false -> json(conn, %{pre_cad: true, id: id_ramdom, id: id, email: params["email"], exist: false})

          now - date_insert < 86400 && verificado == false -> json(conn, %{time: true})

          true ->  json(conn, %{exist: false})
            
        end 

      end 
 
    end

    def confirm_login(conn, params) do  

    statement = "UPDATE lotus_dev.user SET verificado = #{true} WHERE email = '#{params["email"]}'"

      case Xandra.execute(CassPID, statement, _params = []) do
        
        {:ok, result} -> 
                    
          json(conn, %{verificado: true})

        {:error, err} ->
          
          json(conn, %{verificado: false})

      end


    end 

    defp valid_bol(bol) when bol == "true", do: true
    defp valid_bol(bol) when bol == "false", do: false

    

  end
