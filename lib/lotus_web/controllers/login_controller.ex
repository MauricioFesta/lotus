defmodule LotusWeb.LoginController do
    use LotusWeb, :controller
    alias Lotus.{Repo, User}
  
    def login_valida(conn, _params) do
        
        json(conn, "Testeeee")
     
    end

    def cadastro_login(conn, %{"nome" => nome, "email" => email, "senha" => senha})do

        case Repo.insert(%User{email: email, senha: senha, nome: nome}) do
         {:ok, result} -> json(conn, "OK")
         _ -> IO.puts json(conn, "Error")

        end 

        
       
    end


  end
  