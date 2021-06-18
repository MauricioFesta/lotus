defmodule LotusWeb.LoginController do
    use LotusWeb, :controller
    alias Phoenix.Token
   
    def login_valida(conn, %{"email"=> email, "senha" => senha}) do

        statement = "SELECT id, is_empresa FROM lotus_dev.user WHERE email = '#{email}' AND senha = '#{senha}' ALLOW FILTERING"
        %Xandra.Page{} = page = Xandra.execute!(CassPID, statement, _params = [])
       
        if page |> Enum.at(0) != nil do
          
          case page |> Enum.at(0) |> Map.fetch("id") do  
            {:ok, _id} -> 
              put_session(conn, :idUser, _id)
              
              conn = assign(conn, :id, _id)
             
              {:ok, _empresa} =  page |> Enum.at(0) |> Map.fetch("is_empresa")
              token = Token.sign(conn, "va^4S^u!b%@RlTrb", _id)
              json(conn, %{Ok: true, is_empresa: _empresa, token: token})
  
            _ -> json(conn, %{Ok: false})
          end
          
          else

          json(conn, %{"Ok": false})

        end 
          
    
    end

    def cadastro_login(conn, params)do
  
      {:ok, data} = JSON.encode(params) 
      
      statement = "INSERT INTO lotus_dev.user JSON '#{data}'"
       case Xandra.execute(CassPID, statement, _params = []) do
         {:ok, result} -> json(conn, "Ok")
         _ -> IO.puts json(conn, "Error")

       end


    end


  end
