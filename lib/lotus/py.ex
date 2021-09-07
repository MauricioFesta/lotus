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

    def call_python(cmd, path, arguments) do

        case System.cmd(cmd, [path | arguments]) do
          {output, 0} ->
            output
     
          {_, 1} -> {:error, "Python code / call error"}
        end
     
    end
     
    def path_python do
     
         path = [
           :code.priv_dir(:lotus),
           "python"
         ] |> Path.join()
     
    end

    def get_image_pdf(path_pdf, filename) do
        
        res = call_python("python3", path_python() <> "/get_image_for_pdf.py", [path_pdf,"/tmp/" <>filename])

        res |> String.split("\n")

    end

  
    def teste do
        
        # LotusRust.Back.add(12, 12) |> IO.inspect
    
        LotusRust.Back.update_notificacoes_vencidas() |> IO.inspect
    #   ret = LotusRust.Back.get_filtro_vagas("56169957-9a1d-4324-a043-d98795b73774")

    #   Enum.map(ret, fn x -> x |> JSON.decode! end)

      
    end

end
