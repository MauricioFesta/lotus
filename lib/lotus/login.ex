defmodule Lotus.Login do

    use Bamboo.Phoenix, view: Lotus.EmailView


    def send_email_confirm_login(email) do
        #Lotus.Login.send_email

        random_number = :rand.uniform(99999)

        new_email()
          |> to(email)
          |> from("applotus.no.replay@gmail.com")
          |> subject("Seja muito bem vindo(a) ao lotus!")
          |> text_body("Segue seu código de confirmação: #{random_number}") 

          |>  Lotus.Mailer.deliver_now

          random_number

      end

    

end 