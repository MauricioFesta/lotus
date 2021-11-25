defmodule LotusWeb.VagasController do
    use LotusWeb, :controller
    alias Lotus.Vagas
    alias LotusWeb.PerfilController
    alias Lotus

    def cadastro_vagas(conn, params) do

        file64 = if params["file"] !=  "undefined" do

            File.read!(params["file"].path) |> Base.encode64()

            else

            "false"

        end

        id_user =  get_session(conn, "id")["id"]

        {n_valor, _} = Integer.parse(params["valor"])


        new_params = params
        |> Map.delete("file")
        |> Map.delete("valor")
        |> Map.put(:imagem_base64, file64)
        |> Map.put(:valor, n_valor)
        |> Map.put(:empresa_id, id_user)
        |> Map.put(:disponibilidade_viajar, convert!(params["disponibilidade_viajar"]))
        |> Map.put(:planejamento_futuro, convert!(params["planejamento_futuro"]))
        |> Map.put(:candidatos, [UUID.uuid4()])
        |> Map.put("inserted_at", DateTime.utc_now |> DateTime.add(-10800) |> DateTime.to_unix())
        |> Map.put("updated_at", DateTime.utc_now |> DateTime.add(-10800) |> DateTime.to_unix())
        |> Map.put("ativo", true)

        {:ok, data} = JSON.encode(new_params)

        cql =  "INSERT INTO lotus_dev.vagas JSON '#{data}'"

       case Xandra.execute(CassPID,cql, params = [])  do
           {:ok, _} ->

            set_cache_vagas([data])

            json(conn, %{"Ok": true})
           _ -> json(conn, %{"Ok": false})
       end

    end

    def convert!("true"), do: true
    def convert!("false"), do: false


    def list_vagas(conn, _) do

        query = list_vagas_cache
        
        new_ret = Enum.map(query, fn x -> x |> JSON.decode! end)

        json(conn, new_ret)

    end

    def list_vagas_cache do

        redis = try do

            IO.puts("Entrou no cache")
            LotusRust.Back.get_vagas_cache()

         rescue e ->

           LotusRust.Back.get_list_vagas()

         end

     
        if redis |> Enum.count > 1 do

            IO.puts("Tem valor em cache")

            redis

        else

            ret = LotusRust.Back.get_list_vagas()
            IO.puts("Não tem valor em cache")
            # set_cache_vagas(ret)
            ret

        end

    end
    
    def update_vaga(conn, params) do 

        file64 = if params["file"] !=  "undefined" do

            File.read!(params["file"].path) |> Base.encode64()

            else

            params["imagem_base64_old"]

        end

        candidatos = if convert!(params["ativo"]) == false do 

            [params["candidatos"]] |> IO.inspect(label: "Antes")

            delete_candidato(params["candidatos"] |> String.split(","), params["id"])


            [UUID.uuid4()]

            else
            
           params["candidatos"] |> String.split(",")

        end


        id_user =  get_session(conn, "id")["id"]

        {n_valor, _} = Integer.parse(params["valor"])


        new_params = params

        |> Map.delete("file")
        |> Map.delete("valor")
        |> Map.delete("imagem_base64_old")
        |> Map.delete("imagem_base64")
        |> Map.put_new(:imagem_base64, file64)
        |> Map.put(:valor, n_valor)
        |> Map.put(:empresa_id, id_user)
        |> Map.put(:disponibilidade_viajar, convert!(params["disponibilidade_viajar"]))
        |> Map.put(:planejamento_futuro, convert!(params["planejamento_futuro"]))
        |> Map.put(:ativo, convert!(params["ativo"]))
        |> Map.put(:inserted_at, params["inserted_at"] |> String.to_integer)
        |> Map.put("updated_at", DateTime.utc_now |> DateTime.add(-10800) |> DateTime.to_unix())
        |> Map.put("candidatos", candidatos)
        


        {:ok, data} = JSON.encode(new_params)

        cql =  "INSERT INTO lotus_dev.vagas JSON '#{data}'"

        case Xandra.execute(CassPID, cql, _params = []) do

            {:ok, _} -> 
                 
                LotusRust.Back.building_cache()
                
                json(conn, %{"ok" => true})

            _ ->   json(conn, %{"ok" => false})
                   
        end

    end 

    def set_cache_vagas(list) do
    
        try do

            LotusRust.Back.set_vagas_cache(list)

        rescue e ->

           :noop

         end

    end

    def lista_all_empresas(conn, _) do

        cql = "SELECT id,nome FROM lotus_dev.user WHERE is_empresa = true"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql, _params = [])

        if page |> Enum.at(0) != nil do

         json(conn, Enum.to_list(page))

        else

            json(conn, "Nenhuma empresa cadastrada")

        end

    end

    def filter_empresa(conn, params) do


         ret = LotusRust.Back.get_filtro_vagas_empresa(params["empresa"])

         new_ret = Enum.map(ret, fn x -> x |> JSON.decode! end)

         json(conn, new_ret)



    end

    def filter_ramo(conn, params) do

        ret = LotusRust.Back.get_filtro_vagas_ramo(params["tuple"])

        new_ret = Enum.map(ret, fn x -> x |> JSON.decode! end)

        json(conn, new_ret)


    end

    def list_vagas_empresa(conn,_) do


        id_user = get_session(conn, "id")["id"]

        cql = "SELECT * FROM lotus_dev.vagas WHERE empresa_id = '#{id_user}' AND ativo = true ALLOW FILTERING"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql, _params = [])

        if page |> Enum.at(0)  != nil do

         json(conn, Enum.to_list(page))

        else

            json(conn, "Nenhuma vaga encontrada")

        end
    end

    def list_vagas_empresa_fechado(conn,_) do


        id_user = get_session(conn, "id")["id"]

        cql = "SELECT * FROM lotus_dev.vagas WHERE empresa_id = '#{id_user}' AND ativo = false ALLOW FILTERING"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql, _params = [])

        if page |> Enum.at(0)  != nil do

         json(conn, Enum.to_list(page))

        else

            json(conn, "Nenhuma vaga encontrada")

        end
    end



    def list_vagas_candidatos(conn, %{"id" => id_vaga}) do

        cql = "SELECT candidatos FROM lotus_dev.vagas WHERE id = '#{id_vaga}'"

        {:ok, %Xandra.Page{} = page } = Xandra.execute(CassPID, cql,  _paraams = [])

        page_new = page |> Enum.to_list |> hd

        formated =  Enum.join(page_new["candidatos"], "','")

        cql_candidatos =  "SELECT * FROM lotus_dev.user WHERE id IN ('#{formated}')"

        {:ok, %Xandra.Page{} = page_candidatos} = Xandra.execute(CassPID, cql_candidatos, _params = [])

        json(conn, page_candidatos |> Enum.to_list)

    end

    def lista_vagas_aprovadas(conn, _params) do

        id_user = get_session(conn, "id")["id"]

        cql = "SELECT vagas_aprovadas FROM lotus_dev.user WHERE id = '#{id_user}'"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql, _params = [])

        if page |> Enum.at(0) != nil do

         json(conn, Enum.to_list(page))

        else

            json(conn, "Nenhuma vaga aprovada")

        end

    end

    def insert_vaga_user(conn, params) do
       
        id_email = get_session(conn, "id")
     
        cql_consulta =  "SELECT candidatos, ramo, empresa_id FROM lotus_dev.vagas WHERE id = '#{params["id"]}'"
        
        cql1 = "SELECT id, nome,foto_base64, email FROM lotus_dev.user WHERE id = '#{id_email["id"]}'" |> IO.inspect

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql1, _params = [])

        page = page |> Enum.to_list |> IO.inspect(label: "aqui")

        nome = page |> hd |> Map.get("nome")

        {:ok,  %Xandra.Page{} = page} = Xandra.execute(CassPID, cql_consulta, _params = [])

        {:ok,candidato} = page |> Enum.to_list |> hd |> Map.fetch("candidatos")
        {:ok,ramo} = page |> Enum.to_list |> hd |> Map.fetch("ramo")
        {:ok,empresa_id} = page |> Enum.to_list |> hd |> Map.fetch("empresa_id")
   
        email_user_cql = "SELECT email FROM lotus_dev.user WHERE id = '#{empresa_id}'"
        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, email_user_cql, _params = [] )

        {:ok,email} = page |> Enum.to_list |> hd |> Map.fetch("email")

        if Enum.member?(candidato, id_email["id"]), do: json(conn, %{erro: " Candidatura já enviada"})

        cql = "UPDATE lotus_dev.vagas SET candidatos = ['#{id_email["id"]}'] + candidatos WHERE id = '#{params["id"]}' AND ramo = '#{ramo}'"


        case Xandra.execute(CassPID, cql, _params = []) do
            {:ok, _} ->

                LotusRust.Back.building_cache()

                case Vagas.notificacao_user(empresa_id,params["id"], "#{nome} enviou uma candidatura para uma vaga", false, email) do

                    true -> json(conn, %{Ok: true})

                    _ ->  json(conn, %{Ok: false})
                end

                # json(conn, %{Ok: true})
            _ -> json(conn, %{Ok: false})
        end


    end

    def delete_candidatura_user(conn, params) do

        id_user = get_session(conn, "id")

        %{"id" => id_} = params

        sql = "SELECT candidatos, ramo, empresa_id FROM lotus_dev.vagas WHERE id = '#{id_}'"
        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, sql, _params = [] )

        {:ok,candidato} = page |> Enum.to_list |> hd |> Map.fetch("candidatos")
        {:ok,ramo} = page |> Enum.to_list |> hd |> Map.fetch("ramo")
        {:ok,empresa_id} = page |> Enum.to_list |> hd |> Map.fetch("empresa_id")

       new_list = Enum.reject(candidato, fn x -> x == id_user["id"] end)

       cql = "UPDATE lotus_dev.vagas SET candidatos = ['#{new_list}']  WHERE id = '#{id_}' AND ramo = '#{ramo}'"

       case Xandra.execute(CassPID, cql, _params = []) do
           {:ok, _} ->

            LotusRust.Back.building_cache()

            json(conn, %{Ok: true})
           _ -> json(conn, %{Ok: false})
       end

    end

    def aprovar_candidato(conn, params) do

        id_email = get_session(conn, "id")

        query = "SELECT email FROM lotus_dev.user WHERE id = '#{params["id"]}'"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, query, p_params = [] )
        {:ok,email} = page |> Enum.to_list |> hd |> Map.fetch("email")

        cql1 = "SELECT id, nome,foto_base64, email FROM lotus_dev.user WHERE id = '#{id_email["id"]}'"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql1, _params = [])

        page = page |> Enum.to_list 

        nome = page |> hd |> Map.get("nome")

        case Vagas.aprovar_candidato_vaga(params["id_user"],params["id_vaga"]) do

            true ->

                LotusRust.Back.building_cache()

                case Vagas.notificacao_user(params["id_user"],params["id_vaga"], "#{nome} aprovou seu currículo", true, email) do
                    true -> json(conn, %{Ok: true})

                    _ ->  json(conn, %{Ok: false})
                end

                _ ->  json(conn, %{Ok: false})

        end



    end

    def delete_candidato_aprovado(conn, params) do

        id_email = get_session(conn, "id")

        sql = "SELECT vagas_aprovadas, email FROM lotus_dev.user WHERE id = '#{params["id"]}'"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, sql, p_params = [] )

        {:ok,candidato} = page |> Enum.to_list |> hd |> Map.fetch("vagas_aprovadas")
        {:ok,email} = page |> Enum.to_list |> hd |> Map.fetch("email")

        new_list = Enum.reject(candidato, fn x -> x == params["id_vaga"] end)

        cql1 = "SELECT id, nome,foto_base64, email FROM lotus_dev.user WHERE id = '#{id_email["id"]}'"

        {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql1, _params = [])

        page = page |> Enum.to_list 

        nome = page |> hd |> Map.get("nome")

        cql = "UPDATE lotus_dev.user SET vagas_aprovadas = ['#{new_list}']  WHERE id = '#{params["id"]}'"

        case Vagas.notificacao_user(params["id"],params["id_vaga"], "#{nome} desaprovou seu currículo :(", false, email) do
            true ->

                LotusRust.Back.building_cache()

                case Xandra.execute(CassPID, cql, _params = []) do
                    {:ok, _} -> json(conn, %{Ok: true})
                    _ -> json(conn, %{Ok: false})
                end


            _ ->  json(conn, %{Ok: false})
        end

    end

    defp delete_candidato(candidatos, id_vaga) do    

        id_vaga |> IO.inspect   

        candidatos |> length |> IO.inspect  

        Enum.map(candidatos,fn x -> 

            cql = "SELECT id,email,vagas_aprovadas FROM lotus_dev.user WHERE id = '#{x}'"

            {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql, _params = [])
        
            page = page |> Enum.to_list 

            if not Enum.empty?(page) do 

                vagas_aprovadas = page |> hd |> Map.get("vagas_aprovadas")
                id_user = page |> hd |> Map.get("id")
                email = page |> hd |> Map.get("email")

                new_vagas = Enum.reject(vagas_aprovadas, fn y -> y == id_vaga end)

                cql_update = "UPDATE lotus_dev.user SET vagas_aprovadas = ['#{new_vagas}'] WHERE id = '#{id_user}'"
                
                case Xandra.execute(CassPID, cql_update, _params = []) do
                    {:ok, _} -> IO.puts("Update OK")
                    {:erro,e} -> e |> IO.inspect
                end


            end 

        
        end)


    end 




end
