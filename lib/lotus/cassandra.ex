defmodule Lotus.Cassandra do

	def get_ip do	

		{:ok, ips} = :inet.getif()

      ip = ips |> Enum.map(fn x -> x |> elem(0)  end) |> Enum.at(1)
		

        cond do
		
	        ip == {172, 20, 0, 1} -> "127.0.0.1:9042"

			ip == {192, 168, 0, 108}-> "127.0.0.1:9042"

			ip == {192, 168,100,102} -> "127.0.0.1:9042"

			ip == {192,168,1,15} -> "127.0.0.1:9042"

	        ip == {172, 19, 0, 1}  -> "127.0.0.1:9042"
			
            true -> "10.0.11.148:9042"

        end 

	
	end


end
