defmodule LotusWeb.LoginController do
    use LotusWeb, :controller
    alias Lotus.{Repo, User}

    def login_valida(conn, %{"email"=> email, "senha" => senha}) do

        statement = "SELECT id, is_empresa FROM lotus_dev.user WHERE email = '#{email}' AND senha = '#{senha}' ALLOW FILTERING"
        %Xandra.Page{} = page = Xandra.execute!(Cassandra, statement, _params = [])
      
        if page |> Enum.at(0) != nil do

          case page |> Enum.at(0) |> Map.fetch("id") do  
            {:ok, _id} -> 
              put_session(conn, :idUser, _id)
              {:ok, _empresa} =  page |> Enum.at(0) |> Map.fetch("is_empresa")
              json(conn, %{"Ok": true, is_empresa: _empresa})
  
            _ -> json(conn, %{"Ok": false})
          end
          
          else

          json(conn, %{"Ok": false})

        end 
          
    
    end

    def cadastro_login(conn, %{"nome" => nome, "email" => email, "senha" => senha, "is_empresa" => is_empresa})do

      statement = "INSERT INTO lotus_dev.user (id,nome, email, senha, is_empresa) VALUES (uuid(),'#{nome}', '#{email}','#{senha}','#{is_empresa}')"
      
      case Xandra.execute(Cassandra, statement, _params = []) do
        {:ok, result} -> json(conn, "Ok")
        _ -> IO.puts json(conn, "Error")

      end


    end


  end
