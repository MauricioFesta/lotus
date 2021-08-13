defmodule LotusWeb.NotificacaoChannel do
    use Phoenix.Channel
  
    def join("notify:open", _message, socket) do
     
      {:ok, socket}

    end


    def join("notify:" <> _private_room_id, _params, _socket) do
      {:error, %{reason: "unauthorized"}}
    end



    def handle_in("notify_send:"<> _id, %{"body" => body}, socket) do
      broadcast!(socket, "notify_send:"<> _id, %{body: body})
      {:noreply, socket}
    end




  end