defmodule Lotus.Vagas do

    alias LotusWeb.VagasController
  
    def aprovar_candidato_vaga(id_candidato, id_vaga) do
       
        cql_consulta =  "SELECT vagas_aprovadas, email, id FROM lotus_dev.user WHERE id = '#{id_candidato}'"

        {:ok,  %Xandra.Page{} = page} = Xandra.execute(CassPID, cql_consulta, _params =[])

        {:ok,vagas_aprovadas} = page |> Enum.to_list() |> Enum.at(0) |> Map.fetch("vagas_aprovadas") |> IO.inspect(label: "vagas aprovadas")
        {:ok,email} = page |> Enum.to_list() |> hd |> Map.fetch("email") 
        {:ok,id} = page |> Enum.to_list() |> hd |> Map.fetch("id") 

        if Enum.member?(vagas_aprovadas, id_vaga) do
          
            false
            
        else
         
            cql = "UPDATE lotus_dev.user SET vagas_aprovadas = ['#{id_vaga}'] + vagas_aprovadas WHERE  id = '#{id}'"
         
            case Xandra.execute(CassPID, cql, _params = []) do
                {:ok, _} -> true
                _ -> false
            end

        end
           
     
    end

 
    def notificacao_user(id_user, id_vaga, descripition, aprovado, email) do

        date_new = DateTime.utc_now |> DateTime.add(-10800) |> DateTime.to_unix()

        cql1 = "SELECT id, nome,foto_base64, email FROM lotus_dev.user WHERE id = '#{id_user}'"

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

           
        cql = "UPDATE lotus_dev.user SET notificacoes = ['#{data}'] + notificacoes WHERE id = '#{id}'"
       
    
        case Xandra.execute(CassPID, cql, _params = []) do

                {:ok, _}-> true

                _ ->   false
                       
        end

    end

    def update_cache do 

        ret = LotusRust.Back.get_list_vagas()
        VagasController.set_cache_vagas(ret)

    end 

    def valor_maximo_vaga do  
        

       ret =  Mongo.aggregate(:mongo, "vagas", [
            %{"$sort" => 

            %{"valor" => -1}
            
            },
            %{"$limit" => 1}
            
        ]) |> Enum.to_list |> hd

     
    end


    def filter_empresa(params) do 

        pagged_skip = params["pagged"]["limit_pagged"] * params["pagged"]["pagged"] 
        pagged_limit = params["pagged"]["limit_pagged"]

        ret = Mongo.aggregate(:mongo, "vagas", [
            %{"$match" => 

                %{"$expr" => %{"$and" => [

                    %{"$eq" => ["$empresa_id",params["empresa"]]},
                    %{"$eq" => ["$ativo", true]}

                ]}}
   
            },
            
            %{"$skip" => pagged_skip},
            %{"$limit" =>pagged_limit}
        
        ]) |> Enum.to_list

    end

    def filter_cache(params) do 
    
        pagged_skip = params["pagged"]["limit_pagged"] * params["pagged"]["pagged"] 
        pagged_limit = params["pagged"]["limit_pagged"]
        valor = params["valor"]

        ret = Mongo.aggregate(:mongo, "vagas", [
            %{"$match" => 

                %{"$expr" =>

                    %{"$and" => [

                        %{"$lte" => ["$valor",valor]},
                        %{"$eq" => ["$ativo", true]}

                    ]}
 
                }

           
            },
            
            %{"$skip" => pagged_skip},
            %{"$limit" =>pagged_limit}
        
        ]) |> Enum.to_list


    end

    def filter_cidade(params) do  

        pagged_skip = params["pagged"]["limit_pagged"] * params["pagged"]["pagged"] 
        pagged_limit = params["pagged"]["limit_pagged"] |> IO.inspect(label: "limit") 
    
        ret = Mongo.aggregate(:mongo, "vagas", [
            %{"$match" => 

                %{"$expr" => %{"$and" => [

                    %{"$eq" => ["$cidade", params["cidade"]]},
                    %{"$eq" => ["$ativo", true]}

                ]}}

            },
            %{"$skip" => pagged_skip},
            %{"$limit" =>pagged_limit}
        
        ]) |> Enum.to_list

    
    end

    def list_vagas(params) do  
        
        params |> IO.inspect(label: "Parametros")

       new_params = cond do 

            is_binary(params["limit_pagged"]) -> 

                params |> Map.put("limit_pagged", String.to_integer(params["limit_pagged"]))
                |> Map.put("pagged", String.to_integer(params["pagged"]))

            true -> params  

        end   

        pagged_skip = new_params["limit_pagged"] * new_params["pagged"]
        pagged_limit = new_params["limit_pagged"]
    
        Mongo.aggregate(:mongo, "vagas", [
            %{"$match" => %{"ativo" => true}},
            %{"$skip" => pagged_skip},
            %{"$limit" => pagged_limit},
            %{"$sort" => %{"inserted_at" => -1}}
        
        ]) |> Enum.to_list 

    end

    def length_vagas do 
        
        Mongo.aggregate(:mongo, "vagas", [

            %{"$match" => 
                 
                %{"ativo" => true}

            },
            %{"$count" => "count"} 
        ]) |> Enum.to_list |> hd

    end

    def length_vagas_abertas_empresa(id_empresa) do 

       ret =  Mongo.aggregate(:mongo, "vagas", [

            %{"$match" => 

                %{"$expr" =>

                %{"$and" => [

                    %{"$eq" => ["$empresa_id", id_empresa]},
                    %{"$eq" => ["$ativo", true]}

                ]}
            
                }
                 
            },
            %{"$count" => "count"} 
        ]) |> Enum.to_list

        if Enum.empty?(ret) do
        
            %{"count" => 0}

         else

            ret |> hd

        end
       

    end


    def length_vagas_fechados_empresa(id_empresa) do 

      ret =  Mongo.aggregate(:mongo, "vagas", [

            %{"$match" => 

                %{"$expr" =>

                %{"$and" => [

                    %{"$eq" => ["$empresa_id", id_empresa]},
                    %{"$eq" => ["$ativo", false]}

                ]}
            
                }
                 
            },
            %{"$count" => "count"} 
        ]) |> Enum.to_list 

        if Enum.empty?(ret) do
        
          %{"count" => 0}

         else

            ret |> hd

        end
        

    end

    def list_vagas_empresa(params,id_empresa) do 

        new_params = cond do 

            is_binary(params["limit_pagged"]) -> 

                params |> Map.put("limit_pagged", String.to_integer(params["limit_pagged"]))
                |> Map.put("pagged", String.to_integer(params["pagged"]))

            true -> params  

        end  

        pagged_skip = new_params["limit_pagged"] * new_params["pagged"]
        pagged_limit = new_params["limit_pagged"]
    
        Mongo.aggregate(:mongo, "vagas", [

            %{"$match" => %{"$expr" => 

                %{"$and" => [
                    %{"$eq" => ["$empresa_id", id_empresa]},
                    %{"$eq" => ["$ativo", true]}
                ]}

            }},

            %{"$skip" => pagged_skip},
            %{"$limit" => pagged_limit},
            %{"$sort" => %{"inserted_at" => -1}}
        
        ]) |> Enum.to_list 
    

    end

    def list_vagas_empresa_fechado(params,id_empresa) do 

        new_params = cond do 

            is_binary(params["limit_pagged"]) -> 

                params |> Map.put("limit_pagged", String.to_integer(params["limit_pagged"]))
                |> Map.put("pagged", String.to_integer(params["pagged"]))

            true -> params  

        end  

        pagged_skip = new_params["limit_pagged"] * new_params["pagged"]
        pagged_limit = new_params["limit_pagged"]
    
        Mongo.aggregate(:mongo, "vagas", [

            %{"$match" => %{"$expr" => 

                %{"$and" => [
                    %{"$eq" => ["$empresa_id", id_empresa]},
                    %{"$eq" => ["$ativo", false]}
                ]}

            }},

            %{"$skip" => pagged_skip},
            %{"$limit" => pagged_limit},
            %{"$sort" => %{"inserted_at" => -1}}
        
        ]) |> Enum.to_list 
    

    end

    def list_vagas_candidatos(id_vaga) do 
        
       ret = Mongo.find_one(:mongo, "vagas", %{"_id" => id_vaga |> BSON.ObjectId.decode!})

       formated =  Enum.join(ret["candidatos"], "','")

       cql_candidatos =  "SELECT * FROM lotus_dev.user WHERE id IN ('#{formated}')"

       {:ok, %Xandra.Page{} = page_candidatos} = Xandra.execute(CassPID, cql_candidatos, _params = [])

       page_candidatos

    end

 
end
