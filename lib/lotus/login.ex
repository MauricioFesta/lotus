defmodule Lotus.Login do

    use Bamboo.Phoenix, view: Lotus.EmailView


    def send_email_confirm_login(email) do
        #Lotus.Login.send_email

        random_number = :rand.uniform(999999)

        new_email()
          |> to(email)
          |> from("applotus.no.replay@gmail.com")
          |> put_header("Reply-To", "mauricio.festa@icloud.com")
          |> subject("Lotus App")
          |> text_body("Segue seu código de confirmação: #{random_number}") 

          |>  Lotus.Mailer.deliver_now

          random_number

      end

    

end 