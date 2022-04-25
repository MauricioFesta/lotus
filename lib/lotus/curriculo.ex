defmodule Lotus.Curriculo do

    alias Lotus.Utils


    def generate_pdf(form, base64_foto, email) do 

        #Lotus.Curriculo.generate_pdf

        form |> IO.inspect

        html_path = [
            :code.priv_dir(:lotus),
            "/html/pdf_curriculo.html"
          ] |> Path.join()

          {:ok, html} = File.read(html_path)

        experiencia = [] ++ form["experiencias"] |> Poison.decode! |> Enum.map(fn x -> 

            "<ul>
                <li>
                <p class=\"tags\">#{x["empresa"]}<br><span>
                        #{x["cargo"]} | <span><b>Saída: </b>#{x["ano"]}</span></span>
                </p>
                <a class=\"edit\" href=\"#\"><i class=\"fas fa-pen stroke-transparent-blue\"></i></a>
                </li> 
            </ul>"
    
        end)  

        formacoes = []++ form["formacoes"] |> Poison.decode! |> Enum.map(fn x -> 


            "<ul>
                <li>
                    <p class=\"tags\">#{x["instituicao"]}<br><span>
                        #{x["curso"]} <span><b>Ano: </b>#{x["data"]}</span></span>
                    </p>
                    <a class=\"edit\" href=\"#\"><i class=\"fas fa-pen stroke-transparent-blue\"></i></a>
                </li>

            </ul>"
            
            
            
        end)


        new_html = html 
            |> String.replace("{nome_completo}", form["nome"]) 
            |> String.replace("{rua}", form["rua"]) 
            |> String.replace("{descricao}", form["descricao"]) 
            |> String.replace("{telefone}", form["telefone"])
            |> String.replace("{formacao_academica}", form["ensinomedio"])
            |> String.replace("{cidade}", form["cidade"])
            |> String.replace("{idade}", form["idade"])
            |> String.replace("{telefone_fixo}", form["telefone_fixo"])
            |> String.replace("{idade}", form["idade"])
            |> String.replace("{filhos}", form["filhos"])
            |> String.replace("{casado}", form["casado"])
            |> String.replace("{fax}", form["fax"])
            |> String.replace("{experiencias}", experiencia |> Enum.join)
            |> String.replace("{formacoes}", formacoes |> Enum.join)
            |> String.replace("{foto}", base64_foto)
            |> String.replace("{email}", email)

       

        total_count_cer = Utils.caracteres_especiais_list |> Enum.count

		html_cer = new_html |> Utils.caracteres_especiais_html(total_count_cer - 1)
      
        {:ok, path} = PdfGenerator.generate(html_cer, page_size: "A4")

        path


    end 






end 