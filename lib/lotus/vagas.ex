defmodule Lotus.Vagas do
  
    def aprovar_candidato_vaga(id_candidato, id_vaga) do
       
        cql_consulta =  "SELECT vagas_aprovadas FROM lotus_dev.user WHERE id = ?"

        {:ok,  %Xandra.Page{} = page} = Xandra.execute(CassPID, cql_consulta, [{"uuid", id_candidato}])

        {:ok,vagas_aprovadas} = page |> Enum.to_list() |> Enum.at(0) |> Map.fetch("vagas_aprovadas") |> IO.inspect
        
        if Enum.member?(vagas_aprovadas, id_vaga) do

            false
            
        else

            cql = "UPDATE lotus_dev.user SET vagas_aprovadas = ['#{id_vaga}'] + vagas_aprovadas WHERE id = #{id_candidato}"
         
            case Xandra.execute(CassPID, cql, _params = []) do
                {:ok, _} -> true
                _ -> false
            end

        end
           
     
    end
 
end
