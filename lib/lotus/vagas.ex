defmodule Lotus.Vagas do
  
    def aprovar_candidato_vaga(id_candidato, id_vaga) do
       
        cql_consulta =  "SELECT vagas_aprovadas, email, id FROM lotus_dev.user WHERE id = '#{id_candidato}'"

        {:ok,  %Xandra.Page{} = page} = Xandra.execute(CassPID, cql_consulta, _params =[])

        {:ok,vagas_aprovadas} = page |> Enum.to_list() |> Enum.at(0) |> Map.fetch("vagas_aprovadas") |> IO.inspect(label: "vagas aprovadas")
        {:ok,email} = page |> Enum.to_list() |> hd |> Map.fetch("email") 
        {:ok,id} = page |> Enum.to_list() |> hd |> Map.fetch("id") 

        if Enum.member?(vagas_aprovadas, id_vaga) do
          
            false
            
        else
         
            cql = "UPDATE lotus_dev.user SET vagas_aprovadas = ['#{id_vaga}'] + vagas_aprovadas WHERE  id = '#{id}' AND email = '#{email}'"
         
            case Xandra.execute(CassPID, cql, _params = []) do
                {:ok, _} -> true
                _ -> false
            end

        end
           
     
    end

 
    def notificacao_user(id_user, id_vaga, descripition, aprovado, email) do

        date_new = DateTime.utc_now |> DateTime.add(-10800) |> DateTime.to_unix()

        cql1 = "SELECT id, nome,foto_base64, email FROM lotus_dev.user WHERE id = '#{id_user}' AND email = '#{email}'"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql1, _params = [])

        page = page |> Enum.to_list |> IO.inspect

        nome = page |> hd |> Map.get("nome")
        id = page |> hd |> Map.get("id")
        email = page |> hd |> Map.get("email")
        foto_base64 = page |> hd |> Map.get("foto_base64")

        new_map = %{} |> Map.put_new(:id, id) 
        
        |> Map.put_new(:nome, nome)
        |> Map.put_new(:foto_base64, foto_base64)
        |> Map.put_new(:aprovado, aprovado)
        |> Map.put_new(:notify, "#{descripition}")
        |> Map.put_new(:date, date_new)
       
        {:ok, data} = JSON.encode(new_map) 

           
        cql = "UPDATE lotus_dev.user SET notificacoes = ['#{data}'] + notificacoes WHERE email = '#{email}' AND id = '#{id}'"
       
    
        case Xandra.execute(CassPID, cql, _params = []) do

                {:ok, _}-> true

                _ ->   false
                       
        end

    end
 
end
