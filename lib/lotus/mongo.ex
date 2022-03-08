defmodule Lotus.Mongo do

	def ip, do: :inet.getif |> elem(1)|> tl |> hd |> elem(0)
	
	#def url, do: "mongodb://#{host}/#{database}#{opts}",username: username, password: get_password, pool_size: 20

	def database do 
		"lotus_prod"
	end
	
	def username, do: "lotus"
	
	def host do
		"localhost:27017"  
	end

	def password, do: "nuOTbtK$B8G%#0I$w7@" 
	
	def password_prod, do: "[t46$uw4Kb^vF'u>Ms,65nB/;>`t}@5m"
	
	def opts, do: "?authSource=admin&authMechanism=SCRAM-SHA-256"

	def get_password do	

		#password_prod

		{:ok, ips} = :inet.getif()

		ip = ips |> Enum.map(fn x -> x |> elem(0)  end) |> Enum.at(0)

		cond do 

			ip == {10, 124, 0, 2}-> password_prod

			ip == {10,0,10,100} -> password_prod

			true -> password


		end


	end	


end