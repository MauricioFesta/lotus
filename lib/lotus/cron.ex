defmodule Lotus.Cron do
    use Ecto.Schema
    import Ecto.Changeset

    @spec clear_pdf_tmp() :: keyword() | :noop
    def clear_pdf_tmp() do

        System.cmd("rm", ["assets/public/pdf_tmp/f822f01c-b8b9-11eb-af38-e0db55ff2b21.pdf"])

    end

  end
