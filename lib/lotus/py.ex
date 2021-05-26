defmodule Lotus.Py do
  
    def clear_Pdf_tmp do 

        path =
        [:code.priv_dir(:lotus), "python"]
        |> Path.join()

        with {:ok, pid} <- :python.start([{:python_path, to_charlist(path)}, {:python, 'python3'}]) do
            
            :python.call(pid, :files, :removeFilesPdfTmp, []) |> IO.inspect
            :python.stop(pid)
        end
    end

end
