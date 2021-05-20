defmodule Lotus.Cron do
    use Ecto.Schema
    import Ecto.Changeset

    @spec clear_pdf_tmp() :: keyword() | :noop
    def clear_pdf_tmp() do

        System.cmd("rm", ["assets/public/pdf_tmp/*"])

    end

  end
