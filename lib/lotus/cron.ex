defmodule Lotus.Cron do
    use Ecto.Schema
    import Ecto.Changeset
    alias Lotus.Py

    @spec clear_pdf_tmp() :: keyword() | :noop
    def clear_pdf_tmp() do

        Py.clear_Pdf_tmp

    end

  end
