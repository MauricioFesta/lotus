defmodule LotusWeb.ChatController do   
    use LotusWeb, :controller
  
    def insert_message(conn, params) do  

        id_user =  get_session(conn, "id")["id"] 

        new_params = if is_nil(params["empresa_id"]) do  

            params |> Map.put("empresa_id", id_user)
            |> Map.put("inserted_at", DateTime.utc_now |> DateTime.add(-10800))

        else

            params |> Map.put("inserted_at", DateTime.utc_now |> DateTime.add(-10800))
            
        end

        
       case Mongo.insert_one(:mongo,"chat", new_params) do  

        {:ok, _} -> json(conn, "ok")

        {:erro, err} -> json(conn, err)

       end


    end

    def get_message(conn, params) do    

        ret = Mongo.aggregate(:mongo, "chat", [

            %{"$match" => 
            
                %{"$expr" => 

                    %{"$and" => 

                        [

                            %{"$eq" => ["$empresa_id", params["empresa_id"]]},
                            %{"$eq" => ["$user_id", params["user_id"]]}

                        ]

                    }

                }
            },

            #%{"$limit" => 15},


            %{"$sort" => %{"inserted_at" => -1}},
           
            %{"$project" => %{

                "message" => 1,
                "empresa_id" => 1,
                "user_id" => 1

                }
        
                
            }

          


        ]) |> Enum.to_list


        id_user = ret |> hd |> Map.get("empresa_id")

        query = "SELECT foto_base64 FROM lotus_dev.user WHERE id = '#{id_user}'"

        {:ok, %Xandra.Page{} = page}  = Xandra.execute(CassPID, query, _params = [])  

        image = page |> Enum.to_list |> hd |> Map.get("foto_base64")

       new_ret = ret |> Enum.map(fn x -> 

  
            user = x["message"]["user"] |> Map.put_new("avatar","data:image/png;base64,"<> image)

            msg = x["message"] |> Map.put("user", user)
            
            msg
        
        end)

        json(conn, new_ret)

    end


end