defmodule LotusWeb.LoginController do
    use LotusWeb, :controller
    alias Phoenix.Token
    alias Lotus.Login
 
   
    def login_valida(conn, %{"email"=> email, "senha" => senha}) do

        statement = "SELECT id, is_empresa,email, verificado FROM lotus_dev.user WHERE email = '#{email}' AND senha = '#{senha}' ALLOW FILTERING"
       
        {:ok, %Xandra.Page{} = page } = Xandra.execute(CassPID, statement, _params = [])

        page = page |> Enum.to_list  
   
        if page |> length != 0 do

          {:ok, id_} = page |> hd |> Map.fetch("id")
          {:ok, email} = page |> hd |> Map.fetch("email")

          put_session(conn, :idUser, id_)
          put_session(conn, :email, email)
          
          conn = assign(conn, :id, id_)
         
          {:ok, empresa} =  page |> hd |> Map.fetch("is_empresa")
          {:ok, verificado} =  page |> hd |> Map.fetch("verificado")

          token = Token.sign(System.get_env("TOKEN_LOGIN_LOTUS"), "user_auth", %{"id" => id_, "email" => email})
        
          json(conn, %{Ok: true, is_empresa: empresa,verificado: verificado, token: token, id: id_})

          # case page |> hd |> Map.fetch("email") do  
          #   {:ok, id_} -> 
            
          #   _ -> json(conn, %{Ok: false})
          # end
          
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

      new_params 

  
      id = params["id"]
     
      {:ok, data} = JSON.encode(new_params) 

      statement = "INSERT INTO lotus_dev.user JSON '#{data}'" 

      query = "SELECT id, email, inserted_at, verificado FROM lotus_dev.user WHERE email = '#{params["email"]}' ALLOW FILTERING"

      {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, query, _params = [])

      if page |> Enum.to_list |> Enum.empty? do

        id_random = Login.send_email_confirm_login(new_params["email"])

        case Xandra.execute(CassPID, statement, _params = []) do
        
          {:ok, result} -> 

            token = Token.sign(System.get_env("TOKEN_PASSWORD_LOTUS"), id, id_random)
          
            json(conn, %{pre_cad: true, id_random: token, id: id, email: params["email"], exist: false})
     
  
          {:error, err} ->

      
            json(conn, "Error")
  
        end

      else  

        date_insert = page |> Enum.to_list |> hd |> Map.get("inserted_at")
        now = DateTime.utc_now |> DateTime.add(-10800) |> DateTime.to_unix() 
        verificado = page |> Enum.to_list |> hd |> Map.get("verificado")

        cond  do  

          verificado == true -> json(conn, %{exist: true})

          now - date_insert >= 86400 && verificado == false -> 

            id_random = Login.send_email_confirm_login(new_params["email"])

            json(conn, %{pre_cad: true, id: id_random, id: id, email: params["email"], exist: false})

          now - date_insert < 86400 && verificado == false -> json(conn, %{time: true})

          true ->  json(conn, %{exist: false})
            
        end 

      end 
 
    end

    def confirm_login(conn, params) do 

      if confirm_cod_token(params) do  

        statement = "UPDATE lotus_dev.user SET verificado = #{true} WHERE id = '#{params["id"]}' AND email = '#{params["email"]}'"

        case Xandra.execute(CassPID, statement, _params = []) do
          
          {:ok, result} -> 
                      
            json(conn, %{verificado: true, invalido: false})
  
          {:error, err} ->
            
            json(conn, %{verificado: false, invalido: false})
  
        end
        

      else  


        json(conn, "err")

      
      end 
      
    end 

    defp valid_bol(bol) when bol == "true", do: true
    defp valid_bol(bol) when bol == "false", do: false

    def password_reset(conn, params) do 

      query = "SELECT id FROM lotus_dev.user WHERE email = '#{params["email"]}' ALLOW FILTERING"

      {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, query, _params = [])

  
      if page |> Enum.to_list |> Enum.empty? do

        json(conn, %{exist: false})

      else  

        id = page |> Enum.to_list |> hd

        id_random = Login.send_email_confirm_login(params["email"])

        token = Token.sign(System.get_env("TOKEN_PASSWORD_LOTUS"), id["id"], id_random)
        json(conn, %{id_random: token, id: id["id"], email: params["email"], exist: true})

      end 

    end 

    def resend_cod_cadastro(conn, params) do 

      id_random = Login.send_email_confirm_login(params["email"])

      query = "SELECT id FROM lotus_dev.user WHERE email = '#{params["email"]}' ALLOW FILTERING"

      {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, query, _params = [])

      id = page |> Enum.to_list |> hd

      token = Token.sign(System.get_env("TOKEN_PASSWORD_LOTUS"), id["id"], id_random)

      json(conn, %{id_random: token, id: id["id"], email: params["email"], verificado: true})

    end 

    def confirm_token_reset_password(conn, params) do 

      if confirm_cod_token(params) do 

        json(conn, %{confirmado: true, id: params["id"], email: params["email"]}) 

      else  

        json(conn, %{confirmado: false})

      end 

    end 

    def alterar_password(conn, params) do 

      cqls = "UPDATE lotus_dev.user SET senha = '#{params["password"]}' WHERE id = '#{params["id"]}' AND email = '#{params["email"]}'"

      if confirm_cod_token(params) do 

        case Xandra.execute(CassPID, cqls, _params = []) do
          
          {:ok, result} -> 
                      
            json(conn, %{ok: true})
  
          {:error, err} ->
            
            json(conn, %{ok: false})
  
        end

      else  

        json(conn, %{confirmado: false})

      end 


    end 

    defp confirm_cod_token(params) do  

      case Token.verify(System.get_env("TOKEN_PASSWORD_LOTUS"), params["id"], params["token"]) do

        {:ok, compare}  ->

          if compare == params["cod_front"] |> String.to_integer do 
        
            true

          else  

            false

          end 

         
        {:error, _} ->

          false

      end

    end 

 
  end
