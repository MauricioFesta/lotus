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

    def teste do 

        {:ok, conn} = Xandra.start_link(nodes: ["127.0.0.1:9042"])
       
        statement = "SELECT nome FROM lotus_dev.user"

        %Xandra.Page{} = page = Xandra.execute!(conn, statement, _params = [])
        Enum.each(page, fn %{"nome" => nome} ->
        IO.puts "Nome aquiii: #{nome} "
        end)



    end

  
end
