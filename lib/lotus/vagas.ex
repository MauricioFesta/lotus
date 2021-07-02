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

    def notificacao_user_aprovado(id_user, id_vaga, descripition) do

        cql1 = "SELECT id, nome, foto_base64 FROM lotus_dev.user WHERE id = #{id_user} ALLOW FILTERING"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql1, _params = [])

        nome = page |> Enum.to_list |> Enum.at(0) |> Map.get("nome")
        id = page |> Enum.to_list |> Enum.at(0) |> Map.get("id")
        foto_base64 = page |> Enum.to_list |> Enum.at(0) |> Map.get("foto_base64")

        new_map = %{} |> Map.put_new(:id, id) 
        |> Map.put_new(:nome, nome)
        |> Map.put_new(:foto_base64, foto_base64)
        |> Map.put_new(:aprovado, true)
        |> Map.put_new(:notify, "Empresa #{nome} #{descripition}")
    
        {:ok, data} = JSON.encode(new_map) 
        
        cql = "UPDATE lotus_dev.user SET notificacoes = ['#{data}']+ notificacoes  WHERE id = #{id_user}"
       
    
        case Xandra.execute(CassPID, cql, _params = []) do

                {:ok, _}-> true

                _ ->   false
                       
        end

    end
 
end
