defmodule LotusWeb.Plugs.AuthPublic do
    import Plug.Conn
    import Phoenix.Controller
    alias Phoenix.Token
  
    def init(_params) do
    end
  
    def call(conn, _params) do

      headers = Enum.into(conn.req_headers, %{})
  
      case Map.get(headers, "x-nz-token-public") do

             
        token ->

            case Token.verify("d%OHm0S5*$ykbX9nbf$LV6qmJz!V", "user_auth", token) do

                {:ok, id} -> 

                  conn

                _ ->

                  json(conn, "not-permission")

            end

        nil ->

            json(conn, "not-permission")

    
      end
    end
  end





