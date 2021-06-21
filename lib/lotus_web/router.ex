defmodule LotusWeb.Router do
  use LotusWeb, :router

   pipeline :browser do
     plug :accepts, ["html"]
     plug :fetch_session
     plug :fetch_flash
     #plug :protect_from_forgery
     plug :put_secure_browser_headers
   end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug LotusWeb.Plugs.Auth
  end

   scope "/", LotusWeb do
     pipe_through :browser

     post "/login-login_valida", LoginController, :login_valida
     post "/login-cadastro", LoginController, :cadastro_login

  #   get "/", PageController, :index
    
  
    end


  # Other scopes may use custom stacks.

  scope "/api", LotusWeb do
    pipe_through :api

    get "/get-perfil", PerfilController, :get_perfil
    put "/perfil-alterar", PerfilController, :alterar_perfil
    post "/curriculo-cadastro", CurriculoController, :cadastro_curriculo
    delete "/curriculo-excluir/:id", CurriculoController, :excluir_curriculo
    get "/curriculo-consulta", CurriculoController, :consulta_curriculo
    get "/curriculo-download/:id", CurriculoController, :download_curriculo
    post "/postagens-cadastro", PostagensController, :cadastro_postagem
    get "/postagens-listar", PostagensController, :list_postagens
    post "/vagas-cadastro", VagasController, :cadastro_vagas
    get "/vagas-lista", VagasController, :list_vagas
    post "/vagas-candidatar-se", VagasController, :insert_vaga_user
    delete "/vagas-delete-candidatura/:id", VagasController, :delete_candidatura_user
   

  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  # if Mix.env() in [:dev, :test] do
  #   import Phoenix.LiveDashboard.Router

  #   scope "/" do
  #     pipe_through :browser
  #     live_dashboard "/dashboard", metrics: LotusWeb.Telemetry
  #   end
  # end
end
