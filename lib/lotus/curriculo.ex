defmodule Lotus.Curriculo do

    alias Lotus.Utils


    def generate_pdf do 

        #Lotus.Curriculo.generate_pdf

        html_path = [
            :code.priv_dir(:lotus),
            "/html/pdf_curriculo.html"
          ] |> Path.join()

          {:ok, html} = File.read(html_path)


        new_html = html |> String.replace("{nome_completo}", "Mauricio Festa")

        total_count_cer = Utils.caracteres_especiais_list |> Enum.count

		html_cer = new_html |> Utils.caracteres_especiais_html(total_count_cer - 1)
      
        {:ok, path} = PdfGenerator.generate(html_cer, page_size: "A4")


    end 






end 