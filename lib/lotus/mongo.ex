defmodule Lotus.Mongo do

	def ip, do: :inet.getif |> elem(1)|> tl |> hd |> elem(0)
	
	def url, do: "mongodb://#{Lotus.Mongo.username}:#{Lotus.Mongo.password |> URI.encode_www_form}@#{Lotus.Mongo.host}/#{Lnf.Mongo.database}#{Lnf.Mongo.opts}"

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


end