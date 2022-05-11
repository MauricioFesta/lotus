defmodule Lotus.Vagas do

    alias LotusWeb.VagasController
    import Phoenix
  
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

            %{"$match" => %{"$expr" => 

                %{"$eq" => ["$ativo", true]}
            
            }},

            %{"$sort" => 

                %{"valor" => -1}
                
            },
            %{"$limit" => 1}
            
        ]) |> Enum.to_list 


        if Enum.empty?(ret), do: 0, else: ret |> hd

     
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
            %{"$sort" => %{"inserted_at" => -1}},
            %{"$skip" => pagged_skip},
            %{"$limit" =>pagged_limit}
        
        ]) |> Enum.to_list

    end

    def filter_cache(params) do 
    
        pagged_skip = params["pagged"]["limit_pagged"] * params["pagged"]["pagged"] 
        pagged_limit = params["pagged"]["limit_pagged"]
        valor = params["valor"]

        Mongo.aggregate(:mongo, "vagas", [
            %{"$match" => 

                %{"$expr" =>

                    %{"$and" => [

                        %{"$lte" => ["$valor",valor]},
                        %{"$eq" => ["$ativo", true]}

                    ]}
 
                }

           
            },

            %{"$sort" => %{"valor" => -1}},
            
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
            %{"$sort" => %{"inserted_at" => -1}},
            %{"$skip" => pagged_skip},
            %{"$limit" =>pagged_limit}
        
        ]) |> Enum.to_list

    
    end

    def filter_vagas_aprovadas(params, id_user) do   
        
        if id_user != nil do    

        
            cql = "SELECT vagas_aprovadas FROM lotus_dev.user WHERE id = '#{id_user["id"]}'"

            cql |> IO.inspect

            {:ok, %Xandra.Page{} = page} = Xandra.execute(CassPID, cql, _params = [])

            page = page |> Enum.to_list 

            vagas_aprovadas = page |> hd |> Map.get("vagas_aprovadas")  

            new_vagas = vagas_aprovadas |> Enum.map(fn x ->
            
                cond do 
                    
                    x != "" -> x |> BSON.ObjectId.decode!

                    true -> :noop

                end
            
            end)
            

            pagged_skip = params["pagged"]["limit_pagged"] * params["pagged"]["pagged"] 
            pagged_limit = params["pagged"]["limit_pagged"]

            Mongo.aggregate(:mongo, "vagas", [

                %{"$match" => 
                    
                    %{"_id" => %{"$in" => new_vagas}}
                    

                },
                %{"$sort" => %{"inserted_at" => -1}},
                %{"$skip" => pagged_skip},
                %{"$limit" => pagged_limit}
              
            
                
            ]) |> Enum.to_list |> IO.inspect

        else

            []

        end

       

    end

    def list_vagas(params) do  
        
       new_params = cond do 

            is_binary(params["limit_pagged"]) -> 

                params |> Map.put("limit_pagged", String.to_integer(params["limit_pagged"]))
                |> Map.put("pagged", String.to_integer(params["pagged"]))

            true -> params  

        end   

        pagged_skip = new_params["limit_pagged"] * new_params["pagged"]
        pagged_limit = new_params["limit_pagged"]

        pagged_skip |> IO.inspect
    
    Mongo.aggregate(:mongo, "vagas", [
            
            %{"$match" => %{"ativo" => true}},
            %{"$sort" => %{"inserted_at" => -1}},
            %{"$skip" => pagged_skip},
            %{"$limit" => pagged_limit},
            
            %{"$lookup" => %{
               "from" => "chat",
               "localField" => "empresa_id",
               "foreignField" => "empresa_id",
               "let" => %{
                   "user_id" => "$user_id",
                   #"empresa_id" => "$empresa_id"
               },
               "pipeline" => [

                    %{"$match" => 
                    
                        %{"$expr" => 

                            %{"$and" => [
                                
                                %{"$eq" => ["$viewed", false]},
                                %{"$eq" => ["$message.user._id", 2]},
                                %{"$eq" => ["$user_id", "$user_id"]}
                            ]}
                    
                        }
                    },
                    %{"$count" => "message"},
                   
               ],
               "as" => "chat"

            }},
           
            %{"$project" => %{
                "ativo" => 1,
                "candidatos" => 1,
                "cidade" => 1,
                "descricao" => 1,
                "disponibilidade_viajar" => 1,
                "empresa_id" => 1,
                "estado" => 1,
                "imagem_base64" => 1,
                "inserted_at" => 1,
                "planejamento_futuro" => 1,
                "ramo" => 1,
                "titulo" => 1,
                "updated_at" => 1,
                "turno" => 1,
                "valor" => 1,
                "total" => %{"$arrayElemAt" => ["$chat", 0]}
        
            }}
        
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
            %{"$sort" => %{"inserted_at" => -1}},
            %{"$skip" => pagged_skip},
            %{"$limit" => pagged_limit}
            
        
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
            %{"$sort" => %{"inserted_at" => -1}},
            %{"$skip" => pagged_skip},
            %{"$limit" => pagged_limit}
            
        
        ]) |> Enum.to_list 
    

    end

    def list_vagas_candidatos(id_vaga) do 
        
       ret = Mongo.find_one(:mongo, "vagas", %{"_id" => id_vaga |> BSON.ObjectId.decode!})


       ret["candidatos"] |> IO.inspect(label: "antes")

       new_ret = [] ++ ret["candidatos"] |> Enum.filter(fn x -> 

            if x != "", do: x

        end) 


       formated =  Enum.join(new_ret, "','")

       cql_candidatos =  "SELECT * FROM lotus_dev.user WHERE id IN ('#{formated}')"

       {:ok, %Xandra.Page{} = page_candidatos} = Xandra.execute(CassPID, cql_candidatos, _params = [])

       page_candidatos

    end

   
 
end
