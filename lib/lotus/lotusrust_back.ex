defmodule LotusRust.Back do

    use Rustler, otp_app: :lotus, crate: "lotusrust_back"

    def add(_a, _b), do: :erlang.nif_error(:nif_not_loaded)
    def get_value(), do: :erlang.nif_error(:nif_not_loaded)


end