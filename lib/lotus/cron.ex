defmodule Lotus.Cron do
    
    alias Lotus.Py
    alias LotusWeb.VagasController

    @spec clear_pdf_tmp() :: keyword() | :noop
    def clear_pdf_tmp() do

        Py.clear_Pdf_tmp

    end

    @spec clear_notificacoes() :: keyword() | :noop
    def clear_notificacoes do

        LotusRust.Back.update_notificacoes_vencidas()
        
    end

    @spec update_cache() :: keyword() | :noop
    def update_cache do 

        VagasController.update_cache

    end 

    @spec update_cache() :: keyword() | :noop
    def building_cache do   

        LotusRust.Back.building_cache

    end

  end
