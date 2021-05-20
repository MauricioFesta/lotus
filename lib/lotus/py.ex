defmodule Lotus.Py do

    def teste do

        path =
            [:code.priv_dir(:lotus), "python"]
            |> Path.join()
 
        with {:ok, pid} <- :python.start([{:python_path, to_charlist(path)}, {:python, 'python3'}]) do
            
            :python.call(pid, :calculo, :main, [2]) |> IO.inspect
            :python.stop(pid)
        end

    end

  
end
