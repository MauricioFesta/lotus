defmodule Lotus.Py do
    alias Lotus
    def clear_Pdf_tmp do 

        path =
        [:code.priv_dir(:lotus), "python"]
        |> Path.join()

        with {:ok, pid} <- :python.start([{:python_path, to_charlist(path)}, {:python, 'python3'}]) do
            
            :python.call(pid, :files, :removeFilesPdfTmp, []) |> IO.inspect
            :python.stop(pid)
        end
    end

    def teste do
        
        # LotusRust.Back.add(12, 12) |> IO.inspect
    
    
       LotusRust.Back.get_value()

      
    end

end
