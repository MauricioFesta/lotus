defmodule Lotus.Cassandra do

	def get_ip do	

		{:ok, ips} = :inet.getif()

		{vl1,vl2,vl3,vl4} = ips |> Enum.map(fn x -> x |> elem(0)  end) |> Enum.at(1)
		
		
		"10.0.11.148:9042"

        #cond do
		
	    
            #{vl1,vl2,vl3,vl4} == {137,184,9,0} -> "#{vl1}.#{vl2}.#{vl3}.#{vl4}:9042"

            #true -> "127.0.0.1:9042"

        #end

		

	
	end


end
