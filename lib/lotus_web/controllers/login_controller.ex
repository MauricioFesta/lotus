defmodule LotusWeb.LoginController do
    use LotusWeb, :controller
    alias Lotus.{Repo, User}
  
    def login_valida(conn, %{"email"=> email, "senha" => senha}) do

        case Repo.get_by(User, email: email, senha: senha) do
            nil -> send_resp(conn, :not_found, "Error")
            _ -> json(conn, "OK") 
            |> IO.inspect
            
        end 
           
    end

    def cadastro_login(conn, %{"nome" => nome, "email" => email, "senha" => senha})do

        case Repo.insert(%User{email: email, senha: senha, nome: nome}) do
         {:ok, result} -> json(conn, "OK")
         _ -> IO.puts json(conn, "Error")

        end 
   
    end


  end
  