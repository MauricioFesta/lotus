defmodule LotusWeb.ChatChannel do
    use Phoenix.Channel
  
    def join("chat:open", _message, socket) do
     
      {:ok, socket}

    end


    def join("chat:" <> _private_room_id, _params, _socket) do
      {:error, %{reason: "unauthorized"}}
    end



    def handle_in("chat_send:"<> _id, %{"body" => body, "id" => id, "avatar" => avatar, "nome" => nome, "empresa_id" => empresa_id}, socket) do
      broadcast!(socket, "chat_send:"<> _id, %{body: body, id: id, avatar: avatar, nome: nome, empresa_id: empresa_id})
      {:noreply, socket}
    end



  end