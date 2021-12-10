defimpl Jason.Encoder, for: Mongo.Stream do

    def encode(value, options) do
      value
      |> Enum.to_list
      |> Enum.map(&Map.new(&1, fn
        {"_id",bson} -> {"id",bson}
        pair -> pair
      end))
      |> Jason.Encoder.encode(options)
    end
  
  end
  
defimpl Jason.Encoder, for: BSON.ObjectId do
    def encode(id, options) do
      id |> BSON.ObjectId.encode! |> Jason.Encoder.encode(options)
    end
end