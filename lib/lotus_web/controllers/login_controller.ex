defmodule LotusWeb.LoginController do
    use LotusWeb, :controller
  
    def login_valida(conn, _params) do
        
        json(conn, %{:logado, "Truuu"})

    end
  end
  