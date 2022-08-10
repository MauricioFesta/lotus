defmodule Lotus.Cassandra do

	def get_ip do	

    {:ok, hostname} = :inet.gethostname
		

        cond do
		
	      hostname == 'mauricio-aspirea51453'  -> "127.0.0.1:9042"
          
          true -> "10.0.11.148:9042"

        end 

	
	end


end
