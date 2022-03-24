defmodule LotusWeb.ChatController do   
    use LotusWeb, :controller
  
    def insert_message(conn, params) do  
        
       case Mongo.insert_one(:mongo,"chat", params) do  

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

            %{"$limit" => 15},
           
            %{"$project" => %{

                "message" => 1

                }
        
                
            }


        ]) |> Enum.to_list

       new_ret = ret |> Enum.map(fn x -> 
            
            x["message"]
        
        end)

        json(conn, new_ret)

    end


end