import api from "../../others/api_default"

export const postCreatePostagem = (data) => {

    let result = api.post("/api/postagens-cadastro", data)

    return result

}

export const getPostagensAll = () => {

    let result = api.get("/api/postagens-listar")

    return result

}