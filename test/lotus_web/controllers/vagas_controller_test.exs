defmodule LotusWeb.VagasControllerTest do
    use LotusWeb.ConnCase, async: true

  

    test "POST /api/vagas-cadastro" do


       x = login() 


        params = %{

            "valor" => "1200",
            "titulo" => "ExUnit Test",
            "descricao" => "aquii",
            "cidade" => "Bento Gonçalves",
            "turno" => "Mannhã",
            "estado" => "RS",
            "ramo" => "Metalurgico",
            "disponibilidade_viajar" => "true",
            "planejamento_futuro" => "true",
            "file" => %Plug.Upload{
                content_type: "image/png",
                filename: "cachorro.jpg",
                path: "/home/mauri42/Downloads/cachorro.jpg"
            }
         
        }

        conn =  build_conn() |>

        init_test_session(%{"idUser" => x["id"], "x-nz-token" => x["token"]})

        post(conn, "/api/vagas-cadastro", params) |> 


        fn(x) ->
            

            Poison.decode!(x.resp_body) |>


            fn(x) ->

             assert x == %{"Ok" => true}

            end.()


        end.()



    end


    defp login do

        params =%{

            "email" => "festamauricio42@gmail.com",
            "senha"  => "7777"

        }

        conn =  build_conn()

        post(conn, "/public/login-login_valida", params) |>

        fn(x) -> 

            Poison.decode!(x.resp_body) |>

                fn(x) ->

                    x

                end.()

        end.()


    end





  end
  