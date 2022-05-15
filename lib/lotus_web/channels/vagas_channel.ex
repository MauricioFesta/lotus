defmodule LotusWeb.VagasChannel do
    use Phoenix.Channel
  
    def join("vagas:open", _message, socket) do
     
      {:ok, socket}

    end


    def join("vagas:" <> _private_room_id, _params, _socket) do
      {:error, %{reason: "unauthorized"}}
    end


    def handle_in("vagas_send:",%{}, socket) do
        broadcast!(socket, "vagas_send:", %{})
      {:noreply, socket}
    end



  end