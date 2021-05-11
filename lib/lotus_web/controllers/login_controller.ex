defmodule LotusWeb.LoginController do
    use LotusWeb, :controller
    alias Lotus.{Repo, User}

    def login_valida(conn, %{"email"=> email, "senha" => senha}) do

        user =  Repo.get_by(User, email: email, senha: senha)

       if user == nil do
        json(conn, "Error")
       else
        conn = put_session(conn, :idUser, user.id)
        json(conn, "Ok")
       end  

    end

    def cadastro_login(conn, %{"nome" => nome, "email" => email, "senha" => senha})do

      case Repo.insert(%User{email: email, senha: senha, nome: nome}) do
        {:ok, result} -> json(conn, "Ok")
         _ -> IO.puts json(conn, "Error")

      end

    end


  end
