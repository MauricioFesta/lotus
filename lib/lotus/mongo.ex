defmodule Lotus.Mongo do

	def ip, do: :inet.getif |> elem(1)|> tl |> hd |> elem(0)
	
    #def url, do: "mongodb://#{host}/#{database}#{opts}",username: username, password: get_password, pool_size: 20

	def database do 
		"lotus_prod"
	end
	
	def username, do: "lotus"
	
	def host do
	        
      {:ok, hostname} = :inet.gethostname
  
		cond do 

			hostname == 'mauricio-aspirea51453' -> "192.168.0.108:27017"

			true -> "10.0.11.148:27017"


        end      
	end

	def password, do: "nuOTbtK$B8G%#0I$w7@" 
	
	def password_prod, do: "[t46$uw4Kb^vF'u>Ms,65nB/;>`t}@5m"
	
	def opts, do: "?authSource=admin&authMechanism=SCRAM-SHA-256"

	def get_password do	

	 {:ok, hostname} = :inet.gethostname

		cond do 

			hostname == 'mauricio-aspirea51453' -> password

			true -> password_prod


		end 


	end	


end
