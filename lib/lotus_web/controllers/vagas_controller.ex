defmodule LotusWeb.VagasController do
    use LotusWeb, :controller
    alias Lotus.Vagas
    alias LotusWeb.PerfilController
    alias Lotus
    
    def cadastro_vagas(conn, params) do

        file64 = if params["file"] !=  "undefined" do
           
            File.read!(params["file"].path) |> Base.encode64();

            else

            "false"

        end

        id_user =  get_session(conn, "idUser");

        {_valor, _} = Integer.parse(params["valor"])

   
        new_params = params 
        |> Map.delete("file")
        |> Map.delete("valor")
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

        ret = LotusRust.Back.get_list_vagas()

        new_ret = Enum.map(ret, fn x -> x |> JSON.decode! end)

        json(conn, new_ret)

    end

    def lista_all_empresas(conn, _) do
        
        cql = "SELECT id,nome FROM lotus_dev.user WHERE is_empresa = 'true' ALLOW FILTERING"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql, _params = [])
         
        if page |> Enum.at(0) != nil do
        
         json(conn, Enum.to_list(page))

        else

            json(conn, "Nenhuma empesa cadastrada")

        end

    end

    def filter_empresa(conn, params) do

    
         ret = LotusRust.Back.get_filtro_vagas_empresa(params["empresa"])

         new_ret = Enum.map(ret, fn x -> x |> JSON.decode! end)

         json(conn, new_ret)

        

    end

    def filter_ramo(conn, params) do
        params["tuple"] |> IO.inspect
        ret = LotusRust.Back.get_filtro_vagas_ramo(params["tuple"])

        new_ret = Enum.map(ret, fn x -> x |> JSON.decode! end)

        json(conn, new_ret)

        
    end

    def list_vagas_empresa(conn,_) do


        id_user = get_session(conn, "idUser");

        cql = "SELECT * FROM lotus_dev.vagas WHERE empresa_id = '#{id_user}' ALLOW FILTERING"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql, _params = [])
         
        if page |> Enum.at(0)  != nil do
        
         json(conn, Enum.to_list(page))

        else

            json(conn, "Nenhuma vaga encontrada")

        end
    end

    def list_vagas_candidatos(conn, %{"id" => id_vaga}) do

        cql = "SELECT candidatos FROM lotus_dev.vagas WHERE id = ? ALLOW FILTERING"

        {:ok, %Xandra.Page{} = page } = Xandra.execute(CassPID, cql, [{"uuid", id_vaga}])

        page_new = page |> Enum.to_list |> hd
  
        formated =  Enum.join(page_new["candidatos"], ",") |> IO.inspect

        cql_candidatos =  "SELECT * FROM lotus_dev.user WHERE id IN (#{formated})"

        {:ok, %Xandra.Page{} = page_candidatos} = Xandra.execute(CassPID, cql_candidatos, _params = [])

        json(conn, page_candidatos |> Enum.to_list) 
        
    end

    def lista_vagas_aprovadas(conn, _params) do

        id_user = get_session(conn, "idUser");

        cql = "SELECT vagas_aprovadas FROM lotus_dev.user WHERE id = ? ALLOW FILTERING"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql, [{"uuid", id_user}])
         
        if page |> Enum.at(0) != nil do
        
         json(conn, Enum.to_list(page))

        else

            json(conn, "Nenhuma vaga aprovada")

        end
        
    end

    def insert_vaga_user(conn, params) do

        id_user = get_session(conn, "idUser");
       
        cql_consulta =  "SELECT candidatos, ramo, empresa_id FROM lotus_dev.vagas WHERE id = ? ALLOW FILTERING"

        {:ok,  %Xandra.Page{} = page} = Xandra.execute(CassPID, cql_consulta, [{"uuid", params["id"]}])

        {:ok,candidato} = page |> Enum.to_list |> hd |> Map.fetch("candidatos")
        {:ok,ramo} = page |> Enum.to_list |> hd |> Map.fetch("ramo")
        {:ok,empresa_id} = page |> Enum.to_list |> hd |> Map.fetch("empresa_id")
        
        if Enum.member?(candidato, id_user), do: json(conn, %{erro: " Candidatura já enviada"})

        cql = "UPDATE lotus_dev.vagas SET candidatos = ['#{id_user}'] + candidatos WHERE id = #{params["id"]} AND ramo = '#{ramo}' AND empresa_id = '#{empresa_id}'"
         
        case Xandra.execute(CassPID, cql, _params = []) do
            {:ok, _} -> json(conn, %{Ok: true})
            _ -> json(conn, %{Ok: false})
        end

    end

    def delete_candidatura_user(conn, params) do
        
        id_user = get_session(conn, "idUser");

        %{"id" => _id} = params
            
        sql = "SELECT candidatos, ramo, empresa_id FROM lotus_dev.vagas WHERE id = ? ALLOW FILTERING"
        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, sql,[{"uuid", _id}] )
         
        {:ok,candidato} = page |> Enum.to_list |> hd |> Map.fetch("candidatos") |> IO.inspect
        {:ok,ramo} = page |> Enum.to_list |> hd |> Map.fetch("ramo")
        {:ok,empresa_id} = page |> Enum.to_list |> hd |> Map.fetch("empresa_id")

       new_list = Enum.reject(candidato, fn x -> x == id_user end) 

       cql = "UPDATE lotus_dev.vagas SET candidatos = ['#{new_list}']  WHERE id = #{_id} AND ramo = '#{ramo}' AND empresa_id = '#{empresa_id}'"
         
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

        sql = "SELECT vagas_aprovadas FROM lotus_dev.user WHERE id = ? ALLOW FILTERING"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, sql,[{"uuid", params["id"]}] )
         
        {:ok,candidato} = page |> Enum.to_list |> hd |> Map.fetch("vagas_aprovadas")
      
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