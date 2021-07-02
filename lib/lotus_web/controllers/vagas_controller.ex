defmodule LotusWeb.VagasController do
    use LotusWeb, :controller
    alias Lotus.Vagas
    alias LotusWeb.PerfilController
    
    def cadastro_vagas(conn, params) do

        file64 = if params["file"] !=  "undefined" do
           
            File.read!(params["file"].path) |> Base.encode64();

            else

            "false"

        end

        id_user =  get_session(conn, "idUser");

        {_valor, _} = Integer.parse(params["valor"])

        new_params = %{} 

        |> Map.put(:id, params["id"])
        |> Map.put(:descricao, params["descricao"])
        |> Map.put(:cidade, params["cidade"])
        |> Map.put(:turno, params["turno"])
        |> Map.put(:estado, params["estado"])
        |> Map.put(:imagem_base64, file64)
        |> Map.put(:valor, _valor) 
        |> Map.put(:empresa_id, id_user)
        |> Map.put(:disponibilidade_viajar, convert!(params["disponibilidade_viajar"]))
        |> Map.put(:planejamento_futuro, convert!(params["planejamento_futuro"]))
        |> Map.put(:candidatos, [UUID.uuid4()])
        
        {:ok, data} = JSON.encode(new_params) 


         cql =  "INSERT INTO lotus_dev.vagas JSON '#{data}'"
        
       case Xandra.execute(CassPID,cql, params = [])  do
           {:ok, _} -> json(conn, %{"Ok": true})
           _ -> json(conn, %{"Ok": false})
       end

    end

    def convert!("true"), do: true
    def convert!("false"), do: false


    def list_vagas(conn, _) do

        cql = "SELECT * FROM lotus_dev.vagas"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql, _params = [])
         
        if page |> Enum.at(0) != nil do
        
         json(conn, Enum.to_list(page))

        else

            json(conn, "Nenhuma vaga encontrada")

        end

    end

    def list_vagas_empresa(conn,_) do


        id_user = get_session(conn, "idUser");

        cql = "SELECT * FROM lotus_dev.vagas WHERE empresa_id = '#{id_user}' ALLOW FILTERING"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql, _params = [])
         
        if page |> Enum.at(0) != nil do
        
         json(conn, Enum.to_list(page))

        else

            json(conn, "Nenhuma vaga encontrada")

        end
    end

    def list_vagas_candidatos(conn, %{"id" => id_vaga}) do

        cql = "SELECT candidatos FROM lotus_dev.vagas WHERE id = ?"

        {:ok, %Xandra.Page{} = page } = Xandra.execute(CassPID, cql, [{"uuid", id_vaga}])

        page_new = page |> Enum.to_list() |> Enum.at(0)
  
        formated =  Enum.join(page_new["candidatos"], ",")
           
        cql_candidatos =  "SELECT * FROM lotus_dev.user WHERE id IN (#{formated})"

        {:ok, %Xandra.Page{} = page_candidatos} = Xandra.execute(CassPID, cql_candidatos, _params = [])

        json(conn, page_candidatos |> Enum.to_list() ) 
        
    end

    def lista_vagas_aprovadas(conn, _params) do

        id_user = get_session(conn, "idUser");

        cql = "SELECT vagas_aprovadas FROM lotus_dev.user WHERE id = ?"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql, [{"uuid", id_user}])
         
        if page |> Enum.at(0) != nil do
        
         json(conn, Enum.to_list(page))

        else

            json(conn, "Nenhuma vaga aprovada")

        end
        
    end

    def insert_vaga_user(conn, params) do

        id_user = get_session(conn, "idUser");
       
        cql_consulta =  "SELECT candidatos FROM lotus_dev.vagas WHERE id = ?"

        {:ok,  %Xandra.Page{} = page} = Xandra.execute(CassPID, cql_consulta, [{"uuid", params["id"]}])

        {:ok,candidato} = page |> Enum.to_list() |> Enum.at(0) |> Map.fetch("candidatos") |> IO.inspect
        
        if Enum.member?(candidato, id_user), do: json(conn, %{erro: " Candidatura já enviada"})
           
        cql = "UPDATE lotus_dev.vagas SET candidatos = ['#{id_user}'] + candidatos WHERE id = #{params["id"]}"
         
        case Xandra.execute(CassPID, cql, _params = []) do
            {:ok, _} -> json(conn, %{Ok: true})
            _ -> json(conn, %{Ok: false})
        end

    end

    def delete_candidatura_user(conn, params) do
        
        id_user = get_session(conn, "idUser");

        %{"id" => _id} = params
            sql = "SELECT candidatos FROM lotus_dev.vagas WHERE id = ?"
        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, sql,[{"uuid", _id}] )
         
        {:ok,candidato} = page |> Enum.to_list() |> Enum.at(0) |> Map.fetch("candidatos") |> IO.inspect
      
       new_list = Enum.reject(candidato, fn x -> x == id_user end) 

       cql = "UPDATE lotus_dev.vagas SET candidatos = ['#{new_list}']  WHERE id = #{_id}"
         
       case Xandra.execute(CassPID, cql, _params = []) do
           {:ok, _} -> json(conn, %{Ok: true})
           _ -> json(conn, %{Ok: false})
       end

    end

    def aprovar_candidato(conn, params) do
        
        id_user = get_session(conn, "idUser");

        case Vagas.aprovar_candidato_vaga(params["id_user"],params["id_vaga"]) do

            true -> 

                case Vagas.notificacao_user_aprovado(params["id_user"],params["id_vaga"], "aprovou seu currículo") do
                    true -> json(conn, %{Ok: true})
        
                    _ ->  json(conn, %{Ok: false})
                end

                _ ->  json(conn, %{Ok: false})

        end
      

      
    end

    def delete_candidato_aprovado(conn, params) do

        sql = "SELECT vagas_aprovadas FROM lotus_dev.user WHERE id = ?"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, sql,[{"uuid", params["id"]}] )
         
        {:ok,candidato} = page |> Enum.to_list() |> Enum.at(0) |> Map.fetch("vagas_aprovadas")
      
        new_list = Enum.reject(candidato, fn x -> x == params["id_vaga"] end) 

        new_list|> IO.inspect
        
        cql = "UPDATE lotus_dev.user SET vagas_aprovadas = ['#{new_list}']  WHERE id = #{params["id"]}"
         
        case Vagas.notificacao_user_aprovado(params["id"],params["id_vaga"], "desaprovou seu currículo :(") do
            true -> 

                case Xandra.execute(CassPID, cql, _params = []) do
                    {:ok, _} -> json(conn, %{Ok: true})
                    _ -> json(conn, %{Ok: false})
                end
        

            _ ->  json(conn, %{Ok: false})
        end

    end

   
end