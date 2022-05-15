defmodule LotusWeb.CurriculoChannel do
    use Phoenix.Channel
  
    def join("curriculo:open", _message, socket) do
     
      {:ok, socket}

    end


    def join("curriculo:" <> _private_room_id, _params, _socket) do
      {:error, %{reason: "unauthorized"}}
    end



    def handle_in("curriculo_send:"<> _id, %{}, socket) do
      broadcast!(socket, "curriculo_send:"<> _id, %{})
      {:noreply, socket}
    end



  end