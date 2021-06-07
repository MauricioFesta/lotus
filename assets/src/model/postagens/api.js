import axios from "axios";

export const postCreatePostagem = (data) => {

    let result = axios.post("/postagens/cadastro", data)

    return result

}

export const getPostagensAll = () => {

    let result = axios.get("/postagens/listar")

    return result

}