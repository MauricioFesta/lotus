defmodule Lotus.Vagas do
  
    def aprovar_candidato_vaga(id_candidato, id_vaga) do
       
        cql_consulta =  "SELECT vagas_aprovadas, email FROM lotus_dev.user WHERE id = '#{id_candidato}'"

        {:ok,  %Xandra.Page{} = page} = Xandra.execute(CassPID, cql_consulta, _params =[])

        {:ok,vagas_aprovadas} = page |> Enum.to_list() |> Enum.at(0) |> Map.fetch("vagas_aprovadas") |> IO.inspect
        {:ok,email} = page |> Enum.to_list() |> hd |> Map.fetch("email") 

        if Enum.member?(vagas_aprovadas, id_vaga) do

            false
            
        else

            cql = "UPDATE lotus_dev.user SET vagas_aprovadas = ['#{id_vaga}'] + vagas_aprovadas WHERE email = '#{email}'"
         
            case Xandra.execute(CassPID, cql, _params = []) do
                {:ok, _} -> true
                _ -> false
            end

        end
           
     
    end

 
    def notificacao_user(id_user, id_vaga, descripition, aprovado) do

        date = DateTime.utc_now();

        date_new = Integer.to_string(date.year)  <> "-" <> Integer.to_string(date.month) <> "-" <> Integer.to_string(date.day)

        cql1 = "SELECT id, nome,foto_base64, email FROM lotus_dev.user WHERE id = '#{id_user}'"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql1, _params = [])

        nome = page |> Enum.to_list |> hd |> Map.get("nome")
        id = page |> Enum.to_list |> hd |> Map.get("id")
        email = page |> Enum.to_list |> hd |> Map.get("email")
        foto_base64 = page |> Enum.to_list |> hd |> Map.get("foto_base64")

        new_map = %{} |> Map.put_new(:id, id) 
        
        |> Map.put_new(:nome, nome)
        |> Map.put_new(:foto_base64, foto_base64)
        |> Map.put_new(:aprovado, aprovado)
        |> Map.put_new(:notify, "#{nome} #{descripition}")
        |> Map.put_new(:date, date_new)
       
        {:ok, data} = JSON.encode(new_map) 

           
        cql = "UPDATE lotus_dev.user SET notificacoes = ['#{data}'] + notificacoes WHERE email = '#{email}'"
       
    
        case Xandra.execute(CassPID, cql, _params = []) do

                {:ok, _}-> true

                _ ->   false
                       
        end

    end
 
end
