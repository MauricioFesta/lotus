defmodule LotusWeb.VagasController do
    use LotusWeb, :controller
    
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
        |> Map.put(:candidatos, ["_"])
        
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
 

end