
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
          case Token.verify(conn, "va^4S^u!b%@RlTrb", token) do
            {:ok, user_id} when is_binary(user_id) ->

            statement = "SELECT id FROM lotus_dev.user WHERE id = '#{user_id}'"
            {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, statement, _params = [])
                
            if page |> Enum.at(0) != nil do
                
                put_session(conn, :idUser, user_id)

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