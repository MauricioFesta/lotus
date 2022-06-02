defmodule LotusWeb.Plugs.Auth do
    import Plug.Conn
    import Phoenix.Controller
    alias Phoenix.Token
  
    def init(_params) do
    end
  
    def call(conn, _params) do
      
      conn_test = conn.private |> Map.get(:plug_session)
      headers = Enum.into(conn.req_headers, %{})

      case Map.get(headers, "x-nz-token") || Map.get(conn_test, "x-nz-token") do
        nil ->
    
          conn
          |> render(LotusWeb.ErrorView, "401.json")
          |> halt()
            
        token ->

          Token.verify(System.get_env("TOKEN_LOGIN_LOTUS"), "user_auth", token)
          case Token.verify(System.get_env("TOKEN_LOGIN_LOTUS"), "user_auth", token) do

            {:ok, user_id_email}  ->

              statement = "SELECT id FROM lotus_dev.user WHERE id = '#{user_id_email["id"]}'"
              {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, statement, _params = [])
                  
              if page |> Enum.at(0) != nil do
                  
                  put_session(conn, :id, user_id_email)
                 
              end
       
            {:error, _} ->
        
              conn
                |> render(LotusWeb.ErrorView, "401.json")
                |> halt()

          end
      end
    end
  end