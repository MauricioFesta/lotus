defmodule LotusWeb.SupportController do
    use LotusWeb, :controller
    use Bamboo.Phoenix, view: Lotus.EmailView

  def send_email(conn, params) do
    new_email()
          |> to("mauricio.festa@icloud.com")
          |> from("applotus.no.replay@gmail.com")
          |> subject("Lotus App")
          |> text_body("Reclamação: #{params["message"]} \n Email: #{params["email"]} \n Entrar em contato: #{params["entrar"]}") 

          |>  Lotus.Mailer.deliver_now


    json(conn, %{Ok: true})

  end 

end 
