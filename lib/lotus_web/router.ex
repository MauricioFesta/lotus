defmodule LotusWeb.Router do
  use LotusWeb, :router

   pipeline :browser do
     plug :accepts, ["html", "json"]
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


   scope "/public", LotusWeb do
     pipe_through :browser

     post "/login-login_valida", LoginController, :login_valida
     post "/login-cadastro", LoginController, :cadastro_login
     post "/password-reset", LoginController, :password_reset
     post "/login-verificado-valida", LoginController, :confirm_login
     post "/resend-cod-cadastro", LoginController, :resend_cod_cadastro
     post "/new-password-confirm", LoginController, :confirm_token_reset_password
     post "/new-password", LoginController, :alterar_password
     get "/vagas-lista", VagasController, :list_vagas
     get "/postagens-listar", PostagensController, :list_postagens
     get "/teste", PostagensController, :teste
     
    
  #   get "/", PageController, :index


    end


  # Other scopes may use custom stacks.

  scope "/api", LotusWeb do
    pipe_through :api

    get "/get-perfil", PerfilController, :get_perfil
    put "/perfil-alterar", PerfilController, :alterar_perfil
    post "/curriculo-cadastro", CurriculoController, :cadastro_curriculo
    post "/curriculo-cadastro-base64", CurriculoController, :cadastro_curriculo_base64
    post "/curriculo-cadastro-form", CurriculoController, :cadastro_curriculo_form
    delete "/curriculo-excluir/:id", CurriculoController, :excluir_curriculo
    
    get "/curriculo-consulta", CurriculoController, :consulta_curriculo
  
    get "/curriculo-download/:id", CurriculoController, :download_curriculo
    get "/curriculo-download-candidato/:id", CurriculoController, :download_curriculo_candidato
    put "/curriculo-principal-set/:id", CurriculoController, :curriculo_principal
    post "/postagens-cadastro", PostagensController, :cadastro_postagem
    # get "/postagens-listar", PostagensController, :list_postagens
    get "/postagens-listar-empresa", PostagensController, :list_postagens_empresa
    post "/vagas-cadastro", VagasController, :cadastro_vagas
    get "/vagas-lista", VagasController, :list_vagas
    get "/vagas-lista-empresa", VagasController, :list_vagas_empresa
    get "/vagas-lista-empresa-fechado", VagasController, :list_vagas_empresa_fechado
    get "/vagas-lista-candidatos/:id", VagasController, :list_vagas_candidatos
    post "/vagas-candidatar-se", VagasController, :insert_vaga_user
    delete "/vagas-delete-candidatura/:id", VagasController, :delete_candidatura_user
    put "/vagas-arovar-candidato/:id", VagasController, :aprovar_candidato
    put "/vagas-desaprovar-candidato/:id", VagasController, :delete_candidato_aprovado
    get "/lista-vagas-aprovadas", VagasController, :lista_vagas_aprovadas
    get "/vagas-all-empresas", VagasController, :lista_all_empresas
    post "/vagas-filter-empresa", VagasController, :filter_empresa
    post "/vagas-filter-ramo", VagasController, :filter_ramo
    post "/update-vaga", VagasController, :update_vaga
    get "/lista-notificacoes", PerfilController, :lista_notificacoes








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
