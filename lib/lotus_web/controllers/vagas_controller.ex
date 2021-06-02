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
        
         sql = "INSERT INTO lotus_dev.vagas (id,descricao,empresa_id,valor, estado, cidade, 
         turno,imagem_base64,disponibilidade_viajar,planejamento_futuro) VALUES (uuid(),
         '#{params["descricao"]}', '#{id_user}', #{_valor}, '#{params["estado"]}',
         '#{params["cidade"]}', '#{params["turno"]}', '#{file64}',#{convert!(params["disponibilidade"])},
         #{convert!(params["planejamento"])})"

       case Xandra.execute(CassPID,sql, params = []) |> IO.inspect do
           {:ok, _} -> json(conn, %{"Ok": true})
           _ -> json(conn, %{"Ok": false})
       end

    end

    def convert!("true"), do: true
    def convert!("false"), do: false
 

end