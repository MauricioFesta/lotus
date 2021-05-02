defmodule LotusWeb.LoginController do
    use LotusWeb, :controller
  
    def login_valida(conn, _params) do
        
        json(conn, "Testeeee")
     
    end

    def cadastro_login(conn, _params)do

    
        %Friends.User{id: 12,nome: "teste", email: "teste", senha: "teste"} |> IO.inspect

    end


  end
  