defmodule LotusRust.Back do

    use Rustler, otp_app: :lotus, crate: "lotusrust_back"

    def add(_a, _b), do: :erlang.nif_error(:nif_not_loaded)
    def get_filtro_vagas_empresa(_a), do: :erlang.nif_error(:nif_not_loaded)
    def get_filtro_vagas_ramo(_a), do: :erlang.nif_error(:nif_not_loaded)
    def get_list_vagas(), do: :erlang.nif_error(:nif_not_loaded)
    def update_notificacoes_vencidas(), do: :erlang.nif_error(:nif_not_loaded)


end