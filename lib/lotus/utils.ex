defmodule Lotus.Utils do    

    def caracteres_especiais_html(str, index) when index > -1 do

        #LnfApi.Utils.caracteres_especiais_html("asuhdáaÂÂsáudasuduÁasÃÃhdahshuçusdhasééudhausdç", 57)

        str_tmp = str |> String.replace(~r/#{caracteres_especiais_list |> Enum.at(index)}/, list_caracteres_html_values[caracteres_especiais_list |> Enum.at(index)])
        
        if  index - 1 == -1 do

            str |> String.replace(~r/#{caracteres_especiais_list |> Enum.at(index)}/, list_caracteres_html_values[caracteres_especiais_list |> Enum.at(index)])

        else        

            caracteres_especiais_html(str_tmp, index - 1) 
           
        end
      
    end 

    def  caracteres_especiais_html(_msg, -1) do
        :ok
    end

    def list_caracteres_html_values do
        
        %{"Á"=> "&Aacute;","á"=> "&aacute;","Â"=> "&Acirc;","â"=> "&acirc;","À"=> "&Agrave;","à"=> "&agrave;", "Å"=> "&Aring;", "å"=> "&aring;","Ã"=> "&Atilde;","ã"=> "&atilde;","Ä"=> "&Auml;", "ä"=> "&auml;","Æ"=> "&AElig;","æ"=> "&aelig;", "É"=> "&Eacute;", "é"=> "&eacute;", "Ê"=> "&Ecirc;","ê"=> "&ecirc;","È"=> "&Egrave;", "è"=> "&egrave;","Ë"=> "&Euml;", "ë"=> "&euml;","Ð"=> "&ETH;", "ð"=> "&eth;","Í"=> "&Iacute;","í"=> "&iacute;","Î"=> "&Icirc;", "î"=> "&icirc;", "Ì"=> "&Igrave;", "ì"=> "&igrave;","Ï"=> "&Iuml;", "ï"=> "&iuml;","Ó"=> "&Oacute;", "ó"=> "&oacute;","Ô"=> "&Ocirc;", "ô"=> "&ocirc;","Ò"=> "&Ograve;","ò"=> "&ograve;","Ø"=> "&Oslash;", "ø"=> "&oslash;", "Õ"=> "&Otilde;", "õ"=> "&otilde;", "Ö"=> "&Ouml;","ö"=> "&ouml;","Ú"=> "&Uacute;","ú"=> "&uacute;", "Û"=> "&Ucirc;","û"=> "&ucirc;","Ù"=> "&Ugrave;", "ù"=> "&ugrave;","Ü"=> "&Uuml;", "ü"=> "&uuml;","Ç"=> "&Ccedil;","ç"=> "&ccedil;", "Ñ"=> "&Ntilde;","ñ"=> "&ntilde;","<"=> "&lt;",">"=> "&gt;", "&"=> "&amp;","®"=> "&reg;", "©"=> "&copy;", "Ý"=> "&Yacute;", "ý"=> "&yacute;","Þ"=> "&THORN;", "þ"=> "&thorn;", "ß"=> "&szlig;"}
        
    end


    def caracteres_especiais_list do
        [
        "Á","á","Â","â","À","à","Å","å","Ã","ã","Ä","ä","Æ","æ","É","é","Ê","ê","È","è","Ë","ë","Ð","ð","Í","í","Î","î","Ì","ì","Ï","ï","Ó","ó","Ô","ô","Ò","ò","Ø","ø","Õ","õ","Ö","ö","Ú","ú","Û","û","Ù","ù","Ü","ü","Ç","ç","Ñ","ñ","Ý","ý",
        ]

    end



end 