defmodule LotusWeb.Plugs.AuthSocket do
    import Phoenix.Controller
    alias Phoenix.Token

    def call(token) do 

      case token do
        nil ->
          false
            
        token ->
          case Token.verify(System.get_env("TOKEN_LOGIN_LOTUS"), "user_auth", token) do

            {:ok, user_id_email}  ->

              statement = "SELECT id FROM lotus_dev.user WHERE id = '#{user_id_email["id"]}'"
               case Xandra.execute(CassPID, statement, _params = []) do

                {:ok, %Xandra.Page{} = page} -> true
                {:error, _} -> false
               end
                     
            {:error, _} ->
              false

          end
      end
    end

      
  end