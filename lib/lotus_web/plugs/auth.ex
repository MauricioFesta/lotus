
defmodule LotusWeb.Plugs.Auth do
    import Plug.Conn
    import Phoenix.Controller
    alias Phoenix.Token
  
    def init(_params) do
    end
  
    def call(conn, _params) do
      headers = Enum.into(conn.req_headers, %{})
  
      case Map.get(headers, "x-nz-token") do
        nil ->
            redirect(conn, to: "/not-permission")
            
        token ->
          case Token.verify(conn, "gWt#4NP40zPc8k4#B@iSK2N@YSd!RUZE2$G6IphwfkEoQHED1B", token) do

            {:ok, user_id_email}  ->

              statement = "SELECT id FROM lotus_dev.user WHERE id = '#{user_id_email["id"]}'"
              {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, statement, _params = [])
                  
              if page |> Enum.at(0) != nil do
                  
                  put_session(conn, :id, user_id_email)
                 
              end

            #   conn
            #   |> assign(:usuario, usuario["_id"])
            #   |> assign(:conta, usuario["conta_id"])
  
         
            {:error, _} ->
                redirect(conn, to: "/not-permission")
          end
      end
    end
  end