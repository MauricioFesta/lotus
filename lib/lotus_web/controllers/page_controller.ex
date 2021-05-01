defmodule LotusWeb.PageController do
  use LotusWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
